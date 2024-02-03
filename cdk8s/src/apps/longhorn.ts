import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import {
  RecurringJobV1Beta2,
  RecurringJobV1Beta2SpecTask,
} from "../../imports/longhorn.io.ts";

const recurringJobSuffix = "longhorn-recurring-job";
export const recurringJobName = `turing-${recurringJobSuffix}`;

export function createLonghornApp(chart: Chart) {
  const item = new OnePasswordItem(chart, "longhorn-secret", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/47zgh2s2tj4ite3gujflgqiwsq",
    },
    metadata: {
      namespace: "longhorn",
      name: "aws-secret",
    },
  });

  new Application(chart, "longhorn-app", {
    metadata: {
      name: "longhorn",
      namespace: "argocd",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://charts.longhorn.io",
        targetRevision: "1.6.0",
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
              value: item.name,
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

  new RecurringJobV1Beta2(chart, "longhorn-recurring-job", {
    spec: {
      cron: "0 0 * * *",
      task: RecurringJobV1Beta2SpecTask.BACKUP,
      labels: {},
      retain: 3,
      concurrency: 4,
      name: recurringJobSuffix,
    },
    metadata: {
      namespace: "longhorn",
    },
  });
}
