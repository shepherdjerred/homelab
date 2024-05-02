import { App } from "npm:cdk8s";
import { Chart } from "npm:cdk8s";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { supabaseVolumeName } from "../apps/supabase.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

export function createSupabaseChart(app: App) {
  const chart = new Chart(app, "supabase", {
    namespace: "supabase",
    disableResourceNameHashes: true,
  });

  new LocalPathVolume(chart, supabaseVolumeName, {});

  new OnePasswordItem(
    chart,
    "supabase-onepassword-item",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/oenguooxbrs6ftxa6xrgtanxy4",
      },
      metadata: {
        name: "supabase-secret",
      },
    },
  );

  // analytics uses a hard-coded secret name :/
  // https://github.com/supabase-community/supabase-kubernetes/blob/main/charts/supabase/templates/studio/deployment.yaml#L76-L77
  new OnePasswordItem(
    chart,
    "supabase-analytics-onepassword-item",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/oenguooxbrs6ftxa6xrgtanxy4",
      },
      metadata: {
        name: "supabase-analytics",
      },
    },
  );

  new OnePasswordItem(
    chart,
    "supabase-smtp-onepassword-item",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/oenguooxbrs6ftxa6xrgtanxy4",
      },
      metadata: {
        name: "supabase-smtp",
      },
    },
  );

  // storage persistence

  // image persistence

  // kong tailscale ingress

  return chart;
}
