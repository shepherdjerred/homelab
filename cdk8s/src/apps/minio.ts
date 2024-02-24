import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createMinioApp(chart: Chart) {
  new Application(chart, "minio-app", {
    metadata: {
      name: "minio",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://charts.bitnami.com/bitnami",
        chart: "minio",
        targetRevision: "13.6.2",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "minio",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
