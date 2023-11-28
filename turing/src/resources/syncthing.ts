import {
  Deployment,
  Ingress,
  IngressBackend,
  Service,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";

export function createSyncthingDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "syncthing", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/syncthing",
    portNumber: 8384,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = new Service(chart, "syncthing-service", {
    selector: deployment,
    ports: [{ name: "http", port: 443, targetPort: 8384 }],
  });

  const ingress = new Ingress(chart, "syncthing-ingress", {
    defaultBackend: IngressBackend.fromService(service, {
      port: 443,
    }),
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
