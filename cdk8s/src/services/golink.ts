import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Volume,
} from "cdk8s-plus";
import { Chart } from "cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import {
  ReplicationSource,
  ReplicationSourceSpecResticCopyMethod,
} from "../../imports/volsync.backube.ts";
import versions from "../versions/versions.ts";

export function createGolinkDeployment(chart: Chart) {
  const UID = 65532;
  const GID = 65532;

  const deployment = new Deployment(chart, "golink", {
    replicas: 1,
    securityContext: {
      fsGroup: GID,
    },
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new LocalPathVolume(chart, "golink-pvc", {});

  const item = new OnePasswordItem(chart, "tailscale-auth-key-onepassword", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/t5scpnlhnxvu25dneg6jdd7c7q",
    },
    metadata: {
      name: "tailscale-auth-key",
    },
  });

  const resticOnepasswordItem = new OnePasswordItem(
    chart,
    "golink-restic-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/55dd4k7uxlbtayhzxkxfxu7aqm",
      },
      metadata: {
        name: "golink-restic-onepassword-item",
      },
    },
  );

  new ReplicationSource(chart, "golink-replication-source", {
    spec: {
      sourcePvc: localPathVolume.claim.name,
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
        // match up with the UID/GID of the container
        // https://volsync.readthedocs.io/en/stable/usage/permissionmodel.html#mover-s-security-context
        moverSecurityContext: {
          runAsUser: UID,
          runAsGroup: GID,
        },
      },
    },
  });

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/tailscale/golink:${versions["tailscale/golink"]}`,
      envVariables: {
        TS_AUTH_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(
            chart,
            "tailscale-auth-key",
            item.name,
          ),
          key: "credential",
        }),
      },
      securityContext: {
        user: UID,
        group: GID,
      },
      volumeMounts: [
        {
          path: "/home/nonroot",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "golink-volume",
            localPathVolume.claim,
          ),
        },
      ],
    }),
  );
}
