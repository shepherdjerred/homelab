// Generated TypeScript types for openebs Helm chart

export type OpenebsHelmValuesOpenebscrds = {
  csi?: OpenebsHelmValuesOpenebscrdsCsi;
};

export type OpenebsHelmValuesOpenebscrdsCsi = {
  volumeSnapshots?: OpenebsHelmValuesOpenebscrdsCsiVolumeSnapshots;
};

export type OpenebsHelmValuesOpenebscrdsCsiVolumeSnapshots = {
  enabled?: boolean;
  keep?: boolean;
};

export type OpenebsHelmValuesLocalpvprovisioner = {
  rbac?: OpenebsHelmValuesLocalpvprovisionerRbac;
};

export type OpenebsHelmValuesLocalpvprovisionerRbac = {
  create?: boolean;
};

export type OpenebsHelmValuesZfslocalpv = {
  crds?: OpenebsHelmValuesZfslocalpvCrds;
};

export type OpenebsHelmValuesZfslocalpvCrds = {
  zfsLocalPv?: OpenebsHelmValuesZfslocalpvCrdsZfsLocalPv;
  csi?: OpenebsHelmValuesZfslocalpvCrdsCsi;
};

export type OpenebsHelmValuesZfslocalpvCrdsZfsLocalPv = {
  enabled?: boolean;
};

export type OpenebsHelmValuesZfslocalpvCrdsCsi = {
  volumeSnapshots?: OpenebsHelmValuesZfslocalpvCrdsCsiVolumeSnapshots;
};

export type OpenebsHelmValuesZfslocalpvCrdsCsiVolumeSnapshots = {
  enabled?: boolean;
};

export type OpenebsHelmValuesLvmlocalpv = {
  crds?: OpenebsHelmValuesLvmlocalpvCrds;
};

export type OpenebsHelmValuesLvmlocalpvCrds = {
  lvmLocalPv?: OpenebsHelmValuesLvmlocalpvCrdsLvmLocalPv;
  csi?: OpenebsHelmValuesLvmlocalpvCrdsCsi;
};

export type OpenebsHelmValuesLvmlocalpvCrdsLvmLocalPv = {
  enabled?: boolean;
};

export type OpenebsHelmValuesLvmlocalpvCrdsCsi = {
  volumeSnapshots?: OpenebsHelmValuesLvmlocalpvCrdsCsiVolumeSnapshots;
};

export type OpenebsHelmValuesLvmlocalpvCrdsCsiVolumeSnapshots = {
  enabled?: boolean;
};

export type OpenebsHelmValuesMayastor = {
  csi?: OpenebsHelmValuesMayastorCsi;
  etcd?: OpenebsHelmValuesMayastorEtcd;
  "localpv-provisioner"?: OpenebsHelmValuesMayastorLocalpvprovisioner;
  crds?: OpenebsHelmValuesMayastorCrds;
  loki?: OpenebsHelmValuesMayastorLoki;
  alloy?: OpenebsHelmValuesMayastorAlloy;
};

export type OpenebsHelmValuesMayastorCsi = {
  node?: OpenebsHelmValuesMayastorCsiNode;
};

export type OpenebsHelmValuesMayastorCsiNode = {
  initContainers?: OpenebsHelmValuesMayastorCsiNodeInitContainers;
};

export type OpenebsHelmValuesMayastorCsiNodeInitContainers = {
  enabled?: boolean;
};

export type OpenebsHelmValuesMayastorEtcd = {
  clusterDomain?: string;
};

export type OpenebsHelmValuesMayastorLocalpvprovisioner = {
  enabled?: boolean;
};

export type OpenebsHelmValuesMayastorCrds = {
  enabled?: boolean;
};

export type OpenebsHelmValuesMayastorLoki = {
  enabled?: boolean;
};

export type OpenebsHelmValuesMayastorAlloy = {
  enabled?: boolean;
};

export type OpenebsHelmValuesPreUpgradeHook = {
  tolerations?: unknown[];
  imagePullSecrets?: unknown[];
  podLabels?: OpenebsHelmValuesPreUpgradeHookPodLabels;
  image?: OpenebsHelmValuesPreUpgradeHookImage;
};

export type OpenebsHelmValuesPreUpgradeHookPodLabels = object;

