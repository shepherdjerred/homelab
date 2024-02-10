import {
  Deployment,
  DeploymentStrategy,
  Protocol,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch, Size } from "npm:cdk8s";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../utils/common.ts";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";

export function createEspHomeDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "esphome", {
    replicas: 0,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(
    chart,
    "esphome-pvc",
    {},
  );

  deployment.addContainer(
    withCommonProps({
      securityContext: {
        ensureNonRoot: false,
        user: ROOT_UID,
        group: ROOT_GID,
        // required
        readOnlyRootFilesystem: false,
      },
      image: "esphome/esphome",
      ports: [
        {
          name: "port-6052-web",
          number: 6052,
          protocol: Protocol.TCP,
        },
      ],
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "esphome-volume",
            localPathVolume.claim,
          ),
        },
      ],
    }),
  );

  // TODO: remove host networking
  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add("/spec/template/spec/hostNetwork", true),
  );

  const service = new Service(chart, "esphome-service", {
    selector: deployment,
    ports: [{ port: 6052 }],
  });

  new TailscaleIngress(chart, "esphome-tailscale-ingress", {
    service,
    host: "esphome",
    funnel: true,
  });
}
