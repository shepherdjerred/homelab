import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { HelmValuesForChart } from "../types/helm/index.js";

export function createIntelGpuDevicePluginApp(chart: Chart) {
  // ✅ Type-safe Intel GPU Device Plugin configuration with full IntelliSense
  const intelGpuValues: HelmValuesForChart<"intel-device-plugins-operator"> = {
    sharedDevNum: 10,
    nodeFeatureRule: true,
    resourceManager: false,
  };

  return new Application(chart, "intel-gpu-device-plugin-app", {
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
          valuesObject: intelGpuValues, // ✅ Now type-checked against InteldevicepluginsoperatorHelmValues
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
