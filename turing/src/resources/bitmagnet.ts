import {
  Deployment,
  EnvValue,
  Ingress,
  IngressBackend,
  PersistentVolumeAccessMode,
  PersistentVolumeClaim,
  PersistentVolumeMode,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch, Size } from "npm:cdk8s";

export function createBitmagnetDeployment(chart: Chart) {
  const redisDeployment = new Deployment(chart, "bitmagnet-redis", {
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

  const postgresDeployment = new Deployment(chart, "bitmagnet-postgres", {
    replicas: 1,
  });

  const postgresClaim = new PersistentVolumeClaim(
    chart,
    "bitmagnet-postgres-pvc",
    {
      storage: Size.gibibytes(10),
      storageClassName: "longhorn",
      accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
      volumeMode: PersistentVolumeMode.FILE_SYSTEM,
    }
  );

  const postgresPassword = "password";

  postgresDeployment.addContainer({
    image: "postgres",
    portNumber: 5432,
    envVariables: {
      POSTGRES_PASSWORD: EnvValue.fromValue(postgresPassword),
      PGDATA: EnvValue.fromValue("/var/lib/postgresql/data/pgdata"),
    },
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
    volumeMounts: [
      {
        path: "/var/lib/postgresql/data",
        volume: Volume.fromPersistentVolumeClaim(
          chart,
          "postgres-volume",
          postgresClaim
        ),
      },
    ],
  });

  const postgresService = postgresDeployment.exposeViaService();

  const deployment = new Deployment(chart, "bitmagnet", {
    replicas: 1,
  });

  const claim = new PersistentVolumeClaim(chart, "bitmagnet-pvc", {
    storage: Size.gibibytes(2),
    storageClassName: "longhorn",
    accessModes: [PersistentVolumeAccessMode.READ_WRITE_ONCE],
    volumeMode: PersistentVolumeMode.FILE_SYSTEM,
  });

  deployment.addContainer({
    image: "ghcr.io/bitmagnet-io/bitmagnet:latest",
    // TODO, maybe:
    // # BitTorrent ports:
    // - "3334:3334/tcp"
    // - "3334:3334/udp"
    envVariables: {
      POSTGRES_HOST: EnvValue.fromValue(postgresService.name),
      // TODO: store as secret
      POSTGRES_PASSWORD: EnvValue.fromValue(postgresPassword),
      REDIS_ADDR: EnvValue.fromValue(
        `${redisService.name}:${redisService.port}`
      ),
      // TODO
      //   TMDB_API_KEY: EnvValue.fromValue(""),
    },
    // command: [
    //   "worker",
    //   "run",
    //   "--keys=http_server",
    //   "--keys=queue_server",
    //   // # disable the next line to run without DHT crawler
    //   "--keys=dht_crawler",
    // ],
    portNumber: 3333,
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
    volumeMounts: [
      {
        path: "/app",
        volume: Volume.fromPersistentVolumeClaim(
          chart,
          "bitmagnet-volume",
          claim
        ),
      },
    ],
  });

  const service = new Service(chart, "bitmagnet-service", {
    selector: deployment,
    ports: [{ port: 3333 }],
  });

  const ingress = new Ingress(chart, "bitmagnet-ingress", {
    defaultBackend: IngressBackend.fromService(service),
    tls: [
      {
        hosts: ["bitmagnet"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );
}
