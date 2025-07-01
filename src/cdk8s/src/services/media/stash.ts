import { Chart, Size } from "cdk8s";
import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus-31";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";
import versions from "../../versions.ts";

export function createStashDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "stash", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolumeData = new ZfsSsdVolume(chart, "stash-data", {
    storage: Size.gibibytes(32),
  });
  const longhornVolumeConfig = new ZfsSsdVolume(chart, "stash-config", {
    storage: Size.gibibytes(8),
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `stashapp/stash:${versions["stashapp/stash"]}`,
      portNumber: 9999,
      volumeMounts: [
        {
          path: "/data",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "stash-data-volume",
            longhornVolumeData.claim
          ),
        },
        {
          path: "/root/.stash",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "stash-config-volume",
            longhornVolumeConfig.claim
          ),
        },
      ],
    })
  );

  const service = new Service(chart, "stash-service", {
    selector: deployment,
    ports: [{ port: 9999 }],
  });

  new TailscaleIngress(chart, "stash-tailscale-ingress", {
    service,
    host: "stash",
  });
}
