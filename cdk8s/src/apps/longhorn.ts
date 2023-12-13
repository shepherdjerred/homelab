import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createLonghornApp(chart: Chart) {
  // TODO: move 1password secret here
  return new Application(chart, "longhorn-app", {
    metadata: {
      name: "longhorn",
      namespace: "argocd",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://charts.longhorn.io",
        targetRevision: "1.5.3",
        chart: "longhorn",
        helm: {
          parameters: [
            {
              name: "helmPreUpgradeCheckerJob.enabled",
              value: "false",
            },
            {
              name: "persistence.defaultClassReplicaCount",
              value: "1",
            },
            {
              name: "defaultSettings.backupTarget",
              value: "s3://longhorn-backup@auto/",
            },
            {
              name: "defaultSettings.backupTargetCredentialSecret",
              value: "aws-secret",
            },
          ],
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "longhorn",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
