import { Directory, dag, type Secret, Container, type File } from "@dagger.io/dagger";
import { getWorkspaceContainer, getMiseRuntimeContainer } from "./base";
import type { StepResult } from ".";
import versions from "./versions";

export function buildHa(source: Directory): Directory {
  return getWorkspaceContainer(source, "src/ha").withExec(["bun", "run", "build"]).directory("/workspace/src/ha");
}

/**
 * Prepares the HA container by generating hass.d.ts.
 * Accepts optional HA credentials to generate real types, otherwise uses CI stub.
 */
function prepareHaContainer(source: Directory, hassBaseUrl: Secret, hassToken: Secret): Container {
  let container = getWorkspaceContainer(source, "src/ha");

  container = container
    .withSecretVariable("HASS_BASE_URL", hassBaseUrl)
    .withSecretVariable("HASS_TOKEN", hassToken)
    .withExec(["bun", "generate-types.ts"]);

  return container;
}

export async function typeCheckHa(source: Directory, hassBaseUrl: Secret, hassToken: Secret): Promise<string> {
  const container = prepareHaContainer(source, hassBaseUrl, hassToken);

  return container.withExec(["bun", "run", "typecheck"]).stdout();
}

export async function lintHa(source: Directory, hassBaseUrl: Secret, hassToken: Secret): Promise<string> {
  const container = prepareHaContainer(source, hassBaseUrl, hassToken);

  return container.withExec(["bun", "run", "lint"]).stdout();
}

/**
 * Builds a container with the HA application ready to run.
 * Uses improved caching for better build performance.
 *
 * @param source The source directory.
 * @returns A configured Container ready to run the HA application.
 */
function buildHaContainer(source: Directory): Container {
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
      // Copy minimal workspace files needed for dependency resolution
      .withFile("src/ha/package.json", haSource.file("package.json"))
      .withFile("src/cdk8s/package.json", source.file("src/cdk8s/package.json"))
      .withFile("src/helm-types/package.json", source.file("src/helm-types/package.json"))
      .withFile(".dagger/package.json", source.file(".dagger/package.json"))
      // Install dependencies (cached unless dependency files change)
      .withMountedCache("/root/.bun/install/cache", dag.cacheVolume("bun-cache-default-ha"))
      .withExec(["bun", "install", "--frozen-lockfile"])
      // Copy the full ha source after dependencies are resolved
      .withDirectory("src/ha", haSource, { exclude: ["package.json"] })
      // Set working directory to the ha workspace
      .withWorkdir("/app/src/ha")
      .withDefaultArgs(["mise", "exec", `bun@${versions.bun}`, "--", "bun", "src/main.ts"])
  );
}

/**
 * Builds the HA image and exports it to a tar file for testing.
 * Uses caching for improved build performance.
 *
 * @param source The source directory.
 * @returns The exported tar file
 */
export function buildAndExportHaImage(source: Directory): File {
  const container = buildHaContainer(source);
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
  imageName = "ghcr.io/shepherdjerred/homelab:latest",
  ghcrUsername: string,
  ghcrPassword: Secret,
  dryRun = false,
): Promise<StepResult> {
  const container = buildHaContainer(source);

  // Build or publish the image based on dry-run flag
  if (dryRun) {
    // For dry-run, build the container to ensure it works
    await container.sync();
    return {
      status: "passed",
      message: "Image built successfully",
    };
  }
  // Publish the image
  const result = await container.withRegistryAuth("ghcr.io", ghcrUsername, ghcrPassword).publish(imageName);

  return {
    status: "passed",
    message: `Image published: ${result}`,
  };
}
