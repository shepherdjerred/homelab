import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { LocalPathVolume } from "../utils/localPathVolume.ts";

export function createPrometheusApp(chart: Chart) {
  const volumeName = "prometheus-volume";

  new LocalPathVolume(chart, volumeName, {
    storageClassName: "local-path",
  });

  return new Application(chart, "prometheus-app", {
    metadata: {
      name: "prometheus",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://prometheus-community.github.io/helm-charts",
        chart: "kube-prometheus-stack",
        targetRevision: "56.6.2",
        helm: {
          parameters: [
            {
              name: "grafana.persistence.library.existingClaim",
              value: volumeName,
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
