import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { createCloudflareTunnelBinding } from "../../misc/cloudflare-tunnel.ts";
import { NVME_STORAGE_CLASS } from "../../misc/storage-classes.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";
import {
  getMinecraftConfigMapManifest,
  getMinecraftExtraVolumes,
  getMinecraftExtraEnv,
} from "../../misc/minecraft-config.ts";

const NAMESPACE = "minecraft-shuxin";

export function createMinecraftShuxinApp(chart: Chart) {
  createIngress(
    chart,
    "minecraft-shuxin-bluemap-ingress",
    "minecraft-shuxin",
    "minecraft-shuxin-bluemap",
    8100,
    ["minecraft-shuxin-bluemap"],
    true,
  );

  createCloudflareTunnelBinding(chart, "minecraft-shuxin-bluemap-cf-tunnel", {
    serviceName: "minecraft-shuxin-bluemap",
    subdomain: "shuxin.bluemap",
    namespace: "minecraft-shuxin",
  });

  const minecraftValues: HelmValuesForChart<"minecraft"> = {
    // Deploy as StatefulSet for mc-router auto-scaling support
    workloadAsStatefulSet: true,
    strategyType: "RollingUpdate",
    // mc-router annotation for hostname-based routing (must be top-level)
    serviceAnnotations: {
      "mc-router.itzg.me/externalServerName": "shuxin.sjer.red",
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
      difficulty: "peaceful",
      version: versions.paper,
      type: "PAPER",
      motd: "Jerred & Shuxin",
      whitelist: ["RiotShielder", "vietnamesechovy"].join(","),
      spawnProtection: 0,
      viewDistance: 15,
      memory: "3G",
      forcegameMode: true,
      // Use ClusterIP - mc-router handles external routing for Java Edition
      serviceType: "ClusterIP",
      extraPorts: [
        {
          service: {
            enabled: true,
            port: 8100,
          },
          protocol: "TCP",
          containerPort: 8100,
          name: "bluemap",
          ingress: {
            enabled: false,
          },
        },
        {
          // Bedrock port (UDP) - mc-router doesn't support UDP, so this needs NodePort
          // Note: Bedrock clients can only connect when server is running
          // Java clients connecting via mc-router will wake the server
          service: {
            enabled: true,
            type: "NodePort",
            port: 19132,
            nodePort: 30003,
          },
          protocol: "UDP",
          containerPort: 19132,
          name: "bedrock",
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
        // GeyserMC - allows Bedrock Edition (Switch, mobile, etc.) to connect
        "https://download.geysermc.org/v2/projects/geyser/versions/latest/builds/latest/downloads/spigot",
        // Floodgate - allows Bedrock players to join with Xbox accounts
        "https://download.geysermc.org/v2/projects/floodgate/versions/latest/builds/latest/downloads/spigot",
        // ProtocolLib - packet manipulation library (dependency for some plugins)
        "https://github.com/dmulloy2/ProtocolLib/releases/download/5.4.0/ProtocolLib.jar",
        // DecentHolograms - hologram display plugin
        "https://github.com/DecentSoftware-eu/DecentHolograms/releases/download/2.9.9/DecentHolograms-2.9.9.jar",
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
    // Deploy ConfigMap for server configs
    extraDeploy: [getMinecraftConfigMapManifest("shuxin", NAMESPACE)],

    // Mount configs to /config (itzg syncs to /data on startup)
    extraVolumes: getMinecraftExtraVolumes("shuxin", NAMESPACE),

    // Config sync settings
    extraEnv: {
      ...getMinecraftExtraEnv(),
      VERSION_FROM_MODRINTH_PROJECTS: "true",
    },
  };

  // DNS records are now managed by mc-router

  return new Application(chart, "minecraft-shuxin-app", {
    metadata: {
      name: "minecraft-shuxin",
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
        namespace: "minecraft-shuxin",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
