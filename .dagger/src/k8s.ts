import { object, func, argument, Directory, dag } from "@dagger.io/dagger";
import { CDK8s } from "./cdk8s";

@object()
export class K8s {
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
      defaultPath: ".",
    })
    source: Directory,
    @argument({}) manifestsPath: string = "manifests"
  ): Promise<string> {
    const container = dag
      .container()
      .from("bitnami/kubectl:latest")
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
  ): Promise<string> {
    const cdk8s = new CDK8s();
    const manifestsDir = await cdk8s.buildK8sManifests(source, dag.directory());
    return this.applyK8sConfig(manifestsDir, ".");
  }
}
