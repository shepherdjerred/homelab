import { Chart } from "cdk8s";
import { ConfigMap, DaemonSet, Volume, ServiceAccount } from "cdk8s-plus-31";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createZfsZpoolMonitoring(chart: Chart) {
  // Load the script content from file
  const scriptPath = join(__dirname, "scripts", "zfs_zpool.sh");
  const scriptContent = await Bun.file(scriptPath).text();

  // Create ServiceAccount for the DaemonSet
  const serviceAccount = new ServiceAccount(
    chart,
    "zfs-zpool-service-account",
    {
      metadata: {
        name: "zfs-zpool-service-account",
        namespace: "prometheus",
      },
    },
  );

  // Create ConfigMap with the zfs_zpool.sh script
  const zfsZpoolScript = new ConfigMap(chart, "zfs-zpool-script", {
    metadata: {
      name: "zfs-zpool-script",
      namespace: "prometheus",
    },
    data: {
      "zfs_zpool.sh": scriptContent,
    },
  });

  // Create DaemonSet to run the script on all nodes
  const zfsZpoolDaemonSet = new DaemonSet(chart, "zfs-zpool-collector", {
    metadata: {
      name: "zfs-zpool-collector",
      namespace: "prometheus",
      labels: {
        app: "zfs-zpool-collector",
      },
    },
    serviceAccount,
    securityContext: {
      ensureNonRoot: false,
      fsGroup: 0,
    },
  });

  // Configure the container
  const container = zfsZpoolDaemonSet.addContainer({
    name: "zfs-zpool-collector",
    image: "alpine:latest",
    command: ["/bin/sh"],
    args: [
      "-c",
      `
      # Install dependencies
      apk add --no-cache zfs bash

      # Create textfile collector directory
      mkdir -p /host/var/lib/node_exporter/textfile_collector

      # Copy script to writable location and make executable
      cp /scripts/zfs_zpool.sh /tmp/zfs_zpool.sh
      chmod +x /tmp/zfs_zpool.sh

      # Run the script every 10 minutes (zpool info changes moderately frequently)
      while true; do
        echo "Collecting ZFS zpool metrics..."
        /tmp/zfs_zpool.sh > /host/var/lib/node_exporter/textfile_collector/zfs_zpool.prom.tmp 2>/dev/null || echo "# ZFS zpool collection failed" > /host/var/lib/node_exporter/textfile_collector/zfs_zpool.prom.tmp
        mv /host/var/lib/node_exporter/textfile_collector/zfs_zpool.prom.tmp /host/var/lib/node_exporter/textfile_collector/zfs_zpool.prom
        echo "ZFS zpool metrics collected at $(date)"
        sleep 600
      done
      `,
    ],
    securityContext: {
      privileged: true, // Required to access ZFS
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
    "zfs-zpool-script-volume",
    zfsZpoolScript,
  );
  zfsZpoolDaemonSet.addVolume(scriptVolume);
  container.mount("/scripts", scriptVolume);

  // Mount host /dev directory for ZFS device access
  const hostDevVolume = Volume.fromHostPath(
    chart,
    "zfs-zpool-host-dev",
    "zfs-zpool-host-dev",
    {
      path: "/dev",
    },
  );
  zfsZpoolDaemonSet.addVolume(hostDevVolume);
  container.mount("/dev", hostDevVolume);

  // Mount host /proc directory for ZFS
  const hostProcVolume = Volume.fromHostPath(
    chart,
    "zfs-zpool-host-proc",
    "zfs-zpool-host-proc",
    {
      path: "/proc",
    },
  );
  zfsZpoolDaemonSet.addVolume(hostProcVolume);
  container.mount("/host/proc", hostProcVolume, { readOnly: true });

  // Mount host /sys directory for ZFS
  const hostSysVolume = Volume.fromHostPath(
    chart,
    "zfs-zpool-host-sys",
    "zfs-zpool-host-sys",
    {
      path: "/sys",
    },
  );
  zfsZpoolDaemonSet.addVolume(hostSysVolume);
  container.mount("/host/sys", hostSysVolume, { readOnly: true });

  // Mount the textfile collector directory
  const textfileCollectorVolume = Volume.fromHostPath(
    chart,
    "zfs-zpool-textfile-collector",
    "zfs-zpool-textfile-collector",
    {
      path: "/var/lib/node_exporter/textfile_collector",
    },
  );
  zfsZpoolDaemonSet.addVolume(textfileCollectorVolume);
  container.mount(
    "/host/var/lib/node_exporter/textfile_collector",
    textfileCollectorVolume,
  );

  return { serviceAccount, zfsZpoolScript, zfsZpoolDaemonSet };
}
