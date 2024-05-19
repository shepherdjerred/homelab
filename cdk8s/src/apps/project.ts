import { Chart } from "https://esm.sh/cdk8s@2.68.58";
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
      sourceRepos: ["*"],
      destinations: [
        {
          namespace: "*",
          server: "*",
        },
      ],
      clusterResourceWhitelist: [
        {
          group: "*",
          kind: "*",
        },
      ],
    },
  });
}
