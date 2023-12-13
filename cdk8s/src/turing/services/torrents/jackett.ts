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

export function createJackettDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "jackett", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const claim = createLonghornVolume(chart, "jackett-pvc");

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "lscr.io/linuxserver/jackett",
      portNumber: 9117,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "jackett-volume",
            claim,
          ),
        },
      ],
    }),
  );

  const service = new Service(chart, "jackett-service", {
    selector: deployment,
    ports: [{ port: 9117 }],
  });

  createTailscaleIngress(chart, "jackett-ingress", {
    service,
    host: "jackett",
  });
}
