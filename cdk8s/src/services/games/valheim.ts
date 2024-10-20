import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Protocol,
  Secret,
  ServiceType,
  Volume,
} from "cdk8s-plus";
import { Service } from "cdk8s-plus";
import { Chart } from "cdk8s";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { withCommonProps } from "../../utils/common.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import versions from "../../versions/versions.ts";

export function createValheimDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "valheim", {
    replicas: 0,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "valheim-pvc", {});

  const item = new OnePasswordItem(chart, "valheim-item", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/dqukjzskwmpt6gurjfaeuxau7i",
    },
  });

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/lloesche/valheim-server:${
        versions["lloesche/valheim-server"]
      }`,
      ports: [{ number: 2456, protocol: Protocol.UDP }, {
        number: 2457,
        protocol: Protocol.UDP,
      }],
      securityContext: {
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
      },
      envVariables: {
        SERVER_NAME: EnvValue.fromValue("Erkin's Cousin"),
        WORLD_NAME: EnvValue.fromValue("world"),
        SERVER_PASS: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(
            chart,
            "valheim-password-secret",
            item.name,
          ),
          key: "password",
        }),
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "valheim-volume",
            localPathVolume.claim,
          ),
        },
      ],
    }),
  );

  new Service(chart, "valheim-game-service", {
    selector: deployment,
    ports: [{ port: 2456, nodePort: 2456, protocol: Protocol.UDP }],
    type: ServiceType.NODE_PORT,
  });

  new Service(chart, "valheim-game-service-2", {
    selector: deployment,
    ports: [{ port: 2457, nodePort: 2457, protocol: Protocol.UDP }],
    type: ServiceType.NODE_PORT,
  });
}
