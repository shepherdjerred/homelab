import {
  Deployment,
  DeploymentStrategy,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { createTailscaleIngress } from "../../utils/tailscale.ts";
import { LonghornVolume } from "../../utils/longhorn.ts";

export function createQBitTorrentDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "qbittorrent", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolume = new LonghornVolume(chart, "qbittorrent-longhorn", {
    storage: Size.gibibytes(10),
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "lscr.io/linuxserver/qbittorrent",
      portNumber: 8080,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "qbittorrent-volume",
            longhornVolume.claim,
          ),
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "qbittorrent-bind-mount",
            "qbittorrent-bind-mount",
            {
              path: "/mnt/storage/downloads/torrents",
            },
          ),
          path: "/downloads",
        },
      ],
    }),
  );

  const service = new Service(chart, "qbittorrent-service", {
    selector: deployment,
    ports: [{ port: 8080 }],
  });

  createTailscaleIngress(chart, "qbittorrent-ingress", {
    service,
    host: "qbittorrent",
  });
}
