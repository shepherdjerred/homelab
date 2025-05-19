import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";

export function createOpenEBSApp(chart: Chart) {
  new Application(chart, "openebs-app", {
    metadata: {
      name: "openebs",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://openebs.github.io/openebs",
        targetRevision: versions["openebs"],
        chart: "openebs",
        helm: {
          parameters: [
            { name: "engines.replicated.mayastor.enabled", value: "false" },
            { name: "engines.local.lvm.enabled", value: "false" },
            { name: "zfs-localpv.zfsNode.encrKeysDir", value: "/var" },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "openebs",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
