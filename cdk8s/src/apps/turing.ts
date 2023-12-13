import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createTuringApp(chart: Chart) {
  return new Application(chart, "turing-app", {
    metadata: {
      name: "turing",
      namespace: "argocd",
      labels: {
        "app.kubernetes.io/instance": "apps",
      },
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/shepherdjerred/servers",
        path: "cdk8s/dist/",
        targetRevision: "main",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "turing",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
