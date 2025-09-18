import { Secret } from "@dagger.io/dagger";
import type { StepResult } from "./index";
import { getCurlContainer } from "./base";

/**
 * Triggers a sync operation on the ArgoCD application using the provided token as a Dagger Secret.
 * Uses caching for improved performance.
 * @param argocdToken The ArgoCD API token for authentication (as a Dagger Secret).
 * @param argocdServer The ArgoCD server URL (defaults to hardcoded value for now).
 * @param appName The ArgoCD application name to sync (defaults to "torvalds").
 * @returns A StepResult object with status and message.
 */
export async function sync(
  argocdToken: Secret,
  argocdServer: string = "https://argocd.tailnet-1a49.ts.net",
  appName: string = "torvalds",
): Promise<StepResult> {
  // Use curl to get both the response body and HTTP status code
  const container = getCurlContainer()
    .withSecretVariable("ARGOCD_TOKEN", argocdToken)
    .withExec([
      "sh",
      "-c",
      // Output: body\nHTTP_CODE
      `curl -s -w '\\n%{http_code}' -X POST ${argocdServer}/api/v1/applications/${appName}/sync ` +
        '-H "Authorization: Bearer $ARGOCD_TOKEN" ' +
        "-H 'Content-Type: application/json'",
    ]);
  const output = await container.stdout();

  // Split output into body and status code
  const lastNewline = output.lastIndexOf("\n");
  const bodyRaw = output.slice(0, lastNewline);
  const statusCode = output.slice(lastNewline + 1).trim();
  let message: string;
  try {
    // Try to parse as JSON and extract key information
    const parsed = JSON.parse(bodyRaw);

    // Extract concise sync information instead of dumping entire JSON
    const syncInfo = {
      phase: parsed.status?.sync?.status || "Unknown",
      health: parsed.status?.health?.status || "Unknown",
      revision: parsed.status?.sync?.revision?.slice(0, 8) || "Unknown",
      resourcesCount: parsed.status?.resources?.length || 0,
      message:
        parsed.status?.conditions?.[0]?.message ||
        parsed.message ||
        "Sync operation completed",
    };
    message = `Phase: ${syncInfo.phase}, Health: ${syncInfo.health}, Revision: ${syncInfo.revision}, Resources: ${syncInfo.resourcesCount}\n${syncInfo.message}`;
  } catch {
    // Fallback to raw body if not JSON
    message = bodyRaw;
  }
  if (statusCode.startsWith("2")) {
    return { status: "passed", message };
  } else {
    return { status: "failed", message };
  }
}
