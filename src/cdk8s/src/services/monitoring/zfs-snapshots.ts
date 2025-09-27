import { Chart } from "cdk8s";
import { ConfigMap, DaemonSet, Volume, ServiceAccount } from "cdk8s-plus-31";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createZfsSnapshotsMonitoring(chart: Chart) {
  // Load the script content from file
  const scriptPath = join(__dirname, "scripts", "zfs_snapshots.py");
  const scriptContent = await Bun.file(scriptPath).text();

  // Create ServiceAccount for the DaemonSet
  const serviceAccount = new ServiceAccount(
    chart,
    "zfs-snapshots-service-account",
    {
      metadata: {
        name: "zfs-snapshots-service-account",
        namespace: "prometheus",
      },
    },
  );

  // Create ConfigMap with the zfs_snapshots.py script
  const zfsSnapshotsScript = new ConfigMap(chart, "zfs-snapshots-script", {
    metadata: {
      name: "zfs-snapshots-script",
      namespace: "prometheus",
    },
    data: {
      "zfs_snapshots.py": scriptContent,
    },
  });

  // Create DaemonSet to run the script on all nodes
  const zfsSnapshotsDaemonSet = new DaemonSet(
    chart,
    "zfs-snapshots-collector",
    {
      metadata: {
        name: "zfs-snapshots-collector",
        namespace: "prometheus",
        labels: {
          app: "zfs-snapshots-collector",
        },
      },
      serviceAccount,
      securityContext: {
        ensureNonRoot: false,
        fsGroup: 0,
      },
    },
  );

  // Configure the container
  const container = zfsSnapshotsDaemonSet.addContainer({
    name: "zfs-snapshots-collector",
    image: "python:3.11-alpine",
    command: ["/bin/sh"],
    args: [
      "-c",
      `
      # Install dependencies
      apk add --no-cache zfs
      pip install prometheus_client

      # Create textfile collector directory
      mkdir -p /host/var/lib/node_exporter/textfile_collector

      # Copy script to writable location and make executable
      cp /scripts/zfs_snapshots.py /tmp/zfs_snapshots.py
      chmod +x /tmp/zfs_snapshots.py

      # Run the script every 15 minutes (snapshot info doesn't change too frequently)
      while true; do
        echo "Collecting ZFS snapshots metrics..."
        python3 /tmp/zfs_snapshots.py > /host/var/lib/node_exporter/textfile_collector/zfs_snapshots.prom.tmp 2>/dev/null || echo "# ZFS snapshots collection failed" > /host/var/lib/node_exporter/textfile_collector/zfs_snapshots.prom.tmp
        mv /host/var/lib/node_exporter/textfile_collector/zfs_snapshots.prom.tmp /host/var/lib/node_exporter/textfile_collector/zfs_snapshots.prom
        echo "ZFS snapshots metrics collected at $(date)"
        sleep 900
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
    "zfs-snapshots-script-volume",
    zfsSnapshotsScript,
  );
  zfsSnapshotsDaemonSet.addVolume(scriptVolume);
  container.mount("/scripts", scriptVolume);

  // Mount host /dev directory for ZFS device access
  const hostDevVolume = Volume.fromHostPath(
    chart,
    "zfs-snapshots-host-dev",
    "zfs-snapshots-host-dev",
    {
      path: "/dev",
    },
  );
  zfsSnapshotsDaemonSet.addVolume(hostDevVolume);
  container.mount("/dev", hostDevVolume);

  // Mount host /proc directory for ZFS
  const hostProcVolume = Volume.fromHostPath(
    chart,
    "zfs-snapshots-host-proc",
    "zfs-snapshots-host-proc",
    {
      path: "/proc",
    },
  );
  zfsSnapshotsDaemonSet.addVolume(hostProcVolume);
  container.mount("/host/proc", hostProcVolume, { readOnly: true });

  // Mount host /sys directory for ZFS
  const hostSysVolume = Volume.fromHostPath(
    chart,
    "zfs-snapshots-host-sys",
    "zfs-snapshots-host-sys",
    {
      path: "/sys",
    },
  );
  zfsSnapshotsDaemonSet.addVolume(hostSysVolume);
  container.mount("/host/sys", hostSysVolume, { readOnly: true });

  // Mount the textfile collector directory
  const textfileCollectorVolume = Volume.fromHostPath(
    chart,
    "zfs-snapshots-textfile-collector",
    "zfs-snapshots-textfile-collector",
    {
      path: "/var/lib/node_exporter/textfile_collector",
    },
  );
  zfsSnapshotsDaemonSet.addVolume(textfileCollectorVolume);
  container.mount(
    "/host/var/lib/node_exporter/textfile_collector",
    textfileCollectorVolume,
  );

  return { serviceAccount, zfsSnapshotsScript, zfsSnapshotsDaemonSet };
}
