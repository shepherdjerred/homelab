import { Chart } from "cdk8s";
import {
  Postgresql,
  PostgresqlSpecPostgresqlVersion,
  PostgresqlSpecUsers,
} from "../../../generated/imports/acid.zalan.do";

export function createGitlabPostgreSQLDatabase(chart: Chart) {
  // The postgres-operator will automatically generate passwords and store them
  // in Kubernetes secrets with the naming pattern:
  // {username}.{clustername}.credentials.postgresql.acid.zalan.do

  // Create a PostgreSQL cluster specifically for GitLab using the Zalando postgres-operator CRD
  return new Postgresql(chart, "gitlab-postgresql", {
    metadata: {
      name: "gitlab-postgresql",
      namespace: "gitlab", // Same namespace as GitLab
    },
    spec: {
      numberOfInstances: 1, // Single node setup for homelab
      teamId: "homelab",
      postgresql: {
        version: PostgresqlSpecPostgresqlVersion.VALUE_16, // Latest stable PostgreSQL version supported
        parameters: {
          // PostgreSQL configuration optimized for GitLab
          // GitLab recommends specific settings for production
          max_connections: "200",
          shared_buffers: "512MB",
          effective_cache_size: "2GB",
          maintenance_work_mem: "128MB",
          checkpoint_completion_target: "0.9",
          wal_buffers: "16MB",
          default_statistics_target: "100",
          random_page_cost: "1.1",
          effective_io_concurrency: "200",
          work_mem: "8MB",
          min_wal_size: "2GB",
          max_wal_size: "8GB",
          log_statement: "none", // Reduce logging for performance
          log_min_duration_statement: "1000", // Log only slow queries
        },
      },
      volume: {
        size: "64Gi", // GitLab database can grow large with many repos/issues
        storageClass: "zfs-ssd", // Using local storage available in the cluster
      },
      users: {
        gitlab: [
          PostgresqlSpecUsers.SUPERUSER, // GitLab needs superuser for database migrations
          PostgresqlSpecUsers.CREATEDB,
        ],
      },
      databases: {
        gitlabhq_production: "gitlab", // Database owned by the gitlab user
      },
      resources: {
        requests: {
          cpu: "250m",
          memory: "512Mi",
        },
        limits: {
          cpu: "2000m",
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
          "host gitlabhq_production gitlab all md5",
          "host replication standby all md5",
          "local all all trust",
          "host all all all md5",
        ],
        slots: {},
      },
    },
  });
}
