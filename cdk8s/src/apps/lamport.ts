import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createLamportApp(chart: Chart) {
  return new Application(chart, "lamport-app", {
    metadata: {
      name: "lamport",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "lamport",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "lamport",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
