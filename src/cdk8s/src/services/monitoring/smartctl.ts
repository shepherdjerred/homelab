import { Chart } from "cdk8s";
import { ConfigMap, DaemonSet, Volume, ServiceAccount } from "cdk8s-plus-31";

export function createSmartctlMonitoring(chart: Chart) {
  // Create ServiceAccount for the DaemonSet
  const serviceAccount = new ServiceAccount(chart, "smartctl-service-account", {
    metadata: {
      name: "smartctl-service-account",
      namespace: "prometheus",
    },
  });

  // Create ConfigMap with the smartmon.sh script
  const smartmonScript = new ConfigMap(chart, "smartmon-script", {
    metadata: {
      name: "smartmon-script",
      namespace: "prometheus",
    },
    data: {
      "smartmon.sh": `#!/bin/bash
# Script to collect SMART metrics from disks and output in Prometheus format
# Based on prometheus-community/node-exporter-textfile-collector-scripts

set -eu

# Check if smartctl is available
if ! command -v smartctl >/dev/null 2>&1; then
    echo "# smartctl not found, skipping SMART metrics collection" >&2
    exit 0
fi

# Function to parse smartctl output and generate metrics
parse_smartctl_attributes() {
    local device="$1"
    local device_type="$2"

    # Get device info
    local model_family=$(smartctl -i "$device" | awk -F': +' '/^Model Family/ { print $2 }' | tr ' ' '_')
    local device_model=$(smartctl -i "$device" | awk -F': +' '/^Device Model/ { print $2 }' | tr ' ' '_')
    local serial_number=$(smartctl -i "$device" | awk -F': +' '/^Serial Number/ { print $2 }')
    local firmware_version=$(smartctl -i "$device" | awk -F': +' '/^Firmware Version/ { print $2 }' | tr ' ' '_')

    # Use model family if available, otherwise use device model
    local model_name="\${model_family:-\${device_model:-Unknown}}"

    # Get SMART overall health
    local smart_healthy=$(smartctl -H "$device" | awk '/^SMART overall-health/ { print ($NF == "PASSED") ? 1 : 0 }')

    # Output device info metrics
    echo "smartmon_device_info{device=\"$device\",type=\"$device_type\",model_family=\"\${model_family:-}\",model_name=\"\${device_model:-}\",serial_number=\"\${serial_number:-}\",firmware_version=\"\${firmware_version:-}\"} 1"
    echo "smartmon_device_smart_healthy{device=\"$device\",type=\"$device_type\",model_family=\"\${model_family:-}\",model_name=\"\${device_model:-}\",serial_number=\"\${serial_number:-}\"} \${smart_healthy:-0}"

    # Get SMART attributes
    smartctl -A "$device" | awk '
    $1 ~ /^[0-9]+$/ && $2 ~ /^[A-Za-z0-9_-]+$/ {
        gsub(/-/, "_", $2);
        printf "smartmon_" tolower($2) "_raw_value{device=\"'$device'\",type=\"'$device_type'\",model_family=\"'$model_family'\",model_name=\"'$device_model'\",serial_number=\"'$serial_number'\"} %d\\n", $10;
        printf "smartmon_" tolower($2) "_value{device=\"'$device'\",type=\"'$device_type'\",model_family=\"'$model_family'\",model_name=\"'$device_model'\",serial_number=\"'$serial_number'\"} %d\\n", $4;
        printf "smartmon_" tolower($2) "_threshold{device=\"'$device'\",type=\"'$device_type'\",model_family=\"'$model_family'\",model_name=\"'$device_model'\",serial_number=\"'$serial_number'\"} %d\\n", $6;
        printf "smartmon_" tolower($2) "_worst{device=\"'$device'\",type=\"'$device_type'\",model_family=\"'$model_family'\",model_name=\"'$device_model'\",serial_number=\"'$serial_number'\"} %d\\n", $5;
    }'

    # Get temperature if available
    local temp=$(smartctl -A "$device" | awk '/^194/ { print $10 }' | head -1)
    if [[ -n "$temp" && "$temp" =~ ^[0-9]+$ ]]; then
        echo "smartmon_temperature_celsius{device=\"$device\",type=\"$device_type\",model_family=\"\${model_family:-}\",model_name=\"\${device_model:-}\",serial_number=\"\${serial_number:-}\"} $temp"
    fi

    # Get power on hours if available
    local power_on_hours=$(smartctl -A "$device" | awk '/^9/ { print $10 }' | head -1)
    if [[ -n "$power_on_hours" && "$power_on_hours" =~ ^[0-9]+$ ]]; then
        echo "smartmon_power_on_hours{device=\"$device\",type=\"$device_type\",model_family=\"\${model_family:-}\",model_name=\"\${device_model:-}\",serial_number=\"\${serial_number:-}\"} $power_on_hours"
    fi
}

# Main execution
echo "# HELP smartmon_device_info SMART device information"
echo "# TYPE smartmon_device_info gauge"
echo "# HELP smartmon_device_smart_healthy SMART device health status"
echo "# TYPE smartmon_device_smart_healthy gauge"

# Scan for devices
for device in /dev/sd[a-z] /dev/nvme[0-9]n[0-9]; do
    if [[ -b "$device" ]]; then
        # Determine device type
        if [[ "$device" =~ /dev/nvme ]]; then
            device_type="nvme"
        else
            device_type="scsi"
        fi

        # Check if device supports SMART
        if smartctl -i "$device" >/dev/null 2>&1; then
            parse_smartctl_attributes "$device" "$device_type" 2>/dev/null || true
        fi
    fi
done

# Add timestamp
echo "smartmon_scrape_timestamp_seconds $(date +%s)"
`,
    },
  });

  // Create DaemonSet to run the script on all nodes
  const smartctlDaemonSet = new DaemonSet(chart, "smartctl-collector", {
    metadata: {
      name: "smartctl-collector",
      namespace: "prometheus",
      labels: {
        app: "smartctl-collector",
      },
    },
    serviceAccount,
    securityContext: {
      // Allow running as root for disk access
      ensureNonRoot: false,
      fsGroup: 0,
    },
  });

  // Configure the container
  const container = smartctlDaemonSet.addContainer({
    name: "smartctl-collector",
    image: "alpine:latest",
    command: ["/bin/sh"],
    args: [
      "-c",
      `
      # Install smartmontools
      apk add --no-cache smartmontools bash

      # Create textfile collector directory
      mkdir -p /host/var/lib/node_exporter/textfile_collector

      # Make script executable
      chmod +x /scripts/smartmon.sh

      # Run the script every 5 minutes
      while true; do
        echo "Collecting SMART metrics..."
        /scripts/smartmon.sh > /host/var/lib/node_exporter/textfile_collector/smartmon.prom.tmp
        mv /host/var/lib/node_exporter/textfile_collector/smartmon.prom.tmp /host/var/lib/node_exporter/textfile_collector/smartmon.prom
        echo "SMART metrics collected at $(date)"
        sleep 300
      done
      `,
    ],
    securityContext: {
      privileged: true, // Required to access raw disk devices
      allowPrivilegeEscalation: true, // Required when privileged is true
      ensureNonRoot: false, // Required to run as root for disk access
      readOnlyRootFilesystem: false, // Allow writing to install packages
      user: 0,
      group: 0,
    },
  });

  // Mount the script from ConfigMap
  const scriptVolume = Volume.fromConfigMap(
    chart,
    "script-volume",
    smartmonScript,
  );
  smartctlDaemonSet.addVolume(scriptVolume);
  container.mount("/scripts", scriptVolume);

  // Mount host directories
  const hostDevVolume = Volume.fromHostPath(chart, "host-dev", "host-dev", {
    path: "/dev",
  });
  smartctlDaemonSet.addVolume(hostDevVolume);
  container.mount("/dev", hostDevVolume);

  const hostProcVolume = Volume.fromHostPath(chart, "host-proc", "host-proc", {
    path: "/proc",
  });
  smartctlDaemonSet.addVolume(hostProcVolume);
  container.mount("/host/proc", hostProcVolume, { readOnly: true });

  const hostSysVolume = Volume.fromHostPath(chart, "host-sys", "host-sys", {
    path: "/sys",
  });
  smartctlDaemonSet.addVolume(hostSysVolume);
  container.mount("/host/sys", hostSysVolume, { readOnly: true });

  // Mount the textfile collector directory
  const textfileCollectorVolume = Volume.fromHostPath(
    chart,
    "textfile-collector",
    "textfile-collector",
    {
      path: "/var/lib/node_exporter/textfile_collector",
    },
  );
  smartctlDaemonSet.addVolume(textfileCollectorVolume);
  container.mount(
    "/host/var/lib/node_exporter/textfile_collector",
    textfileCollectorVolume,
  );

  return { serviceAccount, smartmonScript, smartctlDaemonSet };
}
