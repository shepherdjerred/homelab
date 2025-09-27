#!/usr/bin/env -S bun
import { Directory, dag } from "@dagger.io/dagger";
import { getWorkspaceContainer, execWithErrorCapture } from "./base";
import versions from "./versions";

export async function typeCheckCdk8s(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, ".")
    // Cache TypeScript compilation artifacts
    .withMountedCache(
      "/workspace/node_modules/.cache",
      dag.cacheVolume("typescript-cache"),
    );

  return execWithErrorCapture(
    container,
    "bunx tsc --noEmit",
    "CDK8s Type Checking Failed",
  );
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

  return execWithErrorCapture(
    container,
    "bun run lint",
    "CDK8s Linting Failed",
  );
}

export async function testCdk8s(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, ".").withWorkdir(
    "/workspace",
  );

  return execWithErrorCapture(
    container,
    "bun run build && bun run test:gpu-resources",
    "CDK8s Testing Failed",
  );
}
