import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Protocol,
  Secret,
  Service,
  ServiceType,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import { withCommonProps } from "../../utils/common.ts";
import versions from "../../versions/versions.ts";

export function createLavalinkDeployment(
  chart: Chart,
  item: OnePasswordItem,
): Service {
  const deployment = new Deployment(chart, "lavalink", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  deployment.addContainer(withCommonProps({
    image: `ghcr.io/lavalink-devs/lavalink:${
      versions["lavalink-devs/lavalink"]
    }`,
    securityContext: {
      user: 1000,
      group: 1000,
      readOnlyRootFilesystem: false,
    },
    ports: [
      {
        name: "port-2333",
        number: 2333,
        protocol: Protocol.TCP,
      },
      {
        name: "port-80",
        number: 80,
        protocol: Protocol.TCP,
      },
      {
        name: "port-443",
        number: 443,
        protocol: Protocol.TCP,
      },
    ],
    envVariables: {
      SERVER_PORT: EnvValue.fromValue("2333"),
      LAVALINK_SERVER_SOURCES_YOUTUBE: EnvValue.fromValue("true"),
      LAVALINK_SERVER_PASSWORD: EnvValue.fromSecretValue({
        secret: Secret.fromSecretName(
          chart,
          "lavalink-server-password",
          item.name,
        ),
        key: "password",
      }),
    },
  }));

  return deployment.exposeViaService({
    ports: [{
      port: 2333,
    }],
    serviceType: ServiceType.CLUSTER_IP,
  });
}