export type OpenebsHelmValuesPreUpgradeHookImage = {
  registry?: string;
  repo?: string;
  tag?: string;
  pullPolicy?: string;
};

export type OpenebsHelmValuesEngines = {
  local?: OpenebsHelmValuesEnginesLocal;
  replicated?: OpenebsHelmValuesEnginesReplicated;
};

export type OpenebsHelmValuesEnginesLocal = {
  lvm?: OpenebsHelmValuesEnginesLocalLvm;
  zfs?: OpenebsHelmValuesEnginesLocalZfs;
};

export type OpenebsHelmValuesEnginesLocalLvm = {
  enabled?: boolean;
};

export type OpenebsHelmValuesEnginesLocalZfs = {
  enabled?: boolean;
};

export type OpenebsHelmValuesEnginesReplicated = {
  mayastor?: OpenebsHelmValuesEnginesReplicatedMayastor;
};

export type OpenebsHelmValuesEnginesReplicatedMayastor = {
  enabled?: boolean;
};

export type OpenebsHelmValuesLoki = {
  enabled?: boolean;
  localpvScConfig?: OpenebsHelmValuesLokiLocalpvScConfig;
  loki?: OpenebsHelmValuesLokiLoki;
  singleBinary?: OpenebsHelmValuesLokiSingleBinary;
  minio?: OpenebsHelmValuesLokiMinio;
  deploymentMode?: string;
  lokiCanary?: OpenebsHelmValuesLokiLokiCanary;
  chunksCache?: OpenebsHelmValuesLokiChunksCache;
  test?: OpenebsHelmValuesLokiTest;
  gateway?: OpenebsHelmValuesLokiGateway;
  resultsCache?: OpenebsHelmValuesLokiResultsCache;
  backend?: OpenebsHelmValuesLokiBackend;
  read?: OpenebsHelmValuesLokiRead;
  write?: OpenebsHelmValuesLokiWrite;
  ingester?: OpenebsHelmValuesLokiIngester;
  querier?: OpenebsHelmValuesLokiQuerier;
  queryFrontend?: OpenebsHelmValuesLokiQueryFrontend;
  queryScheduler?: OpenebsHelmValuesLokiQueryScheduler;
  distributor?: OpenebsHelmValuesLokiDistributor;
  compactor?: OpenebsHelmValuesLokiCompactor;
  indexGateway?: OpenebsHelmValuesLokiIndexGateway;
  bloomCompactor?: OpenebsHelmValuesLokiBloomCompactor;
  bloomGateway?: OpenebsHelmValuesLokiBloomGateway;
};

export type OpenebsHelmValuesLokiLocalpvScConfig = {
  enabled?: boolean;
  loki?: OpenebsHelmValuesLokiLocalpvScConfigLoki;
  minio?: OpenebsHelmValuesLokiLocalpvScConfigMinio;
};

export type OpenebsHelmValuesLokiLocalpvScConfigLoki = {
  name?: string;
  basePath?: string;
  reclaimPolicy?: string;
  volumeBindingMode?: string;
};

export type OpenebsHelmValuesLokiLocalpvScConfigMinio = {
  name?: string;
  basePath?: string;
  reclaimPolicy?: string;
  volumeBindingMode?: string;
};

export type OpenebsHelmValuesLokiLoki = {
  serviceLabels?: OpenebsHelmValuesLokiLokiServiceLabels;
  podLabels?: OpenebsHelmValuesLokiLokiPodLabels;
  schemaConfig?: OpenebsHelmValuesLokiLokiSchemaConfig;
  commonConfig?: OpenebsHelmValuesLokiLokiCommonConfig;
  ingester?: OpenebsHelmValuesLokiLokiIngester;
  tracing?: OpenebsHelmValuesLokiLokiTracing;
  querier?: OpenebsHelmValuesLokiLokiQuerier;
  limits_config?: OpenebsHelmValuesLokiLokiLimitsconfig;
};

export type OpenebsHelmValuesLokiLokiServiceLabels = {
  app?: string;
};

export type OpenebsHelmValuesLokiLokiPodLabels = {
  app?: string;
};

export type OpenebsHelmValuesLokiLokiSchemaConfig = {
  configs?: OpenebsHelmValuesLokiLokiSchemaConfigConfigs[];
};

