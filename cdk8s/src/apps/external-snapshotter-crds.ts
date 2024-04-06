import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.json" with { type: "json" };

// required for volsync
export function createExternalSnapshotterCrdsApp(chart: Chart) {
  return new Application(chart, "external-snapshotter-crds-app", {
    metadata: {
      name: "external-snapshotter-crds",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/kubernetes-csi/external-snapshotter
        repoUrl: "https://github.com/kubernetes-csi/external-snapshotter",
        path: "client/config/crd/",
        targetRevision:
          versions["https://github.com/kubernetes-csi/external-snapshotter"],
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
