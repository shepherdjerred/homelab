import { dag, argument, Secret } from "@dagger.io/dagger";

/**
 * Triggers a sync operation on the ArgoCD application using the provided token as a Dagger Secret.
 * @param argocdToken The ArgoCD API token for authentication (as a Dagger Secret).
 * @returns The stdout from the ArgoCD sync API call.
 */
export async function sync(argocdToken: Secret): Promise<string> {
  const container = dag
    .container()
    .from("curlimages/curl")
    .withSecretVariable("ARGOCD_TOKEN", argocdToken)
    .withExec([
      "curl",
      "-X",
      "POST",
      "https://argocd.tailnet-1a49.ts.net/api/v1/applications/torvalds/sync",
      "-H",
      "Authorization: Bearer $ARGOCD_TOKEN",
      "-H",
      "Content-Type: application/json",
    ]);
  return container.stdout();
}
