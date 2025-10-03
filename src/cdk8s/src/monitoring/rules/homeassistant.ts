import { PrometheusRuleSpecGroups, PrometheusRuleSpecGroupsRulesExpr } from "../../../imports/monitoring.coreos.com";
import { createSensorAlert, createBinarySensorAlert } from "./shared";

export function getHomeAssistantRuleGroups(): PrometheusRuleSpecGroups[] {
  return [
    // Litter Robot monitoring
    {
      name: "homeassistant-litter-robot",
      rules: [
        createSensorAlert(
          "LitterRobotLitterLow",
          'homeassistant_sensor_unit_percent{entity="sensor.litter_robot_4_litter_level"}',
          "<",
          90,
          "Litter Robot litter is low: {{ $value }}% ({{ $labels.entity }}).",
          "Litter Robot litter low",
        ),
        createSensorAlert(
          "LitterRobotWasteHigh",
          'homeassistant_sensor_unit_percent{entity="sensor.litter_robot_4_waste_drawer"}',
          ">",
          70,
          "Litter Robot waste drawer is high: {{ $value }}% ({{ $labels.entity }}).",
          "Litter Robot waste high",
        ),
      ],
    },

    // Binary sensor monitoring
    {
      name: "homeassistant-binary-sensors",
      rules: [
        createBinarySensorAlert(
          "EversweetWaterLevelBad",
          "binary_sensor.eversweet_3_pro_water_level",
          "Binary sensor {{ $labels.entity }} reports low state ({{ $value }}).",
          "Eversweet water level low",
        ),
        createBinarySensorAlert(
          "GranaryFeederBatteryStatusBad",
          "binary_sensor.granary_smart_camera_feeder_battery_status",
          "Binary sensor {{ $labels.entity }} reports low state ({{ $value }}).",
          "Granary feeder battery status low",
        ),
        createBinarySensorAlert(
          "GranaryFeederFoodDispenserBad",
          "binary_sensor.granary_smart_camera_feeder_food_dispenser",
          "Binary sensor {{ $labels.entity }} reports bad state ({{ $value }}).",
          "Granary feeder food dispenser bad",
        ),
        createBinarySensorAlert(
          "GranaryFeederFoodStatusBad",
          "binary_sensor.granary_smart_camera_feeder_food_status",
          "Binary sensor {{ $labels.entity }} reports low state ({{ $value }}).",
          "Granary feeder low food",
        ),
        createSensorAlert(
          "GranaryFeederDesiccantRemainingDays",
          'homeassistant_sensor_duration_d{entity="sensor.granary_smart_camera_feeder_desiccant_remaining_days"}',
          "<=",
          0,
          "Granary feeder desiccant is overdue: {{ $value }} days remaining ({{ $labels.entity }}).",
          "Granary feeder desiccant remaining days",
        ),
        createBinarySensorAlert(
          "RoombaBinFull",
          "binary_sensor.roomba_bin_full",
          "Binary sensor {{ $labels.entity }} reports bad state ({{ $value }}).",
          "Roomba bin full",
          "15m",
        ),
      ],
    },

    // Battery monitoring
    {
      name: "homeassistant-batteries",
      rules: [
        // General battery alert for non-Roomba devices
        createSensorAlert(
          "HomeAssistantBatteryLow",
          'min by (entity) (homeassistant_sensor_battery_percent{entity!="sensor.roomba_battery"})',
          "<",
          50,
          "Battery low: {{ $value }}% ({{ $labels.entity }}).",
          "Home Assistant battery low",
        ),
        // Specific Roomba battery alert that only fires when battery is low AND decreasing (not charging)
        {
          alert: "RoombaBatteryLowNotCharging",
          annotations: {
            description:
              'Roomba battery is low and not charging: {{ "{{" }} $value {{ "}}" }}% ({{ "{{" }} $labels.entity {{ "}}" }}).',
            summary: "Roomba battery low and not charging",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'homeassistant_sensor_battery_percent{entity="sensor.roomba_battery"} < 20 and increase(homeassistant_sensor_battery_percent{entity="sensor.roomba_battery"}[30m]) <= 0',
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
      ],
    },
  ];
}
