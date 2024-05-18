import {
  ConfigMap,
  Deployment,
  DeploymentStrategy,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { withCommonProps } from "../../utils/common.ts";
import { Postgres } from "../common/postgres.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions/versions.ts";

export function createInvidiousDeployment(chart: Chart) {
  const postgres = new Postgres(chart, "invidious-postgres", {
    itemPath:
      "vaults/v64ocnykdqju4ui6j6pua56xw4/items/l7quccusjzdh4ww5rhutqpaf2m",
    database: "invidious",
    size: Size.gibibytes(10),
  });

  const UID = 1000;
  const GID = 1000;

  const invidiousDeployment = new Deployment(chart, "invidious", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  let contents = Deno.readTextFileSync("config/invidious.yml");
  contents = contents.replaceAll("<POSTGRES HOST>", postgres.service.name);

  const config = new ConfigMap(chart, "invidious-conf");
  config.addData("config.yml", contents);

  invidiousDeployment.addContainer(
    withCommonProps({
      image: `quay.io/invidious/invidious:${versions["invidious/invidious"]}`,
      name: "invidious",
      portNumber: 3000,
      securityContext: {
        user: UID,
        group: GID,
      },
      volumeMounts: [
        {
          path: "/invidious/config/config.yml",
          subPath: "config.yml",
          volume: Volume.fromConfigMap(chart, "invidious-config", config, {
            items: {
              "config.yml": {
                path: "config.yml",
              },
            },
          }),
        },
      ],
    }),
  );

  const service = new Service(chart, "invidious-service", {
    selector: invidiousDeployment,
    ports: [{ port: 3000 }],
  });

  new TailscaleIngress(chart, "invidious-tailscale-ingress", {
    service,
    host: "invidious",
  });
}
