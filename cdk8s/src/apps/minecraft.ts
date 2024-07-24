import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

export function createMinecraftApp(chart: Chart) {
  return new Application(chart, "minecraft-app", {
    metadata: {
      name: "minecraft",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://itzg.github.io/minecraft-server-charts/",
        targetRevision: versions["minecraft"],
        chart: "minecraft",
        helm: {
          parameters: [
            {
              name: "minecraftServer.eula",
              value: "true",
            },
            {
              name: "minecraftServer.difficulty",
              value: "hard",
            },
            {
              name: "persistence.datadir.enabled",
              value: "true",
            },
            {
              name: "minecraftServer.version",
              value: "1.21",
            },
            {
              name: "minecraftServer.type",
              value: "PAPER",
            },
            {
              name: "minecraftServer.ops",
              value: "RiotShielder",
            },
            {
              name: "minecraftServer.whitelist",
              value: "RiotShielder",
            },
            {
              name: "minecraftServer.spawnProtection",
              value: "0",
            },
            {
              name: "minecraftServer.viewDistance",
              value: "15",
            },
            {
              name: "minecraftServer.memory",
              value: "4G",
            },
            {
              name: "resources.requests",
              value: "",
            },
            {
              name: "minecraftServer.overrideServerProperties",
              value: "true",
            },
            {
              name: "minecraftServer.forcegameMode",
              value: "true",
            },
            {
              name: "minecraftServer.serviceType",
              value: "NodePort",
            },
            {
              name: "minecraftServer.port",
              value: "25566",
            },
            {
              name: "minecraftServer.nodePort",
              value: "25566",
            },
            {
              name: "minecraftServer.servicePort",
              value: "",
            },
          ],
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
