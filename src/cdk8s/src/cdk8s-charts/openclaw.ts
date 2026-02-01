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
        // Pod security standards - audit mode to avoid admission failures
        // (enforce requires seccompProfile and capabilities.drop which cdk8s-plus doesn't set by default)
        "pod-security.kubernetes.io/audit": "restricted",
        "pod-security.kubernetes.io/warn": "restricted",
      },
    },
  });

  createOpenclawDeployment(chart);
}
