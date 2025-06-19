import {
  Directory,
  dag,
  type Secret,
  Container,
  type File,
} from "@dagger.io/dagger";
import {
  getBaseContainer,
  getUbuntuBaseContainer,
  withMiseTools,
} from "./base";
import type { StepResult } from ".";
import versions from "./versions";

export async function buildHa(source: Directory): Promise<Directory> {
  return getBaseContainer(source, "/workspace/src/ha")
    .withExec(["bun", "run", "build"])
    .directory("/workspace/src/ha");
}

export async function testHa(source: Directory): Promise<string> {
  return getBaseContainer(source, "/workspace/src/ha")
    .withExec(["bun", "test"])
    .stdout();
}

export async function typeCheckHa(source: Directory): Promise<string> {
  return getBaseContainer(source, "/workspace/src/ha")
    .withExec(["bunx", "tsc", "--noEmit"])
    .stdout();
}

export async function lintHa(source: Directory): Promise<string> {
  return getBaseContainer(source, "/workspace/src/ha")
    .withExec(["bun", "run", "lint"])
    .stdout();
}

/**
 * Builds the HA image and exports it to a tar file for testing.
 * Uses caching for improved build performance.
 *
 * @param source The source directory.
 * @param imageName The image name (including tag), e.g. homelab-ha:test
 * @param outputFile The output tar file name
 * @returns The exported tar file
 */
export async function buildAndExportHaImage(
  source: Directory,
  imageName: string = "homelab-ha:test",
  outputFile: string = "homelab-ha-test.tar"
): Promise<File> {
  // Build the container
  const container = (await withMiseTools(getUbuntuBaseContainer(source)))
    .withDirectory("/workspace", source)
    .withWorkdir("/workspace/src/ha")
    // Cache Bun dependencies for Docker build
    .withMountedCache("/root/.bun/install/cache", dag.cacheVolume("bun-cache"))
    .withExec(["bun", "install", "--frozen-lockfile"])
    .withDefaultArgs([
      "mise",
      "exec",
      `bun@${versions["bun"]}`,
      "--",
      "bun",
      "src/main.ts",
    ]);

  // Export the container as a tar file and return it directly
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
  dryRun: boolean = false
): Promise<StepResult> {
  // Build the container
  const container = (await withMiseTools(getUbuntuBaseContainer(source)))
    .withDirectory("/workspace", source)
    .withWorkdir("/workspace/src/ha")
    // Cache Bun dependencies for Docker build
    .withMountedCache("/root/.bun/install/cache", dag.cacheVolume("bun-cache"))
    .withExec(["bun", "install", "--frozen-lockfile"])
    .withDefaultArgs([
      "mise",
      "exec",
      `bun@${versions["bun"]}`,
      "--",
      "bun",
      "src/main.ts",
    ]);

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
