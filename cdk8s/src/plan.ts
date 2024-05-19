import { Chart } from "https://esm.sh/v135/cdk8s@2.68.58/";
import { Plan } from "../imports/upgrade.cattle.io.ts";

export function createUpgradePlan(chart: Chart) {
  // # Copied from https://docs.k3s.io/upgrades/automated#configure-plans
  new Plan(chart, "server-plan", {
    metadata: {
      namespace: "system-upgrade",
    },
    spec: {
      concurrency: 1,
      cordon: true,
      nodeSelector: {
        matchExpressions: [
          {
            key: "node-role.kubernetes.io/control-plane",
            operator: "In",
            values: ["true"],
          },
        ],
      },
      serviceAccountName: "system-upgrade",
      upgrade: {
        image: "rancher/k3s-upgrade",
      },
      channel: "https://update.k3s.io/v1-release/channels/stable",
    },
  });

  new Plan(chart, "agent-plan", {
    metadata: {
      namespace: "system-upgrade",
    },
    spec: {
      concurrency: 1,
      cordon: true,
      nodeSelector: {
        matchExpressions: [
          {
            key: "node-role.kubernetes.io/control-plane",
            operator: "DoesNotExist",
          },
        ],
      },
      prepare: {
        args: ["prepare", "server-plan"],
        image: "rancher/k3s-upgrade",
      },
      serviceAccountName: "system-upgrade",
      upgrade: {
        image: "rancher/k3s-upgrade",
      },
      channel: "https://update.k3s.io/v1-release/channels/stable",
    },
  });
}
