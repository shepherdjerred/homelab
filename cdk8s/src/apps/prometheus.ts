import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import { createIngress } from "../utils/tailscale.ts";

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

  const discordWebhook = new OnePasswordItem(
    chart,
    "discord-webhook-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/tgiqmxwr5ojlvltnkuefzipgqq",
      },
      metadata: {
        name: "discord-alertmanager-webhook",
        namespace: "prometheus",
      },
    },
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
                storageClassName: "local-path",
                accessModes: ["ReadWriteOnce"],
                size: "8Gi",
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
              config: {
                receivers: [
                  {
                    name: "discord",
                    // https://prometheus.io/docs/alerting/latest/configuration/#discord_config
                    discord_configs: [{
                      webhook_url:
                        // TODO: use a secret for this
                        "https://discord.com/api/webhooks/1320815049303916604/XIMrjirLmUPxZeHIp7qh0tZHttVLiDC7h-yz0K9j57ky1MQYY4SIzzAB_RxAmiAmh4YP",
                    }],
                  },
                ],
                route: {
                  receiver: "discord",
                  routes: [
                    {
                      receiver: "discord",
                      matchers: [
                        'alertname = "Watchdog"',
                      ],
                    },
                  ],
                },
              },
              alertmanagerSpec: {
                secrets: [
                  discordWebhook.name,
                ],
                externalUrl: "https://alertmanager.tailnet-1a49.ts.net",
                storage: {
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
            prometheus: {
              prometheusSpec: {
                externalUrl: "https://prometheus.tailnet-1a49.ts.net",
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
