import { Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import versions from "../../versions.ts";

export function createBlackboxExporterApp(chart: Chart) {
  return new Application(chart, "blackbox-exporter-app", {
    metadata: { name: "blackbox-exporter" },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://prometheus-community.github.io/helm-charts",
        chart: "prometheus-blackbox-exporter",
        targetRevision: versions["prometheus-blackbox-exporter"],
        helm: {
          releaseName: "prometheus-prometheus-blackbox-exporter",
          valuesObject: {
            serviceMonitor: { enabled: true },
            config: {
              modules: {
                http_2xx: {
                  prober: "http",
                  timeout: "10s",
                  http: {
                    validHttpVersions: ["HTTP/1.1", "HTTP/2.0"],
                    followRedirects: true,
                    preferredIpProtocol: "ip4",
                  },
                },
              },
            },
          },
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
