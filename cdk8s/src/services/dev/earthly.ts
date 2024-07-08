import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Service } from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Volume } from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import { withCommonProps } from "../../utils/common.ts";
import versions from "../../versions/versions.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";

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

  const ghToken = new OnePasswordItem(chart, "earthly-gh-onepassword", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/a5rmkj3pchbfaggkj6iaooma4q",
    },
    metadata: {
      name: "earthly-gh-onepassword",
    },
  });

  const ghTokenSecret = Secret.fromSecretName(
    chart,
    `earthly-gh-token-secret`,
    ghToken.name,
  );

  const ghTokenEnvValue = EnvValue.fromSecretValue({
    secret: ghTokenSecret,
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
        EARTHLY_GH_ORG: EnvValue.fromValue("shepherdjerred"),
        EARTHLY_GH_TOKEN: ghTokenEnvValue,
        RUNNER_GHA_ENABLED: EnvValue.fromValue("true"),
        SATELLITE_NAME: EnvValue.fromValue("lamport"),
        SATELLITE_HOST: EnvValue.fromValue("earthly.tailnet-1a49.ts.net"),
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

  const service = new Service(chart, "earthly-service", {
    selector: deployment,
    ports: [{ port: 8372 }],
  });

  new TailscaleIngress(chart, "earthly-tailscale-ingress", {
    service,
    host: "earthly",
    funnel: true,
  });
}
