import { Deployment, DeploymentStrategy, EnvValue, type PersistentVolumeClaim, Service, Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions.ts";

export function createBazarrDeployment(
  chart: Chart,
  claims: {
    tv: PersistentVolumeClaim;
    movies: PersistentVolumeClaim;
  },
) {
  const deployment = new Deployment(chart, "bazarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new ZfsSsdVolume(chart, "bazarr-pvc", {
    storage: Size.gibibytes(8),
  });

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/bazarr:${versions["linuxserver/bazarr"]}`,
      portNumber: 6767,
      envVariables: {
        TZ: EnvValue.fromValue(""),
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(chart, "bazarr-volume", localPathVolume.claim),
        },
        {
          volume: Volume.fromPersistentVolumeClaim(chart, "bazarr-movies-hdd-volume", claims.movies),
          path: "/movies",
        },
        {
          volume: Volume.fromPersistentVolumeClaim(chart, "bazarr-tv-hdd-volume", claims.tv),
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
