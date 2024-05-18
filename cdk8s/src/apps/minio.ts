import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

export function createMinioApp(chart: Chart) {
  new Application(chart, "minio-app", {
    metadata: {
      name: "minio",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/bitnami/charts/tree/main/bitnami/minio
        repoUrl: "https://charts.bitnami.com/bitnami",
        chart: "minio",
        targetRevision: versions["minio"],
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
