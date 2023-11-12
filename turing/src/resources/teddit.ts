import { EnvValue, Deployment } from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";

export function createTedditDeployment(chart: Chart) {
  const redisDeployment = new Deployment(chart, "redis", {
    replicas: 1,
  });

  redisDeployment.addContainer({
    image: "redis",
    portNumber: 6379,
    securityContext: {
      ensureNonRoot: false,
    },
    resources: {},
  });

  const redisService = redisDeployment.exposeViaService();

  const tedditDeployment = new Deployment(chart, "teddit", {
    replicas: 1,
  });

  tedditDeployment.addContainer({
    image: "teddit/teddit",
    envVariables: {
      REDIS_HOST: EnvValue.fromValue(redisService.name),
    },
    portNumber: 8080,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
  });

  const tedditService = tedditDeployment.exposeViaService({
    ports: [
      {
        port: 443,
        targetPort: 8080,
      },
    ],
  });

  redisDeployment.connections.allowFrom(tedditDeployment);
  tedditService.metadata.addAnnotation("tailscale.com/expose", "true");
  tedditService.metadata.addAnnotation("tailscale.com/hostname", "teddit");
}
