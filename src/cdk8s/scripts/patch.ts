#!/usr/bin/env bun

import { applyGrafanaReplacements, getGrafanaReplacements } from "./patch-utils.ts";

const runCommand = async (command: string, args: string[]) => {
  const proc = Bun.spawn([command, ...args], {
    stdout: "pipe",
    stderr: "inherit",
  });

  const output = await new Response(proc.stdout).text();
  const exitCode = await proc.exited;

  if (exitCode === 0) {
    return output;
  }
  throw new Error(`Command failed with code ${String(exitCode)}`);
};

// on macOS use gsed, on Linux use sed
const sedCommand = Bun.env["OSTYPE"]?.includes("darwin") ? "gsed" : "sed";

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
  let fileContent = await Bun.file(appsFile).text();

  // Count total replacements before applying
  const placeholderRegex = /__GRAFANA_TPL_START__\w+__GRAFANA_TPL_END__/g;
  const matches = [...fileContent.matchAll(placeholderRegex)];
  const totalReplacements = matches.length;

  if (totalReplacements > 0) {
    // Apply all replacements using regex (handles any variable name automatically)
    fileContent = applyGrafanaReplacements(fileContent);
    console.log(`✓ Applied ${String(totalReplacements)} Grafana template replacement(s)`);
    await Bun.write(appsFile, fileContent);
  } else {
    console.log("ℹ No Grafana template placeholders found to replace");
  }
} catch (error) {
  console.error(`✗ Failed to process Grafana templates:`, error);
  // Fallback to sed for compatibility - generate replacements dynamically
  try {
    const fileContent = await Bun.file(appsFile).text();
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
