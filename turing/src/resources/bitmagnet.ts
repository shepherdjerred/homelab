import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { createLonghornVolume } from "../utils/longhorn_volume.ts";
import { withCommonProps } from "../utils/common.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";

export function createBitmagnetDeployment(chart: Chart) {
  const redisDeployment = new Deployment(chart, "bitmagnet-redis", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  redisDeployment.addContainer(
    withCommonProps({
      image: "redis",
      portNumber: 6379,
      securityContext: {
        user: 999,
        group: 999,
      },
    })
  );

  const redisService = redisDeployment.exposeViaService();

  const postgresDeployment = new Deployment(chart, "bitmagnet-postgres", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      user: 1000,
      group: 1000,
      fsGroup: 1000,
    },
  });

  const postgresPassword = EnvValue.fromSecretValue({
    secret: Secret.fromSecretName(
      chart,
      "bitmagnet-postgres-password",
      "bitmagnet-postgres-password"
    ),
    key: "password",
  });

  const postgresClaim = createLonghornVolume(chart, "bitmagnet-postgres-pvc", {
    storage: Size.gibibytes(10),
  });

  postgresDeployment.addContainer(
    withCommonProps({
      image: "postgres",
      portNumber: 5432,
      envVariables: {
        POSTGRES_PASSWORD: postgresPassword,
        PGDATA: EnvValue.fromValue("/var/lib/postgresql/data/pgdata"),
        POSTGRES_DB: EnvValue.fromValue("bitmagnet"),
      },
      securityContext: {
        readOnlyRootFilesystem: false,
        user: 1000,
        group: 1000,
      },
      volumeMounts: [
        {
          path: "/var/lib/postgresql/data",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "bitmagnet-postgres-volume",
            postgresClaim
          ),
        },
      ],
    })
  );

  const postgresService = postgresDeployment.exposeViaService();

  const deployment = new Deployment(chart, "bitmagnet", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const claim = createLonghornVolume(chart, "bitmagnet-pvc");

  deployment.addContainer(
    withCommonProps({
      image: "ghcr.io/bitmagnet-io/bitmagnet:latest",
      envVariables: {
        POSTGRES_HOST: EnvValue.fromValue(postgresService.name),
        POSTGRES_PASSWORD: postgresPassword,
        REDIS_ADDR: EnvValue.fromValue(
          `${redisService.name}:${redisService.port}`
        ),
        TMDB_API_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "tmdb-api-key", "tmdb-api-key"),
          key: "api-key",
        }),
      },
      command: [
        "bitmagnet",
        "worker",
        "run",
        "--keys=http_server",
        "--keys=queue_server",
        "--keys=dht_crawler",
      ],
      portNumber: 3333,
      volumeMounts: [
        {
          path: "/app",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "bitmagnet-volume",
            claim
          ),
        },
      ],
    })
  );

  const service = new Service(chart, "bitmagnet-service", {
    selector: deployment,
    ports: [{ port: 3333 }],
  });

  createTailscaleIngress(chart, "bitmagnet-ingress", {
    service,
    host: "bitmagnet",
  });
}
