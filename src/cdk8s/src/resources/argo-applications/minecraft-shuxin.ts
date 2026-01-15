import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { createCloudflareTunnelBinding } from "../../misc/cloudflare-tunnel.ts";
import { NVME_STORAGE_CLASS } from "../../misc/storage-classes.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";

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
    image: {
      tag: versions["itzg/minecraft-server"],
    },
    resources: {
      requests: {
        memory: "1Gi",
      },
      limits: {
        memory: "1536Mi", // 1G heap + 512M overhead
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
      memory: "1G",
      overrideServerProperties: true,
      forcegameMode: true,
      serviceType: "NodePort",
      nodePort: 30002,
      servicePort: 30002,
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
      pluginUrls: [
        "https://github.com/MilkBowl/Vault/releases/download/1.7.3/Vault.jar",
        "https://github.com/BlueMap-Minecraft/BlueMap/releases/download/v5.13/bluemap-5.13-paper.jar",
        "https://cdn.modrinth.com/data/fALzjamp/versions/kkEljQ4R/Chunky-Fabric-1.4.51.jar",
        "https://github.com/EssentialsX/Essentials/releases/download/2.21.2/EssentialsX-2.21.2.jar",
        "https://github.com/EssentialsX/Essentials/releases/download/2.21.2/EssentialsXSpawn-2.21.2.jar",
        "https://cdn.modrinth.com/data/lKEzGugV/versions/vkuwyUC6/PlaceholderAPI-2.11.6.jar",
      ],
    },
    persistence: {
      storageClass: NVME_STORAGE_CLASS,
      dataDir: {
        Size: Size.gibibytes(32).asString(),
        enabled: true,
      },
    },
    extraEnv: {
      VERSION_FROM_MODRINTH_PROJECTS: "true",
    },
  };

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
