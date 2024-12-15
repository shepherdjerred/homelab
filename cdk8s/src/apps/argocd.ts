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
          parameters: [
            {
              "name": 'configs.cm."exec.enabled"',
              "value": "true",
            },
            {
              "name": 'configs.cm."timeout.reconciliation"',
              "value": "60s",
            },
            {
              "name": "global.domain",
              "value": "argocd.tailnet-1a49.ts.net",
            },
          ],
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
