import { Deployment } from "cdk8s-plus-27";
import { Chart } from "cdk8s";

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

  const service = deployment.exposeViaService({
    ports: [
      {
        port: 443,
        targetPort: 5055,
      },
    ],
  });

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "overseerr");
}
