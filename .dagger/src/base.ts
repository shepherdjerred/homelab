import { dag, Container, Directory } from "@dagger.io/dagger";

/**
 * Returns a base Bun container with Python and build tools installed, the source directory mounted, and dependencies installed.
 * @param source The source directory to mount into the container at /workspace.
 * @param workdir The working directory to set inside the container.
 * @returns A configured Dagger Container ready for further commands.
 */
export function getBaseContainer(
  source: Directory,
  workdir: string
): Container {
  return dag
    .container()
    .from("oven/bun:latest")
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "python3", "build-essential"])
    .withMountedDirectory("/workspace", source)
    .withWorkdir(workdir)
    .withExec(["bun", "install"]);
}
