import { PrometheusRuleSpecGroups } from "../../../../../generated/imports/monitoring.coreos.com";
import { PrometheusRuleSpecGroupsRulesExpr } from "../../../../../generated/imports/monitoring.coreos.com";
import { escapePrometheusTemplate } from "./shared";

export function getPostalRuleGroups(): PrometheusRuleSpecGroups[] {
  return [
    {
      name: "postal-availability",
      rules: [
        {
          alert: "PostalWebDown",
          annotations: {
            summary: "Postal web UI is down",
            message: escapePrometheusTemplate(
              "Postal web deployment has {{ $value }} available replicas (expected 1). Web UI is unavailable.",
            ),
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'kube_deployment_status_replicas_available{namespace="postal", deployment="postal-postal-web"} < 1',
          ),
          for: "5m",
          labels: {
            severity: "critical",
          },
        },
        {
          alert: "PostalSMTPDown",
          annotations: {
            summary: "Postal SMTP server is down",
            message: escapePrometheusTemplate(
              "Postal SMTP deployment has {{ $value }} available replicas (expected 1). Inbound email reception is unavailable.",
            ),
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'kube_deployment_status_replicas_available{namespace="postal", deployment="postal-postal-smtp"} < 1',
          ),
          for: "5m",
          labels: {
            severity: "critical",
          },
        },
        {
          alert: "PostalWorkerDown",
          annotations: {
            summary: "Postal worker is down",
            message: escapePrometheusTemplate(
              "Postal worker deployment has {{ $value }} available replicas (expected 1). Email delivery processing is stopped.",
            ),
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'kube_deployment_status_replicas_available{namespace="postal", deployment="postal-postal-worker"} < 1',
          ),
          for: "5m",
          labels: {
            severity: "critical",
          },
        },
      ],
    },
    {
      name: "postal-queue",
      rules: [
        {
          alert: "PostalQueueBacklog",
          annotations: {
            summary: "Postal message queue backlog",
            message: escapePrometheusTemplate("Postal has {{ $value }} held messages. Email delivery may be delayed."),
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString("postal_held_messages > 100"),
          for: "15m",
          labels: {
            severity: "warning",
          },
        },
        {
          alert: "PostalQueueCritical",
          annotations: {
            summary: "Postal message queue critically backed up",
            message: escapePrometheusTemplate(
              "Postal has {{ $value }} held messages. Email delivery is severely impacted.",
            ),
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString("postal_held_messages > 500"),
          for: "5m",
          labels: {
            severity: "critical",
          },
        },
      ],
    },
    {
      name: "postal-delivery",
      rules: [
        {
          alert: "PostalDeliveryFailureRateHigh",
          annotations: {
            summary: "High email delivery failure rate",
            message: escapePrometheusTemplate(
              "Postal delivery failure rate is {{ $value | humanizePercentage }}. Check SMTP relay and recipient domains.",
            ),
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            `(sum(rate(postal_messages_total{status="HardFail"}[5m])) + sum(rate(postal_messages_total{status="SoftFail"}[5m])))
             / sum(rate(postal_messages_total[5m])) > 0.1`,
          ),
          for: "15m",
          labels: {
            severity: "warning",
          },
        },
      ],
    },
    {
      name: "postal-health",
      rules: [
        {
          alert: "PostalPodRestarting",
          annotations: {
            summary: "Postal pod is restarting frequently",
            message: escapePrometheusTemplate(
              "Postal pod {{ $labels.pod }} has restarted {{ $value }} times in the last hour.",
            ),
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'increase(kube_pod_container_status_restarts_total{namespace="postal", pod=~"postal-.*"}[1h]) > 3',
          ),
          for: "5m",
          labels: {
            severity: "warning",
          },
        },
        {
          alert: "PostalMariaDBDown",
          annotations: {
            summary: "Postal MariaDB is down",
            message: escapePrometheusTemplate(
              "Postal MariaDB has {{ $value }} available replicas. Database is unavailable.",
            ),
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'kube_deployment_status_replicas_available{namespace="postal", deployment="postal-postal-mariadb"} < 1',
          ),
          for: "2m",
          labels: {
            severity: "critical",
          },
        },
      ],
    },
  ];
}
