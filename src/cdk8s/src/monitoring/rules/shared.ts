import { PrometheusRuleSpecGroupsRulesExpr } from "../../../imports/monitoring.coreos.com";

// Prometheus template helpers for better readability
export const PrometheusTemplates = {
  value: "{{ $value }}",
  valueAsPercentage: "{{ $value | humanizePercentage }}",
  entity: "{{ $labels.entity }}",

  // Common template patterns
  valueWithEntity: (unit = "") => `{{ $value }}${unit} ({{ $labels.entity }})`,
  entityWithValue: (unit = "") =>
    `{{ $labels.entity }} reports {{ $value }}${unit}`,

  // Helper to create readable template strings
  template: (str: string) => str.replace(/\$\{(\w+)\}/g, "{{ $$1 }}"),
};

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
