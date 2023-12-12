import type { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

export const config: DenonConfig = {
  scripts: {
    watch: {
      cmd: "deno run src/main.ts && kubectl diff -f dist/turing.k8s.yaml",
      allow: ["read", "write"],
      env: {
        KUBECTL_EXTERNAL_DIFF: "delta",
        DELTA_PAGER: "bat",
        BAT_PAGER: "/home/linuxbrew/.linuxbrew/bin/less",
      },
    },
    dev: {
      cmd: "deno run src/main.ts && deno script up",
      allow: ["read", "write"],
    },
  },
};

export default config;
