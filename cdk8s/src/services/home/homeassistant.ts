import {
  ConfigMap,
  Deployment,
  DeploymentStrategy,
  Protocol,
  Service,
  Volume,
} from "cdk8s-plus";
import { ApiObject, Chart, JsonPatch } from "cdk8s";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../../utils/common.ts";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import {
  ReplicationSource,
  ReplicationSourceSpecResticCopyMethod,
} from "../../../imports/volsync.backube.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import versions from "../../versions.ts";

export function createHomeAssistantDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "homeassistant", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const claim = new LocalPathVolume(
    chart,
    "homeassistant-pvc",
    {},
  );

  const volume = Volume.fromPersistentVolumeClaim(
    chart,
    "homeassistant-volume",
    claim.claim,
  );

  const resticOnepasswordItem = new OnePasswordItem(
    chart,
    "homeassistant-restic-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/rm4mkzt3quaa7x2digkkfbamou",
      },
      metadata: {
        name: "homeassistant-restic-onepassword-item",
      },
    },
  );

  new ReplicationSource(chart, "homeassistant-replication-source", {
    spec: {
      sourcePvc: claim.claim.name,
      trigger: {
        schedule: "*/15 * * * *",
      },
      restic: {
        repository: resticOnepasswordItem.name,
        copyMethod: ReplicationSourceSpecResticCopyMethod.DIRECT,
        pruneIntervalDays: 7,
        retain: {
          daily: 7,
          weekly: 4,
          monthly: 12,
        },
      },
    },
  });

  const files = Array.from(Deno.readDirSync("config/homeassistant"))
    .filter((entry) => entry.isFile)
    .map((entry) => entry.name);

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
        ...(files.map((file) => {
          return {
            path: `/config/${file}`,
            subPath: file,
            volume: configVolume,
          };
        })),
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
