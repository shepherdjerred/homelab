import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { createInvidiousPostgreSQLDatabase } from "../postgres/invidious-db.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";

export function createInvidiousApp(chart: Chart) {
  // Create namespace for Invidious
  new Namespace(chart, "invidious-namespace", {
    metadata: {
      name: "invidious",
      labels: {
        "pod-security.kubernetes.io/audit": "restricted",
      },
    },
  });

  // Create PostgreSQL database using the operator
  createInvidiousPostgreSQLDatabase(chart);

  // Create Tailscale ingress for Invidious
  createIngress(chart, "invidious-ingress", "invidious", "invidious", 3000, ["invidious"], true);

  const invidiousValues: HelmValuesForChart<"invidious"> = {
    config: {
      // Additional Invidious configuration
      // check_tables: true,
      // external_port: 3000,
      domain: "invidious.tailnet-1a49.ts.net",
      https_only: false,
      // hmac_key: "CHANGE_ME_IN_PRODUCTION", // TODO: Replace with a secure value
    },
    postgresql: {
      enabled: false, // Using postgres-operator instead of bundled PostgreSQL
    },
    service: {
      type: "ClusterIP",
      port: 3000,
    },
    ingress: {
      enabled: false, // Using Tailscale ingress instead
    },
  };

  return new Application(chart, "invidious-app", {
    metadata: {
      name: "invidious",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://iv-org.github.io/invidious-helm-chart",
        targetRevision: versions.invidious,
        chart: "invidious",
        helm: {
          valuesObject: invidiousValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "invidious",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
