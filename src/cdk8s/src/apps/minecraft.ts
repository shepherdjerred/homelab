import { Chart, Size } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { createIngress } from "../utils/tailscale.ts";
import { SSD_STORAGE_CLASS } from "../storageclasses.ts";
import { HelmValuesForChart } from "../types/helm/index.js";

export function createMinecraftApp(chart: Chart) {
  createIngress(
    chart,
    "minecraft-bluemap-ingress",
    "minecraft",
    "minecraft-minecraft-bluemap",
    8100,
    ["minecraft-bluemap"],
    true,
  );

  // ✅ Type-safe Minecraft configuration with full IntelliSense
  const minecraftValues: HelmValuesForChart<"minecraft"> = {
    image: {
      tag: versions["itzg/minecraft-server"],
    },
    minecraftServer: {
      eula: true,
      difficulty: "hard",
      version: versions.paper,
      type: "PAPER",
      motd: "Jerred's Really Cool Minecraft Server",
      // ops: "RiotShielder",
      whitelist: "RiotShielder,lolopToaster,gexboy8,Virmel",
      spawnProtection: 0,
      viewDistance: 15,
      memory: "4G",
      overrideServerProperties: true,
      forcegameMode: true,
      serviceType: "NodePort",
      port: 25565,
      nodePort: 30001,
      servicePort: 30001,
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
    },
    persistence: {
      storageClass: SSD_STORAGE_CLASS,
      dataDir: {
        Size: Size.gibibytes(32).asString(),
        enabled: true,
      },
    },
  };

  return new Application(chart, "minecraft-app", {
    metadata: {
      name: "minecraft",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://itzg.github.io/minecraft-server-charts/",
        targetRevision: versions.minecraft,
        chart: "minecraft",
        helm: {
          valuesObject: minecraftValues, // ✅ Now type-checked against MinecraftHelmValues
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "minecraft",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
