import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart, Size } from "npm:cdk8s";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { createTailscaleIngress } from "../../utils/tailscale.ts";
import { LonghornVolume } from "../../utils/longhorn.ts";
import { withCommonProps } from "../../utils/common.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";

export function createQBitTorrentDeployment(chart: Chart) {
  const item = new OnePasswordItem(chart, "mullvad", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/74rqjncejp7rpgelymnmul5ssm",
    },
  });

  const deployment = new Deployment(chart, "qbittorrent", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolume = new LonghornVolume(chart, "qbittorrent-longhorn", {
    storage: Size.gibibytes(10),
  });

  const gluetunLonghornVolume = new LonghornVolume(
    chart,
    "qbittorrent-gluetun-longhorn",
    {},
  );

  deployment.addContainer(
    withCommonProps({
      name: "gluetun",
      image: "ghcr.io/qdm12/gluetun",
      // TODO: replace this with capability to run as non-root
      securityContext: {
        privileged: true,
        allowPrivilegeEscalation: true,
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
      },
      envVariables: {
        VPN_SERVICE_PROVIDER: EnvValue.fromValue("mullvad"),
        VPN_TYPE: EnvValue.fromValue("wireguard"),
        WIREGUARD_PRIVATE_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(
            chart,
            "mullvad-private-key",
            item.name,
          ),
          key: "private-key",
        }),
        WIREGUARD_ADDRESSES: EnvValue.fromValue("10.65.91.92/32"),
      },
      volumeMounts: [
        {
          path: "/gluetun",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "qbittorrent-gluetun-volume",
            gluetunLonghornVolume.claim,
          ),
        },
      ],
    }),
  );
  deployment.addContainer(
    withCommonLinuxServerProps({
      name: "qbittorrent",
      image: "lscr.io/linuxserver/qbittorrent",
      portNumber: 8080,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "qbittorrent-volume",
            longhornVolume.claim,
          ),
        },
        {
          volume: Volume.fromHostPath(
            chart,
            "qbittorrent-bind-mount",
            "qbittorrent-bind-mount",
            {
              path: "/mnt/storage/downloads/torrents",
            },
          ),
          path: "/downloads",
        },
      ],
    }),
  );

  const service = new Service(chart, "qbittorrent-service", {
    selector: deployment,
    // required to allow TailScale to expose the service
    metadata: {
      annotations: {
        "metallb.universe.tf/allow-shared-ip": "gluetun",
      },
    },
    ports: [{ port: 8080 }],
  });

  createTailscaleIngress(chart, "qbittorrent-ingress", {
    service,
    host: "qbittorrent",
  });
}
