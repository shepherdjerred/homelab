import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";

export function createWebringApp(chart: Chart) {
  return new Application(chart, "webring-app", {
    metadata: {
      name: "webring",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "webring",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "webring",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
