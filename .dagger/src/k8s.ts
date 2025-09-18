import { Directory, dag } from "@dagger.io/dagger";
import { buildK8sManifests } from "./cdk8s";
import { getKubectlContainer } from "./base";

/**
 * Applies Kubernetes manifests from the specified directory using kubectl.
 * Uses caching for improved performance.
 * @param source The source directory containing Kubernetes manifests.
 * @param manifestsPath The path within the source directory to the manifests (default: "manifests").
 * @returns The stdout from the kubectl apply command.
 */
export async function applyK8sConfig(
  source: Directory,
  manifestsPath: string = "manifests",
): Promise<string> {
  const container = getKubectlContainer()
    .withMountedDirectory("/workspace", source)
    .withWorkdir(`/workspace/${manifestsPath}`)
    .withExec(["kubectl", "apply", "-f", ".", "--dry-run=client"]); // Remove --dry-run=client for real apply
  return container.stdout();
}

/**
 * Builds manifests with CDK8s and applies them to the cluster using kubectl.
 * @param source The source directory for the CDK8s project.
 * @returns The stdout from the kubectl apply command.
 */
export async function buildAndApplyCdk8s(source: Directory): Promise<string> {
  const manifestsDir = await buildK8sManifests(source.directory("src/cdk8s"));
  return applyK8sConfig(manifestsDir, ".");
}
