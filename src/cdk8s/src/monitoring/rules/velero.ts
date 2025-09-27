import { PrometheusRuleSpecGroups } from "../../../imports/monitoring.coreos.com";
import { PrometheusRuleSpecGroupsRulesExpr } from "../../../imports/monitoring.coreos.com";
import { PrometheusTemplates } from "./shared";

export function getVeleroRuleGroups(): PrometheusRuleSpecGroups[] {
  return [
    // Velero backup monitoring
    {
      name: "velero-backup",
      rules: [
        {
          alert: "VeleroBackupFailed",
          annotations: {
            message: "Velero backup {{ $labels.schedule }} has failed",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'velero_backup_last_status{schedule!=""} != 1',
          ),
          for: "15m",
          labels: {
            severity: "warning",
          },
        },
        {
          alert: "VeleroBackupFailing",
          annotations: {
            message:
              "Velero backup {{ $labels.schedule }} has been failing for the last 12h",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'velero_backup_last_status{schedule!=""} != 1',
          ),
          for: "12h",
          labels: {
            severity: "critical",
          },
        },
        {
          alert: "VeleroNoNewBackup",
          annotations: {
            message:
              "Velero backup {{ $labels.schedule }} has not run successfully in the last 30h",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            `(
  rate(velero_backup_last_successful_timestamp{schedule!=""}[15m]) <=bool 0
  or
  absent(velero_backup_last_successful_timestamp{schedule!=""})
) == 1`,
          ),
          for: "30h",
          labels: {
            severity: "critical",
          },
        },
        {
          alert: "VeleroBackupPartialFailures",
          annotations: {
            message: `Velero backup {{ $labels.schedule }} has ${PrometheusTemplates.valueAsPercentage} partially failed backups`,
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            `rate(velero_backup_partial_failure_total{schedule!=""}[25m])
  / rate(velero_backup_attempt_total{schedule!=""}[25m]) > 0.5`,
          ),
          for: "15m",
          labels: {
            severity: "warning",
          },
        },
      ],
    },
  ];
}
