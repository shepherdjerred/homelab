# Talos Configuration

This directory contains Talos machine configuration patches and tooling for the homelab cluster.

## Directory Structure

- `patches/` - Machine configuration patches
- `pods/` - Static pod definitions
- `image.yaml` - Talos image configuration
- `update-image-id.ts` - Script to update Talos image versions

## Patches

Patches are applied to the base Talos machine configuration to customize the cluster nodes.

### kubelet.yaml

**Purpose**: Configure kubelet settings

**Current settings**:

- `max-pods: 300` - Maximum number of pods per node (increased from 250)

### zfs.yaml

**Purpose**: Configure ZFS kernel module parameters

**Current settings**:

- `zfs_arc_max: 67108864000` (62.5 GB) - Maximum ARC size, set to 50% of total RAM
- `zfs_arc_min: 8589934592` (8 GB) - Minimum ARC size

**Background**: The ZFS ARC was originally limited to 48 GB despite the node having 125 GB total memory. This caused the cache to run at 98% capacity, triggering recurring PagerDuty alerts for hash collisions. Increasing to 62.5 GB (industry standard 50% of RAM) provides headroom for I/O spikes.

### Other Patches

- `interface.yaml` - Network interface configuration
- `scheduling.yaml` - Node scheduling settings
- `image.yaml` - Custom system extensions and image configuration
- `tailscale.example.yaml` - Example Tailscale configuration

## Applying Patches

Patches are typically applied during cluster initialization or updates. To apply patches to an existing node:

```bash
# Apply all patches
talosctl patch machineconfig \
  --nodes <node-name> \
  --patch @src/talos/patches/kubelet.yaml \
  --patch @src/talos/patches/zfs.yaml \
  --patch @src/talos/patches/interface.yaml \
  --patch @src/talos/patches/scheduling.yaml

# Reboot to apply changes
talosctl reboot --nodes <node-name>
```

## Validation

After applying patches and rebooting:

### Verify Max Pods

```bash
kubectl get node <node-name> -o jsonpath='{.status.capacity.pods}'
# Expected: 300
```

### Verify ZFS ARC Max

Query Prometheus for the ZFS ARC maximum:

```bash
kubectl port-forward -n prometheus svc/prometheus-kube-prometheus-prometheus 9090:9090
```

Then query `node_zfs_arc_c_max`:

- Expected: 67108864000 (62.5 GB)

Or check directly on the node:

```bash
talosctl -n <node-name> get extensions
# ZFS should be listed

talosctl -n <node-name> read /proc/spl/kstat/zfs/arcstats | grep c_max
# Expected: c_max = 67108864000
```

## Runtime Changes

Some ZFS parameters can be changed at runtime without rebooting:

```bash
# Create a privileged pod or DaemonSet to access host filesystem
echo 67108864000 > /sys/module/zfs/parameters/zfs_arc_max
```

However, these changes are not persistent across reboots. Use the `zfs.yaml` patch for permanent configuration.

## Monitoring

Monitor ZFS performance with these Prometheus queries:

```promql
# ARC size vs limits
node_zfs_arc_size
node_zfs_arc_c_max
node_zfs_arc_c_min

# Hash collisions (should stay < 1000/sec)
rate(node_zfs_arc_hash_collisions[5m])

# ARC hit rate (should be > 85%)
(rate(node_zfs_arc_hits[5m]) /
 (rate(node_zfs_arc_hits[5m]) +
  rate(node_zfs_arc_demand_data_misses[5m]) +
  rate(node_zfs_arc_demand_metadata_misses[5m]))) * 100

# Eviction rate
rate(node_zfs_arc_deleted[5m])
```

See PrometheusRule `prometheus-zfs-monitoring-rules` in the `prometheus` namespace for configured alerts.
