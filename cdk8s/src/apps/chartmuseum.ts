import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import { Secret } from "https://esm.sh/cdk8s-plus-27@2.9.3";

export function createChartMuseumApp(chart: Chart) {
  const basicAuth = new OnePasswordItem(
    chart,
    "chartmuseum-admin-password",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/wwoism5fsvmbisv4ef47yxqy2i",
      },
      metadata: {
        name: "chartmuseum-basic-auth",
        namespace: "chartmuseum",
      },
    },
  );

  const secret = Secret.fromSecretName(
    chart,
    "chartmuseum-secret",
    basicAuth.name,
  );

  return new Application(chart, "chartmuseum-app", {
    metadata: {
      name: "chartmuseum",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.github.io/charts",
        targetRevision: versions["chartmuseum"],
        chart: "chartmuseum",
        helm: {
          parameters: [
            { name: "persistence.enabled", value: "true" },
            { name: "persistence.storageClass", value: "local-path" },
            { name: "env.open.DISABLE_API", value: "false" },
            { name: "env.open.AUTH_ANONYMOUS_GET", value: "true" },
            { name: "env.existingSecret", value: secret.name },
            {
              name: "env.existingSecretMappings.BASIC_AUTH_USER",
              value: "username",
            },
            {
              name: "env.existingSecretMappings.BASIC_AUTH_PASS",
              value: "password",
            },
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
