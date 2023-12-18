import { Chart } from "npm:cdk8s";
import {
  RecurringJobV1Beta2,
  RecurringJobV1Beta2SpecTask,
} from "../imports/longhorn.io.ts";

export function createLonghornResources(chart: Chart) {
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
