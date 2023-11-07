import { Deployment } from "cdk8s-plus-27";
import { Chart } from "cdk8s";

export function createBazarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "bazarr", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/bazarr",
    portNumber: 6767,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
  });

  const service = deployment.exposeViaService();

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "bazarr");
}
