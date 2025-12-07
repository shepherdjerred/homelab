/**
 * Standalone script to generate and send weekly dependency update summaries.
 * Run via: bun run src/dependency-summary.ts
 *
 * Required environment variables:
 * - OPENAI_API_KEY: OpenAI API key for GPT-5.1
 * - RESEND_API_KEY: Resend API key for sending emails
 * - RECIPIENT_EMAIL: Email address to send the summary to
 * - SENDER_EMAIL: (optional) Email address to send from (default: updates@homelab.local)
 */

import simpleGit from "simple-git";
import OpenAI from "openai";
import { z } from "zod";

// Schema for parsed dependency info from renovate comments
const DependencyInfoSchema = z.object({
  name: z.string(),
  datasource: z.enum(["helm", "docker", "github-releases", "custom.papermc"]),
  registryUrl: z.string().optional(),
  oldVersion: z.string(),
  newVersion: z.string(),
});

type DependencyInfo = z.infer<typeof DependencyInfoSchema>;

// Schema for ArtifactHub response
const ArtifactHubSchema = z.object({
  links: z
    .array(
      z.object({
        name: z.string().optional(),
        url: z.string().optional(),
      }),
    )
    .optional(),
  repository: z
    .object({
      url: z.string().optional(),
    })
    .optional(),
});

// Schema for release notes
type ReleaseNotes = {
  dependency: string;
  version: string;
  notes: string;
  url?: string;
  source: "helm-chart" | "app" | "docker" | "github";
};

// Track failed fetches
type FailedFetch = {
  dependency: string;
  reason: string;
};

const VERSIONS_FILE_PATH = "src/cdk8s/src/versions.ts";
const REPO_URL = "https://github.com/shepherdjerred/homelab.git";

// Parse command line args
// Usage: bun run src/dependency-summary.ts [days] [--dry-run]
const args = Bun.argv.slice(2);
const dryRun = args.includes("--dry-run");
const daysArg = args.find((a) => !a.startsWith("--"));
const DAYS_TO_LOOK_BACK = daysArg ? parseInt(daysArg, 10) : 7;

async function main() {
  console.log(`Starting dependency summary generation (looking back ${String(DAYS_TO_LOOK_BACK)} days)...`);

  try {
    await generateAndSendSummary();
    console.log("Weekly dependency summary sent successfully!");
  } catch (error) {
    console.error(`Failed to generate dependency summary: ${String(error)}`);
    process.exit(1);
  }
}

async function generateAndSendSummary() {
  // Clone repo to temp directory for analysis
  const id = crypto.randomUUID();
  const tempDir = `/tmp/homelab-dep-summary-${id}`;

  // Create temp directory
  await Bun.$`mkdir -p ${tempDir}`;
  console.log(`Cloning repo to ${tempDir}`);

  try {
    const git = simpleGit();
    await git.clone(REPO_URL, tempDir, ["--depth", "100"]); // Shallow clone with enough history

    // Step 1: Get dependency changes from git history
    const changes = await getVersionChanges(tempDir);
    if (changes.length === 0) {
      console.log("No dependency changes in the last week");
      await sendEmail("No Dependency Updates This Week", "<p>No dependencies were updated in the last week.</p>");
      return;
    }

    console.log(`Found ${String(changes.length)} dependency changes`);

    // Step 2: Fetch release notes for each change
    const { notes: releaseNotes, failed: failedFetches } = await fetchAllReleaseNotes(changes);

    // Step 3: Summarize with GPT-5.1
    const summary = await summarizeWithLLM(changes, releaseNotes);

    // Step 4: Format and send email
    const htmlContent = formatEmailHtml(changes, summary, failedFetches);
    await sendEmail("Weekly Dependency Update Summary", htmlContent);
  } finally {
    // Cleanup temp directory
    await Bun.$`rm -rf ${tempDir}`;
    console.log("Cleaned up temp directory");
  }
}

