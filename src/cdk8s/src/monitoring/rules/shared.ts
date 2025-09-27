import { PrometheusRuleSpecGroupsRulesExpr } from "../../../imports/monitoring.coreos.com";

// Helper to create readable template strings with Helm escaping
export function escapePrometheusTemplate(template: string): string {
  return template
    .replace(/\{\{\s*\$value\s*\}\}/g, '{{ "{{" }} $value {{ "}}" }}')
    .replace(
      /\{\{\s*\$labels\.(\w+)\s*\}\}/g,
      '{{ "{{" }} $labels.$1 {{ "}}" }}',
    );
}

// Rule factory functions for common alert patterns
export function createSensorAlert(
  name: string,
  entity: string,
  condition: string,
  threshold: string | number,
  description: string,
  summary: string,
  duration = "10m",
  severity = "warning",
) {
  return {
    alert: name,
    annotations: {
      description: description
        .replace("${value}", PrometheusTemplates.value)
        .replace("${entity}", PrometheusTemplates.entity),
      summary,
    },
    expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
      `${entity} ${condition} ${String(threshold)}`,
    ),
    for: duration,
    labels: { severity },
  };
}

export function createBinarySensorAlert(
  name: string,
  entity: string,
  description: string,
  summary: string,
  duration = "5m",
) {
  return createSensorAlert(
    name,
    `homeassistant_binary_sensor_state{entity="${entity}"}`,
    "==",
    1,
    description,
    summary,
    duration,
  );
}
