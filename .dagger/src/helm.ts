import { dag, Directory, Secret, Container } from "@dagger.io/dagger";
import { z } from "zod";
import { buildK8sManifests } from "./cdk8s";
import versions from "./versions";

/**
 * List of all Helm charts to build and publish.
 * Each chart name corresponds to a CDK8s chart that outputs {name}.k8s.yaml
 */
export const HELM_CHARTS = ["torvalds", "ddns", "apps", "scout-beta", "scout-prod", "starlight-karma-bot-beta", "starlight-karma-bot-prod"] as const;
export type HelmChartName = (typeof HELM_CHARTS)[number];

/**
 * Creates a container with a single Helm chart built and packaged.
 * @param chartDir The Helm chart source directory (containing Chart.yaml).
 * @param chartName The name of the chart (must match CDK8s output file name).
 * @param cdk8sManifests The directory containing all CDK8s manifest files.
 * @param repoRoot The repository root directory.
 * @param version The version to set in Chart.yaml and appVersion.
 * @returns Container with the chart built and packaged.
 */
function getHelmContainerForChart(
  chartDir: Directory,
  chartName: string,
  cdk8sManifests: Directory,
  repoRoot: Directory,
  version: string,
): Container {
  return (
    dag
      .container()
      .from(`alpine/helm:${versions["alpine/helm"]}`)
      // Cache Helm registry data and repositories
      .withMountedCache("/root/.cache/helm", dag.cacheVolume("helm-cache"))
      // Use withDirectory instead of withMountedDirectory to avoid path resolution
      // issues when composing directories with withFile later
      .withDirectory("/workspace", chartDir)
      .withWorkdir("/workspace")
      // Update Chart.yaml version and appVersion using shared script
      .withFile("/usr/local/bin/helm-set-version.sh", repoRoot.file("scripts/helm-set-version.sh"))
      .withExec(["chmod", "+x", "/usr/local/bin/helm-set-version.sh"])
      .withExec(["helm-set-version.sh", "Chart.yaml", version])
      // Create templates directory and copy only this chart's manifest
      .withExec(["mkdir", "-p", "templates"])
      .withFile(`templates/${chartName}.k8s.yaml`, cdk8sManifests.file(`${chartName}.k8s.yaml`))
      // Package the chart
      .withExec(["helm", "package", "."])
  );
}

/**
 * Build a single Helm chart from a chart directory.
 * @param chartDir The Helm chart source directory (containing Chart.yaml).
 * @param chartName The name of the chart (must match CDK8s output file name).
 * @param cdk8sManifests The directory containing all CDK8s manifest files.
 * @param repoRoot The repository root directory.
 * @param version The full semver version (e.g. "1.0.0-123").
 * @returns The packaged chart file (.tgz).
 */
export function buildChart(
  chartDir: Directory,
  chartName: string,
  cdk8sManifests: Directory,
  repoRoot: Directory,
  version: string,
): Directory {
  const container = getHelmContainerForChart(chartDir, chartName, cdk8sManifests, repoRoot, version);

  return container
    .withExec(["mkdir", "-p", "dist"])
    .withExec(["sh", "-c", `cp ${chartName}-*.tgz dist/`])
    .directory("/workspace/dist");
}

/**
 * Build all Helm charts defined in HELM_CHARTS.
 * @param repoRoot The repository root directory.
 * @param version The full semver version (e.g. "1.0.0-123").
 * @returns A directory containing all packaged charts.
 */
export function buildAllCharts(repoRoot: Directory, version: string): Directory {
  const cdk8sManifests = buildK8sManifests(repoRoot);
  let outputDir = dag.directory();

  for (const chartName of HELM_CHARTS) {
    // Use full path from repo root to avoid nested .directory() issues
    const chartDir = repoRoot.directory(`src/cdk8s/helm/${chartName}`);
    const chartDist = buildChart(chartDir, chartName, cdk8sManifests, repoRoot, version);
    outputDir = outputDir.withDirectory(chartName, chartDist);
  }

  return outputDir;
}

/**
 * Build the torvalds Helm chart, update version/appVersion, and export artifacts.
 * Uses the new per-chart directory structure (src/cdk8s/helm/{chartName}/).
 * @param repoRoot The repository root directory.
 * @param version The full semver version (e.g. "1.0.0-123") - used as-is in Chart.yaml.
 * @returns The dist directory with packaged chart and YAMLs.
 */
export function build(repoRoot: Directory, version: string): Directory {
  const cdk8sManifests = buildK8sManifests(repoRoot);

  // Build only the torvalds chart (primary chart, for backwards compatibility)
  // Use full path from repo root to avoid nested .directory() issues
  const torvaldsChartDir = repoRoot.directory("src/cdk8s/helm/torvalds");
  const container = getHelmContainerForChart(torvaldsChartDir, "torvalds", cdk8sManifests, repoRoot, version);

  // Export all YAMLs and the packaged chart to dist/
  return container
    .withExec(["mkdir", "-p", "dist"])
    .withExec(["sh", "-c", "cp *.yaml dist/ || true"])
    .withExec(["sh", "-c", "cp torvalds-*.tgz dist/ || true"])
    .directory("/workspace/dist");
}

