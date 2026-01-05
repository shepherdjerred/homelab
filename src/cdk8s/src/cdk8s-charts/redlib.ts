import { App, Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createRedlibDeployment } from "../resources/frontends/redlib.ts";

export function createRedlibChart(app: App) {
  const chart = new Chart(app, "redlib", {
    namespace: "redlib",
    disableResourceNameHashes: true,
  });

  new Namespace(chart, "redlib-namespace", {
    metadata: {
      name: "redlib",
    },
  });

  createRedlibDeployment(chart);
}
