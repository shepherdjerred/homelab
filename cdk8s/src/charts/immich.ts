import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { App } from "https://esm.sh/cdk8s@2.68.58";
import { LocalPathVolume } from "../utils/localPathVolume.ts";
import { immichVolumeName } from "../apps/immich.ts";

export function createImmichChart(app: App) {
  const chart = new Chart(app, "immich", {
    namespace: "immich",
    disableResourceNameHashes: true,
  });

  new LocalPathVolume(chart, immichVolumeName, {});

  return chart;
}
