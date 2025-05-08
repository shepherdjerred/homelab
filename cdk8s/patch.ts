#!/usr/bin/env -S deno run --allow-run

// on macOS use gsed, on Linux use sed
const sedCommand = Deno.build.os === "darwin" ? "gsed" : "sed";

// replace "gpu.intel.com/i915: null" with "gpu.intel.com/i915: 1" in dist/torvalds.k8s.yaml
const command = new Deno.Command(sedCommand, {
  args: [
    "-i",
    "s/gpu.intel.com\\/i915: null/gpu.intel.com\\/i915: 1/g",
    "dist/torvalds.k8s.yaml",
  ],
});

console.log(new TextDecoder().decode((await command.output()).stdout));
