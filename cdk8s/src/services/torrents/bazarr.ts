import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions/versions.ts";

export function createBazarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "bazarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "bazarr-pvc", {});

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `https://lscr.io/linuxserver/bazarr:${
        versions["linuxserver/bazarr"]
      }`,
      portNumber: 6767,
      envVariables: {
        TZ: EnvValue.fromValue(""),
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "bazarr-volume",
            localPathVolume.claim,
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

  // TODO: do this for all services
  // setup IPv6
  ApiObject.of(service).addJsonPatch(
    JsonPatch.add("/spec/ipFamilyPolicy", "RequireDualStack"),
  );

  new TailscaleIngress(chart, "bazarr-tailscale-ingress", {
    service,
    host: "bazarr",
  });
}
