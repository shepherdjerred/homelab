import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createIntelDevicePluginOperatorApp(chart: Chart) {
  new Application(chart, "intel-plugins-app", {
    metadata: {
      name: "intel-device-plugin-operator",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://intel.github.io/helm-charts/",
        chart: "intel-device-plugins-operator",
        targetRevision: "0.29.0",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "intel-device-plugin-operator",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
