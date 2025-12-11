import { Chart } from "cdk8s";
import {
  Postgresql,
  PostgresqlSpecPostgresqlVersion,
  PostgresqlSpecUsers,
} from "../../../generated/imports/acid.zalan.do";

export function createPeertubePostgreSQLDatabase(chart: Chart) {
  // The postgres-operator will automatically generate passwords and store them
  // in Kubernetes secrets with the naming pattern:
  // {username}.{clustername}.credentials.postgresql.acid.zalan.do

  // Create a PostgreSQL cluster specifically for PeerTube using the Zalando postgres-operator CRD
  return new Postgresql(chart, "peertube-postgresql", {
    metadata: {
      name: "peertube-postgresql",
      namespace: "peertube",
    },
    spec: {
      numberOfInstances: 1,
      teamId: "homelab",
      postgresql: {
        version: PostgresqlSpecPostgresqlVersion.VALUE_16,
        parameters: {
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
          log_statement: "none",
          log_min_duration_statement: "1000",
        },
      },
      volume: {
        size: "16Gi",
        storageClass: "zfs-ssd",
      },
      users: {
        peertube: [PostgresqlSpecUsers.SUPERUSER],
      },
      databases: {
        peertube: "peertube",
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
