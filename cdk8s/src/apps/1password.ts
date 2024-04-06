import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.json" with { type: "json" };

export function createOnePasswordApp(chart: Chart) {
  new Application(chart, "1password-app", {
    metadata: {
      name: "1password",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/1Password/connect-helm-charts
        repoUrl: "https://1password.github.io/connect-helm-charts/",
        targetRevision:
          versions["https://1password.github.io/connect-helm-charts/"],
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
