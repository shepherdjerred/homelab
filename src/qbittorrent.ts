import { Deployment } from "cdk8s-plus-27";
import { Chart } from "cdk8s";

export function createQBitTorrentDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "qbittorrent", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/qbittorrent",
    portNumber: 8080,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = deployment.exposeViaService();

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "qbittorrent");
}
