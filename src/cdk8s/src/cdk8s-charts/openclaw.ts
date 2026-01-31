import { App, Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createOpenclawDeployment } from "../resources/openclaw/index.ts";

export function createOpenclawChart(app: App) {
  const chart = new Chart(app, "openclaw", {
    namespace: "openclaw",
    disableResourceNameHashes: true,
  });

  new Namespace(chart, "openclaw-namespace", {
    metadata: {
      name: "openclaw",
      labels: {
        "pod-security.kubernetes.io/enforce": "restricted",
        "pod-security.kubernetes.io/audit": "restricted",
        "pod-security.kubernetes.io/warn": "restricted",
      },
    },
  });

  createOpenclawDeployment(chart);
}
