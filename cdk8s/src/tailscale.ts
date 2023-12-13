import { Chart } from "npm:cdk8s";
import { OnePasswordItem } from "../imports/onepassword.com.ts";

export function createTailscaleResources(chart: Chart) {
  new OnePasswordItem(chart, "tailscale-auth-key-onepassword", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/t5scpnlhnxvu25dneg6jdd7c7q",
    },
    metadata: {
      name: "tailscale-auth-key",
    },
  });

  new OnePasswordItem(chart, "tailscale-operator-oauth-onepassword", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/mboftvs4fyptyqvg3anrfjy6vu",
    },
    metadata: {
      name: "tailscale-operator-oauth",
      namespace: "tailscale",
    },
  });
}
