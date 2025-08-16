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
import {
  getMiseRuntimeContainer,
  getSystemContainer,
  withMiseTools,
} from "./base";
import { typeCheckCdk8s, buildK8sManifests, testCdk8s } from "./cdk8s";
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
        ".dagger",
      ],
      defaultPath: ".",
    })
    source: Directory,
  ): Promise<string> {
    const haTypeCheck = typeCheckHa(source);
    const haTest = testHa(source);
    const haLint = lintHa(source);
    const cdk8sTypeCheck = typeCheckCdk8s(source.directory("src/cdk8s"));
    const cdk8sTest = testCdk8s(source.directory("src/cdk8s"));
    const results = await Promise.allSettled([
      haTypeCheck,
      haTest,
      haLint,
      cdk8sTypeCheck,
      cdk8sTest,
    ]);
    const summary = results
      .map((result, index) => {
        const names = [
          "HA TypeCheck",
          "HA Test",
          "HA Lint",
          "CDK8s TypeCheck",
          "CDK8s Test",
        ];
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
        ".dagger",
      ],
      defaultPath: ".",
    })
    source: Directory,
    @argument() version: string,
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
   * Runs kube-linter, ArgoCD sync, builds for CDK8s and HA, publishes the HA image (if prod), and publishes the Helm chart (if prod) as part of the CI pipeline.
   * @param source The source directory for kube-linter, and builds.
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
      // Note: .dagger is NOT ignored here because testRenovateRegex() needs access to
      // .dagger/src/versions.ts and .dagger/test/test-renovate-regex.ts files.
      // This may have a slight performance/cache impact as .dagger directory changes
      // will invalidate the CI cache, but it's necessary for the Renovate regex test.
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
    @argument() env: Stage = Stage.Dev,
  ): Promise<string> {
    // Update HA version in versions.ts if prod
    let updatedSource = source;
    if (env === Stage.Prod) {
      updatedSource = await this.updateHaVersion(source, chartVersion);
    }

    // Renovate regex test (run async)
    const renovateTestPromise = this.testRenovateRegex(updatedSource)
      .then((msg) => ({
        status: "passed",
        message: `Renovate Test: PASSED\n${msg}`,
      }))
      .catch((e) => ({
        status: "failed",
        message: `Renovate Test: FAILED\n${e}`,
      }));

    // Helm test (run async)
    const helmTestPromise = this.testHelm(updatedSource)
      .then((msg) => ({
        status: "passed",
        message: `Helm Test: PASSED\n${msg}`,
      }))
      .catch((e) => ({ status: "failed", message: `Helm Test: FAILED\n${e}` }));

    // CDK8s test (run async)
    const cdk8sTestPromise = testCdk8s(updatedSource.directory("src/cdk8s"))
      .then((msg) => ({
        status: "passed",
        message: `CDK8s Test: PASSED\n${msg}`,
      }))
      .catch((e) => ({
        status: "failed",
        message: `CDK8s Test: FAILED\n${e}`,
      }));

    // Start builds in parallel
    const cdk8sBuildPromise = buildK8sManifests(
      updatedSource.directory("src/cdk8s"),
    )
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
      updatedSource.directory("src/cdk8s"),
      chartVersion || "dev-snapshot",
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

    // Await builds and tests
    const [
      cdk8sBuildResult,
      haBuildResult,
      helmBuildResult,
      renovateTestResult,
      helmTestResult,
      cdk8sTestResult,
    ] = await Promise.all([
      cdk8sBuildPromise,
      haBuildPromise,
      helmBuildPromise,
      renovateTestPromise,
      helmTestPromise,
      cdk8sTestPromise,
    ]);

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
        env,
      );
      // Push latest tag
      const haPublishLatestResult = await this.internalPublishHaImage(
        updatedSource,
        `ghcr.io/shepherdjerred/homelab:latest`,
        ghcrUsername,
        ghcrPassword,
        env,
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
      helmPublishResult = await this.helmPublishBuilt(
        helmBuildResult.dist,
        `1.0.0-${chartVersion}`,
        chartRepo,
        chartMuseumUsername,
        chartMuseumPassword,
        env,
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
    // Build summary
    const summary = [
      renovateTestResult.message,
      helmTestResult.message,
      cdk8sTestResult.message,
      `Sync result:\n${syncResult.message}`,
      cdk8sBuildResult.message,
      haBuildResult.message,
      helmBuildResult.message,
      `HA Image Publish result:\n${haPublishResult.message}`,
      `Helm Chart Publish result:\n${helmPublishResult.message}`,
    ].join("\n\n");
    // Fail if any critical step failed
    if (
      renovateTestResult.status === "failed" ||
      helmTestResult.status === "failed" ||
      cdk8sTestResult.status === "failed" ||
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
        ".dagger",
      ],
      defaultPath: ".",
    })
    source: Directory,
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
        ".dagger",
      ],
      defaultPath: ".",
    })
    source: Directory,
  ) {
    return testHa(source);
  }

  /**
   * Tests Renovate regex patterns in versions.ts files.
   * @param source The source directory containing versions.ts files and renovate.json.
   * @returns The test results output.
   */
  @func()
  async testRenovateRegex(
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
  ): Promise<string> {
    const container = withMiseTools(getSystemContainer())
      .withWorkdir("/workspace")
      // Only copy the files needed for the test
      .withFile("renovate.json", source.file("renovate.json"))
      .withFile(
        "src/cdk8s/src/versions.ts",
        source.file("src/cdk8s/src/versions.ts"),
      )
      .withFile(
        ".dagger/src/versions.ts",
        source.file(".dagger/src/versions.ts"),
      )
      .withFile(
        ".dagger/test/test-renovate-regex.ts",
        source.file(".dagger/test/test-renovate-regex.ts"),
      )
      .withExec(["bun", "run", ".dagger/test/test-renovate-regex.ts"]);

    return container.stdout();
  }

  /**
   * Tests Helm chart structure, linting, and template rendering.
   * @param source The source directory containing the Helm chart and CDK8s code.
   * @returns The test results output.
   */
  @func()
  async testHelm(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
        ".dagger",
      ],
      defaultPath: ".",
    })
    source: Directory,
  ): Promise<string> {
    const testVersion = "test-0.1.0";

    // Build the chart with test version
    const helmDist = await this.helmBuild(
      source.directory("src/cdk8s/helm"),
      source.directory("src/cdk8s"),
      testVersion,
    );

    // Test the built chart
    const container = dag
      .container()
      .from(`alpine/helm:${versions["alpine/helm"]}`)
      .withMountedDirectory("/workspace", helmDist)
      .withWorkdir("/workspace")
      .withExec([
        "sh",
        "-c",
        `
        echo "🔍 Testing Helm chart..."
        echo ""

        # Check if packaged chart exists
        echo "📦 Checking packaged chart..."
        if ls *.tgz >/dev/null 2>&1; then
          chart_file=$(ls *.tgz | head -1)
          echo "✅ Packaged chart found: $chart_file"
        else
          echo "❌ No packaged chart found"
          exit 1
        fi

        # Extract the chart for testing
        echo ""
        echo "📦 Extracting chart for testing..."
        tar -xzf $chart_file

        # Find the extracted directory (it should be the only directory)
        chart_dir=$(find . -maxdepth 1 -type d ! -name . | head -1)
        if [ -z "$chart_dir" ]; then
          echo "❌ No extracted directory found!"
          exit 1
        fi
        echo "Found extracted directory: $chart_dir"
        cd $chart_dir

        # Check if Chart.yaml exists and is valid
        echo "📋 Validating Chart.yaml..."
        if [ ! -f Chart.yaml ]; then
          echo "❌ Chart.yaml not found!"
          exit 1
        fi
        echo "✅ Chart.yaml found"

        # Check if chart has templates (CDK8s manifests)
        echo "📂 Checking templates directory..."
        if [ ! -d templates ]; then
          echo "❌ Templates directory not found!"
          exit 1
        fi

        template_count=$(find templates -name "*.yaml" -o -name "*.yml" | wc -l)
        echo "✅ Found $template_count template files"

        # Run helm lint
        echo ""
        echo "🔍 Running helm lint..."
        if helm lint .; then
          echo "✅ Helm lint passed"
        else
          echo "❌ Helm lint failed"
          exit 1
        fi

        # Run helm template to test rendering
        echo ""
        echo "🎨 Testing template rendering..."
        if helm template test-release . > /dev/null; then
          echo "✅ Template rendering successful"
        else
          echo "❌ Template rendering failed"
          exit 1
        fi

        echo ""
        echo "🎉 All Helm tests passed!"
      `,
      ]);

    return container.stdout();
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
        ".dagger",
      ],
      defaultPath: ".",
    })
    source: Directory,
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
        ".dagger",
      ],
      defaultPath: ".",
    })
    source: Directory,
  ) {
    return lintHa(source);
  }

  /**
   * Runs TypeScript type checking for the CDK8s project.
   * @param source The CDK8s source directory.
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
        ".dagger",
      ],
      defaultPath: "src/cdk8s",
    })
    source: Directory,
  ) {
    return typeCheckCdk8s(source);
  }

  /**
   * Builds Kubernetes manifests using CDK8s.
   * @param source The CDK8s source directory.
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
        ".dagger",
      ],
      defaultPath: "src/cdk8s",
    })
    source: Directory,
  ) {
    return buildK8sManifests(source);
  }

  /**
   * Tests the CDK8s source code (including GPU resource validation).
   * @param source The CDK8s source directory.
   * @returns The output of the test.
   */
  @func()
  async testCdk8s(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
        ".dagger",
      ],
      defaultPath: "src/cdk8s",
    })
    source: Directory,
  ) {
    return testCdk8s(source);
  }

  /**
   * Triggers a sync operation on the ArgoCD application using the provided token.
   * @param argocdToken The ArgoCD API token for authentication (as a Dagger Secret).
   * @returns A concise message about the sync result.
   */
  @func()
  async sync(argocdToken: Secret) {
    const result = await argocdSync(argocdToken);
    return `ArgoCD Sync: ${result.status.toUpperCase()}\n${result.message}`;
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
        ".dagger",
      ],
      defaultPath: "manifests",
    })
    source: Directory,
    manifestsPath: string = "manifests",
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
        ".dagger",
      ],
      defaultPath: ".",
    })
    source: Directory,
  ) {
    return buildAndApplyCdk8s(source);
  }

  /**
   * Builds the HA image and exports it to a tar file for testing.
   * @param source The source directory for the HA app.
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
        ".dagger",
      ],
      defaultPath: ".",
    })
    source: Directory,
  ): Promise<File> {
    return buildAndExportHaImage(source);
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
        ".dagger",
      ],
      defaultPath: ".",
    })
    source: Directory,
    imageName: string,
    ghcrUsername: string,
    ghcrPassword: Secret,
    @argument() env: Stage = Stage.Dev,
  ): Promise<string> {
    return JSON.stringify(
      await this.internalPublishHaImage(
        source,
        imageName,
        ghcrUsername,
        ghcrPassword,
        env,
      ),
      null,
      2,
    );
  }

  async internalPublishHaImage(
    source: Directory,
    imageName: string,
    ghcrUsername: string,
    ghcrPassword: Secret,
    @argument() env: Stage = Stage.Dev,
  ): Promise<StepResult> {
    const isDryRun = env !== Stage.Prod;

    return buildAndPushHaImage(
      source,
      imageName,
      ghcrUsername,
      ghcrPassword,
      isDryRun,
    );
  }

  /**
   * Builds the Helm chart, updates version/appVersion, and exports artifacts.
   * @param source The Helm chart source directory (should be src/cdk8s/helm).
   * @param cdkSource The CDK8s source directory (should be src/cdk8s).
   * @param version The raw build number (e.g. "123") - will be formatted as "1.0.0-123".
   * @returns The dist directory with packaged chart and YAMLs.
   */
  @func()
  async helmBuild(
    @argument({ defaultPath: "src/cdk8s/helm" }) source: Directory,
    @argument({ defaultPath: "src/cdk8s" }) cdkSource: Directory,
    @argument() version: string,
  ) {
    return helmBuildFn(source, cdkSource, `1.0.0-${version}`);
  }

  /**
   * Publishes the packaged Helm chart to a ChartMuseum repo and returns a StepResult.
   * @param source The Helm chart source directory (should be src/cdk8s/helm).
   * @param cdkSource The CDK8s source directory (should be src/cdk8s).
   * @param version The raw build number (e.g. "123") - will be formatted as "1.0.0-123".
   * @param repo The ChartMuseum repo URL.
   * @param chartMuseumUsername The ChartMuseum username.
   * @param chartMuseumPassword The ChartMuseum password (secret).
   * @param env The environment to run in: 'prod' to publish, 'dev' to skip (default: 'dev').
   * @returns A StepResult object with status and message.
   */
  @func()
  async helmPublish(
    @argument({ defaultPath: "src/cdk8s/helm" }) source: Directory,
    @argument({ defaultPath: "src/cdk8s" }) cdkSource: Directory,
    @argument() version: string,
    @argument() repo: string = "https://chartmuseum.tailnet-1a49.ts.net",
    chartMuseumUsername: string,
    chartMuseumPassword: Secret,
    @argument() env: Stage = Stage.Dev,
  ): Promise<StepResult> {
    if (env !== Stage.Prod) {
      return { status: "skipped", message: "[SKIPPED] Not prod" };
    }
    try {
      const result = await helmPublishFn(
        source,
        cdkSource,
        `1.0.0-${version}`,
        repo,
        chartMuseumUsername,
        chartMuseumPassword,
      );
      return { status: "passed", message: result };
    } catch (e) {
      return { status: "failed", message: `Helm Chart Publish: FAILED\n${e}` };
    }
  }

  /**
   * Publishes a pre-built Helm chart to a ChartMuseum repo and returns a StepResult.
   * This function works with the output of helmBuild (a dist directory).
   * @param builtDist The built Helm chart dist directory (from helmBuild).
   * @param version The full semver version (e.g. "1.0.0-123") - used as-is, no formatting applied.
   * @param repo The ChartMuseum repo URL.
   * @param chartMuseumUsername The ChartMuseum username.
   * @param chartMuseumPassword The ChartMuseum password (secret).
   * @param env The environment to run in: 'prod' to publish, 'dev' to skip (default: 'dev').
   * @returns A StepResult object with status and message.
   */
  @func()
  async helmPublishBuilt(
    builtDist: Directory,
    @argument() version: string,
    @argument() repo: string = "https://chartmuseum.tailnet-1a49.ts.net",
    chartMuseumUsername: string,
    chartMuseumPassword: Secret,
    @argument() env: Stage = Stage.Dev,
  ): Promise<StepResult> {
    if (env !== Stage.Prod) {
      return { status: "skipped", message: "[SKIPPED] Not prod" };
    }
    try {
      const chartFile = `torvalds-${version}.tgz`;
      const result = await dag
        .container()
        .from(`alpine/helm:${versions["alpine/helm"]}`)
        .withMountedDirectory("/workspace", builtDist)
        .withWorkdir("/workspace")
        .withEnvVariable("CHARTMUSEUM_USERNAME", chartMuseumUsername)
        .withSecretVariable("CHARTMUSEUM_PASSWORD", chartMuseumPassword)
        .withExec([
          "sh",
          "-c",
          `curl -f -u $CHARTMUSEUM_USERNAME:$CHARTMUSEUM_PASSWORD --data-binary @${chartFile} ${repo}/api/charts`,
        ])
        .stdout();

      return { status: "passed", message: result };
    } catch (err: any) {
      if (err?.stderr?.includes("409") || err?.message?.includes("409")) {
        return {
          status: "passed",
          message: "409 Conflict: Chart already exists, treating as success.",
        };
      }
      return {
        status: "failed",
        message: `Helm Chart Publish: FAILED\n${err}`,
      };
    }
  }
}
