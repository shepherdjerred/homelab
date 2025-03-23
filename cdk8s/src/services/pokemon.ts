import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Service,
  Volume,
} from "cdk8s-plus";
import { Chart } from "cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

export function createPokemonDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "pokemon", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "pokemon-pvc", {});

  //   const resticOnepasswordItem = new OnePasswordItem(
  //     chart,
  //     "golink-restic-onepassword",
  //     {
  //       spec: {
  //         itemPath:
  //           "vaults/v64ocnykdqju4ui6j6pua56xw4/items/55dd4k7uxlbtayhzxkxfxu7aqm",
  //       },
  //       metadata: {
  //         name: "golink-restic-onepassword-item",
  //       },
  //     },
  //   );

  //   new ReplicationSource(chart, "golink-replication-source", {
  //     spec: {
  //       sourcePvc: localPathVolume.claim.name,
  //       trigger: {
  //         schedule: "*/15 * * * *",
  //       },
  //       restic: {
  //         repository: resticOnepasswordItem.name,
  //         copyMethod: ReplicationSourceSpecResticCopyMethod.DIRECT,
  //         pruneIntervalDays: 7,
  //         retain: {
  //           daily: 7,
  //           weekly: 4,
  //           monthly: 12,
  //         },
  //         // match up with the UID/GID of the container
  //         // https://volsync.readthedocs.io/en/stable/usage/permissionmodel.html#mover-s-security-context
  //         moverSecurityContext: {
  //           runAsUser: UID,
  //           runAsGroup: GID,
  //         },
  //       },
  //     },
  //   });

  const item = new OnePasswordItem(chart, "pokemon-config", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/hwyhh64dyu3s7w37q7oj7r4qn4",
    },
  });

  const secret = Secret.fromSecretName(
    chart,
    "pokemon-config-secret",
    item.name,
  );

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/shepherdjerred/discord-plays-pokemon:latest`,
      envVariables: {
        SIZEW: EnvValue.fromValue("1920"),
        SIZEH: EnvValue.fromValue("1080"),
        REFRESH: EnvValue.fromValue("60"),
        PASSWD: EnvValue.fromValue("password"),
        BASIC_AUTH_PASSWORD: EnvValue.fromValue("password"),
      },
      volumeMounts: [
        {
          path: "/home/user/Downloads",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "pokemon-pvc",
            localPathVolume.claim,
          ),
        },
        {
          path: "/home/user/packages/backend/config.toml",
          subPath: "config.toml",
          volume: Volume.fromSecret(chart, "pokemon-config-volume", secret, {
            items: {
              "config.toml": {
                path: "config.toml",
              },
            },
          }),
        },
      ],
    }),
  );

  const selkiesService = new Service(chart, "selkies-service", {
    selector: deployment,
    ports: [{ port: 8080 }],
  });

  new TailscaleIngress(chart, "selkies-tailscale-ingress", {
    service: selkiesService,
    host: "pokebot-selkies",
  });

  const uiService = new Service(chart, "ui-service", {
    selector: deployment,
    ports: [{ port: 8081 }],
  });

  new TailscaleIngress(chart, "ui-tailscale-ingress", {
    service: uiService,
    host: "pokebot",
    funnel: true,
  });
}
