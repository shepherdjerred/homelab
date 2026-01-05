import { App, Chart } from "cdk8s";
import { createSyncthingDeployment } from "../resources/syncthing.ts";

export function createSyncthingChart(app: App) {
  const chart = new Chart(app, "syncthing", {
    namespace: "torvalds",
    disableResourceNameHashes: true,
  });

  createSyncthingDeployment(chart);
}
