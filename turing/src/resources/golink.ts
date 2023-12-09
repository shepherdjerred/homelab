import {
  Deployment,
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
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
    resources: {},
    volumeMounts: [
      {
        path: "/home/nonroot",
        volume: Volume.fromPersistentVolumeClaim(chart, "golink-volume", claim),
      },
    ],
  });
}
