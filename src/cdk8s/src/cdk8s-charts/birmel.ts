import { App, Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createBirmelDeployment } from "../resources/birmel/index.ts";

export function createBirmelChart(app: App) {
  const chart = new Chart(app, "birmel", {
    namespace: "birmel",
    disableResourceNameHashes: true,
  });

  new Namespace(chart, "birmel-namespace", {
    metadata: {
      name: "birmel",
    },
  });

  createBirmelDeployment(chart);
}
