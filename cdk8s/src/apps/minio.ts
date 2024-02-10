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
        repoUrl: "oci://registry-1.docker.io/bitnamicharts/minio",
        chart: "minio",
        targetRevision: "13.4.5",
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
