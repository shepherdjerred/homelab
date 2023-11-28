import {
  Deployment,
  Ingress,
  IngressBackend,
  Service,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";

export function createSonarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "sonarr", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/sonarr",
    portNumber: 8989,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = new Service(chart, "sonarr-service", {
    selector: deployment,
    ports: [{ name: "http", port: 443, targetPort: 8989 }],
  });

  const ingress = new Ingress(chart, "sonarr-ingress", {
    defaultBackend: IngressBackend.fromService(service, {
      port: 443,
    }),
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
