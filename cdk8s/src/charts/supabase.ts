import { App } from "npm:cdk8s";
import { Chart } from "npm:cdk8s";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { supabaseVolumeName } from "../apps/supabase.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import { Secret } from "npm:cdk8s-plus-27";

export function createSupabaseApp(app: App) {
  const chart = new Chart(app, "supabase", {
    namespace: "supabase",
    disableResourceNameHashes: true,
  });

  new LocalPathVolume(chart, supabaseVolumeName, {});

  const item = new OnePasswordItem(
    chart,
    "supabase-onepassword-item",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/oenguooxbrs6ftxa6xrgtanxy4",
      },
    },
  );

  Secret.fromSecretName(
    chart,
    "supabase-secret",
    item.name,
  );

  // storage persistence

  // image persistence

  // kong tailscale ingress

  return chart;
}
