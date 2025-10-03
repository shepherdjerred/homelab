#!/usr/bin/env -S bun
import { Directory, dag } from "@dagger.io/dagger";
import { getWorkspaceContainer } from "./base";

export async function typeCheckCdk8s(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, "src/cdk8s")
    // Cache TypeScript compilation artifacts
    .withMountedCache("/workspace/node_modules/.cache", dag.cacheVolume("typescript-cache"));

  return container.withExec(["bun", "run", "typecheck"]).stdout();
}

export function buildK8sManifests(source: Directory): Directory {
  const builtContainer = getWorkspaceContainer(source, "src/cdk8s").withExec(["bun", "run", "build"]);
  const manifestsDir = builtContainer.directory("/workspace/src/cdk8s/dist");
  return manifestsDir;
}

export async function lintCdk8s(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, "src/cdk8s");

  return container.withExec(["bun", "run", "lint"]).stdout();
}

export async function testCdk8s(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, "src/cdk8s");

  return container.withExec(["bun", "run", "build", "&&", "bun", "run", "test:gpu-resources"]).stdout();
}
