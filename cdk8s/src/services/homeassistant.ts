import {
  Deployment,
  DeploymentStrategy,
  Protocol,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { createTailscaleIngress } from "../utils/tailscale.ts";

export function createHomeAssistantDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "homeassistant", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  // TODO: add mdns repeater
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
        {
          // homekit
          name: "port-31063",
          number: 31063,
          hostPort: 31063,
          protocol: Protocol.TCP,
        },
        {
          // homekit
          name: "port-31064",
          number: 31064,
          hostPort: 31064,
          protocol: Protocol.TCP,
        },
        {
          // homekit
          name: "port-31065",
          number: 31065,
          hostPort: 31065,
          protocol: Protocol.TCP,
        },
        {
          // homekit
          name: "port-31066",
          number: 31066,
          hostPort: 31066,
          protocol: Protocol.TCP,
        },
      ],
      volumeMounts: [
        {
          volume: Volume.fromHostPath(
            chart,
            "homeassistant-bind-mount",
            "homeassistant-bind-mount",
            {
              path: "/mnt/storage/data/homeassistant-config",
            },
          ),
          path: "/config",
        },
      ],
    }),
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
