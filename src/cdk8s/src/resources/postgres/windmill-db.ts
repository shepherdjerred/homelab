import { Chart } from "cdk8s";
import {
  Postgresql,
  PostgresqlSpecPostgresqlVersion,
  PostgresqlSpecUsers,
} from "../../../generated/imports/acid.zalan.do";

export function createWindmillPostgreSQLDatabase(chart: Chart) {
  // The postgres-operator will automatically generate passwords and store them
  // in Kubernetes secrets with the naming pattern:
  // {username}.{clustername}.credentials.postgresql.acid.zalan.do

  // Create a PostgreSQL cluster specifically for Windmill using the Zalando postgres-operator CRD
  return new Postgresql(chart, "windmill-postgresql", {
    metadata: {
      name: "windmill-postgresql",
      namespace: "windmill", // Same namespace as Windmill
    },
    spec: {
      numberOfInstances: 1, // Single node setup for homelab
      teamId: "homelab",
      postgresql: {
        version: PostgresqlSpecPostgresqlVersion.VALUE_16, // Latest stable PostgreSQL version supported
        parameters: {
          // PostgreSQL configuration optimized for Windmill
          max_connections: "100",
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
        size: "32Gi", // Adequate size for Windmill database
        storageClass: "zfs-ssd", // Using local storage available in the cluster
      },
      users: {
        windmill: [
          // Windmill works without SUPERUSER. It uses RLS policies on supported databases.
          // CREATEDB privilege is sufficient for normal operation.
          PostgresqlSpecUsers.CREATEDB,
        ],
      },
      databases: {
        windmill: "windmill", // Database owned by the windmill user
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
        pgHba: [
          // Allow connections from within the cluster
          "host windmill windmill all md5",
          "host replication standby all md5",
          "local all all trust",
          "host all all all md5",
        ],
        slots: {},
      },
    },
  });
}
