import {
  ConfigMap,
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { withCommonProps } from "../../utils/common.ts";
import { createTailscaleIngress } from "../../utils/tailscale.ts";
import { Postgres } from "../common/postgres.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";

export function createInvidiousDeployment(chart: Chart) {
  const postgres = new Postgres(chart, "invidious-postgres", {
    itemPath:
      "vaults/v64ocnykdqju4ui6j6pua56xw4/items/l7quccusjzdh4ww5rhutqpaf2m",
    database: "invidious",
    size: Size.gibibytes(10),
  });

  const invidiousOnePasswordItem = new OnePasswordItem(
    chart,
    "invidious-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/akpdkfv3c5b7j7vfxcm3tulvzy",
      },
      metadata: {
        name: "invidious-onepassword",
      },
    },
  );

  const invidiousDeployment = new Deployment(chart, "invidious", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: 1000,
    },
  });

  const contents = Deno.readTextFileSync("config/invidious.yml.tmpl");

  const config = new ConfigMap(chart, "invidious-config-map");
  config.addData("config.yml.tmpl", contents);

  invidiousDeployment.addInitContainer(
    withCommonProps({
      image: "k8spatterns/gomplate",
      envVariables: {
        POSTGRES_PASSWORD: postgres.passwordEnvValue,
        POSTGRES_HOST: EnvValue.fromValue(postgres.service.name),
        HMAC_KEY: EnvValue.fromSecretValue({
          secret: invidiousOnePasswordItem,
          key: "hmac",
        }),
      },
      command: [
        "gomplate",
        "/invidious/config/config.yml.tmpl",
        "-o",
        "/invidious/config/config.yml",
      ],
      volumeMounts: [
        {
          path: "/invidious/config/config.yml.tmpl",
          subPath: "config.yml.tmpl",
          volume: Volume.fromConfigMap(chart, "invidious-config", config, {
            items: {
              "config.yml.tmpl": {
                path: "config.yml.tmpl",
              },
            },
          }),
        },
      ],
    }),
  );

  invidiousDeployment.addContainer(
    withCommonProps({
      image: "quay.io/invidious/invidious",
      name: "invidious",
      portNumber: 3000,
      securityContext: {
        user: 1000,
        group: 1000,
      },
    }),
  );

  const service = new Service(chart, "invidious-service", {
    selector: invidiousDeployment,
    ports: [{ port: 3000 }],
  });

  createTailscaleIngress(chart, "invidious-ingress", {
    service,
    host: "invidious",
  });
}
