import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";

export function createTorvaldsApp(chart: Chart) {
  new Namespace(chart, `torvalds-namespace`, {
    metadata: {
      name: `torvalds`,
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
      },
    },
  });

  return new Application(chart, "torvalds-app", {
    metadata: {
      name: "torvalds",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.tailnet-1a49.ts.net",
        targetRevision: "~1.0.0-0",
        chart: "torvalds",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "torvalds",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
