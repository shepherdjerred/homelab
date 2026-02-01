import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { createCloudflareTunnelBinding } from "../../misc/cloudflare-tunnel.ts";
import { NVME_STORAGE_CLASS } from "../../misc/storage-classes.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";
import {
  DISCORDSRV_PLUGIN_URL,
  getDiscordSrvConfigMapManifest,
  getDiscordSrvExtraVolumes,
  getDiscordSrvExtraEnv,
} from "../../misc/discordsrv-config.ts";

const NAMESPACE = "minecraft-sjerred";
const SECRET_NAME = "minecraft-sjerred-discord";

export function createMinecraftSjerredApp(chart: Chart) {
  // 1Password secret for DiscordSRV configuration
  // Required fields in 1Password:
  // - discord-bot-token: Discord bot token
  // - discord-channel-id: Main chat channel ID
  // - discord-console-channel-id: (optional) Console channel ID
  // - discord-invite-link: (optional) Discord invite link
  new OnePasswordItem(chart, "minecraft-sjerred-discord-1p", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/q37vet77dfggoqbvu4bqle3gje",
    },
    metadata: {
      name: SECRET_NAME,
      namespace: NAMESPACE,
    },
  });

  createIngress(
    chart,
    "minecraft-sjerred-bluemap-ingress",
    "minecraft-sjerred",
    "minecraft-sjerred-bluemap",
    8100,
    ["minecraft-sjerred-bluemap"],
    true,
  );

  createCloudflareTunnelBinding(chart, "minecraft-sjerred-bluemap-cf-tunnel", {
    serviceName: "minecraft-sjerred-bluemap",
    subdomain: "sjerred.bluemap",
    namespace: "minecraft-sjerred",
  });

  const minecraftValues: HelmValuesForChart<"minecraft"> = {
    // Deploy as StatefulSet for mc-router auto-scaling support
    workloadAsStatefulSet: true,
    strategyType: "RollingUpdate",
    // mc-router annotation for hostname-based routing (must be top-level)
    serviceAnnotations: {
      "mc-router.itzg.me/externalServerName": "sjer.red",
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
      difficulty: "hard",
      version: versions.paper,
      type: "PAPER",
      motd: "Jerred's Really Cool Minecraft Server",
      // ops: "RiotShielder",
      whitelist: ["RiotShielder", "lolopToaster", "gexboy8", "Virmel"].join(","),
      spawnProtection: 0,
      viewDistance: 15,
      memory: "3G",
      overrideServerProperties: true,
      forcegameMode: true,
      // Use ClusterIP - mc-router handles external routing
      serviceType: "ClusterIP",
      pluginUrls: [
        DISCORDSRV_PLUGIN_URL,
        "https://github.com/BlueMap-Minecraft/BlueMap/releases/download/v5.13/bluemap-5.13-paper.jar",
      ],
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
    extraDeploy: [getDiscordSrvConfigMapManifest(NAMESPACE)],
    extraVolumes: getDiscordSrvExtraVolumes(NAMESPACE),
    extraEnv: getDiscordSrvExtraEnv(SECRET_NAME),
  };

  // DNS records are now managed by mc-router

  return new Application(chart, "minecraft-sjerred-app", {
    metadata: {
      name: "minecraft-sjerred",
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
        namespace: "minecraft-sjerred",
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
