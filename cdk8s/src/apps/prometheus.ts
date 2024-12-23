import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

export function createPrometheusApp(chart: Chart) {
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
              },
            },
            alertmanager: {
              config: {
                receivers: [
                  {
                    name: "discord",
                    discord_configs: {
                      webhook_url_file:
                        "/etc/alertmanager/secrets/discord-alertmanager-webhook/password",
                    },
                  },
                ],
                route: {
                  group_by: ["namespace"],
                  group_wait: "30s",
                  group_interval: "5m",
                  repeat_interval: "12h",
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
