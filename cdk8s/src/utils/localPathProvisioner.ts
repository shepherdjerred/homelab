import { Chart } from "npm:cdk8s";
import { KubeStorageClass } from "../../imports/k8s.ts";

export const SsdStorageClass = "ssd-local-path";
export const HddStorageClass = "hdd-local-path";

export function createStorageClasses(chart: Chart) {
  new KubeStorageClass(chart, "sdd-class", {
    metadata: {
      name: SsdStorageClass,
    },
    provisioner: "rancher.io/local-path",
    parameters: {
      nodePath: "/var/k3s/",
    },
    volumeBindingMode: "WaitForFirstConsumer",
    reclaimPolicy: "Delete",
  });

  new KubeStorageClass(chart, "hdd-class", {
    metadata: {
      name: HddStorageClass,
    },
    provisioner: "rancher.io/local-path",
    parameters: {
      nodePath: "/mnt/storage/k3s/",
    },
    volumeBindingMode: "WaitForFirstConsumer",
    reclaimPolicy: "Delete",
  });
}
