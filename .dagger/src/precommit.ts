import { dag, Directory } from "@dagger.io/dagger";
import { getUbuntuBaseContainer, withMiseTools } from "./base";

export async function preCommit(
  source: Directory,
  targetArch: string = "amd64",
  kubeLinterVersion: string = "v0.6.8"
): Promise<string> {
  // Prepare kube-linter download with caching
  const kubeLinterUrl =
    targetArch === "arm64"
      ? `https://github.com/stackrox/kube-linter/releases/download/${kubeLinterVersion}/kube-linter-linux_arm64`
      : `https://github.com/stackrox/kube-linter/releases/download/${kubeLinterVersion}/kube-linter-linux`;
  
  // Create a cache key based on version and arch for the binary
  const kubeLinterCacheKey = `kube-linter-${kubeLinterVersion}-${targetArch}`;
  
  const kubeLinterFilePromise = dag
    .container()
    .from("curlimages/curl")
    // Cache downloaded binaries
    .withMountedCache("/tmp/downloads", dag.cacheVolume("binary-downloads"))
    .withExec([
      "sh", 
      "-c", 
      `if [ ! -f /tmp/downloads/${kubeLinterCacheKey} ]; then curl -fsSL ${kubeLinterUrl} -o /tmp/downloads/${kubeLinterCacheKey}; fi && cp /tmp/downloads/${kubeLinterCacheKey} /tmp/kube-linter`
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
    .withMountedCache("/root/.cache/pre-commit", dag.cacheVolume("pre-commit-cache"))
    .withExec(["pre-commit", "run", "--all-files"]);
  
  return container.stdout();
}
