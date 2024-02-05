import {
  Deployment,
  DeploymentStrategy,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { LonghornVolume } from "../utils/longhorn.ts";
import {
  LINUXSERVER_GID,
  withCommonLinuxServerProps,
} from "../utils/linuxserver.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";

export function createSyncthingDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "syncthing", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const configLonghornVolume = new LonghornVolume(
    chart,
    "syncthing-longhorn",
    {},
  );

  const dataLonghornVolume = new LonghornVolume(
    chart,
    "syncthing-data-longhorn",
    {
      storage: Size.gibibytes(50),
    },
  );

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "lscr.io/linuxserver/syncthing",
      portNumber: 8384,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "syncthing-volume",
            configLonghornVolume.claim,
          ),
        },
        {
          path: "/sync",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "syncthing-data-volume",
            dataLonghornVolume.claim,
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
