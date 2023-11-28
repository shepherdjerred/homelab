import {
  Deployment,
  Ingress,
  IngressBackend,
  Service,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";

export function createJackettDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "jackett", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/jackett",
    portNumber: 9117,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = new Service(chart, "jackett-service", {
    selector: deployment,
    ports: [{ name: "http", port: 80, targetPort: 9117 }],
  });

  const ingress = new Ingress(chart, "jackett-ingress", {
    defaultBackend: IngressBackend.fromService(service, {
      port: 80,
    }),
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
