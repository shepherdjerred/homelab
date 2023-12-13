import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createOnePasswordApp(chart: Chart) {
  new Application(chart, "1password-app", {
    metadata: {
      name: "1password",
      namespace: "apps",
      labels: {
        "app.kubernetes.io/instance": "apps",
      },
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://1password.github.io/connect-helm-charts/",
        targetRevision: "1.14.0",
        chart: "connect",
        helm: {
          parameters: [
            { name: "operator.autoRestart", value: "true" },
            { name: "operator.create", value: "true" },
            { name: "operator.pollingInterval", value: "60" },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "1password",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
