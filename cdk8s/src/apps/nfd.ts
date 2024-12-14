import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

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
          "node-feature-discovery"
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
