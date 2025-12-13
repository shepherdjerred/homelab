import { Cpu, Deployment, DeploymentStrategy, type PersistentVolumeClaim, Service, Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { LINUXSERVER_GID, withCommonLinuxServerProps } from "../../misc/linux-server.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import versions from "../../versions.ts";

export function createRadarrDeployment(
  chart: Chart,
  claims: {
    movies: PersistentVolumeClaim;
    downloads: PersistentVolumeClaim;
  },
) {
  const deployment = new Deployment(chart, "radarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const localPathVolume = new ZfsSsdVolume(chart, "radarr-pvc", {
    storage: Size.gibibytes(8),
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/radarr:${versions["linuxserver/radarr"]}`,
      portNumber: 7878,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(chart, "radarr-volume", localPathVolume.claim),
        },
        {
          volume: Volume.fromPersistentVolumeClaim(chart, "radarr-torrents-hdd-volume", claims.downloads),
          path: "/downloads",
        },
        {
          volume: Volume.fromPersistentVolumeClaim(chart, "radarr-movies-hdd-volume", claims.movies),
          path: "/movies",
        },
      ],
      resources: {
        cpu: {
          request: Cpu.millis(50),
          limit: Cpu.millis(1000),
        },
        memory: {
          request: Size.mebibytes(256),
          limit: Size.mebibytes(768),
        },
      },
    }),
  );

  const service = new Service(chart, "radarr-service", {
    selector: deployment,
    ports: [{ port: 7878 }],
  });

  new TailscaleIngress(chart, "radarr-tailscale-ingress", {
    service,
    host: "radarr",
  });
}
