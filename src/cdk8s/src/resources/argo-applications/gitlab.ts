import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { createCloudflareTunnelBinding } from "../../misc/cloudflare-tunnel.ts";
import { createGitlabPostgreSQLDatabase } from "../postgres/gitlab-db.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";

export function createGitlabApp(chart: Chart) {
  // Create namespace with privileged pod security for GitLab components
  new Namespace(chart, "gitlab-namespace", {
    metadata: {
      name: "gitlab",
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
        "pod-security.kubernetes.io/audit": "privileged",
        "pod-security.kubernetes.io/warn": "privileged",
      },
    },
  });

  // Create PostgreSQL database for GitLab
  createGitlabPostgreSQLDatabase(chart);

  // Create Tailscale ingress for GitLab webservice
  createIngress(chart, "gitlab-ingress", "gitlab", "gitlab-webservice-default", 8181, ["gitlab"], true);

  createCloudflareTunnelBinding(chart, "gitlab-cf-tunnel", {
    serviceName: "gitlab-webservice-default",
    subdomain: "gitlab",
    namespace: "gitlab",
  });

  const gitlabValues: HelmValuesForChart<"gitlab"> = {
    // Skip upgrade check for fresh installations
    upgradeCheck: {
      enabled: false,
    },
    global: {
      // Domain configuration for Tailscale access
      hosts: {
        domain: "tailnet-1a49.ts.net",
        https: true,
        gitlab: {
          name: "gitlab.tailnet-1a49.ts.net",
        },
        registry: {
          name: "registry.gitlab.tailnet-1a49.ts.net",
        },
        minio: {
          name: "minio.gitlab.tailnet-1a49.ts.net",
        },
      },
      // Disable ingress - we use Tailscale
      ingress: {
        enabled: false,
        configureCertmanager: false,
      },
      // External PostgreSQL configuration
      psql: {
        password: {
          secret: "gitlab.gitlab-postgresql.credentials.postgresql.acid.zalan.do",
          key: "password",
        },
        main: {
          host: "gitlab-postgresql",
          port: 5432,
          database: "gitlabhq_production",
          username: "gitlab",
        },
      },
      // Use built-in Redis (simpler for homelab)
      redis: {
        auth: {
          enabled: true,
        },
      },
      // Use bundled MinIO for object storage (artifacts, lfs, uploads, packages, backups)
      // Required for GitLab to function - disabling requires external S3 configuration
      minio: {
        enabled: true,
      },
      // Monitoring
      monitoring: {
        enabled: true,
      },
      // GitLab shell configuration
      shell: {
        tcp: {
          proxyProtocol: false,
        },
      },
      // Deploy Community Edition for homelab
      edition: "ce",
      // Gitaly configuration
      gitaly: {
        enabled: true,
      },
    },
    // Disable bundled PostgreSQL - we use postgres-operator
    postgresql: {
      install: false,
    },
    // Disable bundled nginx-ingress - we use Tailscale
    "nginx-ingress": {
      enabled: false,
    },
    // Disable certmanager - we have our own cert-manager
    installCertmanager: false,
    // Disable prometheus - we have our own monitoring stack
    prometheus: {
      install: false,
    },
    // GitLab component configurations
    gitlab: {
      webservice: {
        minReplicas: 1,
        maxReplicas: 2,
        resources: {
          requests: {
            cpu: "300m",
            memory: "1.5Gi",
          },
          limits: {
            cpu: "2000m",
            memory: "4Gi",
          },
        },
      },
      sidekiq: {
        minReplicas: 1,
        maxReplicas: 2,
        resources: {
          requests: {
            cpu: "200m",
            memory: "1Gi",
          },
          limits: {
            cpu: "1000m",
            memory: "2Gi",
          },
        },
      },
      gitaly: {
        persistence: {
          enabled: true,
          size: "100Gi",
          storageClass: "zfs-ssd",
        },
        resources: {
          requests: {
            cpu: "200m",
            memory: "512Mi",
          },
          limits: {
            cpu: "1000m",
            memory: "2Gi",
          },
        },
      },
      "gitlab-shell": {
        minReplicas: 1,
        maxReplicas: 2,
      },
      toolbox: {
        replicas: 1,
      },
    },
    // Redis configuration (bundled)
    redis: {
      install: true,
      architecture: "standalone",
      master: {
        persistence: {
          enabled: true,
          storageClass: "zfs-ssd",
          size: "8Gi",
        },
      },
    },
    // Registry configuration
    registry: {
      enabled: true,
      persistence: {
        enabled: true,
        size: "50Gi",
        storageClass: "zfs-ssd",
      },
    },
    // MinIO (bundled S3-compatible object storage)
    minio: {
      persistence: {
        enabled: true,
        size: "50Gi",
        storageClass: "zfs-ssd",
      },
    },
  };

  return new Application(chart, "gitlab-app", {
    metadata: {
      name: "gitlab",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://charts.gitlab.io/",
        chart: "gitlab",
        targetRevision: versions.gitlab,
        helm: {
          valuesObject: gitlabValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "gitlab",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true", "ServerSideApply=true"],
      },
      // Ignore status and other frequently changing fields
      ignoreDifferences: [
        {
          group: "apiextensions.k8s.io",
          kind: "CustomResourceDefinition",
          jsonPointers: ["/status"],
        },
      ],
    },
  });
}
