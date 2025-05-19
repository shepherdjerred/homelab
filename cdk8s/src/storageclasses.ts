import type { Chart } from "cdk8s";
import { KubeStorageClass } from "../imports/k8s.ts";
import {
  VolumeSnapshotClass,
  VolumeSnapshotClassDeletionPolicy,
} from "../imports/snapshot.storage.k8s.io.ts";

export const SSD_STORAGE_CLASS = "zfs-ssd";
export const HDD_STORAGE_CLASS = "zfs-hdd";

export function createStorageClasses(chart: Chart) {
  new KubeStorageClass(chart, "host-zfs-ssd", {
    metadata: { name: SSD_STORAGE_CLASS },
    provisioner: "zfs.csi.openebs.io",
    allowVolumeExpansion: true,
    reclaimPolicy: "Retain",
    parameters: {
      fstype: "zfs",
      // "csi.storage.k8s.io/fstype": "zfs",
      poolname: "zfspv-pool-nvme",
      compression: "off",
      dedup: "off",
      recordsize: "128k",
      shared: "yes",
    },
    volumeBindingMode: "WaitForFirstConsumer",
  });

  new KubeStorageClass(chart, "host-zfs-hdd", {
    metadata: { name: HDD_STORAGE_CLASS },
    provisioner: "zfs.csi.openebs.io",
    allowVolumeExpansion: true,
    reclaimPolicy: "Retain",
    parameters: {
      fstype: "zfs",
      // "csi.storage.k8s.io/fstype": "zfs",
      poolname: "zfspv-pool-hdd",
      compression: "off",
      dedup: "off",
      recordsize: "128k",
      shared: "yes",
    },
    volumeBindingMode: "WaitForFirstConsumer",
  });

  new VolumeSnapshotClass(chart, "host-zfs-snapshot", {
    metadata: { name: "host-zfs-snapshot" },
    driver: "zfs.csi.openebs.io",
    deletionPolicy: VolumeSnapshotClassDeletionPolicy.DELETE,
  });
}
