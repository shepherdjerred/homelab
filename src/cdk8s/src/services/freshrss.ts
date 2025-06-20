import { Chart, Size } from "cdk8s";
import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus-31";
import { withCommonProps } from "../utils/common.ts";
import { ZfsSsdVolume } from "../utils/zfsSsdVolume.ts";
import { getPersistentVolume } from "../utils/persistentVolumeMapping.ts";
import versions from "../versions.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";

export function createFreshRssDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "freshrss", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const freshRssDataVolume = new ZfsSsdVolume(chart, "freshrss-data", {
    storage: Size.gibibytes(32),
    volume: getPersistentVolume(chart, "freshrss-data"),
  });
  const freshRssExtensionsVolme = new ZfsSsdVolume(
    chart,
    "freshrss-extensions",
    {
      storage: Size.gibibytes(8),
      volume: getPersistentVolume(chart, "freshrss-extensions"),
    }
  );

  deployment.addContainer(
    withCommonProps({
      image: `freshrss/freshrss:${versions["freshrss/freshrss"]}`,
      securityContext: {
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
        {
          path: "/var/www/FreshRSS/data",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "freshrss-data-volume",
            freshRssDataVolume.claim
          ),
        },
        {
          path: "/var/www/FreshRSS/extensions",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "freshrss-extensions-volume",
            freshRssExtensionsVolme.claim
          ),
        },
      ],
    })
  );

  const service = new Service(chart, "freshrss-service", {
    selector: deployment,
    ports: [{ port: 80 }],
  });

  new TailscaleIngress(chart, "freshrss-tailscale-ingress", {
    service,
    host: "freshrss",
    funnel: true,
  });
}
