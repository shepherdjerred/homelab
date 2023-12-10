import {
  ConfigMap,
  Deployment,
  DeploymentStrategy,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";

export function createNitterDeployment(chart: Chart) {
  const redisDeployment = new Deployment(chart, "nitter-redis", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  redisDeployment.addContainer(
    withCommonProps({
      image: "redis",
      portNumber: 6379,
      securityContext: {
        user: 999,
        group: 999,
      },
    })
  );

  const redisService = redisDeployment.exposeViaService();

  const deployment = new Deployment(chart, "nitter", {
    replicas: 1,
  });

  let contents = Deno.readTextFileSync("config/nitter.conf");
  contents = contents.replaceAll("<REDIS HOST>", redisService.name);
  contents = contents.replaceAll("<REDIS PORT>", redisService.port.toString());

  const config = new ConfigMap(chart, "nitter-conf");
  config.addData("nitter.conf", contents);

  deployment.addContainer(
    withCommonProps({
      image: "zedeus/nitter",
      portNumber: 8080,
      volumeMounts: [
        {
          path: "/src/nitter.conf",
          subPath: "nitter.conf",
          volume: Volume.fromConfigMap(chart, "nitter-config", config, {
            items: {
              "nitter.conf": {
                path: "nitter.conf",
              },
            },
          }),
        },
      ],
    })
  );

  const service = new Service(chart, "nitter-service", {
    selector: deployment,
    ports: [{ port: 8080 }],
  });

  createTailscaleIngress(chart, "nitter-ingress", {
    service,
    host: "nitter",
  });
}
