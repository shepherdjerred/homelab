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

export function createRadarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "radarr", {
    replicas: 1,
    securityContext: {
      fsGroup: 1000,
      user: 1000,
      group: 1000,
      ensureNonRoot: true,
    },
  });

  const claim = new PersistentVolumeClaim(chart, "radarr-pvc", {
    storage: Size.gibibytes(2),
    storageClassName: "longhorn",
    accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
    volumeMode: PersistentVolumeMode.FILE_SYSTEM,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/radarr",
    portNumber: 7878,
    securityContext: {
      readOnlyRootFilesystem: false,
    },
    resources: {},
    volumeMounts: [
      {
        path: "/config",
        volume: Volume.fromPersistentVolumeClaim(chart, "radarr-volume", claim),
      },
      {
        volume: Volume.fromHostPath(
          chart,
          "radarr-torrents-bind-mount",
          "radarr-torrents-bind-mount",
          {
            path: "/mnt/storage/downloads/torrents",
          }
        ),
        path: "/downloads",
      },
      {
        volume: Volume.fromHostPath(
          chart,
          "radarr-movies-bind-mount",
          "radarr-movies-bind-mount",
          {
            path: "/mnt/storage/media/movies",
          }
        ),
        path: "/movies",
      },
    ],
  });

  const service = new Service(chart, "radarr-service", {
    selector: deployment,
    ports: [{ port: 7878 }],
  });

  const ingress = new Ingress(chart, "radarr-ingress", {
    defaultBackend: IngressBackend.fromService(service, {}),
    tls: [
      {
        hosts: ["radarr"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );
}
