import {
  ConfigMap,
  Deployment,
  DeploymentStrategy,
  Protocol,
  Service,
  Volume,
} from "cdk8s-plus";
import { ApiObject, Chart, JsonPatch } from "cdk8s";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../utils/common.ts";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";
import {
  ReplicationSource,
  ReplicationSourceSpecResticCopyMethod,
} from "../../imports/volsync.backube.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import versions from "../versions/versions.ts";

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

  const automationsYml = Deno.readTextFileSync(
    "config/homeassistant/automations.yaml",
  );
  const configurationYml = Deno.readTextFileSync(
    "config/homeassistant/configuration.yaml",
  );
  const scenesYml = Deno.readTextFileSync("config/homeassistant/scenes.yaml");
  const scriptsYml = Deno.readTextFileSync("config/homeassistant/scripts.yaml");

  const escape = (str: string) =>
    str.replace(/{{/g, "\\{\\{").replace(/}}/g, "\\}\\}");

  const config = new ConfigMap(chart, "ha-conf");
  config.addData("automations.yaml", escape(automationsYml));
  config.addData("configuration.yaml", escape(configurationYml));
  config.addData("scenes.yaml", escape(scenesYml));
  config.addData("scripts.yaml", escape(scriptsYml));

  deployment.addContainer(
    withCommonProps({
      securityContext: {
        ensureNonRoot: false,
        user: ROOT_UID,
        group: ROOT_GID,
        // required
        readOnlyRootFilesystem: false,
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
        {
          path: "/config/other",
          volume: Volume.fromConfigMap(chart, "ha-config", config, {
            items: {
              "automations.yaml": {
                path: "automations-2.yaml",
              },
              "configuration.yaml": {
                path: "configuration-2.yaml",
              },
              "scenes.yaml": {
                path: "scenes-2.yaml",
              },
              "scripts.yaml": {
                path: "scripts-2.yaml",
              },
            },
          }),
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
