import {
  Deployment,
  DeploymentStrategy,
  EmptyDirMedium,
  EnvValue,
  type PersistentVolumeClaim,
  Protocol,
  Secret,
  Service,
  Volume,
} from "cdk8s-plus-31";
import { ApiObject, Chart, JsonPatch, Size } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import versions from "../../versions.ts";
import { ServiceMonitor } from "../../../generated/imports/monitoring.coreos.com.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";

export function createPlexDeployment(
  chart: Chart,
  claims: {
    tv: PersistentVolumeClaim;
    movies: PersistentVolumeClaim;
  },
) {
  const GID = 1000;

  // TODO: create this
  // OnePassword item for Plex token
  const plexSecrets = new OnePasswordItem(chart, "plex-secrets", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/plex-token",
    },
  });

  const deployment = new Deployment(chart, "plex", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  const localPathVolume = new ZfsSsdVolume(chart, "plex-pvc", {
    storage: Size.gibibytes(64),
  });

  deployment.addContainer(
    withCommonProps({
      image: `plexinc/pms-docker:${versions["plexinc/pms-docker"]}`,
      envVariables: {
        ADVERTISE_IP: EnvValue.fromValue("https://plex.tailnet-1a49.ts.net"),
      },
      // https://support.plex.tv/articles/201543147-what-network-ports-do-i-need-to-allow-through-my-firewall/
      ports: [
        {
          name: "port-32400-web",
          number: 32400,
          hostIp: "0.0.0.0",
          hostPort: 32400,
          protocol: Protocol.TCP,
        },
        {
          name: "port-1900-dlna",
          number: 1900,
          hostPort: 1900,
          protocol: Protocol.UDP,
        },
        {
          // bonjour
          name: "port-5353",
          number: 5353,
          hostPort: 5353,
          protocol: Protocol.UDP,
        },
        {
          // companion
          name: "port-3005",
          number: 3005,
          hostPort: 3005,
          protocol: Protocol.TCP,
        },
        {
          name: "port-8324-roku",
          number: 8324,
          hostPort: 8324,
          protocol: Protocol.TCP,
        },
        {
          name: "port-32469-dlna",
          number: 32469,
          hostPort: 32469,
          protocol: Protocol.TCP,
        },
        {
          name: "port-32410-gdm",
          number: 32410,
          hostPort: 32410,
          protocol: Protocol.UDP,
        },
        {
          name: "port-32412-gdm",
          number: 32412,
          hostPort: 32412,
          protocol: Protocol.UDP,
        },
        {
          name: "port-32413-gdm",
          number: 32413,
          hostPort: 32413,
          protocol: Protocol.UDP,
        },
        {
          name: "port-32414-gdm",
          number: 32414,
          hostPort: 32414,
          protocol: Protocol.UDP,
        },
      ],
      // TODO: verify that these are definitely required
      securityContext: {
        allowPrivilegeEscalation: true,
        privileged: true,
        // needed
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(chart, "plex-volume", localPathVolume.claim),
        },
        {
          volume: Volume.fromPersistentVolumeClaim(chart, "plex-tv-hdd-volume", claims.tv),
          path: "/data/tv",
        },
        {
          volume: Volume.fromPersistentVolumeClaim(chart, "plex-movies-hdd-volume", claims.movies),
          path: "/data/movies",
        },
        {
          volume: Volume.fromEmptyDir(chart, "plex-shm-mount", "plex-shm-mount", {
            medium: EmptyDirMedium.MEMORY,
            sizeLimit: Size.gibibytes(8),
          }),
          path: "/transcode",
        },
      ],
    }),
  );

  // Add Prometheus exporter for Plex metrics
  deployment.addContainer(
    withCommonProps({
      name: "plex-exporter",
      image: `ghcr.io/jsclayton/prometheus-plex-exporter:${versions["jsclayton/prometheus-plex-exporter"]}`,
      ports: [{ number: 9594, name: "metrics" }],
      envVariables: {
        PLEX_SERVER: EnvValue.fromValue("http://localhost:32400"),
        PLEX_TOKEN: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "plex-token", plexSecrets.name),
          key: "token",
        }),
        PLEX_LOG_LEVEL: EnvValue.fromValue("info"),
      },
    }),
  );

  const service = new Service(chart, "plex-service", {
    selector: deployment,
    metadata: {
      labels: {
        app: "plex",
      },
    },
    ports: [{ port: 32400 }, { port: 9594, name: "metrics" }],
  });

  new TailscaleIngress(chart, "plex-tailscale-ingress", {
    service,
    host: "plex",
    funnel: true,
  });

  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add("/spec/template/spec/containers/0/resources", {
      limits: {
        "gpu.intel.com/i915": 1,
      },
    }),
  );

  // Exclude large media volumes from Velero backups
  // Only backup the config volume, not the 4TB TV and movies volumes
  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add("/spec/template/metadata/annotations", {
      "backup.velero.io/backup-volumes-excludes": "plex-tv-hdd-volume,plex-movies-hdd-volume",
    }),
  );

  // Create ServiceMonitor for Prometheus to scrape Plex metrics
  new ServiceMonitor(chart, "plex-service-monitor", {
    metadata: {
      name: "plex-service-monitor",
      labels: {
        release: "prometheus", // Required for Prometheus operator discovery
      },
    },
    spec: {
      endpoints: [
        {
          port: "metrics",
          interval: "60s",
          path: "/metrics",
        },
      ],
      selector: {
        matchLabels: {
          app: "plex",
        },
      },
    },
  });
}
