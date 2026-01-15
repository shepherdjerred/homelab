import { Chart, Size } from "cdk8s";
import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus-31";
import { withCommonLinuxServerProps } from "../../misc/linux-server.ts";
import { ZfsNvmeVolume } from "../../misc/zfs-nvme-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import versions from "../../versions.ts";

export function createProwlarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "prowlarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new ZfsNvmeVolume(chart, "prowlarr-pvc", {
    storage: Size.gibibytes(8),
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/prowlarr:${versions["linuxserver/prowlarr"]}`,
      portNumber: 9696,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(chart, "prowlarr-volume", localPathVolume.claim),
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
