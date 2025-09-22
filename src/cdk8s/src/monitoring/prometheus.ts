import { PrometheusRule } from "../../imports/monitoring.coreos.com";
import { PrometheusRuleSpecGroupsRulesExpr } from "../../imports/monitoring.coreos.com";
import { Chart } from "cdk8s";

export function createPrometheusMonitoring(chart: Chart) {
  new PrometheusRule(chart, "prometheus-homeassistant-rules", {
    metadata: {
      name: "prometheus-homeassistant-rules",
      namespace: "prometheus",
      labels: { release: "prometheus" },
    },
    spec: {
      groups: [
        {
          name: "homeassistant-litter-robot",
          rules: [
            {
              alert: "LitterRobotLitterLow",
              annotations: {
                description:
                  'Litter Robot litter is low: {{ "{{" }} $value {{ "}}" }}% ({{ "{{" }} $labels.entity {{ "}}" }}).',
                summary: "Litter Robot litter low",
              },
              expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
                `homeassistant_sensor_unit_percent{entity="sensor.litter_robot_4_litter_level"} < 90`,
              ),
              for: "10m",
              labels: {
                severity: "warning",
              },
            },
            {
              alert: "LitterRobotWasteHigh",
              annotations: {
                description:
                  'Litter Robot waste drawer is high: {{ "{{" }} $value {{ "}}" }}% ({{ "{{" }} $labels.entity {{ "}}" }}).',
                summary: "Litter Robot waste high",
              },
              expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
                `homeassistant_sensor_unit_percent{entity="sensor.litter_robot_4_waste_drawer"} > 70`,
              ),
              for: "10m",
              labels: {
                severity: "warning",
              },
            },
          ],
        },
        {
          name: "homeassistant-binary-sensors",
          rules: [
            {
              alert: "EversweetWaterLevelBad",
              annotations: {
                description:
                  'Binary sensor {{ "{{" }} $labels.entity {{ "}}" }} reports bad state ({{ "{{" }} $value {{ "}}" }}).',
                summary: "Home Assistant binary sensor bad state",
              },
              expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
                `homeassistant_binary_sensor_state{entity="binary_sensor.eversweet_3_pro_water_level"} == 1`,
              ),
              for: "5m",
              labels: {
                severity: "warning",
              },
            },
            {
              alert: "GranaryFeederBatteryStatusBad",
              annotations: {
                description:
                  'Binary sensor {{ "{{" }} $labels.entity {{ "}}" }} reports bad state ({{ "{{" }} $value {{ "}}" }}).',
                summary: "Home Assistant binary sensor bad state",
              },
              expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
                `homeassistant_binary_sensor_state{entity="binary_sensor.granary_smart_camera_feeder_battery_status"} == 1`,
              ),
              for: "5m",
              labels: {
                severity: "warning",
              },
            },
            {
              alert: "GranaryFeederFoodDispenserBad",
              annotations: {
                description:
                  'Binary sensor {{ "{{" }} $labels.entity {{ "}}" }} reports bad state ({{ "{{" }} $value {{ "}}" }}).',
                summary: "Home Assistant binary sensor bad state",
              },
              expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
                `homeassistant_binary_sensor_state{entity="binary_sensor.granary_smart_camera_feeder_food_dispenser"} == 1`,
              ),
              for: "5m",
              labels: {
                severity: "warning",
              },
            },
            {
              alert: "GranaryFeederFoodStatusBad",
              annotations: {
                description:
                  'Binary sensor {{ "{{" }} $labels.entity {{ "}}" }} reports bad state ({{ "{{" }} $value {{ "}}" }}).',
                summary: "Home Assistant binary sensor bad state",
              },
              expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
                `homeassistant_binary_sensor_state{entity="binary_sensor.granary_smart_camera_feeder_food_status"} == 1`,
              ),
              for: "5m",
              labels: {
                severity: "warning",
              },
            },
            {
              alert: "RoombaBinFull",
              annotations: {
                description:
                  'Binary sensor {{ "{{" }} $labels.entity {{ "}}" }} reports bad state ({{ "{{" }} $value {{ "}}" }}).',
                summary: "Home Assistant binary sensor bad state",
              },
              expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
                `homeassistant_binary_sensor_state{entity="binary_sensor.roomba_bin_full"} == 1`,
              ),
              for: "5m",
              labels: {
                severity: "warning",
              },
            },
          ],
        },
        {
          name: "homeassistant-batteries",
          rules: [
            {
              alert: "HomeAssistantBatteryLow",
              annotations: {
                description:
                  'Battery low: {{ "{{" }} $value {{ "}}" }}% ({{ "{{" }} $labels.entity {{ "}}" }}).',
                summary: "Home Assistant battery low",
              },
              expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
                `min by (entity) (homeassistant_sensor_battery_percent) < 50`,
              ),
              for: "10m",
              labels: {
                severity: "warning",
              },
            },
          ],
        },
      ],
    },
  });
}
