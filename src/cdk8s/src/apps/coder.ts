import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
import { ServiceMonitor } from "../../imports/monitoring.coreos.com.ts";
import { IntOrString, KubeService } from "../../imports/k8s.ts";
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
  createIngress(chart, "coder-ingress", "coder", "coder", 80, ["coder"], true);

  // The postgres-operator will automatically create a secret with connection credentials
  // Secret name pattern: {username}.{clustername}.credentials.postgresql.acid.zalan.do
  // For our setup: coder.coder-postgresql.credentials.postgresql.acid.zalan.do
  // The secret contains keys: username, password, dbname

  // TODO: Generate Coder Helm types by running: bun run helm-types
  // Then add coder types to helm-parameters.ts
  //
  // Note: The Zalando postgres-operator does not provide a connection URL in its secrets,
  // only username, password, and dbname fields. We use an init container to build the URL
  // from these components and write it to a shared volume that Coder reads on startup.
  const coderValues: HelmValuesForChart<"coder"> = {
    coder: {
      // Init container to build the PostgreSQL connection URL from postgres-operator secret
      initContainers: [
        {
          name: "build-db-url",
          image: "busybox:latest",
          command: ["/bin/sh", "-c"],
          args: [
            `
            USER=$(cat /pg-secret/username)
            PASS=$(cat /pg-secret/password)
            DB=$(cat /pg-secret/dbname)
            echo "postgres://$USER:$PASS@coder-postgresql:5432/$DB?sslmode=disable" > /db-url/url
            echo "Database URL built successfully"
            `,
          ],
          volumeMounts: [
            {
              name: "pg-secret",
              mountPath: "/pg-secret",
              readOnly: true,
            },
            {
              name: "db-url",
              mountPath: "/db-url",
            },
          ],
        },
      ],
      // Mount the postgres-operator secret and shared volume for the URL
      volumes: [
        {
          name: "pg-secret",
          secret: {
            secretName: "coder.coder-postgresql.credentials.postgresql.acid.zalan.do",
          },
        },
        {
          name: "db-url",
          emptyDir: {},
        },
      ],
      // Additional volume mounts for main container to read the built URL
      volumeMounts: [
        {
          name: "db-url",
          mountPath: "/db-url",
          readOnly: true,
        },
      ],
      // Override the command to read DB URL from file before starting Coder
      command: ["/bin/sh", "-c"],
      commandArgs: ["export CODER_PG_CONNECTION_URL=$(cat /db-url/url) && exec /opt/coder server"],
      env: [
        {
          name: "CODER_ACCESS_URL",
          value: "https://coder.tailnet-1a49.ts.net",
        },
        // Enable GitHub OAuth with allow signups
        {
          name: "CODER_OAUTH2_GITHUB_ALLOW_SIGNUPS",
          value: "false",
        },
        {
          name: "CODER_OAUTH2_GITHUB_ALLOW_EVERYONE",
          value: "false",
        },
        {
          name: "CODER_PROMETHEUS_ENABLE",
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

  // Create headless service for Prometheus metrics
  // This is required for the ServiceMonitor to discover the Coder pods
  new KubeService(chart, "coder-prom-service", {
    metadata: {
      name: "coder-prom",
      namespace: "coder",
    },
    spec: {
      clusterIp: "None", // Headless service
      ports: [
        {
          name: "prom-http",
          port: 2112,
          protocol: "TCP",
          targetPort: IntOrString.fromNumber(2112),
        },
      ],
      selector: {
        "app.kubernetes.io/instance": "coder",
        "app.kubernetes.io/name": "coder",
      },
      type: "ClusterIP",
    },
  });

  // Create ServiceMonitor for Prometheus to scrape Coder metrics
  new ServiceMonitor(chart, "coder-service-monitor", {
    metadata: {
      name: "coder-service-monitor",
      namespace: "coder",
      labels: {
        release: "prometheus", // This label is required for the Prometheus operator to discover it
      },
    },
    spec: {
      endpoints: [
        {
          port: "prom-http",
          interval: "10s",
          scrapeTimeout: "10s",
        },
      ],
      namespaceSelector: {
        matchNames: ["coder"],
      },
      selector: {
        matchLabels: {
          "app.kubernetes.io/name": "coder",
        },
      },
    },
  });

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
