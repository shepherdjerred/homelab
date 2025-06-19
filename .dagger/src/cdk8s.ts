#!/usr/bin/env -S bun
import { Directory, dag } from "@dagger.io/dagger";
import { getWorkspaceContainer } from "./base";
import versions from "./versions";

export async function typeCheckCdk8s(source: Directory): Promise<string> {
  return (
    getWorkspaceContainer(source, ".")
      // Cache TypeScript compilation artifacts
      .withMountedCache(
        "/workspace/node_modules/.cache",
        dag.cacheVolume("typescript-cache")
      )
      .withExec(["bunx", "tsc", "--noEmit"])
      .stdout()
  );
}

export async function buildK8sManifests(source: Directory): Promise<Directory> {
  const builtContainer = getWorkspaceContainer(source, ".")
    .withWorkdir("/workspace")
    .withExec(["bun", "run", "src/app.ts"]);
  const manifestsDir = builtContainer.directory("/workspace/dist");
  return manifestsDir;
}
