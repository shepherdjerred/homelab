#!/usr/bin/env bun

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

// Use gsed if available (macOS with GNU sed installed), otherwise use sed
const sedCommand = Bun.which("gsed") ? "gsed" : "sed";

const torvaldsFile = "dist/torvalds.k8s.yaml";

console.log("🔧 Applying Intel GPU resource patches...");

// Define patterns to replace with their sed expressions
// Note: Patterns include optional leading whitespace since the YAML is indented
const gpuReplacements = [
  {
    pattern: "gpu.intel.com/i915: null",
    sedPattern: "s/\\(^[[:space:]]*\\)gpu\\.intel\\.com\\/i915: null/\\1gpu.intel.com\\/i915: 1/g",
  },
  {
    pattern: "gpu.intel.com/i915: 0",
    sedPattern: "s/\\(^[[:space:]]*\\)gpu\\.intel\\.com\\/i915: 0$/\\1gpu.intel.com\\/i915: 1/g",
  },
  {
    pattern: "gpu.intel.com/i915: '0'",
    sedPattern: "s/\\(^[[:space:]]*\\)gpu\\.intel\\.com\\/i915: '0'/\\1gpu.intel.com\\/i915: 1/g",
  },
  {
    pattern: 'gpu.intel.com/i915: "0"',
    sedPattern: 's/\\(^[[:space:]]*\\)gpu\\.intel\\.com\\/i915: "0"/\\1gpu.intel.com\\/i915: 1/g',
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
