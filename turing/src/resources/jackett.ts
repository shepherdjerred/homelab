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

export function createJackettDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "jackett", {
    replicas: 1,
  });

  const claim = new PersistentVolumeClaim(chart, "jackett-pvc", {
    storage: Size.gibibytes(2),
    storageClassName: "longhorn",
    accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
    volumeMode: PersistentVolumeMode.FILE_SYSTEM,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/jackett",
    portNumber: 9117,
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
          "jackett-volume",
          claim
        ),
      },
    ],
  });

  const service = new Service(chart, "jackett-service", {
    selector: deployment,
    ports: [{ port: 9117 }],
  });

  const ingress = new Ingress(chart, "jackett-ingress", {
    defaultBackend: IngressBackend.fromService(service),
    tls: [
      {
        hosts: ["jackett"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );
}
