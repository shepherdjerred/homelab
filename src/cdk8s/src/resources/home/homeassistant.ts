import { ConfigMap, Deployment, DeploymentStrategy, Protocol, Service, Volume } from "cdk8s-plus-31";
import { ApiObject, Chart, JsonPatch, Size } from "cdk8s";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../../misc/common.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import versions from "../../versions.ts";

export function createHomeAssistantDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "homeassistant", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const claim = new ZfsSsdVolume(chart, "homeassistant-pvc", {
    storage: Size.gibibytes(64),
  });

  const volume = Volume.fromPersistentVolumeClaim(chart, "homeassistant-volume", claim.claim);

  const config = new ConfigMap(chart, "ha-cm");
  config.addDirectory(`${import.meta.dir}/../../../config/homeassistant`);
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
      image: `ghcr.io/home-assistant/home-assistant:${versions["home-assistant/home-assistant"]}`,
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
        {
          path: "/config",
          volume: configVolume,
        },
      ],
    }),
  );

  // this simplifies mDNS
  // TODO: remove host networking -- might not be possible with Talos
  ApiObject.of(deployment).addJsonPatch(JsonPatch.add("/spec/template/spec/hostNetwork", true));

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
