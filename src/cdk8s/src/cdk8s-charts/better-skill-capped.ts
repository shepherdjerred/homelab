import { App, Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createBetterSkillCappedDeployment } from "../resources/frontends/better-skill-capped.ts";

export function createBetterSkillCappedChart(app: App) {
  const chart = new Chart(app, "better-skill-capped", {
    namespace: "better-skill-capped",
    disableResourceNameHashes: true,
  });

  new Namespace(chart, "better-skill-capped-namespace", {
    metadata: {
      name: "better-skill-capped",
    },
  });

  createBetterSkillCappedDeployment(chart);
}
