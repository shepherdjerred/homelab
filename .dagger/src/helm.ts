import { dag, Directory, Secret, Container } from "@dagger.io/dagger";
import { buildK8sManifests } from "./cdk8s";
import versions from "./versions";

/**
 * Creates a container with Helm chart built and packaged.
 * Common setup used by all helm functions.
 * @param source The Helm chart source directory.
 * @param cdkSource The CDK8s source directory.
 * @param version The version to set in Chart.yaml and appVersion.
 * @returns Container with the chart built and packaged.
 */
async function getHelmContainer(
  source: Directory,
  cdkSource: Directory,
  version: string,
): Promise<Container> {
  const cdk8sManifests = await buildK8sManifests(cdkSource);

  return (
    dag
      .container()
      .from(`alpine/helm:${versions["alpine/helm"]}`)
      // Cache Helm registry data and repositories
      .withMountedCache("/root/.cache/helm", dag.cacheVolume("helm-cache"))
      .withMountedDirectory("/workspace", source)
      .withWorkdir("/workspace")
      // Update Chart.yaml version and appVersion
      .withExec([
        "sh",
        "-c",
        `sed -i 's/^version:.*$/version: ${version}/' Chart.yaml && sed -i 's/^appVersion:.*$/appVersion: ${version}/' Chart.yaml`,
      ])
      // Create templates directory and copy CDK8s manifests
      .withExec(["mkdir", "-p", "templates"])
      .withDirectory("templates", cdk8sManifests)
      // Package the chart
      .withExec(["helm", "package", "."])
  );
}

/**
 * Build the Helm chart, update version/appVersion, and export artifacts.
 * Uses caching for improved build performance.
 * @param source The Helm chart source directory (should be src/cdk8s/helm).
 * @param cdkSource The CDK8s source directory (should be src/cdk8s).
 * @param version The full semver version (e.g. "1.0.0-123") - used as-is in Chart.yaml.
 * @returns The dist directory with packaged chart and YAMLs.
 */
export async function build(
  source: Directory,
  cdkSource: Directory,
  version: string,
): Promise<Directory> {
  const container = await getHelmContainer(source, cdkSource, version);

  // Export all YAMLs and the packaged chart to dist/
  return container
    .withExec(["mkdir", "-p", "dist"])
    .withExec(["sh", "-c", "cp *.yaml dist/ || true"])
    .withExec(["sh", "-c", "cp torvalds-*.tgz dist/ || true"])
    .directory("/workspace/dist");
}

/**
 * Publish the packaged Helm chart to a ChartMuseum repo.
 * Uses caching for improved performance.
 * @param source The Helm chart source directory (should be src/cdk8s/helm).
 * @param cdkSource The CDK8s source directory (should be src/cdk8s).
 * @param version The full semver version (e.g. "1.0.0-123") - used as-is in Chart.yaml.
 * @param repo The ChartMuseum repo URL.
 * @param chartMuseumUsername The ChartMuseum username.
 * @param chartMuseumPassword The ChartMuseum password (secret).
 * @returns The curl output from the publish step.
 */
export async function publish(
  source: Directory,
  cdkSource: Directory,
  version: string,
  repo: string = "https://chartmuseum.tailnet-1a49.ts.net",
  chartMuseumUsername: string,
  chartMuseumPassword: Secret,
): Promise<string> {
  const chartFile = `torvalds-${version}.tgz`;
  const container = await getHelmContainer(source, cdkSource, version).then(
    (c) =>
      c
        .withEnvVariable("CHARTMUSEUM_USERNAME", chartMuseumUsername)
        .withSecretVariable("CHARTMUSEUM_PASSWORD", chartMuseumPassword)
        .withExec([
          "sh",
          "-c",
          `curl -f -u $CHARTMUSEUM_USERNAME:$CHARTMUSEUM_PASSWORD --data-binary @${chartFile} ${repo}/api/charts`,
        ]),
  );

  try {
    return await container.stdout();
  } catch (err: any) {
    if (err?.stderr?.includes("409") || err?.message?.includes("409")) {
      return "409 Conflict: Chart already exists, treating as success.";
    }
    throw err;
  }
}
