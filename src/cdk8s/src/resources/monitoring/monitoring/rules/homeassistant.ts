import {
  PrometheusRuleSpecGroups,
  PrometheusRuleSpecGroupsRulesExpr,
} from "../../../../../generated/imports/monitoring.coreos.com";
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
        {
          alert: "LitterRobotNotCyclingRecently",
          annotations: {
            description: 'Litter Robot has not cycled in the last 6 hours ({{ "{{" }} $value {{ "}}" }} cycles).',
            summary: "Litter Robot not cycling",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'increase(homeassistant_sensor_unit_cycles{entity="sensor.litter_robot_4_total_cycles"}[6h]) == 0',
          ),
          for: "30m",
          labels: { severity: "warning" },
        },
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
        {
          alert: "GranaryFeederNotDispensing",
          annotations: {
            description:
              'Granary feeder has not dispensed food in over 14 hours. Time since last feed: {{ "{{" }} $value | humanizeDuration {{ "}}" }}.',
            summary: "Granary feeder not dispensing",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'time() - homeassistant_sensor_timestamp_seconds{entity="sensor.granary_smart_camera_feeder_last_feed_time"} > 50400',
          ),
          for: "30m",
          labels: { severity: "warning" },
        },
        createBinarySensorAlert(
          "RoombaBinFull",
          "binary_sensor.roomba_bin_full",
          "Binary sensor {{ $labels.entity }} reports bad state ({{ $value }}).",
          "Roomba bin full",
          "15m",
        ),
        {
          alert: "RoombaNotRunningRecently",
          annotations: {
            description:
              'Roomba has not run any missions in the last 48 hours ({{ "{{" }} $value {{ "}}" }} missions).',
            summary: "Roomba not running recently",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            'increase(homeassistant_sensor_unit_missions{entity="sensor.roomba_total_missions"}[48h]) == 0',
          ),
          for: "1h",
          labels: { severity: "warning" },
        },
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