async function getVersionChanges(repoPath: string): Promise<DependencyInfo[]> {
  const git = simpleGit(repoPath);
  const lookbackDate = new Date();
  lookbackDate.setDate(lookbackDate.getDate() - DAYS_TO_LOOK_BACK);
  const dateStr = lookbackDate.toISOString().split("T")[0];
  const sinceDate = dateStr ?? "";

  // Get commits that modified versions.ts in the last week
  const log = await git.log({
    file: VERSIONS_FILE_PATH,
    "--since": sinceDate,
  });

  if (log.all.length === 0) {
    return [];
  }

  console.log(`Found ${String(log.all.length)} commits modifying versions.ts`);

  const changes: DependencyInfo[] = [];

  // For each commit, get the diff to extract version changes
  for (const commit of log.all) {
    try {
      // Use raw() with --no-ext-diff to get standard unified diff format
      const diff = await git.raw([
        "diff",
        "--no-ext-diff",
        "-U3",
        `${commit.hash}^`,
        commit.hash,
        "--",
        VERSIONS_FILE_PATH,
      ]);
      const parsedChanges = parseDiff(diff);
      changes.push(...parsedChanges);
    } catch {
      // First commit or other edge case
      console.log(`Could not get diff for commit ${commit.hash}`);
    }
  }

  // Deduplicate by dependency name, keeping the most recent change
  const uniqueChanges = new Map<string, DependencyInfo>();
  for (const change of changes) {
    const existing = uniqueChanges.get(change.name);
    if (!existing) {
      uniqueChanges.set(change.name, change);
    } else {
      // Keep the oldest "old" version and newest "new" version
      uniqueChanges.set(change.name, {
        ...change,
        oldVersion: existing.oldVersion,
      });
    }
  }

  return Array.from(uniqueChanges.values());
}

function parseDiff(diff: string): DependencyInfo[] {
  const changes: DependencyInfo[] = [];
  const lines = diff.split("\n");

  // Match both quoted keys ("name": "value") and unquoted keys (name: "value")
  const versionRegex = /(?:"([^"]+)"|([a-zA-Z0-9_-]+)):\s*"([^"]+)"/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // Look for removed lines (old version)
    if (line.startsWith("-") && !line.startsWith("---")) {
      const versionMatch = versionRegex.exec(line);
      if (versionMatch) {
        // Name is either group 1 (quoted) or group 2 (unquoted)
        const name = versionMatch[1] ?? versionMatch[2];
        const oldVersion = versionMatch[3];
        if (!name || !oldVersion) continue;

        // Look backwards for the renovate comment (should be directly above)
        // The comment must be on the immediately preceding line (in context)
        let renovateComment: string | null = null;
        const prevLine = lines[i - 1];
        if (prevLine?.includes("// renovate:")) {
          renovateComment = prevLine;
        }

        // Look for the corresponding added line
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j];
          if (!nextLine) continue;
          if (nextLine.startsWith("+") && !nextLine.startsWith("+++")) {
            const newVersionMatch = versionRegex.exec(nextLine);
            if (newVersionMatch) {
              const newName = newVersionMatch[1] ?? newVersionMatch[2];
              if (newName === name) {
                const newVersion = newVersionMatch[3];
                if (!newVersion) continue;
                const info = parseRenovateComment(renovateComment, name, oldVersion, newVersion);
                if (info) {
                  changes.push(info);
                }
                break;
              }
            }
          }
        }
      }
    }
  }

  return changes;
}

