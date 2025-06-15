import { dag, Secret } from "@dagger.io/dagger";
import type { StepResult } from "./index";
import { getCurlContainer } from "./base";

/**
 * Triggers a sync operation on the ArgoCD application using the provided token as a Dagger Secret.
 * Uses caching for improved performance.
 * @param argocdToken The ArgoCD API token for authentication (as a Dagger Secret).
 * @returns A StepResult object with status and message.
 */
export async function sync(argocdToken: Secret): Promise<StepResult> {
  // Use curl to get both the response body and HTTP status code
  const container = getCurlContainer()
    .withSecretVariable("ARGOCD_TOKEN", argocdToken)
    .withExec([
      "sh",
      "-c",
      // Output: body\nHTTP_CODE
      "curl -s -w '\\n%{http_code}' -X POST https://argocd.tailnet-1a49.ts.net/api/v1/applications/torvalds/sync " +
        "-H 'Cookie: argocd.token=$ARGOCD_TOKEN' " +
        "-H 'Content-Type: application/json'",
    ]);
  const output = await container.stdout();
  // Split output into body and status code
  const lastNewline = output.lastIndexOf("\n");
  const bodyRaw = output.slice(0, lastNewline);
  const statusCode = output.slice(lastNewline + 1).trim();
  let message: string;
  try {
    // Try to parse as JSON for better readability
    const parsed = JSON.parse(bodyRaw);
    message = JSON.stringify(parsed, null, 2);
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
