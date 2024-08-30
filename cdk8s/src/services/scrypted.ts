import {
  Deployment,
  DeploymentStrategy,
  Protocol,
  Service,
  Volume,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { ApiObject, Chart, JsonPatch } from "https://esm.sh/cdk8s@2.68.58";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../utils/common.ts";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";
import versions from "../versions/versions.ts";

export function createScryptedDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "scrypted", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(
    chart,
    "scrypted-pvc",
    {},
  );

  deployment.addContainer(
    withCommonProps({
      securityContext: {
        ensureNonRoot: false,
        user: ROOT_UID,
        group: ROOT_GID,
        readOnlyRootFilesystem: false,
      },
      image: `ghcr.io/koush/scrypted:${versions["koush/scrypted"]}`,
      ports: [
        {
          name: "port-6052-web",
          number: 6052,
          protocol: Protocol.TCP,
        },
      ],
      volumeMounts: [
        {
          volume: Volume.fromHostPath(
            chart,
            "nvr-bind-mount",
            "nvr-bind-mount",
            {
              path: "/mnt/storage/nvr/",
            },
          ),
          path: "/nvr",
        },
        {
          path: "/server/volume",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "scrypted-volume",
            localPathVolume.claim,
          ),
        },
      ],
    }),
  );

  // this simplifies cameras
  // TODO: remove host networking
  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add("/spec/template/spec/hostNetwork", true),
  );

  const service = new Service(chart, "scrypted-service", {
    selector: deployment,
    ports: [{ port: 11080 }],
  });

  new TailscaleIngress(chart, "scrypted-tailscale-ingress", {
    service,
    host: "scrypted",
    funnel: true,
  });

  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add(
      "/spec/template/spec/containers/0/resources",
      {
        limits: {
          "gpu.intel.com/i915": 1,
        },
      },
    ),
  );
}
