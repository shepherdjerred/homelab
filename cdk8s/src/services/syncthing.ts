import {
  Deployment,
  DeploymentStrategy,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { LonghornVolume } from "../utils/longhorn.ts";
import { withCommonLinuxServerProps } from "../utils/linuxserver.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";

export function createSyncthingDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "syncthing", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
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
      storage: Size.gibibytes(20),
    },
  );

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "lscr.io/linuxserver/syncthing",
      portNumber: 8384,
      volumeMounts: [
        {
          path: "/var/syncthing/",
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

  createTailscaleIngress(chart, "syncthing-ingress", {
    service,
    host: "syncthing",
  });
}