function parseRenovateComment(
  comment: string | null,
  name: string,
  oldVersion: string,
  newVersion: string,
): DependencyInfo | null {
  if (!comment) {
    return null;
  }

  const datasourceRegex = /datasource=([^\s]+)/;
  const registryUrlRegex = /registryUrl=([^\s]+)/;

  const datasourceMatch = datasourceRegex.exec(comment);
  const registryUrlMatch = registryUrlRegex.exec(comment);

  if (!datasourceMatch) {
    return null;
  }

  const datasource = datasourceMatch[1];
  const validDatasources = ["helm", "docker", "github-releases", "custom.papermc"];
  if (!datasource || !validDatasources.includes(datasource)) {
    return null;
  }

  const parsed = DependencyInfoSchema.safeParse({
    name,
    datasource,
    registryUrl: registryUrlMatch?.[1],
    oldVersion: cleanVersion(oldVersion),
    newVersion: cleanVersion(newVersion),
  });

  return parsed.success ? parsed.data : null;
}

function cleanVersion(version: string): string {
  // Remove sha256 digest if present
  return version.split("@")[0] ?? version;
}

async function fetchAllReleaseNotes(
  changes: DependencyInfo[],
): Promise<{ notes: ReleaseNotes[]; failed: FailedFetch[] }> {
  const notes: ReleaseNotes[] = [];
  const failed: FailedFetch[] = [];

  for (const change of changes) {
    try {
      console.log(`Fetching release notes for ${change.name} (${change.datasource})...`);
      const releaseNotesList = await fetchReleaseNotes(change);
      if (releaseNotesList.length > 0) {
        for (const note of releaseNotesList) {
          const preview = note.notes.slice(0, 100).replace(/\n/g, " ");
          console.log(`  ✓ [${note.source}] Got ${String(note.notes.length)} chars: "${preview}..."`);
          notes.push(note);
        }
      } else {
        console.log(`  ✗ No release notes found`);
        failed.push({ dependency: change.name, reason: "No GitHub releases found" });
      }
    } catch (error) {
      console.warn(`  ✗ Failed: ${String(error)}`);
      failed.push({ dependency: change.name, reason: String(error) });
    }
  }

  return { notes, failed };
}

async function fetchReleaseNotes(dep: DependencyInfo): Promise<ReleaseNotes[]> {
  const results: ReleaseNotes[] = [];

  switch (dep.datasource) {
    case "github-releases": {
      const note = await fetchGitHubReleaseNotes(dep);
      if (note) results.push(note);
      break;
    }
    case "docker": {
      const note = await fetchDockerReleaseNotes(dep);
      if (note) results.push(note);
      break;
    }
    case "helm": {
      // For Helm, fetch both chart notes AND underlying app notes
      const helmNotes = await fetchHelmReleaseNotes(dep);
      results.push(...helmNotes);
      break;
    }
  }

  return results;
}

async function fetchGitHubReleaseNotes(dep: DependencyInfo): Promise<ReleaseNotes | null> {
  // dep.name is like "kubernetes/kubernetes" or "siderolabs/talos"
  const [owner, repo] = dep.name.split("/");
  if (!owner || !repo) {
    return null;
  }

  const releases = await fetchGitHubReleases(owner, repo, dep.newVersion);
  if (releases) {
    return {
      dependency: dep.name,
      version: dep.newVersion,
      notes: releases.body,
      url: releases.url,
      source: "github",
    };
  }
  return null;
}

async function fetchDockerReleaseNotes(dep: DependencyInfo): Promise<ReleaseNotes | null> {
  // Look up the GitHub repo for this Docker image
  const githubRepo = DOCKER_IMAGE_GITHUB_REPOS[dep.name];

  if (githubRepo) {
    const [owner, repo] = githubRepo.split("/");
    if (owner && repo) {
      const releases = await fetchGitHubReleases(owner, repo, dep.newVersion);
      if (releases) {
        return {
          dependency: dep.name,
          version: dep.newVersion,
          notes: releases.body,
          url: releases.url,
          source: "docker",
        };
      }
    }
  }

  // Try common GitHub repo patterns as fallback
  const [org, image] = dep.name.split("/");
  if (!org || !image) {
    return null;
  }

  const possibleRepos: string[] = [
    `${org}/${image}`,
    `${org}/docker-${image}`,
    `${image}/${image}`, // e.g., syncthing/syncthing
  ];

  for (const repoPath of possibleRepos) {
    const [repoOwner, repoName] = repoPath.split("/");
    if (!repoOwner || !repoName) continue;

    const releases = await fetchGitHubReleases(repoOwner, repoName, dep.newVersion);
    if (releases) {
      return {
        dependency: dep.name,
        version: dep.newVersion,
        notes: releases.body,
        url: releases.url,
        source: "docker",
      };
    }
  }

  return null;
}

