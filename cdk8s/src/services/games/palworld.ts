import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Protocol,
  Secret,
  ServiceType,
  Volume,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Service } from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Chart, Size } from "https://esm.sh/cdk8s@2.68.58";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { withCommonProps } from "../../utils/common.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import versions from "../../versions/versions.ts";

export function createPalworldDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "palworld", {
    replicas: 0,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "palworld-pvc", {});

  const item = new OnePasswordItem(chart, "palworld-item", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/yrlyezq2axgfkdfchtl7n7o6b4",
    },
  });

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/thijsvanloef/palworld-server-docker:${
        versions["thijsvanloef/palworld-server-docker"]
      }`,
      ports: [{ number: 8211, protocol: Protocol.UDP }, {
        number: 27015,
        protocol: Protocol.UDP,
      }],
      securityContext: {
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
      },
      resources: {
        memory: {
          limit: Size.gibibytes(20),
        },
      },
      envVariables: {
        PORT: EnvValue.fromValue("8211"),
        PLAYERS: EnvValue.fromValue("16"),
        SERVER_PASSWORD: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(
            chart,
            "palworld-password-secret",
            item.name,
          ),
          key: "password",
        }),
        MULTITHREADING: EnvValue.fromValue("true"),
        RCON_ENABLED: EnvValue.fromValue("true"),
        RCON_PORT: EnvValue.fromValue("27015"),
        ADMIN_PASSWORD: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(
            chart,
            "palworld-rcon-secret",
            item.name,
          ),
          key: "rcon-password",
        }),
        COMMUNITY: EnvValue.fromValue("false"),
        SERVER_NAME: EnvValue.fromValue("glitter"),
        SERVER_DESCRIPTION: EnvValue.fromValue("whats up guys"),
        DEATH_PENALTY: EnvValue.fromValue("ItemAndEquipment"),
        BACKUP_ENABLED: EnvValue.fromValue("false"),
        PAL_EGG_DEFAULT_HATCHING_TIME: EnvValue.fromValue("1.000000"),
        ENABLE_INVADER_ENEMY: EnvValue.fromValue("False"),
        PAL_STOMACH_DECREASE_RATE: EnvValue.fromValue("-1.000000"),
        UPDATE_ON_BOOT: EnvValue.fromValue("true"),
        BUILD_OBJECT_DETERIORATION_DAMAGE_RATE: EnvValue.fromValue("0"),
      },
      volumeMounts: [
        {
          path: "/palworld",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "palworld-volume",
            localPathVolume.claim,
          ),
        },
      ],
    }),
  );

  new Service(chart, "palworld-game-service", {
    selector: deployment,
    ports: [{ port: 8211, nodePort: 8211, protocol: Protocol.UDP }],
    type: ServiceType.NODE_PORT,
  });

  new Service(chart, "palworld-query-service", {
    selector: deployment,
    ports: [{ port: 27015, nodePort: 27015, protocol: Protocol.UDP }],
    type: ServiceType.NODE_PORT,
  });
}
