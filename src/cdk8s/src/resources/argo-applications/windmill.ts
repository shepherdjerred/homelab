import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { createWindmillPostgreSQLDatabase } from "../postgres/windmill-db.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";

export function createWindmillApp(chart: Chart) {
  // Create namespace with privileged pod security for Windmill script execution
  new Namespace(chart, "windmill-namespace", {
    metadata: {
      name: "windmill",
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
        "pod-security.kubernetes.io/audit": "privileged",
        "pod-security.kubernetes.io/warn": "privileged",
      },
    },
  });

  // Create PostgreSQL database for Windmill
  createWindmillPostgreSQLDatabase(chart);

  // Create Tailscale ingress for Windmill
  createIngress(chart, "windmill-ingress", "windmill", "windmill-app", 8000, ["windmill"], true);

  const windmillValues: HelmValuesForChart<"windmill"> = {
    // Disable built-in PostgreSQL - we use postgres-operator
    postgresql: {
      enabled: false,
    },
    // Disable Minio
    minio: {
      enabled: false,
    },
    windmill: {
      // Database configuration - placeholder, will be overridden by DATABASE_URL env var from init container
      databaseUrl: "postgres://windmill:password@windmill-postgresql:5432/windmill?sslmode=disable",
      // Base URL configuration for Windmill
      baseDomain: "windmill.tailnet-1a49.ts.net",
      baseProtocol: "https",
      // Reduce replicas for homelab setup
      appReplicas: 1,
      lspReplicas: 1,
      multiplayerReplicas: 0, // Disable multiplayer for CE
      // App configuration with database secret handling
      app: {
        resources: {
          requests: {
            memory: "512Mi",
          },
          limits: {
            memory: "2Gi",
          },
        },
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
              echo "postgres://$USER:$PASS@windmill-postgresql:5432/$DB?sslmode=disable" > /db-url/url
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
              secretName: "windmill.windmill-postgresql.credentials.postgresql.acid.zalan.do",
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
        // Set DATABASE_URL from the file created by init container
        extraEnv: [
          {
            name: "DATABASE_URL_FILE",
            value: "/db-url/url",
          },
        ],
      },
      // Worker group configuration
      workerGroups: [
        {
          name: "default",
          controller: "Deployment",
          replicas: 1,
          mode: "worker",
          resources: {
            requests: {
              memory: "512Mi",
            },
            limits: {
              memory: "2Gi",
            },
          },
          // Init container to build database URL from postgres-operator secret
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
                echo "postgres://$USER:$PASS@windmill-postgresql:5432/$DB?sslmode=disable" > /db-url/url
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
          // Mount postgres-operator secret and shared volume
          volumes: [
            {
              name: "pg-secret",
              secret: {
                secretName: "windmill.windmill-postgresql.credentials.postgresql.acid.zalan.do",
              },
            },
            {
              name: "db-url",
              emptyDir: {},
            },
          ],
          volumeMounts: [
            {
              name: "db-url",
              mountPath: "/db-url",
              readOnly: true,
            },
          ],
          // Set DATABASE_URL from the file
          extraEnv: [
            {
              name: "DATABASE_URL_FILE",
              value: "/db-url/url",
            },
          ],
        },
        {
          name: "native",
          controller: "Deployment",
          replicas: 1,
          mode: "worker",
          resources: {
            requests: {
              memory: "256Mi",
            },
            limits: {
              memory: "1Gi",
            },
          },
          // Init container for native worker
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
                echo "postgres://$USER:$PASS@windmill-postgresql:5432/$DB?sslmode=disable" > /db-url/url
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
          volumes: [
            {
              name: "pg-secret",
              secret: {
                secretName: "windmill.windmill-postgresql.credentials.postgresql.acid.zalan.do",
              },
            },
            {
              name: "db-url",
              emptyDir: {},
            },
          ],
          volumeMounts: [
            {
              name: "db-url",
              mountPath: "/db-url",
              readOnly: true,
            },
          ],
          // Set DATABASE_URL from the file
          extraEnv: [
            {
              name: "DATABASE_URL_FILE",
              value: "/db-url/url",
            },
          ],
        },
      ],
    },
  };

  return new Application(chart, "windmill-app", {
    metadata: {
      name: "windmill",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://windmill-labs.github.io/windmill-helm-charts/",
        chart: "windmill",
        targetRevision: versions.windmill,
        helm: {
          valuesObject: windmillValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "windmill",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
