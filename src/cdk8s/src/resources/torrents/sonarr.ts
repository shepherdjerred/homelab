import { Deployment, DeploymentStrategy, type PersistentVolumeClaim, Service, Volume } from "cdk8s-plus-31";
import { ApiObject, Chart, JsonPatch, Size } from "cdk8s";
import { LINUXSERVER_GID, withCommonLinuxServerProps } from "../../misc/linux-server.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import versions from "../../versions.ts";

export function createSonarrDeployment(
  chart: Chart,
  claims: {
    tv: PersistentVolumeClaim;
    downloads: PersistentVolumeClaim;
  },
) {
  const deployment = new Deployment(chart, "sonarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const localPathVolume = new ZfsSsdVolume(chart, "sonarr-pvc", {
    storage: Size.gibibytes(8),
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/sonarr:${versions["linuxserver/sonarr"]}`,
      portNumber: 8989,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(chart, "sonarr-volume", localPathVolume.claim),
        },
        {
          volume: Volume.fromPersistentVolumeClaim(chart, "sonarr-torrents-hdd-volume", claims.downloads),
          path: "/downloads",
        },
        {
          volume: Volume.fromPersistentVolumeClaim(chart, "sonarr-tv-hdd-volume", claims.tv),
          path: "/tv",
        },
      ],
    }),
  );

  // Exclude large media volumes from Velero backups
  // Only backup the config volume, not the 4TB TV and 1TB downloads volumes
  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add("/spec/template/metadata/annotations", {
      "backup.velero.io/backup-volumes-excludes": "sonarr-tv-hdd-volume,sonarr-torrents-hdd-volume",
    }),
  );

  const service = new Service(chart, "sonarr-service", {
    selector: deployment,
    ports: [{ port: 8989 }],
  });

  new TailscaleIngress(chart, "sonarr-tailscale-ingress", {
    service,
    host: "sonarr",
  });
}
