import {
  PrometheusRuleSpecGroups,
  PrometheusRuleSpecGroupsRulesExpr,
} from "../../../imports/monitoring.coreos.com";
import { escapePrometheusTemplate } from "./shared";

export function getZfsMonitoringRuleGroups(): PrometheusRuleSpecGroups[] {
  return [
    // ZFS ARC (Adaptive Replacement Cache) monitoring
    {
      name: "zfs-arc-monitoring",
      rules: [
        {
          alert: "ZfsArcHitRateLow",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ARC hit rate on {{ $labels.instance }} is low: {{ $value | humanizePercentage }} (should be >85%)",
            ),
            summary: "ZFS ARC hit rate is low - performance impact expected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "(rate(node_zfs_arc_hits[5m]) / (rate(node_zfs_arc_hits[5m]) + rate(node_zfs_arc_demand_data_misses[5m]) + rate(node_zfs_arc_demand_metadata_misses[5m]))) * 100 < 85",
          ),
          for: "15m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsArcHitRateCritical",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ARC hit rate on {{ $labels.instance }} is critically low: {{ $value | humanizePercentage }} (should be >85%)",
            ),
            summary:
              "ZFS ARC hit rate is critically low - severe performance impact",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "(rate(node_zfs_arc_hits[5m]) / (rate(node_zfs_arc_hits[5m]) + rate(node_zfs_arc_demand_data_misses[5m]) + rate(node_zfs_arc_demand_metadata_misses[5m]))) * 100 < 70",
          ),
          for: "10m",
          labels: { severity: "critical" },
        },
        {
          alert: "ZfsArcSizeNearLimit",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ARC on {{ $labels.instance }} is near its maximum size: {{ $value | humanizePercentage }} of maximum capacity",
            ),
            summary: "ZFS ARC size approaching maximum limit",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "(node_zfs_arc_c / node_zfs_arc_c_max) > 0.95",
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsArcMetadataHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ARC metadata usage on {{ $labels.instance }} is high: {{ $value | humanize }} bytes (>75% of ARC)",
            ),
            summary: "ZFS ARC metadata usage is high",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "(node_zfs_arc_arc_meta_used / node_zfs_arc_c) > 0.75",
          ),
          for: "15m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsArcEvictionHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ARC on {{ $labels.instance }} has high eviction rate: {{ $value }}/s - may indicate memory pressure",
            ),
            summary: "High ZFS ARC eviction rate detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_arc_deleted[5m]) > 1000",
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
      ],
    },

    // ZFS L2ARC (Level 2 ARC) monitoring
    {
      name: "zfs-l2arc-monitoring",
      rules: [
        {
          alert: "ZfsL2ArcHitRateLow",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS L2ARC hit rate on {{ $labels.instance }} is low: {{ $value | humanizePercentage }} (should be >20%)",
            ),
            summary: "ZFS L2ARC hit rate is low - consider L2ARC tuning",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "(rate(node_zfs_arc_l2_hits[5m]) / (rate(node_zfs_arc_l2_hits[5m]) + rate(node_zfs_arc_l2_misses[5m]))) * 100 < 20",
          ),
          for: "20m",
          labels: { severity: "info" },
        },
        {
          alert: "ZfsL2ArcIOErrors",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS L2ARC on {{ $labels.instance }} is experiencing IO errors: {{ $value }} errors",
            ),
            summary: "ZFS L2ARC IO errors detected - check L2ARC device health",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "increase(node_zfs_arc_l2_io_error[1h]) > 0",
          ),
          for: "5m",
          labels: { severity: "critical" },
        },
        {
          alert: "ZfsL2ArcWriteErrors",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS L2ARC on {{ $labels.instance }} has write errors: {{ $value }} errors",
            ),
            summary:
              "ZFS L2ARC write errors detected - L2ARC device may be failing",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "increase(node_zfs_arc_l2_writes_error[1h]) > 0",
          ),
          for: "5m",
          labels: { severity: "critical" },
        },
        {
          alert: "ZfsL2ArcChecksumErrors",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS L2ARC on {{ $labels.instance }} has checksum errors: {{ $value }} errors - data integrity concern",
            ),
            summary: "ZFS L2ARC checksum errors detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "increase(node_zfs_arc_l2_cksum_bad[1h]) > 0",
          ),
          for: "5m",
          labels: { severity: "critical" },
        },
        {
          alert: "ZfsL2ArcSizeUnusual",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS L2ARC size on {{ $labels.instance }} is unusually low: {{ $value | humanize }} bytes - may indicate L2ARC device issues",
            ),
            summary: "ZFS L2ARC size is unusually low",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_l2_size < 1073741824 and node_zfs_arc_l2_size > 0", // Less than 1GB but not zero
          ),
          for: "30m",
          labels: { severity: "warning" },
        },
      ],
    },

    // ZFS Memory and Resource monitoring
    {
      name: "zfs-memory-monitoring",
      rules: [
        {
          alert: "ZfsMemoryPressureHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS memory pressure on {{ $labels.instance }} is high: throttle count {{ $value }}",
            ),
            summary: "High ZFS memory pressure detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_arc_memory_throttle_count[5m]) > 10",
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsMemoryReclaim",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS on {{ $labels.instance }} is under memory pressure: need_free={{ $value | humanize }} bytes",
            ),
            summary: "ZFS memory reclaim active - system under memory pressure",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_arc_need_free > 0",
          ),
          for: "15m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsAbdScatterWasteHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ABD scatter waste on {{ $labels.instance }} is high: {{ $value | humanize }} bytes - memory fragmentation concern",
            ),
            summary: "High ZFS ABD scatter waste - memory fragmentation",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_abd_scatter_chunk_waste > 104857600", // 100MB
          ),
          for: "20m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsAbdPageAllocRetries",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ABD on {{ $labels.instance }} has frequent page allocation retries: {{ $value }}/s - memory pressure indicator",
            ),
            summary: "High ZFS ABD page allocation retries",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_abd_scatter_page_alloc_retry[5m]) > 50",
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
      ],
    },

    // ZFS Performance and Efficiency monitoring
    {
      name: "zfs-performance-monitoring",
      rules: [
        {
          alert: "ZfsHashCollisionsHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS hash collisions on {{ $labels.instance }} are high: {{ $value }}/s - may impact performance",
            ),
            summary: "High ZFS hash collisions detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_arc_hash_collisions[5m]) > 1000",
          ),
          for: "15m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsHashChainLengthHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS hash chain max length on {{ $labels.instance }} is high: {{ $value }} - performance degradation possible",
            ),
            summary: "ZFS hash chain length is high",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_hash_chain_max > 20",
          ),
          for: "20m",
          labels: { severity: "warning" },
        },
      ],
    },

    // ZFS Health and Availability monitoring
    {
      name: "zfs-health-monitoring",
      rules: [
        {
          alert: "ZfsArcNoGrow",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ARC on {{ $labels.instance }} is prevented from growing: {{ $value }} - system memory constraint",
            ),
            summary: "ZFS ARC growth is constrained",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_arc_no_grow > 0",
          ),
          for: "10m",
          labels: { severity: "info" },
        },
        {
          alert: "ZfsL2ArcRebuildErrors",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS L2ARC rebuild on {{ $labels.instance }} has errors - check L2ARC device health and logs",
            ),
            summary: "ZFS L2ARC rebuild errors detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "increase(node_zfs_arc_l2_rebuild_io_errors[1h]) > 0 or increase(node_zfs_arc_l2_rebuild_cksum_lb_errors[1h]) > 0 or increase(node_zfs_arc_l2_rebuild_dh_errors[1h]) > 0",
          ),
          for: "5m",
          labels: { severity: "critical" },
        },
        {
          alert: "ZfsL2ArcLowMemoryAborts",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS L2ARC on {{ $labels.instance }} is aborting operations due to low memory: {{ $value }} aborts",
            ),
            summary: "ZFS L2ARC low memory aborts detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "increase(node_zfs_arc_l2_abort_lowmem[1h]) > 0",
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsEvictSkipHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS on {{ $labels.instance }} is skipping evictions frequently: {{ $value }}/s - potential lock contention",
            ),
            summary: "High ZFS eviction skips - potential lock contention",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_arc_evict_skip[5m]) > 100",
          ),
          for: "15m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsL2ArcWriteLockRetries",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS L2ARC on {{ $labels.instance }} has frequent write lock retries: {{ $value }}/s - performance impact",
            ),
            summary: "High ZFS L2ARC write lock retries",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_arc_l2_writes_lock_retry[5m]) > 10",
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
      ],
    },

    // ZFS Critical System Integration monitoring
    {
      name: "zfs-system-integration",
      rules: [
        {
          alert: "ZfsArcSizeBelowMinimum",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ARC size on {{ $labels.instance }} is below minimum: {{ $value | humanize }} bytes is less than configured minimum",
            ),
            summary: "ZFS ARC size is below configured minimum",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_c < node_zfs_arc_c_min",
          ),
          for: "10m",
          labels: { severity: "critical" },
        },
        {
          alert: "ZfsSystemMemoryLow",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS reports system free memory on {{ $labels.instance }} is critically low: {{ $value | humanize }} bytes",
            ),
            summary: "ZFS system free memory is critically low",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_arc_sys_free < 268435456", // Less than 256MB
          ),
          for: "5m",
          labels: { severity: "critical" },
        },
      ],
    },

    // ZFS MFU/MRU and Ghost Cache monitoring
    {
      name: "zfs-cache-efficiency",
      rules: [
        {
          alert: "ZfsAnonDataHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS anonymous data on {{ $labels.instance }} is high: {{ $value | humanize }} bytes - may indicate poor cache efficiency",
            ),
            summary: "High ZFS anonymous data usage",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_anon_data > 2147483648", // 2GB
          ),
          for: "15m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsAccessSkipHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS access skips on {{ $labels.instance }} are high: {{ $value }}/s - potential lock contention",
            ),
            summary: "High ZFS access skips detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_arc_access_skip[5m]) > 100",
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
      ],
    },

    // ZFS L2ARC Advanced monitoring
    {
      name: "zfs-l2arc-advanced",
      rules: [
        {
          alert: "ZfsL2ArcReadWriteClash",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS L2ARC on {{ $labels.instance }} has read/write clashes: {{ $value }} clashes",
            ),
            summary: "ZFS L2ARC read/write clashes detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "increase(node_zfs_arc_l2_rw_clash[1h]) > 0",
          ),
          for: "5m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsL2ArcEvictLockRetries",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS L2ARC evict lock retries on {{ $labels.instance }}: {{ $value }}/s - performance impact",
            ),
            summary: "High ZFS L2ARC evict lock retries",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_arc_l2_evict_lock_retry[5m]) > 10",
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
      ],
    },

    // ZFS ABD (Adaptive Buffer Descriptor) Advanced monitoring
    {
      name: "zfs-abd-advanced",
      rules: [
        {
          alert: "ZfsAbdLinearVsScatterImbalance",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ABD on {{ $labels.instance }} has linear vs scatter imbalance - may indicate memory fragmentation",
            ),
            summary: "ZFS ABD linear/scatter allocation imbalance",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "(node_zfs_abd_linear_cnt / (node_zfs_abd_linear_cnt + node_zfs_abd_scatter_cnt)) > 0.9 or (node_zfs_abd_linear_cnt / (node_zfs_abd_linear_cnt + node_zfs_abd_scatter_cnt)) < 0.1",
          ),
          for: "20m",
          labels: { severity: "info" },
        },
        {
          alert: "ZfsAbdSgTableRetries",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ABD SG table retries on {{ $labels.instance }}: {{ $value }}/s - memory pressure indicator",
            ),
            summary: "ZFS ABD SG table retries detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_abd_scatter_sg_table_retry[5m]) > 10",
          ),
          for: "10m",
          labels: { severity: "warning" },
        },
      ],
    },

    // ZFS Buffer and Object monitoring
    {
      name: "zfs-buffer-monitoring",
      rules: [
        {
          alert: "ZfsDnodeSizeHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS dnode size on {{ $labels.instance }} is high: {{ $value | humanize }} bytes - may indicate metadata bloat",
            ),
            summary: "High ZFS dnode usage",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_dnode_size > 1073741824", // 1GB
          ),
          for: "15m",
          labels: { severity: "warning" },
        },
        {
          alert: "ZfsBonusSizeHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS bonus buffer size on {{ $labels.instance }} is high: {{ $value | humanize }} bytes",
            ),
            summary: "High ZFS bonus buffer usage",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_bonus_size > 536870912", // 512MB
          ),
          for: "20m",
          labels: { severity: "info" },
        },
        {
          alert: "ZfsDbufSizeHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS data buffer size on {{ $labels.instance }} is high: {{ $value | humanize }} bytes",
            ),
            summary: "High ZFS data buffer usage",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_dbuf_size > 2147483648", // 2GB
          ),
          for: "15m",
          labels: { severity: "warning" },
        },
      ],
    },

    // ZFS Async and Advanced Operations monitoring
    {
      name: "zfs-async-operations",
      rules: [
        {
          alert: "ZfsAsyncUpgradeSyncHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS async upgrade sync operations on {{ $labels.instance }}: {{ $value }}/s - may indicate upgrade activity",
            ),
            summary: "High ZFS async upgrade sync activity",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_arc_async_upgrade_sync[5m]) > 10",
          ),
          for: "10m",
          labels: { severity: "info" },
        },
        {
          alert: "ZfsArcPruneActivity",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS ARC prune activity on {{ $labels.instance }}: {{ $value }}/s - memory pressure response",
            ),
            summary: "ZFS ARC pruning activity detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "rate(node_zfs_arc_arc_prune[5m]) > 5",
          ),
          for: "10m",
          labels: { severity: "info" },
        },
        {
          alert: "ZfsLoanedBytesHigh",
          annotations: {
            description: escapePrometheusTemplate(
              "ZFS loaned bytes on {{ $labels.instance }} are high: {{ $value | humanize }} bytes - potential memory leak",
            ),
            summary: "High ZFS loaned bytes detected",
          },
          expr: PrometheusRuleSpecGroupsRulesExpr.fromString(
            "node_zfs_arc_arc_loaned_bytes > 1073741824", // 1GB
          ),
          for: "30m",
          labels: { severity: "warning" },
        },
      ],
    },
  ];
}
