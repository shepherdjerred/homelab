#!/usr/bin/env -S bun
import { Directory, dag } from "@dagger.io/dagger";
import { getWorkspaceContainer } from "./base";
import versions from "./versions";

export async function typeCheckCdk8s(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, ".")
    // Cache TypeScript compilation artifacts
    .withMountedCache(
      "/workspace/node_modules/.cache",
      dag.cacheVolume("typescript-cache"),
    );

  return container.withExec(["bunx", "tsc", "--noEmit"]).stdout();
}

export async function buildK8sManifests(source: Directory): Promise<Directory> {
  const builtContainer = getWorkspaceContainer(source, ".")
    .withWorkdir("/workspace")
    .withExec(["bun", "run", "build"]);
  const manifestsDir = builtContainer.directory("/workspace/dist");
  return manifestsDir;
}

export async function lintCdk8s(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, ".").withWorkdir(
    "/workspace",
  );

  return container.withExec(["bun", "run", "lint"]).stdout();
}

export async function testCdk8s(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, ".").withWorkdir(
    "/workspace",
  );

  return container
    .withExec(["bun", "run", "build", "&&", "bun", "run", "test:gpu-resources"])
    .stdout();
}
