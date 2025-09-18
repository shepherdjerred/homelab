import { Chart, Size } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import { createIngress } from "../utils/tailscale.ts";
import { HDD_STORAGE_CLASS } from "../storageclasses.ts";

export function createChartMuseumApp(chart: Chart) {
  createIngress(
    chart,
    "chartmusuem-ingress",
    "chartmuseum",
    "chartmuseum",
    8080,
    ["chartmuseum"],
    true,
  );

  const basicAuth = new OnePasswordItem(chart, "chartmuseum-admin-password", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/wwoism5fsvmbisv4ef47yxqy2i",
    },
    metadata: {
      name: "chartmuseum-basic-auth",
      namespace: "chartmuseum",
    },
  });

  return new Application(chart, "chartmuseum-app", {
    metadata: {
      name: "chartmuseum",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://chartmuseum.github.io/charts",
        targetRevision: versions.chartmuseum,
        chart: "chartmuseum",
        helm: {
          parameters: [
            { name: "persistence.enabled", value: "true" },
            { name: "persistence.storageClass", value: HDD_STORAGE_CLASS },
            { name: "persistence.size", value: Size.gibibytes(8).asString() },
            { name: "env.open.DISABLE_API", value: "false" },
            { name: "env.open.AUTH_ANONYMOUS_GET", value: "true" },
            { name: "env.existingSecret", value: basicAuth.name },
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
