import { Chart, Size } from "cdk8s";
import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus-31";
import { ZfsSsdVolume } from "../misc/zfs-ssd-volume.ts";
import { LINUXSERVER_GID, withCommonLinuxServerProps } from "../misc/linux-server.ts";
import { TailscaleIngress } from "../misc/tailscale.ts";
import versions from "../versions.ts";

export function createSyncthingDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "syncthing", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const configLocalPathVolume = new ZfsSsdVolume(chart, "syncthing-config", {
    storage: Size.gibibytes(8),
  });

  const dataLocalPathVolume = new ZfsSsdVolume(chart, "syncthing-data", {
    storage: Size.gibibytes(64),
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/syncthing:${versions["linuxserver/syncthing"]}`,
      portNumber: 8384,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(chart, "syncthing-volume", configLocalPathVolume.claim),
        },
        {
          path: "/sync",
          volume: Volume.fromPersistentVolumeClaim(chart, "syncthing-data-volume", dataLocalPathVolume.claim),
        },
      ],
    }),
  );

  const service = new Service(chart, "syncthing-service", {
    selector: deployment,
    ports: [{ port: 8384 }],
  });

  new TailscaleIngress(chart, "syncthing-tailscale-ingress", {
    service,
    host: "syncthing",
  });
}