export type OpenebsHelmValuesLokiLokiCommonConfig = {
  replication_factor?: number;
};

export type OpenebsHelmValuesLokiLokiIngester = {
  chunk_encoding?: string;
};

export type OpenebsHelmValuesLokiLokiTracing = {
  enabled?: boolean;
};

export type OpenebsHelmValuesLokiLokiQuerier = {
  max_concurrent?: number;
};

export type OpenebsHelmValuesLokiLokiLimitsconfig = {
  ingestion_burst_size_mb?: number;
  ingestion_rate_mb?: number;
  max_label_names_per_series?: number;
};

export type OpenebsHelmValuesLokiSingleBinary = {
  replicas?: number;
  drivesPerNode?: number;
  persistence?: OpenebsHelmValuesLokiSingleBinaryPersistence;
};

export type OpenebsHelmValuesLokiSingleBinaryPersistence = {
  enabled?: boolean;
  storageClass?: string;
  accessModes?: string[];
  size?: string;
};

export type OpenebsHelmValuesLokiMinio = {
  replicas?: number;
  drivesPerNode?: number;
  mode?: string;
  enabled?: boolean;
  persistence?: OpenebsHelmValuesLokiMinioPersistence;
};

export type OpenebsHelmValuesLokiMinioPersistence = {
  enabled?: boolean;
  storageClass?: string;
  size?: string;
};

export type OpenebsHelmValuesLokiLokiCanary = {
  enabled?: boolean;
};

export type OpenebsHelmValuesLokiChunksCache = {
  enabled?: boolean;
};

export type OpenebsHelmValuesLokiTest = {
  enabled?: boolean;
};

export type OpenebsHelmValuesLokiGateway = {
  enabled?: boolean;
};

export type OpenebsHelmValuesLokiResultsCache = {
  enabled?: boolean;
};

export type OpenebsHelmValuesLokiBackend = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiRead = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiWrite = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiIngester = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiQuerier = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiQueryFrontend = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiQueryScheduler = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiDistributor = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiCompactor = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiIndexGateway = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiBloomCompactor = {
  replicas?: number;
};

export type OpenebsHelmValuesLokiBloomGateway = {
  replicas?: number;
};

export type OpenebsHelmValuesAlloy = {
  enabled?: boolean;
  logging_config?: OpenebsHelmValuesAlloyLoggingconfig;
  alloy?: OpenebsHelmValuesAlloyAlloy;
};

export type OpenebsHelmValuesAlloyLoggingconfig = {
  debugging?: boolean;
  labels?: OpenebsHelmValuesAlloyLoggingconfigLabels;
  tenant_id?: string;
};

export type OpenebsHelmValuesAlloyLoggingconfigLabels = {
  "openebs.io/logging"?: boolean;
};

export type OpenebsHelmValuesAlloyAlloy = {
  mounts?: OpenebsHelmValuesAlloyAlloyMounts;
  configMap?: OpenebsHelmValuesAlloyAlloyConfigMap;
};

export type OpenebsHelmValuesAlloyAlloyMounts = {
  varlog?: boolean;
};

export type OpenebsHelmValuesAlloyAlloyConfigMap = {
  create?: boolean;
  content?: string;
};

export type OpenebsHelmValues = {
  "openebs-crds"?: OpenebsHelmValuesOpenebscrds;
  "localpv-provisioner"?: OpenebsHelmValuesLocalpvprovisioner;
  "zfs-localpv"?: OpenebsHelmValuesZfslocalpv;
  "lvm-localpv"?: OpenebsHelmValuesLvmlocalpv;
  mayastor?: OpenebsHelmValuesMayastor;
  preUpgradeHook?: OpenebsHelmValuesPreUpgradeHook;
  engines?: OpenebsHelmValuesEngines;
  loki?: OpenebsHelmValuesLoki;
  alloy?: OpenebsHelmValuesAlloy;
};

