import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

export function createTailscaleApp(chart: Chart) {
  new OnePasswordItem(chart, "tailscale-operator-oauth-onepassword", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/mboftvs4fyptyqvg3anrfjy6vu",
    },
    metadata: {
      name: "operator-oauth",
      namespace: "tailscale",
    },
  });

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
