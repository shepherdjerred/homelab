import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { Namespace } from "cdk8s-plus-31";
import { HelmValuesForChart } from "../types/helm/index.js";

export function createPromtailApp(chart: Chart) {
  new Namespace(chart, "promtail-namespcae", {
    metadata: {
      name: "promtail",
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
      },
    },
  });

  // ✅ Type-safe Promtail configuration with full IntelliSense
  const promtailValues: HelmValuesForChart<"promtail"> = {
    config: {
      clients: [
        {
          url: "http://loki-gateway.loki/loki/api/v1/push",
        },
      ],
    },
  };

  return new Application(chart, "promtail-app", {
    metadata: {
      name: "promtail",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/grafana/helm-charts/tree/main/charts/promtail
        repoUrl: "https://grafana.github.io/helm-charts",
        targetRevision: versions.promtail,
        chart: "promtail",
        helm: {
          valuesObject: promtailValues, // ✅ Now type-checked against PromtailHelmValues
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "promtail",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
