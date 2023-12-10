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

export function createTautulliDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "tautulli", {
    replicas: 1,
  });

  const claim = new PersistentVolumeClaim(chart, "tautulli-pvc", {
    storage: Size.gibibytes(2),
    storageClassName: "longhorn",
    accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
    volumeMode: PersistentVolumeMode.FILE_SYSTEM,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/tautulli",
    portNumber: 8181,
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
          "tautulli-volume",
          claim
        ),
      },
      {
        volume: Volume.fromHostPath(
          chart,
          "tautulli-bind-mount",
          "tautulli-bind-mount",
          {
            path: "/mnt/storage/plex/Plex Media Server/Logs",
          }
        ),
        path: "/plex_logs",
      },
    ],
  });

  const service = new Service(chart, "tautulli-service", {
    selector: deployment,
    ports: [{ port: 8181 }],
  });

  const ingress = new Ingress(chart, "tautulli-ingress", {
    defaultBackend: IngressBackend.fromService(service),
    tls: [
      {
        hosts: ["tautulli"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );
}
