import { dag, Directory } from "@dagger.io/dagger";
import {
  getSystemContainer,
  withMiseTools,
  getCurlContainer,
} from "./base";
import versions from "./versions";

export async function preCommit(source: Directory): Promise<string> {
  // Prepare kube-linter download with caching
  const kubeLinterUrl = `https://github.com/stackrox/kube-linter/releases/download/${versions["stackrox/kube-linter"]}/kube-linter-linux`;

  // Create a cache key based on version for the binary
  const kubeLinterCacheKey = `kube-linter-${versions["stackrox/kube-linter"]}-amd64`;

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

  // Create base container with mise tools and optimized dependency caching
  const mainContainer = withMiseTools(getSystemContainer())
    .withWorkdir("/workspace")
    // Copy only dependency files first for optimal caching
    .withFile("package.json", source.file("package.json"))
    .withFile("bun.lock", source.file("bun.lock"))
    // Create workspace directories and copy their package.json files
    .withExec(["mkdir", "-p", "src/ha", "src/cdk8s"])
    .withFile("src/ha/package.json", source.file("src/ha/package.json"))
    .withFile("src/ha/bun.lock", source.file("src/ha/bun.lock"))
    .withFile("src/cdk8s/package.json", source.file("src/cdk8s/package.json"))
    // Install dependencies (cached unless dependency files change)
    .withMountedCache(
      "/root/.bun/install/cache",
      dag.cacheVolume("bun-cache-root")
    )
    .withExec(["bun", "install"])
    // Now copy the full source (source changes won't invalidate dependency layer)
    .withMountedDirectory("/workspace", source);

  // Wait for both in parallel
  const [kubeLinterFile] = await Promise.all([
    kubeLinterFilePromise,
  ]);

  // Add kube-linter and run pre-commit
  const container = mainContainer
    .withFile("/usr/local/bin/kube-linter", kubeLinterFile)
    .withExec(["chmod", "+x", "/usr/local/bin/kube-linter"])
    // Cache pre-commit environments
    .withMountedCache(
      "/root/.cache/pre-commit",
      dag.cacheVolume("pre-commit-cache")
    )
    .withExec(["pre-commit", "run", "--all-files"]);

  return container.stdout();
}
