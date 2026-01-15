import { App, Chart } from "cdk8s";
import { createFreshRssDeployment } from "../resources/freshrss.ts";

export function createFreshRssChart(app: App) {
  const chart = new Chart(app, "freshrss", {
    namespace: "freshrss",
    disableResourceNameHashes: true,
  });

  createFreshRssDeployment(chart);
}
