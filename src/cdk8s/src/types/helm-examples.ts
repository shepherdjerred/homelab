// Examples demonstrating type-safe Helm parameter usage
// This file shows how to use the conditional types for type-safe Helm configurations

import { Chart, Size } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import {
  HelmChartName,
  HelmValuesForChart,
  createTypedHelmConfig,
  createTypedApplicationSource,
  createHelmApplication,
  isValidChartName,
  validateChartName,
} from "./helm-parameters.js";
import versions from "../versions.ts";
import { SSD_STORAGE_CLASS } from "../storageclasses.ts";

/**
 * Example 1: Type-safe Loki configuration with full IntelliSense
 */
export function createTypedLokiConfig(): HelmValuesForChart<"loki"> {
  // TypeScript will provide full autocomplete for all loki-specific options
  return {
    deploymentMode: "SingleBinary",
    singleBinary: {
      persistence: {
        storageClass: SSD_STORAGE_CLASS,
        size: Size.gibibytes(32).asString(),
      },
    },
    loki: {
      commonConfig: {
        replication_factor: 1,
      },
      auth_enabled: false,
      limits_config: {
        retention_period: "90d",
      },
      schemaConfig: {
        configs: [
          {
            from: "2025-01-01",
            object_store: "s3",
            store: "tsdb",
            schema: "v13",
            index: {
              prefix: "index_",
              period: "24h",
            },
          },
        ],
      },
    },
    compactor: {
      enabled: true,
      retention_enabled: true,
      working_directory: "/var/loki/compactor",
      compaction_interval: "10m",
      retention_delete_delay: "2h",
    },
    minio: {
      enabled: true,
      persistence: {
        storageClass: SSD_STORAGE_CLASS,
        size: Size.gibibytes(64).asString(),
      },
    },
  };
}

/**
 * Example 2: Type-safe ArgoCD configuration with conditional typing
 */
export function createTypedArgoCdConfig(): HelmValuesForChart<"argo-cd"> {
  // TypeScript ensures only valid argo-cd options are used
  return {
    global: {
      domain: "argocd.tailnet-1a49.ts.net",
    },
    controller: {
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
          additionalLabels: {
            release: "prometheus",
          },
        },
      },
    },
    dex: {
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
          additionalLabels: {
            release: "prometheus",
          },
        },
      },
    },
    server: {
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
        },
      },
    },
    configs: {
      cm: {
        "exec.enabled": true,
        "timeout.reconciliation": "60s",
        "statusbadge.enabled": true,
        "accounts.jenkins": "apiKey",
        "accounts.jenkins.enabled": true,
      },
      rbac: {
        "policy.csv": "g, jenkins, role:admin",
      },
    },
  };
}

/**
 * Example 3: Generic function that works with any chart type
 */
export function createTypedApplication<TChart extends HelmChartName>(
  chart: Chart,
  appName: string,
  chartName: TChart,
  namespace: string,
  repoUrl: string,
  values: HelmValuesForChart<TChart>,
): Application {
  const targetRevision = versions[chartName] || "latest";

  return new Application(chart, appName, {
    metadata: {
      name: appName,
    },
    spec: {
      project: "default",
      source: createTypedApplicationSource(chartName, {
        repoUrl,
        targetRevision,
        helm: createTypedHelmConfig(chartName, {
          valuesObject: values,
        }),
      }),
      destination: {
        server: "https://kubernetes.default.svc",
        namespace,
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}

/**
 * Example 4: Using the helper functions for type safety
 */
export function exampleWithHelpers(chart: Chart) {
  // Example with strongly typed Loki application
  const lokiValues = createTypedLokiConfig();
  const lokiApp = createTypedApplication(
    chart,
    "loki-app",
    "loki",
    "loki",
    "https://grafana.github.io/helm-charts",
    lokiValues,
  );

  // Example with strongly typed ArgoCD application
  const argoCdValues = createTypedArgoCdConfig();
  const argoCdApp = createTypedApplication(
    chart,
    "argocd-app",
    "argo-cd",
    "argocd",
    "https://argoproj.github.io/argo-helm/",
    argoCdValues,
  );

  return { lokiApp, argoCdApp };
}

/**
 * Example 5: Runtime validation and type guarding
 */
export function createApplicationWithValidation(
  chart: Chart,
  appName: string,
  chartName: string,
  values: any,
) {
  // Runtime validation
  if (!isValidChartName(chartName)) {
    throw new Error(`Invalid chart name: ${chartName}`);
  }

  // TypeScript now knows chartName is a valid HelmChartName
  return createHelmApplication(
    chartName, // TypeScript infers the correct type here
    values as HelmValuesForChart<typeof chartName>,
    "https://example.com",
    "1.0.0",
  );
}

/**
 * Example 6: Dynamic chart selection with type safety
 */
export function createDynamicApplication<TChart extends HelmChartName>(
  chart: Chart,
  appName: string,
  chartName: TChart,
  repoUrl: string,
  valuesFactory: () => HelmValuesForChart<TChart>,
) {
  const values = valuesFactory();

  // Validate at runtime that chart name matches
  if (!validateChartName(chartName, chartName)) {
    throw new Error(`Chart name validation failed: ${chartName}`);
  }

  return createTypedApplication(
    chart,
    appName,
    chartName,
    `${chartName}-namespace`,
    repoUrl,
    values,
  );
}

/**
 * Example 7: Type-safe configuration factory pattern
 */
export class TypedHelmConfigFactory {
  static forLoki(
    overrides?: Partial<HelmValuesForChart<"loki">>,
  ): HelmValuesForChart<"loki"> {
    const baseConfig = createTypedLokiConfig();
    return { ...baseConfig, ...overrides };
  }

  static forArgoCD(
    overrides?: Partial<HelmValuesForChart<"argo-cd">>,
  ): HelmValuesForChart<"argo-cd"> {
    const baseConfig = createTypedArgoCdConfig();
    return { ...baseConfig, ...overrides };
  }

  static forPrometheus(
    overrides?: Partial<HelmValuesForChart<"kube-prometheus-stack">>,
  ): HelmValuesForChart<"kube-prometheus-stack"> {
    return {
      kubeProxy: { enabled: false },
      kubeScheduler: { enabled: false },
      kubeControllerManager: { enabled: false },
      ...overrides,
    };
  }
}
