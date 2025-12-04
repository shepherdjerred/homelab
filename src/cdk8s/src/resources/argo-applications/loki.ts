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
      replicas: 1,
      persistence: {
        storageClass: SSD_STORAGE_CLASS,
        size: Size.gibibytes(64).asString(),
      },
    },
    // Disable scalable targets - they require object storage
    read: { replicas: 0 },
    write: { replicas: 0 },
    backend: { replicas: 0 },
    loki: {
      commonConfig: {
        replication_factor: 1,
      },
      auth_enabled: false,
      limits_config: {
        retention_period: "30d",
      },
      storage: {
        type: "filesystem",
      },
      schemaConfig: {
        configs: [
          {
            from: "2025-01-01",
            object_store: "filesystem",
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
    minio: {
      enabled: false,
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
