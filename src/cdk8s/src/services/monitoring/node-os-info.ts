import { Chart } from "cdk8s";
import { ConfigMap, DaemonSet, Volume, ServiceAccount } from "cdk8s-plus-31";

export function createNodeOsInfoMonitoring(chart: Chart) {
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
      "node_os_info.sh": `#!/usr/bin/env sh
#
# Generate node_os_info and node_os_version metrics on legacy systems
# which are not handled by node_exporter's own collector
# (e.g. CentOS 6)

set -e

[ -f /etc/os-release ] && exit 0
[ -f /usr/lib/os-release ] && exit 0

ID=""
ID_LIKE=""
NAME=""
PRETTY_NAME=""
VERSION=""
VERSION_CODENAME=""
VERSION_ID=""
VERSION_METRIC=""

if [ -f /etc/redhat-release ]; then
  # CentOS release 6.10 (Final)
  PRETTY_NAME="$(cat /etc/redhat-release)"
  if [ -f /etc/centos-release ]; then
    ID="centos"
  elif [ -f /etc/oracle-release ]; then
    ID="ol"
  fi
  ID_LIKE="rhel fedora"
  NAME="$(expr "$PRETTY_NAME" : '\\([^ ]*\\)')" || true
  VERSION="$(expr "$PRETTY_NAME" : '.* \\([0-9].*\\)')" || true
  VERSION_ID="$(expr "$PRETTY_NAME" : '.* \\([0-9][0-9.]*\\)')" || true
  # metric cannot distinguish 6.1 from 6.10, so only keep the integer part
  VERSION_METRIC="$(expr "$VERSION_ID" : '\\([0-9]*\\)')" || true
elif [ -f /etc/lsb-release ]; then
  # DISTRIB_ID=Ubuntu
  # DISTRIB_RELEASE=12.04
  # DISTRIB_CODENAME=precise
  # DISTRIB_DESCRIPTION="Ubuntu 12.04 LTS"
  # Beware, old versions of CentOS with package "redhat-lsb-core" look like this instead:
  # LSB_VERSION=base-4.0-amd64:base-4.0-noarch:core-4.0-amd64:core-4.0-noarch

  # shellcheck disable=SC1091
  . /etc/lsb-release
  ID="$(echo "\${DISTRIB_ID}" | tr '[:upper:]' '[:lower:]')"
  NAME="\${DISTRIB_ID}"
  PRETTY_NAME="\${DISTRIB_DESCRIPTION}"
  VERSION="\${DISTRIB_RELEASE} (\${DISTRIB_CODENAME})"
  VERSION_CODENAME="\${DISTRIB_CODENAME}"
  VERSION_ID="\${DISTRIB_RELEASE}"
  # 12.04.1 -> 12.04
  VERSION_METRIC="$(expr "$VERSION_ID" : '\\([0-9]*\\|[0-9]*\\.[0-9]*\\)')" || true
fi

[ "$VERSION_METRIC" = "" ] && VERSION_METRIC="0"

cat <<EOS
node_os_info{id="$ID",id_like="$ID_LIKE",name="$NAME",pretty_name="$PRETTY_NAME",version="$VERSION",version_codename="$VERSION_CODENAME",version_id="$VERSION_ID"} 1
node_os_version{id="$ID",id_like="$ID_LIKE",name="$NAME"} $VERSION_METRIC
EOS
`,
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
  const hostEtcVolume = Volume.fromHostPath(chart, "host-etc", "host-etc", {
    path: "/etc",
  });
  nodeOsInfoDaemonSet.addVolume(hostEtcVolume);
  container.mount("/etc", hostEtcVolume, { readOnly: true });

  const hostUsrLibVolume = Volume.fromHostPath(
    chart,
    "host-usr-lib",
    "host-usr-lib",
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
