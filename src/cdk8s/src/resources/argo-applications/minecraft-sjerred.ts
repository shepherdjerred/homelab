import { Chart, Size } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { SSD_STORAGE_CLASS } from "../../misc/storage-classes.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";

export function createMinecraftSjerredApp(chart: Chart) {
  createIngress(
    chart,
    "minecraft-sjerred-bluemap-ingress",
    "minecraft-sjerred",
    "minecraft-sjerred-bluemap",
    8100,
    ["minecraft-sjerred-bluemap"],
    true,
  );

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
      whitelist: ["RiotShielder", "lolopToaster", "gexboy8", "Virmel"].join(","),
      spawnProtection: 0,
      viewDistance: 15,
      memory: "4G",
      overrideServerProperties: true,
      forcegameMode: true,
      serviceType: "NodePort",
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
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
