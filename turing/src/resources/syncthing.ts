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

export function createSyncthingDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "syncthing", {
    replicas: 1,
  });

  const claim = new PersistentVolumeClaim(chart, "syncthing-pvc", {
    storage: Size.gibibytes(2),
    storageClassName: "longhorn",
    accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
    volumeMode: PersistentVolumeMode.FILE_SYSTEM,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/syncthing",
    portNumber: 8384,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
    volumeMounts: [
      {
        path: "/var/syncthing/",
        volume: Volume.fromPersistentVolumeClaim(
          chart,
          "syncthing-volume",
          claim
        ),
      },
      {
        volume: Volume.fromHostPath(
          chart,
          "syncthing-bind-mount",
          "syncthing-bind-mount",
          {
            path: "/mnt/storage/syncthing",
          }
        ),
        path: "/syncthing",
      },
    ],
  });

  const service = new Service(chart, "syncthing-service", {
    selector: deployment,
    ports: [{ port: 8384 }],
  });

  const ingress = new Ingress(chart, "syncthing-ingress", {
    defaultBackend: IngressBackend.fromService(service),
    tls: [
      {
        hosts: ["syncthing"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );
}
