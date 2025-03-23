import {
  Deployment,
  DeploymentStrategy,
  EmptyDirMedium,
  EnvValue,
  Secret,
  Service,
  Volume,
} from "cdk8s-plus";
import { ApiObject, Chart, JsonPatch, Size } from "cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import {
  ReplicationSource,
  ReplicationSourceSpecResticCopyMethod,
} from "../../imports/volsync.backube.ts";

export function createPokemonDeployment(chart: Chart) {
  const GID = 1000;
  const UID = 1000;

  const deployment = new Deployment(chart, "pokemon", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  const localPathVolume = new LocalPathVolume(chart, "pokemon-volume", {});
  const romVolume = new LocalPathVolume(chart, "pokemon-rom-volume", {});

  const resticOnepasswordItem = new OnePasswordItem(
    chart,
    "pokemon-restic-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/kab5nk2p2o35pxzcxucnhxaepm",
      },
      metadata: {
        name: "golink-restic-onepassword-item",
      },
    },
  );

  new ReplicationSource(chart, "pokemon-replication-source", {
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

  const item = new OnePasswordItem(chart, "pokemon-config", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/hwyhh64dyu3s7w37q7oj7r4qn4",
    },
  });

  const secret = Secret.fromSecretName(
    chart,
    "pokemon-config-secret",
    item.name,
  );

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/shepherdjerred/discord-plays-pokemon:latest`,
      envVariables: {
        SIZEW: EnvValue.fromValue("1920"),
        SIZEH: EnvValue.fromValue("1080"),
        REFRESH: EnvValue.fromValue("60"),
        PASSWD: EnvValue.fromValue("password"),
        BASIC_AUTH_PASSWORD: EnvValue.fromValue("password"),
        SELKIES_ENCODER: EnvValue.fromValue("vah264enc"),
      },
      securityContext: {
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
        user: 1000,
        group: 1000,
        // TODO: unsure if this is necessary
        privileged: true,
        allowPrivilegeEscalation: true,
      },
      volumeMounts: [
        {
          path: "/home/ubuntu/Downloads",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "pokemon-pvc",
            localPathVolume.claim,
          ),
        },
        {
          path: "/home/ubuntu/config.toml",
          subPath: "config.toml",
          volume: Volume.fromSecret(chart, "pokemon-config-volume", secret, {
            items: {
              "config.toml": {
                path: "config.toml",
              },
            },
          }),
        },
        {
          path: `/home/ubuntu/packages/frontend/dist/roms`,
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "pokemon-rom-pvc",
            romVolume.claim,
          ),
        },
        {
          path: "/dev/shm",
          volume: Volume.fromEmptyDir(chart, "shm-volume", "shm", {
            medium: EmptyDirMedium.MEMORY,
            sizeLimit: Size.gibibytes(8),
          }),
        },
      ],
    }),
  );

  const uiService = new Service(chart, "ui-service", {
    selector: deployment,
    ports: [{ port: 8181, targetPort: 8181 }],
  });

  new TailscaleIngress(chart, "ui-tailscale-ingress", {
    service: uiService,
    host: "pokebot",
    funnel: true,
  });

  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add(
      "/spec/template/spec/containers/0/resources",
      {
        limits: {
          "gpu.intel.com/i915": 1,
        },
      },
    ),
  );
}
