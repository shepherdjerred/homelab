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
    )
    .withExec(["sh", "-c", "bunx tsc --noEmit 2>&1 || true"]);

  const output = await container.stdout();

  // Check if type checking actually failed by looking for error indicators
  if (
    output.includes("error TS") ||
    (output.includes("Found ") && output.includes(" error"))
  ) {
    throw new Error(`CDK8s Type Checking Failed:\n${output}`);
  }

  return output;
}

export async function buildK8sManifests(source: Directory): Promise<Directory> {
  const builtContainer = getWorkspaceContainer(source, ".")
    .withWorkdir("/workspace")
    .withExec(["bun", "run", "build"]);
  const manifestsDir = builtContainer.directory("/workspace/dist");
  return manifestsDir;
}

export async function lintCdk8s(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, ".")
    .withWorkdir("/workspace")
    .withExec(["sh", "-c", "bun run lint 2>&1 || true"]);

  const output = await container.stdout();

  // Check if linting actually failed by looking for error indicators
  if (
    output.includes("Error [ERR_") ||
    output.includes("✖") ||
    output.includes("Something went wrong") ||
    output.includes("error TS") ||
    output.includes("Exited with code 1")
  ) {
    throw new Error(`CDK8s Linting Failed:\n${output}`);
  }

  return output;
}

export async function testCdk8s(source: Directory): Promise<string> {
  const container = getWorkspaceContainer(source, ".")
    .withWorkdir("/workspace")
    .withExec([
      "sh",
      "-c",
      "bun run build && bun run test:gpu-resources 2>&1 || true",
    ]);

  const output = await container.stdout();

  // Check if testing actually failed by looking for error indicators
  if (
    output.includes("error:") ||
    output.includes("✖") ||
    output.includes("failed") ||
    output.includes("FAIL") ||
    output.includes("exited with code")
  ) {
    throw new Error(`CDK8s Testing Failed:\n${output}`);
  }

  return output;
}
