import { Deployment, DeploymentStrategy, EnvValue, Secret, Service, Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";
import { ZfsHddVolume } from "../../misc/zfs-hdd-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import versions from "../../versions.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import type { Redis } from "../common/redis.ts";

export type CreatePeerTubeDeploymentProps = {
  redis: Redis;
};

export function createPeerTubeDeployment(chart: Chart, props: CreatePeerTubeDeploymentProps) {
  const UID = 991;
  const GID = 991;

  // OnePassword item for PeerTube secrets
  // This should contain:
  // - password: The PEERTUBE_SECRET for sessions/encryption
  // - admin_email: The admin email for the first user
  const peertubeSecrets = new OnePasswordItem(chart, "peertube-secrets", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/vhjn6hzked4zmmdq7l2nqnxn3a",
    },
  });

  const deployment = new Deployment(chart, "peertube", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  // Create volumes for PeerTube
  const configVolume = new ZfsSsdVolume(chart, "peertube-config", {
    storage: Size.gibibytes(32),
  });

  const dataVolume = new ZfsHddVolume(chart, "peertube-data", {
    storage: Size.gibibytes(128),
  });

  // PostgreSQL connection details
  // The postgres-operator creates secrets in the format: {user}.{cluster-name}.credentials.postgresql.acid.zalan.do
  const postgresSecretName = "peertube.peertube-postgresql.credentials.postgresql.acid.zalan.do";

  deployment.addContainer(
    withCommonProps({
      image: `chocobozzz/peertube:${versions["chocobozzz/peertube"]}`,
      ports: [
        {
          name: "http",
          number: 9000,
        },
      ],
      securityContext: {
        user: UID,
        group: GID,
        ensureNonRoot: true,
        readOnlyRootFilesystem: false,
      },
      envVariables: {
        // Webserver configuration
        PEERTUBE_WEBSERVER_HOSTNAME: EnvValue.fromValue("peertube.tailnet-1a49.ts.net"),
        PEERTUBE_WEBSERVER_PORT: EnvValue.fromValue("443"),
        PEERTUBE_WEBSERVER_HTTPS: EnvValue.fromValue("true"),

        // Trust proxy for proper IP forwarding through Tailscale
        PEERTUBE_TRUST_PROXY: EnvValue.fromValue(
          '["127.0.0.1", "loopback", "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]',
        ),

        // Database configuration
        PEERTUBE_DB_HOSTNAME: EnvValue.fromValue("peertube-postgresql"),
        PEERTUBE_DB_PORT: EnvValue.fromValue("5432"),
        PEERTUBE_DB_SSL: EnvValue.fromValue("false"),
        PEERTUBE_DB_USERNAME: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "peertube-postgres-secret", postgresSecretName),
          key: "username",
        }),
        PEERTUBE_DB_PASSWORD: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "peertube-postgres-secret-pwd", postgresSecretName),
          key: "password",
        }),
        PEERTUBE_DB_NAME: EnvValue.fromValue("peertube"),

        // Redis configuration
        PEERTUBE_REDIS_HOSTNAME: EnvValue.fromValue(props.redis.serviceName),
        PEERTUBE_REDIS_PORT: EnvValue.fromValue("6379"),
        PEERTUBE_REDIS_AUTH: EnvValue.fromValue(""), // No auth enabled

        // SMTP configuration (optional - can be configured later through web UI)
        PEERTUBE_SMTP_HOSTNAME: EnvValue.fromValue(""),
        PEERTUBE_SMTP_PORT: EnvValue.fromValue("25"),
        PEERTUBE_SMTP_FROM: EnvValue.fromValue("noreply@peertube.tailnet-1a49.ts.net"),
        PEERTUBE_SMTP_TLS: EnvValue.fromValue("false"),
        PEERTUBE_SMTP_DISABLE_STARTTLS: EnvValue.fromValue("false"),

        // Admin configuration
        PEERTUBE_ADMIN_EMAIL: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "peertube-admin-secret", peertubeSecrets.name),
          key: "admin_email",
        }),

        // Secret for sessions and encryption
        PEERTUBE_SECRET: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "peertube-secret", peertubeSecrets.name),
          key: "password",
        }),
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(chart, "peertube-config-volume", configVolume.claim),
        },
        {
          path: "/data",
          volume: Volume.fromPersistentVolumeClaim(chart, "peertube-data-volume", dataVolume.claim),
        },
      ],
    }),
  );

  const service = new Service(chart, "peertube-service", {
    selector: deployment,
    metadata: {
      labels: {
        app: "peertube",
      },
    },
    ports: [{ port: 9000, name: "http" }],
  });

  new TailscaleIngress(chart, "peertube-tailscale-ingress", {
    service,
    host: "peertube",
    funnel: true,
  });
}
