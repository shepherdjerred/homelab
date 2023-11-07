import { Deployment, Protocol } from "cdk8s-plus-27";
import { Chart } from "cdk8s";

export function createPlexDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "plex", {
    replicas: 1,
  });

  deployment.addContainer({
    image: "plexinc/pms-docker",
    ports: [
      {
        name: "port-32400",
        number: 32400,
        protocol: Protocol.TCP,
      },
      {
        name: "port-3005",
        number: 3005,
        protocol: Protocol.TCP,
      },
      {
        name: "port-8324",
        number: 8324,
        protocol: Protocol.TCP,
      },
      {
        name: "port-32469",
        number: 32469,
        protocol: Protocol.TCP,
      },
      {
        name: "port-32410",
        number: 32410,
        protocol: Protocol.UDP,
      },
      {
        name: "port-32412",
        number: 32412,
        protocol: Protocol.UDP,
      },
      {
        name: "port-32413",
        number: 32413,
        protocol: Protocol.UDP,
      },
      {
        name: "port-32414",
        number: 32414,
        protocol: Protocol.UDP,
      },
    ],
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const service = deployment.exposeViaService();

  service.metadata.addAnnotation("tailscale.com/expose", "true");
  service.metadata.addAnnotation("tailscale.com/hostname", "plex");
}
