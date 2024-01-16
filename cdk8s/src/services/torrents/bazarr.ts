import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { LonghornVolume } from "../../utils/longhorn.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";

export function createBazarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "bazarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolume = new LonghornVolume(chart, "bazarr-longhorn", {});

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: "lscr.io/linuxserver/bazarr",
      envVariables: {
        TZ: EnvValue.fromValue(""),
      },
      portNumber: 6767,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "bazarr-volume",
            longhornVolume.claim,
          ),
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "bazarr-movies-bind-mount",
            "bazarr-movies-bind-mount",
            {
              path: "/mnt/storage/media/movies",
            },
          ),
          path: "/movies",
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "bazarr-tv-bind-mount",
            "bazarr-tv-bind-mount",
            {
              path: "/mnt/storage/media/tv",
            },
          ),
          path: "/tv",
        },
      ],
    }),
  );

  const service = new Service(chart, "bazarr-service", {
    selector: deployment,
    ports: [{ port: 6767 }],
  });

  new TailscaleIngress(chart, "bazarr-tailscale-ingress", {
    service,
    host: "bazarr",
  });
}
