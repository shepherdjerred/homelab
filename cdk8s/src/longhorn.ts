import { Chart } from "npm:cdk8s";
import { KubeStorageClass } from "../imports/k8s.ts";
import { recurringJobName } from "./apps/longhorn.ts";

export function createLonghornResources(chart: Chart) {
  const selector = [
    {
      "name": recurringJobName,
      "isGroup": false,
    },
  ];

  // TODO: remove the normal "longhorn" storage class if possible
  new KubeStorageClass(chart, "longhorn-ssd", {
    metadata: {
      name: "longhorn-ssd",
    },
    provisioner: "driver.longhorn.io",
    parameters: {
      numberOfReplicas: "1",
      staleReplicaTimeout: "480",
      diskSelector: "ssd",
      recurringJobSelector: JSON.stringify(selector),
      // allowVolumeExpansion: "true",
    },
  });

  new KubeStorageClass(chart, "longhorn-hdd", {
    metadata: {
      name: "longhorn-hdd",
    },
    provisioner: "driver.longhorn.io",
    parameters: {
      numberOfReplicas: "1",
      staleReplicaTimeout: "480",
      diskSelector: "hdd",
      // allowVolumeExpansion: "true",
    },
  });
}
