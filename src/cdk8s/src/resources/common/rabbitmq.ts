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

    // groundhog2k chart uses: <releaseName>-rabbitmq
    this.serviceName = `${releaseName}-rabbitmq`;

    // Parse the official rabbitmq image version (format: "tag@sha256:...")
    const rabbitmqImage = versions["library/rabbitmq"];
    const [imageTag] = rabbitmqImage.split("@");

    const rabbitmqValues: Record<string, unknown> = {
      // Use official RabbitMQ image from Docker Hub
      image: {
        registry: "docker.io",
        repository: "rabbitmq",
        tag: imageTag,
      },
      auth: {
        username: "postal",
        password: "postal", // TODO: Consider using 1Password for production
        erlangCookie: "postalcookiesecretvalue1234567890", // Required for clustering, must be at least 20 chars
      },
      storage: {
        persistentVolumeClaimName: null,
        requestedSize: props.storageSize ?? "8Gi",
        className: props.storageClass ?? "zfs-ssd",
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
          repoUrl: "https://groundhog2k.github.io/helm-charts/",
          targetRevision: versions["groundhog2k/rabbitmq"],
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
