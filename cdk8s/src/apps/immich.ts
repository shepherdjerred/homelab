import { Chart, Size } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { LonghornVolume } from "../utils/longhorn.ts";

export function createImmichApp(chart: Chart) {
  new LonghornVolume(chart, "immich-volume", {
    storageClassName: "longhorn-hdd",
    storage: Size.gibibytes(50),
    namespace: "immich",
  });

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
              value: "immich-volume",
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
