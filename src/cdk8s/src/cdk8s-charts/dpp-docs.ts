import { App, Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createDppDocsDeployment } from "../resources/frontends/dpp-docs.ts";

export function createDppDocsChart(app: App) {
  const chart = new Chart(app, "dpp-docs", {
    namespace: "dpp-docs",
    disableResourceNameHashes: true,
  });

  new Namespace(chart, "dpp-docs-namespace", {
    metadata: {
      name: "dpp-docs",
    },
  });

  createDppDocsDeployment(chart);
}
