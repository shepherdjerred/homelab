/**
 * Configuration for types that should allow arbitrary additional properties.
 * Maps chart names to array of key paths that should be extensible.
 *
 * These are typically config maps, RBAC policies, or other key-value stores
 * where the schema doesn't enumerate all possible keys.
 */
export const EXTENSIBLE_TYPE_PATTERNS: Record<string, string[]> = {
  "argo-cd": [
    "configs.cm", // Allows accounts.*, and other custom config
    "configs.rbac", // Allows policy.*, custom RBAC rules
  ],
  "kube-prometheus-stack": [
    "grafana", // Allows "grafana.ini" and other quoted config keys
    "alertmanager.config.receivers", // Allows various *_configs (pagerduty_configs, etc.) on array elements
    "prometheus-node-exporter", // Allows extraHostVolumeMounts and other node exporter specific configs
    "prometheusNodeExporter", // Also support camelCase variant
  ],
  loki: [
    "loki.limits_config", // Allows retention_period and other limit configs (note: underscore, not camelCase)
    "loki.limitsConfig", // Also support camelCase variant
    "compactor", // Allows various compactor settings
    "minio.persistence", // Storage configs
  ],
  minecraft: [
    "persistence", // Storage class and other persistence options
  ],
  openebs: [
    "zfs-localpv", // ZFS-specific configs
  ],
  "postgres-operator": [
    "configGeneral", // General config allows various settings
  ],
  chartmuseum: [
    "persistence", // Storage options
  ],
  "intel-device-plugins-operator": [
    // Root level for device-specific settings
    "",
  ],
};

/**
 * Pattern-based detection for extensible types.
 * Returns true if the property should allow arbitrary keys.
 */
export function shouldAllowArbitraryProps(
  keyPath: string,
  chartName: string,
  propertyName: string,
  yamlComment?: string,
): boolean {
  // Check configured patterns for this chart
  const patterns = EXTENSIBLE_TYPE_PATTERNS[chartName];
  if (patterns) {
    for (const pattern of patterns) {
      if (pattern === keyPath || (pattern === "" && keyPath.split(".").length === 1)) {
        return true;
      }
      // Also match if keyPath starts with pattern
      if (pattern && keyPath.startsWith(`${pattern}.`)) {
        return true;
      }
    }
  }

  // Pattern-based detection from property names
  const lowerProp = propertyName.toLowerCase();
  const lowerPath = keyPath.toLowerCase();

  // Common names that suggest extensibility
  const extensibleNames = [
    "cm", // ConfigMap data
    "data",
    "config",
    "configs",
    "settings",
    "parameters",
    "options",
    "extraenv",
    "annotations",
    "labels",
    "nodeaffinity",
    "toleration",
  ];

  if (extensibleNames.includes(lowerProp)) {
    return true;
  }

  // Check for persistence/storage which often has provider-specific fields
  if (lowerPath.includes("persistence") || lowerPath.includes("storage")) {
    return true;
  }

  // Check YAML comments for hints
  if (yamlComment) {
    const commentLower = yamlComment.toLowerCase();
    if (
      /\b(arbitrary|custom|additional|extra|any)\s+(keys?|properties?|fields?|values?)\b/i.exec(commentLower) ||
      /\bkey[\s-]?value\s+pairs?\b/i.exec(commentLower)
    ) {
      return true;
    }
  }

  return false;
}
