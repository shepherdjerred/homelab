import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { SSD_STORAGE_CLASS } from "../../misc/storage-classes.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";
export function createLokiApp(chart: Chart) {
  createIngress(chart, "loki-ingress", "loki", "loki", 3100, ["loki"], false);

  const lokiValues: HelmValuesForChart<"loki"> = {
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

  return new Application(chart, "loki-app", {
    metadata: {
      name: "loki",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/grafana/loki/tree/main/production/helm/loki
        repoUrl: "https://grafana.github.io/helm-charts",
        targetRevision: versions.loki,
        chart: "loki",
        helm: {
          valuesObject: lokiValues,
        },
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
