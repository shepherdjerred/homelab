import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createSystemUpgradeControllerApp(chart: Chart) {
  return new Application(chart, "system-upgrade-controller-app", {
    metadata: {
      name: "system-upgrade-controller",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/rancher/system-upgrade-controller/",
        path: "manifests/",
        targetRevision: "v0.13.2",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "system-upgrade",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
