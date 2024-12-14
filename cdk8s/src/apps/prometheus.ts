import { Chart } from "cdk8s";
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
            grafana: {
              persistence: {
                enabled: true,
                type: "pvc",
                storageClassName: "local-path",
                accessModes: ["ReadWriteOnce"],
                size: "8Gi",
              },
            },
            prometheus: {
              prometheusSpec: {
                storageSpec: {
                  volumeClaimTemplate: {
                    spec: {
                      storageClassName: "local-path",
                      accessModes: ["ReadWriteOnce"],
                      resources: {
                        requests: {
                          storage: "8Gi",
                        },
                      },
                      selector: null,
                    },
                  },
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
