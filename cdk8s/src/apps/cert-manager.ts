import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.json" with { type: "json" };

export function createCertManagerApp(chart: Chart) {
  new Application(chart, "cert-manager-app", {
    metadata: {
      name: "cert-manager",
    },
    spec: {
      project: "default",
      source: {
        // https://artifacthub.io/packages/search?org=cert-manager
        repoUrl: "https://charts.jetstack.io",
        chart: "cert-manager",
        targetRevision: versions["https://charts.jetstack.io"],
        helm: {
          parameters: [
            { name: "installCRDs", value: "true" },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "cert-manager",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
