import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

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
        targetRevision: versions["cert-manager"],
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
