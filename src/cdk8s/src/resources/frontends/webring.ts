import { Deployment, DeploymentStrategy, Service } from "cdk8s-plus-31";
import { Chart } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import versions from "../../versions.ts";

export function createWebringDocsDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "webring-docs", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/shepherdjerred/webring-docs:${versions["shepherdjerred/webring-docs"]}`,
      securityContext: {
        readOnlyRootFilesystem: false,
        user: 101, // nginx user
        group: 101,
      },
      portNumber: 80,
    }),
  );

  new Service(chart, "webring-docs-service", {
    selector: deployment,
    ports: [{ port: 80 }],
    metadata: {
      annotations: {
        "cloudflare-operator.io/content": "webring-docs-service",
        "cloudflare-operator.io/tunnel": "homelab-tunnel",
        "cloudflare-operator.io/hostname": "webring.sjer.red",
      },
    },
  });
}
