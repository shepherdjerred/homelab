import { Chart } from "cdk8s";
import { App } from "cdk8s";
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
