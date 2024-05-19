import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

export function createWindmillApp(chart: Chart) {
  return new Application(chart, "windmill-app", {
    metadata: {
      name: "windmill",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/windmill-labs/windmill-helm-charts",
        path: "charts/windmill",
        targetRevision: versions["windmill-labs/windmill-helm-charts"],
        helm: {
          parameters: [
            { name: "minio.enabled", value: "true" },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "windmill",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
