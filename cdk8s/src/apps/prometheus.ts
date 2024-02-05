import { Chart, Size } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { LonghornVolume } from "../utils/longhorn.ts";

export function createPrometheusApp(chart: Chart) {
  new LonghornVolume(chart, "prometheus-volume", {
    storageClassName: "longhorn-hdd",
    storage: Size.gibibytes(50),
    namespace: "prometheus",
  });

  return new Application(chart, "prometheus-app", {
    metadata: {
      name: "prometheus",
      namespace: "argocd",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://prometheus-community.github.io/helm-charts",
        path: "/",
        targetRevision: "56.6.2",
        helm: {
          parameters: [
            {
              name: "grafana.persistence.library.existingClaim",
              value: "prometheus-volume",
            },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "prometheus",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
