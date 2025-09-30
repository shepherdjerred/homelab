import { dag, Container, Directory, type Platform } from "@dagger.io/dagger";
import versions from "./versions";

/**
 * Returns a base system container with OS packages installed (rarely changes).
 * This layer is cached independently and only rebuilds when system dependencies change.
 */
export function getSystemContainer(platform?: Platform): Container {
  return (
    dag
      .container({ platform })
      .from(`ubuntu:${versions.ubuntu}`)
      // Cache APT packages
      .withMountedCache(
        "/var/cache/apt",
        dag.cacheVolume(`apt-cache-${platform || "default"}`),
      )
      .withMountedCache(
        "/var/lib/apt",
        dag.cacheVolume(`apt-lib-${platform || "default"}`),
      )
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
        "python3",
      ])
  );
}

/**
 * Returns a container with mise development tools installed (bun, node, python).
 * This provides a consistent runtime environment with all necessary tools.
 */
export function getMiseRuntimeContainer(platform?: Platform): Container {
  return withMiseTools(getSystemContainer(platform));
}

/**
 * Creates a workspace-specific container with dependencies installed.
 * Uses Docker layer caching: copy dependency files -> install -> copy source.
 * @param source The source directory
 * @param workspacePath The path to the workspace (e.g., "src/ha", "src/cdk8s")
 * @param platform Optional platform specification
 * @returns A configured container with workspace dependencies installed
 */
export function getWorkspaceContainer(
  source: Directory,
  workspacePath: string,
  platform?: Platform,
): Container {
  const workspaceSource = source.directory(workspacePath);

  let container = getMiseRuntimeContainer(platform)
    .withWorkdir(`/workspace/${workspacePath}`)
    // Copy package.json first (required)
    .withFile("package.json", workspaceSource.file("package.json"));

  return (
    container
      // Install dependencies (cached unless dependency files change)
      .withMountedCache(
        "/root/.bun/install/cache",
        dag.cacheVolume(`bun-cache-${platform || "default"}`),
      )
      .withExec(["bun", "install"])
      // Now copy the full source (source changes won't invalidate dependency layer)
      .withDirectory(".", workspaceSource)
  );
}

/**
 * Returns a base Ubuntu container with common tools and caching configured.
 * @param source The source directory to mount into the container at /workspace.
 * @param platform The platform to build for (optional).
 * @returns A configured Dagger Container ready for further commands.
 */
export function getUbuntuBaseContainer(
  source: Directory,
  platform?: Platform,
): Container {
  return getSystemContainer(platform)
    .withWorkdir("/workspace")
    .withMountedDirectory("/workspace", source);
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
 * Uses improved caching for tool installation.
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
        dag.cacheVolume(`mise-tools`),
      )
      .withExec(["mise", "trust"])
      .withExec([
        "mise",
        "use",
        "-g",
        `bun@${versions["bun"]}`,
        `python@${versions["python"]}`,
        `node@${versions["node"]}`,
        `helm@${versions["helm"]}`,
      ])
      .withEnvVariable("PATH", "/root/.local/share/mise/shims:${PATH}", {
        expand: true,
      })
      // Cache pip packages
      .withMountedCache("/root/.cache/pip", dag.cacheVolume(`pip-cache`))
      .withExec(["mise", "reshim"])
  );
}
