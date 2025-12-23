import { dag, type Secret, Container, type Directory } from "@dagger.io/dagger";
import type { StepResult } from ".";
import versions from "./versions";

/**
 * Builds a container with ClaudeCodeUI installed and ready to run.
 * ClaudeCodeUI is an npm package that provides a web UI for managing Claude Code sessions.
 *
 * @param _source The source directory (unused, but required for API consistency)
 * @returns A configured Container ready to run ClaudeCodeUI.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Parameter required for API consistency with other image build functions, prevents Dagger GraphQL errors
function buildClaudeCodeUIContainer(_source: Directory): Container {
  return (
    dag
      .container()
      .from(`node:${versions["node/claudecodeui"]}`)
      // Install build dependencies required for node-pty (needed by claude-code-ui)
      // py3-setuptools provides distutils which node-gyp requires (removed in Python 3.12+)
      .withExec(["apk", "add", "--no-cache", "python3", "py3-setuptools", "make", "g++"])
      // Install ClaudeCodeUI globally
      .withExec(["npm", "install", "-g", `@siteboon/claude-code-ui@${versions["@siteboon/claude-code-ui"]}`])
      // Remove build dependencies to keep image size smaller
      .withExec(["apk", "del", "python3", "py3-setuptools", "make", "g++"])
      // Create directories for data persistence
      .withExec(["mkdir", "-p", "/data/db", "/data/projects"])
      // Set environment variables
      .withEnvVariable("DATABASE_PATH", "/data/db/claudecodeui.db")
      .withEnvVariable("PORT", "3001")
      .withEnvVariable("NODE_ENV", "production")
      // Expose the web interface port
      .withExposedPort(3001)
      // Set the default command
      .withDefaultArgs(["claude-code-ui"])
  );
}

/**
 * Builds the ClaudeCodeUI image and optionally pushes it to GHCR.
 *
 * @param source The source directory (unused, but required for API consistency)
 * @param imageName The image name (including tag), e.g. ghcr.io/shepherdjerred/claudecodeui:latest
 * @param ghcrUsername The GHCR username
 * @param ghcrPassword The GHCR password (as a Dagger Secret)
 * @param dryRun If true, builds the image but doesn't publish it (default: false)
 * @returns The result of the build and/or push operation.
 */
export async function buildAndPushClaudeCodeUIImage(
  source: Directory,
  imageName = "ghcr.io/shepherdjerred/claudecodeui:latest",
  ghcrUsername: string,
  ghcrPassword: Secret,
  dryRun = false,
): Promise<StepResult> {
  const container = buildClaudeCodeUIContainer(source);

  // Build or publish the image based on dry-run flag
  if (dryRun) {
    // For dry-run, build the container to ensure it works
    await container.sync();
    return {
      status: "passed",
      message: "ClaudeCodeUI image built successfully",
    };
  }

  // Publish the image
  const result = await container.withRegistryAuth("ghcr.io", ghcrUsername, ghcrPassword).publish(imageName);

  return {
    status: "passed",
    message: `ClaudeCodeUI image published: ${result}`,
  };
}
