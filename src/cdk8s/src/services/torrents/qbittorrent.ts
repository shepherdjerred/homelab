import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  type PersistentVolumeClaim,
  Secret,
  Service,
  Volume,
} from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { withCommonProps } from "../../utils/common.ts";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";
import versions from "../../versions.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";

export function createQBitTorrentDeployment(
  chart: Chart,
  claims: {
    downloads: PersistentVolumeClaim;
  },
) {
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

  const localPathVolume = new ZfsSsdVolume(chart, "qbittorrent-pvc", {
    storage: Size.gibibytes(8),
  });

  deployment.addContainer(
    withCommonProps({
      name: "gluetun",
      image: `ghcr.io/qdm12/gluetun:${versions["qdm12/gluetun"]}`,
      // TODO: replace this with capability to run as non-root
      // this is mostly required right now to setup the VPN
      securityContext: {
        privileged: true,
        allowPrivilegeEscalation: true,
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
      },
      envVariables: {
        DOT: EnvValue.fromValue("off"),
        UPDATER_PERIOD: EnvValue.fromValue("24h"),
        VPN_SERVICE_PROVIDER: EnvValue.fromValue("airvpn"),
        VPN_TYPE: EnvValue.fromValue("wireguard"),
        WIREGUARD_PRIVATE_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "airvpn-private-key", item.name),
          key: "private-key",
        }),
        WIREGUARD_PRESHARED_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(
            chart,
            "airvpn-preshared-key",
            item.name,
          ),
          key: "preshared-key",
        }),
        WIREGUARD_ADDRESSES: EnvValue.fromValue(
          "10.154.174.240/32,fd7d:76ee:e68f:a993:af57:e79c:b39d:9dde/128",
        ),
        FIREWALL_VPN_INPUT_PORTS: EnvValue.fromValue("17826"),
      },
    }),
  );
  deployment.addContainer(
    withCommonLinuxServerProps({
      name: "qbittorrent",
      image: `ghcr.io/linuxserver/qbittorrent:${
        versions["linuxserver/qbittorrent"]
      }`,
      portNumber: 8080,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "qbittorrent-volume",
            localPathVolume.claim,
          ),
        },
        {
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "qbittorrent-hdd-volume",
            claims.downloads,
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

  new TailscaleIngress(chart, "qbittorrent-tailscale-ingress", {
    service,
    host: "qbittorrent",
  });
}
