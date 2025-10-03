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

const targetFile = "dist/torvalds.k8s.yaml";

console.log("🔧 Applying Intel GPU resource patches...");

// Define patterns to replace with their sed expressions
const replacements = [
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

for (const replacement of replacements) {
  try {
    await runCommand(sedCommand, ["-i", replacement.sedPattern, targetFile]);
    console.log(`✓ Processed pattern: ${replacement.pattern}`);
  } catch (error) {
    console.error(`✗ Failed to process pattern ${replacement.pattern}:`, error);
  }
}

console.log("🎉 Intel GPU resource patches applied successfully!");
