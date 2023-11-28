import { Deployment, Ingress, IngressBackend } from "npm:cdk8s-plus-27";
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

  const ingress = new Ingress(chart, "sonarr-ingress", {
    defaultBackend: IngressBackend.fromResource(deployment),
    tls: [
      {
        hosts: ["sonarr"],
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
