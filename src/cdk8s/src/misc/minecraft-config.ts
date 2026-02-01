/**
 * Generic Minecraft server configuration loader for GitOps-managed configs.
 *
 * This loads config files from config/minecraft-{serverName} at build time and creates:
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

// Cache loaded configs per server to avoid re-reading
const configCache = new Map<string, Record<string, string>>();

async function loadServerConfigs(serverName: string): Promise<Record<string, string>> {
  const cached = configCache.get(serverName);
  if (cached) {
    return cached;
  }

  const configDir = new URL(`../../config/minecraft-${serverName}`, import.meta.url).pathname;
  const configs: Record<string, string> = {};

  try {
    const glob = new Glob("**/*.{yml,yaml,properties,json,conf,txt}");
    for await (const entry of glob.scan(configDir)) {
      // Validate no __ in filenames (would conflict with path encoding)
      if (entry.includes("__")) {
        throw new Error(`Config file '${entry}' contains '__' which conflicts with path encoding. Rename the file.`);
      }

      try {
        const filePath = path.join(configDir, entry);
        const content = await Bun.file(filePath).text();
        // Use double underscore as separator for ConfigMap keys (slashes not allowed)
        const key = entry.replaceAll("/", "__");
        configs[key] = content;
      } catch (fileError: unknown) {
        throw new Error(`Failed to read config file '${entry}': ${String(fileError)}`);
      }
    }
  } catch (error: unknown) {
    throw new Error(`Failed to load ${serverName} configs from '${configDir}': ${String(error)}`);
  }

  // Validate we found at least some configs
  if (Object.keys(configs).length === 0) {
    throw new Error(
      `No config files found in '${configDir}'. Expected .yml, .yaml, .properties, .json, .conf, or .txt files.`,
    );
  }

  // Validate size (ConfigMaps have 1MB limit)
  const totalSize = Object.values(configs).reduce((sum, c) => sum + c.length, 0);
  if (totalSize > 900_000) {
    throw new Error(
      `${serverName} configs too large: ${String(totalSize)} bytes (limit ~1MB). Remove translation/language files.`,
    );
  }

  configCache.set(serverName, configs);
  return configs;
}

// Pre-load all server configs at module import time
// This ensures configs are loaded synchronously when the module is used
const serverNames = ["tsmc", "sjerred", "shuxin"] as const;
type ServerName = (typeof serverNames)[number];

const loadedConfigs: Record<ServerName, Record<string, string>> = {
  tsmc: {},
  sjerred: {},
  shuxin: {},
};

// Load configs for all servers that have config directories
for (const name of serverNames) {
  try {
    loadedConfigs[name] = await loadServerConfigs(name);
  } catch {
    // Config directory may not exist yet - that's OK during development
    // The error will surface when the server-specific functions are called
  }
}

function getConfigs(serverName: ServerName): Record<string, string> {
  const configs = loadedConfigs[serverName];
  if (Object.keys(configs).length === 0) {
    throw new Error(`No configs loaded for server '${serverName}'. Ensure config/minecraft-${serverName}/ exists.`);
  }
  return configs;
}

/**
 * Returns ConfigMap manifest with all server configs.
 */
export function getMinecraftConfigMapManifest(serverName: ServerName, namespace: string): object {
  return {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: `${namespace}-configs`,
      // Note: namespace is set by ArgoCD from Application spec, not here
      labels: { "app.kubernetes.io/component": "minecraft-config" },
    },
    data: getConfigs(serverName),
  };
}

/**
 * Returns extraVolumes array for mounting configs to /config.
 * Uses ConfigMap items to restore original directory structure.
 */
export function getMinecraftExtraVolumes(serverName: ServerName, namespace: string): object[] {
  const configs = getConfigs(serverName);

  // Map flattened keys back to original paths
  const items = Object.keys(configs).map((key) => ({
    key,
    path: key.replaceAll("__", "/"), // Restore slashes from double underscore
  }));

  return [
    {
      volumes: [
        {
          name: `${serverName}-configs`,
          configMap: {
            name: `${namespace}-configs`,
            items, // Use items to restore directory structure
          },
        },
      ],
      volumeMounts: [
        {
          name: `${serverName}-configs`,
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
export function getMinecraftExtraEnv(): Record<string, string> {
  return {
    // itzg config sync settings
    COPY_CONFIG_DEST: "/data",
    SYNC_SKIP_NEWER_IN_DESTINATION: "true", // Preserve runtime changes
    REPLACE_ENV_DURING_SYNC: "true",
    ENV_VARIABLE_PREFIX: "CFG_",
    REPLACE_ENV_SUFFIXES: "yml,yaml,json,properties,conf,txt",
  };
}
