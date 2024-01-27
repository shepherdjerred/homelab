import { Chart, Size } from "npm:cdk8s";
import { LonghornVolume } from "./utils/longhorn.ts";

export function createImmichResources(chart: Chart) {
  new LonghornVolume(chart, "immich-volume", {
    storageClassName: "longhorn-hdd",
    storage: Size.gibibytes(50),
    namespace: "immich",
  });
}
