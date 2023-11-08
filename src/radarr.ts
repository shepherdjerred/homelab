import { Deployment } from "cdk8s-plus-27";
import { Chart } from "cdk8s";

export function createRadarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "radarr", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/radarr",
    portNumber: 7878,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = deployment.exposeViaService({
    name: "https",
  });

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "radarr");
}
