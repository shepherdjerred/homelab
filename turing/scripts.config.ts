import type { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

export const config: DenonConfig = {
  scripts: {
    watch: {
      cmd: "deno task build && deno task diff",
    },
    dev: {
      cmd: "deno task build && deno task up",
    },
  },
};

export default config;
