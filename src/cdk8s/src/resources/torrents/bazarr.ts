import { Deployment, DeploymentStrategy, EnvValue, type PersistentVolumeClaim, Service, Volume } from "cdk8s-plus-31";
import { ApiObject, Chart, JsonPatch, Size } from "cdk8s";
import { withCommonLinuxServerProps } from "../../misc/linux-server.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import versions from "../../versions.ts";

export function createBazarrDeployment(
  chart: Chart,
  claims: {
    tv: PersistentVolumeClaim;
    movies: PersistentVolumeClaim;
  },
) {
  const deployment = new Deployment(chart, "bazarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new ZfsSsdVolume(chart, "bazarr-pvc", {
    storage: Size.gibibytes(8),
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/bazarr:${versions["linuxserver/bazarr"]}`,
      portNumber: 6767,
      envVariables: {
        TZ: EnvValue.fromValue(""),
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(chart, "bazarr-volume", localPathVolume.claim),
        },
        {
          volume: Volume.fromPersistentVolumeClaim(chart, "bazarr-movies-hdd-volume", claims.movies),
          path: "/movies",
        },
        {
          volume: Volume.fromPersistentVolumeClaim(chart, "bazarr-tv-hdd-volume", claims.tv),
          path: "/tv",
        },
      ],
    }),
  );

  // Exclude large media volumes from Velero backups
  // Only backup the config volume, not the 4TB TV and movies volumes
  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add("/spec/template/metadata/annotations", {
      "backup.velero.io/backup-volumes-excludes": "bazarr-tv-hdd-volume,bazarr-movies-hdd-volume",
    }),
  );

  const service = new Service(chart, "bazarr-service", {
    selector: deployment,
    ports: [{ port: 6767 }],
  });

  new TailscaleIngress(chart, "bazarr-tailscale-ingress", {
    service,
    host: "bazarr",
  });
}
