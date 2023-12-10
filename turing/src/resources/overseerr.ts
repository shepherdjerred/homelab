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

export function createOverseerrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "overseerr", {
    replicas: 1,
  });

  const claim = new PersistentVolumeClaim(chart, "overseerr-pvc", {
    storage: Size.gibibytes(2),
    storageClassName: "longhorn",
    accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
    volumeMode: PersistentVolumeMode.FILE_SYSTEM,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/overseerr",
    portNumber: 5055,
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
          "overseerr-volume",
          claim
        ),
      },
    ],
  });

  const service = new Service(chart, "overseerr-service", {
    selector: deployment,
    ports: [{ port: 5055 }],
  });

  const ingress = new Ingress(chart, "overseerr-ingress", {
    defaultBackend: IngressBackend.fromService(service),
    tls: [
      {
        hosts: ["overseerr"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );

  ingress.metadata.addAnnotation("tailscale.com/funnel", "true");
}
