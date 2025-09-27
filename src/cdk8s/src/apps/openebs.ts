import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { Namespace } from "cdk8s-plus-31";
import { HelmValuesForChart } from "../types/helm/index.js";

export function createOpenEBSApp(chart: Chart) {
  new Namespace(chart, `openebs-namespace`, {
    metadata: {
      name: `openebs`,
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
      },
    },
  });

  // ✅ Type-safe OpenEBS configuration with full IntelliSense
  const openEBSValues: HelmValuesForChart<"openebs"> = {
    engines: {
      replicated: {
        mayastor: {
          enabled: false,
        },
      },
      local: {
        lvm: {
          enabled: false,
        },
      },
    },
    "zfs-localpv": {
      zfsNode: {
        encrKeysDir: "/var",
      },
    },
    loki: {
      enabled: false,
    },
    alloy: {
      enabled: false,
    },
  };

  return new Application(chart, "openebs-app", {
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
          valuesObject: openEBSValues, // ✅ Now type-checked against OpenebsHelmValues
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
