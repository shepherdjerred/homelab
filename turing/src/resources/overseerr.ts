import { Deployment, Ingress, IngressBackend } from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";

export function createOverseerrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "overseerr", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/overseerr",
    portNumber: 5055,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const ingress = new Ingress(chart, "overseerr-ingress", {
    defaultBackend: IngressBackend.fromResource(deployment),
    tls: [
      {
        hosts: ["overseerr"],
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
