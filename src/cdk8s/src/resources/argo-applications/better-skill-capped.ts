import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";

export function createBetterSkillCappedApp(chart: Chart) {
  return new Application(chart, "better-skill-capped-app", {
    metadata: {
      name: "better-skill-capped",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "better-skill-capped",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "better-skill-capped",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
