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
          valuesObject: {
            image: {
              tag: versions["itzg/minecraft-server"],
            },
            minecraftServer: {
              eula: true,
              difficulty: "hard",
              version: "1.21.4",
              type: "PAPER",
              motd: "Jerred's Really Cool Minecraft Server",
              ops: "RiotShielder",
              whitelist: "RiotShielder,lolopToaster,gexboy8,Virmel",
              spawnProtection: 0,
              viewDistance: 15,
              memory: "4G",
              overrideServerProperties: true,
              forcegameMode: true,
              serviceType: "NodePort",
              port: 25566,
              nodePort: 25566,
              servicePort: "",
              extraPorts: [
                {
                  service: {
                    enabled: true,
                    port: 8123,
                    containerPort: 8123,
                  },
                  name: "dynmap",
                  ingress: {
                    enabled: true,
                    ingressClassName: "tailscale",
                    annotations: {
                      "tailscale.com/funnel": "true",
                    },
                    hosts: [{
                      name: "minecraft-dynmap",
                      path: "/",
                    }],
                    tls: {
                      hosts: ["minecraft-dynmap"],
                    },
                  },
                },
              ],
            },
            persistence: {
              dataDir: {
                enabled: true,
              },
            },
          },
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
