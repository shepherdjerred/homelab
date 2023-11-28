import {
  Deployment,
  Ingress,
  IngressBackend,
  Service,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";

export function createQBitTorrentDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "qbittorrent", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/qbittorrent",
    portNumber: 8080,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = new Service(chart, "qbittorrent-service", {
    selector: deployment,
    ports: [{ name: "http", port: 80, targetPort: 8080 }],
  });

  const ingress = new Ingress(chart, "qbittorrent-ingress", {
    defaultBackend: IngressBackend.fromService(service, {
      port: 80,
    }),
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