// Map of Helm charts to their GitHub repos for chart release notes
const HELM_CHART_GITHUB_REPOS: Record<string, string> = {
  "argo-cd": "argoproj/argo-helm",
  "cert-manager": "cert-manager/cert-manager",
  coder: "coder/coder",
  velero: "vmware-tanzu/helm-charts",
  "kube-prometheus-stack": "prometheus-community/helm-charts",
  openebs: "openebs/openebs",
  "tailscale-operator": "tailscale/tailscale",
  loki: "grafana/helm-charts",
  promtail: "grafana/helm-charts",
  tempo: "grafana/helm-charts",
  chartmuseum: "helm/chartmuseum",
  minecraft: "itzg/minecraft-server-charts",
  "node-feature-discovery": "kubernetes-sigs/node-feature-discovery",
  "prometheus-adapter": "kubernetes-sigs/prometheus-adapter",
  "postgres-operator": "zalando/postgres-operator",
  connect: "1Password/connect-helm-charts",
  "intel-device-plugins-operator": "intel/helm-charts",
};

// Map of Helm charts to underlying app GitHub repos (for app version release notes)
const HELM_CHART_APP_REPOS: Record<string, string> = {
  "argo-cd": "argoproj/argo-cd",
  "cert-manager": "cert-manager/cert-manager",
  coder: "coder/coder",
  velero: "vmware-tanzu/velero",
  "kube-prometheus-stack": "prometheus/prometheus", // Main app
  openebs: "openebs/openebs",
  "tailscale-operator": "tailscale/tailscale",
  loki: "grafana/loki",
  promtail: "grafana/loki",
  tempo: "grafana/tempo",
  chartmuseum: "helm/chartmuseum",
  minecraft: "itzg/docker-minecraft-server",
  "node-feature-discovery": "kubernetes-sigs/node-feature-discovery",
  "prometheus-adapter": "kubernetes-sigs/prometheus-adapter",
  "postgres-operator": "zalando/postgres-operator",
  connect: "1Password/connect",
  "intel-device-plugins-operator": "intel/intel-device-plugins-for-kubernetes",
};

// Map of Docker images to their GitHub repos
const DOCKER_IMAGE_GITHUB_REPOS: Record<string, string> = {
  "home-assistant/home-assistant": "home-assistant/core",
  "linuxserver/bazarr": "morpheus65535/bazarr",
  "linuxserver/sonarr": "Sonarr/Sonarr",
  "linuxserver/radarr": "Radarr/Radarr",
  "linuxserver/prowlarr": "Prowlarr/Prowlarr",
  "linuxserver/syncthing": "syncthing/syncthing",
  "linuxserver/overseerr": "sct/overseerr",
  "linuxserver/tautulli": "Tautulli/Tautulli",
  "linuxserver/qbittorrent": "qbittorrent/qBittorrent",
  "jorenn92/maintainerr": "jorenn92/maintainerr",
  "qdm12/gluetun": "qdm12/gluetun",
  "cooperspencer/gickup": "cooperspencer/gickup",
  recyclarr: "recyclarr/recyclarr",
  "freshrss/freshrss": "FreshRSS/FreshRSS",
  "dagger-helm": "dagger/dagger",
  "tailscale/golink": "tailscale/golink",
};

