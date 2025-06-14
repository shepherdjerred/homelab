import { Directory, dag, type Secret } from "@dagger.io/dagger";
import { getBaseContainer } from "./base";

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
 *
 * - In 'prod', the image is built and pushed to GHCR.
 * - In 'dev', the image is built but not pushed.
 *
 * @param source The source directory.
 * @param imageName The image name (including tag), e.g. ghcr.io/shepherdjerred/homelab:latest
 * @param ghcrUsername The GHCR username
 * @param ghcrPassword The GHCR password (as a string, should be passed as a secret from the CLI or environment)
 * @param env The environment to run in: 'prod' to build and push, 'dev' to only build (default: 'dev').
 * @returns The result of the build and/or push operation.
 */
export async function buildAndPushHaImage(
  source: Directory,
  imageName: string = "ghcr.io/shepherdjerred/homelab:latest",
  ghcrUsername: string,
  ghcrPassword: Secret
): Promise<string> {
  let container = dag
    .container()
    .from("oven/bun:latest")
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "python3", "build-essential"])
    .withMountedDirectory("/usr/src/app", source)
    .withWorkdir("/usr/src/app/src/ha")
    .withExec(["bun", "install", "--frozen-lockfile"])
    .withEntrypoint(["bun", "run", "src/main.ts"]);

  // Optionally add registry auth
  if (ghcrUsername && ghcrPassword) {
    container = container.withRegistryAuth(
      "ghcr.io",
      ghcrUsername,
      ghcrPassword
    );
  }

  // Publish the image
  return container.publish(imageName);
}
