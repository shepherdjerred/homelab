import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Service,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonProps } from "../../utils/common.ts";
import { createTailscaleIngress } from "../../utils/tailscale.ts";
import { Redis } from "../common/redis.ts";

export function createTedditDeployment(chart: Chart) {
  const redis = new Redis(chart, "teddis-redis");

  const tedditDeployment = new Deployment(chart, "teddit", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      user: 1000,
      group: 1000,
    },
  });

  tedditDeployment.addContainer(
    withCommonProps({
      image: "teddit/teddit",
      envVariables: {
        REDIS_HOST: EnvValue.fromValue(redis.service.name),
        domain: EnvValue.fromValue("teddit.tailnet-1a49.ts.net"),
      },
      securityContext: {
        readOnlyRootFilesystem: false,
      },
      portNumber: 8080,
    }),
  );

  const service = new Service(chart, "teddit-service", {
    selector: tedditDeployment,
    ports: [{ port: 8080 }],
  });

  createTailscaleIngress(chart, "teddit-ingress", {
    service,
    host: "teddit",
  });
}