async function fetchHelmReleaseNotes(dep: DependencyInfo): Promise<ReleaseNotes[]> {
  const results: ReleaseNotes[] = [];

  // 1. Try to fetch Helm chart release notes
  const chartRepo = HELM_CHART_GITHUB_REPOS[dep.name];
  if (chartRepo) {
    const [owner, repo] = chartRepo.split("/");
    if (owner && repo) {
      // Try chart-specific tag formats
      const chartTags = [`${dep.name}-${dep.newVersion}`, `${dep.newVersion}`, `v${dep.newVersion}`];

      for (const tag of chartTags) {
        const releases = await fetchGitHubReleases(owner, repo, tag);
        if (releases) {
          results.push({
            dependency: `${dep.name} (helm chart)`,
            version: dep.newVersion,
            notes: releases.body,
            url: releases.url,
            source: "helm-chart",
          });
          break;
        }
      }
    }
  }

  // 2. Try to fetch underlying app release notes
  const appRepo = HELM_CHART_APP_REPOS[dep.name];
  if (appRepo && appRepo !== chartRepo) {
    const [owner, repo] = appRepo.split("/");
    if (owner && repo) {
      // For app releases, we need to look up what app version corresponds to the chart version
      // For now, try to find releases that might match
      const releases = await fetchGitHubReleases(owner, repo, dep.newVersion);
      if (releases) {
        results.push({
          dependency: `${dep.name} (app)`,
          version: dep.newVersion,
          notes: releases.body,
          url: releases.url,
          source: "app",
        });
      }
    }
  }

  // 3. If still nothing, try ArtifactHub API as fallback
  if (results.length === 0) {
    try {
      const searchUrl = `https://artifacthub.io/api/v1/packages/helm/${dep.name}`;
      const response = await fetch(searchUrl, {
        headers: {
          Accept: "application/json",
          "User-Agent": "homelab-dependency-summary",
        },
      });

      if (response.ok) {
        const rawData: unknown = await response.json();
        const parsed = ArtifactHubSchema.safeParse(rawData);

        if (parsed.success && parsed.data.repository?.url) {
          const repoMatch = /github\.com\/([^/]+\/[^/]+)/i.exec(parsed.data.repository.url);
          if (repoMatch?.[1]) {
            const [owner, repo] = repoMatch[1].split("/");
            if (owner && repo) {
              const releases = await fetchGitHubReleases(owner, repo, dep.newVersion);
              if (releases) {
                results.push({
                  dependency: dep.name,
                  version: dep.newVersion,
                  notes: releases.body,
                  url: releases.url,
                  source: "helm-chart",
                });
              }
            }
          }
        }
      }
    } catch {
      // Continue
    }
  }

  return results;
}

function getGitHubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "homelab-dependency-summary",
  };

  const token = Bun.env["GITHUB_TOKEN"];
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

async function fetchGitHubReleases(
  owner: string,
  repo: string,
  version: string,
): Promise<{ body: string; url: string } | null> {
  const headers = getGitHubHeaders();

  // Try exact version tag first
  const tagsToTry = [
    version,
    `v${version}`,
    version.replace(/^v/, ""),
    `${repo}-${version}`, // Some repos use repo-name-version format
  ];

  for (const tag of tagsToTry) {
    const url = `https://api.github.com/repos/${owner}/${repo}/releases/tags/${tag}`;
    try {
      const response = await fetch(url, { headers });

      if (response.ok) {
        const data = (await response.json()) as { body?: string; html_url?: string };
        if (data.body && data.body.length > 50) {
          return {
            body: data.body,
            url: data.html_url ?? `https://github.com/${owner}/${repo}/releases/tag/${tag}`,
          };
        }
      }
    } catch {
      continue;
    }
  }

  // Fall back to fetching recent releases and finding a match
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=20`;
    const response = await fetch(url, { headers });

    if (response.ok) {
      const releases = (await response.json()) as Array<{
        tag_name?: string;
        body?: string;
        html_url?: string;
      }>;

      // Find release containing our version
      const matchingRelease = releases.find(
        (r) => r.tag_name?.includes(version) || r.tag_name?.includes(version.replace(/^v/, "")),
      );

      if (matchingRelease?.body && matchingRelease.body.length > 50) {
        return {
          body: matchingRelease.body,
          url: matchingRelease.html_url ?? `https://github.com/${owner}/${repo}/releases`,
        };
      }
    }
  } catch {
    // Fall through
  }

  return null;
}

