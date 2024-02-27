import { Chart, Size } from "npm:cdk8s";
import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Protocol,
  Secret,
  Service,
  ServiceType,
  Volume,
} from "npm:cdk8s-plus-27";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { withCommonProps } from "../../utils/common.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import {
  ReplicationSource,
  ReplicationSourceSpecResticCopyMethod,
} from "../../../imports/volsync.backube.ts";

export function createMinecraftDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "minecraft", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "minecraft-pvc", {});

  const resticOnepasswordItem = new OnePasswordItem(
    chart,
    "minecraft-restic-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/qtttm5re4xqpaivyohzkpznwsy",
      },
      metadata: {
        name: "minecraft-restic-onepassword-item",
      },
    },
  );

  const resticSecret = Secret.fromSecretName(
    chart,
    "minecraft-restic-secret",
    resticOnepasswordItem.name,
  );

  new ReplicationSource(chart, "minecraft-replication-source", {
    spec: {
      sourcePvc: localPathVolume.claim.name,
      trigger: {
        schedule: "0 * * * *",
      },
      restic: {
        repository: resticSecret.name,
        copyMethod: ReplicationSourceSpecResticCopyMethod.DIRECT,
        pruneIntervalDays: 7,
        retain: {
          daily: 7,
          weekly: 4,
          monthly: 12,
        },
      },
    },
  });

  const item = new OnePasswordItem(chart, "curseforge-item", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/riztc65o7v6buzvsa4cfgul2uy",
    },
  });

  deployment.addContainer(withCommonProps({
    image: "itzg/minecraft-server",
    ports: [{ number: 25565, protocol: Protocol.TCP }],
    volumeMounts: [
      {
        path: "/data",
        volume: Volume.fromPersistentVolumeClaim(
          chart,
          "minecraft-volume",
          localPathVolume.claim,
        ),
      },
    ],
    resources: {
      memory: {
        limit: Size.gibibytes(12),
      },
    },
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    envVariables: {
      EULA: EnvValue.fromValue("true"),
      MEMORY: EnvValue.fromValue("12G"),
      MOD_PLATFORM: EnvValue.fromValue("AUTO_CURSEFORGE"),
      CF_API_KEY: EnvValue.fromSecretValue({
        secret: Secret.fromSecretName(
          chart,
          "minecraft-password-secret",
          item.name,
        ),
        key: "credential",
      }),
      CF_PAGE_URL: EnvValue.fromValue(
        "https://www.curseforge.com/minecraft/modpacks/all-the-mods-8",
      ),
      VERSION: EnvValue.fromValue("1.19.2"),
      ALLOW_FLIGHT: EnvValue.fromValue("true"),
      MOTD: EnvValue.fromValue("what's up guys"),
      DIFFICULTY: EnvValue.fromValue("hard"),
      ENABLE_WHITELIST: EnvValue.fromValue("true"),
      WHITELIST: EnvValue.fromValue(
        "RiotShielder,gexboy8,BubbaLeFett,lolopToaster,BillBuchness,Bill_Buchness",
      ),
      MAX_PLAYERS: EnvValue.fromValue("10"),
      FORCE_GAMEMODE: EnvValue.fromValue("true"),
      VIEW_DISTANCE: EnvValue.fromValue("20"),
      SERVER_NAME: EnvValue.fromValue("glitter boys"),
      ENABLE_ROLLING_LOGS: EnvValue.fromValue("true"),
      STOP_SERVER_ANNOUNCE_DELAY: EnvValue.fromValue("10"),
    },
  }));

  new Service(chart, "minecraft-game-service", {
    selector: deployment,
    ports: [{ port: 25565, nodePort: 25565, protocol: Protocol.TCP }],
    type: ServiceType.NODE_PORT,
  });
}
