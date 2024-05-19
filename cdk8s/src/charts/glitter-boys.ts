import { App } from "https://esm.sh/cdk8s@2.68.58";
import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { createBackendDeployment } from "../services/glitter/glitter-boys.ts";

export type Stage = "prod" | "beta";

export function createGlitterBoysChart(app: App, stage: Stage) {
  const chart = new Chart(app, `glitter-boys-${stage}`, {
    namespace: `glitter-boys-${stage}`,
    disableResourceNameHashes: true,
  });

  createBackendDeployment(chart, stage);
}
