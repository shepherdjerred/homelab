import {
  func,
  argument,
  Directory,
  object,
  Secret,
  dag,
  File,
} from "@dagger.io/dagger";
import {
  buildHa,
  testHa,
  typeCheckHa,
  lintHa,
  buildAndExportHaImage,
} from "./ha";
import { typeCheckCdk8s, buildK8sManifests } from "./cdk8s";
import { preCommit } from "./precommit";
import { sync as argocdSync } from "./argocd";
import { applyK8sConfig, buildAndApplyCdk8s } from "./k8s";
import { buildAndPushHaImage } from "./ha";
import { build as helmBuildFn, publish as helmPublishFn } from "./helm";
import { Stage } from "./stage";
import versions from "./versions";

export type StepStatus = "passed" | "failed" | "skipped";
export interface StepResult {
  status: StepStatus;
  message: string;
}

export interface HelmBuildResult extends StepResult {
  dist?: Directory;
}

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
   * Update the versions.ts file with the HA image version for production builds
   * @param source The source directory
   * @param version The version to set for the HA image
   * @returns The updated source directory
   */
  @func()
  async updateHaVersion(
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
    @argument() version: string
  ): Promise<Directory> {
    return dag
      .container()
      .from(`alpine:${versions.alpine}`)
      .withMountedDirectory("/workspace", source)
      .withWorkdir("/workspace")
      .withExec([
        "sed",
        "-i",
        `s/"shepherdjerred\\/homelab": "[^"]*"/"shepherdjerred\\/homelab": "${version}"/`,
        "src/cdk8s/src/versions.ts",
      ])
      .directory("/workspace");
  }

  /**
   * Runs pre-commit, kube-linter, ArgoCD sync, builds for CDK8s and HA, publishes the HA image (if prod), and publishes the Helm chart (if prod) as part of the CI pipeline.
   * @param source The source directory for pre-commit, kube-linter, and builds.
   * @param argocdToken The ArgoCD API token for authentication (as a Dagger Secret).
   * @param ghcrUsername The GHCR username (required for prod).
   * @param ghcrPassword The GHCR password (as a Dagger Secret, required for prod).
   * @param chartVersion The Helm chart version to publish (required for prod).
   * @param chartRepo The ChartMuseum repo URL (required for prod).
   * @param chartMuseumUsername The ChartMuseum username (required for prod).
   * @param chartMuseumPassword The ChartMuseum password (as a Dagger Secret, required for prod).
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
    @argument() ghcrUsername: string,
    ghcrPassword: Secret,
    @argument() chartVersion: string,
    chartRepo: string = "https://chartmuseum.tailnet-1a49.ts.net",
    @argument() chartMuseumUsername: string,
    chartMuseumPassword: Secret,
    @argument() env: Stage = Stage.Dev
  ): Promise<string> {
    // Update HA version in versions.ts if prod
    let updatedSource = source;
    if (env === Stage.Prod) {
      updatedSource = await this.updateHaVersion(source, chartVersion);
    }

    // Pre-commit (run async)
    const preCommitPromise = preCommit(updatedSource)
      .then((msg) => ({ status: "passed", message: msg }))
      .catch((e) => ({ status: "failed", message: String(e) }));

    // Start builds in parallel
    const cdk8sBuildPromise = buildK8sManifests(updatedSource, updatedSource)
      .then(() => ({ status: "passed", message: "CDK8s Build: PASSED" }))
      .catch((e) => ({
        status: "failed",
        message: `CDK8s Build: FAILED\n${e}`,
      }));

    const haBuildPromise = buildHa(updatedSource)
      .then(() => ({ status: "passed", message: "HA Build: PASSED" }))
      .catch((e) => ({ status: "failed", message: `HA Build: FAILED\n${e}` }));

    // Always build Helm chart (for both dev and prod)
    const helmBuildPromise = this.helmBuild(
      updatedSource.directory("src/cdk8s/helm"),
      chartVersion || "dev-snapshot"
    )
      .then((dist) => ({
        status: "passed" as StepStatus,
        message: "Helm Build: PASSED",
        dist,
      }))
      .catch((e) => ({
        status: "failed" as StepStatus,
        message: `Helm Build: FAILED\n${e}`,
        dist: undefined,
      }));

    // Await builds
    const [cdk8sBuildResult, haBuildResult, helmBuildResult] =
      await Promise.all([cdk8sBuildPromise, haBuildPromise, helmBuildPromise]);

    // Publish HA image if prod
    let haPublishResult: StepResult = {
      status: "skipped",
      message: "[SKIPPED] Not prod",
    };
    if (env === Stage.Prod) {
      // Push versioned tag
      haPublishResult = await this.internalPublishHaImage(
        updatedSource,
        `ghcr.io/shepherdjerred/homelab:${chartVersion}`,
        ghcrUsername,
        ghcrPassword,
        env
      );
      // Push latest tag
      const haPublishLatestResult = await this.internalPublishHaImage(
        updatedSource,
        `ghcr.io/shepherdjerred/homelab:latest`,
        ghcrUsername,
        ghcrPassword,
        env
      );
      // Combine results
      haPublishResult.message += `\nAlso pushed as latest:\n${haPublishLatestResult.message}`;
    }
    // Publish Helm chart if prod
    let helmPublishResult: StepResult = {
      status: "skipped",
      message: "[SKIPPED] Not prod",
    };
    if (env === Stage.Prod && helmBuildResult.dist) {
      // Publish using the dist directory as the source
      helmPublishResult = await this.helmPublish(
        helmBuildResult.dist,
        chartVersion,
        chartRepo,
        chartMuseumUsername,
        chartMuseumPassword,
        env
      );
    }
    // Sync (run only after successful Helm chart publish)
    let syncResult: StepResult = {
      status: "skipped",
      message: "[SKIPPED] Not prod or chart publish failed",
    };
    if (env === Stage.Prod && helmPublishResult.status === "passed") {
      const sync = await argocdSync(argocdToken);
      syncResult = sync;
    }
    // Await pre-commit result before summary
    const preCommitResult = await preCommitPromise;
    // Build summary
    const summary = [
      `Pre-commit result:\n${preCommitResult.message}`,
      `Sync result:\n${syncResult.message}`,
      cdk8sBuildResult.message,
      haBuildResult.message,
      helmBuildResult.message,
      `HA Image Publish result:\n${haPublishResult.message}`,
      `Helm Chart Publish result:\n${helmPublishResult.message}`,
    ].join("\n\n");
    // Fail if any critical step failed
    if (
      preCommitResult.status === "failed" ||
      syncResult.status === "failed" ||
      cdk8sBuildResult.status === "failed" ||
      haBuildResult.status === "failed" ||
      helmBuildResult.status === "failed" ||
      (env === Stage.Prod &&
        (haPublishResult.status === "failed" ||
          helmPublishResult.status === "failed"))
    ) {
      throw new Error(summary);
    }
    return summary;
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
    source: Directory
  ) {
    return preCommit(source);
  }

  /**
   * Triggers a sync operation on the ArgoCD application using the provided token.
   * @param argocdToken The ArgoCD API token for authentication (as a Dagger Secret).
   * @returns The stdout from the ArgoCD sync API call.
   */
  @func()
  async sync(argocdToken: Secret) {
    return JSON.stringify(await argocdSync(argocdToken), null, 2);
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
   * Builds the HA image and exports it to a tar file for testing.
   * @param source The source directory for the HA app.
   * @param imageName The image name (including tag), e.g. homelab-ha:test
   * @param outputFile The output tar file name
   * @returns The exported tar file
   */
  @func()
  async buildAndExportHaImage(
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
    imageName: string = "homelab-ha:test",
    outputFile: string = "homelab-ha-test.tar"
  ): Promise<File> {
    return buildAndExportHaImage(source, imageName, outputFile);
  }

  /**
   * Builds the HA image and optionally pushes it to GHCR, returning a StepResult.
   *
   * - In 'prod', the image is built and pushed to GHCR.
   * - In 'dev', the image is built but not pushed (dry-run).
   *
   * @param source The source directory.
   * @param imageName The image name (including tag), e.g. ghcr.io/shepherdjerred/homelab:latest
   * @param ghcrUsername The GHCR username
   * @param ghcrPassword The GHCR password (as a Dagger Secret)
   * @param env The environment to run in: 'prod' to build and push, 'dev' to only build (default: 'dev').
   * @returns A StepResult object with status and message.
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
    imageName: string,
    ghcrUsername: string,
    ghcrPassword: Secret,
    @argument() env: Stage = Stage.Dev
  ): Promise<string> {
    return JSON.stringify(
      await this.internalPublishHaImage(
        source,
        imageName,
        ghcrUsername,
        ghcrPassword,
        env
      ),
      null,
      2
    );
  }

  async internalPublishHaImage(
    source: Directory,
    imageName: string,
    ghcrUsername: string,
    ghcrPassword: Secret,
    @argument() env: Stage = Stage.Dev
  ): Promise<StepResult> {
    const isDryRun = env !== Stage.Prod;

    return buildAndPushHaImage(
      source,
      imageName,
      ghcrUsername,
      ghcrPassword,
      isDryRun
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
   * Publishes the packaged Helm chart to a ChartMuseum repo and returns a StepResult.
   * @param source The Helm chart source directory (should be src/cdk8s/helm).
   * @param version The version to publish.
   * @param repo The ChartMuseum repo URL.
   * @param chartMuseumUsername The ChartMuseum username.
   * @param chartMuseumPassword The ChartMuseum password (secret).
   * @param env The environment to run in: 'prod' to publish, 'dev' to skip (default: 'dev').
   * @returns A StepResult object with status and message.
   */
  @func()
  async helmPublish(
    @argument({ defaultPath: "src/cdk8s/helm" }) source: Directory,
    @argument() version: string,
    @argument() repo: string = "https://chartmuseum.tailnet-1a49.ts.net",
    chartMuseumUsername: string,
    chartMuseumPassword: Secret,
    @argument() env: Stage = Stage.Dev
  ): Promise<StepResult> {
    if (env !== Stage.Prod) {
      return { status: "skipped", message: "[SKIPPED] Not prod" };
    }
    try {
      const result = await helmPublishFn(
        source,
        version,
        repo,
        chartMuseumUsername,
        chartMuseumPassword
      );
      return { status: "passed", message: result };
    } catch (e) {
      return { status: "failed", message: `Helm Chart Publish: FAILED\n${e}` };
    }
  }
}
