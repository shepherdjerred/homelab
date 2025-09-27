// APPROACH 3: Full Refactor - Configuration factory pattern with reusable configs
import { Chart, Size } from "cdk8s";
import { SSD_STORAGE_CLASS } from "../storageclasses.ts";
import {
  HelmValuesForChart,
  createTypedApplication,
  TypedHelmConfigFactory,
} from "../types/helm/index.js";

/**
 * Centralized, reusable Helm configurations with overrides support
 */
export class AppConfigFactory {
  /**
   * ✅ Create base Loki config with optional overrides
   */
  static createLokiConfig(
    overrides?: Partial<HelmValuesForChart<"loki">>,
  ): HelmValuesForChart<"loki"> {
    const baseConfig: HelmValuesForChart<"loki"> = {
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

    return { ...baseConfig, ...overrides };
  }

  /**
   * ✅ Create ArgoCD config with monitoring enabled by default
   */
  static createArgoCdConfig(
    domain: string = "argocd.tailnet-1a49.ts.net",
    overrides?: Partial<HelmValuesForChart<"argo-cd">>,
  ): HelmValuesForChart<"argo-cd"> {
    const monitoringConfig = {
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
          additionalLabels: {
            release: "prometheus",
          },
        },
      },
    };

    const baseConfig: HelmValuesForChart<"argo-cd"> = {
      global: {
        domain,
      },
      controller: monitoringConfig,
      dex: monitoringConfig,
      redis: {
        exporter: { enabled: true },
        ...monitoringConfig,
      },
      server: {
        metrics: {
          enabled: true,
          serviceMonitor: { enabled: true },
        },
      },
      applicationSet: monitoringConfig,
      notifications: monitoringConfig,
      repoServer: monitoringConfig,
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

    return { ...baseConfig, ...overrides };
  }

  /**
   * ✅ Create Cert Manager config
   */
  static createCertManagerConfig(
    overrides?: Partial<HelmValuesForChart<"cert-manager">>,
  ): HelmValuesForChart<"cert-manager"> {
    const baseConfig: HelmValuesForChart<"cert-manager"> = {
      installCRDs: true,
      prometheus: {
        enabled: true,
        servicemonitor: {
          enabled: true,
        },
      },
      webhook: {
        prometheus: {
          enabled: true,
          servicemonitor: {
            enabled: true,
          },
        },
      },
      cainjector: {
        prometheus: {
          enabled: true,
          servicemonitor: {
            enabled: true,
          },
        },
      },
    };

    return { ...baseConfig, ...overrides };
  }
}

/**
 * ✅ Type-safe app creation using factory pattern
 */
export class TypedAppFactory {
  /**
   * Create Loki app with optional config overrides
   */
  static createLokiApp(
    chart: Chart,
    configOverrides?: Partial<HelmValuesForChart<"loki">>,
  ) {
    const config = AppConfigFactory.createLokiConfig(configOverrides);

    return createTypedApplication(
      chart,
      "loki-app",
      "loki",
      "loki",
      "https://grafana.github.io/helm-charts",
      config,
    );
  }

  /**
   * Create ArgoCD app with optional domain and config overrides
   */
  static createArgoCdApp(
    chart: Chart,
    domain?: string,
    configOverrides?: Partial<HelmValuesForChart<"argo-cd">>,
  ) {
    const config = AppConfigFactory.createArgoCdConfig(domain, configOverrides);

    return createTypedApplication(
      chart,
      "argocd-app",
      "argo-cd",
      "argocd",
      "https://argoproj.github.io/argo-helm/",
      config,
    );
  }

  /**
   * Create Cert Manager app
   */
  static createCertManagerApp(
    chart: Chart,
    configOverrides?: Partial<HelmValuesForChart<"cert-manager">>,
  ) {
    const config = AppConfigFactory.createCertManagerConfig(configOverrides);

    return createTypedApplication(
      chart,
      "cert-manager-app",
      "cert-manager",
      "cert-manager",
      "https://charts.jetstack.io",
      config,
    );
  }

  /**
   * ✅ Generic app creator for any chart type
   */
  static createApp<TChart extends Parameters<typeof createTypedApplication>[2]>(
    chart: Chart,
    appName: string,
    chartName: TChart,
    namespace: string,
    repoUrl: string,
    values: HelmValuesForChart<TChart>,
    syncOptions?: string[],
  ) {
    return createTypedApplication(
      chart,
      appName,
      chartName,
      namespace,
      repoUrl,
      values,
    );
  }
}

/**
 * ✅ Example usage of the factory pattern
 */
export function createAllAppsWithFactory(chart: Chart) {
  // Simple creation with defaults
  const lokiApp = TypedAppFactory.createLokiApp(chart);

  // Creation with overrides
  const argoCdApp = TypedAppFactory.createArgoCdApp(
    chart,
    "argocd.my-domain.com", // Custom domain
    {
      // Override specific config
      configs: {
        cm: {
          "timeout.reconciliation": "120s", // Custom timeout
        },
      },
    },
  );

  // Advanced usage with custom configs
  const lokiAppCustom = TypedAppFactory.createLokiApp(chart, {
    // Override retention period
    loki: {
      limits_config: {
        retention_period: "180d", // 6 months instead of 90 days
      },
    },
    // Use larger storage
    minio: {
      persistence: {
        size: Size.gibibytes(128).asString(),
      },
    },
  });

  return { lokiApp, argoCdApp, lokiAppCustom };
}

/**
 * ✅ Environment-specific configurations
 */
export namespace EnvironmentConfigs {
  export const development = {
    loki: (): Partial<HelmValuesForChart<"loki">> => ({
      loki: {
        limits_config: {
          retention_period: "7d", // Short retention for dev
        },
      },
      minio: {
        persistence: {
          size: Size.gibibytes(8).asString(), // Smaller storage
        },
      },
    }),

    argocd: (): Partial<HelmValuesForChart<"argo-cd">> => ({
      configs: {
        cm: {
          "timeout.reconciliation": "30s", // Faster sync for dev
        },
      },
    }),
  };

  export const production = {
    loki: (): Partial<HelmValuesForChart<"loki">> => ({
      loki: {
        limits_config: {
          retention_period: "365d", // Long retention for prod
        },
      },
      minio: {
        persistence: {
          size: Size.gibibytes(256).asString(), // Larger storage
        },
      },
    }),

    argocd: (): Partial<HelmValuesForChart<"argo-cd">> => ({
      configs: {
        cm: {
          "timeout.reconciliation": "300s", // Conservative sync for prod
        },
      },
    }),
  };
}

/**
 * ✅ Create apps for specific environment
 */
export function createEnvironmentApps(
  chart: Chart,
  env: "development" | "production",
) {
  const envConfigs = EnvironmentConfigs[env];

  return {
    loki: TypedAppFactory.createLokiApp(chart, envConfigs.loki()),
    argocd: TypedAppFactory.createArgoCdApp(
      chart,
      undefined,
      envConfigs.argocd(),
    ),
  };
}
