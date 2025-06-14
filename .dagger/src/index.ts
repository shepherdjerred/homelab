import { func, argument, Directory, object, Secret } from "@dagger.io/dagger";
import { buildHa, testHa, typeCheckHa, lintHa } from "./ha";
import { typeCheckCdk8s, buildK8sManifests } from "./cdk8s";
import { preCommit } from "./precommit";
import { sync as argocdSync } from "./argocd";
import { applyK8sConfig, buildAndApplyCdk8s } from "./k8s";
import { buildAndPushHaImage } from "./ha";
import { build as helmBuildFn, publish as helmPublishFn } from "./helm";
import { Stage } from "./stage";

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
        return `${names[index]}: ${
          result.status === "fulfilled" ? "PASSED" : "FAILED"
        }`;
      })
      .join("\n");
    return `Pipeline Results:\n${summary}`;
  }

  /**
   * Runs pre-commit, kube-linter, ArgoCD sync, builds for CDK8s and HA, and publishes the HA image (if prod) as part of the CI pipeline.
   * @param source The source directory for pre-commit, kube-linter, and builds.
   * @param argocdToken The ArgoCD API token for authentication (as a Dagger Secret).
   * @param registryUsername The container registry username (required for prod).
   * @param registryPassword The container registry password (as a Dagger Secret, required for prod).
   * @param targetArch The target architecture for kube-linter (default: "amd64").
   * @param kubeLinterVersion The version of kube-linter to use (default: "v0.6.8").
   * @param env The environment (e.g., 'prod' or 'dev').
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
    registryUsername: string,
    registryPassword: Secret,
    targetArch: string = "amd64",
    kubeLinterVersion: string = "v0.6.8",
    @argument() env: Stage = Stage.Dev
  ): Promise<string> {
    const preCommitResult = await preCommit(
      source,
      targetArch,
      kubeLinterVersion
    );
    let syncResult = "[SKIPPED] Not prod";
    if (env === Stage.Prod) {
      syncResult = await argocdSync(argocdToken);
    }
    // Build CDK8s manifests
    let cdk8sBuildResult: string;
    try {
      await buildK8sManifests(source, source); // outputDir is not used, just for build check
      cdk8sBuildResult = "CDK8s Build: PASSED";
    } catch (e) {
      cdk8sBuildResult = `CDK8s Build: FAILED\n${e}`;
    }
    // Build HA
    let haBuildResult: string;
    try {
      await buildHa(source);
      haBuildResult = "HA Build: PASSED";
    } catch (e) {
      haBuildResult = `HA Build: FAILED\n${e}`;
    }
    // Publish HA image if prod
    let haPublishResult = "[SKIPPED] Not prod";
    if (env === Stage.Prod) {
      try {
        haPublishResult = await this.publishHaImage(
          source,
          undefined, // use default image name
          registryUsername,
          registryPassword,
          env
        );
      } catch (e) {
        haPublishResult = `HA Image Publish: FAILED\n${e}`;
      }
    }
    return [
      "Pre-commit result:\n" + preCommitResult,
      "Sync result:\n" + syncResult,
      cdk8sBuildResult,
      haBuildResult,
      "HA Image Publish result:\n" + haPublishResult,
    ].join("\n\n");
  }

  /**
   * Builds the Home Assistant (HA) app.
   * @param source The source directory for the HA app.
   * @returns The built HA app directory.
   */
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

  /**
   * Runs tests for the Home Assistant (HA) app.
   * @param source The source directory for the HA app.
   * @returns The stdout from the test run.
   */
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

  /**
   * Runs TypeScript type checking for the Home Assistant (HA) app.
   * @param source The source directory for the HA app.
   * @returns The stdout from the type check run.
   */
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

  /**
   * Runs linter for the Home Assistant (HA) app.
   * @param source The source directory for the HA app.
   * @returns The stdout from the lint run.
   */
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

  /**
   * Runs TypeScript type checking for the CDK8s project.
   * @param source The source directory for the CDK8s project.
   * @returns The stdout from the type check run.
   */
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

  /**
   * Builds Kubernetes manifests using CDK8s.
   * @param source The source directory for the CDK8s project.
   * @param outputDir The output directory for the generated manifests.
   * @returns The output directory containing the generated manifests.
   */
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

  /**
   * Runs pre-commit hooks and kube-linter.
   * @param source The source directory to run pre-commit and kube-linter on.
   * @param targetArch The target architecture for kube-linter (default: "amd64").
   * @param kubeLinterVersion The version of kube-linter to use (default: "v0.6.8").
   * @returns The stdout from the pre-commit and kube-linter run.
   */
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

  /**
   * Triggers a sync operation on the ArgoCD application using the provided token.
   * @param argocdToken The ArgoCD API token for authentication (as a Dagger Secret).
   * @returns The stdout from the ArgoCD sync API call.
   */
  @func()
  async sync(argocdToken: Secret) {
    return argocdSync(argocdToken);
  }

  /**
   * Applies Kubernetes manifests from the specified directory using kubectl.
   * @param source The source directory containing Kubernetes manifests.
   * @param manifestsPath The path within the source directory to the manifests (default: "manifests").
   * @returns The stdout from the kubectl apply command.
   */
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

  /**
   * Builds manifests with CDK8s and applies them to the cluster using kubectl.
   * @param source The source directory for the CDK8s project.
   * @returns The stdout from the kubectl apply command.
   */
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

  /**
   * Builds the HA image and optionally pushes it to the specified registry.
   *
   * - In 'prod', the image is built and pushed to the registry.
   * - In 'dev', the image is built but not pushed.
   *
   * @param source The source directory.
   * @param imageName The image name (including tag), e.g. ghcr.io/shepherdjerred/homelab:latest
   * @param registryUsername The registry username
   * @param registryPassword The registry password (as a Dagger Secret)
   * @param env The environment to run in: 'prod' to build and push, 'dev' to only build (default: 'dev').
   * @returns The result of the build and/or push operation.
   */
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
    registryUsername: string,
    registryPassword: Secret,
    @argument() env: Stage = Stage.Dev
  ) {
    if (env !== Stage.Prod) {
      return "[SKIPPED] Not prod";
    }
    return buildAndPushHaImage(
      source,
      imageName,
      registryUsername,
      registryPassword
    );
  }

  /**
   * Builds the Helm chart, updates version/appVersion, and exports artifacts.
   * @param source The Helm chart source directory (should be src/cdk8s/helm).
   * @param version The version to set in Chart.yaml and appVersion.
   * @returns The dist directory with packaged chart and YAMLs.
   */
  @func()
  async helmBuild(
    @argument({ defaultPath: "src/cdk8s/helm" }) source: Directory,
    @argument() version: string
  ) {
    return helmBuildFn(source, version);
  }

  /**
   * Publishes the packaged Helm chart to a ChartMuseum repo.
   * @param source The Helm chart source directory (should be src/cdk8s/helm).
   * @param version The version to publish.
   * @param repo The ChartMuseum repo URL.
   * @param username The ChartMuseum username (secret).
   * @param password The ChartMuseum password (secret).
   * @param env The environment to run in: 'prod' to publish, 'dev' to skip (default: 'dev').
   * @returns The curl output from the publish step, or a skipped message if not prod.
   */
  @func()
  async helmPublish(
    @argument({ defaultPath: "src/cdk8s/helm" }) source: Directory,
    @argument() version: string,
    @argument() repo: string = "https://chartmuseum.tailnet-1a49.ts.net",
    username: Secret,
    password: Secret,
    @argument() env: Stage = Stage.Dev
  ) {
    if (env !== Stage.Prod) {
      return "[SKIPPED] Not prod";
    }
    return helmPublishFn(source, version, repo, username, password, env);
  }
}
