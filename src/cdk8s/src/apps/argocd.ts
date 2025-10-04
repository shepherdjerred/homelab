import { Chart } from "cdk8s";
import { Application } from "../../generated/imports/argoproj.io.ts";
import versions from "../versions.ts";
import { createIngress } from "../misc/tailscale.ts";
import type { HelmValuesForChart } from "../misc/typed-helm-parameters.ts";

export function createArgoCdApp(chart: Chart) {
  createIngress(chart, "argocd-ingress", "argocd", "argocd-server", 443, ["argocd"], true);

  const argoCdValues: HelmValuesForChart<"argo-cd"> = {
    global: {
      domain: "argocd.tailnet-1a49.ts.net",
    },
    controller: {
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
          additionalLabels: {
            release: "prometheus",
          },
        },
      },
    },
    redis: {
      exporter: {
        enabled: true,
      },
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
          additionalLabels: {
            release: "prometheus",
          },
        },
      },
    },
    server: {
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
        },
      },
    },
    applicationSet: {
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
          additionalLabels: {
            release: "prometheus",
          },
        },
      },
    },
    notifications: {
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
          additionalLabels: {
            release: "prometheus",
          },
        },
      },
    },
    repoServer: {
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
          additionalLabels: {
            release: "prometheus",
          },
        },
      },
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
  };

  return new Application(chart, "argocd-app", {
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
          valuesObject: argoCdValues,
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
