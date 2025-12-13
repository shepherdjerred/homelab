import { ConfigMap, Cpu, Deployment, DeploymentStrategy, EnvValue, Protocol, Service, Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import versions from "../../versions.ts";
import type { RabbitMQ } from "../common/rabbitmq.ts";
import type { PostalMariaDB } from "../../resources/postgres/postal-mariadb.ts";

export type PostalDeploymentProps = {
  /**
   * MariaDB instance for Postal
   */
  mariadb: PostalMariaDB;
  /**
   * RabbitMQ instance for Postal
   */
  rabbitmq: RabbitMQ;
};

export function createPostalDeployment(chart: Chart, props: PostalDeploymentProps) {
  const UID = 1000;
  const GID = 1000;

  // Create persistent volume for Postal data
  const postalVolume = new ZfsSsdVolume(chart, "postal-pvc", {
    storage: Size.gibibytes(32),
  });

  // Create ConfigMap for Postal configuration
  // Note: Postal uses a postal.yml configuration file
  const configMap = new ConfigMap(chart, "postal-config");

  // Postal configuration
  // See: https://docs.postalserver.io/getting-started/configuration
  const postalConfig = `
# Postal Configuration File
# This is a basic configuration. Adjust as needed for your environment.

# Web server configuration
web:
  host: 0.0.0.0
  port: 5000
  protocol: http

# Main server configuration
main_server:
  # Use the external hostname here after setting up Tailscale ingress
  # This will be accessible at https://postal.tailnet-xxxx.ts.net
  protocol: https
  hostname: postal.tailnet-1a49.ts.net
  use_ip_pools: false

# Database configuration
database:
  host: ${props.mariadb.serviceName}
  username: ${props.mariadb.username}
  password: ${props.mariadb.password}
  database: ${props.mariadb.databaseName}

# RabbitMQ configuration
rabbitmq:
  host: ${props.rabbitmq.serviceName}
  username: postal
  password: postal
  vhost: /

# SMTP Server configuration
smtp_server:
  port: 25
  tls_enabled: false
  # Note: For production, consider enabling TLS

# DNS configuration
dns:
  # Configure your DNS records after deployment
  # Instructions will be provided in the Postal web UI
  mx_records: []

# Logging
logging:
  stdout: true
  level: info

# General settings
general:
  # Use internal IPs in cluster
  use_local_ns_for_domains: false
`;

  configMap.addData("postal.yml", postalConfig);

  // Environment variables shared across all Postal containers
  const commonEnv = {
    POSTAL_CONFIG_FILE: EnvValue.fromValue("/config/postal.yml"),
    POSTAL_MYSQL_HOST: EnvValue.fromValue(props.mariadb.serviceName),
    POSTAL_MYSQL_USERNAME: EnvValue.fromValue(props.mariadb.username),
    POSTAL_MYSQL_PASSWORD: EnvValue.fromValue(props.mariadb.password),
    POSTAL_MYSQL_DATABASE: EnvValue.fromValue(props.mariadb.databaseName),
    POSTAL_RABBITMQ_HOST: EnvValue.fromValue(props.rabbitmq.serviceName),
    POSTAL_RABBITMQ_USERNAME: EnvValue.fromValue("postal"),
    POSTAL_RABBITMQ_PASSWORD: EnvValue.fromValue("postal"),
    POSTAL_RABBITMQ_VHOST: EnvValue.fromValue("/"),
  };

  // Create deployment for Postal Web UI
  const webDeployment = new Deployment(chart, "postal-web", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  webDeployment.addContainer(
    withCommonProps({
      name: "postal-web",
      image: `ghcr.io/postalserver/postal:${versions["postalserver/postal"]}`,
      command: ["/bin/bash"],
      args: ["-c", "postal initialize && postal start-web-server"],
      ports: [
        {
          name: "web",
          number: 5000,
          protocol: Protocol.TCP,
        },
      ],
      envVariables: commonEnv,
      securityContext: {
        user: UID,
        group: GID,
        ensureNonRoot: true,
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromConfigMap(chart, "postal-config-volume", configMap),
        },
        {
          path: "/opt/postal/data",
          volume: Volume.fromPersistentVolumeClaim(chart, "postal-data-volume", postalVolume.claim),
        },
      ],
      resources: {
        cpu: {
          request: Cpu.millis(500),
          limit: Cpu.millis(2000),
        },
        memory: {
          request: Size.gibibytes(1),
          limit: Size.gibibytes(4),
        },
      },
    }),
  );

  // Create deployment for Postal SMTP Server
  const smtpDeployment = new Deployment(chart, "postal-smtp", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  smtpDeployment.addContainer(
    withCommonProps({
      name: "postal-smtp",
      image: `ghcr.io/postalserver/postal:${versions["postalserver/postal"]}`,
      command: ["/bin/bash"],
      args: ["-c", "postal start-smtp-server"],
      ports: [
        {
          name: "smtp",
          number: 25,
          protocol: Protocol.TCP,
        },
      ],
      envVariables: commonEnv,
      securityContext: {
        user: UID,
        group: GID,
        ensureNonRoot: true,
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromConfigMap(chart, "postal-config-volume-smtp", configMap),
        },
        {
          path: "/opt/postal/data",
          volume: Volume.fromPersistentVolumeClaim(chart, "postal-data-volume-smtp", postalVolume.claim),
        },
      ],
      resources: {
        cpu: {
          request: Cpu.millis(250),
          limit: Cpu.millis(1000),
        },
        memory: {
          request: Size.mebibytes(512),
          limit: Size.gibibytes(2),
        },
      },
    }),
  );

  // Create deployment for Postal Worker
  const workerDeployment = new Deployment(chart, "postal-worker", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  workerDeployment.addContainer(
    withCommonProps({
      name: "postal-worker",
      image: `ghcr.io/postalserver/postal:${versions["postalserver/postal"]}`,
      command: ["/bin/bash"],
      args: ["-c", "postal start-worker"],
      envVariables: commonEnv,
      securityContext: {
        user: UID,
        group: GID,
        ensureNonRoot: true,
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromConfigMap(chart, "postal-config-volume-worker", configMap),
        },
        {
          path: "/opt/postal/data",
          volume: Volume.fromPersistentVolumeClaim(chart, "postal-data-volume-worker", postalVolume.claim),
        },
      ],
      resources: {
        cpu: {
          request: Cpu.millis(250),
          limit: Cpu.millis(1000),
        },
        memory: {
          request: Size.mebibytes(512),
          limit: Size.gibibytes(2),
        },
      },
    }),
  );

  // Create services
  const webService = new Service(chart, "postal-web-service", {
    selector: webDeployment,
    metadata: {
      labels: {
        app: "postal-web",
      },
    },
    ports: [{ port: 5000, name: "web" }],
  });

  const smtpService = new Service(chart, "postal-smtp-service", {
    selector: smtpDeployment,
    metadata: {
      labels: {
        app: "postal-smtp",
      },
    },
    ports: [{ port: 25, name: "smtp" }],
  });

  // Create Tailscale Ingress for Web UI
  new TailscaleIngress(chart, "postal-tailscale-ingress", {
    service: webService,
    host: "postal",
    funnel: false, // Keep internal to tailnet for security
  });

  return {
    webDeployment,
    smtpDeployment,
    workerDeployment,
    webService,
    smtpService,
    configMap,
  };
}

/**
 * Post-deployment initialization steps:
 *
 * 1. Access Postal Web UI via Tailscale: https://postal.tailnet-xxxx.ts.net
 *
 * 2. Initialize Postal (run once):
 *    kubectl exec -it <postal-web-pod> -n postal -- postal initialize
 *
 * 3. Create initial admin user:
 *    kubectl exec -it <postal-web-pod> -n postal -- postal make-user
 *
 * 4. Create organization:
 *    Log into the web UI and create your first organization
 *
 * 5. Create mail server:
 *    Create a mail server within your organization
 *
 * 6. Configure DNS records (see documentation at top of file):
 *    - A record: mail.yourdomain.com -> your-cluster-ip
 *    - MX record: @ 10 mail.yourdomain.com
 *    - SPF record: v=spf1 ip4:YOUR_IP ~all
 *    - DKIM record: Generated by Postal (postal._domainkey.yourdomain.com)
 *    - DMARC record: _dmarc.yourdomain.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com"
 *
 * 7. Get API credentials from Postal web UI for sending emails
 *
 * 8. Test email sending:
 *    Use Postal's API or SMTP to send a test email
 *    Verify delivery and check SPF/DKIM/DMARC with mail-tester.com
 */
