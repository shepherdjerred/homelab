import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export const immichVolumeName = "immich-volume";

export function createImmichApp(chart: Chart) {
  return new Application(chart, "immich-app", {
    metadata: {
      name: "immich",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/immich-app/immich-charts/",
        path: "charts/immich",
        targetRevision: "immich-0.3.1",
        helm: {
          parameters: [
            { name: "gpu", value: "1" },
            { name: "postgresql.enabled", value: "true" },
            { name: "redis.enabled", value: "true" },
            {
              name: "immich.persistence.library.existingClaim",
              value: immichVolumeName,
            },
            {
              name:
                'microservices.resources.requests.limits."gpu\\.intel\\.com/i915"',
              value: "{{inputs.parameters.gpu}}",
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
