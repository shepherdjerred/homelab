import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus";
import { Chart } from "cdk8s";
import { ZfsSsdVolume } from "../utils/zfsSsdVolume.ts";
import {
  LINUXSERVER_GID,
  withCommonLinuxServerProps,
} from "../utils/linuxserver.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";
import versions from "../versions.ts";

export function createSyncthingDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "syncthing", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const configLocalPathVolume = new ZfsSsdVolume(
    chart,
    "syncthing-config",
    {},
  );

  const dataLocalPathVolume = new ZfsSsdVolume(
    chart,
    "syncthing-data",
    {},
  );

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/syncthing:${
        versions["linuxserver/syncthing"]
      }`,
      portNumber: 8384,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "syncthing-volume",
            configLocalPathVolume.claim,
          ),
        },
        {
          path: "/sync",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "syncthing-data-volume",
            dataLocalPathVolume.claim,
          ),
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
