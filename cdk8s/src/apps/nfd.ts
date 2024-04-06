import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.json" with { type: "json" };

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
        targetRevision: versions[
          "https://kubernetes-sigs.github.io/node-feature-discovery/charts"
        ],
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
