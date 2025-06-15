import { dag, Directory } from "@dagger.io/dagger";
import {
  getUbuntuBaseContainer,
  withMiseTools,
  getCurlContainer,
} from "./base";
import versions from "./versions";

export async function preCommit(
  source: Directory,
  targetArch: string = "amd64"
): Promise<string> {
  // Prepare kube-linter download with caching
  const kubeLinterUrl =
    targetArch === "arm64"
      ? `https://github.com/stackrox/kube-linter/releases/download/${versions["stackrox/kube-linter"]}/kube-linter-linux_arm64`
      : `https://github.com/stackrox/kube-linter/releases/download/${versions["stackrox/kube-linter"]}/kube-linter-linux`;

  // Create a cache key based on version and arch for the binary
  const kubeLinterCacheKey = `kube-linter-${versions["stackrox/kube-linter"]}-${targetArch}`;

  const kubeLinterFilePromise = getCurlContainer()
    // Cache downloaded binaries
    .withMountedCache("/tmp/downloads", dag.cacheVolume("binary-downloads"), {
      owner: "curl_user",
    })
    .withExec([
      "sh",
      "-c",
      `if [ ! -f /tmp/downloads/${kubeLinterCacheKey} ]; then echo "Downloading kube-linter..." && curl -fsSL ${kubeLinterUrl} -o /tmp/downloads/${kubeLinterCacheKey}; else echo "Using cached kube-linter"; fi && cp /tmp/downloads/${kubeLinterCacheKey} /tmp/kube-linter`,
    ])
    .file("/tmp/kube-linter");

  // Main container setup using cached base
  const mainContainerPromise = withMiseTools(getUbuntuBaseContainer(source));

  // Wait for both in parallel
  const [kubeLinterFile, mainContainer] = await Promise.all([
    kubeLinterFilePromise,
    mainContainerPromise,
  ]);

  // Add kube-linter to the main container and run pre-commit
  const container = mainContainer
    .withFile("/usr/local/bin/kube-linter", kubeLinterFile)
    .withExec(["chmod", "+x", "/usr/local/bin/kube-linter"])
    // Cache pre-commit environments
    .withMountedCache(
      "/root/.cache/pre-commit",
      dag.cacheVolume("pre-commit-cache")
    )
    // Cache Bun install dependencies
    .withMountedCache(
      "/root/.bun/install/cache",
      dag.cacheVolume("bun-install-cache")
    )
    .withExec(["pre-commit", "run", "--all-files"]);

  return container.stdout();
}
