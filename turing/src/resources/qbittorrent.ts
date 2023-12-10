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

export function createQBitTorrentDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "qbittorrent", {
    replicas: 1,
  });

  const claim = new PersistentVolumeClaim(chart, "qbittorrent-pvc", {
    storage: Size.gibibytes(10),
    storageClassName: "longhorn",
    accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
    volumeMode: PersistentVolumeMode.FILE_SYSTEM,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/qbittorrent",
    portNumber: 8080,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
    volumeMounts: [
      {
        path: "/config",
        volume: Volume.fromPersistentVolumeClaim(
          chart,
          "qbittorrent-volume",
          claim
        ),
      },
      {
        volume: Volume.fromHostPath(
          chart,
          "qbittorrent-bind-mount",
          "qbittorrent-bind-mount",
          {
            path: "/mnt/storage/downloads/torrents",
          }
        ),
        path: "/downloads",
      },
    ],
  });

  const service = new Service(chart, "qbittorrent-service", {
    selector: deployment,
    ports: [{ port: 8080 }],
  });

  const ingress = new Ingress(chart, "qbittorrent-ingress", {
    defaultBackend: IngressBackend.fromService(service),
    tls: [
      {
        hosts: ["qbittorrent"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );
}
