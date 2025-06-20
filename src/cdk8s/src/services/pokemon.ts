import {
  Deployment,
  DeploymentStrategy,
  EmptyDirMedium,
  EnvValue,
  Protocol,
  Secret,
  Service,
  Volume,
} from "cdk8s-plus-31";
import { ApiObject, Chart, JsonPatch, Size } from "cdk8s";
import { withCommonProps } from "../utils/common.ts";
import { ZfsSsdVolume } from "../utils/zfsSsdVolume.ts";
import { getPersistentVolume } from "../utils/persistentVolumeMapping.ts";
import { TailscaleIngress } from "../utils/tailscale.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

export function createPokemonDeployment(chart: Chart) {
  const GID = 1000;

  const deployment = new Deployment(chart, "pokemon", {
    replicas: 0,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  const localPathVolume = new ZfsSsdVolume(chart, "pokemon-volume", {
    storage: Size.gibibytes(8),
    volume: getPersistentVolume(chart, "pokemon-volume"),
  });
  const romVolume = new ZfsSsdVolume(chart, "pokemon-rom-volume", {
    storage: Size.gibibytes(8),
    volume: getPersistentVolume(chart, "pokemon-rom-volume"),
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
    item.name
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
        KASMVNC_ENABLE: EnvValue.fromValue("true"),
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
      ports: [
        {
          name: "selkies",
          number: 8080,
          protocol: Protocol.TCP,
        },
        {
          name: "ui",
          number: 8181,
          protocol: Protocol.TCP,
        },
      ],

      volumeMounts: [
        {
          path: "/home/ubuntu/Downloads",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "pokemon-pvc",
            localPathVolume.claim
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
            romVolume.claim
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
    })
  );

  const selkiesService = new Service(chart, "selkies-service", {
    selector: deployment,
    ports: [{ port: 8080 }],
  });

  new TailscaleIngress(chart, "selkies-tailscale-ingress", {
    service: selkiesService,
    host: "selkies",
  });

  const uiService = new Service(chart, "ui-service", {
    selector: deployment,
    ports: [{ port: 8181 }],
  });

  new TailscaleIngress(chart, "ui-tailscale-ingress", {
    service: uiService,
    host: "pokebot",
    funnel: true,
  });

  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add("/spec/template/spec/containers/0/resources", {
      limits: {
        "gpu.intel.com/i915": 1,
      },
    })
  );
}
