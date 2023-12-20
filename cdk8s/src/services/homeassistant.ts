import {
  Deployment,
  DeploymentStrategy,
  Protocol,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";
import { LonghornVolume } from "../utils/longhorn.ts";

export function createHomeAssistantDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "homeassistant", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolume = new LonghornVolume(
    chart,
    "homeassistant-pvc-longhorn",
    {},
  );

  deployment.addContainer(
    withCommonProps({
      securityContext: {
        ensureNonRoot: false,
        user: 0,
        group: 0,
        // required
        readOnlyRootFilesystem: false,
      },
      image: "ghcr.io/home-assistant/home-assistant:stable",
      ports: [
        {
          name: "port-8123-web",
          number: 8123,
          protocol: Protocol.TCP,
        },
      ],
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "homeassistant-volume",
            longhornVolume.claim,
          ),
        },
      ],
    }),
  );

  // this simplifies mDNS
  // TODO: remove host networking
  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add("/spec/template/spec/hostNetwork", true),
  );

  const service = new Service(chart, "homeassistant-service", {
    selector: deployment,
    ports: [{ port: 8123 }],
  });

  createTailscaleIngress(chart, "homeassistant-ingress", {
    service,
    host: "homeassistant",
    funnel: true,
  });
}
