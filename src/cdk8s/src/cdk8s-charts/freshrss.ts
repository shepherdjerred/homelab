import { App, Chart } from "cdk8s";
import { createFreshRssDeployment } from "../resources/freshrss.ts";

export function createFreshRssChart(app: App) {
  const chart = new Chart(app, "freshrss", {
    namespace: "torvalds",
    disableResourceNameHashes: true,
  });

  createFreshRssDeployment(chart);
}
