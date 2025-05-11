import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus";
import { Chart } from "cdk8s";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";
import versions from "../../versions.ts";

export function createStashDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "stash", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolumeData = new ZfsSsdVolume(chart, "stash-data", {});
  const longhornVolumeGenerated = new ZfsSsdVolume(
    chart,
    "stash-generated",
    {},
  );
  const longhornVolumeMetadata = new ZfsSsdVolume(
    chart,
    "stash-metadata",
    {},
  );
  const longhornVolumeBlobs = new ZfsSsdVolume(
    chart,
    "stash-blobs",
    {},
  );
  const longhornVolumeConfig = new ZfsSsdVolume(
    chart,
    "stash-config",
    {},
  );

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
            longhornVolumeData.claim,
          ),
        },
        {
          path: "/generated",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "stash-generated-volume",
            longhornVolumeGenerated.claim,
          ),
        },
        {
          path: "/metadata",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "stash-metadata-volume",
            longhornVolumeMetadata.claim,
          ),
        },
        {
          path: "/blobs",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "stash-blobs-volume",
            longhornVolumeBlobs.claim,
          ),
        },
        {
          path: "/root/.stash",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "stash-config-volume",
            longhornVolumeConfig.claim,
          ),
        },
      ],
    }),
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
