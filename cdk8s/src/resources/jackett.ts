import { Deployment } from "cdk8s-plus-27";
import { Chart } from "cdk8s";

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

  const service = deployment.exposeViaService({
    ports: [
      {
        port: 443,
        targetPort: 9117,
      },
    ],
  });

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "jackett");
}
