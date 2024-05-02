import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.json" with { type: "json" };

export const supabaseVolumeName = "supabase-volume";

export function createSupabaseApp(chart: Chart) {
  return new Application(chart, "supabase-app", {
    metadata: {
      name: "supabase",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/supabase-community/supabase-kubernetes",
        path: "supabase-kubernetes/charts/supabase/",
        targetRevision: versions["supabase"],
        helm: {
          parameters: [
            {
              name: "studio.envrionment.STUDIO_DEFAULT_ORGANIZATION",
              value: "sjerred",
            },
            {
              name: "studio.envrionment.STUDIO_DEFAULT_PROJECT",
              value: "sjerred",
            },
            {
              name: "studio.envrionment.SUPABASE_PUBLIC_URL",
              value: "https://supabase.tailnet-1a49.ts.net",
            },
            {
              name: "auth.environment.API_EXTERNAL_URL",
              value: "https://supabase-api.tailnet-1a49.ts.net",
            },
            {
              name: "auth.environment.GOTRUE_SITE_URL",
              value: "https://supabase-gotrue.tailnet-1a49.ts.net",
            },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "supabase",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
