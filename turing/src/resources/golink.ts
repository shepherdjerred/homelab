import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { createLonghornVolume } from "../utils/longhorn_volume.ts";
import { withCommonProps } from "../utils/common.ts";

export function createGolinkDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "golink", {
    replicas: 1,
    securityContext: {
      fsGroup: 65532,
    },
    strategy: DeploymentStrategy.recreate(),
  });

  const claim = createLonghornVolume(chart, "golink-pvc");

  deployment.addContainer(
    withCommonProps({
      image: "ghcr.io/tailscale/golink:main",
      envVariables: {
        TS_AUTH_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(
            chart,
            "tailscale-auth-key",
            "tailscale-auth-key",
          ),
          key: "credential",
        }),
      },
      securityContext: {
        user: 65532,
        group: 65532,
      },
      volumeMounts: [
        {
          path: "/home/nonroot",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "golink-volume",
            claim,
          ),
        },
      ],
    }),
  );
}
