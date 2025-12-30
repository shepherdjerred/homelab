import { dag, Container, Directory, Secret } from "@dagger.io/dagger";
import versions from "./versions";
import { getMiseRuntimeContainer } from "./base";
import { formatDaggerError } from "./errors";

// Release-please configuration
const RELEASE_PLEASE_VERSION = "17.1.3";
const REPO_URL = "shepherdjerred/homelab";

/**
 * Get a container with release-please CLI installed
 */
export function getReleasePleaseContainer(): Container {
  return dag
    .container()
    .from(`oven/bun:${versions.bun}-debian`)
    .withMountedCache("/var/cache/apt", dag.cacheVolume(`apt-cache-bun-${versions.bun}-debian`))
    .withMountedCache("/var/lib/apt", dag.cacheVolume(`apt-lib-bun-${versions.bun}-debian`))
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "git"])
    .withExec(["bun", "install", "-g", `release-please@${RELEASE_PLEASE_VERSION}`])
    .withWorkdir("/workspace");
}

/**
 * Run a release-please command and capture output
 */
export async function runReleasePleaseCommand(
  container: Container,
  command: string,
): Promise<{ output: string; success: boolean }> {
  const result = await container.withExec(["sh", "-c", `${command} 2>&1; echo "EXIT_CODE:$?"`]).stdout();

  const lines = result.trim().split("\n");
  const lastLine = lines[lines.length - 1] ?? "";
  const exitCodeMatch = /EXIT_CODE:(\d+)/.exec(lastLine);
  const exitCode = exitCodeMatch ? parseInt(exitCodeMatch[1] ?? "1", 10) : 1;
  const output = lines.slice(0, -1).join("\n");

  return {
    output: output || "(no output)",
    success: exitCode === 0,
  };
}

/**
 * Run release-please release-pr command
 */
export async function runReleasePr(githubToken: Secret): Promise<{ output: string; success: boolean }> {
  const container = getReleasePleaseContainer().withSecretVariable("GITHUB_TOKEN", githubToken);

  return runReleasePleaseCommand(
    container,
    `git clone https://x-access-token:$GITHUB_TOKEN@github.com/${REPO_URL}.git . && release-please release-pr --token=\\$GITHUB_TOKEN --repo-url=${REPO_URL} --target-branch=main`,
  );
}

/**
 * Run release-please github-release command
 */
export async function runGithubRelease(githubToken: Secret): Promise<{ output: string; success: boolean }> {
  const container = getReleasePleaseContainer().withSecretVariable("GITHUB_TOKEN", githubToken);

  return runReleasePleaseCommand(
    container,
    `git clone https://x-access-token:$GITHUB_TOKEN@github.com/${REPO_URL}.git . && release-please github-release --token=\\$GITHUB_TOKEN --repo-url=${REPO_URL} --target-branch=main`,
  );
}

/**
 * Check if a release was created based on the github-release output
 */
export function wasReleaseCreated(result: { output: string; success: boolean }): boolean {
  return (
    result.success &&
    (result.output.includes("github.com") ||
      result.output.includes("Created release") ||
      result.output.includes("created release"))
  );
}

export type ReleasePleaseResult = {
  status: "passed" | "failed" | "skipped";
  message: string;
};

/**
 * Run the complete release-please workflow including npm publishing
 */
export async function runReleasePleaseWorkflow(
  githubToken: Secret,
  npmToken: Secret,
  source: Directory,
): Promise<ReleasePleaseResult> {
  const releaseOutputs: string[] = [];

  const prResult = await runReleasePr(githubToken);
  releaseOutputs.push(`Release PR (success=${String(prResult.success)}):`);
  releaseOutputs.push(prResult.output);

  const releaseResult = await runGithubRelease(githubToken);
  releaseOutputs.push(`GitHub Release (success=${String(releaseResult.success)}):`);
  releaseOutputs.push(releaseResult.output);

  if (wasReleaseCreated(releaseResult)) {
    releaseOutputs.push("\n--- NPM Publishing ---");
    const publishContainer = getMiseRuntimeContainer()
      .withWorkdir("/workspace")
      .withMountedDirectory("/workspace", source)
      .withMountedCache("/root/.bun/install/cache", dag.cacheVolume("bun-cache-default"))
      .withExec(["bun", "install", "--frozen-lockfile"]);

    try {
      await publishContainer
        .withWorkdir("/workspace/src/helm-types")
        .withSecretVariable("NPM_TOKEN", npmToken)
        .withExec(["sh", "-c", 'echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc'])
        .withExec(["bun", "run", "build"])
        .withExec([
          "bun",
          "publish",
          "--access",
          "public",
          "--tag",
          "latest",
          "--registry",
          "https://registry.npmjs.org",
        ])
        .stdout();
      releaseOutputs.push("✓ Published @shepherdjerred/helm-types");
    } catch (error) {
      releaseOutputs.push(`✗ Failed to publish @shepherdjerred/helm-types: ${formatDaggerError(error)}`);
    }
  } else {
    releaseOutputs.push("No releases created - skipping NPM publish");
  }

  return {
    status: prResult.success && releaseResult.success ? "passed" : "failed",
    message: releaseOutputs.join("\n"),
  };
}
