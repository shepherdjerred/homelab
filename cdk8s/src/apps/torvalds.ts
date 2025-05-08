import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createTorvaldsApp(chart: Chart) {
  return new Application(chart, "torvalds-app", {
    metadata: {
      name: "torvalds",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "torvalds",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "torvalds",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
