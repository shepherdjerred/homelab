import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";

export function createAppsApp(chart: Chart) {
  return new Application(chart, "apps-app", {
    metadata: {
      name: "apps",
    },
    spec: {
      revisionHistoryLimit: 5,
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "apps",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "argocd",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true", "ServerSideApply=true"],
      },
    },
  });
}
