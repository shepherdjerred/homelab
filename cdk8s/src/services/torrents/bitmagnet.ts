import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { LonghornVolume } from "../../utils/longhorn.ts";
import { withCommonProps } from "../../utils/common.ts";
import { createTailscaleIngress } from "../../utils/tailscale.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";

export function createBitmagnetDeployment(chart: Chart) {
  const item = new OnePasswordItem(chart, "bitmagnet-postgres-onepassword", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/3fznikxjqt4szpz3ngdv462m6m",
    },
    metadata: {
      name: "bitmagnet-postgres-onepassword",
    },
  });

  const tmdbItem = new OnePasswordItem(chart, "tmdb-api-key-onepassword", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/z5a3jfyku5hvfxjzmvzm4ma3b4",
    },
    metadata: {
      name: "tmdb-api-key",
    },
  });

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
    }),
  );

  const redisService = redisDeployment.exposeViaService();

  const postgresDeployment = new Deployment(chart, "bitmagnet-postgres", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: 1000,
    },
  });

  const postgresPassword = EnvValue.fromSecretValue({
    secret: Secret.fromSecretName(
      chart,
      "bitmagnet-postgres-password",
      item.name,
    ),
    key: "password",
  });

  const postgresLonghornVolume = new LonghornVolume(
    chart,
    "bitmagnet-postgres-pvc",
    {
      storage: Size.gibibytes(10),
    },
  );

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
        user: 1000,
        group: 1000,
        // pg fails to start without this
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
        {
          path: "/var/lib/postgresql/data",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "bitmagnet-postgres-volume",
            postgresLonghornVolume.claim,
          ),
        },
      ],
    }),
  );

  const postgresService = postgresDeployment.exposeViaService();

  const deployment = new Deployment(chart, "bitmagnet", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolume = new LonghornVolume(chart, "bitmagnet-longhorn", {});

  deployment.addContainer(
    withCommonProps({
      image: "ghcr.io/bitmagnet-io/bitmagnet:latest",
      securityContext: {
        user: 0,
        group: 0,
        ensureNonRoot: false,
      },
      envVariables: {
        POSTGRES_HOST: EnvValue.fromValue(postgresService.name),
        POSTGRES_PASSWORD: postgresPassword,
        REDIS_ADDR: EnvValue.fromValue(
          `${redisService.name}:${redisService.port}`,
        ),
        TMDB_API_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "tmdb-api-key", tmdbItem.name),
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
            longhornVolume.claim,
          ),
        },
      ],
    }),
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
