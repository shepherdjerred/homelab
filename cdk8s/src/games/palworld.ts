//       volumes:
//          - ./palworld:/palworld/

import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Protocol,
  ServiceType,
  Volume,
} from "npm:cdk8s-plus-27";
import { Service } from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { LonghornVolume } from "../utils/longhorn.ts";
import { withCommonProps } from "../utils/common.ts";

export function createPalworldDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "palworld", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolume = new LonghornVolume(chart, "palworld-longhorn", {
    storage: Size.gibibytes(10),
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
        // TODO
        SERVER_PASSWORD: EnvValue.fromValue("blohsh"),
        MULTITHREADING: EnvValue.fromValue("true"),
        RCON_ENABLED: EnvValue.fromValue("true"),
        RCON_PORT: EnvValue.fromValue("25575"),
        // TODO
        ADMIN_PASSWORD: EnvValue.fromValue("34wfg4g43g4"),
        COMMUNITY: EnvValue.fromValue("false"),
        SERVER_NAME: EnvValue.fromValue("glitter"),
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
