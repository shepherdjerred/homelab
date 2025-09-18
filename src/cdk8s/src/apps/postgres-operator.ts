import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
import versions from "../versions.ts";

export function createPostgresOperatorApp(chart: Chart) {
  new Namespace(chart, "postgres-operator-namespace", {
    metadata: {
      name: "postgres-operator",
    },
  });

  return new Application(chart, "postgres-operator-app", {
    metadata: {
      name: "postgres-operator",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/zalando/postgres-operator
        repoUrl: "https://opensource.zalando.com/postgres-operator/charts/postgres-operator",
        chart: "postgres-operator",
        targetRevision: versions["postgres-operator"],
        helm: {
          valuesObject: {
            // Configuration for single-node cluster
            configGeneral: {
              // Enable only minimal required functionality
              enable_cross_namespace_secret: "true",
            },
            configKubernetes: {
              // Since we have a single-node cluster, reduce resource requirements
              cluster_labels: "application:spilo",
              cluster_name_label: "cluster-name",
              enable_cross_namespace_secret: "true",
            },
            configPatroni: {
              // Configure Patroni for single-node setup
              enable_patroni_failsafe_mode: "true",
            },
            // Resource configuration for single-node deployment
            resources: {
              limits: {
                cpu: "500m",
                memory: "500Mi",
              },
              requests: {
                cpu: "100m",
                memory: "250Mi",
              },
            },
          },
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "postgres-operator",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
