import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import {
  ReplicationSource,
  ReplicationSourceSpecResticCopyMethod,
} from "../../imports/volsync.backube.ts";

export function createMinecraftApp(chart: Chart) {
  const resticOnepasswordItem = new OnePasswordItem(
    chart,
    "personal-minecraft-restic-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/kab5nk2p2o35pxzcxucnhxaepm",
      },
      metadata: {
        name: "personal-minecraft-restic-onepassword-item",
        namespace: "minecraft",
      },
    },
  );

  new ReplicationSource(chart, "personal-minecraft-replication-source", {
    spec: {
      sourcePvc: "minecraft-minecraft-datadir",
      trigger: {
        schedule: "*/15 * * * *",
      },
      restic: {
        repository: resticOnepasswordItem.name,
        copyMethod: ReplicationSourceSpecResticCopyMethod.DIRECT,
        pruneIntervalDays: 7,
        retain: {
          daily: 7,
          weekly: 4,
          monthly: 12,
        },
        // match up with the UID/GID of the container
        // https://volsync.readthedocs.io/en/stable/usage/permissionmodel.html#mover-s-security-context
        moverSecurityContext: {
          runAsUser: 1000,
          runAsGroup: 3000,
        },
      },
    },
    metadata: {
      namespace: "minecraft",
    },
  });

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
              name: "image.tag",
              value: versions["itzg/minecraft-server"],
            },
            {
              name: "minecraftServer.eula",
              value: "true",
            },
            {
              name: "minecraftServer.difficulty",
              value: "hard",
            },
            {
              name: "persistence.dataDir.enabled",
              value: "true",
            },
            {
              name: "minecraftServer.version",
              value: "1.21.4",
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
            // {
            //   name: "resources",
            //   value: "{}",
            // },
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
