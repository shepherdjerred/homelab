// Refactored Loki app using type-safe Helm parameters
// This demonstrates how to migrate from the old approach to the new type-safe approach

import { Chart, Size } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { createIngress } from "../utils/tailscale.ts";
import { SSD_STORAGE_CLASS } from "../storageclasses.ts";
import {
  createTypedApplication,
  HelmValuesForChart,
  createTypedHelmConfig,
} from "../types/helm/index.js";

/**
 * Create type-safe Loki configuration with full IntelliSense support
 */
function createLokiHelmValues(): HelmValuesForChart<"loki"> {
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
 * Create Loki app using the new type-safe approach
 * Compare this to the original loki.ts file to see the improvements
 */
export function createTypedLokiApp(chart: Chart) {
  // Create Tailscale ingress (same as before)
  createIngress(chart, "loki-ingress", "loki", "loki", 3100, ["loki"], false);

  // Get type-safe Loki configuration
  const lokiValues = createLokiHelmValues();

  // Create application using the typed helper - this provides:
  // 1. Full type safety for all Helm values
  // 2. IntelliSense/autocomplete for configuration options
  // 3. Compile-time validation that prevents typos
  // 4. Better refactoring support
  return createTypedApplication(
    chart,
    "loki-app",
    "loki", // This is type-checked against HelmChartName
    "loki",
    "https://grafana.github.io/helm-charts",
    lokiValues, // This is type-checked against LokiHelmValues
  );
}

/**
 * Alternative approach: Using the lower-level typed config helpers
 */
export function createLokiAppWithTypedConfig(chart: Chart) {
  createIngress(chart, "loki-ingress", "loki", "loki", 3100, ["loki"], false);

  const lokiValues = createLokiHelmValues();

  return new Application(chart, "loki-app", {
    metadata: {
      name: "loki",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://grafana.github.io/helm-charts",
        targetRevision: versions.loki,
        chart: "loki",
        // Use typed Helm config for type safety
        helm: createTypedHelmConfig("loki", {
          valuesObject: lokiValues,
        }),
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "loki",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}

/**
 * Comparison with the old approach:
 *
 * OLD WAY (from original loki.ts):
 * ```typescript
 * helm: {
 *   valuesObject: {
 *     deploymentMode: "SingleBinary", // No type checking
 *     singleBinary: {
 *       persistence: {
 *         storageClass: SSD_STORAGE_CLASS, // Could typo this
 *         size: Size.gibibytes(32).asString(),
 *       },
 *     },
 *     // ... rest of config - no IntelliSense, easy to make mistakes
 *   },
 * }
 * ```
 *
 * NEW WAY (this file):
 * ```typescript
 * const lokiValues: HelmValuesForChart<"loki"> = {
 *   deploymentMode: "SingleBinary", // Full type checking & IntelliSense
 *   singleBinary: {
 *     persistence: {
 *       storageClass: SSD_STORAGE_CLASS, // TypeScript validates this
 *       size: Size.gibibytes(32).asString(),
 *     },
 *   },
 *   // ... TypeScript provides autocomplete for all valid options
 * };
 *
 * helm: createTypedHelmConfig("loki", {
 *   valuesObject: lokiValues, // Type-checked against LokiHelmValues
 * })
 * ```
 *
 * Benefits:
 * 1. Full IntelliSense/autocomplete for all configuration options
 * 2. Compile-time validation prevents typos and invalid configurations
 * 3. Better refactoring support - rename operations work correctly
 * 4. Self-documenting code through TypeScript types
 * 5. IDE can show you all available configuration options
 * 6. Prevents runtime errors from invalid Helm values
 */
