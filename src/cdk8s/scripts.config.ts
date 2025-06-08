import type { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

export const config: DenonConfig = {
  scripts: {
    build: {
      cmd: "deno task build",
    },
    diff: {
      cmd: "deno task build && deno task diff",
    },
    dev: {
      cmd: "deno task build && deno task up",
    },
  },
  watcher: {
    interval: 100,
  },
};

export default config;
