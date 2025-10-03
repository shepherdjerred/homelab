import { Chart, Size } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import { createIngress } from "../utils/tailscale.ts";
import { HDD_STORAGE_CLASS } from "../storageclasses.ts";
import type { HelmValuesForChart } from "../../helm-types/helm-parameters.ts";
export function createChartMuseumApp(chart: Chart) {
  createIngress(chart, "chartmusuem-ingress", "chartmuseum", "chartmuseum", 8080, ["chartmuseum"], true);

  const basicAuth = new OnePasswordItem(chart, "chartmuseum-admin-password", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/wwoism5fsvmbisv4ef47yxqy2i",
    },
    metadata: {
      name: "chartmuseum-basic-auth",
      namespace: "chartmuseum",
    },
  });

  const chartMuseumValues: HelmValuesForChart<"chartmuseum"> = {
    persistence: {
      enabled: true,
      storageClass: HDD_STORAGE_CLASS,
      size: Size.gibibytes(8).asString(),
    }, // Type assertion for persistence config
    env: {
      open: {
        DISABLE_API: false,
        AUTH_ANONYMOUS_GET: true,
      },
      existingSecret: basicAuth.name,
      existingSecretMappings: {
        BASIC_AUTH_USER: "username",
        BASIC_AUTH_PASS: "password",
      },
    },
  };

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
          valuesObject: chartMuseumValues,
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
