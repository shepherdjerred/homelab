import { Chart } from "npm:cdk8s";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

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

  // new RecurringJobV1Beta2(chart, "longhorn-recurring-job", {
  //   spec: {
  //     cron: "0 0 * * *",
  //     task: RecurringJobV1Beta2SpecTask.BACKUP,
  //     groups: ["default"],
  //     retain: 28,
  //     concurrency: 4,
  //   },
  //   metadata: {
  //     namespace: "longhorn",
  //   },
  // });
}
