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
        targetRevision: "vg0.29.0",
        chart: "device-plugin-operator",
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
