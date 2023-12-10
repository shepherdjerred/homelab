import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Service,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";

export function createInvidiousDeployment(chart: Chart) {
  const postgresDeployment = new Deployment(chart, "postgres", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  // TODO: use real password
  // TODO: persist db
  postgresDeployment.addContainer(
    withCommonProps({
      image: "postgres",
      portNumber: 5432,
      securityContext: {
        user: 1000,
        group: 1000,
      },
      envVariables: {
        POSTGRES_PASSWORD: EnvValue.fromValue("password"),
        POSTGRES_DB: EnvValue.fromValue("invidious"),
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
