// Generated TypeScript types for node-feature-discovery Helm chart

export type NodefeaturediscoveryHelmValuesImage = {
  repository?: string;
  pullPolicy?: string;
};

export type NodefeaturediscoveryHelmValuesFeatureGates = {
  NodeFeatureGroupAPI?: boolean;
};

export type NodefeaturediscoveryHelmValuesMaster = {
  enable?: boolean;
  extraArgs?: unknown[];
  extraEnvs?: unknown[];
  hostNetwork?: boolean;
  config?: unknown;
  metricsPort?: number;
  healthPort?: number;
  instance?: unknown;
  featureApi?: unknown;
  resyncPeriod?: unknown;
  denyLabelNs?: unknown[];
  extraLabelNs?: unknown[];
  enableTaints?: boolean;
  featureRulesController?: unknown;
  nfdApiParallelism?: unknown;
  deploymentAnnotations?: NodefeaturediscoveryHelmValuesMasterDeploymentAnnotations;
  replicaCount?: number;
  podSecurityContext?: NodefeaturediscoveryHelmValuesMasterPodSecurityContext;
  securityContext?: NodefeaturediscoveryHelmValuesMasterSecurityContext;
  serviceAccount?: NodefeaturediscoveryHelmValuesMasterServiceAccount;
  revisionHistoryLimit?: unknown;
  rbac?: NodefeaturediscoveryHelmValuesMasterRbac;
  resources?: NodefeaturediscoveryHelmValuesMasterResources;
  nodeSelector?: NodefeaturediscoveryHelmValuesMasterNodeSelector;
  tolerations?: NodefeaturediscoveryHelmValuesMasterTolerations[];
  annotations?: NodefeaturediscoveryHelmValuesMasterAnnotations;
  affinity?: NodefeaturediscoveryHelmValuesMasterAffinity;
  startupProbe?: NodefeaturediscoveryHelmValuesMasterStartupProbe;
  livenessProbe?: NodefeaturediscoveryHelmValuesMasterLivenessProbe;
  readinessProbe?: NodefeaturediscoveryHelmValuesMasterReadinessProbe;
};

export type NodefeaturediscoveryHelmValuesMasterDeploymentAnnotations = object;

export type NodefeaturediscoveryHelmValuesMasterPodSecurityContext = object;

export type NodefeaturediscoveryHelmValuesMasterSecurityContext = {
  allowPrivilegeEscalation?: boolean;
  capabilities?: NodefeaturediscoveryHelmValuesMasterSecurityContextCapabilities;
  readOnlyRootFilesystem?: boolean;
  runAsNonRoot?: boolean;
};

export type NodefeaturediscoveryHelmValuesMasterSecurityContextCapabilities = {
  drop?: string[];
};

export type NodefeaturediscoveryHelmValuesMasterServiceAccount = {
  create?: boolean;
  annotations?: NodefeaturediscoveryHelmValuesMasterServiceAccountAnnotations;
  name?: unknown;
};

export type NodefeaturediscoveryHelmValuesMasterServiceAccountAnnotations =
  object;

export type NodefeaturediscoveryHelmValuesMasterRbac = {
  create?: boolean;
};

export type NodefeaturediscoveryHelmValuesMasterResources = {
  limits?: NodefeaturediscoveryHelmValuesMasterResourcesLimits;
  requests?: NodefeaturediscoveryHelmValuesMasterResourcesRequests;
};

