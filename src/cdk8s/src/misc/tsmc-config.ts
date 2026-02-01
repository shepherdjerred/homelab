/**
 * TSMC server configuration loader for GitOps-managed Minecraft configs.
 *
 * This loads all config files from config/minecraft-tsmc at build time and creates:
 * - ConfigMap with all server and plugin configs
 * - Volume/mount configuration for itzg's /config sync mechanism
 *
 * Uses itzg/minecraft-server's built-in config sync:
 * - Configs mounted to /config
 * - Synced to /data on startup
 * - ${CFG_*} placeholders substituted from environment variables
 */

import { Glob } from "bun";
import path from "path";

const CONFIG_DIR = new URL("../../config/minecraft-tsmc", import.meta.url).pathname;

// Load all configs at module import time (top-level await)
const configs: Record<string, string> = {};

try {
  const glob = new Glob("**/*.{yml,yaml,properties,json,conf,txt}");
  for await (const entry of glob.scan(CONFIG_DIR)) {
    // Validate no __ in filenames (would conflict with path encoding)
    if (entry.includes("__")) {
      throw new Error(`Config file '${entry}' contains '__' which conflicts with path encoding. Rename the file.`);
    }

    try {
      const filePath = path.join(CONFIG_DIR, entry);
      const content = await Bun.file(filePath).text();
      // Use double underscore as separator for ConfigMap keys (slashes not allowed)
      const key = entry.replaceAll("/", "__");
      configs[key] = content;
    } catch (fileError: unknown) {
      throw new Error(`Failed to read config file '${entry}': ${String(fileError)}`);
    }
  }
} catch (error: unknown) {
  throw new Error(`Failed to load TSMC configs from '${CONFIG_DIR}': ${String(error)}`);
}

// Validate we found at least some configs
if (Object.keys(configs).length === 0) {
  throw new Error(
    `No config files found in '${CONFIG_DIR}'. Expected .yml, .yaml, .properties, .json, .conf, or .txt files.`,
  );
}

// Validate size (ConfigMaps have 1MB limit)
const totalSize = Object.values(configs).reduce((sum, c) => sum + c.length, 0);
if (totalSize > 900_000) {
  throw new Error(
    `TSMC configs too large: ${String(totalSize)} bytes (limit ~1MB). Remove translation/language files.`,
  );
}

/**
 * Returns ConfigMap manifest with all TSMC server configs.
 */
export function getTsmcConfigMapManifest(namespace: string): object {
  return {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: `${namespace}-configs`,
      // Note: namespace is set by ArgoCD from Application spec, not here (consistent with discordsrv-config.ts)
      labels: { "app.kubernetes.io/component": "minecraft-config" },
    },
    data: configs,
  };
}

/**
 * Returns extraVolumes array for mounting configs to /config.
 * Uses ConfigMap items to restore original directory structure.
 */
export function getTsmcExtraVolumes(namespace: string): object[] {
  // Map flattened keys back to original paths
  const items = Object.keys(configs).map((key) => ({
    key,
    path: key.replaceAll("__", "/"), // Restore slashes from double underscore
  }));

  return [
    {
      volumes: [
        {
          name: "tsmc-configs",
          configMap: {
            name: `${namespace}-configs`,
            items, // Use items to restore directory structure
          },
        },
      ],
      volumeMounts: [
        {
          name: "tsmc-configs",
          mountPath: "/config",
          readOnly: true,
        },
      ],
    },
  ];
}

/**
 * Returns extraEnv configuration for itzg config sync.
 */
export function getTsmcExtraEnv(): Record<string, string> {
  return {
    // itzg config sync settings
    COPY_CONFIG_DEST: "/data",
    SYNC_SKIP_NEWER_IN_DESTINATION: "true", // Preserve runtime changes
    REPLACE_ENV_DURING_SYNC: "true",
    ENV_VARIABLE_PREFIX: "CFG_",
    REPLACE_ENV_SUFFIXES: "yml,yaml,json,properties,conf,txt",
  };
}
