import {
  Deployment,
  DeploymentStrategy,
  Service,
  Volume,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import {
  LINUXSERVER_GID,
  withCommonLinuxServerProps,
} from "../utils/linuxserver.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";
import versions from "../versions/versions.ts";

export function createSyncthingDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "syncthing", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  const configLocalPathVolume = new LocalPathVolume(
    chart,
    "syncthing-config",
    {},
  );

  const dataLocalPathVolume = new LocalPathVolume(
    chart,
    "syncthing-data",
    {},
  );

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/syncthing:${
        versions["linuxserver/syncthing"]
      }`,
      portNumber: 8384,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "syncthing-volume",
            configLocalPathVolume.claim,
          ),
        },
        {
          path: "/sync",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "syncthing-data-volume",
            dataLocalPathVolume.claim,
          ),
        },
      ],
    }),
  );

  const service = new Service(chart, "syncthing-service", {
    selector: deployment,
    ports: [{ port: 8384 }],
  });

  new TailscaleIngress(chart, "syncthing-tailscale-ingress", {
    service,
    host: "syncthing",
  });
}
