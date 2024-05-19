import { App } from "https://esm.sh/cdk8s@2.68.58";
import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { createProject } from "../apps/project.ts";

export function createProjectChart(app: App) {
  const chart = new Chart(app, "project", {
    namespace: "argocd",
    disableResourceNameHashes: true,
  });

  createProject(chart);
}
