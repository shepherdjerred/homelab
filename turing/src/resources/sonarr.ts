import {
  Deployment,
  Ingress,
  IngressBackend,
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  PersistentVolumeMode,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch, Size } from "npm:cdk8s";

export function createSonarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "sonarr", {
    replicas: 1,
    securityContext: {
      fsGroup: 1000,
      user: 0,
      group: 0,
      ensureNonRoot: false,
    },
  });

  const claim = new PersistentVolumeClaim(chart, "sonarr-pvc", {
    storage: Size.gibibytes(2),
    storageClassName: "longhorn",
    accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
    volumeMode: PersistentVolumeMode.FILE_SYSTEM,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/sonarr",
    portNumber: 8989,
    securityContext: {
      readOnlyRootFilesystem: false,
    },
    resources: {},
    volumeMounts: [
      {
        path: "/config",
        volume: Volume.fromPersistentVolumeClaim(chart, "sonarr-volume", claim),
      },
      {
        volume: Volume.fromHostPath(
          chart,
          "sonarr-torrents-bind-mount",
          "sonarr-torrents-bind-mount",
          {
            path: "/mnt/storage/downloads/torrents",
          }
        ),
        path: "/downloads",
      },
      {
        volume: Volume.fromHostPath(
          chart,
          "sonarr-movies-bind-mount",
          "sonarr-movies-bind-mount",
          {
            path: "/mnt/storage/media/tv",
          }
        ),
        path: "/tv",
      },
    ],
  });

  const service = new Service(chart, "sonarr-service", {
    selector: deployment,
    ports: [{ port: 8989 }],
  });

  const ingress = new Ingress(chart, "sonarr-ingress", {
    defaultBackend: IngressBackend.fromService(service),
    tls: [
      {
        hosts: ["sonarr"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );
}
