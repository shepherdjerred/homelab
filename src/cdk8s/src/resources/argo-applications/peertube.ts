import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { Namespace, Secret } from "cdk8s-plus-31";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { createPeertubePostgreSQLDatabase } from "../postgres/peertube-db.ts";
import { Redis } from "../common/redis.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";

export function createPeertubeApp(chart: Chart) {
  const namespace = "peertube";
  const hostname = "peertube";

  // Create namespace with privileged pod security
  new Namespace(chart, "peertube-namespace", {
    metadata: {
      name: namespace,
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
        "pod-security.kubernetes.io/audit": "privileged",
        "pod-security.kubernetes.io/warn": "privileged",
      },
    },
  });

  // Create PostgreSQL database for PeerTube
  createPeertubePostgreSQLDatabase(chart);

  // Create Redis for PeerTube
  const redis = new Redis(chart, "peertube-redis", { namespace });

  // Create dummy SMTP secret (the chart requires SMTP secret keys even if SMTP is not configured)
  const smtpSecret = new Secret(chart, "peertube-smtp-secret", {
    metadata: {
      name: "peertube-smtp",
      namespace: namespace,
    },
    stringData: {
      host: "",
      port: "",
      username: "",
      password: "",
    },
  });

  // Create ZFS storage for videos
  const videoStorage = new ZfsSsdVolume(chart, "peertube-videos", {
    storage: Size.gibibytes(256),
  });

  // Create Tailscale Funnel ingress
  createIngress(chart, "peertube-ingress", namespace, "peertube", 9000, [hostname], true);

  const peertubeValues = {
    // Disable bundled PostgreSQL - we use postgres-operator
    postgresql: {
      enabled: false,
    },
    // Disable bundled Valkey - we use external Redis
    valkey: {
      enabled: false,
    },
    // External PostgreSQL from postgres-operator
    externalDatabase: {
      enabled: true,
      hostname: "peertube-postgresql",
      database: "peertube",
      username: "peertube",
      existingSecret: "peertube.peertube-postgresql.credentials.postgresql.acid.zalan.do",
      existingSecretKeys: {
        password: "password",
      },
    },
    // External Redis
    externalValkey: {
      enabled: true,
      hostname: redis.serviceName,
    },
    // PeerTube configuration
    peertube: {
      webserver: {
        hostname: `${hostname}.tailnet-1a49.ts.net`,
        https: true,
        port: 443,
      },
      secret: "", // Will be auto-generated or can be set via existingSecret
      // SMTP configuration - the chart requires these keys even if SMTP is not used
      smtp: {
        existingSecret: smtpSecret.name,
        existingSecretKeys: {
          host: "host",
          port: "port",
          username: "username",
          password: "password",
        },
      },
    },
    // Persistence configuration
    persistence: {
      enabled: true,
      existingClaim: videoStorage.claim.name,
    },
    // Service configuration
    service: {
      type: "ClusterIP",
      port: 9000,
    },
    // Resource limits
    resources: {
      requests: {
        cpu: "250m",
        memory: "512Mi",
      },
      limits: {
        cpu: "2000m",
        memory: "2Gi",
      },
    },
  };

  return new Application(chart, "peertube-app", {
    metadata: {
      name: "peertube",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://small-hack.github.io/peertube-helm-chart",
        chart: "peertube",
        targetRevision: versions.peertube,
        helm: {
          valuesObject: peertubeValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: namespace,
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
