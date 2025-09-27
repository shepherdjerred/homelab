import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { HelmValuesForChart } from "../../helm-types/helm/index.js";

export function createCertManagerApp(chart: Chart) {
  const certManagerValues: HelmValuesForChart<"cert-manager"> = {
    installCRDs: true,
    prometheus: {
      enabled: true,
      servicemonitor: {
        enabled: true,
      },
    },
    // webhook: {
    //   prometheus: {
    //     enabled: true,
    //     servicemonitor: {
    //       enabled: true,
    //     },
    //   },
    // },
    // cainjector: {
    //   prometheus: {
    //     enabled: true,
    //     servicemonitor: {
    //       enabled: true,
    //     },
    //   },
    // },
  };

  return new Application(chart, "cert-manager-app", {
    metadata: {
      name: "cert-manager",
    },
    spec: {
      project: "default",
      source: {
        // https://artifacthub.io/packages/search?org=cert-manager
        repoUrl: "https://charts.jetstack.io",
        chart: "cert-manager",
        targetRevision: versions["cert-manager"],
        helm: {
          valuesObject: certManagerValues, // ✅ Now type-checked against CertmanagerHelmValues
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "cert-manager",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
