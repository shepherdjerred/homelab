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
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import {
  ReplicationSource,
  ReplicationSourceSpecResticCopyMethod,
} from "../../imports/volsync.backube.ts";
import versions from "../versions.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";

export function createPokemonDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "pokemon", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "pokemon-pvc", {});

  //   const item = new OnePasswordItem(chart, "tailscale-auth-key-onepassword", {
  //     spec: {
  //       itemPath:
  //         "vaults/v64ocnykdqju4ui6j6pua56xw4/items/t5scpnlhnxvu25dneg6jdd7c7q",
  //     },
  //     metadata: {
  //       name: "tailscale-auth-key",
  //     },
  //   });

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

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/shepherdjerred/discord-plays-pokemon:latest`,
      envVariables: {
        APPLICATION_ID: EnvValue.fromValue("1094065369058131978"),
        SIZEW: EnvValue.fromValue("1920"),
        SIZEH: EnvValue.fromValue("1080"),
        REFRESH: EnvValue.fromValue("60"),
        PASSWD: EnvValue.fromValue("password"),
        BASIC_AUTH_PASSWORD: EnvValue.fromValue("password"),
        // TS_AUTH_KEY: EnvValue.fromSecretValue({
        //   secret: Secret.fromSecretName(
        //     chart,
        //     "tailscale-auth-key",
        //     item.name,
        //   ),
        //   key: "credential",
        // }),
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
