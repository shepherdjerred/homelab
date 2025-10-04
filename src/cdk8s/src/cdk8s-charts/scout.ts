import { Chart } from "cdk8s";
import type { App } from "cdk8s";
import { createScoutDeployment } from "../resources/scout/index.ts";
import { Namespace } from "cdk8s-plus-31";

export type Stage = "prod" | "beta";

export function createScoutChart(app: App, stage: Stage) {
  const chart = new Chart(app, `scout-${stage}`, {
    namespace: `scout-${stage}`,
    disableResourceNameHashes: true,
  });

  new Namespace(chart, `scout-beta-namespace`, {
    metadata: {
      name: `scout-beta`,
    },
  });

  new Namespace(chart, `scout-prod-namespace`, {
    metadata: {
      name: `scout-prod`,
    },
  });

  createScoutDeployment(chart, stage);
}
