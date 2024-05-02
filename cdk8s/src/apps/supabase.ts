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
        path: "charts/supabase",
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
            {
              name: "secret.jwt.secretRef",
              value: "supabase-secret",
            },
            {
              name: "secret.jwt.secretRefKey.anonKey",
              value: "jwt_anon_key",
            },
            {
              name: "secret.jwt.secretRefKey.serviceKey",
              value: "jwt_service_key",
            },
            {
              name: "secret.jwt.secretRefKey.secret",
              value: "jwt_secret",
            },
            {
              name: "secret.db.secretRef",
              value: "supabase-secret",
            },
            {
              name: "secret.db.secretRefKey.password",
              value: "db_password",
            },
            {
              name: "secret.db.secretRefKey.username",
              value: "db_username",
            },
            {
              name: "secret.db.secretRefKey.database",
              value: "db_database",
            },
            {
              name: "secret.dashboard.secretRef",
              value: "supabase-secret",
            },
            {
              name: "secret.dashboard.secretRefKey.password",
              value: "dashboard_password",
            },
            {
              name: "secret.dashboard.secretRefKey.username",
              value: "dashboard_username",
            },
            {
              name: "secret.analytics.secretRef",
              value: "supabase-secret",
            },
            {
              name: "secret.analytics.secretRefKey.apiKey",
              value: "analytics_api_key",
            },
            {
              name: "smtp.secretRef",
              value: "supabase-secret",
            },
            {
              name: "smtp.secretRefKey.username",
              value: "smtp_username",
            },
            {
              name: "smtp.secretRefKey.password",
              value: "smtp_password",
            },
            {
              name: "db.image.tag",
              value: versions["supabase-db"],
            },
            {
              name: "studio.image.tag",
              value: versions["supabase-studio"],
            },
            {
              name: "auth.image.tag",
              value: versions["supabase-auth"],
            },
            {
              name: "realtime.image.tag",
              value: versions["supabase-realtime"],
            },
            {
              name: "meta.image.tag",
              value: versions["supabase-meta"],
            },
            {
              name: "storage.image.tag",
              value: versions["supabase-storage"],
            },
            {
              name: "analytics.image.tag",
              value: versions["supabase-analytics"],
            },
            {
              name: "functions.image.tag",
              value: versions["supabase-functions"],
            },
            {
              name: "vector.image.tag",
              value: versions["supabase-vector"],
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
