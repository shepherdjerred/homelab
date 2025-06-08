import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";

export function createIntelGpuDevicePluginApp(chart: Chart) {
  new Application(chart, "intel-gpu-device-plugin-app", {
    metadata: {
      name: "intel-gpu-device-plugin",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/intel/helm-charts/tree/main/charts/gpu-device-plugin
        repoUrl: "https://intel.github.io/helm-charts/",
        chart: "intel-device-plugins-gpu",
        targetRevision: versions["intel-device-plugins-operator"],
        helm: {
          parameters: [
            { name: "sharedDevNum", value: "10" },
            { name: "nodeFeatureRule", value: "true" },
            { name: "resourceManager", value: "false" },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "gpu-device-plugin",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
