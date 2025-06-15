import { dag, Container, Directory } from "@dagger.io/dagger";
import versions from "./versions";

/**
 * Returns a base Bun container with Python and build tools installed, the source directory mounted, and dependencies installed.
 * Uses cache volumes for improved performance across builds.
 * @param source The source directory to mount into the container at /workspace.
 * @param workdir The working directory to set inside the container.
 * @returns A configured Dagger Container ready for further commands.
 */
export function getBaseContainer(
  source: Directory,
  workdir: string
): Container {
  return (
    dag
      .container()
      .from(`oven/bun:${versions["oven/bun"]}`)
      // Cache APT packages
      .withMountedCache("/var/cache/apt", dag.cacheVolume("apt-cache"))
      .withMountedCache("/var/lib/apt", dag.cacheVolume("apt-lib"))
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "python3", "build-essential"])
      .withMountedDirectory("/workspace", source)
      .withWorkdir(workdir)
      // Cache Bun dependencies
      .withMountedCache(
        "/root/.bun/install/cache",
        dag.cacheVolume("bun-cache")
      )
      .withExec(["bun", "install"])
  );
}

/**
 * Returns a base Ubuntu container with common tools and caching configured.
 * @param source The source directory to mount into the container at /workspace.
 * @returns A configured Dagger Container ready for further commands.
 */
export function getUbuntuBaseContainer(source: Directory): Container {
  return (
    dag
      .container()
      .from(`ubuntu:${versions.ubuntu}`)
      .withWorkdir("/workspace")
      .withMountedDirectory("/workspace", source)
      // Cache APT packages
      .withMountedCache("/var/cache/apt", dag.cacheVolume("apt-cache"))
      .withMountedCache("/var/lib/apt", dag.cacheVolume("apt-lib"))
      .withExec(["apt-get", "update"])
      .withExec([
        "apt-get",
        "install",
        "-y",
        "gpg",
        "wget",
        "curl",
        "git",
        "build-essential",
      ])
  );
}

/**
 * Returns a cached curl container optimized for HTTP operations.
 * @returns A configured Container with curl and caching ready.
 */
export function getCurlContainer(): Container {
  return dag.container().from(`curlimages/curl:${versions["curlimages/curl"]}`);
}

/**
 * Returns a cached kubectl container optimized for Kubernetes operations.
 * @returns A configured Container with kubectl and caching ready.
 */
export function getKubectlContainer(): Container {
  return dag.container().from(`bitnami/kubectl:${versions["bitnami/kubectl"]}`);
}

/**
 * Returns a container with mise (development tools) installed and cached.
 * @param baseContainer The base container to build upon.
 * @returns A configured Container with mise and tools ready.
 */
export function withMiseTools(baseContainer: Container): Container {
  return (
    baseContainer
      .withExec(["install", "-dm", "755", "/etc/apt/keyrings"])
      .withExec([
        "sh",
        "-c",
        "wget -qO - https://mise.jdx.dev/gpg-key.pub | gpg --dearmor > /etc/apt/keyrings/mise-archive-keyring.gpg",
      ])
      .withExec([
        "sh",
        "-c",
        `echo 'deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.gpg] https://mise.jdx.dev/deb stable main' > /etc/apt/sources.list.d/mise.list`,
      ])
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "mise"])
      // Cache mise tools
      .withMountedCache(
        "/root/.local/share/mise",
        dag.cacheVolume("mise-cache")
      )
      .withExec(["mise", "trust"])
      .withExec(["mise", "use", "bun@latest", "python@latest"])
      .withEnvVariable("PATH", "/root/.local/share/mise/shims:${PATH}", {
        expand: true,
      })
      // Cache pip packages
      .withMountedCache("/root/.cache/pip", dag.cacheVolume("pip-cache"))
      .withExec(["pip", "install", "pre-commit"])
      .withExec(["mise", "reshim"])
  );
}
