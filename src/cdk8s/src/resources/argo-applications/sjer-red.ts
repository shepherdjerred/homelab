import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";

export function createSjerRedApp(chart: Chart) {
  return new Application(chart, "sjer-red-app", {
    metadata: {
      name: "sjer-red",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "sjer-red",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "sjer-red",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
