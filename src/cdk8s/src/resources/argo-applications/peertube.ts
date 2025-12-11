import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
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
  const redis = new Redis(chart, "peertube-redis");

  // Create ZFS storage for videos
  const videoStorage = new ZfsSsdVolume(chart, "peertube-videos", {
    storage: Size.gibibytes(256),
  });

  // Create Tailscale Funnel ingress
  createIngress(chart, "peertube-ingress", namespace, "peertube", 9000, [hostname], true);

  const peertubeValues = {
    // Use external PostgreSQL from postgres-operator
    postgresql: {
      enabled: false,
    },
    // Use external Redis
    redis: {
      enabled: false,
    },
    // PeerTube configuration
    config: {
      webserver: {
        hostname: `${hostname}.tailnet-1a49.ts.net`,
        https: true,
        port: 443,
      },
      database: {
        hostname: "peertube-postgresql",
        port: 5432,
        name: "peertube",
        username: "peertube",
        // Password will be set via environment variable from secret
      },
      redis: {
        hostname: redis.service.name,
        port: 6379,
      },
      storage: {
        videos: "/data/videos/",
        redundancy: "/data/redundancy/",
        streaming_playlists: "/data/streaming-playlists/",
      },
    },
    // Environment variables for secrets
    extraEnv: [
      {
        name: "PEERTUBE_DB_PASSWORD",
        valueFrom: {
          secretKeyRef: {
            name: "peertube.peertube-postgresql.credentials.postgresql.acid.zalan.do",
            key: "password",
          },
        },
      },
    ],
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
        repoUrl: "https://chocobozzz.github.io/peertube-helm-chart",
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
