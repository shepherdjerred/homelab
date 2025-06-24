import { Chart, Size } from "cdk8s";
import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus-31";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";
import { getPersistentVolume } from "../../utils/persistentVolumeMapping.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions.ts";

export function createOverseerrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "overseerr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new ZfsSsdVolume(chart, "overseerr-pvc", {
    storage: Size.gibibytes(8),
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/overseerr:${
        versions["linuxserver/overseerr"]
      }`,
      portNumber: 5055,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "overseerr-volume",
            localPathVolume.claim
          ),
        },
      ],
    })
  );

  const service = new Service(chart, "overseerr-service", {
    selector: deployment,
    ports: [{ port: 5055 }],
  });

  new TailscaleIngress(chart, "overseerr-tailscale-ingress", {
    service,
    host: "overseerr",
    funnel: true,
  });
}
