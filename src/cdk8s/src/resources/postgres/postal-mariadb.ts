import { Construct } from "constructs";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";

export type PostalMariaDBProps = {
  /**
   * The namespace to deploy MariaDB into.
   */
  namespace: string;
  /**
   * Storage class for persistence. Defaults to "zfs-ssd".
   */
  storageClass?: string;
  /**
   * Storage size for MariaDB data. Defaults to "32Gi".
   */
  storageSize?: string;
};

export class PostalMariaDB extends Construct {
  /**
   * The service name to connect to MariaDB (e.g., for use in DB_HOST env vars).
   */
  public readonly serviceName: string;

  /**
   * The ArgoCD Application resource.
   */
  public readonly application: Application;

  /**
   * Database name for Postal.
   */
  public readonly databaseName = "postal";

  /**
   * Username for Postal database access.
   */
  public readonly username = "postal";

  /**
   * Password for Postal database access (TODO: use 1Password in production).
   */
  public readonly password = "postal";

  constructor(scope: Construct, id: string, props: PostalMariaDBProps) {
    super(scope, id);

    const releaseName = id;

    // Bitnami MariaDB service name is just the release name
    this.serviceName = releaseName;

    const mariadbValues: Record<string, unknown> = {
      auth: {
        rootPassword: "postalroot", // TODO: Consider using 1Password for production
        username: this.username,
        password: this.password,
        database: this.databaseName,
      },
      primary: {
        persistence: {
          enabled: true,
          storageClass: props.storageClass ?? "zfs-ssd",
          size: props.storageSize ?? "32Gi",
        },
        resources: {
          requests: {
            cpu: "250m",
            memory: "512Mi",
          },
          limits: {
            cpu: "2000m",
            memory: "4Gi",
          },
        },
        // MariaDB configuration optimized for mail server
        configuration: `
[mysqld]
max_connections = 200
innodb_buffer_pool_size = 2G
innodb_log_file_size = 512M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT
query_cache_size = 0
query_cache_type = 0
max_allowed_packet = 64M
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
        `,
      },
      // Enable metrics for monitoring
      metrics: {
        enabled: true,
        serviceMonitor: {
          enabled: true,
          additionalLabels: {
            release: "prometheus",
          },
        },
      },
    };

    this.application = new Application(scope, `${id}-app`, {
      metadata: {
        name: id,
        namespace: "argocd",
      },
      spec: {
        project: "default",
        source: {
          repoUrl: "https://charts.bitnami.com/bitnami",
          targetRevision: versions.mariadb,
          chart: "mariadb",
          helm: {
            releaseName: releaseName,
            valuesObject: mariadbValues,
          },
        },
        destination: {
          server: "https://kubernetes.default.svc",
          namespace: props.namespace,
        },
        syncPolicy: {
          automated: {},
          syncOptions: ["CreateNamespace=true"],
        },
      },
    });
  }
}
