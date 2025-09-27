import {
  Directory,
  dag,
  type Secret,
  Container,
  type File,
} from "@dagger.io/dagger";
import {
  getWorkspaceContainer,
  getUbuntuBaseContainer,
  withMiseTools,
  getMiseRuntimeContainer,
} from "./base";
import type { StepResult } from ".";
import versions from "./versions";

export async function buildHa(source: Directory): Promise<Directory> {
  return getWorkspaceContainer(source, "src/ha")
    .withExec(["bun", "run", "build"])
    .directory("/workspace/src/ha");
}

export async function testHa(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, "src/ha").withExec([
    "sh",
    "-c",
    "bun test 2>&1 || true",
  ]);

  const output = await container.stdout();

  // Check if testing actually failed by looking for error indicators
  if (
    output.includes("error") ||
    output.includes("✖") ||
    output.includes("failed") ||
    output.includes("FAIL")
  ) {
    throw new Error(`HA Testing Failed:\n${output}`);
  }

  return output;
}

export async function typeCheckHa(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, "src/ha").withExec([
    "sh",
    "-c",
    `
    set +e
    bunx tsc --noEmit 2>&1
    exit_code=$?
    if [ $exit_code -ne 0 ]; then
      echo "TYPECHECK_FAILED_WITH_CODE_$exit_code"
    fi
    exit 0
    `,
  ]);

  const output = await container.stdout();

  // Check if type checking actually failed by looking for our exit code marker
  if (output.includes("TYPECHECK_FAILED_WITH_CODE_")) {
    throw new Error(`HA Type Checking Failed:\n${output}`);
  }

  return output;
}

export async function lintHa(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, "src/ha").withExec([
    "sh",
    "-c",
    `
    set +e
    bun run lint 2>&1
    exit_code=$?
    if [ $exit_code -ne 0 ]; then
      echo "LINT_FAILED_WITH_CODE_$exit_code"
    fi
    exit 0
    `,
  ]);

  const output = await container.stdout();

  // Check if linting actually failed by looking for our exit code marker
  if (output.includes("LINT_FAILED_WITH_CODE_")) {
    throw new Error(`HA Linting Failed:\n${output}`);
  }

  return output;
}

/**
 * Builds a container with the HA application ready to run.
 * Uses improved caching for better build performance.
 *
 * @param source The source directory.
 * @returns A configured Container ready to run the HA application.
 */
async function buildHaContainer(source: Directory): Promise<Container> {
  // Get just the HA source directory
  const haSource = source.directory("src/ha");

  // Build the container with optimized layer caching
  // Use getMiseRuntimeContainer() instead of withMiseTools(getUbuntuBaseContainer(source))
  // to avoid invalidating mise layer when source files change
  return (
    getMiseRuntimeContainer()
      .withWorkdir("/app")
      .withExec(["bun", "install", "node-gyp"])
      // Copy workspace root files for proper dependency resolution
      .withFile("package.json", source.file("package.json"))
      .withFile("bun.lock", source.file("bun.lock"))
      // Copy minimal workspace files needed for dependency resolution
      .withFile("src/ha/package.json", haSource.file("package.json"))
      .withFile("src/cdk8s/package.json", source.file("src/cdk8s/package.json"))
      // Install dependencies (cached unless dependency files change)
      .withMountedCache(
        "/root/.bun/install/cache",
        dag.cacheVolume("bun-cache-default-ha"),
      )
      .withExec(["bun", "install", "--frozen-lockfile"])
      // Copy the full ha source after dependencies are resolved
      .withDirectory("src/ha", haSource, { exclude: ["package.json"] })
      // Set working directory to the ha workspace
      .withWorkdir("/app/src/ha")
      .withDefaultArgs([
        "mise",
        "exec",
        `bun@${versions["bun"]}`,
        "--",
        "bun",
        "src/main.ts",
      ])
  );
}

/**
 * Builds the HA image and exports it to a tar file for testing.
 * Uses caching for improved build performance.
 *
 * @param source The source directory.
 * @returns The exported tar file
 */
export async function buildAndExportHaImage(source: Directory): Promise<File> {
  const container = await buildHaContainer(source);
  return container.asTarball();
}

/**
 * Builds the HA image and optionally pushes it to GHCR.
 * Uses caching for improved build performance.
 *
 * @param source The source directory.
 * @param imageName The image name (including tag), e.g. ghcr.io/shepherdjerred/homelab:latest
 * @param ghcrUsername The GHCR username
 * @param ghcrPassword The GHCR password (as a string, should be passed as a secret from the CLI or environment)
 * @param dryRun If true, builds the image but doesn't publish it (default: false)
 * @returns The result of the build and/or push operation.
 */
export async function buildAndPushHaImage(
  source: Directory,
  imageName: string = "ghcr.io/shepherdjerred/homelab:latest",
  ghcrUsername: string,
  ghcrPassword: Secret,
  dryRun: boolean = false,
): Promise<StepResult> {
  const container = await buildHaContainer(source);

  // Build or publish the image based on dry-run flag
  if (dryRun) {
    // For dry-run, build the container to ensure it works
    await container.sync();
    return {
      status: "passed",
      message: "Image built successfully",
    };
  } else {
    // Publish the image
    if (ghcrUsername && ghcrPassword) {
      const result = await container
        .withRegistryAuth("ghcr.io", ghcrUsername, ghcrPassword)
        .publish(imageName);

      return {
        status: "passed",
        message: `Image published: ${result}`,
      };
    } else {
      throw new Error("GHCR username and password are required");
    }
  }
}