/**
 * Publish a single pre-built Helm chart to a ChartMuseum repo.
 * @param chartName The name of the chart.
 * @param chartDist The directory containing the packaged chart (.tgz file).
 * @param version The full semver version (e.g. "1.0.0-123").
 * @param repo The ChartMuseum repo URL.
 * @param chartMuseumUsername The ChartMuseum username.
 * @param chartMuseumPassword The ChartMuseum password (secret).
 * @returns The curl output from the publish step.
 */
export async function publishChart(
  chartName: string,
  chartDist: Directory,
  version: string,
  repo = "https://chartmuseum.tailnet-1a49.ts.net",
  chartMuseumUsername: string,
  chartMuseumPassword: Secret,
): Promise<string> {
  const chartFile = `${chartName}-${version}.tgz`;
  // Use file-based output capture to avoid Dagger SDK URLSearchParams.toJSON bug with Bun
  const container = await dag
    .container()
    .from(`alpine/helm:${versions["alpine/helm"]}`)
    .withMountedDirectory("/workspace", chartDist)
    .withWorkdir("/workspace")
    .withEnvVariable("CHARTMUSEUM_USERNAME", chartMuseumUsername)
    .withSecretVariable("CHARTMUSEUM_PASSWORD", chartMuseumPassword)
    .withExec([
      "sh",
      "-c",
      `curl -u $CHARTMUSEUM_USERNAME:$CHARTMUSEUM_PASSWORD --data-binary @${chartFile} ${repo}/api/charts > /tmp/result.txt 2>&1; echo $? > /tmp/exitcode.txt`,
    ])
    .sync();

  const [result, exitCodeStr] = await Promise.all([
    container.file("/tmp/result.txt").contents(),
    container.file("/tmp/exitcode.txt").contents(),
  ]);
  const exitCode = parseInt(exitCodeStr.trim(), 10);

  if (exitCode === 0) {
    return result.trim() || "Chart published successfully";
  }

  // Check for 409 Conflict (chart already exists)
  if (result.includes("409")) {
    return "409 Conflict: Chart already exists, treating as success.";
  }

  throw new Error(`Chart publish failed (exit code ${String(exitCode)}): ${result.trim()}`);
}

/**
 * Publish all Helm charts to ChartMuseum.
 * @param allChartsDist The directory containing all chart subdirectories (from buildAllCharts).
 * @param version The full semver version (e.g. "1.0.0-123").
 * @param repo The ChartMuseum repo URL.
 * @param chartMuseumUsername The ChartMuseum username.
 * @param chartMuseumPassword The ChartMuseum password (secret).
 * @returns Object mapping chart names to their publish results.
 */
export async function publishAllCharts(
  allChartsDist: Directory,
  version: string,
  repo = "https://chartmuseum.tailnet-1a49.ts.net",
  chartMuseumUsername: string,
  chartMuseumPassword: Secret,
): Promise<Record<string, string>> {
  const results: Record<string, string> = {};

  for (const chartName of HELM_CHARTS) {
    const chartDist = allChartsDist.directory(chartName);
    results[chartName] = await publishChart(
      chartName,
      chartDist,
      version,
      repo,
      chartMuseumUsername,
      chartMuseumPassword,
    );
  }

  return results;
}

/**
 * Publish the packaged torvalds Helm chart to a ChartMuseum repo.
 * Uses the new per-chart directory structure (src/cdk8s/helm/{chartName}/).
 * @param repoRoot The repository root directory.
 * @param version The full semver version (e.g. "1.0.0-123") - used as-is in Chart.yaml.
 * @param repo The ChartMuseum repo URL.
 * @param chartMuseumUsername The ChartMuseum username.
 * @param chartMuseumPassword The ChartMuseum password (secret).
 * @returns The curl output from the publish step.
 */
export async function publish(
  repoRoot: Directory,
  version: string,
  repo = "https://chartmuseum.tailnet-1a49.ts.net",
  chartMuseumUsername: string,
  chartMuseumPassword: Secret,
): Promise<string> {
  const cdk8sManifests = buildK8sManifests(repoRoot);

  // Build and publish only the torvalds chart (for backwards compatibility)
  // Use full path from repo root to avoid nested .directory() issues
  const torvaldsChartDir = repoRoot.directory("src/cdk8s/helm/torvalds");
  const chartFile = `torvalds-${version}.tgz`;
  const container = getHelmContainerForChart(torvaldsChartDir, "torvalds", cdk8sManifests, repoRoot, version)
    .withEnvVariable("CHARTMUSEUM_USERNAME", chartMuseumUsername)
    .withSecretVariable("CHARTMUSEUM_PASSWORD", chartMuseumPassword)
    .withExec([
      "sh",
      "-c",
      `curl -s -w '\\n%{http_code}' -u $CHARTMUSEUM_USERNAME:$CHARTMUSEUM_PASSWORD --data-binary @${chartFile} ${repo}/api/charts > /tmp/result.txt 2>&1`,
    ]);

  const result = await container.file("/tmp/result.txt").contents();
  const lines = result.trim().split("\n");
  const httpCode = lines.pop() ?? "";
  const body = lines.join("\n");

  if (httpCode === "201" || httpCode === "200") {
    return body || "Chart published successfully";
  } else if (httpCode === "409") {
    return "409 Conflict: Chart already exists, treating as success.";
  } else {
    throw new Error(`Helm Chart Publish failed with HTTP ${httpCode}: ${body}`);
  }
}
