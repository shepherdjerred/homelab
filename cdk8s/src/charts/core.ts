import { App, Chart } from "npm:cdk8s";
import { createStorageClasses } from "../utils/localPathProvisioner.ts";

export function createCoreChart(app: App) {
  const chart = new Chart(app, "core", {
    namespace: "core",
    disableResourceNameHashes: true,
  });

  createStorageClasses(chart);
}
