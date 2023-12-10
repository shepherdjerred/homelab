import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";
import { createLonghornVolume } from "../utils/longhorn_volume.ts";

export function createInvidiousDeployment(chart: Chart) {
  const postgresDeployment = new Deployment(chart, "invidious-postgres", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      user: 1000,
      group: 1000,
      fsGroup: 1000,
    },
  });

  const postgresClaim = createLonghornVolume(chart, "invidious-postgres-pvc");

  // TODO: use real password
  // this is a bit complicated because we need to give invidious a config
  // maybe store the entire config in 1P as a secret/configmap
  postgresDeployment.addContainer(
    withCommonProps({
      image: "postgres",
      portNumber: 5432,
      envVariables: {
        POSTGRES_PASSWORD: EnvValue.fromValue("password"),
        POSTGRES_DB: EnvValue.fromValue("invidious"),
      },
      securityContext: {
        readOnlyRootFilesystem: false,
      },
    })
  );

  const postgresService = postgresDeployment.exposeViaService();

  const invidiousDeployment = new Deployment(chart, "invidious", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  invidiousDeployment.addContainer(
    withCommonProps({
      image: "quay.io/invidious/invidious",
      envVariables: {
        INVIDIOUS_CONFIG: EnvValue.fromValue(`
db:
  dbname: invidious
  user: postgres
  password: password
  host: ${postgresService.name}
  port: 5432
check_tables: true
hmac_key: "rVA6+87s6d8 7f56S4A6S5Df46 advs"
    `),
      },
      portNumber: 3000,
    })
  );

  postgresDeployment.connections.allowFrom(invidiousDeployment);

  const service = new Service(chart, "invidious-service", {
    selector: invidiousDeployment,
    ports: [{ port: 3000 }],
  });

  createTailscaleIngress(chart, "invidious-ingress", {
    service,
    host: "invidious",
  });
}
