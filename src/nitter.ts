import { Deployment } from "cdk8s-plus-27";
import { Chart } from "cdk8s";

export function createNitterDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "nitter", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "zedeus/nitter",
    portNumber: 8080,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = deployment.exposeViaService({
    ports: [
      {
        name: "https",
        port: 8080,
      },
    ],
  });

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "nitter");
}
