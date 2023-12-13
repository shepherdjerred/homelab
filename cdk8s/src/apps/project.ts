import { Chart } from "npm:cdk8s";
import { AppProject } from "../../imports/argoproj.io.ts";

export function createProject(chart: Chart) {
  new AppProject(chart, "project", {
    metadata: {
      name: "default",
    },
    spec: {
      orphanedResources: {
        warn: true,
      },
    },
  });
}
