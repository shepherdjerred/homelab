import { Directory, dag, type Secret } from "@dagger.io/dagger";
import {
  getBaseContainer,
  getUbuntuBaseContainer,
  withMiseTools,
} from "./base";

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
): Promise<string> {
  let container = withMiseTools(getUbuntuBaseContainer(source))
    .withWorkdir("/workspace/src/ha")
    // Cache Bun dependencies for Docker build
    .withMountedCache("/root/.bun/install/cache", dag.cacheVolume("bun-cache"))
    .withExec(["bun", "install", "--frozen-lockfile"])
    .withEntrypoint(["mise", "exec", "--", "bun", "src/main.ts"]);

  // Optionally add registry auth
  if (ghcrUsername && ghcrPassword) {
    container = container.withRegistryAuth(
      "ghcr.io",
      ghcrUsername,
      ghcrPassword
    );
  }

  // Build or publish the image based on dry-run flag
  if (dryRun) {
    // For dry-run, just return the image ID to prove it built successfully
    return `[DRY-RUN] Image built successfully but not published: ${imageName}`;
  } else {
    // Publish the image
    return container.publish(imageName);
  }
}
