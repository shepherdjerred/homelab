import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Protocol,
  Secret,
  ServiceType,
  Volume,
} from "npm:cdk8s-plus-27";
import { Service } from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { LonghornVolume } from "../utils/longhorn.ts";
import { withCommonProps } from "../utils/common.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

export function createPalworldDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "palworld", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolume = new LonghornVolume(chart, "palworld-longhorn", {
    storage: Size.gibibytes(10),
  });

  const item = new OnePasswordItem(chart, "palworld-item", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/yrlyezq2axgfkdfchtl7n7o6b4",
    },
  });

  deployment.addContainer(
    withCommonProps({
      image: "thijsvanloef/palworld-server-docker",
      ports: [{ number: 8211, protocol: Protocol.UDP }, {
        number: 27015,
        protocol: Protocol.UDP,
      }],
      securityContext: {
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
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
        PAL_EGG_DEFAULT_HATCHING_TIME: EnvValue.fromValue("1.0"),
        ENABLE_INVADER_ENEMY: EnvValue.fromValue("False"),
      },
      volumeMounts: [
        {
          path: "/palworld",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "palworld-volume",
            longhornVolume.claim,
          ),
        },
      ],
    }),
  );

  new Service(chart, "palworld-game-service", {
    selector: deployment,
    ports: [{ port: 8211, nodePort: 30000, protocol: Protocol.UDP }],
    type: ServiceType.NODE_PORT,
  });

  new Service(chart, "palworld-query-service", {
    selector: deployment,
    ports: [{ port: 27015, nodePort: 30001, protocol: Protocol.UDP }],
    type: ServiceType.NODE_PORT,
  });
}
