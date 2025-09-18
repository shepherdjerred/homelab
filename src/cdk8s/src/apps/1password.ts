import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";

export function createOnePasswordApp(chart: Chart) {
  // TODO: create the 1password secrets here

  new Application(chart, "1password-app", {
    metadata: {
      name: "1password",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/1Password/connect-helm-charts
        repoUrl: "https://1password.github.io/connect-helm-charts/",
        targetRevision: versions.connect,
        chart: "connect",
        helm: {
          parameters: [
            { name: "operator.autoRestart", value: "true" },
            { name: "operator.create", value: "true" },
            { name: "operator.pollingInterval", value: "60" },
            // Connect server credentials configuration
            {
              name: "connect.credentialsName",
              value: "op-credentials",
            },
            {
              name: "connect.credentialsKey",
              value: "1password-credentials.json",
            },
            // Operator token configuration
            {
              name: "operator.token.name",
              value: "onepassword-token",
            },
            { name: "operator.token.key", value: "token" },
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
