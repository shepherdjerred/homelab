import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

export function createGrafanaApp(chart: Chart) {
  return new Application(chart, "grafana-app", {
    metadata: {
      name: "grafana",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/dotdc/grafana-dashboards-kubernetes",
        path: ".",
        targetRevision: versions["dotdc/grafana-dashboards-kubernetes"],
        kustomize: {},
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
