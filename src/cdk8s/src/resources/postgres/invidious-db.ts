import { Chart } from "cdk8s";
import {
  Postgresql,
  PostgresqlSpecPostgresqlVersion,
  PostgresqlSpecUsers,
} from "../../../generated/imports/acid.zalan.do";

export function createInvidiousPostgreSQLDatabase(chart: Chart) {
  // The postgres-operator will automatically generate passwords and store them
  // in Kubernetes secrets with the naming pattern:
  // {username}.{clustername}.credentials.postgresql.acid.zalan.do
  // For Invidious: kemal.invidious-postgresql.credentials.postgresql.acid.zalan.do

  // Create a PostgreSQL cluster specifically for Invidious using the Zalando postgres-operator CRD
  return new Postgresql(chart, "invidious-postgresql", {
    metadata: {
      name: "invidious-postgresql",
      namespace: "invidious", // Same namespace as Invidious
    },
    spec: {
      numberOfInstances: 1, // Single node setup for homelab
      teamId: "homelab",
      postgresql: {
        version: PostgresqlSpecPostgresqlVersion.VALUE_16, // Latest stable PostgreSQL version supported
        parameters: {
          // PostgreSQL configuration optimized for Invidious
          max_connections: "100",
          shared_buffers: "512MB",
          effective_cache_size: "2GB",
          maintenance_work_mem: "128MB",
          checkpoint_completion_target: "0.9",
          wal_buffers: "16MB",
          default_statistics_target: "100",
          random_page_cost: "1.1",
          effective_io_concurrency: "200",
          work_mem: "8MB",
          min_wal_size: "1GB",
          max_wal_size: "4GB",
          log_statement: "none", // Reduce logging for performance
          log_min_duration_statement: "1000", // Log only slow queries
        },
      },
      volume: {
        size: "32Gi", // Adequate size for Invidious database
        storageClass: "zfs-ssd", // Using local SSD storage
      },
      users: {
        kemal: [
          PostgresqlSpecUsers.SUPERUSER, // Invidious uses 'kemal' as the default user
        ],
      },
      databases: {
        invidious: "kemal", // Database owned by the kemal user
      },
      resources: {
        requests: {
          cpu: "100m",
          memory: "512Mi",
        },
        limits: {
          cpu: "1000m",
          memory: "2Gi",
        },
      },
      patroni: {
        initdb: {
          encoding: "UTF8",
          locale: "en_US.utf8",
          "data-checksums": "true",
        },
        pgHba: [
          // Allow connections from within the cluster
          "host invidious kemal all md5",
          "host replication standby all md5",
          "local all all trust",
          "host all all all md5",
        ],
        slots: {},
      },
    },
  });
}
