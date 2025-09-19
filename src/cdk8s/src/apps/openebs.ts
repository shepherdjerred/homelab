import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { Namespace } from "cdk8s-plus-31";

export function createOpenEBSApp(chart: Chart) {
  new Namespace(chart, `openebs-namespace`, {
    metadata: {
      name: `openebs`,
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
      },
    },
  });

  new Application(chart, "openebs-app", {
    metadata: {
      name: "openebs",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://openebs.github.io/openebs",
        targetRevision: versions.openebs,
        chart: "openebs",
        helm: {
          parameters: [
            { name: "engines.replicated.mayastor.enabled", value: "false" },
            { name: "engines.local.lvm.enabled", value: "false" },
            { name: "zfs-localpv.zfsNode.encrKeysDir", value: "/var" },
            { name: "loki.enabled", value: "false" },
            { name: "alloy.enabled", value: "false" },
          ],
          valuesObject: {
            ndmExporter: {
              enabled: true
            }
          }
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
