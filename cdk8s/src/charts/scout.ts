import { Chart } from "cdk8s";
import type { App } from "cdk8s";
import { createScoutDeployment } from "../services/scout/index.ts";

export type Stage = "prod" | "beta";

export function createScoutChart(app: App, stage: Stage) {
  const chart = new Chart(app, `scout-${stage}`, {
    namespace: `scout-${stage}`,
    disableResourceNameHashes: true,
  });

  createScoutDeployment(chart, stage);
}
