import {
  ConfigMap,
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { withCommonProps } from "../../utils/common.ts";
import { Postgres } from "../common/postgres.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";

export function createInvidiousDeployment(chart: Chart) {
  const postgres = new Postgres(chart, "invidious-postgres", {
    itemPath:
      "vaults/v64ocnykdqju4ui6j6pua56xw4/items/l7quccusjzdh4ww5rhutqpaf2m",
    database: "invidious",
    size: Size.gibibytes(10),
  });

  const UID = 1000;
  const GID = 1000;

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
      fsGroup: GID,
    },
  });

  const contents = Deno.readTextFileSync("config/invidious.yml.tmpl");

  const config = new ConfigMap(chart, "invidious-config-map");
  config.addData("config.yml.tmpl", contents);

  invidiousDeployment.addInitContainer(
    withCommonProps({
      name: "gomplate",
      image: "k8spatterns/gomplate",
      securityContext: {
        user: UID,
        group: GID,
        readOnlyRootFilesystem: false,
      },
      envVariables: {
        POSTGRES_PASSWORD: postgres.passwordEnvValue,
        POSTGRES_HOST: EnvValue.fromValue(postgres.service.name),
        HMAC_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(
            chart,
            "invidious-onepassword-secret",
            invidiousOnePasswordItem.name,
          ),
          key: "hmac",
        }),
      },
      args: [
        "--file",
        "/invidious/config/config.yml.tmpl",
        "--out",
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
        user: UID,
        group: GID,
      },
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
