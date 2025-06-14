import { dag, argument, Directory, File, Container } from "@dagger.io/dagger";

export async function preCommit(
  source: Directory,
  targetArch: string = "amd64",
  kubeLinterVersion: string = "v0.6.8"
): Promise<string> {
  // Prepare kube-linter download in parallel (to /tmp/kube-linter)
  const kubeLinterUrl =
    targetArch === "arm64"
      ? `https://github.com/stackrox/kube-linter/releases/download/${kubeLinterVersion}/kube-linter-linux_arm64`
      : `https://github.com/stackrox/kube-linter/releases/download/${kubeLinterVersion}/kube-linter-linux`;
  const kubeLinterFilePromise = dag
    .container()
    .from("curlimages/curl")
    .withExec(["curl", "-fsSL", kubeLinterUrl, "-o", "/tmp/kube-linter"])
    .file("/tmp/kube-linter");

  // Main container setup
  const mainContainerPromise = dag
    .container()
    .from("ubuntu:noble")
    .withWorkdir("/workspace")
    .withMountedDirectory("/workspace", source)
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
    .withExec(["install", "-dm", "755", "/etc/apt/keyrings"])
    .withExec([
      "sh",
      "-c",
      "wget -qO - https://mise.jdx.dev/gpg-key.pub | gpg --dearmor > /etc/apt/keyrings/mise-archive-keyring.gpg",
    ])
    .withExec([
      "sh",
      "-c",
      "echo 'deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.gpg arch=amd64] https://mise.jdx.dev/deb stable main' > /etc/apt/sources.list.d/mise.list",
    ])
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "mise"])
    .withExec(["mise", "trust"])
    .withExec(["mise", "use", "bun@latest", "python@latest"])
    .withEnvVariable("PATH", "/root/.local/share/mise/shims:${PATH}", {
      expand: true,
    })
    .withExec(["pip", "install", "pre-commit"])
    .withExec(["mise", "reshim"]);

  // Wait for both in parallel
  const [kubeLinterFile, mainContainer] = await Promise.all([
    kubeLinterFilePromise,
    mainContainerPromise,
  ]);

  // Add kube-linter to the main container
  let container = mainContainer
    .withFile("/usr/local/bin/kube-linter", kubeLinterFile)
    .withExec(["chmod", "+x", "/usr/local/bin/kube-linter"])
    .withExec(["pre-commit", "run", "--all-files"]);
  return container.stdout();
}
