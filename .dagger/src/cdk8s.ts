import { Directory, dag } from "@dagger.io/dagger";
import { getWorkspaceContainer } from "./base";
import versions from "./versions";

export async function typeCheckCdk8s(source: Directory): Promise<string> {
  return getWorkspaceContainer(source, "src/cdk8s")
    // Cache TypeScript compilation artifacts
    .withMountedCache(
      "/workspace/src/cdk8s/node_modules/.cache",
      dag.cacheVolume("typescript-cache")
    )
    .withExec(["bunx", "tsc", "--noEmit"])
    .stdout();
}

export async function buildK8sManifests(
  source: Directory,
  outputDir: Directory
): Promise<Directory> {
  const builtContainer = getWorkspaceContainer(source, "src/cdk8s")
    .withWorkdir("/workspace/src/cdk8s")
    .withExec(["bun", "run", "src/app.ts"]);
  const manifestsDir = builtContainer.directory("/workspace/src/cdk8s/dist");
  await outputDir.withDirectory(".", manifestsDir);
  return outputDir;
}
