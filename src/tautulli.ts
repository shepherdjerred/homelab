import { Deployment } from "cdk8s-plus-27";
import { Chart } from "cdk8s";

export function createTautulliDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "tautulli", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/tautulli",
    portNumber: 8181,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = deployment.exposeViaService();

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "tautulli");
}
