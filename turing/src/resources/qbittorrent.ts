import { Deployment, Service, Volume } from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { createLonghornVolume } from "../utils/longhorn_volume.ts";
import { withCommonLinuxServerProps } from "../utils/linuxserver-io.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";

export function createQBitTorrentDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "qbittorrent", {
    replicas: 1,
  });

  const claim = createLonghornVolume(chart, "qbittorrent-pvc", {
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
            claim,
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
