import {
  Deployment,
  Ingress,
  IngressBackend,
  Protocol,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";

export function createHomeAssistantDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "homeassistant", {
    replicas: 1,
  });

  // TODO: add mdns repeater
  deployment.addContainer({
    image: "ghcr.io/home-assistant/home-assistant:stable",
    ports: [
      {
        name: "port-8123-web",
        number: 8123,
        protocol: Protocol.TCP,
      },
      {
        // homekit
        name: "port-5353",
        number: 5353,
        protocol: Protocol.TCP,
      },
      {
        // homekit
        name: "port-21063",
        number: 21063,
        protocol: Protocol.TCP,
      },
      {
        // homekit
        name: "port-21064",
        number: 21064,
        protocol: Protocol.TCP,
      },
      {
        // homekit
        name: "port-21065",
        number: 21065,
        protocol: Protocol.TCP,
      },
      {
        // homekit
        name: "port-21066",
        number: 21066,
        protocol: Protocol.TCP,
      },
    ],
    securityContext: {
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
    },
    resources: {},
    volumeMounts: [
      {
        volume: Volume.fromHostPath(
          chart,
          "homeassistant-bind-mount",
          "homeassistant-bind-mount",
          {
            path: "/mnt/storage/data/homeassistant-config",
          }
        ),
        path: "/config",
      },
    ],
  });

  const service = new Service(chart, "homeassistant-service", {
    selector: deployment,
    ports: [{ name: "https", port: 443, targetPort: 8123 }],
  });

  const ingress = new Ingress(chart, "homeassistant-ingress", {
    defaultBackend: IngressBackend.fromService(service, {
      port: 443,
    }),
    tls: [
      {
        hosts: ["homeassistant"],
      },
    ],
  });

  ApiObject.of(ingress).addJsonPatch(
    JsonPatch.add("/spec/ingressClassName", "tailscale")
  );
}
