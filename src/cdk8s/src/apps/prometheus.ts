import { Chart, Size } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { createIngress } from "../utils/tailscale.ts";
import { HDD_STORAGE_CLASS } from "../storageclasses.ts";

export function createPrometheusApp(chart: Chart) {
  createIngress(
    chart,
    "alertmanager-ingress",
    "prometheus",
    "prometheus-kube-prometheus-alertmanager",
    9093,
    ["alertmanager"],
    false,
  );

  createIngress(
    chart,
    "prometheus-ingress",
    "prometheus",
    "prometheus-kube-prometheus-prometheus",
    9090,
    ["prometheus"],
    false,
  );

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
            kubeProxy: {
              // disable components that fail
              // https://github.com/prometheus-operator/kube-prometheus/issues/718
              enabled: false,
            },
            kubeScheduler: {
              // disable components that fail
              // https://github.com/prometheus-operator/kube-prometheus/issues/718
              enabled: false,
            },
            kubeControllerManager: {
              // disable components that fail
              // https://github.com/prometheus-operator/kube-prometheus/issues/718
              enabled: false,
            },
            grafana: {
              persistence: {
                enabled: true,
                type: "pvc",
                storageClassName: HDD_STORAGE_CLASS,
                accessModes: ["ReadWriteOnce"],
                size: Size.gibibytes(32).asString(),
              },
              sidecar: {
                datasources: {
                  alertmanager: {
                    handleGrafanaManagedAlerts: true,
                  },
                },
                additionalDataSources: [
                  {
                    name: "loki",
                    editable: false,
                    type: "loki",
                    url: "http://loki-gateway.loki",
                    version: 1,
                  },
                ],
              },
            },
            alertmanager: {
              alertmanagerSpec: {
                externalUrl: "https://alertmanager.tailnet-1a49.ts.net",
                storage: {
                  volumeClaimTemplate: {
                    spec: {
                      storageClassName: HDD_STORAGE_CLASS,
                      accessModes: ["ReadWriteOnce"],
                      resources: {
                        requests: {
                          storage: Size.gibibytes(8).asString(),
                        },
                      },
                      selector: null,
                    },
                  },
                },
              },
            },
            prometheus: {
              prometheusSpec: {
                externalUrl: "https://prometheus.tailnet-1a49.ts.net",
                storageSpec: {
                  volumeClaimTemplate: {
                    spec: {
                      storageClassName: HDD_STORAGE_CLASS,
                      accessModes: ["ReadWriteOnce"],
                      resources: {
                        requests: {
                          storage: Size.gibibytes(32).asString(),
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
