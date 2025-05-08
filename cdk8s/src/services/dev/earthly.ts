import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  ServiceType,
} from "cdk8s-plus";
import { Service } from "cdk8s-plus";
import { Volume } from "cdk8s-plus";
import { Chart } from "cdk8s";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import { withCommonProps } from "../../utils/common.ts";
import versions from "../../versions.ts";

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
    withCommonProps({
      image: `earthly/satellite:${versions["earthly/satellite"]}`,
      portNumber: 8372,
      securityContext: {
        privileged: true,
        allowPrivilegeEscalation: true,
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
      },
      envVariables: {
        EARTHLY_ORG: EnvValue.fromValue("sjerred"),
        EARTHLY_TOKEN: tokenEnvValue,
        SATELLITE_NAME: EnvValue.fromValue("torvalds"),
        SATELLITE_HOST: EnvValue.fromValue("torvalds.tailnet-1a49.ts.net"),
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

  // TODO
  // new Service(chart, "earthly-service", {
  //   selector: deployment,
  //   ports: [{ port: 8372, nodePort: 8372 }],
  //   type: ServiceType.NODE_PORT,
  // });
}
