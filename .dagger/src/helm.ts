import { dag, Directory, Secret, argument } from "@dagger.io/dagger";

/**
 * Build the Helm chart, update version/appVersion, and export artifacts.
 * @param source The Helm chart source directory (should be src/cdk8s/helm).
 * @param version The version to set in Chart.yaml and appVersion.
 * @returns The dist directory with packaged chart and YAMLs.
 */
export async function build(
  source: Directory,
  version: string
): Promise<Directory> {
  const container = dag
    .container()
    .from("alpine/helm:3")
    .withMountedDirectory("/workspace", source)
    .withWorkdir("/workspace")
    // Update Chart.yaml version and appVersion
    .withExec([
      "sh",
      "-c",
      `sed -i 's/^version:.*$/version: ${version}/' Chart.yaml && sed -i 's/^appVersion:.*$/appVersion: ${version}/' Chart.yaml`,
    ])
    // Package the chart
    .withExec(["helm", "package", "."]);

  // Export all YAMLs and the packaged chart to dist/
  return container
    .withExec(["mkdir", "-p", "dist"])
    .withExec(["sh", "-c", "cp *.yaml dist/ || true"])
    .withExec(["sh", "-c", "cp torvalds-*.tgz dist/ || true"])
    .directory("/workspace/dist");
}

/**
 * Publish the packaged Helm chart to a ChartMuseum repo.
 * @param source The Helm chart source directory (should be src/cdk8s/helm).
 * @param version The version to publish.
 * @param repo The ChartMuseum repo URL.
 * @param username The ChartMuseum username (secret).
 * @param password The ChartMuseum password (secret).
 * @returns The curl output from the publish step.
 */
export async function publish(
  source: Directory,
  version: string,
  repo: string = "https://chartmuseum.tailnet-1a49.ts.net",
  username: Secret,
  password: Secret
): Promise<string> {
  const chartFile = `torvalds-${version}.tgz`;
  const container = dag
    .container()
    .from("alpine/helm:3")
    .withMountedDirectory("/workspace", source)
    .withWorkdir("/workspace")
    .withSecretVariable("CHARTMUSEUM_USERNAME", username)
    .withSecretVariable("CHARTMUSEUM_PASSWORD", password)
    .withExec([
      "sh",
      "-c",
      `curl -f -u $CHARTMUSEUM_USERNAME:$CHARTMUSEUM_PASSWORD --data-binary @${chartFile} ${repo}/api/charts`,
    ]);
  return container.stdout();
}
