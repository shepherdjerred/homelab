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
import { Postgres } from "../common/postgres.ts";

export function createBitmagnetDeployment(chart: Chart) {
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

  const postgres = new Postgres(chart, "bitmagnet-postgres", {
    itemPath:
      "vaults/v64ocnykdqju4ui6j6pua56xw4/items/3fznikxjqt4szpz3ngdv462m6m",
    database: "bitmagnet",
    size: Size.gibibytes(10),
  });

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
        POSTGRES_HOST: EnvValue.fromValue(postgres.service.name),
        POSTGRES_PASSWORD: postgres.passwordEnvValue,
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
