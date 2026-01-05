import { App, Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createSjerRedDeployment } from "../resources/frontends/sjer-red.ts";

export function createSjerRedChart(app: App) {
  const chart = new Chart(app, "sjer-red", {
    namespace: "sjer-red",
    disableResourceNameHashes: true,
  });

  new Namespace(chart, "sjer-red-namespace", {
    metadata: {
      name: "sjer-red",
    },
  });

  createSjerRedDeployment(chart);
}
