import { Deployment, DeploymentStrategy, Service } from "cdk8s-plus-31";
import { Chart } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import versions from "../../versions.ts";

export function createSjerRedDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "sjer-red", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/shepherdjerred/sjer.red:${versions["shepherdjerred/sjer.red"]}`,
      securityContext: {
        readOnlyRootFilesystem: false,
        user: 101, // nginx user
        group: 101,
      },
      portNumber: 80,
    }),
  );

  new Service(chart, "sjer-red-service", {
    selector: deployment,
    ports: [{ port: 80 }],
  });
}