async function summarizeWithLLM(changes: DependencyInfo[], releaseNotes: ReleaseNotes[]): Promise<string> {
  const apiKey = Bun.env["OPENAI_API_KEY"];
  if (!apiKey) {
    console.warn("OPENAI_API_KEY not set, skipping LLM summarization");
    return "LLM summarization skipped - API key not configured";
  }

  const openai = new OpenAI({ apiKey });

  // Build the prompt
  const changesText = changes.map((c) => `- ${c.name}: ${c.oldVersion} → ${c.newVersion} (${c.datasource})`).join("\n");

  const notesText = releaseNotes
    .map((n) => `## ${n.dependency} [${n.source}] (${n.version})\n${n.notes}\n${n.url ? `URL: ${n.url}` : ""}`)
    .join("\n\n");

  // Note which dependencies we couldn't fetch notes for
  const fetchedDeps = new Set(releaseNotes.map((n) => n.dependency.replace(/ \((helm chart|app)\)$/, "")));
  const missingNotes = changes.filter((c) => !fetchedDeps.has(c.name)).map((c) => c.name);
  const missingNotesText =
    missingNotes.length > 0
      ? `\n\nNote: Release notes could NOT be fetched for: ${missingNotes.join(", ")}. Be conservative with recommendations for these.`
      : "";

  const prompt = `You are a DevOps engineer reviewing weekly dependency updates for a homelab Kubernetes infrastructure.

Here are the dependencies that were updated this week:
${changesText}

Here are the available release notes:
${notesText}
${missingNotesText}

Please provide a concise summary that includes:
1. **Breaking Changes**: Any breaking changes that require immediate action
2. **Security Updates**: Any security-related fixes
3. **Notable New Features**: Features that might be useful for a homelab setup
4. **Recommended Actions**: Specific things to check or configure after these updates

IMPORTANT: Only include information that is EXPLICITLY mentioned in the release notes provided above.
Do NOT speculate or make assumptions about changes that are not documented.
For dependencies without release notes, simply note that no information is available.

Keep the summary actionable and focused on what matters for a self-hosted homelab environment.
Format the response in HTML for email.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.1",
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: 8000, // GPT-5.1 uses tokens for reasoning + output
    });

    const choice = completion.choices[0];
    return choice?.message.content ?? "Failed to generate summary";
  } catch (error) {
    console.error(`OpenAI API error: ${String(error)}`);
    return "Failed to generate LLM summary";
  }
}

function formatEmailHtml(changes: DependencyInfo[], llmSummary: string, failedFetches: FailedFetch[]): string {
  const changesHtml = changes
    .map(
      (c) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${c.name}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${c.oldVersion}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${c.newVersion}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${c.datasource}</td>
        </tr>`,
    )
    .join("");

  const failedHtml =
    failedFetches.length > 0
      ? `
  <h2>⚠️ Failed to Fetch Release Notes (${String(failedFetches.length)})</h2>
  <p style="color: #b45309; background-color: #fef3c7; padding: 10px; border-radius: 4px;">
    The following dependencies could not have their release notes fetched.
    The AI summary for these may be less accurate.
  </p>
  <ul>
    ${failedFetches.map((f) => `<li><strong>${f.dependency}</strong>: ${f.reason}</li>`).join("\n    ")}
  </ul>
  `
      : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
    h2 { color: #1e40af; margin-top: 30px; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th { background-color: #2563eb; color: white; padding: 12px 8px; text-align: left; }
    td { padding: 8px; border: 1px solid #ddd; }
    tr:nth-child(even) { background-color: #f8fafc; }
    .summary { background-color: #f0f9ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 0.9em; }
  </style>
</head>
<body>
  <h1>Weekly Dependency Update Summary</h1>
  <p>Generated on ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>

  <h2>Updated Dependencies (${String(changes.length)})</h2>
  <table>
    <thead>
      <tr>
        <th>Dependency</th>
        <th>Old Version</th>
        <th>New Version</th>
        <th>Source</th>
      </tr>
    </thead>
    <tbody>
      ${changesHtml}
    </tbody>
  </table>

  ${failedHtml}

  <h2>AI Summary</h2>
  <div class="summary">
    ${llmSummary}
  </div>

  <div class="footer">
    <p>This summary was automatically generated by your homelab dependency monitoring system.</p>
    <p>Repository: <a href="https://github.com/shepherdjerred/homelab">shepherdjerred/homelab</a></p>
  </div>
</body>
</html>`;
}

async function sendEmail(subject: string, htmlContent: string): Promise<void> {
  // In dry-run mode, output to markdown file
  if (dryRun) {
    // Convert HTML to markdown
    const markdown = htmlContent
      // Remove style blocks
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      // Convert headers
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "\n# $1\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n## $1\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n### $1\n")
      // Convert strong/bold
      .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
      .replace(/<b>(.*?)<\/b>/gi, "**$1**")
      // Convert em/italic
      .replace(/<em>(.*?)<\/em>/gi, "*$1*")
      .replace(/<i>(.*?)<\/i>/gi, "*$1*")
      // Convert links
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
      // Convert table - build proper markdown table
      .replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_match, tableContent: string) => {
        const rows: string[] = [];
        const rowMatches = tableContent.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) ?? [];
        rowMatches.forEach((row, index) => {
          const cells: string[] = [];
          const cellMatches = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi) ?? [];
          cellMatches.forEach((cell) => {
            const content = cell
              .replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/i, "$1")
              .replace(/<[^>]+>/g, "")
              .trim();
            cells.push(content);
          });
          rows.push("| " + cells.join(" | ") + " |");
          // Add separator after header row
          if (index === 0) {
            rows.push("|" + cells.map(() => "---").join("|") + "|");
          }
        });
        return "\n" + rows.join("\n") + "\n";
      })
      // Convert list items
      .replace(/<li[^>]*>/gi, "\n- ")
      .replace(/<\/li>/gi, "")
      // Convert paragraphs and divs to newlines
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<p[^>]*>/gi, "")
      .replace(/<\/div>/gi, "\n")
      .replace(/<div[^>]*>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      // Remove remaining tags
      .replace(/<[^>]+>/g, "")
      // Decode HTML entities
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      // Clean up whitespace
      .replace(/\n\s*\n\s*\n/g, "\n\n")
      .trim();

    const outputPath = "dependency-summary.md";
    await Bun.write(outputPath, markdown);
    console.log(`\nDRY RUN - Markdown summary written to: ${outputPath}`);
    return;
  }

  const apiKey = Bun.env["RESEND_API_KEY"];
  const recipientEmail = Bun.env["RECIPIENT_EMAIL"];
  const senderEmail = Bun.env["SENDER_EMAIL"] ?? "updates@homelab.local";

  if (!apiKey) {
    console.error("RESEND_API_KEY not set, cannot send email");
    throw new Error("RESEND_API_KEY not set");
  }

  if (!recipientEmail) {
    console.error("RECIPIENT_EMAIL not set, cannot send email");
    throw new Error("RECIPIENT_EMAIL not set");
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail,
        to: recipientEmail,
        subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Resend API error: ${String(response.status)} - ${errorText}`);
    }

    console.log("Email sent successfully via Resend");
  } catch (error) {
    console.error(`Failed to send email: ${String(error)}`);
    throw error;
  }
}

// Run the script
await main();
