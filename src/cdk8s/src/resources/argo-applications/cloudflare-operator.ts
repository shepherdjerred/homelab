import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";

export function createCloudflareOperatorApp(chart: Chart) {
  return new Application(chart, "cloudflare-operator-app", {
    metadata: {
      name: "cloudflare-operator",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/adyanth/cloudflare-operator
        repoUrl: "https://adyanth.github.io/cloudflare-operator/",
        targetRevision: versions["cloudflare-operator"],
        chart: "cloudflare-operator",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "cloudflare-operator",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
