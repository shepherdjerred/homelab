#!/usr/bin/env bun

import { spawn } from "node:child_process";
import { platform } from "node:os";
import { readFileSync, writeFileSync } from "node:fs";
import { applyGrafanaReplacements, getGrafanaReplacements } from "./patch-utils.ts";

const runCommand = async (command: string, args: string[]) => {
  return new Promise<string>((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: ["inherit", "pipe", "inherit"],
    });
    let output = "";
    proc.stdout.on("data", (data: Buffer) => (output += data.toString()));
    proc.on("close", (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`Command failed with code ${code?.toString() ?? "unknown"}`));
    });
  });
};

// on macOS use gsed, on Linux use sed
const sedCommand = platform() === "darwin" ? "gsed" : "sed";

const torvaldsFile = "dist/torvalds.k8s.yaml";
const appsFile = "dist/apps.k8s.yaml";

console.log("🔧 Applying Intel GPU resource patches...");

// Define patterns to replace with their sed expressions
const gpuReplacements = [
  {
    pattern: "gpu.intel.com/i915: null",
    sedPattern: "s/gpu\\.intel\\.com\\/i915: null/gpu.intel.com\\/i915: 1/g",
  },
  {
    pattern: "gpu.intel.com/i915: 0",
    sedPattern: "s/gpu\\.intel\\.com\\/i915: 0$/gpu.intel.com\\/i915: 1/g",
  },
  {
    pattern: "gpu.intel.com/i915: '0'",
    sedPattern: "s/gpu\\.intel\\.com\\/i915: '0'/gpu.intel.com\\/i915: 1/g",
  },
  {
    pattern: 'gpu.intel.com/i915: "0"',
    sedPattern: 's/gpu\\.intel\\.com\\/i915: "0"/gpu.intel.com\\/i915: 1/g',
  },
];

for (const replacement of gpuReplacements) {
  try {
    await runCommand(sedCommand, ["-i", replacement.sedPattern, torvaldsFile]);
    console.log(`✓ Processed pattern: ${replacement.pattern}`);
  } catch (error) {
    console.error(`✗ Failed to process pattern ${replacement.pattern}:`, error);
  }
}

console.log("🎉 Intel GPU resource patches applied successfully!");

console.log("\n🎨 Applying Grafana template variable patches...");

// Replace Grafana template placeholders with Helm-escaped syntax
// Note: This is needed because Grafana dashboards are JSON-stringified, which escapes quotes.
// Unlike Prometheus rules (which are YAML and can use escapeGoTemplate directly),
// Grafana templates need post-processing after JSON serialization.

// Read the file, do replacements, and write it back
// This handles multiline JSON strings in YAML better than sed
try {
  let fileContent = readFileSync(appsFile, "utf-8");

  // Count total replacements before applying
  const placeholderRegex = /__GRAFANA_TPL_START__\w+__GRAFANA_TPL_END__/g;
  const matches = [...fileContent.matchAll(placeholderRegex)];
  const totalReplacements = matches.length;

  if (totalReplacements > 0) {
    // Apply all replacements using regex (handles any variable name automatically)
    fileContent = applyGrafanaReplacements(fileContent);
    console.log(`✓ Applied ${String(totalReplacements)} Grafana template replacement(s)`);
    writeFileSync(appsFile, fileContent, "utf-8");
  } else {
    console.log("ℹ No Grafana template placeholders found to replace");
  }
} catch (error) {
  console.error(`✗ Failed to process Grafana templates:`, error);
  // Fallback to sed for compatibility - generate replacements dynamically
  try {
    const fileContent = readFileSync(appsFile, "utf-8");
    const replacements = getGrafanaReplacements(fileContent);
    for (const replacement of replacements) {
      try {
        await runCommand(sedCommand, ["-i", replacement.sedPattern, appsFile]);
        console.log(`✓ Processed Grafana template: ${replacement.pattern} (sed fallback)`);
      } catch (sedError) {
        console.error(`✗ Failed to process Grafana template ${replacement.pattern}:`, sedError);
      }
    }
  } catch (fallbackError) {
    console.error(`✗ Sed fallback also failed:`, fallbackError);
  }
}

console.log("🎉 Grafana template patches applied successfully!");
