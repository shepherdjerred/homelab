import { Deployment, Service, Volume } from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { createLonghornVolume } from "../utils/longhorn_volume.ts";
import { withCommonLinuxServerProps } from "../utils/linuxserver-io.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";

export function createSyncthingDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "syncthing", {
    replicas: 1,
  });

  const claim = createLonghornVolume(chart, "syncthing-pvc");

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
            claim,
          ),
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "syncthing-bind-mount",
            "syncthing-bind-mount",
            {
              path: "/mnt/storage/syncthing",
            },
          ),
          path: "/syncthing",
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
