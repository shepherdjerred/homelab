import { App, Chart } from "cdk8s";
import { createGickupDeployment } from "../resources/gickup.ts";

export async function createGickupChart(app: App) {
  const chart = new Chart(app, "gickup", {
    namespace: "torvalds",
    disableResourceNameHashes: true,
  });

  await createGickupDeployment(chart);
}
