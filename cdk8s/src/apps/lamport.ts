import { Chart } from "https://esm.sh/cdk8s@2.68.58";
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
