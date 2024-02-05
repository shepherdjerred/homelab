import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createGrafanaApp(chart: Chart) {
  return new Application(chart, "grafana-app", {
    metadata: {
      name: "grafana",
      namespace: "argocd",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://grafana.github.io/helm-charts",
        path: "grafana/grafana",
        targetRevision: "grafana-7.3.0",
        helm: {
          parameters: [
            { name: "service.enabled", value: "false" },
            { name: "persistence.enabled", value: "true" },
            { name: "persistence.size", value: "50Gi" },
            { name: "persistence.storageClassName", value: "longhorn-hdd" },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "grafana",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
