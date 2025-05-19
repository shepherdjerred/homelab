import type { App } from "https://esm.sh/cdk8s@2.69.60/lib/app.d.ts";
import { KubeStorageClass } from "../imports/k8s.ts";
import {
  VolumeSnapshotClass,
  VolumeSnapshotClassDeletionPolicy,
} from "../imports/snapshot.storage.k8s.io.ts";

export const SSD_STORAGE_CLASS = "host-zfs-ssd";
export const HDD_STORAGE_CLASS = "host-zfs-hdd";

export function createStorageClasses(app: App) {
  new KubeStorageClass(app, "host-zfs-ssd", {
    metadata: { name: SSD_STORAGE_CLASS },
    provisioner: "zfs.csi.openebs.io",
    allowVolumeExpansion: true,
    reclaimPolicy: "Retain",
    parameters: {
      fstype: "zfs",
      poolname: "zfspv-pool-nvme",
      compression: "off",
      dedup: "off",
      recordsize: "128k",
      shared: "yes",
    },
  });

  new KubeStorageClass(app, "host-zfs-hdd", {
    metadata: { name: HDD_STORAGE_CLASS },
    provisioner: "zfs.csi.openebs.io",
    allowVolumeExpansion: true,
    reclaimPolicy: "Retain",
    parameters: {
      fstype: "zfs",
      poolname: "zfspv-pool-hdd",
      compression: "off",
      dedup: "off",
      recordsize: "128k",
      shared: "yes",
    },
  });

  new VolumeSnapshotClass(app, "host-zfs-snapshot", {
    metadata: { name: "host-zfs-snapshot" },
    driver: "zfs.csi.openebs.io",
    deletionPolicy: VolumeSnapshotClassDeletionPolicy.DELETE,
  });
}
