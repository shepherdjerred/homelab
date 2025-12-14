import { Chart } from "cdk8s";
import { KubeCronJob, KubeNamespace, Quantity } from "../../../generated/imports/k8s.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";

export function createDependencySummaryCronJob(chart: Chart) {
  // Create namespace for dependency summary
  new KubeNamespace(chart, "dependency-summary-namespace", {
    metadata: {
      name: "dependency-summary",
    },
  });

  // 1Password secret for API keys
  const secretItem = new OnePasswordItem(chart, "dependency-summary-secrets", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/dependency-summary",
    },
    metadata: {
      name: "dependency-summary-secrets",
      namespace: "dependency-summary",
    },
  });

  // CronJob to run every Monday at 9am
  new KubeCronJob(chart, "dependency-summary-cronjob", {
    metadata: {
      name: "dependency-summary",
      namespace: "dependency-summary",
    },
    spec: {
      // Every Monday at 9am UTC
      schedule: "0 9 * * 1",
      timeZone: "America/Los_Angeles",
      concurrencyPolicy: "Forbid",
      successfulJobsHistoryLimit: 3,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          backoffLimit: 2,
          template: {
            spec: {
              restartPolicy: "OnFailure",
              containers: [
                {
                  name: "dependency-summary",
                  image: "oven/bun:1",
                  command: ["sh", "-c"],
                  args: [
                    `
                    set -e
                    # Install git
                    apt-get update && apt-get install -y git

                    # Clone the repo
                    git clone --depth 100 https://github.com/shepherdjerred/homelab.git /tmp/homelab
                    cd /tmp/homelab/src/ha

                    # Install dependencies
                    bun install

                    # Run the dependency summary script
                    bun run src/dependency-summary.ts
                    `.trim(),
                  ],
                  env: [
                    {
                      name: "OPENAI_API_KEY",
                      valueFrom: {
                        secretKeyRef: {
                          name: secretItem.name,
                          key: "openai_api_key",
                        },
                      },
                    },
                    {
                      name: "POSTAL_HOST",
                      valueFrom: {
                        secretKeyRef: {
                          name: secretItem.name,
                          key: "postal_host",
                        },
                      },
                    },
                    {
                      name: "POSTAL_API_KEY",
                      valueFrom: {
                        secretKeyRef: {
                          name: secretItem.name,
                          key: "postal_api_key",
                        },
                      },
                    },
                    {
                      name: "RECIPIENT_EMAIL",
                      valueFrom: {
                        secretKeyRef: {
                          name: secretItem.name,
                          key: "recipient_email",
                        },
                      },
                    },
                    {
                      name: "SENDER_EMAIL",
                      valueFrom: {
                        secretKeyRef: {
                          name: secretItem.name,
                          key: "sender_email",
                        },
                      },
                    },
                  ],
                  resources: {
                    requests: {
                      cpu: Quantity.fromString("100m"),
                      memory: Quantity.fromString("256Mi"),
                    },
                    limits: {
                      cpu: Quantity.fromString("500m"),
                      memory: Quantity.fromString("512Mi"),
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  });
}
