import {
  Directory,
  dag,
  type Secret,
  Container,
  type Platform,
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
  // Define platforms to build for
  const platforms = ["linux/amd64", "linux/arm64"] as const;

  // Build containers for each platform in parallel
  const platformVariants = await Promise.all(
    platforms.map(async (platform) => {
      return (
        (
          await withMiseTools(
            // Strangely, Dagger defines the Platform type in such a way that it cannot be instantiated
            getUbuntuBaseContainer(source, platform as Platform)
          )
        )
          .withDirectory("/workspace", source)
          .withWorkdir("/workspace/src/ha")
          // Cache Bun dependencies for Docker build
          .withMountedCache(
            "/root/.bun/install/cache",
            dag.cacheVolume(`bun-cache-${platform}`)
          )
          .withExec(["bun", "install", "--frozen-lockfile"])
          .withDefaultArgs([
            "mise",
            "exec",
            `bun@${versions["bun"]}`,
            "--",
            "bun",
            "src/main.ts"])
      );
    })
  );

  // Build or publish the image based on dry-run flag
  if (dryRun) {
    // For dry-run, build all platform variants to ensure they all work
    await Promise.all(platformVariants.map((container) => container.sync()));
    return {
      status: "passed",
      message: `Multi-platform image built successfully for platforms: ${platforms.join(", ")}`,
    };
  } else {
    // Publish the multi-platform image
    if (ghcrUsername && ghcrPassword) {
      // Set up registry authentication on the base container
      const publishContainer = dag
        .container()
        .withRegistryAuth("ghcr.io", ghcrUsername, ghcrPassword);

      const result = await publishContainer.publish(imageName, {
        platformVariants,
      });

      return {
        status: "passed",
        message: `Multi-platform image published: ${result}`,
      };
    } else {
      throw new Error("GHCR username and password are required");
    }
  }
}
