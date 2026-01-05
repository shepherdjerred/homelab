import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";

export function createScoutFrontendApp(chart: Chart) {
  return new Application(chart, "scout-frontend-app", {
    metadata: {
      name: "scout-frontend",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "scout-frontend",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "scout-frontend",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
