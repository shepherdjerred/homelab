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

export function createMinecraftDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "minecraft", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "minecraft-pvc", {});

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
        limit: Size.gibibytes(8),
      },
    },
    envVariables: {
      EULA: EnvValue.fromValue("true"),
      MEMORY: EnvValue.fromValue("6G"),
      MOD_PLATFORM: EnvValue.fromValue("AUTO_CURSEFORGE"),
      CF_API_KEY: EnvValue.fromSecretValue({
        secret: Secret.fromSecretName(
          chart,
          "minecraft-password-secret",
          item.name,
        ),
        key: "password",
      }),
      CF_PAGE_URL: EnvValue.fromValue(
        "https://www.curseforge.com/minecraft/modpacks/all-the-mods-8",
      ),
      VERSION: EnvValue.fromValue("1.19.2"),
    },
  }));

  new Service(chart, "minecraft-game-service", {
    selector: deployment,
    ports: [{ port: 25525, nodePort: 25525, protocol: Protocol.UDP }],
    type: ServiceType.NODE_PORT,
  });
}
