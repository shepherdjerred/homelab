import {
  ConfigMap,
  Deployment,
  Ingress,
  IngressBackend,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";

export function createNitterDeployment(chart: Chart) {
  const redisDeployment = new Deployment(chart, "nitter-redis", {
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

  const deployment = new Deployment(chart, "nitter", {
    replicas: 1,
  });

  let contents = Deno.readTextFileSync("config/nitter.conf");
  contents = contents.replaceAll("<REDIS HOST>", redisService.name);
  contents = contents.replaceAll("<REDIS PORT>", redisService.port.toString());

  const config = new ConfigMap(chart, "nitter-conf");
  config.addData("nitter.conf", contents);

  deployment.addContainer({
    image: "zedeus/nitter",
    portNumber: 8080,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
    volumeMounts: [
      {
        path: "/src/",
        volume: Volume.fromConfigMap(chart, "nitter-config", config, {
          items: {
            "nitter.conf": {
              path: "nitter.conf",
            },
          },
        }),
      },
    ],
  });

  const service = new Service(chart, "nitter-service", {
    selector: deployment,
    ports: [{ port: 8080 }],
  });

  const ingress = new Ingress(chart, "nitter-ingress", {
    defaultBackend: IngressBackend.fromService(service),
    tls: [
      {
        hosts: ["nitter"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );
}
