import { func, argument, Directory, object, Secret } from "@dagger.io/dagger";
import { dag } from "@dagger.io/dagger";
import { buildHa, testHa, typeCheckHa, lintHa } from "./ha";
import { typeCheckCdk8s, buildK8sManifests } from "./cdk8s";
import { preCommit } from "./precommit";
import { sync as argocdSync } from "./argocd";
import { applyK8sConfig, buildAndApplyCdk8s } from "./k8s";
import { buildAndPushHaImage } from "./ha";
import { build as helmBuildFn, publish as helmPublishFn } from "./helm";

@object()
export class Homelab {
  /**
   * Runs type check, test, and lint for HA, and type check for CDK8s in parallel.
   * @param source The source directory to use for all checks.
   * @returns A summary string of the results for each check.
   */
  @func()
  async checkAll(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory
  ): Promise<string> {
    const haTypeCheck = typeCheckHa(source);
    const haTest = testHa(source);
    const haLint = lintHa(source);
    const cdk8sTypeCheck = typeCheckCdk8s(source);
    const results = await Promise.allSettled([
      haTypeCheck,
      haTest,
      haLint,
      cdk8sTypeCheck,
    ]);
    const summary = results
      .map((result, index) => {
        const names = ["HA TypeCheck", "HA Test", "HA Lint", "CDK8s TypeCheck"];
        return `${names[index]}: ${result.status === "fulfilled" ? "PASSED" : "FAILED"}`;
      })
      .join("\n");
    return `Pipeline Results:\n${summary}`;
  }

  /**
   * Runs pre-commit, kube-linter, and ArgoCD sync as part of the CI pipeline.
   * @param source The source directory for pre-commit and kube-linter.
   * @param argocdToken The ArgoCD API token for authentication (as a Dagger Secret).
   * @param targetArch The target architecture for kube-linter (default: "amd64").
   * @param kubeLinterVersion The version of kube-linter to use (default: "v0.6.8").
   * @returns A summary string of the results for each CI step.
   */
  @func()
  async ci(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory,
    argocdToken: Secret,
    targetArch: string = "amd64",
    kubeLinterVersion: string = "v0.6.8"
  ): Promise<string> {
    const preCommitResult = await preCommit(
      source,
      targetArch,
      kubeLinterVersion
    );
    const syncResult = await argocdSync(argocdToken);
    return [
      "Pre-commit result:\n" + preCommitResult,
      "Sync result:\n" + syncResult,
    ].join("\n\n");
  }

  // --- HA methods ---
  @func()
  async buildHa(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory
  ) {
    return buildHa(source);
  }

  @func()
  async testHa(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory
  ) {
    return testHa(source);
  }

  @func()
  async typeCheckHa(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory
  ) {
    return typeCheckHa(source);
  }

  @func()
  async lintHa(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory
  ) {
    return lintHa(source);
  }

  // --- CDK8s methods ---
  @func()
  async typeCheckCdk8s(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory
  ) {
    return typeCheckCdk8s(source);
  }

  @func()
  async buildK8sManifests(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory,
    outputDir: Directory
  ) {
    return buildK8sManifests(source, outputDir);
  }

  // --- Precommit methods ---
  @func()
  async preCommit(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory,
    @argument({}) targetArch: string = "amd64",
    @argument({}) kubeLinterVersion: string = "v0.6.8"
  ) {
    return preCommit(source, targetArch, kubeLinterVersion);
  }

  // --- ArgoCD methods ---
  @func()
  async sync(argocdToken: Secret) {
    return argocdSync(argocdToken);
  }

  // --- K8s methods ---
  @func()
  async applyK8sConfig(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: "manifests",
    })
    source: Directory,
    manifestsPath: string = "manifests"
  ) {
    return applyK8sConfig(source, manifestsPath);
  }

  @func()
  async buildAndApplyCdk8s(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory
  ) {
    return buildAndApplyCdk8s(source);
  }

  @func()
  async publishHaImage(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
      defaultPath: ".",
    })
    source: Directory,
    imageName: string = "ghcr.io/shepherdjerred/homelab:latest",
    registryUsername?: Secret,
    registryPassword?: Secret
  ) {
    return buildAndPushHaImage(
      source,
      imageName,
      registryUsername,
      registryPassword
    );
  }

  @func()
  async helmBuild(
    @argument({ defaultPath: "src/cdk8s/helm" }) source: Directory,
    @argument() version: string
  ) {
    return helmBuildFn(source, version);
  }

  @func()
  async helmPublish(
    @argument({ defaultPath: "src/cdk8s/helm" }) source: Directory,
    @argument() version: string,
    @argument() repo: string = "https://chartmuseum.tailnet-1a49.ts.net",
    username: Secret,
    password: Secret
  ) {
    return helmPublishFn(source, version, repo, username, password);
  }
}
