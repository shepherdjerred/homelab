import { Directory, dag } from "@dagger.io/dagger";
import { getBaseContainer } from "./base";

export async function typeCheckCdk8s(source: Directory): Promise<string> {
  return (
    getBaseContainer(source, "/workspace/src/cdk8s")
      // Cache TypeScript compilation artifacts
      .withMountedCache(
        "/workspace/src/cdk8s/node_modules/.cache",
        dag.cacheVolume("typescript-cache")
      )
      .withExec(["bunx", "tsc", "--noEmit"])
      .stdout()
  );
}

export async function buildK8sManifests(
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
