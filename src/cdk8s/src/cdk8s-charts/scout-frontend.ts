import { App, Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createScoutForLolFrontendDeployment } from "../resources/frontends/scout-for-lol.ts";

export function createScoutFrontendChart(app: App) {
  const chart = new Chart(app, "scout-frontend", {
    namespace: "scout-frontend",
    disableResourceNameHashes: true,
  });

  new Namespace(chart, "scout-frontend-namespace", {
    metadata: {
      name: "scout-frontend",
    },
  });

  createScoutForLolFrontendDeployment(chart);
}
