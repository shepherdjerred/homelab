import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { Namespace } from "cdk8s-plus-31";

export function createPromtailApp(chart: Chart) {
  new Namespace(chart, "promtail-namespcae", {
    metadata: {
      name: "promtail",
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
      },
    },
  });

  new Application(chart, "promtail-app", {
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
          valuesObject: {
            config: {
              clients: [
                {
                  url: "http://loki-gateway.loki/loki/api/v1/push",
                },
              ],
            },
          },
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
