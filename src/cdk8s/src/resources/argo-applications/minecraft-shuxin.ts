import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { SSD_STORAGE_CLASS } from "../../misc/storage-classes.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";

export function createMinecraftShuxinApp(chart: Chart) {
  createIngress(
    chart,
    "minecraft-shuxin-bluemap-ingress",
    "minecraft-shuxin",
    "minecraft-shuxin-minecraft-bluemap",
    8100,
    ["minecraft-shuxin-bluemap"],
    true,
  );

  const minecraftValues: HelmValuesForChart<"minecraft"> = {
    image: {
      tag: versions["itzg/minecraft-server"],
    },
    minecraftServer: {
      eula: true,
      difficulty: "easy",
      version: versions.paper,
      type: "PAPER",
      motd: "Jerred & Shuxin",
      whitelist: ["RiotShielder", "vietnamesechovy"].join(","),
      spawnProtection: 0,
      viewDistance: 15,
      memory: "4G",
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
      modrinth: {
        projects: [
          "bluemap",
          "chunky",
          "decentholograms",
          "waypoints",
          "vaultunlocked",
          "essentialsx",
          "essentialsx-spawn",
        ],
        allowedVersionType: "release",
      },
    },
    persistence: {
      storageClass: SSD_STORAGE_CLASS,
      dataDir: {
        Size: Size.gibibytes(32).asString(),
        enabled: true,
      },
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
