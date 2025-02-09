import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { createIngress } from "../utils/tailscale.ts";

export function createGrafanaApp(chart: Chart) {
  createIngress(
    chart,
    "grafana-ingress",
    "prometheus",
    "prometheus-grafana",
    80,
    ["grafana"],
    false,
  );

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
        namespace: "prometheus",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
