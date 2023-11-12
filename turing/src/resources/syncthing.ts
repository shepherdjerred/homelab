import { Deployment } from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";

export function createSyncthingDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "syncthing", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "lscr.io/linuxserver/syncthing",
    portNumber: 8384,
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
        targetPort: 8384,
      },
    ],
  });

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "syncthing");
}
