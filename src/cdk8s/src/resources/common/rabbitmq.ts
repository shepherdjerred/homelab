import { Construct } from "constructs";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";

export type RabbitMQProps = {
  /**
   * The namespace to deploy RabbitMQ into.
   */
  namespace: string;
  /**
   * Storage class for persistence. Defaults to "zfs-ssd".
   */
  storageClass?: string;
  /**
   * Storage size for RabbitMQ data. Defaults to "8Gi".
   */
  storageSize?: string;
};

export class RabbitMQ extends Construct {
  /**
   * The service name to connect to RabbitMQ (e.g., for use in RABBITMQ_HOST env vars).
   */
  public readonly serviceName: string;

  /**
   * The ArgoCD Application resource.
   */
  public readonly application: Application;

  constructor(scope: Construct, id: string, props: RabbitMQProps) {
    super(scope, id);

    const releaseName = id;

    // Bitnami RabbitMQ service name format
    this.serviceName = `${releaseName}-rabbitmq`;

    const rabbitmqValues: Record<string, unknown> = {
      auth: {
        username: "postal",
        password: "postal", // TODO: Consider using 1Password for production
        erlangCookie: "postalcookie", // Required for clustering
      },
      persistence: {
        enabled: true,
        storageClass: props.storageClass ?? "zfs-ssd",
        size: props.storageSize ?? "8Gi",
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
      // Resource limits
      resources: {
        requests: {
          cpu: "250m",
          memory: "512Mi",
        },
        limits: {
          cpu: "1000m",
          memory: "2Gi",
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
          targetRevision: versions.rabbitmq,
          chart: "rabbitmq",
          helm: {
            releaseName: releaseName,
            valuesObject: rabbitmqValues,
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
