import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

export function createPrometheusApp(chart: Chart) {
  return new Application(chart, "prometheus-app", {
    metadata: {
      name: "prometheus",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/prometheus-community/helm-charts/
        repoUrl: "https://prometheus-community.github.io/helm-charts",
        chart: "kube-prometheus-stack",
        targetRevision: versions["kube-prometheus-stack"],
        helm: {
          valuesObject: {
            prometheus: {
              prometheusSpec: {
                volumeClaimTemplate: {
                  spec: {
                    storageClassName: "local-path",
                    accessModes: ["ReadWriteOnce"],
                    resources: {
                      requests: {
                        storage: "8Gi",
                      },
                    },
                  },
                  selector: {},
                },
              },
            },
          },
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "prometheus",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true", "ServerSideApply=true"],
      },
    },
  });
}
