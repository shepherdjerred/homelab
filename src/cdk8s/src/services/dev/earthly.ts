import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Service,
  ServiceType,
} from "cdk8s-plus-31";
import { Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import { withCommonProps } from "../../utils/common.ts";
import versions from "../../versions.ts";

export function createEarthlyDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "earthly", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new ZfsSsdVolume(chart, "earthly-pvc", {
    storage: Size.tebibytes(1),
  });

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
        SATELLITE_NAME: EnvValue.fromValue("lamport"), // for the sake of not having to update all my Jenkinsfiles
        SATELLITE_HOST: EnvValue.fromValue("torvalds.tailnet-1a49.ts.net"),
        SATELLITE_PORT: EnvValue.fromValue("30000"),
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
    ports: [{ port: 8372, nodePort: 30000 }],
    type: ServiceType.NODE_PORT,
  });
}
