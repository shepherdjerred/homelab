import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createNfdApp(chart: Chart) {
  new Application(chart, "nfd-app", {
    metadata: {
      name: "nfd",
    },
    spec: {
      project: "default",
      source: {
        repoUrl:
          "https://kubernetes-sigs.github.io/node-feature-discovery/charts",
        chart: "node-feature-discovery",
        targetRevision: "0.15.1",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "node-feature-discovery",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
