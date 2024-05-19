import { Chart } from "https://esm.sh/cdk8s@2.68.58";
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
