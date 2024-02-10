import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createLamportApp(chart: Chart) {
  return new Application(chart, "lamport-app", {
    metadata: {
      name: "lamport",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/shepherdjerred/servers",
        path: "cdk8s/dist/",
        targetRevision: "main",
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
