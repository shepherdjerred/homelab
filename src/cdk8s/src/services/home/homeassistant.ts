import {
  ConfigMap,
  Deployment,
  DeploymentStrategy,
  Protocol,
  Service,
  Volume,
} from "cdk8s-plus-31";
import { ApiObject, Chart, JsonPatch, Size } from "cdk8s";
import { readdirSync, statSync } from "fs";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../../utils/common.ts";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions.ts";

export function createHomeAssistantDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "homeassistant", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const claim = new ZfsSsdVolume(chart, "homeassistant-pvc", {
    storage: Size.gibibytes(64),
  });

  const volume = Volume.fromPersistentVolumeClaim(
    chart,
    "homeassistant-volume",
    claim.claim,
  );

  const files = readdirSync("config/homeassistant")
    .filter((entry) => statSync(`config/homeassistant/${entry}`).isFile())
    .map((entry) => entry);

  const config = new ConfigMap(chart, "ha-cm");
  config.addDirectory("config/homeassistant");
  const configVolume = Volume.fromConfigMap(chart, "ha-cm-volume", config);

  deployment.addContainer(
    withCommonProps({
      securityContext: {
        ensureNonRoot: false,
        user: ROOT_UID,
        group: ROOT_GID,
        // required
        readOnlyRootFilesystem: false,
        privileged: true,
        allowPrivilegeEscalation: true,
      },
      image: `ghcr.io/home-assistant/home-assistant:${
        versions["home-assistant/home-assistant"]
      }`,
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
          volume,
        },
        ...files.map((file) => {
          return {
            path: `/config/${file}`,
            subPath: file,
            volume: configVolume,
          };
        }),
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
