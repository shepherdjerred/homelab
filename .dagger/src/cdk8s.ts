import { object, func, argument, Directory } from "@dagger.io/dagger";
import { getBaseContainer } from "./base";

@object()
export class CDK8s {
  /**
   * Performs a TypeScript type check on the CDK8s project.
   * @param source The source directory to use for the type check context.
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
  ): Promise<string> {
    return getBaseContainer(source, "/workspace/src/cdk8s")
      .withExec(["bunx", "tsc", "--noEmit"])
      .stdout();
  }

  /**
   * Builds Kubernetes manifests from the CDK8s project using Bun.
   * @param source The source directory to use for the build context.
   * @param outputDir The output directory for the generated manifests.
   * @returns The output directory containing the built manifests.
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
  ): Promise<Directory> {
    const builtContainer = getBaseContainer(source, "/workspace")
      .withWorkdir("/workspace/src/cdk8s")
      .withExec(["bun", "run", "src/app.ts"]);
    const manifestsDir = builtContainer.directory("/workspace/src/cdk8s/dist");
    await outputDir.withDirectory(".", manifestsDir);
    return outputDir;
  }
}
