import { Chart } from "cdk8s";
import {
  Postgresql,
  PostgresqlSpecPostgresqlVersion,
  PostgresqlSpecUsers,
} from "../../../generated/imports/acid.zalan.do";

export function createPeerTubePostgreSQLDatabase(chart: Chart) {
  // The postgres-operator will automatically generate passwords and store them
  // in Kubernetes secrets. No need for 1Password in this case!

  // Create a PostgreSQL cluster specifically for PeerTube using the Zalando postgres-operator CRD
  return new Postgresql(chart, "peertube-postgresql", {
    metadata: {
      name: "peertube-postgresql",
      namespace: "peertube", // PeerTube namespace
    },
    spec: {
      numberOfInstances: 1, // Single node setup for homelab
      teamId: "homelab",
      postgresql: {
        version: PostgresqlSpecPostgresqlVersion.VALUE_16, // PostgreSQL 16 required by PeerTube
        parameters: {
          // PostgreSQL configuration optimized for video streaming and PeerTube
          max_connections: "300",
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
          max_worker_processes: "4",
          max_parallel_workers_per_gather: "2",
          max_parallel_workers: "4",
          max_parallel_maintenance_workers: "2",
          log_statement: "none", // Reduce logging for performance
          log_min_duration_statement: "1000", // Log only slow queries
        },
      },
      volume: {
        size: "32Gi", // Adequate size for PeerTube database
        storageClass: "zfs-ssd", // Using local SSD storage for better performance
      },
      users: {
        peertube: [
          PostgresqlSpecUsers.SUPERUSER, // PeerTube needs superuser for extensions
        ],
      },
      databases: {
        peertube: "peertube", // Database owned by the peertube user
      },
      resources: {
        requests: {
          cpu: "200m",
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
          "host peertube peertube all md5",
          "host replication standby all md5",
          "local all all trust",
          "host all all all md5",
        ],
        slots: {},
      },
    },
  });
}
