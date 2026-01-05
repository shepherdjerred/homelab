import { App, Chart } from "cdk8s";
import { createHomeAssistantDeployment } from "../resources/home/homeassistant.ts";
import { createHaDeployment } from "../resources/home/ha.ts";

export async function createHomeChart(app: App) {
  const chart = new Chart(app, "home", {
    namespace: "torvalds",
    disableResourceNameHashes: true,
  });

  await createHomeAssistantDeployment(chart);
  createHaDeployment(chart);
}
