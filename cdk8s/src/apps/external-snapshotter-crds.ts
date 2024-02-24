import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createExternalSnapshotterCrdsApp(chart: Chart) {
  return new Application(chart, "external-snapshotter-crds-app", {
    metadata: {
      name: "external-snapshotter-crds",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/kubernetes-csi/external-snapshotter",
        path: "client/config/crd/",
        targetRevision: "release-4.0",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "external-snapshotter",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
