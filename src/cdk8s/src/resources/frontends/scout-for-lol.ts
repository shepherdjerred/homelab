import { Deployment, DeploymentStrategy, Service } from "cdk8s-plus-31";
import { Chart } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import versions from "../../versions.ts";

export function createScoutForLolFrontendDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "scout-for-lol-frontend", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/shepherdjerred/scout-for-lol-frontend:${versions["shepherdjerred/scout-for-lol-frontend"]}`,
      securityContext: {
        readOnlyRootFilesystem: false,
        user: 101, // nginx user
        group: 101,
      },
      portNumber: 80,
    }),
  );

  new Service(chart, "scout-for-lol-frontend-service", {
    selector: deployment,
    ports: [{ port: 80 }],
  });
}
