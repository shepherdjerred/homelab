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
    "CDK8s Type Checking Failed"
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
  const container = getWorkspaceContainer(source, ".")
    .withWorkdir("/workspace")
    .withExec([
      "sh",
      "-c",
      `
      set +e
      bun run lint 2>&1
      exit_code=$?
      if [ $exit_code -ne 0 ]; then
        echo "LINT_FAILED_WITH_CODE_$exit_code"
      fi
      exit 0
      `,
    ]);

  const output = await container.stdout();

  // Check if linting actually failed by looking for our exit code marker
  if (output.includes("LINT_FAILED_WITH_CODE_")) {
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
      `
      set +e
      bun run build && bun run test:gpu-resources 2>&1
      exit_code=$?
      if [ $exit_code -ne 0 ]; then
        echo "TEST_FAILED_WITH_CODE_$exit_code"
      fi
      exit 0
      `,
    ]);

  const output = await container.stdout();

  // Check if testing actually failed by looking for our exit code marker
  if (output.includes("TEST_FAILED_WITH_CODE_")) {
    throw new Error(`CDK8s Testing Failed:\n${output}`);
  }

  return output;
}
