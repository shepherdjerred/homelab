import { Chart, Size } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { createIngress } from "../utils/tailscale.ts";
import { HDD_STORAGE_CLASS } from "../storageclasses.ts";

export function createLokiApp(chart: Chart) {
  createIngress(chart, "loki-ingress", "loki", "loki", 3100, ["loki"], false);

  new Application(chart, "loki-app", {
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
          valuesObject: {
            deploymentMode: "SingleBinary",
            singleBinary: {
              persistence: {
                storageClass: HDD_STORAGE_CLASS,
                size: Size.gibibytes(32).asString(),
              },
            },
            loki: {
              commonConfig: {
                replication_factor: 1,
              },
              auth_enabled: false,
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
            minio: {
              enabled: true,
              persistence: {
                storageClass: HDD_STORAGE_CLASS,
                size: Size.gibibytes(32).asString(),
              },
            },
          },
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
