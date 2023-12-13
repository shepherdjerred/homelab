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

export function createOverseerrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "overseerr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const claim = createLonghornVolume(chart, "overseerr-pvc");

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "lscr.io/linuxserver/overseerr",
      portNumber: 5055,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "overseerr-volume",
            claim,
          ),
        },
      ],
    }),
  );

  const service = new Service(chart, "overseerr-service", {
    selector: deployment,
    ports: [{ port: 5055 }],
  });

  createTailscaleIngress(chart, "overseerr-ingress", {
    service,
    host: "overseerr",
    funnel: true,
  });
}
