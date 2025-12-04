import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { SSD_STORAGE_CLASS } from "../../misc/storage-classes.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import { createPrometheusMonitoring } from "../monitoring/monitoring/prometheus.ts";
import { createSmartctlMonitoring } from "../monitoring/smartctl.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";
import { createNtpdMetricsMonitoring } from "../monitoring/ntpd-metrics.ts";
import { createNvmeMetricsMonitoring } from "../monitoring/nvme-metrics.ts";
import { createZfsSnapshotsMonitoring } from "../monitoring/zfs-snapshots.ts";
import { createZfsZpoolMonitoring } from "../monitoring/zfs-zpool.ts";
import { escapeAlertmanagerTemplate } from "../monitoring/monitoring/rules/shared.ts";
// import { HelmValuesForChart } from "../types/helm/index.js"; // Using 'any' for complex config

export async function createPrometheusApp(chart: Chart) {
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

  const alertmanagerSecrets = new OnePasswordItem(chart, "alertmanager-secrets-onepassword", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/cki3qk5okk5b7xn3jmlpg74yka",
    },
    metadata: {
      name: "alertmanager-secrets",
      namespace: "prometheus",
    },
  });

  const prometheusSecrets = new OnePasswordItem(chart, "grafana-secret-onepassword", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/42fn7x3zaemfenz35en27thw5u",
    },
    metadata: {
      name: "prometheus-secrets",
      namespace: "prometheus",
    },
  });

  createPrometheusMonitoring(chart);
  await createSmartctlMonitoring(chart);
  await createNtpdMetricsMonitoring(chart);
  await createNvmeMetricsMonitoring(chart);
  await createZfsSnapshotsMonitoring(chart);
  await createZfsZpoolMonitoring(chart);

  // Note: Some configurations bypass type checking due to incomplete generated types
  const prometheusValues: HelmValuesForChart<"kube-prometheus-stack"> = {
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
      // Database configuration via grafana.ini using file providers
      "grafana.ini": {
        database: {
          type: "postgres",
          host: "grafana-postgresql:5432",
          name: "grafana",
          user: "grafana",
          ssl_mode: "disable",
          // Password from mounted secret file
          password: "$__file{/etc/secrets/postgres/password}",
        },
        feature_toggles: {
          provisioning: true,
          kubernetesDashboards: true,
          grafanaAdvisor: true,
        },
      },
      imageRenderer: {
        enabled: true,
      },
      // Mount the auto-generated postgres-operator secret
      extraSecretMounts: [
        {
          name: "postgres-secret-mount",
          secretName: "grafana.grafana-postgresql.credentials.postgresql.acid.zalan.do",
          defaultMode: 0o440,
          mountPath: "/etc/secrets/postgres",
          readOnly: true,
        },
      ],
      persistence: {
        enabled: true,
        storageClassName: SSD_STORAGE_CLASS,
      },
      // Use Recreate strategy for single-replica deployment to avoid PVC deadlock
      // during rollouts. This ensures the old pod is terminated before the new one
      // starts, preventing volume contention on RWO (ReadWriteOnce) PVCs.
      // Note: Recreate strategy forbids rollingUpdate configuration
      deploymentStrategy: {
        type: "Recreate",
        rollingUpdate: null,
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
        {
          name: "tempo",
          editable: false,
          type: "tempo",
          url: "http://tempo.tempo.svc:3100",
          version: 1,
          jsonData: {
            tracesToLogsV2: {
              datasourceUid: "loki",
              spanStartTimeShift: "-1h",
              spanEndTimeShift: "1h",
              filterByTraceID: true,
              filterBySpanID: false,
            },
          },
        },
      ],
    },
    alertmanager: {
      alertmanagerSpec: {
        externalUrl: "https://alertmanager.tailnet-1a49.ts.net",
        storage: {
          volumeClaimTemplate: {
            spec: {
              storageClassName: SSD_STORAGE_CLASS,
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
            // Type assertion needed due to incomplete Helm chart types
            pagerduty_configs: [
              {
                routing_key_file: `/etc/alertmanager/secrets/${alertmanagerSecrets.name}/pagerduty_token`,
                // Use utility function to escape templates for Alertmanager processing
                description: escapeAlertmanagerTemplate("{{ range .Alerts }}{{ .Annotations.summary }}\n{{ end }}"),
                severity: "error",
                // details: escapeAlertmanagerTemplate(
                //   JSON.stringify(
                //     {
                //       firing: "{{ range .Alerts.Firing }}{{ . }}\n{{ end }}",
                //       resolved:
                //         "{{ range .Alerts.Resolved }}{{ . }}\n{{ end }}",
                //       num_firing: "{{ .Alerts.Firing | len }}",
                //       num_resolved: "{{ .Alerts.Resolved | len }}",
                //     },
                //     null,
                //     2,
                //   ),
                // ),
                // // Grafana has an image rendering feature
                // // let's see if we can use it here
                // images: [],
                // links: [],
                // component: "",
                // group: "",
                // class: "",
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
    // Configure node_exporter to enable textfile collector for all monitoring services
    // Collects metrics from: SMART, OS info, NTPD, NVMe, ZFS snapshots, ZFS zpools
    // NOTE: this is _not_ a real property?
    "prometheus-node-exporter": {
      extraArgs: ["--collector.textfile.directory=/host/var/lib/node_exporter/textfile_collector"],
      // Type assertion needed due to incomplete Helm chart types
      extraHostVolumeMounts: [
        {
          name: "textfile-collector",
          hostPath: "/var/lib/node_exporter/textfile_collector",
          mountPath: "/host/var/lib/node_exporter/textfile_collector",
          readOnly: true,
          mountPropagation: "HostToContainer",
        },
      ],
    },
    prometheus: {
      prometheusSpec: {
        externalUrl: "https://prometheus.tailnet-1a49.ts.net",
        retention: "180d", // Keep data for 6 months
        retentionSize: "120GB", // Safety limit - delete old data if storage exceeds this
        storageSpec: {
          volumeClaimTemplate: {
            spec: {
              storageClassName: SSD_STORAGE_CLASS,
              accessModes: ["ReadWriteOnce"],
              resources: {
                requests: {
                  storage: Size.gibibytes(128).asString(),
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
                targets: ["torvalds-homeassistant-service.torvalds:8123"],
              },
            ],
          },
        ],
      },
    },
  };

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
          valuesObject: prometheusValues,
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
