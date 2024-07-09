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
