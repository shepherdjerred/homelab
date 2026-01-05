import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";

export function createDppDocsApp(chart: Chart) {
  return new Application(chart, "dpp-docs-app", {
    metadata: {
      name: "dpp-docs",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "dpp-docs",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "dpp-docs",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
