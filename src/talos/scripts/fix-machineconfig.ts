#!/usr/bin/env bun
/**
 * Script to clean up Talos machine config
 * Used as EDITOR for `talosctl edit machineconfig`
 *
 * Usage: EDITOR="bun /path/to/fix-machineconfig.ts" talosctl edit machineconfig -n 192.168.1.81
 */

import { parseAllDocuments, stringify } from "yaml";

const configFile = process.argv[2];
if (!configFile) {
  console.error("No config file provided");
  process.exit(1);
}

const content = await Bun.file(configFile).text();
const docs = parseAllDocuments(content);

// First document is the main machine config
const config = docs[0].toJSON();

// Clean up kernel modules - remove duplicates and iptables
config.machine.kernel.modules = [
  { name: "i915" },
  {
    name: "zfs",
    parameters: [
      "zfs_arc_max=51539607552",
      "zfs_arc_min=8589934592",
      "zfs_vdev_async_read_max_active=32",
      "zfs_vdev_async_write_max_active=32",
      "zfs_dirty_data_max=8589934592",
    ],
  },
];

// Clean up sysfs - remove deprecated ZFS params that don't exist
if (config.machine.sysfs) {
  delete config.machine.sysfs["module.zfs.parameters.zfs_arc_meta_limit_percent"];
  delete config.machine.sysfs["module.zfs.parameters.zfs_arc_meta_prune"];
}

// Clean up extraKernelArgs duplicates
if (config.machine.install?.extraKernelArgs) {
  config.machine.install.extraKernelArgs = [...new Set(config.machine.install.extraKernelArgs)];
}

// Rebuild output with all documents
let output = stringify(config);
for (let i = 1; i < docs.length; i++) {
  output += "---\n" + stringify(docs[i].toJSON());
}

await Bun.write(configFile, output);
console.error("Config cleaned successfully");
