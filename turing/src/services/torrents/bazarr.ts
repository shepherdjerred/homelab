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

export function createBazarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "bazarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const claim = createLonghornVolume(chart, "bazarr-pvc");

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "lscr.io/linuxserver/bazarr",
      portNumber: 6767,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "bazarr-volume",
            claim,
          ),
        },
      ],
    }),
  );

  const service = new Service(chart, "bazarr-service", {
    selector: deployment,
    ports: [{ port: 6767 }],
  });

  createTailscaleIngress(chart, "bazarr-ingress", { service, host: "bazarr" });
}
