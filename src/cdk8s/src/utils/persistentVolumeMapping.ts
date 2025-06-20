import { PersistentVolume, type IPersistentVolume } from "cdk8s-plus-31";
import { Construct } from "constructs";

/**
 * Central mapping of logical PV names to actual PV UUIDs
 * This makes it easier to reference existing PVs in the codebase
 */
export const PV_MAPPINGS = {
  // Home Assistant
  "homeassistant-pvc": "pvc-41b70193-aa4a-47a5-ad33-dbdfc6924178", // 32Gi, zfs-ssd

  // Stash
  "stash-config": "pvc-0251fe18-ef4d-4625-b763-ed371552cbec", // 8Gi, zfs-ssd
  "stash-data": "pvc-32e059a1-cbc8-4ebc-9e22-7ebc2633e004", // 64Gi, zfs-ssd
  "stash-blobs": "pvc-8714d24d-e490-42f2-9f98-9287fac7ecca", // 8Gi, zfs-ssd
  "stash-generated": "pvc-916a6ec8-b37e-4218-a6b5-51923ead48b8", // 64Gi, zfs-ssd
  "stash-metadata": "pvc-ee6f642c-c617-42c4-864d-e009bf2f44e0", // 8Gi, zfs-ssd

  // Plex
  "plex-pvc": "pvc-a055da77-79b9-4de4-878e-30550f3f7e23", // 512Gi, zfs-ssd
  "plex-tv-hdd-pvc": "pvc-e23f8b4a-717c-44f9-9699-42375267685a", // 2048Gi, zfs-hdd
  "plex-movies-hdd-pvc": "pvc-78e2588e-1839-4d61-878a-50d3131842b4", // 10240Gi, zfs-hdd

  // qBittorrent
  "qbittorrent-pvc": "pvc-6731fc87-6dc5-4c4b-8825-122e80522e22", // 8Gi, zfs-ssd
  "qbittorrent-hdd-pvc": "pvc-08264295-d088-420f-a0f2-440835a7dabd", // 1024Gi, zfs-hdd

  // Arr Stack
  "radarr-pvc": "pvc-d25748d7-ff5a-44ba-b755-6569d9d4c99c", // 8Gi, zfs-ssd
  "sonarr-pvc": "pvc-ec6a318d-978d-4418-8202-3c6812e061c9", // 8Gi, zfs-ssd
  "bazarr-pvc": "pvc-6b7384ca-8c38-4723-bf33-3bb778693a38", // 8Gi, zfs-ssd
  "prowlarr-pvc": "pvc-511211d5-726a-4903-a015-e5f990bfa07a", // 8Gi, zfs-ssd
  "overseerr-pvc": "pvc-1a262e2b-5d25-4858-9f37-8a38279b0124", // 8Gi, zfs-ssd
  "maintainerr-pvc": "pvc-8c194fc2-dffd-4654-82e0-560c59f7a938", // 8Gi, zfs-ssd

  // Media
  "tautulli-pvc": "pvc-af276737-c693-4d28-bff2-637c2195cad7", // 8Gi, zfs-ssd

  // Other Services
  "syncthing-config": "pvc-10050a46-0bd5-4950-be5c-f339ab38b6fb", // 8Gi, zfs-ssd
  "syncthing-data": "pvc-02cc4109-0706-4caa-8d50-c832dee1c525", // 512Gi, zfs-ssd
  "golink-pvc": "pvc-7440d281-e030-43ca-b60e-12a07b6a9ebe", // 8Gi, zfs-ssd
  "pokemon-volume": "pvc-61741db6-4b07-4b1a-a09c-8f993f7cd62b", // 8Gi, zfs-ssd
  "pokemon-rom-volume": "pvc-f08118d4-3882-4799-a599-4e456904bca5", // 8Gi, zfs-ssd
  "freshrss-data": "pvc-72d02b02-6ea4-4b6d-abe6-14214ae78029", // 32Gi, zfs-ssd
  "freshrss-extensions": "pvc-25d3f2a0-faa4-43e3-b829-9531c1721e89", // 8Gi, zfs-ssd

  // Scout
  "scout-storage-claim": "pvc-e0b992c4-6bed-451f-9221-1d892a979041", // 8Gi, zfs-ssd

  // Dagger/CI
  "earthly-pvc": "pvc-de8b6222-c896-431b-896f-712290c1cb77", // 1024Gi, zfs-ssd
  "gha-shared-cache": "pvc-53e9110e-086d-4374-8a7a-79c260843c77", // 100Gi, zfs-ssd

  // Infrastructure (HDD volumes)
  chartmuseum: "pvc-2ee7fd6a-b6aa-4482-943e-dda605a46684", // 32Gi, zfs-hdd
  jenkins: "pvc-4a334553-dc38-456c-b72a-225e09ed0752", // 128Gi, zfs-hdd
  "minecraft-datadir": "pvc-9a0c91f4-bc51-4500-9237-54ce0c6821ef", // 32Gi, zfs-ssd

  // Monitoring (HDD volumes)
  "prometheus-grafana": "pvc-76fd592c-706e-4873-aa79-7c937cd38ef3", // 32Gi, zfs-hdd
  "prometheus-prometheus": "pvc-f72bc3d1-d8ee-4858-8fe1-48277a6a38b5", // 8Gi, zfs-hdd
  "alertmanager-prometheus": "pvc-bac006b4-d421-433a-bcbe-eed9e3d2ff05", // 8Gi, zfs-hdd

  // Loki (HDD volumes)
  "loki-storage": "pvc-fe270490-ecd3-4702-acac-797cfaba2eec", // 32Gi, zfs-hdd
  "loki-minio-0": "pvc-e27bb219-9ff9-4d6f-b683-3b01543350bf", // 32Gi, zfs-hdd
  "loki-minio-1": "pvc-3285ea9f-d044-4b4f-b4d5-e6fdee005a72", // 32Gi, zfs-hdd
} as const;

export type PVMappingKey = keyof typeof PV_MAPPINGS;

/**
 * Helper function to get a PersistentVolume reference from the mapping
 * @param scope - The construct scope
 * @param logicalName - The logical name from PV_MAPPINGS
 * @returns IPersistentVolume reference
 */
export function getPersistentVolume(
  scope: Construct,
  logicalName: PVMappingKey
): IPersistentVolume {
  const pvName = PV_MAPPINGS[logicalName];
  return PersistentVolume.fromPersistentVolumeName(
    scope,
    `pv-${logicalName}`,
    pvName
  );
}
