import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { createCloudflareTunnelBinding } from "../../misc/cloudflare-tunnel.ts";
import { NVME_STORAGE_CLASS } from "../../misc/storage-classes.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";
import { TUNNEL_CNAME_TARGET } from "./external-dns.ts";
import {
  DISCORDSRV_PLUGIN_URL,
  getDiscordSrvConfigMapManifest,
  getDiscordSrvExtraVolumes,
  getDiscordSrvExtraEnv,
} from "../../misc/discordsrv-config.ts";

const NAMESPACE = "minecraft-tsmc";
const SECRET_NAME = "minecraft-tsmc-discord";

export function createMinecraftTsmcApp(chart: Chart) {
  // 1Password secret for DiscordSRV configuration
  // Required fields in 1Password:
  // - discord-bot-token: Discord bot token
  // - discord-channel-id: Main chat channel ID
  // - discord-console-channel-id: (optional) Console channel ID
  // - discord-invite-link: (optional) Discord invite link
  new OnePasswordItem(chart, "minecraft-tsmc-discord-1p", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/minecraft-tsmc-discord",
    },
    metadata: {
      name: SECRET_NAME,
      namespace: NAMESPACE,
    },
  });

  createIngress(
    chart,
    "minecraft-tsmc-bluemap-ingress",
    "minecraft-tsmc",
    "minecraft-tsmc-bluemap",
    8100,
    ["minecraft-tsmc-bluemap"],
    true,
  );

  createCloudflareTunnelBinding(chart, "minecraft-tsmc-bluemap-cf-tunnel", {
    serviceName: "minecraft-tsmc-bluemap",
    fqdn: "bluemap.ts-mc.net",
    namespace: "minecraft-tsmc",
    disableDnsUpdates: true,
  });

  const minecraftValues: HelmValuesForChart<"minecraft"> = {
    // Deploy as StatefulSet for mc-router auto-scaling support
    workloadAsStatefulSet: true,
    strategyType: "RollingUpdate",
    // mc-router annotation for hostname-based routing (must be top-level)
    serviceAnnotations: {
      "mc-router.itzg.me/externalServerName": "ts-mc.net",
    },
    image: {
      tag: versions["itzg/minecraft-server"],
    },
    resources: {
      requests: {
        memory: "3Gi",
      },
      limits: {
        memory: "4Gi",
      },
    },
    minecraftServer: {
      eula: true,
      difficulty: "normal",
      version: versions.paper,
      type: "PAPER",
      motd: "The Storm Minecraft",
      spawnProtection: 0,
      viewDistance: 15,
      memory: "3G",
      overrideServerProperties: true,
      forcegameMode: true,
      // Use ClusterIP - mc-router handles external routing
      serviceType: "ClusterIP",
      extraPorts: [
        {
          service: {
            enabled: true,
            port: 8100,
            annotations: {
              "external-dns.alpha.kubernetes.io/hostname": "bluemap.ts-mc.net",
              "external-dns.alpha.kubernetes.io/target": TUNNEL_CNAME_TARGET,
            },
          },
          protocol: "TCP",
          containerPort: 8100,
          name: "bluemap",
          ingress: {
            enabled: false,
          },
        },
      ],
      pluginUrls: [
        "https://github.com/MilkBowl/Vault/releases/download/1.7.3/Vault.jar",
        "https://github.com/BlueMap-Minecraft/BlueMap/releases/download/v5.13/bluemap-5.13-paper.jar",
        "https://cdn.modrinth.com/data/fALzjamp/versions/kkEljQ4R/Chunky-Fabric-1.4.51.jar",
        "https://github.com/EssentialsX/Essentials/releases/download/2.21.2/EssentialsX-2.21.2.jar",
        "https://github.com/EssentialsX/Essentials/releases/download/2.21.2/EssentialsXSpawn-2.21.2.jar",
        "https://cdn.modrinth.com/data/lKEzGugV/versions/vkuwyUC6/PlaceholderAPI-2.11.6.jar",
        DISCORDSRV_PLUGIN_URL,
      ],
      rcon: {
        enabled: true,
        withGeneratedPassword: true,
      },
    },
    persistence: {
      storageClass: NVME_STORAGE_CLASS,
      labels: {
        "velero.io/backup": "enabled",
      },
      dataDir: {
        Size: Size.gibibytes(32).asString(),
        enabled: true,
      },
    },
    // DiscordSRV configuration via ConfigMap and environment variables
    extraDeploy: [getDiscordSrvConfigMapManifest(NAMESPACE, "ts-mc.net")],
    extraVolumes: getDiscordSrvExtraVolumes(NAMESPACE),
    extraEnv: getDiscordSrvExtraEnv(SECRET_NAME),
  };

  // DNS records are now managed by mc-router

  return new Application(chart, "minecraft-tsmc-app", {
    metadata: {
      name: "minecraft-tsmc",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://itzg.github.io/minecraft-server-charts/",
        targetRevision: versions.minecraft,
        chart: "minecraft",
        helm: {
          valuesObject: minecraftValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "minecraft-tsmc",
      },
      // Allow mc-router to manage replicas for hibernation
      ignoreDifferences: [
        {
          group: "apps",
          kind: "StatefulSet",
          jsonPointers: ["/spec/replicas"],
        },
      ],
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
