import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

export function createChartMuseumApp(chart: Chart) {
  return new Application(chart, "chartmuseum-app", {
    metadata: {
      name: "chartmuseum",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.github.io/charts",
        targetRevision: versions["chartmuseum/chartmuseum"],
        chart: "chartmuseum/chartmuseum",
        helm: {
          parameters: [
            { name: "persistence.enabled", value: "true" },
            { name: "persistence.storageClass", value: "local-path" },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "chartmuseum",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
