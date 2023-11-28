import {
  EnvValue,
  Deployment,
  Ingress,
  IngressBackend,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";

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

  const ingress = new Ingress(chart, "teddit-ingress", {
    defaultBackend: IngressBackend.fromResource(tedditDeployment),
    tls: [
      {
        hosts: ["teddit"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );

  tedditDeployment.exposeViaIngress("/", {
    ingress,
  });
}
