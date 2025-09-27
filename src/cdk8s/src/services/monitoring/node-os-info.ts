import { Chart } from "cdk8s";
import { ConfigMap, DaemonSet, Volume, ServiceAccount } from "cdk8s-plus-31";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createNodeOsInfoMonitoring(chart: Chart) {
  // Load the script content from file
  const scriptPath = join(__dirname, "scripts", "node_os_info.sh");
  const scriptContent = await Bun.file(scriptPath).text();

  // Create ServiceAccount for the DaemonSet
  const serviceAccount = new ServiceAccount(
    chart,
    "node-os-info-service-account",
    {
      metadata: {
        name: "node-os-info-service-account",
        namespace: "prometheus",
      },
    },
  );

  // Create ConfigMap with the node_os_info.sh script
  const nodeOsInfoScript = new ConfigMap(chart, "node-os-info-script", {
    metadata: {
      name: "node-os-info-script",
      namespace: "prometheus",
    },
    data: {
      "node_os_info.sh": scriptContent,
    },
  });

  // Create DaemonSet to run the script on all nodes
  const nodeOsInfoDaemonSet = new DaemonSet(chart, "node-os-info-collector", {
    metadata: {
      name: "node-os-info-collector",
      namespace: "prometheus",
      labels: {
        app: "node-os-info-collector",
      },
    },
    serviceAccount,
    securityContext: {
      ensureNonRoot: false,
      fsGroup: 0,
    },
  });

  // Configure the container
  const container = nodeOsInfoDaemonSet.addContainer({
    name: "node-os-info-collector",
    image: "alpine:latest",
    command: ["/bin/sh"],
    args: [
      "-c",
      `
      # Create textfile collector directory
      mkdir -p /host/var/lib/node_exporter/textfile_collector

      # Copy script to writable location and make executable
      cp /scripts/node_os_info.sh /tmp/node_os_info.sh
      chmod +x /tmp/node_os_info.sh

      # Run the script every hour (it's for legacy OS info, doesn't change often)
      while true; do
        echo "Collecting OS info metrics..."
        /tmp/node_os_info.sh > /host/var/lib/node_exporter/textfile_collector/node_os_info.prom.tmp 2>/dev/null || echo "# OS info collection failed" > /host/var/lib/node_exporter/textfile_collector/node_os_info.prom.tmp
        mv /host/var/lib/node_exporter/textfile_collector/node_os_info.prom.tmp /host/var/lib/node_exporter/textfile_collector/node_os_info.prom
        echo "OS info metrics collected at $(date)"
        sleep 3600
      done
      `,
    ],
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
  const scriptVolume = Volume.fromConfigMap(
    chart,
    "node-os-info-script-volume",
    nodeOsInfoScript,
  );
  nodeOsInfoDaemonSet.addVolume(scriptVolume);
  container.mount("/scripts", scriptVolume);

  // Mount host directories for OS information
  const hostEtcVolume = Volume.fromHostPath(
    chart,
    "node-os-info-host-etc",
    "node-os-info-host-etc",
    {
      path: "/etc",
    },
  );
  nodeOsInfoDaemonSet.addVolume(hostEtcVolume);
  container.mount("/etc", hostEtcVolume, { readOnly: true });

  const hostUsrLibVolume = Volume.fromHostPath(
    chart,
    "node-os-info-host-usr-lib",
    "node-os-info-host-usr-lib",
    {
      path: "/usr/lib",
    },
  );
  nodeOsInfoDaemonSet.addVolume(hostUsrLibVolume);
  container.mount("/usr/lib", hostUsrLibVolume, { readOnly: true });

  // Mount the textfile collector directory
  const textfileCollectorVolume = Volume.fromHostPath(
    chart,
    "node-os-info-textfile-collector",
    "node-os-info-textfile-collector",
    {
      path: "/var/lib/node_exporter/textfile_collector",
    },
  );
  nodeOsInfoDaemonSet.addVolume(textfileCollectorVolume);
  container.mount(
    "/host/var/lib/node_exporter/textfile_collector",
    textfileCollectorVolume,
  );

  return { serviceAccount, nodeOsInfoScript, nodeOsInfoDaemonSet };
}
