import { Chart } from "npm:cdk8s";
import { OnePasswordItem } from "../imports/onepassword.com.ts";
import {
  RecurringJobV1Beta2,
  RecurringJobV1Beta2SpecTask,
} from "../imports/longhorn.io.ts";

export function createLonghornResources(chart: Chart) {
  new OnePasswordItem(chart, "longhorn-secret", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/47zgh2s2tj4ite3gujflgqiwsq",
    },
    metadata: {
      namespace: "longhorn",
      name: "aws-secret",
    },
  });

  new RecurringJobV1Beta2(chart, "longhorn-recurring-job", {
    spec: {
      cron: "0 0 * * *",
      task: RecurringJobV1Beta2SpecTask.BACKUP,
      labels: {},
      retain: 3,
      concurrency: 4,
      name: "longhorn-recurring-job",
    },
    metadata: {
      namespace: "longhorn",
    },
  });
}
