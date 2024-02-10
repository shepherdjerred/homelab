import {
  Deployment,
  DeploymentStrategy,
  Protocol,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../utils/common.ts";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";

export function createHomeAssistantDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "homeassistant", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(
    chart,
    "homeassistant-pvc",
    {
      storageClassName: "local-path",
    },
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
            localPathVolume.claim,
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

  new TailscaleIngress(chart, "homeassistant-tailscale-ingress", {
    service,
    host: "homeassistant",
    funnel: true,
  });
}
