import type { PrometheusRuleSpecGroups } from "../../imports/monitoring.coreos.com.ts";

export function getSmartctlRuleGroups(): PrometheusRuleSpecGroups[] {
  return [
    {
      name: "smartctl.rules",
      interval: "30s",
      rules: [
        // SMART Health Status Rules
        {
          alert: "SmartDeviceHealthFailure",
          expr: "smartmon_device_smart_healthy == 0",
          for: "0m",
          labels: {
            severity: "critical",
            category: "hardware",
          },
          annotations: {
            summary:
              "SMART health check failed for device {{ $labels.device }}",
            description:
              "Device {{ $labels.device }} ({{ $labels.model_name }}) has failed SMART health check. Serial: {{ $labels.serial_number }}",
          },
        },
        {
          alert: "SmartDeviceTemperatureHigh",
          expr: "smartmon_temperature_celsius > 60",
          for: "5m",
          labels: {
            severity: "warning",
            category: "hardware",
          },
          annotations: {
            summary: "High temperature detected on device {{ $labels.device }}",
            description:
              "Device {{ $labels.device }} ({{ $labels.model_name }}) temperature is {{ $value }}°C, which is above the warning threshold of 60°C",
          },
        },
        {
          alert: "SmartDeviceTemperatureCritical",
          expr: "smartmon_temperature_celsius > 70",
          for: "1m",
          labels: {
            severity: "critical",
            category: "hardware",
          },
          annotations: {
            summary:
              "Critical temperature detected on device {{ $labels.device }}",
            description:
              "Device {{ $labels.device }} ({{ $labels.model_name }}) temperature is {{ $value }}°C, which is above the critical threshold of 70°C",
          },
        },

        // Reallocated Sectors
        {
          alert: "SmartReallocatedSectorsHigh",
          expr: "smartmon_reallocated_sector_ct_raw_value > 0",
          for: "0m",
          labels: {
            severity: "warning",
            category: "hardware",
          },
          annotations: {
            summary:
              "Reallocated sectors detected on device {{ $labels.device }}",
            description:
              "Device {{ $labels.device }} ({{ $labels.model_name }}) has {{ $value }} reallocated sectors. This may indicate disk degradation.",
          },
        },
        {
          alert: "SmartReallocatedSectorsCritical",
          expr: "smartmon_reallocated_sector_ct_raw_value > 10",
          for: "0m",
          labels: {
            severity: "critical",
            category: "hardware",
          },
          annotations: {
            summary:
              "High number of reallocated sectors on device {{ $labels.device }}",
            description:
              "Device {{ $labels.device }} ({{ $labels.model_name }}) has {{ $value }} reallocated sectors, indicating significant disk degradation.",
          },
        },

        // Pending Sectors
        {
          alert: "SmartPendingSectorsHigh",
          expr: "smartmon_current_pending_sector_raw_value > 0",
          for: "5m",
          labels: {
            severity: "warning",
            category: "hardware",
          },
          annotations: {
            summary: "Pending sectors detected on device {{ $labels.device }}",
            description:
              "Device {{ $labels.device }} ({{ $labels.model_name }}) has {{ $value }} pending sectors waiting for reallocation.",
          },
        },
        {
          alert: "SmartPendingSectorsCritical",
          expr: "smartmon_current_pending_sector_raw_value > 5",
          for: "1m",
          labels: {
            severity: "critical",
            category: "hardware",
          },
          annotations: {
            summary:
              "High number of pending sectors on device {{ $labels.device }}",
            description:
              "Device {{ $labels.device }} ({{ $labels.model_name }}) has {{ $value }} pending sectors, indicating potential hardware failure.",
          },
        },

        // Uncorrectable Errors
        {
          alert: "SmartUncorrectableErrors",
          expr: "smartmon_offline_uncorrectable_raw_value > 0",
          for: "0m",
          labels: {
            severity: "critical",
            category: "hardware",
          },
          annotations: {
            summary:
              "Uncorrectable errors detected on device {{ $labels.device }}",
            description:
              "Device {{ $labels.device }} ({{ $labels.model_name }}) has {{ $value }} uncorrectable errors. This indicates serious disk problems.",
          },
        },

        // UDMA CRC Error Count (for SATA drives)
        {
          alert: "SmartUdmaCrcErrorsHigh",
          expr: "smartmon_udma_crc_error_count_raw_value > 0",
          for: "5m",
          labels: {
            severity: "warning",
            category: "hardware",
          },
          annotations: {
            summary: "UDMA CRC errors detected on device {{ $labels.device }}",
            description:
              "Device {{ $labels.device }} ({{ $labels.model_name }}) has {{ $value }} UDMA CRC errors. This may indicate cable or interface problems.",
          },
        },

        // Power Cycle Count (for wear monitoring)
        {
          alert: "SmartHighPowerCycles",
          expr: "smartmon_power_cycle_count_raw_value > 10000",
          for: "0m",
          labels: {
            severity: "info",
            category: "hardware",
          },
          annotations: {
            summary: "High power cycle count on device {{ $labels.device }}",
            description:
              "Device {{ $labels.device }} ({{ $labels.model_name }}) has {{ $value }} power cycles, which is quite high for typical usage.",
          },
        },

        // SSD-specific rules
        {
          alert: "SmartSsdWearLevelingHigh",
          expr: "smartmon_wear_leveling_count_value < 10",
          for: "5m",
          labels: {
            severity: "warning",
            category: "hardware",
          },
          annotations: {
            summary:
              "SSD wear leveling count low on device {{ $labels.device }}",
            description:
              "SSD {{ $labels.device }} ({{ $labels.model_name }}) wear leveling count is {{ $value }}, indicating high wear level.",
          },
        },
        {
          alert: "SmartSsdWearLevelingCritical",
          expr: "smartmon_wear_leveling_count_value < 5",
          for: "1m",
          labels: {
            severity: "critical",
            category: "hardware",
          },
          annotations: {
            summary:
              "SSD wear leveling critically low on device {{ $labels.device }}",
            description:
              "SSD {{ $labels.device }} ({{ $labels.model_name }}) wear leveling count is {{ $value }}, indicating critical wear level.",
          },
        },

        // Data collection health
        {
          alert: "SmartMonitoringDown",
          expr: 'up{job="node-exporter"} == 1 unless on(instance) (smartmon_scrape_timestamp_seconds > (time() - 600))',
          for: "10m",
          labels: {
            severity: "warning",
            category: "monitoring",
          },
          annotations: {
            summary:
              "SMART monitoring not collecting data on {{ $labels.instance }}",
            description:
              "SMART monitoring has not collected data from {{ $labels.instance }} for more than 10 minutes.",
          },
        },
      ],
    },
    {
      name: "smartctl.recording.rules",
      interval: "30s",
      rules: [
        // Recording rules for better performance and easier querying
        {
          record: "smartmon:device_healthy",
          expr: "smartmon_device_smart_healthy",
        },
        {
          record: "smartmon:temperature_celsius",
          expr: "smartmon_temperature_celsius",
        },
        {
          record: "smartmon:power_on_hours",
          expr: "smartmon_power_on_hours",
        },
        {
          record: "smartmon:reallocated_sectors_total",
          expr: "smartmon_reallocated_sector_ct_raw_value",
        },
        {
          record: "smartmon:pending_sectors_total",
          expr: "smartmon_current_pending_sector_raw_value",
        },
        {
          record: "smartmon:uncorrectable_errors_total",
          expr: "smartmon_offline_uncorrectable_raw_value",
        },
        // Aggregate health metrics per node
        {
          record: "smartmon:node_unhealthy_devices",
          expr: 'count by (instance) (smartmon_device_smart_healthy{smartmon_device_smart_healthy="0"})',
        },
        {
          record: "smartmon:node_total_devices",
          expr: "count by (instance) (smartmon_device_smart_healthy)",
        },
        {
          record: "smartmon:node_health_ratio",
          expr: "smartmon:node_unhealthy_devices / smartmon:node_total_devices",
        },
      ],
    },
  ];
}
