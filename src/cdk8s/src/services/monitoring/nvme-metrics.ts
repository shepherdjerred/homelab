import { Chart } from "cdk8s";
import { ConfigMap, DaemonSet, Volume, ServiceAccount } from "cdk8s-plus-31";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createNvmeMetricsMonitoring(chart: Chart) {
  // Load the script content from file
  const scriptPath = join(__dirname, "scripts", "nvme_metrics.py");
  const scriptContent = await Bun.file(scriptPath).text();

  // Create ServiceAccount for the DaemonSet
  const serviceAccount = new ServiceAccount(
    chart,
    "nvme-metrics-service-account",
    {
      metadata: {
        name: "nvme-metrics-service-account",
        namespace: "prometheus",
      },
    },
  );

  // Create ConfigMap with the nvme_metrics.py script
  const nvmeMetricsScript = new ConfigMap(chart, "nvme-metrics-script", {
    metadata: {
      name: "nvme-metrics-script",
      namespace: "prometheus",
    },
    data: {
      "nvme_metrics.py": scriptContent,
    },
  });

  // Create DaemonSet to run the script on all nodes
  const nvmeMetricsDaemonSet = new DaemonSet(chart, "nvme-metrics-collector", {
    metadata: {
      name: "nvme-metrics-collector",
      namespace: "prometheus",
      labels: {
        app: "nvme-metrics-collector",
      },
    },
    serviceAccount,
    securityContext: {
      ensureNonRoot: false,
      fsGroup: 0,
    },
  });

  // Configure the container
  const container = nvmeMetricsDaemonSet.addContainer({
    name: "nvme-metrics-collector",
    image: "python:3.11-alpine",
    command: ["/bin/sh"],
    args: [
      "-c",
      `
      # Install dependencies
      apk add --no-cache nvme-cli
      pip install prometheus_client

      # Create textfile collector directory
      mkdir -p /host/var/lib/node_exporter/textfile_collector

      # Copy script to writable location and make executable
      cp /scripts/nvme_metrics.py /tmp/nvme_metrics.py
      chmod +x /tmp/nvme_metrics.py

      # Run the script every 10 minutes (NVMe metrics don't change too frequently)
      while true; do
        echo "Collecting NVMe metrics..."
        python3 /tmp/nvme_metrics.py > /host/var/lib/node_exporter/textfile_collector/nvme_metrics.prom.tmp 2>/dev/null || echo "# NVMe metrics collection failed" > /host/var/lib/node_exporter/textfile_collector/nvme_metrics.prom.tmp
        mv /host/var/lib/node_exporter/textfile_collector/nvme_metrics.prom.tmp /host/var/lib/node_exporter/textfile_collector/nvme_metrics.prom
        echo "NVMe metrics collected at $(date)"
        sleep 600
      done
      `,
    ],
    securityContext: {
      privileged: true, // Required to access NVMe devices
      allowPrivilegeEscalation: true,
      ensureNonRoot: false,
      readOnlyRootFilesystem: false,
      user: 0,
      group: 0,
    },
  });

  // Mount the script from ConfigMap
  const scriptVolume = Volume.fromConfigMap(
    chart,
    "nvme-metrics-script-volume",
    nvmeMetricsScript,
  );
  nvmeMetricsDaemonSet.addVolume(scriptVolume);
  container.mount("/scripts", scriptVolume);

  // Mount host /dev directory for NVMe device access
  const hostDevVolume = Volume.fromHostPath(
    chart,
    "nvme-host-dev",
    "nvme-host-dev",
    {
      path: "/dev",
    },
  );
  nvmeMetricsDaemonSet.addVolume(hostDevVolume);
  container.mount("/dev", hostDevVolume);

  // Mount the textfile collector directory
  const textfileCollectorVolume = Volume.fromHostPath(
    chart,
    "nvme-metrics-textfile-collector",
    "nvme-metrics-textfile-collector",
    {
      path: "/var/lib/node_exporter/textfile_collector",
    },
  );
  nvmeMetricsDaemonSet.addVolume(textfileCollectorVolume);
  container.mount(
    "/host/var/lib/node_exporter/textfile_collector",
    textfileCollectorVolume,
  );

  return { serviceAccount, nvmeMetricsScript, nvmeMetricsDaemonSet };
}
