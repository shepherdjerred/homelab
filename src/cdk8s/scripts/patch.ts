#!/usr/bin/env bun

import { spawn } from "node:child_process";
import { platform } from "node:os";

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
const grafanaReplacements = [
  {
    pattern: "__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__",
    sedPattern: 's/__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__/{{ print "{{" }}environment{{ print "}}" }}/g',
  },
  {
    pattern: "__GRAFANA_TPL_START__job_name__GRAFANA_TPL_END__",
    sedPattern: 's/__GRAFANA_TPL_START__job_name__GRAFANA_TPL_END__/{{ print "{{" }}job_name{{ print "}}" }}/g',
  },
  {
    pattern: "__GRAFANA_TPL_START__device__GRAFANA_TPL_END__",
    sedPattern: 's/__GRAFANA_TPL_START__device__GRAFANA_TPL_END__/{{ print "{{" }}device{{ print "}}" }}/g',
  },
  {
    pattern: "__GRAFANA_TPL_START__model_name__GRAFANA_TPL_END__",
    sedPattern: 's/__GRAFANA_TPL_START__model_name__GRAFANA_TPL_END__/{{ print "{{" }}model_name{{ print "}}" }}/g',
  },
  {
    pattern: "__GRAFANA_TPL_START__instance__GRAFANA_TPL_END__",
    sedPattern: 's/__GRAFANA_TPL_START__instance__GRAFANA_TPL_END__/{{ print "{{" }}instance{{ print "}}" }}/g',
  },
  {
    pattern: "__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__",
    sedPattern: 's/__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__/{{ print "{{" }}schedule{{ print "}}" }}/g',
  },
  {
    pattern: "__GRAFANA_TPL_START__namespace__GRAFANA_TPL_END__",
    sedPattern: 's/__GRAFANA_TPL_START__namespace__GRAFANA_TPL_END__/{{ print "{{" }}namespace{{ print "}}" }}/g',
  },
  {
    pattern: "__GRAFANA_TPL_START__workflow__GRAFANA_TPL_END__",
    sedPattern: 's/__GRAFANA_TPL_START__workflow__GRAFANA_TPL_END__/{{ print "{{" }}workflow{{ print "}}" }}/g',
  },
  {
    pattern: "__GRAFANA_TPL_START__error_type__GRAFANA_TPL_END__",
    sedPattern: 's/__GRAFANA_TPL_START__error_type__GRAFANA_TPL_END__/{{ print "{{" }}error_type{{ print "}}" }}/g',
  },
];

for (const replacement of grafanaReplacements) {
  try {
    await runCommand(sedCommand, ["-i", replacement.sedPattern, appsFile]);
    console.log(`✓ Processed Grafana template: ${replacement.pattern}`);
  } catch (error) {
    console.error(`✗ Failed to process Grafana template ${replacement.pattern}:`, error);
  }
}

console.log("🎉 Grafana template patches applied successfully!");
