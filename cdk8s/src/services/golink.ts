import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { LonghornVolume } from "../utils/longhorn.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

export function createGolinkDeployment(chart: Chart) {
  const UID = 65532;
  const GID = 65532;

  const deployment = new Deployment(chart, "golink", {
    replicas: 1,
    securityContext: {
      fsGroup: GID,
    },
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolume = new LonghornVolume(chart, "golink-pvc-longhorn", {});

  const item = new OnePasswordItem(chart, "tailscale-auth-key-onepassword", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/t5scpnlhnxvu25dneg6jdd7c7q",
    },
    metadata: {
      name: "tailscale-auth-key",
    },
  });

  deployment.addContainer(
    withCommonProps({
      image: "ghcr.io/tailscale/golink:main",
      envVariables: {
        TS_AUTH_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(
            chart,
            "tailscale-auth-key",
            item.name,
          ),
          key: "credential",
        }),
      },
      securityContext: {
        user: UID,
        group: GID,
      },
      volumeMounts: [
        {
          path: "/home/nonroot",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "golink-volume",
            longhornVolume.claim,
          ),
        },
      ],
    }),
  );
}
