import {
  Deployment,
  DeploymentStrategy,
  Protocol,
  Secret,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { ApiObject, Chart, JsonPatch } from "npm:cdk8s";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../utils/common.ts";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";
import {
  ReplicationSource,
  ReplicationSourceSpecResticCopyMethod,
} from "../../imports/volsync.backube.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

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
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/qtttm5re4xqpaivyohzkpznwsy",
      },
      metadata: {
        name: "homeassistant-restic-onepassword-item",
      },
    },
  );

  const resticSecret = Secret.fromSecretName(
    chart,
    "homeassistant-restic-secret",
    resticOnepasswordItem.name,
  );

  new ReplicationSource(chart, "homeassistant-replication-source", {
    spec: {
      sourcePvc: claim.claim.name,
      trigger: {
        schedule: "*/30 * * * *",
      },
      restic: {
        repository: resticSecret.name,
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
          volume,
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
