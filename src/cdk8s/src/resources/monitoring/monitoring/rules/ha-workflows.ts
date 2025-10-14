import {
  PrometheusRuleSpecGroups,
  PrometheusRuleSpecGroupsRulesExpr,
} from "../../../../../generated/imports/monitoring.coreos.com";
import { escapePrometheusTemplate } from "./shared";

export function getHaWorkflowRuleGroups(): PrometheusRuleSpecGroups[] {
  return [
    // Recording rules for workflow timestamps
    // These capture the max timestamp over 7 days, persisting across app restarts
    {
      name: "ha-workflow-recordings",
      interval: "1m",
      rules: [
        {
          record: "ha_workflow_last_success_timestamp_max",
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'max without(pod, instance, container, endpoint) (max_over_time(ha_workflow_last_execution_timestamp{status="success"}[7d]))',
          ),
        },
      ],
    },

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
            'sum without(pod, instance, container, endpoint) (increase(ha_workflow_executions_total{status="failure"}[5m])) > 0',
          ),
          for: "1m",
          labels: { severity: "warning" },
        },
        {
          alert: "HaWorkflowTimeout",
          annotations: {
            description: escapePrometheusTemplate(
              'HA workflow "{{ $labels.workflow }}" timed out. Error type: {{ $labels.error_type }}. This may indicate a stuck Home Assistant API call or unresponsive device.',
            ),
            summary: "HA workflow timeout",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'sum without(pod, instance, container, endpoint) (increase(ha_workflow_errors_total{error_type="TimeoutError"}[5m])) > 0',
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
              sum without(pod, instance, container, endpoint) (rate(ha_workflow_executions_total{status="failure"}[15m]))
              /
              sum without(pod, instance, container, endpoint) (rate(ha_workflow_executions_total[15m]))
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
            "histogram_quantile(0.95, sum without(pod, instance, container, endpoint) (rate(ha_workflow_duration_seconds_bucket[5m]))) > 300",
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
        // Uses recording rule to survive app restarts
        {
          alert: "HaGoodMorningWorkflowMissing",
          annotations: {
            description: escapePrometheusTemplate(
              'HA Good Morning workflow "{{ $labels.workflow }}" has not run in the last 25 hours. Expected to run daily around 7-9am. Last run: {{ $value | humanizeDuration }} ago.',
            ),
            summary: "HA Good Morning workflow missing",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            `time() - max without(pod, instance, container, endpoint) (
              ha_workflow_last_success_timestamp_max{workflow=~"good_morning_.*", status="success"}
            ) > 90000`,
          ),
          for: "1h",
          labels: { severity: "warning" },
        },

        // Vacuum workflow - should run every day at 9am
        // Uses recording rule to survive app restarts
        {
          alert: "HaVacuumWorkflowMissing",
          annotations: {
            description: escapePrometheusTemplate(
              "HA Vacuum workflow has not run in the last 25 hours. Expected to run daily at 9am. Last run: {{ $value | humanizeDuration }} ago.",
            ),
            summary: "HA Vacuum workflow missing",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            `time() - max without(pod, instance, container, endpoint) (
              ha_workflow_last_success_timestamp_max{workflow="run_vacuum_if_not_home", status="success"}
            ) > 90000`,
          ),
          for: "1h",
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
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "sum without(pod, instance, container, endpoint) (ha_workflows_in_progress) > 0",
          ),
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
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "max without(pod, instance, container, endpoint) (up{job=~'.*ha.*'}) == 0",
          ),
          for: "5m",
          labels: { severity: "critical" },
        },
        {
          alert: "HaApplicationFrequentRestarts",
          annotations: {
            description: escapePrometheusTemplate(
              "HA automation application has restarted {{ $value }} times in the last hour. This may indicate instability.",
            ),
            summary: "HA application frequent restarts",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "sum without(pod, instance, container, endpoint) (changes(ha_uptime_seconds[1h])) > 3",
          ),
          for: "5m",
          labels: { severity: "warning" },
        },
      ],
    },
  ];
}
