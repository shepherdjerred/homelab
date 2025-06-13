#!/usr/bin/env bun

import { spawn } from 'node:child_process';
import { platform } from 'node:os';

const runCommand = async (command: string, args: string[]) => {
  return new Promise<string>((resolve, reject) => {
    const proc = spawn(command, args, { stdio: ['inherit', 'pipe', 'inherit'] });
    let output = '';
    proc.stdout.on('data', (data) => output += data.toString());
    proc.on('close', (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`Command failed with code ${code}`));
    });
  });
};

// on macOS use gsed, on Linux use sed
const sedCommand = platform() === "darwin" ? "gsed" : "sed";

// replace "gpu.intel.com/i915: null" with "gpu.intel.com/i915: 1" in dist/torvalds.k8s.yaml
console.log(await runCommand(sedCommand, [
  "-i",
  "s/gpu.intel.com\\/i915: null/gpu.intel.com\\/i915: 1/g",
  "dist/torvalds.k8s.yaml",
]));
