import { Chart, Size } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { createIngress } from "../utils/tailscale.ts";
import { HDD_STORAGE_CLASS } from "../storageclasses.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import { createPrometheusMonitoring } from "../monitoring/prometheus.ts";

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

  const alertmanagerSecrets = new OnePasswordItem(
    chart,
    "alertmanager-secrets-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/cki3qk5okk5b7xn3jmlpg74yka",
      },
      metadata: {
        name: "alertmanager-secrets",
        namespace: "prometheus",
      },
    },
  );

  const prometheusSecrets = new OnePasswordItem(
    chart,
    "grafana-secret-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/42fn7x3zaemfenz35en27thw5u",
      },
      metadata: {
        name: "prometheus-secrets",
        namespace: "prometheus",
      },
    },
  );

  createPrometheusMonitoring(chart);

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
              // Database configuration via grafana.ini
              "grafana.ini": {
                database: {
                  type: "postgres",
                  host: "grafana-postgresql:5432",
                  name: "grafana",
                  user: "grafana",
                  ssl_mode: "disable",
                  // Password will be injected from secret via envFromSecret
                  password: "${GF_DATABASE_PASSWORD}",
                },
              },
              // Inject password from auto-generated secret
              env: {
                GF_DATABASE_PASSWORD: {
                  valueFrom: {
                    secretKeyRef: {
                      name: "grafana.grafana-postgresql.credentials.postgresql.acid.zalan.do",
                      key: "password",
                    },
                  },
                },
              },
              persistence: {
                enabled: false, // Disable file-based persistence since we're using PostgreSQL
              },
              sidecar: {
                datasources: {
                  alertmanager: {
                    handleGrafanaManagedAlerts: true,
                  },
                },
              },
              prune: true,
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
                secrets: [alertmanagerSecrets.name],
                logLevel: "debug",
              },
              config: {
                global: {
                  resolve_timeout: "5m",
                },
                inhibit_rules: [
                  {
                    source_matchers: ["severity = critical"],
                    target_matchers: ["severity =~ warning|info"],
                    equal: ["namespace", "alertname"],
                  },
                  {
                    source_matchers: ["severity = warning"],
                    target_matchers: ["severity = info"],
                    equal: ["namespace", "alertname"],
                  },
                  {
                    source_matchers: ["alertname = InfoInhibitor"],
                    target_matchers: ["severity = info"],
                    equal: ["namespace"],
                  },
                  {
                    target_matchers: ["alertname = InfoInhibitor"],
                  },
                ],
                templates: ["/etc/alertmanager/config/*.tmpl"],
                receivers: [
                  {
                    name: "pagerduty",
                    // https://prometheus.io/docs/alerting/latest/configuration/#pagerduty_config
                    pagerduty_configs: [
                      {
                        routing_key_file: `/etc/alertmanager/secrets/${alertmanagerSecrets.name}/pagerduty_token`,
                      },
                    ],
                  },
                ],
                route: {
                  group_by: ["namespace", "alertname"],
                  group_wait: "30s",
                  group_interval: "5m",
                  repeat_interval: "12h",
                  receiver: "pagerduty",
                  routes: [
                    {
                      receiver: "pagerduty",
                      matchers: ['alertname = "Watchdog"'],
                    },
                  ],
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
                secrets: [prometheusSecrets.name],
                additionalScrapeConfigs: [
                  {
                    job_name: "hass",
                    scrape_interval: "60s",
                    metrics_path: "/api/prometheus",
                    authorization: {
                      credentials_file: `/etc/prometheus/secrets/${prometheusSecrets.name}/HOMEASSISTANT_TOKEN`,
                    },
                    scheme: "http",
                    static_configs: [
                      {
                        targets: [
                          "torvalds-homeassistant-service.torvalds:8123",
                        ],
                      },
                    ],
                  },
                ],
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
