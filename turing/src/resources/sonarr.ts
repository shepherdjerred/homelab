import { Deployment } from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";

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

  const service = deployment.exposeViaService({
    ports: [
      {
        port: 443,
        targetPort: 8989,
      },
    ],
  });

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "sonarr");
}
