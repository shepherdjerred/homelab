import {
  Deployment,
  Ingress,
  IngressBackend,
  Service,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";

export function createGolinkDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "golink", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "ghcr.io/tailscale/golink:main",
    portNumber: 8080,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = new Service(chart, "golink-service", {
    selector: deployment,
    ports: [{ port: 80, targetPort: 8080 }],
  });

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "go");
}
