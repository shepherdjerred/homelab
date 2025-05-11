import {
  Deployment,
  DeploymentStrategy,
  type PersistentVolumeClaim,
  Service,
  Volume,
} from "cdk8s-plus";
import { Chart } from "cdk8s";
import {
  LINUXSERVER_GID,
  withCommonLinuxServerProps,
} from "../../utils/linuxserver.ts";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions.ts";
import { ZfsHddVolume } from "../../utils/zfsHddVolume.ts";

export function createSonarrDeployment(chart: Chart, claims: {
  tv: PersistentVolumeClaim;
  downloads: PersistentVolumeClaim;
}) {
  const deployment = new Deployment(chart, "sonarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const localPathVolume = new ZfsSsdVolume(chart, "sonarr-pvc", {});

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/sonarr:${versions["linuxserver/sonarr"]}`,
      portNumber: 8989,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "sonarr-volume",
            localPathVolume.claim,
          ),
        },
        {
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "sonarr-torrents-hdd-volume",
            claims.downloads,
          ),
          path: "/downloads",
        },
        {
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "sonarr-tv-hdd-volume",
            claims.tv,
          ),
          path: "/tv",
        },
      ],
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
