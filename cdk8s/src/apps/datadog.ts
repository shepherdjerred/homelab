import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createDatadogApp(chart: Chart) {
  return new Application(chart, "datadog-app", {
    metadata: {
      name: "datadog",
      namespace: "argocd",
      labels: {
        "app.kubernetes.io/instance": "apps",
      },
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://helm.datadoghq.com",
        targetRevision: "1.2.2",
        chart: "datadog-operator",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "datadog",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
