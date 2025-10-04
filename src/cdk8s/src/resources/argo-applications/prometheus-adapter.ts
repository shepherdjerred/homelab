import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";

export function createPrometheusAdapterApp(chart: Chart) {
  const prometheusAdapterValues: HelmValuesForChart<"prometheus-adapter"> = {
    prometheus: {
      url: "http://prometheus-kube-prometheus-prometheus.prometheus.svc",
      port: 9090,
      path: "",
    },
    replicas: 2,
    podDisruptionBudget: {
      enabled: true,
      minAvailable: 1,
    },
    // Use default rules which include resource metrics (CPU/memory)
    // and allow custom metrics to be added later if needed
    rules: {
      default: true,
      custom: [],
    },
  };

  return new Application(chart, "prometheus-adapter-app", {
    metadata: {
      name: "prometheus-adapter",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://prometheus-community.github.io/helm-charts",
        targetRevision: versions["prometheus-adapter"],
        chart: "prometheus-adapter",
        helm: {
          valuesObject: prometheusAdapterValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "prometheus",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
