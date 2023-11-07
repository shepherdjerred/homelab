import { Deployment, EnvValue, Protocol } from "cdk8s-plus-27";
import { Chart } from "cdk8s";

export function createRadarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "radarr", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/radarr",
    portNumber: 7878,
    // securityContext: {
    //   ensureNonRoot: false,
    //   readOnlyRootFilesystem: false,
    // },
  });

  const service = deployment.exposeViaService();

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "plex");
}
