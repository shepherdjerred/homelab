import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";

export function createLokiApp(chart: Chart) {
  new Application(chart, "loki-app", {
    metadata: {
      name: "loki",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/grafana/helm-charts/tree/main/charts/loki-stack
        repoUrl: "https://grafana.github.io/helm-charts",
        targetRevision: versions["loki-stack"],
        chart: "loki-stack",
        helm: {
          valuesObject: {},
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "loki",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
