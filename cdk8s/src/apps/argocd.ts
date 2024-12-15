import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

export function createArgoCdApp(chart: Chart) {
  new Application(chart, "argocd-app", {
    metadata: {
      name: "argocd",
    },
    spec: {
      project: "default",
      source: {
        // https://argoproj.github.io/argo-helm/
        repoUrl: "https://argoproj.github.io/argo-helm/",
        targetRevision: versions["argoproj/argo-cd"],
        chart: "argo-cd",
        helm: {
          valuesObject: {
            url: "argocd.tailnet-1a49.ts.net",
            statusBadge: {
              enabled: true,
              url: "argocd.tailnet-1a49.ts.net",
            },
            configs: {
              cm: {
                "exec.enabled": true,
                "timeout.reconciliation": "60s",
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
