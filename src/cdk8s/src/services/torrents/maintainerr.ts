import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import {
  LINUXSERVER_GID,
  withCommonLinuxServerProps,
} from "../../utils/linuxserver.ts";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions.ts";

export function createMaintainerrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "maintainerr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const localPathVolume = new ZfsSsdVolume(chart, "maintainerr-pvc", {
    storage: Size.gibibytes(8),
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/jorenn92/maintainerr:${versions["jorenn92/maintainerr"]}`,
      portNumber: 6246,
      volumeMounts: [
        {
          path: "/opt/data",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "maintainerr-volume",
            localPathVolume.claim,
          ),
        },
      ],
    }),
  );

  const service = new Service(chart, "maintainerr-service", {
    selector: deployment,
    ports: [{ port: 6246 }],
  });

  new TailscaleIngress(chart, "maintainerr-tailscale-ingress", {
    service,
    host: "maintainerr",
  });
}
