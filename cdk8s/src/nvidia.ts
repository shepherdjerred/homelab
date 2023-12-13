import { Chart } from "npm:cdk8s";
import { KubeRuntimeClass } from "../imports/k8s.ts";

export function createNvidiaResources(chart: Chart) {
  new KubeRuntimeClass(chart, "nvidia", {
    metadata: {
      name: "nvidia",
    },
    handler: "nvidia",
  });
}
