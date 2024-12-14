#!/usr/bin/env -S deno run --allow-run

// on macOS use gsed, on Linux use sed
const gsed = new Deno.Command("gsed", {
  args: ["--version"],
});
const output = await gsed.output();
const sedCommand = output.code === 0 ? "gsed" : "sed";

// replace "gpu.intel.com/i915: null" with "gpu.intel.com/i915: 1" in dist/lamport.k8s.yaml
const command = new Deno.Command(sedCommand, {
  args: [
    "-i",
    "s/gpu.intel.com\\/i915: null/gpu.intel.com\\/i915: 1/g",
    "dist/lamport.k8s.yaml",
  ],
});

console.log(new TextDecoder().decode((await command.output()).stdout));
