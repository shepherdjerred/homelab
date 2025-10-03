import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
import versions from "../versions.ts";
import { createIngress } from "../utils/tailscale.ts";
import { createCoderPostgreSQLDatabase } from "../services/postgres/coder-db.ts";
import type { HelmValuesForChart } from "../../helm-types/helm-parameters.ts";

export function createCoderApp(chart: Chart) {
  // Create namespace
  new Namespace(chart, "coder-namespace", {
    metadata: {
      name: "coder",
    },
  });

  // Create PostgreSQL database for Coder
  createCoderPostgreSQLDatabase(chart);

  // Create Tailscale ingress for Coder
  createIngress(chart, "coder-ingress", "coder", "coder", 8080, ["coder"], true);

  // The postgres-operator will automatically create a secret with connection credentials
  // Secret name pattern: {username}.{clustername}.credentials.postgresql.acid.zalan.do
  // For our setup: coder.coder-postgresql.credentials.postgresql.acid.zalan.do
  // The secret contains keys: username, password, dbname

  // TODO: Generate Coder Helm types by running: bun run helm-types
  // Then add coder types to helm-parameters.ts
  const coderValues: HelmValuesForChart<"coder"> = {
    coder: {
      env: [
        {
          name: "CODER_PG_CONNECTION_URL",
          // Build the connection string using init container or use the direct secret approach
          // Format: postgres://username:password@host:port/database?sslmode=disable
          value: "postgres://coder:$(POSTGRES_PASSWORD)@coder-postgresql:5432/coder?sslmode=disable",
        },
        {
          name: "POSTGRES_PASSWORD",
          valueFrom: {
            secretKeyRef: {
              name: "coder.coder-postgresql.credentials.postgresql.acid.zalan.do",
              key: "password",
            },
          },
        },
        {
          name: "CODER_ACCESS_URL",
          value: "https://coder.tail6831a.ts.net",
        },
        // Enable GitHub OAuth with allow signups
        {
          name: "CODER_OAUTH2_GITHUB_ALLOW_SIGNUPS",
          value: "true",
        },
        {
          name: "CODER_OAUTH2_GITHUB_ALLOW_EVERYONE",
          value: "true",
        },
      ],
      service: {
        type: "ClusterIP",
        sessionAffinity: "ClientIP",
      },
      resources: {
        requests: {
          cpu: "250m",
          memory: "512Mi",
        },
        limits: {
          cpu: "1000m",
          memory: "2Gi",
        },
      },
    },
  };

  return new Application(chart, "coder-app", {
    metadata: {
      name: "coder",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://helm.coder.com/v2",
        chart: "coder",
        targetRevision: versions.coder,
        helm: {
          valuesObject: coderValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "coder",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
