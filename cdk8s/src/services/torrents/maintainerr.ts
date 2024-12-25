import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus";
import { Chart } from "cdk8s";
import {
  LINUXSERVER_GID,
  withCommonLinuxServerProps,
} from "../../utils/linuxserver.ts";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions.ts";

export function createMaintainerrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "maintainerr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const localPathVolume = new LocalPathVolume(chart, "maintainerr-pvc", {});

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/jorenn92/maintainerr:${versions["jorenn92/maintainerr"]}`,
      portNumber: 6246,
      volumeMounts: [
        {
          path: "/opt/data",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "maintainerr-volume",
            localPathVolume.claim,
          ),
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "maintainerr-torrents-bind-mount",
            "maintainerr-torrents-bind-mount",
            {
              path: "/mnt/storage/downloads/torrents",
            },
          ),
          path: "/downloads",
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "maintainerr-tv-bind-mount",
            "maintainerr-tv-bind-mount",
            {
              path: "/mnt/storage/media/tv",
            },
          ),
          path: "/tv",
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "maintainerr-movies-bind-mount",
            "maintainerr-movies-bind-mount",
            {
              path: "/mnt/storage/media/movies",
            },
          ),
          path: "/movies",
        },
      ],
    }),
  );

  const service = new Service(chart, "maintainerr-service", {
    selector: deployment,
    ports: [{ port: 6246 }],
  });

  new TailscaleIngress(chart, "maintainerr-tailscale-ingress", {
    service,
    host: "maintainerr",
  });
}
