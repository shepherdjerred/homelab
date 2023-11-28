import { Deployment, Ingress, IngressBackend } from "npm:cdk8s-plus-27";
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

  const ingress = new Ingress(chart, "nitter-ingress", {
    defaultBackend: IngressBackend.fromResource(deployment),
    tls: [
      {
        hosts: ["nitter"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );

  deployment.exposeViaIngress("/", {
    ingress,
  });
}