export type NodefeaturediscoveryHelmValuesMasterResourcesLimits = {
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesMasterResourcesRequests = {
  cpu?: string;
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesMasterNodeSelector = object;

export type NodefeaturediscoveryHelmValuesMasterAnnotations = object;

export type NodefeaturediscoveryHelmValuesMasterAffinity = {
  nodeAffinity?: NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinity;
};

export type NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinity = {
  preferredDuringSchedulingIgnoredDuringExecution?: NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecution[];
};

export type NodefeaturediscoveryHelmValuesMasterStartupProbe = {
  grpc?: NodefeaturediscoveryHelmValuesMasterStartupProbeGrpc;
  failureThreshold?: number;
};

export type NodefeaturediscoveryHelmValuesMasterStartupProbeGrpc = {
  port?: number;
};

export type NodefeaturediscoveryHelmValuesMasterLivenessProbe = {
  grpc?: NodefeaturediscoveryHelmValuesMasterLivenessProbeGrpc;
};

export type NodefeaturediscoveryHelmValuesMasterLivenessProbeGrpc = {
  port?: number;
};

export type NodefeaturediscoveryHelmValuesMasterReadinessProbe = {
  grpc?: NodefeaturediscoveryHelmValuesMasterReadinessProbeGrpc;
  failureThreshold?: number;
};

export type NodefeaturediscoveryHelmValuesMasterReadinessProbeGrpc = {
  port?: number;
};

export type NodefeaturediscoveryHelmValuesWorker = {
  enable?: boolean;
  extraArgs?: unknown[];
  extraEnvs?: unknown[];
  hostNetwork?: boolean;
  config?: unknown;
  metricsPort?: number;
  healthPort?: number;
  daemonsetAnnotations?: NodefeaturediscoveryHelmValuesWorkerDaemonsetAnnotations;
  podSecurityContext?: NodefeaturediscoveryHelmValuesWorkerPodSecurityContext;
  securityContext?: NodefeaturediscoveryHelmValuesWorkerSecurityContext;
  livenessProbe?: NodefeaturediscoveryHelmValuesWorkerLivenessProbe;
  readinessProbe?: NodefeaturediscoveryHelmValuesWorkerReadinessProbe;
  serviceAccount?: NodefeaturediscoveryHelmValuesWorkerServiceAccount;
  revisionHistoryLimit?: unknown;
  rbac?: NodefeaturediscoveryHelmValuesWorkerRbac;
  mountUsrSrc?: boolean;
  resources?: NodefeaturediscoveryHelmValuesWorkerResources;
  nodeSelector?: NodefeaturediscoveryHelmValuesWorkerNodeSelector;
  tolerations?: unknown[];
  annotations?: NodefeaturediscoveryHelmValuesWorkerAnnotations;
  affinity?: NodefeaturediscoveryHelmValuesWorkerAffinity;
  priorityClassName?: string;
};

export type NodefeaturediscoveryHelmValuesWorkerDaemonsetAnnotations = object;

export type NodefeaturediscoveryHelmValuesWorkerPodSecurityContext = object;

export type NodefeaturediscoveryHelmValuesWorkerSecurityContext = {
  allowPrivilegeEscalation?: boolean;
  capabilities?: NodefeaturediscoveryHelmValuesWorkerSecurityContextCapabilities;
  readOnlyRootFilesystem?: boolean;
  runAsNonRoot?: boolean;
};

export type NodefeaturediscoveryHelmValuesWorkerSecurityContextCapabilities = {
  drop?: string[];
};

export type NodefeaturediscoveryHelmValuesWorkerLivenessProbe = {
  grpc?: NodefeaturediscoveryHelmValuesWorkerLivenessProbeGrpc;
  initialDelaySeconds?: number;
};

export type NodefeaturediscoveryHelmValuesWorkerLivenessProbeGrpc = {
  port?: number;
};

export type NodefeaturediscoveryHelmValuesWorkerReadinessProbe = {
  grpc?: NodefeaturediscoveryHelmValuesWorkerReadinessProbeGrpc;
  initialDelaySeconds?: number;
  failureThreshold?: number;
};

export type NodefeaturediscoveryHelmValuesWorkerReadinessProbeGrpc = {
  port?: number;
};

export type NodefeaturediscoveryHelmValuesWorkerServiceAccount = {
  create?: boolean;
  annotations?: NodefeaturediscoveryHelmValuesWorkerServiceAccountAnnotations;
  name?: unknown;
};

export type NodefeaturediscoveryHelmValuesWorkerServiceAccountAnnotations =
  object;

export type NodefeaturediscoveryHelmValuesWorkerRbac = {
  create?: boolean;
};

export type NodefeaturediscoveryHelmValuesWorkerResources = {
  limits?: NodefeaturediscoveryHelmValuesWorkerResourcesLimits;
  requests?: NodefeaturediscoveryHelmValuesWorkerResourcesRequests;
};

export type NodefeaturediscoveryHelmValuesWorkerResourcesLimits = {
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesWorkerResourcesRequests = {
  cpu?: string;
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesWorkerNodeSelector = object;

export type NodefeaturediscoveryHelmValuesWorkerAnnotations = object;

export type NodefeaturediscoveryHelmValuesWorkerAffinity = object;

export type NodefeaturediscoveryHelmValuesTopologyUpdater = {
  config?: unknown;
  enable?: boolean;
  createCRDs?: boolean;
  extraArgs?: unknown[];
  extraEnvs?: unknown[];
  hostNetwork?: boolean;
  serviceAccount?: NodefeaturediscoveryHelmValuesTopologyUpdaterServiceAccount;
  revisionHistoryLimit?: unknown;
  rbac?: NodefeaturediscoveryHelmValuesTopologyUpdaterRbac;
  metricsPort?: number;
  healthPort?: number;
  kubeletConfigPath?: unknown;
  kubeletPodResourcesSockPath?: unknown;
  updateInterval?: string;
  watchNamespace?: string;
  kubeletStateDir?: string;
  podSecurityContext?: NodefeaturediscoveryHelmValuesTopologyUpdaterPodSecurityContext;
  securityContext?: NodefeaturediscoveryHelmValuesTopologyUpdaterSecurityContext;
  livenessProbe?: NodefeaturediscoveryHelmValuesTopologyUpdaterLivenessProbe;
  readinessProbe?: NodefeaturediscoveryHelmValuesTopologyUpdaterReadinessProbe;
  resources?: NodefeaturediscoveryHelmValuesTopologyUpdaterResources;
  nodeSelector?: NodefeaturediscoveryHelmValuesTopologyUpdaterNodeSelector;
  tolerations?: unknown[];
  annotations?: NodefeaturediscoveryHelmValuesTopologyUpdaterAnnotations;
  daemonsetAnnotations?: NodefeaturediscoveryHelmValuesTopologyUpdaterDaemonsetAnnotations;
  affinity?: NodefeaturediscoveryHelmValuesTopologyUpdaterAffinity;
  podSetFingerprint?: boolean;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterServiceAccount = {
  create?: boolean;
  annotations?: NodefeaturediscoveryHelmValuesTopologyUpdaterServiceAccountAnnotations;
  name?: unknown;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterServiceAccountAnnotations =
  object;

export type NodefeaturediscoveryHelmValuesTopologyUpdaterRbac = {
  create?: boolean;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterPodSecurityContext =
  object;

export type NodefeaturediscoveryHelmValuesTopologyUpdaterSecurityContext = {
  allowPrivilegeEscalation?: boolean;
  capabilities?: NodefeaturediscoveryHelmValuesTopologyUpdaterSecurityContextCapabilities;
  readOnlyRootFilesystem?: boolean;
  runAsUser?: number;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type NodefeaturediscoveryHelmValuesTopologyUpdaterLivenessProbe = {
  grpc?: NodefeaturediscoveryHelmValuesTopologyUpdaterLivenessProbeGrpc;
  initialDelaySeconds?: number;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterLivenessProbeGrpc = {
  port?: number;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterReadinessProbe = {
  grpc?: NodefeaturediscoveryHelmValuesTopologyUpdaterReadinessProbeGrpc;
  initialDelaySeconds?: number;
  failureThreshold?: number;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterReadinessProbeGrpc = {
  port?: number;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterResources = {
  limits?: NodefeaturediscoveryHelmValuesTopologyUpdaterResourcesLimits;
  requests?: NodefeaturediscoveryHelmValuesTopologyUpdaterResourcesRequests;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterResourcesLimits = {
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterResourcesRequests = {
  cpu?: string;
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterNodeSelector = object;

export type NodefeaturediscoveryHelmValuesTopologyUpdaterAnnotations = object;

export type NodefeaturediscoveryHelmValuesTopologyUpdaterDaemonsetAnnotations =
  object;

export type NodefeaturediscoveryHelmValuesTopologyUpdaterAffinity = object;

export type NodefeaturediscoveryHelmValuesGc = {
  enable?: boolean;
  extraArgs?: unknown[];
  extraEnvs?: unknown[];
  hostNetwork?: boolean;
  replicaCount?: number;
  serviceAccount?: NodefeaturediscoveryHelmValuesGcServiceAccount;
  rbac?: NodefeaturediscoveryHelmValuesGcRbac;
  interval?: string;
  podSecurityContext?: NodefeaturediscoveryHelmValuesGcPodSecurityContext;
  resources?: NodefeaturediscoveryHelmValuesGcResources;
  metricsPort?: number;
  nodeSelector?: NodefeaturediscoveryHelmValuesGcNodeSelector;
  tolerations?: unknown[];
  annotations?: NodefeaturediscoveryHelmValuesGcAnnotations;
  deploymentAnnotations?: NodefeaturediscoveryHelmValuesGcDeploymentAnnotations;
  affinity?: NodefeaturediscoveryHelmValuesGcAffinity;
  revisionHistoryLimit?: unknown;
};

export type NodefeaturediscoveryHelmValuesGcServiceAccount = {
  create?: boolean;
  annotations?: NodefeaturediscoveryHelmValuesGcServiceAccountAnnotations;
  name?: unknown;
};

export type NodefeaturediscoveryHelmValuesGcServiceAccountAnnotations = object;

export type NodefeaturediscoveryHelmValuesGcRbac = {
  create?: boolean;
};

export type NodefeaturediscoveryHelmValuesGcPodSecurityContext = object;

export type NodefeaturediscoveryHelmValuesGcResources = {
  limits?: NodefeaturediscoveryHelmValuesGcResourcesLimits;
  requests?: NodefeaturediscoveryHelmValuesGcResourcesRequests;
};

export type NodefeaturediscoveryHelmValuesGcResourcesLimits = {
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesGcResourcesRequests = {
  cpu?: string;
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesGcNodeSelector = object;

export type NodefeaturediscoveryHelmValuesGcAnnotations = object;

export type NodefeaturediscoveryHelmValuesGcDeploymentAnnotations = object;

export type NodefeaturediscoveryHelmValuesGcAffinity = object;

export type NodefeaturediscoveryHelmValuesPrometheus = {
  enable?: boolean;
  scrapeInterval?: string;
  labels?: NodefeaturediscoveryHelmValuesPrometheusLabels;
};

export type NodefeaturediscoveryHelmValuesPrometheusLabels = object;

export type NodefeaturediscoveryHelmValues = {
  image?: NodefeaturediscoveryHelmValuesImage;
  imagePullSecrets?: unknown[];
  nameOverride?: string;
  fullnameOverride?: string;
  namespaceOverride?: string;
  featureGates?: NodefeaturediscoveryHelmValuesFeatureGates;
  priorityClassName?: string;
  master?: NodefeaturediscoveryHelmValuesMaster;
  worker?: NodefeaturediscoveryHelmValuesWorker;
  topologyUpdater?: NodefeaturediscoveryHelmValuesTopologyUpdater;
  gc?: NodefeaturediscoveryHelmValuesGc;
  prometheus?: NodefeaturediscoveryHelmValuesPrometheus;
};

export type NodefeaturediscoveryHelmParameters = {
  "image.repository"?: string;
  "image.pullPolicy"?: string;
  imagePullSecrets?: string;
  nameOverride?: string;
  fullnameOverride?: string;
  namespaceOverride?: string;
  "featureGates.NodeFeatureGroupAPI"?: string;
  priorityClassName?: string;
  "master.enable"?: string;
  "master.extraArgs"?: string;
  "master.extraEnvs"?: string;
  "master.hostNetwork"?: string;
  "master.config"?: string;
  "master.metricsPort"?: string;
  "master.healthPort"?: string;
  "master.instance"?: string;
  "master.featureApi"?: string;
  "master.resyncPeriod"?: string;
  "master.denyLabelNs"?: string;
  "master.extraLabelNs"?: string;
  "master.enableTaints"?: string;
  "master.featureRulesController"?: string;
  "master.nfdApiParallelism"?: string;
  "master.replicaCount"?: string;
  "master.securityContext.allowPrivilegeEscalation"?: string;
  "master.securityContext.capabilities.drop"?: string;
  "master.securityContext.readOnlyRootFilesystem"?: string;
  "master.securityContext.runAsNonRoot"?: string;
  "master.serviceAccount.create"?: string;
  "master.serviceAccount.name"?: string;
  "master.revisionHistoryLimit"?: string;
  "master.rbac.create"?: string;
  "master.resources.limits.memory"?: string;
  "master.resources.requests.cpu"?: string;
  "master.resources.requests.memory"?: string;
  "master.tolerations"?: string;
  "master.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution"?: string;
  "master.startupProbe.grpc.port"?: string;
  "master.startupProbe.failureThreshold"?: string;
  "master.livenessProbe.grpc.port"?: string;
  "master.readinessProbe.grpc.port"?: string;
  "master.readinessProbe.failureThreshold"?: string;
  "worker.enable"?: string;
  "worker.extraArgs"?: string;
  "worker.extraEnvs"?: string;
  "worker.hostNetwork"?: string;
  "worker.config"?: string;
  "worker.metricsPort"?: string;
  "worker.healthPort"?: string;
  "worker.securityContext.allowPrivilegeEscalation"?: string;
  "worker.securityContext.capabilities.drop"?: string;
  "worker.securityContext.readOnlyRootFilesystem"?: string;
  "worker.securityContext.runAsNonRoot"?: string;
  "worker.livenessProbe.grpc.port"?: string;
  "worker.livenessProbe.initialDelaySeconds"?: string;
  "worker.readinessProbe.grpc.port"?: string;
  "worker.readinessProbe.initialDelaySeconds"?: string;
  "worker.readinessProbe.failureThreshold"?: string;
  "worker.serviceAccount.create"?: string;
  "worker.serviceAccount.name"?: string;
  "worker.revisionHistoryLimit"?: string;
  "worker.rbac.create"?: string;
  "worker.mountUsrSrc"?: string;
  "worker.resources.limits.memory"?: string;
  "worker.resources.requests.cpu"?: string;
  "worker.resources.requests.memory"?: string;
  "worker.tolerations"?: string;
  "worker.priorityClassName"?: string;
  "topologyUpdater.config"?: string;
  "topologyUpdater.enable"?: string;
  "topologyUpdater.createCRDs"?: string;
  "topologyUpdater.extraArgs"?: string;
  "topologyUpdater.extraEnvs"?: string;
  "topologyUpdater.hostNetwork"?: string;
  "topologyUpdater.serviceAccount.create"?: string;
  "topologyUpdater.serviceAccount.name"?: string;
  "topologyUpdater.revisionHistoryLimit"?: string;
  "topologyUpdater.rbac.create"?: string;
  "topologyUpdater.metricsPort"?: string;
  "topologyUpdater.healthPort"?: string;
  "topologyUpdater.kubeletConfigPath"?: string;
  "topologyUpdater.kubeletPodResourcesSockPath"?: string;
  "topologyUpdater.updateInterval"?: string;
  "topologyUpdater.watchNamespace"?: string;
  "topologyUpdater.kubeletStateDir"?: string;
  "topologyUpdater.securityContext.allowPrivilegeEscalation"?: string;
  "topologyUpdater.securityContext.capabilities.drop"?: string;
  "topologyUpdater.securityContext.readOnlyRootFilesystem"?: string;
  "topologyUpdater.securityContext.runAsUser"?: string;
  "topologyUpdater.livenessProbe.grpc.port"?: string;
  "topologyUpdater.livenessProbe.initialDelaySeconds"?: string;
  "topologyUpdater.readinessProbe.grpc.port"?: string;
  "topologyUpdater.readinessProbe.initialDelaySeconds"?: string;
  "topologyUpdater.readinessProbe.failureThreshold"?: string;
  "topologyUpdater.resources.limits.memory"?: string;
  "topologyUpdater.resources.requests.cpu"?: string;
  "topologyUpdater.resources.requests.memory"?: string;
  "topologyUpdater.tolerations"?: string;
  "topologyUpdater.podSetFingerprint"?: string;
  "gc.enable"?: string;
  "gc.extraArgs"?: string;
  "gc.extraEnvs"?: string;
  "gc.hostNetwork"?: string;
  "gc.replicaCount"?: string;
  "gc.serviceAccount.create"?: string;
  "gc.serviceAccount.name"?: string;
  "gc.rbac.create"?: string;
  "gc.interval"?: string;
  "gc.resources.limits.memory"?: string;
  "gc.resources.requests.cpu"?: string;
  "gc.resources.requests.memory"?: string;
  "gc.metricsPort"?: string;
  "gc.tolerations"?: string;
  "gc.revisionHistoryLimit"?: string;
  "prometheus.enable"?: string;
  "prometheus.scrapeInterval"?: string;
};
