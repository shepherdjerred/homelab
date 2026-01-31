import { dag, Container, type Secret } from "@dagger.io/dagger";
import type { StepResult } from ".";

/**
 * Builds a container with the OpenClaw application ready to run.
 * Clones and builds OpenClaw from the official repository.
 *
 * @returns A configured Container ready to run the OpenClaw application.
 */
function buildOpenclawContainer(): Container {
  return dag
    .container()
    .from("node:22-bookworm")
    .withExec(["corepack", "enable"])
    .withExec(["git", "clone", "--depth=1", "https://github.com/openclaw/openclaw.git", "/app"])
    .withWorkdir("/app")
    .withMountedCache("/root/.local/share/pnpm/store", dag.cacheVolume("pnpm-cache-openclaw"))
    .withExec(["pnpm", "install"])
    .withExec(["pnpm", "ui:build"]) // Build the UI first (auto-installs UI deps)
    .withExec(["pnpm", "build"])
    .withUser("node")
    .withExposedPort(18789)
    .withEntrypoint(["node", "dist/index.js"]);
}

/**
 * Builds the OpenClaw image and optionally pushes it to GHCR.
 *
 * @param imageName The image name (including tag), e.g. ghcr.io/shepherdjerred/openclaw:latest
 * @param ghcrUsername The GHCR username
 * @param ghcrPassword The GHCR password (as a Dagger Secret)
 * @param dryRun If true, builds the image but doesn't publish it (default: false)
 * @returns The result of the build and/or push operation.
 */
export async function buildAndPushOpenclawImage(
  imageName = "ghcr.io/shepherdjerred/openclaw:latest",
  ghcrUsername: string,
  ghcrPassword: Secret,
  dryRun = false,
): Promise<StepResult> {
  const container = buildOpenclawContainer();

  // Build or publish the image based on dry-run flag
  if (dryRun) {
    // For dry-run, build the container to ensure it works
    await container.sync();
    return {
      status: "passed",
      message: "OpenClaw image built successfully",
    };
  }
  // Publish the image
  const result = await container.withRegistryAuth("ghcr.io", ghcrUsername, ghcrPassword).publish(imageName);

  return {
    status: "passed",
    message: `OpenClaw image published: ${result}`,
  };
}
