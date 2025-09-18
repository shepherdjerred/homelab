import { Chart, ApiObject } from "cdk8s";

export function createGrafanaPostgreSQLDatabase(chart: Chart) {
  // The postgres-operator will automatically generate passwords and store them
  // in Kubernetes secrets. No need for 1Password in this case!

  // Create a PostgreSQL cluster specifically for Grafana using the Zalando postgres-operator CRD
  return new ApiObject(chart, "grafana-postgresql", {
    apiVersion: "postgresql.acid.zalan.do/v1",
    kind: "postgresql",
    metadata: {
      name: "grafana-postgresql",
      namespace: "prometheus", // Same namespace as Grafana
    },
    spec: {
      numberOfInstances: 1, // Single node setup for homelab
      teamId: "homelab",
      postgresql: {
        version: "16", // Latest stable PostgreSQL version supported
        parameters: {
          // PostgreSQL configuration optimized for Grafana
          max_connections: "200",
          shared_buffers: "256MB",
          effective_cache_size: "1GB",
          maintenance_work_mem: "64MB",
          checkpoint_completion_target: "0.9",
          wal_buffers: "16MB",
          default_statistics_target: "100",
          random_page_cost: "1.1",
          effective_io_concurrency: "200",
          work_mem: "4MB",
          min_wal_size: "1GB",
          max_wal_size: "4GB",
          log_statement: "none", // Reduce logging for performance
          log_min_duration_statement: "1000", // Log only slow queries
        },
      },
      volume: {
        size: "100Gi", // Adequate size for Grafana database
        storageClass: "zfs-hdd", // Using local storage available in the cluster
      },
      users: {
        grafana: [
          "createdb", // Allow Grafana user to create databases
        ],
      },
      databases: {
        grafana: "grafana", // Database owned by the grafana user
      },
      resources: {
        requests: {
          cpu: "100m",
          memory: "256Mi",
        },
        limits: {
          cpu: "500m",
          memory: "1Gi",
        },
      },
      patroni: {
        initdb: {
          encoding: "UTF8",
          locale: "en_US.utf8",
          "data-checksums": "true",
        },
        pg_hba: [
          // Allow connections from within the cluster
          "host grafana grafana all md5",
          "host replication standby all md5",
          "local all all trust",
          "host all all all md5",
        ],
        slots: {},
      },
    },
  });
}
