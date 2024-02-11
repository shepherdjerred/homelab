import { ConfigMap, Deployment, Service, Volume } from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonProps } from "../../utils/common.ts";
import { Redis } from "../common/redis.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";

export function createNitterDeployment(chart: Chart) {
  const redis = new Redis(chart, "nitter-redis");

  const UID = 999;
  const GID = 999;

  const deployment = new Deployment(chart, "nitter", {
    replicas: 0,
    securityContext: {
      user: UID,
      group: GID,
    },
  });

  let contents = Deno.readTextFileSync("config/nitter.conf");
  contents = contents.replaceAll("<REDIS HOST>", redis.service.name);
  contents = contents.replaceAll("<REDIS PORT>", redis.service.port.toString());

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
    }),
  );

  const service = new Service(chart, "nitter-service", {
    selector: deployment,
    ports: [{ port: 8080 }],
  });

  new TailscaleIngress(chart, "nitter-tailscale-ingress", {
    service,
    host: "nitter",
  });
}
