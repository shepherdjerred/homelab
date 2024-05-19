import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

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
        targetRevision: versions["immich-app/immich-charts/"],
        helm: {
          parameters: [
            { name: "postgresql.enabled", value: "true" },
            { name: "redis.enabled", value: "true" },
            {
              name: "immich.persistence.library.existingClaim",
              value: immichVolumeName,
            },
            {
              name: "image.tag",
              // remove the sha256 part
              value: versions["immich-app/immich-server"].split("@")[0],
            },
            // quantities must match the regular expression '^([+-]?[0-9.]+)([eEinumkKMGTP]*[-+]?[0-9]*)$'
            // {
            //   name:
            //     'microservices.resources.requests.limits."gpu\\.intel\\.com/i915"',
            //   value: "1",
            // },
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
