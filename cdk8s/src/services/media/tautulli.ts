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
import versions from "../../versions/versions.ts";

export function createTautulliDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "tautulli", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "tautulli-pvc", {});

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `https://ghcr.io/linuxserver/tautulli:${
        versions["linuxserver/tautulli"]
      }`,
      portNumber: 8181,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "tautulli-volume",
            localPathVolume.claim,
          ),
        },
      ],
    }),
  );

  const service = new Service(chart, "tautulli-service", {
    selector: deployment,
    ports: [{ port: 8181 }],
  });

  new TailscaleIngress(chart, "tautulli-tailscale-ingress", {
    service,
    host: "tautulli",
  });
}
