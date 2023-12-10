import { EnvValue, Deployment, Service } from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";

export function createTedditDeployment(chart: Chart) {
  const redisDeployment = new Deployment(chart, "teddit-redis", {
    replicas: 1,
  });

  redisDeployment.addContainer(
    withCommonProps({
      image: "redis",
      portNumber: 6379,
    })
  );

  const redisService = redisDeployment.exposeViaService();

  const tedditDeployment = new Deployment(chart, "teddit", {
    replicas: 1,
  });

  tedditDeployment.addContainer(
    withCommonProps({
      image: "teddit/teddit",
      envVariables: {
        REDIS_HOST: EnvValue.fromValue(redisService.name),
      },
      portNumber: 8080,
    })
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
