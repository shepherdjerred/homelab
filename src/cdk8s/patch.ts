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
      else
        reject(
          new Error(
            `Command failed with code ${code?.toString() ?? "unknown"}`,
          ),
        );
    });
  });
};

// on macOS use gsed, on Linux use sed
const sedCommand = platform() === "darwin" ? "gsed" : "sed";

// Define the patterns to replace Intel GPU resources with correct value
const patterns = [
  "gpu.intel.com/i915: null",
  "gpu.intel.com/i915: 0",
  "gpu.intel.com/i915: '0'",
  'gpu.intel.com/i915: "0"',
];

const targetFile = "dist/torvalds.k8s.yaml";

console.log("🔧 Applying Intel GPU resource patches...");

for (const pattern of patterns) {
  try {
    await runCommand(sedCommand, [
      "-i",
      `s/${pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/gpu.intel.com\\/i915: 1/g`,
      targetFile,
    ]);
    console.log(`✓ Processed pattern: ${pattern}`);
  } catch (error) {
    console.error(`✗ Failed to process pattern ${pattern}:`, error);
  }
}

console.log("🎉 Intel GPU resource patches applied successfully!");
