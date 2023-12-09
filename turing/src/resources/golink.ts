import {
  Deployment,
  EnvValue,
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  Secret,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";

export function createGolinkDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "golink", {
    replicas: 1,
  });

  const claim = new PersistentVolumeClaim(chart, "Claim", {
    storage: Size.gibibytes(2),
    storageClassName: "longhorn",
    accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
  });

  deployment.addContainer({
    image: "ghcr.io/tailscale/golink:main",
    portNumber: 8080,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    envVariables: {
      TS_AUTH_KEY: EnvValue.fromSecretValue({
        secret: Secret.fromSecretName(
          chart,
          "tailscale-auth-key",
          "tailscale-auth-key"
        ),
        key: "credential",
      }),
    },
    resources: {},
    volumeMounts: [
      {
        path: "/home/nonroot",
        volume: Volume.fromPersistentVolumeClaim(chart, "golink-volume", claim),
      },
    ],
  });
}
