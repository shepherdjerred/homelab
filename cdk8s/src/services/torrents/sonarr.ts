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

export function createSonarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "sonarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const localPathVolume = new LocalPathVolume(chart, "sonarr-pvc", {});

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
            "sonarr-tv-bind-mount",
            "sonarr-tv-bind-mount",
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

  new TailscaleIngress(chart, "sonarr-tailscale-ingress", {
    service,
    host: "sonarr",
  });
}
