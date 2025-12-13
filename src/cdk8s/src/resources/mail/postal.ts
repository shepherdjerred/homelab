import { Cpu, Deployment, DeploymentStrategy, EnvValue, Protocol, Secret, Service, Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import versions from "../../versions.ts";
import type { PostalMariaDB } from "../../resources/postgres/postal-mariadb.ts";

export type PostalDeploymentProps = {
  /**
   * MariaDB instance for Postal
   */
  mariadb: PostalMariaDB;
};

export function createPostalDeployment(chart: Chart, props: PostalDeploymentProps) {
  const UID = 1000;
  const GID = 1000;

  // Create persistent volume for Postal data
  const postalVolume = new ZfsSsdVolume(chart, "postal-pvc", {
    storage: Size.gibibytes(32),
  });

  // Fastmail SMTP credentials for the relay sidecar
  const fastmailItem = new OnePasswordItem(chart, "fastmail-smtp-credentials", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/y2xpkfyirxjlcq7oluqxoyxxce",
    },
  });
  const fastmailSecret = Secret.fromSecretName(chart, "fastmail-secret", fastmailItem.name);

  // Environment variables for Postal v3+
  // See: https://github.com/postalserver/postal/blob/main/doc/config/environment-variables.md
  // Note: Postal v3 removed RabbitMQ dependency
  const commonEnv = {
    // Main database configuration (for Postal core data)
    MAIN_DB_HOST: EnvValue.fromValue(props.mariadb.serviceName),
    MAIN_DB_PORT: EnvValue.fromValue("3306"),
    MAIN_DB_USERNAME: EnvValue.fromValue(props.mariadb.username),
    MAIN_DB_PASSWORD: EnvValue.fromValue(props.mariadb.password),
    MAIN_DB_DATABASE: EnvValue.fromValue(props.mariadb.databaseName),

    // Message database configuration (for mail server message storage)
    // Uses same MariaDB instance but separate databases per mail server
    MESSAGE_DB_HOST: EnvValue.fromValue(props.mariadb.serviceName),
    MESSAGE_DB_PORT: EnvValue.fromValue("3306"),
    MESSAGE_DB_USERNAME: EnvValue.fromValue(props.mariadb.username),
    MESSAGE_DB_PASSWORD: EnvValue.fromValue(props.mariadb.password),

    // Web server configuration
    POSTAL_WEB_HOSTNAME: EnvValue.fromValue("postal.tailnet-1a49.ts.net"),
    POSTAL_WEB_PROTOCOL: EnvValue.fromValue("https"),

    // SMTP server hostname (for outbound mail identification)
    POSTAL_SMTP_HOSTNAME: EnvValue.fromValue("postal.tailnet-1a49.ts.net"),

    // Rails secret key for session encryption (generate a secure random value)
    // TODO: Move to 1Password secret
    RAILS_SECRET_KEY: EnvValue.fromValue("change-me-to-a-secure-random-string-at-least-64-chars-long-for-production"),

    // Logging configuration
    LOGGING_ENABLED: EnvValue.fromValue("true"),
    LOGGING_HIGHLIGHTING_ENABLED: EnvValue.fromValue("false"),

    // Wait for MariaDB to be ready before starting
    WAIT_FOR_TARGETS: EnvValue.fromValue(`${props.mariadb.serviceName}:3306`),
    WAIT_FOR_TIMEOUT: EnvValue.fromValue("60"),
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
      args: ["-c", "postal initialize && postal web-server"],
      ports: [
        {
          name: "web",
          number: 5000,
          protocol: Protocol.TCP,
        },
      ],
      envVariables: {
        ...commonEnv,
        // Bind to all interfaces so the service can reach the container
        BIND_ADDRESS: EnvValue.fromValue("0.0.0.0"),
      },
      securityContext: {
        user: UID,
        group: GID,
        ensureNonRoot: true,
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
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
      args: ["-c", "postal smtp-server"],
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
      args: ["-c", "postal worker"],
      envVariables: {
        ...commonEnv,
        // Use the local Postfix sidecar as SMTP relay (port 25 blocked externally)
        POSTAL_SMTP_RELAYS: EnvValue.fromValue("smtp://127.0.0.1:2525"),
      },
      securityContext: {
        user: UID,
        group: GID,
        ensureNonRoot: true,
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
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

  // Postfix sidecar for authenticated SMTP relay to Fastmail
  // This bypasses port 25 blocking by relaying through Fastmail on port 587
  workerDeployment.addContainer(
    withCommonProps({
      name: "postfix-relay",
      image: "boky/postfix:latest",
      ports: [
        {
          name: "smtp",
          number: 2525,
          protocol: Protocol.TCP,
        },
      ],
      envVariables: {
        // Relay configuration
        RELAYHOST: EnvValue.fromValue("[smtp.fastmail.com]:587"),
        RELAYHOST_USERNAME: EnvValue.fromSecretValue({
          secret: fastmailSecret,
          key: "SMTP_USERNAME",
        }),
        RELAYHOST_PASSWORD: EnvValue.fromSecretValue({
          secret: fastmailSecret,
          key: "SMTP_PASSWORD",
        }),
        // Allow any sender domain (Postal handles domain validation)
        ALLOWED_SENDER_DOMAINS: EnvValue.fromValue("*"),
        // TLS configuration
        POSTFIX_smtp_tls_security_level: EnvValue.fromValue("encrypt"),
        // Listen on non-privileged port
        POSTFIX_myhostname: EnvValue.fromValue("postal.tailnet-1a49.ts.net"),
        // Override default port 25 to 2525
        POSTFIX_inet_interfaces: EnvValue.fromValue("127.0.0.1"),
        POSTFIX_smtpd_port: EnvValue.fromValue("2525"),
      },
      securityContext: {
        ensureNonRoot: false, // Postfix needs root to start
        readOnlyRootFilesystem: false,
      },
      resources: {
        cpu: {
          request: Cpu.millis(50),
          limit: Cpu.millis(500),
        },
        memory: {
          request: Size.mebibytes(64),
          limit: Size.mebibytes(256),
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
  };
}

/**
 * Post-deployment initialization steps:
 *
 * 1. Access Postal Web UI via Tailscale: https://postal.tailnet-xxxx.ts.net
 *
 * 2. Initialize Postal (run once - handled automatically by web container):
 *    The web container runs `postal initialize` before starting the web server.
 *
 * 3. Create initial admin user:
 *    kubectl exec -it <postal-web-pod> -n torvalds -- postal make-user
 *
 * 4. Create organization:
 *    Log into the web UI and create your first organization
 *
 * 5. Create mail server:
 *    Create a mail server within your organization
 *
 * 6. Configure DNS records:
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
