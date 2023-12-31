import {
  Deployment,
  DeploymentStrategy,
  Protocol,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { TailscaleIngress } from "../utils/tailscale.ts";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../utils/common.ts";
import { LonghornVolume } from "../utils/longhorn.ts";

export function createPikaraokeDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "pikaraoke", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolume = new LonghornVolume(chart, "pikaraoke-longhorn", {});

  deployment.addContainer(
    withCommonProps({
      image: "ghcr.io/shepherdjerred/pikaraoke",
      ports: [{
        name: "port-5555-web",
        number: 5555,
        protocol: Protocol.TCP,
      }],
      volumeMounts: [
        {
          path: "/root/pikaraoke-songs",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "pikaraoke-volume",
            longhornVolume.claim,
          ),
        },
      ],
      securityContext: {
        user: ROOT_UID,
        group: ROOT_GID,
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
      },
    }),
  );

  const service = new Service(chart, "pikaraoke-service", {
    selector: deployment,
    ports: [{ port: 5555 }],
  });

  new TailscaleIngress(chart, "pikaraoke-tailscale-ingress", {
    service,
    funnel: true,
    host: "pikaraoke",
  });
}
