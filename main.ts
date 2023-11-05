import * as kplus from "npm:cdk8s-plus-27";
import * as cdk8s from "npm:cdk8s";

const app = new cdk8s.App();
const chart = new cdk8s.Chart(app, "my-chart");

const redisDeployment = new kplus.Deployment(chart, "redis", {
  replicas: 1,
});

redisDeployment.addContainer({
  image: "redis",
  portNumber: 6379,
  securityContext: {
    ensureNonRoot: false,
  },
});

const redisService = redisDeployment.exposeViaService();

const tedditDeployment = new kplus.Deployment(chart, "teddit", {
  replicas: 1,
});

tedditDeployment.addContainer({
  image: "teddit/teddit",
  envVariables: {
    REDIS_HOST: kplus.EnvValue.fromValue(redisService.name),
  },
  portNumber: 8080,
  securityContext: {
    ensureNonRoot: false,
    readOnlyRootFilesystem: false,
  },
});

tedditDeployment.exposeViaService({
  serviceType: kplus.ServiceType.LOAD_BALANCER,
});

redisDeployment.connections.allowFrom(tedditDeployment);

const postgresDeployment = new kplus.Deployment(chart, "postgres", {
  replicas: 1,
});

postgresDeployment.addContainer({
  image: "postgres",
  portNumber: 5432,
  envVariables: {
    POSTGRES_PASSWORD: kplus.EnvValue.fromValue("password"),
    POSTGRES_DB: kplus.EnvValue.fromValue("invidious"),
  },
  securityContext: {
    ensureNonRoot: false,
    readOnlyRootFilesystem: false,
  },
});

const postgresService = postgresDeployment.exposeViaService();

const invidiousDeployment = new kplus.Deployment(chart, "invidious", {
  replicas: 1,
});

invidiousDeployment.addContainer({
  image: "quay.io/invidious/invidious",
  envVariables: {
    INVIDIOUS_CONFIG: kplus.EnvValue.fromValue(`
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
  securityContext: {
    ensureNonRoot: false,
    readOnlyRootFilesystem: false,
  },
});

invidiousDeployment.exposeViaService({
  serviceType: kplus.ServiceType.LOAD_BALANCER,
});

redisDeployment.connections.allowFrom(invidiousDeployment);

app.synth();
