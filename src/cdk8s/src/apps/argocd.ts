import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { createIngress } from "../utils/tailscale.ts";

export function createArgoCdApp(chart: Chart) {
  createIngress(
    chart,
    "argocd-ingress",
    "argocd",
    "argocd-server",
    443,
    ["argocd"],
    true,
  );

  new Application(chart, "argocd-app", {
    metadata: {
      name: "argocd",
    },
    spec: {
      project: "default",
      source: {
        // https://argoproj.github.io/argo-helm/
        repoUrl: "https://argoproj.github.io/argo-helm/",
        targetRevision: versions["argo-cd"],
        chart: "argo-cd",
        helm: {
          valuesObject: {
            global: {
              domain: "argocd.tailnet-1a49.ts.net",
            },
            configs: {
              cm: {
                "exec.enabled": true,
                "timeout.reconciliation": "60s",
                "statusbadge.enabled": true,
                // TODO: rename
                "accounts.jenkins": "apiKey",
                "accounts.jenkins.enabled": true,
              },
              rbac: {
                // TODO: scope this to only syncing
                "policy.csv": "g, jenkins, role:admin",
              },
            },
          },
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "argocd",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
