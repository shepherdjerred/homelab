import {
  Deployment,
  Ingress,
  IngressBackend,
  Service,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";

export function createNitterDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "nitter", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "zedeus/nitter",
    portNumber: 8080,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = new Service(chart, "nitter-service", {
    selector: deployment,
    ports: [{ port: 8080 }],
  });

  const ingress = new Ingress(chart, "nitter-ingress", {
    defaultBackend: IngressBackend.fromService(service),
    tls: [
      {
        hosts: ["nitter"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );
}
