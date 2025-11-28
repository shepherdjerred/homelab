#!/usr/bin/env -S bun
import { Container, Directory, dag } from "@dagger.io/dagger";
import { getWorkspaceContainer } from "./base";

/**
 * Creates a prepared CDK8s container with workspace dependencies installed.
 * This is the shared container setup for all CDK8s operations.
 */
export function prepareCdk8sContainer(source: Directory): Container {
  return (
    getWorkspaceContainer(source, "src/cdk8s")
      // Cache TypeScript compilation artifacts
      .withMountedCache("/workspace/node_modules/.cache", dag.cacheVolume("typescript-cache"))
  );
}

export async function typeCheckCdk8s(source: Directory): Promise<string> {
  const container = prepareCdk8sContainer(source);
  return container.withExec(["bun", "run", "typecheck"]).stdout();
}

/**
 * Runs type check using a pre-prepared container.
 */
export function typeCheckCdk8sWithContainer(container: Container): Promise<string> {
  return container.withExec(["bun", "run", "typecheck"]).stdout();
}

export function buildK8sManifests(source: Directory): Directory {
  const builtContainer = prepareCdk8sContainer(source).withExec(["bun", "run", "build"]);
  const manifestsDir = builtContainer.directory("/workspace/src/cdk8s/dist");
  return manifestsDir;
}

/**
 * Builds K8s manifests using a pre-prepared container.
 */
export function buildK8sManifestsWithContainer(container: Container): Directory {
  const builtContainer = container.withExec(["bun", "run", "build"]);
  return builtContainer.directory("/workspace/src/cdk8s/dist");
}

export async function lintCdk8s(source: Directory): Promise<string> {
  const container = prepareCdk8sContainer(source);
  return container.withExec(["bun", "run", "lint"]).stdout();
}

/**
 * Runs lint using a pre-prepared container.
 */
export function lintCdk8sWithContainer(container: Container): Promise<string> {
  return container.withExec(["bun", "run", "lint"]).stdout();
}

export async function testCdk8s(source: Directory): Promise<string> {
  const container = prepareCdk8sContainer(source);
  // Run just the test - the caller should ensure build has happened if needed
  return container.withExec(["bun", "run", "test:gpu-resources"]).stdout();
}

/**
 * Runs tests using a pre-prepared container.
 * Expects the container to already have the build artifacts.
 */
export function testCdk8sWithContainer(container: Container): Promise<string> {
  return container.withExec(["bun", "run", "test:gpu-resources"]).stdout();
}
