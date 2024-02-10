import {
  Deployment,
  DeploymentStrategy,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";

export function createProwlarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "prowlarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "prowlarr-pvc", {
    storageClassName: "local-path",
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "lscr.io/linuxserver/prowlarr",
      portNumber: 9696,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "prowlarr-volume",
            localPathVolume.claim,
          ),
        },
      ],
    }),
  );

  const service = new Service(chart, "prowlarr-service", {
    selector: deployment,
    ports: [{ port: 9696 }],
  });

  new TailscaleIngress(chart, "prowlarr-tailscale-ingress", {
    service,
    host: "prowlarr",
  });
}
