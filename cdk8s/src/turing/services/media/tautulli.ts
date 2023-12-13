import {
  Deployment,
  DeploymentStrategy,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { createLonghornVolume } from "../../utils/longhorn.ts";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { createTailscaleIngress } from "../../utils/tailscale.ts";

export function createTautulliDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "tautulli", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const claim = createLonghornVolume(chart, "tautulli-pvc");

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "lscr.io/linuxserver/tautulli",
      portNumber: 8181,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "tautulli-volume",
            claim,
          ),
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "tautulli-bind-mount",
            "tautulli-bind-mount",
            {
              path: "/mnt/storage/plex/Plex Media Server/Logs",
            },
          ),
          path: "/plex_logs",
        },
      ],
    }),
  );

  const service = new Service(chart, "tautulli-service", {
    selector: deployment,
    ports: [{ port: 8181 }],
  });

  createTailscaleIngress(chart, "tautulli-ingress", {
    service,
    host: "tautulli",
  });
}
