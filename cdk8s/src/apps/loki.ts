import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";

export function createLokiApp(chart: Chart) {
  new Application(chart, "loki-app", {
    metadata: {
      name: "loki",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/grafana/loki/tree/main/production/helm/loki
        repoUrl: "https://grafana.github.io/helm-charts",
        targetRevision: versions["loki"],
        chart: "loki",
        helm: {
          valuesObject: {
            deploymentMode: "SingleBinary",
            loki: {
              schemaConfig: {
                configs: [{
                  from: "2025-01-01",
                  object_store: "s3",
                  store: "tsdb",
                  schema: "v13",
                  index: {
                    prefix: "index_",
                    period: "24h",
                  },
                }],
              },
            },
            minio: {
              enabled: true,
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
