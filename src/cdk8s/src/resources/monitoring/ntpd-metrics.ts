import { Chart, Duration } from "cdk8s";
import { ConfigMap, DaemonSet, Volume, ServiceAccount, Probe } from "cdk8s-plus-31";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const CURRENT_FILENAME = fileURLToPath(import.meta.url);
const CURRENT_DIRNAME = dirname(CURRENT_FILENAME);

export async function createNtpdMetricsMonitoring(chart: Chart) {
  // Load the script content from file
  const scriptPath = join(CURRENT_DIRNAME, "scripts", "ntpd_metrics.py");
  const scriptContent = await Bun.file(scriptPath).text();

  // Create ServiceAccount for the DaemonSet
  const serviceAccount = new ServiceAccount(chart, "ntpd-metrics-service-account", {
    metadata: {
      name: "ntpd-metrics-service-account",
      namespace: "prometheus",
    },
  });

  // Create ConfigMap with the ntpd_metrics.py script
  const ntpdMetricsScript = new ConfigMap(chart, "ntpd-metrics-script", {
    metadata: {
      name: "ntpd-metrics-script",
      namespace: "prometheus",
    },
    data: {
      "ntpd_metrics.py": scriptContent,
    },
  });

  // Create DaemonSet to run the script on all nodes
  const ntpdMetricsDaemonSet = new DaemonSet(chart, "ntpd-metrics-collector", {
    metadata: {
      name: "ntpd-metrics-collector",
      namespace: "prometheus",
      labels: {
        app: "ntpd-metrics-collector",
      },
    },
    serviceAccount,
    securityContext: {
      ensureNonRoot: false,
      fsGroup: 0,
    },
  });

  // Configure the container
  const container = ntpdMetricsDaemonSet.addContainer({
    name: "ntpd-metrics-collector",
    image: "python:3.11-alpine",
    command: ["/bin/sh"],
    args: [
      "-c",
      `
      # Install dependencies - exit on failure to trigger pod restart
      apk add --no-cache ntp || exit 1
      pip install prometheus_client || exit 1

      # Create textfile collector directory
      mkdir -p /host/var/lib/node_exporter/textfile_collector

      # Copy script to writable location and make executable
      cp /scripts/ntpd_metrics.py /tmp/ntpd_metrics.py
      chmod +x /tmp/ntpd_metrics.py

      # Run the script every 5 minutes (NTP metrics change relatively frequently)
      while true; do
        echo "Collecting NTPD metrics..."
        python3 /tmp/ntpd_metrics.py > /host/var/lib/node_exporter/textfile_collector/ntpd_metrics.prom.tmp 2>/dev/null || echo "# NTPD metrics collection failed" > /host/var/lib/node_exporter/textfile_collector/ntpd_metrics.prom.tmp
        mv /host/var/lib/node_exporter/textfile_collector/ntpd_metrics.prom.tmp /host/var/lib/node_exporter/textfile_collector/ntpd_metrics.prom
        echo "NTPD metrics collected at $(date)"
        sleep 300
      done
      `,
    ],
    liveness: Probe.fromCommand(
      ["sh", "-c", "! grep -q 'collection failed' /host/var/lib/node_exporter/textfile_collector/ntpd_metrics.prom"],
      {
        initialDelaySeconds: Duration.seconds(60),
        periodSeconds: Duration.seconds(300),
        failureThreshold: 3,
      },
    ),
    securityContext: {
      privileged: false,
      allowPrivilegeEscalation: false,
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
      user: 0,
      group: 0,
    },
  });

  // Mount the script from ConfigMap
  const scriptVolume = Volume.fromConfigMap(chart, "ntpd-metrics-script-volume", ntpdMetricsScript);
  ntpdMetricsDaemonSet.addVolume(scriptVolume);
  container.mount("/scripts", scriptVolume);

  // Mount the textfile collector directory
  const textfileCollectorVolume = Volume.fromHostPath(
    chart,
    "ntpd-metrics-textfile-collector",
    "ntpd-metrics-textfile-collector",
    {
      path: "/var/lib/node_exporter/textfile_collector",
    },
  );
  ntpdMetricsDaemonSet.addVolume(textfileCollectorVolume);
  container.mount("/host/var/lib/node_exporter/textfile_collector", textfileCollectorVolume);

  return { serviceAccount, ntpdMetricsScript, ntpdMetricsDaemonSet };
}
