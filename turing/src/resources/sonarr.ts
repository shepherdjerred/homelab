import {
  Deployment,
  DeploymentStrategy,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonLinuxServerProps } from "../utils/linuxserver-io.ts";
import { createLonghornVolume } from "../utils/longhorn_volume.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";

export function createSonarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "sonarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: 1000,
    },
  });

  const claim = createLonghornVolume(chart, "sonarr-pvc");

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "lscr.io/linuxserver/sonarr",
      portNumber: 8989,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "sonarr-volume",
            claim,
          ),
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "sonarr-torrents-bind-mount",
            "sonarr-torrents-bind-mount",
            {
              path: "/mnt/storage/downloads/torrents",
            },
          ),
          path: "/downloads",
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "sonarr-movies-bind-mount",
            "sonarr-movies-bind-mount",
            {
              path: "/mnt/storage/media/tv",
            },
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

  createTailscaleIngress(chart, "sonarr-ingress", {
    service,
    host: "sonarr",
  });
}
