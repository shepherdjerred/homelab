import {
  PrometheusRuleSpecGroups,
  PrometheusRuleSpecGroupsRulesExpr,
} from "../../../../../generated/imports/monitoring.coreos.com";
import { escapePrometheusTemplate } from "./shared";

export function getHaWorkflowRuleGroups(): PrometheusRuleSpecGroups[] {
  return [
    // Workflow failure alerts
    {
      name: "ha-workflow-failures",
      rules: [
        {
          alert: "HaWorkflowFailed",
          annotations: {
            description: escapePrometheusTemplate(
              'HA workflow "{{ $labels.workflow }}" failed. Check logs for details.',
            ),
            summary: "HA workflow failed",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'increase(ha_workflow_executions_total{status="failure"}[5m]) > 0',
          ),
          for: "1m",
          labels: { severity: "warning" },
        },
        {
          alert: "HaWorkflowHighFailureRate",
          annotations: {
            description: escapePrometheusTemplate(
              'HA workflow "{{ $labels.workflow }}" has a high failure rate: {{ $value | humanizePercentage }}. This may indicate a persistent issue.',
            ),
            summary: "HA workflow high failure rate",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            `(
              rate(ha_workflow_executions_total{status="failure"}[15m])
              /
              rate(ha_workflow_executions_total[15m])
            ) > 0.5`,
          ),
          for: "10m",
          labels: { severity: "critical" },
        },
      ],
    },

    // Workflow execution duration alerts
    {
      name: "ha-workflow-performance",
      rules: [
        {
          alert: "HaWorkflowSlowExecution",
          annotations: {
            description: escapePrometheusTemplate(
              'HA workflow "{{ $labels.workflow }}" is taking longer than usual to execute. P95 duration: {{ $value }}s.',
            ),
            summary: "HA workflow slow execution",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "histogram_quantile(0.95, rate(ha_workflow_duration_seconds_bucket[5m])) > 300",
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
      ],
    },

    // Scheduled workflow missing execution alerts
    {
      name: "ha-workflow-scheduled",
      rules: [
        // Good morning workflows - should run every day
        {
          alert: "HaGoodMorningWorkflowMissing",
          annotations: {
            description: escapePrometheusTemplate(
              'HA Good Morning workflow "{{ $labels.workflow }}" has not run in the last 25 hours. Expected to run daily around 7-9am.',
            ),
            summary: "HA Good Morning workflow missing",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'increase(ha_workflow_executions_total{workflow=~"good_morning_.*",status="success"}[25h]) == 0',
          ),
          for: "30m",
          labels: { severity: "warning" },
        },

        // Vacuum workflow - should run every day at 9am
        {
          alert: "HaVacuumWorkflowMissing",
          annotations: {
            description: escapePrometheusTemplate(
              "HA Vacuum workflow has not run in the last 25 hours. Expected to run daily at 9am.",
            ),
            summary: "HA Vacuum workflow missing",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'increase(ha_workflow_executions_total{workflow="run_vacuum_if_not_home",status="success"}[25h]) == 0',
          ),
          for: "30m",
          labels: { severity: "info" },
        },
      ],
    },

    // Workflow stuck/hanging alerts
    {
      name: "ha-workflow-stuck",
      rules: [
        {
          alert: "HaWorkflowStuck",
          annotations: {
            description: escapePrometheusTemplate(
              'HA workflow "{{ $labels.workflow }}" has been running for more than 30 minutes. This may indicate the workflow is stuck.',
            ),
            summary: "HA workflow possibly stuck",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString("ha_workflows_in_progress > 0"),
          for: "30m",
          labels: { severity: "warning" },
        },
      ],
    },

    // Application health
    {
      name: "ha-application-health",
      rules: [
        {
          alert: "HaApplicationDown",
          annotations: {
            description: "HA automation application is down or not reporting metrics.",
            summary: "HA application down",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString("up{job=~'.*ha.*'} == 0"),
          for: "5m",
          labels: { severity: "critical" },
        },
        {
          alert: "HaApplicationRestarted",
          annotations: {
            description: escapePrometheusTemplate(
              "HA automation application has restarted. Current uptime: {{ $value }}s.",
            ),
            summary: "HA application restarted",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString("ha_uptime_seconds < 300"),
          for: "1m",
          labels: { severity: "info" },
        },
      ],
    },
  ];
}
