import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createTailscaleApp(chart: Chart) {
  return new Application(chart, "tailscale-app", {
    metadata: {
      name: "tailscale",
      namespace: "argocd",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/tailscale/tailscale",
        path: "cmd/k8s-operator/deploy/chart",
        targetRevision: "HEAD",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "tailscale",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
