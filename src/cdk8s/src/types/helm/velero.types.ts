// Generated TypeScript types for velero Helm chart

export type VeleroHelmValuesNamespace = {
  labels?: VeleroHelmValuesNamespaceLabels;
};

export type VeleroHelmValuesNamespaceLabels = object;

export type VeleroHelmValuesImage = {
  repository?: string;
  tag?: string;
  pullPolicy?: string;
  imagePullSecrets?: unknown[];
};

export type VeleroHelmValuesAnnotations = object;

export type VeleroHelmValuesSecretAnnotations = object;

export type VeleroHelmValuesLabels = object;

export type VeleroHelmValuesPodAnnotations = object;

export type VeleroHelmValuesPodLabels = object;

export type VeleroHelmValuesResources = object;

export type VeleroHelmValuesUpgradeJobResources = object;

export type VeleroHelmValuesUpgradeCRDsJob = {
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  extraEnvVars?: unknown[];
  automountServiceAccountToken?: boolean;
};

export type VeleroHelmValuesPodSecurityContext = object;

export type VeleroHelmValuesContainerSecurityContext = object;

export type VeleroHelmValuesLifecycle = object;

export type VeleroHelmValuesLivenessProbe = {
  httpGet?: VeleroHelmValuesLivenessProbeHttpGet;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type VeleroHelmValuesLivenessProbeHttpGet = {
  path?: string;
  port?: string;
  scheme?: string;
};

export type VeleroHelmValuesReadinessProbe = {
  httpGet?: VeleroHelmValuesReadinessProbeHttpGet;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type VeleroHelmValuesReadinessProbeHttpGet = {
  path?: string;
  port?: string;
  scheme?: string;
};

export type VeleroHelmValuesAffinity = object;

export type VeleroHelmValuesNodeSelector = object;

export type VeleroHelmValuesDnsConfig = object;

export type VeleroHelmValuesMetrics = {
  enabled?: boolean;
  scrapeInterval?: string;
  scrapeTimeout?: string;
  service?: VeleroHelmValuesMetricsService;
  podAnnotations?: VeleroHelmValuesMetricsPodAnnotations;
  serviceMonitor?: VeleroHelmValuesMetricsServiceMonitor;
  nodeAgentPodMonitor?: VeleroHelmValuesMetricsNodeAgentPodMonitor;
  prometheusRule?: VeleroHelmValuesMetricsPrometheusRule;
};

export type VeleroHelmValuesMetricsService = {
  annotations?: VeleroHelmValuesMetricsServiceAnnotations;
  type?: string;
  labels?: VeleroHelmValuesMetricsServiceLabels;
  nodePort?: unknown;
  externalTrafficPolicy?: string;
  internalTrafficPolicy?: string;
  ipFamilyPolicy?: string;
  ipFamilies?: unknown[];
};

export type VeleroHelmValuesMetricsServiceAnnotations = object;

export type VeleroHelmValuesMetricsServiceLabels = object;

export type VeleroHelmValuesMetricsPodAnnotations = {
  "prometheus.io/scrape"?: string;
  "prometheus.io/port"?: string;
  "prometheus.io/path"?: string;
};

export type VeleroHelmValuesMetricsServiceMonitor = {
  autodetect?: boolean;
  enabled?: boolean;
  annotations?: VeleroHelmValuesMetricsServiceMonitorAnnotations;
  additionalLabels?: VeleroHelmValuesMetricsServiceMonitorAdditionalLabels;
};

export type VeleroHelmValuesMetricsServiceMonitorAnnotations = object;

export type VeleroHelmValuesMetricsServiceMonitorAdditionalLabels = object;

export type VeleroHelmValuesMetricsNodeAgentPodMonitor = {
  autodetect?: boolean;
  enabled?: boolean;
  annotations?: VeleroHelmValuesMetricsNodeAgentPodMonitorAnnotations;
  additionalLabels?: VeleroHelmValuesMetricsNodeAgentPodMonitorAdditionalLabels;
};

export type VeleroHelmValuesMetricsNodeAgentPodMonitorAnnotations = object;

export type VeleroHelmValuesMetricsNodeAgentPodMonitorAdditionalLabels = object;

export type VeleroHelmValuesMetricsPrometheusRule = {
  autodetect?: boolean;
  enabled?: boolean;
  additionalLabels?: VeleroHelmValuesMetricsPrometheusRuleAdditionalLabels;
  spec?: unknown[];
};

export type VeleroHelmValuesMetricsPrometheusRuleAdditionalLabels = object;

export type VeleroHelmValuesKubectl = {
  image?: VeleroHelmValuesKubectlImage;
  containerSecurityContext?: VeleroHelmValuesKubectlContainerSecurityContext;
  resources?: VeleroHelmValuesKubectlResources;
  annotations?: VeleroHelmValuesKubectlAnnotations;
  labels?: VeleroHelmValuesKubectlLabels;
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
};

export type VeleroHelmValuesKubectlImage = {
  repository?: string;
};

export type VeleroHelmValuesKubectlContainerSecurityContext = object;

export type VeleroHelmValuesKubectlResources = object;

export type VeleroHelmValuesKubectlAnnotations = object;

export type VeleroHelmValuesKubectlLabels = object;

export type VeleroHelmValuesConfiguration = {
  backupStorageLocation?: VeleroHelmValuesConfigurationBackupStorageLocation[];
  volumeSnapshotLocation?: VeleroHelmValuesConfigurationVolumeSnapshotLocation[];
  uploaderType?: unknown;
  backupSyncPeriod?: unknown;
  fsBackupTimeout?: unknown;
  clientBurst?: unknown;
  clientPageSize?: unknown;
  clientQPS?: unknown;
  defaultBackupStorageLocation?: unknown;
  defaultItemOperationTimeout?: unknown;
  defaultBackupTTL?: unknown;
  defaultVolumeSnapshotLocations?: unknown;
  disableControllers?: unknown;
  disableInformerCache?: boolean;
  garbageCollectionFrequency?: unknown;
  itemBlockWorkerCount?: unknown;
  logFormat?: unknown;
  logLevel?: unknown;
  metricsAddress?: unknown;
  pluginDir?: unknown;
  profilerAddress?: unknown;
  restoreOnlyMode?: unknown;
  restoreResourcePriorities?: unknown;
  storeValidationFrequency?: unknown;
  terminatingResourceTimeout?: unknown;
  defaultSnapshotMoveData?: unknown;
  features?: unknown;
  dataMoverPrepareTimeout?: unknown;
  repositoryMaintenanceJob?: VeleroHelmValuesConfigurationRepositoryMaintenanceJob;
  namespace?: unknown;
  extraArgs?: unknown[];
  extraEnvVars?: unknown[];
  defaultVolumesToFsBackup?: unknown;
  defaultRepoMaintainFrequency?: unknown;
};

export type VeleroHelmValuesConfigurationRepositoryMaintenanceJob = {
  requests?: unknown;
  limits?: unknown;
  latestJobsCount?: number;
  repositoryConfigData?: VeleroHelmValuesConfigurationRepositoryMaintenanceJobRepositoryConfigData;
};

export type VeleroHelmValuesConfigurationRepositoryMaintenanceJobRepositoryConfigData =
  {
    name?: string;
    global?: VeleroHelmValuesConfigurationRepositoryMaintenanceJobRepositoryConfigDataGlobal;
    repositories?: VeleroHelmValuesConfigurationRepositoryMaintenanceJobRepositoryConfigDataRepositories;
  };

export type VeleroHelmValuesConfigurationRepositoryMaintenanceJobRepositoryConfigDataGlobal =
  object;

export type VeleroHelmValuesConfigurationRepositoryMaintenanceJobRepositoryConfigDataRepositories =
  object;

export type VeleroHelmValuesRbac = {
  create?: boolean;
  clusterAdministrator?: boolean;
  clusterAdministratorName?: string;
};

export type VeleroHelmValuesServiceAccount = {
  server?: VeleroHelmValuesServiceAccountServer;
};

export type VeleroHelmValuesServiceAccountServer = {
  create?: boolean;
  name?: unknown;
  annotations?: unknown;
  labels?: unknown;
  imagePullSecrets?: unknown[];
  automountServiceAccountToken?: boolean;
};

export type VeleroHelmValuesCredentials = {
  useSecret?: boolean;
  name?: unknown;
  existingSecret?: unknown;
  secretContents?: VeleroHelmValuesCredentialsSecretContents;
  extraEnvVars?: VeleroHelmValuesCredentialsExtraEnvVars;
  extraSecretRef?: string;
};

export type VeleroHelmValuesCredentialsSecretContents = object;

export type VeleroHelmValuesCredentialsExtraEnvVars = object;

export type VeleroHelmValuesNodeAgent = {
  podVolumePath?: string;
  pluginVolumePath?: string;
  priorityClassName?: string;
  runtimeClassName?: string;
  resources?: VeleroHelmValuesNodeAgentResources;
  tolerations?: unknown[];
  annotations?: VeleroHelmValuesNodeAgentAnnotations;
  labels?: VeleroHelmValuesNodeAgentLabels;
  podLabels?: VeleroHelmValuesNodeAgentPodLabels;
  useScratchEmptyDir?: boolean;
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  extraEnvVars?: unknown[];
  extraArgs?: unknown[];
  dnsPolicy?: string;
  hostAliases?: unknown[];
  podSecurityContext?: VeleroHelmValuesNodeAgentPodSecurityContext;
  containerSecurityContext?: VeleroHelmValuesNodeAgentContainerSecurityContext;
  lifecycle?: VeleroHelmValuesNodeAgentLifecycle;
  nodeSelector?: VeleroHelmValuesNodeAgentNodeSelector;
  affinity?: VeleroHelmValuesNodeAgentAffinity;
  dnsConfig?: VeleroHelmValuesNodeAgentDnsConfig;
  updateStrategy?: VeleroHelmValuesNodeAgentUpdateStrategy;
};

export type VeleroHelmValuesNodeAgentResources = object;

export type VeleroHelmValuesNodeAgentAnnotations = object;

export type VeleroHelmValuesNodeAgentLabels = object;

export type VeleroHelmValuesNodeAgentPodLabels = object;

export type VeleroHelmValuesNodeAgentPodSecurityContext = {
  runAsUser?: number;
};

export type VeleroHelmValuesNodeAgentContainerSecurityContext = object;

export type VeleroHelmValuesNodeAgentLifecycle = object;

export type VeleroHelmValuesNodeAgentNodeSelector = object;

export type VeleroHelmValuesNodeAgentAffinity = object;

export type VeleroHelmValuesNodeAgentDnsConfig = object;

export type VeleroHelmValuesNodeAgentUpdateStrategy = object;

export type VeleroHelmValuesSchedules = object;

export type VeleroHelmValuesConfigMaps = object;

export type VeleroHelmValues = {
  namespace?: VeleroHelmValuesNamespace;
  image?: VeleroHelmValuesImage;
  nameOverride?: string;
  fullnameOverride?: string;
  annotations?: VeleroHelmValuesAnnotations;
  secretAnnotations?: VeleroHelmValuesSecretAnnotations;
  labels?: VeleroHelmValuesLabels;
  podAnnotations?: VeleroHelmValuesPodAnnotations;
  podLabels?: VeleroHelmValuesPodLabels;
  resources?: VeleroHelmValuesResources;
  hostAliases?: unknown[];
  upgradeJobResources?: VeleroHelmValuesUpgradeJobResources;
  upgradeCRDsJob?: VeleroHelmValuesUpgradeCRDsJob;
  dnsPolicy?: string;
  initContainers?: unknown;
  podSecurityContext?: VeleroHelmValuesPodSecurityContext;
  containerSecurityContext?: VeleroHelmValuesContainerSecurityContext;
  lifecycle?: VeleroHelmValuesLifecycle;
  priorityClassName?: string;
  runtimeClassName?: string;
  terminationGracePeriodSeconds?: number;
  livenessProbe?: VeleroHelmValuesLivenessProbe;
  readinessProbe?: VeleroHelmValuesReadinessProbe;
  tolerations?: unknown[];
  affinity?: VeleroHelmValuesAffinity;
  nodeSelector?: VeleroHelmValuesNodeSelector;
  dnsConfig?: VeleroHelmValuesDnsConfig;
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  extraObjects?: unknown[];
  metrics?: VeleroHelmValuesMetrics;
  kubectl?: VeleroHelmValuesKubectl;
  upgradeCRDs?: boolean;
  cleanUpCRDs?: boolean;
  configuration?: VeleroHelmValuesConfiguration;
  rbac?: VeleroHelmValuesRbac;
  serviceAccount?: VeleroHelmValuesServiceAccount;
  credentials?: VeleroHelmValuesCredentials;
  backupsEnabled?: boolean;
  snapshotsEnabled?: boolean;
  deployNodeAgent?: boolean;
  nodeAgent?: VeleroHelmValuesNodeAgent;
  schedules?: VeleroHelmValuesSchedules;
  configMaps?: VeleroHelmValuesConfigMaps;
};

export type VeleroHelmParameters = {
  "image.repository"?: string;
  "image.tag"?: string;
  "image.pullPolicy"?: string;
  "image.imagePullSecrets"?: string;
  nameOverride?: string;
  fullnameOverride?: string;
  hostAliases?: string;
  "upgradeCRDsJob.extraVolumes"?: string;
  "upgradeCRDsJob.extraVolumeMounts"?: string;
  "upgradeCRDsJob.extraEnvVars"?: string;
  "upgradeCRDsJob.automountServiceAccountToken"?: string;
  dnsPolicy?: string;
  initContainers?: string;
  priorityClassName?: string;
  runtimeClassName?: string;
  terminationGracePeriodSeconds?: string;
  "livenessProbe.httpGet.path"?: string;
  "livenessProbe.httpGet.port"?: string;
  "livenessProbe.httpGet.scheme"?: string;
  "livenessProbe.initialDelaySeconds"?: string;
  "livenessProbe.periodSeconds"?: string;
  "livenessProbe.timeoutSeconds"?: string;
  "livenessProbe.successThreshold"?: string;
  "livenessProbe.failureThreshold"?: string;
  "readinessProbe.httpGet.path"?: string;
  "readinessProbe.httpGet.port"?: string;
  "readinessProbe.httpGet.scheme"?: string;
  "readinessProbe.initialDelaySeconds"?: string;
  "readinessProbe.periodSeconds"?: string;
  "readinessProbe.timeoutSeconds"?: string;
  "readinessProbe.successThreshold"?: string;
  "readinessProbe.failureThreshold"?: string;
  tolerations?: string;
  extraVolumes?: string;
  extraVolumeMounts?: string;
  extraObjects?: string;
  "metrics.enabled"?: string;
  "metrics.scrapeInterval"?: string;
  "metrics.scrapeTimeout"?: string;
  "metrics.service.type"?: string;
  "metrics.service.nodePort"?: string;
  "metrics.service.externalTrafficPolicy"?: string;
  "metrics.service.internalTrafficPolicy"?: string;
  "metrics.service.ipFamilyPolicy"?: string;
  "metrics.service.ipFamilies"?: string;
  "metrics.podAnnotations.prometheus.io/scrape"?: string;
  "metrics.podAnnotations.prometheus.io/port"?: string;
  "metrics.podAnnotations.prometheus.io/path"?: string;
  "metrics.serviceMonitor.autodetect"?: string;
  "metrics.serviceMonitor.enabled"?: string;
  "metrics.nodeAgentPodMonitor.autodetect"?: string;
  "metrics.nodeAgentPodMonitor.enabled"?: string;
  "metrics.prometheusRule.autodetect"?: string;
  "metrics.prometheusRule.enabled"?: string;
  "metrics.prometheusRule.spec"?: string;
  "kubectl.image.repository"?: string;
  "kubectl.extraVolumes"?: string;
  "kubectl.extraVolumeMounts"?: string;
  upgradeCRDs?: string;
  cleanUpCRDs?: string;
  "configuration.backupStorageLocation"?: string;
  "configuration.volumeSnapshotLocation"?: string;
  "configuration.uploaderType"?: string;
  "configuration.backupSyncPeriod"?: string;
  "configuration.fsBackupTimeout"?: string;
  "configuration.clientBurst"?: string;
  "configuration.clientPageSize"?: string;
  "configuration.clientQPS"?: string;
  "configuration.defaultBackupStorageLocation"?: string;
  "configuration.defaultItemOperationTimeout"?: string;
  "configuration.defaultBackupTTL"?: string;
  "configuration.defaultVolumeSnapshotLocations"?: string;
  "configuration.disableControllers"?: string;
  "configuration.disableInformerCache"?: string;
  "configuration.garbageCollectionFrequency"?: string;
  "configuration.itemBlockWorkerCount"?: string;
  "configuration.logFormat"?: string;
  "configuration.logLevel"?: string;
  "configuration.metricsAddress"?: string;
  "configuration.pluginDir"?: string;
  "configuration.profilerAddress"?: string;
  "configuration.restoreOnlyMode"?: string;
  "configuration.restoreResourcePriorities"?: string;
  "configuration.storeValidationFrequency"?: string;
  "configuration.terminatingResourceTimeout"?: string;
  "configuration.defaultSnapshotMoveData"?: string;
  "configuration.features"?: string;
  "configuration.dataMoverPrepareTimeout"?: string;
  "configuration.repositoryMaintenanceJob.requests"?: string;
  "configuration.repositoryMaintenanceJob.limits"?: string;
  "configuration.repositoryMaintenanceJob.latestJobsCount"?: string;
  "configuration.repositoryMaintenanceJob.repositoryConfigData.name"?: string;
  "configuration.namespace"?: string;
  "configuration.extraArgs"?: string;
  "configuration.extraEnvVars"?: string;
  "configuration.defaultVolumesToFsBackup"?: string;
  "configuration.defaultRepoMaintainFrequency"?: string;
  "rbac.create"?: string;
  "rbac.clusterAdministrator"?: string;
  "rbac.clusterAdministratorName"?: string;
  "serviceAccount.server.create"?: string;
  "serviceAccount.server.name"?: string;
  "serviceAccount.server.annotations"?: string;
  "serviceAccount.server.labels"?: string;
  "serviceAccount.server.imagePullSecrets"?: string;
  "serviceAccount.server.automountServiceAccountToken"?: string;
  "credentials.useSecret"?: string;
  "credentials.name"?: string;
  "credentials.existingSecret"?: string;
  "credentials.extraSecretRef"?: string;
  backupsEnabled?: string;
  snapshotsEnabled?: string;
  deployNodeAgent?: string;
  "nodeAgent.podVolumePath"?: string;
  "nodeAgent.pluginVolumePath"?: string;
  "nodeAgent.priorityClassName"?: string;
  "nodeAgent.runtimeClassName"?: string;
  "nodeAgent.tolerations"?: string;
  "nodeAgent.useScratchEmptyDir"?: string;
  "nodeAgent.extraVolumes"?: string;
  "nodeAgent.extraVolumeMounts"?: string;
  "nodeAgent.extraEnvVars"?: string;
  "nodeAgent.extraArgs"?: string;
  "nodeAgent.dnsPolicy"?: string;
  "nodeAgent.hostAliases"?: string;
  "nodeAgent.podSecurityContext.runAsUser"?: string;
};
