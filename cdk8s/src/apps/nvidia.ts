import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createNvidiaApp(chart: Chart) {
  return new Application(chart, "nvidia-app", {
    metadata: {
      name: "nvidia",
      namespace: "argocd",
      labels: {
        "app.kubernetes.io/instance": "apps",
      },
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://nvidia.github.io/k8s-device-plugin",
        targetRevision: "0.14.3",
        chart: "nvdp",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "nvidia",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
