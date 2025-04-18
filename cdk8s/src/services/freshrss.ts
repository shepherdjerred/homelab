import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus";
import { Chart } from "cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import versions from "../versions.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";

export function createFreshRssDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "freshrss", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const freshRssDataVolume = new LocalPathVolume(chart, "freshrss-data", {});
  const freshRssExtensionsVolme = new LocalPathVolume(
    chart,
    "freshrss-extensions",
    {},
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
            freshRssDataVolume.claim,
          ),
        },
        {
          path: "/var/www/FreshRSS/extensions",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "freshrss-extensions-volume",
            freshRssExtensionsVolme.claim,
          ),
        },
      ],
    }),
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
