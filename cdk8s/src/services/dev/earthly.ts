import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Protocol,
  Secret,
  ServiceType,
} from "npm:cdk8s-plus-27";
import { Service } from "npm:cdk8s-plus-27";
import { Volume } from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";

export function createEarthlyDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "earthly", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "earthly-pvc", {});

  const token = new OnePasswordItem(chart, "earthly-onepassword", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/sbjrtou6h3f5w2uhj4uluywsre",
    },
    metadata: {
      name: "earthly-onepassword",
    },
  });

  const tokenSecret = Secret.fromSecretName(
    chart,
    `earthly-token-secret`,
    token.name,
  );

  const tokenEnvValue = EnvValue.fromSecretValue({
    secret: tokenSecret,
    key: "credential",
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "earthly/satellite:v0.8.3",
      portNumber: 8372,
      securityContext: {
        privileged: true,
        allowPrivilegeEscalation: true,
      },
      envVariables: {
        EARTHLY_ORG: EnvValue.fromValue("sjerred"),
        EARTHLY_TOKEN: tokenEnvValue,
        SATELLITE_NAME: EnvValue.fromValue("lamport"),
        SATELLITE_HOST: EnvValue.fromValue("100.87.206.22"),
        CACHE_SIZE_PCT: EnvValue.fromValue("10"),
        BUILDKIT_MAX_PARALLELISM: EnvValue.fromValue("24"),
      },
      volumeMounts: [
        {
          path: "/tmp/earthly",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "earthly-volume",
            localPathVolume.claim,
          ),
        },
      ],
    }),
  );

  new Service(chart, "earthly-service", {
    selector: deployment,
    ports: [{ port: 8372, nodePort: 8372, protocol: Protocol.TCP }],
    type: ServiceType.NODE_PORT,
  });
}
