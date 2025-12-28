import { Chart, Size } from "cdk8s";
import { Cpu, Deployment, DeploymentStrategy, EnvValue, Service, Volume } from "cdk8s-plus-31";
import { withCommonProps } from "../../misc/common.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";
import versions from "../../versions.ts";

export function createClickHouseDeployment(chart: Chart) {
  // ClickHouse runs as clickhouse user (uid 101, gid 101)
  const UID = 101;
  const GID = 101;

  // Persistent volume for ClickHouse data
  // 64GB should be sufficient for homelab analytics
  const dataVolume = new ZfsSsdVolume(chart, "clickhouse-data", {
    storage: Size.gibibytes(64),
  });

  const deployment = new Deployment(chart, "clickhouse", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  deployment.addContainer(
    withCommonProps({
      name: "clickhouse",
      image: `clickhouse/clickhouse-server:${versions["clickhouse/clickhouse-server"]}`,
      ports: [
        { name: "http", number: 8123 },
        { name: "native", number: 9000 },
      ],
      envVariables: {
        // Database for Plausible events
        CLICKHOUSE_DB: EnvValue.fromValue("plausible_events_db"),
        CLICKHOUSE_USER: EnvValue.fromValue("plausible"),
        // Allow ClickHouse to manage access
        CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT: EnvValue.fromValue("1"),
      },
      securityContext: {
        user: UID,
        group: GID,
        ensureNonRoot: true,
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
        {
          path: "/var/lib/clickhouse",
          volume: Volume.fromPersistentVolumeClaim(chart, "clickhouse-data-volume", dataVolume.claim),
        },
      ],
      resources: {
        cpu: {
          request: Cpu.millis(250),
          limit: Cpu.millis(2000),
        },
        memory: {
          request: Size.gibibytes(1),
          limit: Size.gibibytes(4),
        },
      },
    }),
  );

  const service = new Service(chart, "clickhouse-service", {
    selector: deployment,
    metadata: {
      labels: { app: "clickhouse" },
    },
    ports: [
      { port: 8123, name: "http" },
      { port: 9000, name: "native" },
    ],
  });

  return { deployment, service };
}
