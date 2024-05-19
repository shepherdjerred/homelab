import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

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
        targetRevision: versions["connect"],
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
