import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";

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
        targetRevision: versions["kubernetes-csi/external-snapshotter"],
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
