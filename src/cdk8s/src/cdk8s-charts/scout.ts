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

  new Namespace(chart, `scout-${stage}-namespace`, {
    metadata: {
      name: `scout-${stage}`,
    },
  });

  createScoutDeployment(chart, stage);
}
