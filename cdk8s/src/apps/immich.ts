import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createImmichApp(chart: Chart) {
  return new Application(chart, "immich-app", {
    metadata: {
      name: "immich",
      namespace: "argocd",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/immich-app/immich-charts/",
        path: "charts/immich",
        targetRevision: "immich-0.3.1",
        helm: {
          parameters: [
            { name: "postgresql.enabled", value: "true" },
            { name: "redis.enabled", value: "true" },
            {
              name: "immich.persistence.library.existingClaim",
              value: "pvc-7fb21d64-ca32-4f83-bf78-45cab85e31fa",
            },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "immich",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
