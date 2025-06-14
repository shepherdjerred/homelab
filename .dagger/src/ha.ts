import { argument, Directory, dag, Secret } from "@dagger.io/dagger";
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
 * Builds and pushes the HA image to the specified registry.
 * @param source The source directory.
 * @param imageName The image name (including tag), e.g. ghcr.io/shepherdjerred/homelab:latest
 * @param registryUsername The registry username (as a string, should be passed as a secret from the CLI or environment)
 * @param registryPassword The registry password (as a string, should be passed as a secret from the CLI or environment)
 */
export async function buildAndPushHaImage(
  source: Directory,
  imageName: string = "ghcr.io/shepherdjerred/homelab:latest",
  registryUsername?: string,
  registryPassword?: string
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
  if (registryUsername && registryPassword) {
    container = container.withRegistryAuth(
      "ghcr.io",
      registryUsername,
      registryPassword
    );
  }

  // Publish the image
  return container.publish(imageName);
}
