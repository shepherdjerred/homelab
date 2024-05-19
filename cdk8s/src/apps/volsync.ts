import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

export function createVolsyncApp(chart: Chart) {
  return new Application(chart, "volsync-app", {
    metadata: {
      name: "volsync",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/backube/helm-charts
        repoUrl: "https://backube.github.io/helm-charts/",
        chart: "volsync",
        targetRevision: versions["volsync"],
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "volsync-system",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
