import { PrometheusRuleSpecGroups } from "../../../imports/monitoring.coreos.com";
import {
  createSensorAlert,
  createBinarySensorAlert,
  escapePrometheusTemplate,
} from "./shared";

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
          "Binary sensor {{ $labels.entity }} reports bad state ({{ $value }}).",
          "Eversweet water level bad",
        ),
        createBinarySensorAlert(
          "GranaryFeederBatteryStatusBad",
          "binary_sensor.granary_smart_camera_feeder_battery_status",
          "Binary sensor {{ $labels.entity }} reports bad state ({{ $value }}).",
          "Granary feeder battery status bad",
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
          "Binary sensor {{ $labels.entity }} reports bad state ({{ $value }}).",
          "Granary feeder food status bad",
        ),
        createBinarySensorAlert(
          "RoombaBinFull",
          "binary_sensor.roomba_bin_full",
          "Binary sensor {{ $labels.entity }} reports bad state ({{ $value }}).",
          "Roomba bin full",
        ),
      ],
    },

    // Battery monitoring
    {
      name: "homeassistant-batteries",
      rules: [
        createSensorAlert(
          "HomeAssistantBatteryLow",
          "min by (entity) (homeassistant_sensor_battery_percent)",
          "<",
          50,
          "Battery low: {{ $value }}% ({{ $labels.entity }}).",
          "Home Assistant battery low",
        ),
      ],
    },
  ];
}
