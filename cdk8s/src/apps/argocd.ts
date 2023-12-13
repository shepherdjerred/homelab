import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createArgoCdApp(chart: Chart) {
  new Application(chart, "argocd-app", {
    metadata: {
      name: "argocd",
      namespace: "apps",
      labels: {
        "app.kubernetes.io/instance": "apps",
      },
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/argoproj/argo-cd",
        targetRevision: "stable",
        path: "manifests/",
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
