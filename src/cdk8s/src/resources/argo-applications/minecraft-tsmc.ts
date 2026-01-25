import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { createCloudflareTunnelBinding } from "../../misc/cloudflare-tunnel.ts";
import { NVME_STORAGE_CLASS } from "../../misc/storage-classes.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";
import { TUNNEL_CNAME_TARGET } from "./external-dns.ts";

export function createMinecraftTsmcApp(chart: Chart) {
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
      difficulty: "normal",
      version: versions.paper,
      type: "PAPER",
      motd: "The Storm Minecraft",
      spawnProtection: 0,
      viewDistance: 15,
      memory: "1G",
      overrideServerProperties: true,
      forcegameMode: true,
      serviceType: "NodePort",
      nodePort: 30003,
      servicePort: 30003,
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
      ],
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
  };

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
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
