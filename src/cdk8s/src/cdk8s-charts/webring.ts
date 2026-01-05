import { App, Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createWebringDocsDeployment } from "../resources/frontends/webring.ts";

export function createWebringChart(app: App) {
  const chart = new Chart(app, "webring", {
    namespace: "webring",
    disableResourceNameHashes: true,
  });

  new Namespace(chart, "webring-namespace", {
    metadata: {
      name: "webring",
    },
  });

  createWebringDocsDeployment(chart);
}
