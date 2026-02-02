import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";

export function createExternalDomainsApp(chart: Chart) {
  return new Application(chart, "external-domains-app", {
    metadata: {
      name: "external-domains",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "external-domains",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "external-dns",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
