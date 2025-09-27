// APPROACH 2: Using Helper Functions - Cleaner and more reusable
import { Chart, Size } from "cdk8s";
import { createIngress } from "../utils/tailscale.ts";
import { SSD_STORAGE_CLASS } from "../storageclasses.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import { createPrometheusMonitoring } from "../monitoring/prometheus.ts";
import {
  HelmValuesForChart,
  createTypedApplication,
  createTypedHelmConfig,
} from "../types/helm/index.js";

/**
 * Create type-safe Prometheus configuration
 * ✅ Full IntelliSense and validation for all options!
 */
function createPrometheusHelmValues(
  alertmanagerSecrets: OnePasswordItem,
  prometheusSecrets: OnePasswordItem,
): HelmValuesForChart<"kube-prometheus-stack"> {
  return {
    kubeProxy: {
      enabled: false, // TypeScript validates this is boolean
    },
    kubeScheduler: {
      enabled: false,
    },
    kubeControllerManager: {
      enabled: false,
    },
    grafana: {
      // Full type checking on all nested properties!
      "grafana.ini": {
        database: {
          type: "postgres",
          host: "grafana-postgresql:5432",
          name: "grafana",
          user: "grafana",
          ssl_mode: "disable",
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
      extraSecretMounts: [
        {
          name: "postgres-secret-mount",
          secretName:
            "grafana.grafana-postgresql.credentials.postgresql.acid.zalan.do",
          defaultMode: 0o440,
          mountPath: "/etc/secrets/postgres",
          readOnly: true,
        },
      ],
      persistence: {
        enabled: true,
        storageClassName: SSD_STORAGE_CLASS,
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
        retention: "365d",
        retentionSize: "120GB",
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
}

export function createTypedPrometheusApp(chart: Chart) {
  // Create ingresses (same as before)
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

  // Create secrets (same as before)
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

  // ✅ Get type-safe configuration
  const prometheusValues = createPrometheusHelmValues(
    alertmanagerSecrets,
    prometheusSecrets,
  );

  // ✅ APPROACH 2A: Use createTypedApplication helper (most convenient)
  return createTypedApplication(
    chart,
    "prometheus-app",
    "kube-prometheus-stack", // Type-checked chart name
    "prometheus",
    "https://prometheus-community.github.io/helm-charts",
    prometheusValues, // Type-checked values
  );
}

// ✅ APPROACH 2B: Alternative using lower-level helpers
export function createTypedPrometheusAppAlternative(chart: Chart) {
  // ... same setup code as above ...

  const alertmanagerSecrets = new OnePasswordItem(
    chart,
    "alertmanager-secrets-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/cki3qk5okk5b7xn3jmlpg74yka",
      },
      metadata: { name: "alertmanager-secrets", namespace: "prometheus" },
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
      metadata: { name: "prometheus-secrets", namespace: "prometheus" },
    },
  );

  const prometheusValues = createPrometheusHelmValues(
    alertmanagerSecrets,
    prometheusSecrets,
  );

  // Use typed helm config helper
  const application = new Application(chart, "prometheus-app", {
    metadata: { name: "prometheus" },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://prometheus-community.github.io/helm-charts",
        chart: "kube-prometheus-stack",
        targetRevision: "latest",
        // ✅ Use createTypedHelmConfig for type safety
        helm: createTypedHelmConfig("kube-prometheus-stack", {
          valuesObject: prometheusValues,
        }),
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

  return application;
}
