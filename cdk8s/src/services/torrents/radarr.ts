import {
  Deployment,
  DeploymentStrategy,
  Service,
  Volume,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import {
  LINUXSERVER_GID,
  withCommonLinuxServerProps,
} from "../../utils/linuxserver.ts";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions/versions.ts";

export function createRadarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "radarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const localPathVolume = new LocalPathVolume(chart, "radarr-pvc", {});

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/radarr:${versions["linuxserver/radarr"]}`,
      portNumber: 7878,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "radarr-volume",
            localPathVolume.claim,
          ),
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "radarr-torrents-bind-mount",
            "radarr-torrents-bind-mount",
            {
              path: "/mnt/storage/downloads/torrents",
            },
          ),
          path: "/downloads",
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "radarr-movies-bind-mount",
            "radarr-movies-bind-mount",
            {
              path: "/mnt/storage/media/movies",
            },
          ),
          path: "/movies",
        },
      ],
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