export type OpenebsHelmParameters = {
  "openebs-crds.csi.volumeSnapshots.enabled"?: string;
  "openebs-crds.csi.volumeSnapshots.keep"?: string;
  "localpv-provisioner.rbac.create"?: string;
  "zfs-localpv.crds.zfsLocalPv.enabled"?: string;
  "zfs-localpv.crds.csi.volumeSnapshots.enabled"?: string;
  "lvm-localpv.crds.lvmLocalPv.enabled"?: string;
  "lvm-localpv.crds.csi.volumeSnapshots.enabled"?: string;
  "mayastor.csi.node.initContainers.enabled"?: string;
  "mayastor.etcd.clusterDomain"?: string;
  "mayastor.localpv-provisioner.enabled"?: string;
  "mayastor.crds.enabled"?: string;
  "mayastor.loki.enabled"?: string;
  "mayastor.alloy.enabled"?: string;
  "preUpgradeHook.tolerations"?: string;
  "preUpgradeHook.imagePullSecrets"?: string;
  "preUpgradeHook.image.registry"?: string;
  "preUpgradeHook.image.repo"?: string;
  "preUpgradeHook.image.tag"?: string;
  "preUpgradeHook.image.pullPolicy"?: string;
  "engines.local.lvm.enabled"?: string;
  "engines.local.zfs.enabled"?: string;
  "engines.replicated.mayastor.enabled"?: string;
  "loki.enabled"?: string;
  "loki.localpvScConfig.enabled"?: string;
  "loki.localpvScConfig.loki.name"?: string;
  "loki.localpvScConfig.loki.basePath"?: string;
  "loki.localpvScConfig.loki.reclaimPolicy"?: string;
  "loki.localpvScConfig.loki.volumeBindingMode"?: string;
  "loki.localpvScConfig.minio.name"?: string;
  "loki.localpvScConfig.minio.basePath"?: string;
  "loki.localpvScConfig.minio.reclaimPolicy"?: string;
  "loki.localpvScConfig.minio.volumeBindingMode"?: string;
  "loki.loki.serviceLabels.app"?: string;
  "loki.loki.podLabels.app"?: string;
  "loki.loki.schemaConfig.configs"?: string;
  "loki.loki.commonConfig.replication_factor"?: string;
  "loki.loki.ingester.chunk_encoding"?: string;
  "loki.loki.tracing.enabled"?: string;
  "loki.loki.querier.max_concurrent"?: string;
  "loki.loki.limits_config.ingestion_burst_size_mb"?: string;
  "loki.loki.limits_config.ingestion_rate_mb"?: string;
  "loki.loki.limits_config.max_label_names_per_series"?: string;
  "loki.singleBinary.replicas"?: string;
  "loki.singleBinary.drivesPerNode"?: string;
  "loki.singleBinary.persistence.enabled"?: string;
  "loki.singleBinary.persistence.storageClass"?: string;
  "loki.singleBinary.persistence.accessModes"?: string;
  "loki.singleBinary.persistence.size"?: string;
  "loki.minio.replicas"?: string;
  "loki.minio.drivesPerNode"?: string;
  "loki.minio.mode"?: string;
  "loki.minio.enabled"?: string;
  "loki.minio.persistence.enabled"?: string;
  "loki.minio.persistence.storageClass"?: string;
  "loki.minio.persistence.size"?: string;
  "loki.deploymentMode"?: string;
  "loki.lokiCanary.enabled"?: string;
  "loki.chunksCache.enabled"?: string;
  "loki.test.enabled"?: string;
  "loki.gateway.enabled"?: string;
  "loki.resultsCache.enabled"?: string;
  "loki.backend.replicas"?: string;
  "loki.read.replicas"?: string;
  "loki.write.replicas"?: string;
  "loki.ingester.replicas"?: string;
  "loki.querier.replicas"?: string;
  "loki.queryFrontend.replicas"?: string;
  "loki.queryScheduler.replicas"?: string;
  "loki.distributor.replicas"?: string;
  "loki.compactor.replicas"?: string;
  "loki.indexGateway.replicas"?: string;
  "loki.bloomCompactor.replicas"?: string;
  "loki.bloomGateway.replicas"?: string;
  "alloy.enabled"?: string;
  "alloy.logging_config.debugging"?: string;
  "alloy.logging_config.labels.openebs.io/logging"?: string;
  "alloy.logging_config.tenant_id"?: string;
  "alloy.alloy.mounts.varlog"?: string;
  "alloy.alloy.configMap.create"?: string;
  "alloy.alloy.configMap.content"?: string;
};
