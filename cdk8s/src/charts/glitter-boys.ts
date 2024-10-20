import { App } from "cdk8s";
import { Chart } from "cdk8s";
import { createBackendDeployment } from "../services/glitter/glitter-boys.ts";

export type Stage = "prod" | "beta";

export function createGlitterBoysChart(app: App, stage: Stage) {
  const chart = new Chart(app, `glitter-boys-${stage}`, {
    namespace: `glitter-boys-${stage}`,
    disableResourceNameHashes: true,
  });

  createBackendDeployment(chart, stage);
}
