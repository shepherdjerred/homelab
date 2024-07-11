import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Service,
  Volume,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../../utils/common.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import { Postgres } from "../common/postgres.ts";
import { Redis } from "../common/redis.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions/versions.ts";

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

  const redis = new Redis(chart, "bitmagnet-redis");

  const postgres = new Postgres(chart, "bitmagnet-postgres", {
    itemPath:
      "vaults/v64ocnykdqju4ui6j6pua56xw4/items/3fznikxjqt4szpz3ngdv462m6m",
    database: "bitmagnet",
    replicas: 0,
  });

  const deployment = new Deployment(chart, "bitmagnet", {
    replicas: 0,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "bitmagnet-pvc", {});

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/bitmagnet-io/bitmagnet:${
        versions["bitmagnet-io/bitmagnet"]
      }`,
      securityContext: {
        user: ROOT_UID,
        group: ROOT_GID,
        ensureNonRoot: false,
      },
      envVariables: {
        POSTGRES_HOST: EnvValue.fromValue(postgres.service.name),
        POSTGRES_PASSWORD: postgres.passwordEnvValue,
        REDIS_ADDR: EnvValue.fromValue(
          `${redis.service.name}:${redis.service.port}`,
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
            localPathVolume.claim,
          ),
        },
      ],
    }),
  );

  const service = new Service(chart, "bitmagnet-service", {
    selector: deployment,
    ports: [{ port: 3333 }],
  });

  new TailscaleIngress(chart, "bitmagnet-tailscale-ingress", {
    service,
    host: "bitmagnet",
  });
}
