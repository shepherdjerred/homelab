// Generated TypeScript types for promtail Helm chart

export type PromtailHelmValuesGlobal = {
  imageRegistry?: string;
  imagePullSecrets?: unknown[];
};

export type PromtailHelmValuesDaemonset = {
  enabled?: boolean;
  autoscaling?: PromtailHelmValuesDaemonsetAutoscaling;
};

export type PromtailHelmValuesDaemonsetAutoscaling = {
  enabled?: boolean;
  controlledResources?: unknown[];
  maxAllowed?: PromtailHelmValuesDaemonsetAutoscalingMaxAllowed;
  minAllowed?: PromtailHelmValuesDaemonsetAutoscalingMinAllowed;
};

export type PromtailHelmValuesDaemonsetAutoscalingMaxAllowed = object;

export type PromtailHelmValuesDaemonsetAutoscalingMinAllowed = object;

export type PromtailHelmValuesDeployment = {
  enabled?: boolean;
  replicaCount?: number;
  autoscaling?: PromtailHelmValuesDeploymentAutoscaling;
  strategy?: PromtailHelmValuesDeploymentStrategy;
};

export type PromtailHelmValuesDeploymentAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
};

export type PromtailHelmValuesDeploymentStrategy = {
  type?: string;
};

export type PromtailHelmValuesService = {
  enabled?: boolean;
  labels?: PromtailHelmValuesServiceLabels;
  annotations?: PromtailHelmValuesServiceAnnotations;
};

export type PromtailHelmValuesServiceLabels = object;

export type PromtailHelmValuesServiceAnnotations = object;

export type PromtailHelmValuesSecret = {
  labels?: PromtailHelmValuesSecretLabels;
  annotations?: PromtailHelmValuesSecretAnnotations;
};

export type PromtailHelmValuesSecretLabels = object;

export type PromtailHelmValuesSecretAnnotations = object;

export type PromtailHelmValuesConfigmap = {
  enabled?: boolean;
};

export type PromtailHelmValuesImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  pullPolicy?: string;
};

export type PromtailHelmValuesAnnotations = object;

export type PromtailHelmValuesUpdateStrategy = object;

export type PromtailHelmValuesPodLabels = object;

export type PromtailHelmValuesPodAnnotations = object;

export type PromtailHelmValuesLivenessProbe = object;

export type PromtailHelmValuesReadinessProbe = {
  failureThreshold?: number;
  httpGet?: PromtailHelmValuesReadinessProbeHttpGet;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type PromtailHelmValuesReadinessProbeHttpGet = {
  path?: string;
  port?: string;
};

export type PromtailHelmValuesResources = object;

export type PromtailHelmValuesPodSecurityContext = {
  runAsUser?: number;
  runAsGroup?: number;
};

export type PromtailHelmValuesContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  capabilities?: PromtailHelmValuesContainerSecurityContextCapabilities;
  allowPrivilegeEscalation?: boolean;
};

export type PromtailHelmValuesContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type PromtailHelmValuesRbac = {
  create?: boolean;
  pspEnabled?: boolean;
};

export type PromtailHelmValuesServiceAccount = {
  create?: boolean;
  name?: unknown;
  imagePullSecrets?: unknown[];
  annotations?: PromtailHelmValuesServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type PromtailHelmValuesServiceAccountAnnotations = object;

export type PromtailHelmValuesNodeSelector = object;

export type PromtailHelmValuesAffinity = object;

export type PromtailHelmValuesTolerationsElement = {
  key?: string;
  operator?: string;
  effect?: string;
};

export type PromtailHelmValuesDefaultVolumesElement = {
  name?: string;
  hostPath?: PromtailHelmValuesDefaultVolumesHostPath;
};

export type PromtailHelmValuesDefaultVolumesHostPath = {
  path?: string;
};

export type PromtailHelmValuesDefaultVolumeMountsElement = {
  name?: string;
  mountPath?: string;
};

export type PromtailHelmValuesServiceMonitor = {
  enabled?: boolean;
  namespace?: unknown;
  namespaceSelector?: PromtailHelmValuesServiceMonitorNamespaceSelector;
  annotations?: PromtailHelmValuesServiceMonitorAnnotations;
  labels?: PromtailHelmValuesServiceMonitorLabels;
  interval?: unknown;
  scrapeTimeout?: unknown;
  relabelings?: unknown[];
  metricRelabelings?: unknown[];
  targetLabels?: unknown[];
  scheme?: string;
  tlsConfig?: unknown;
  prometheusRule?: PromtailHelmValuesServiceMonitorPrometheusRule;
};

export type PromtailHelmValuesServiceMonitorNamespaceSelector = object;

export type PromtailHelmValuesServiceMonitorAnnotations = object;

export type PromtailHelmValuesServiceMonitorLabels = object;

export type PromtailHelmValuesServiceMonitorPrometheusRule = {
  enabled?: boolean;
  additionalLabels?: PromtailHelmValuesServiceMonitorPrometheusRuleAdditionalLabels;
  rules?: unknown[];
};

export type PromtailHelmValuesServiceMonitorPrometheusRuleAdditionalLabels =
  object;

export type PromtailHelmValuesExtraContainers = object;

export type PromtailHelmValuesExtraPorts = object;

export type PromtailHelmValuesPodSecurityPolicy = {
  privileged?: boolean;
  allowPrivilegeEscalation?: boolean;
  volumes?: string[];
  hostNetwork?: boolean;
  hostIPC?: boolean;
  hostPID?: boolean;
  runAsUser?: PromtailHelmValuesPodSecurityPolicyRunAsUser;
  seLinux?: PromtailHelmValuesPodSecurityPolicySeLinux;
  supplementalGroups?: PromtailHelmValuesPodSecurityPolicySupplementalGroups;
  fsGroup?: PromtailHelmValuesPodSecurityPolicyFsGroup;
  readOnlyRootFilesystem?: boolean;
  requiredDropCapabilities?: string[];
};

export type PromtailHelmValuesPodSecurityPolicyRunAsUser = {
  rule?: string;
};

export type PromtailHelmValuesPodSecurityPolicySeLinux = {
  rule?: string;
};

export type PromtailHelmValuesPodSecurityPolicySupplementalGroups = {
  rule?: string;
};

export type PromtailHelmValuesPodSecurityPolicyFsGroup = {
  rule?: string;
};

export type PromtailHelmValuesConfig = {
  enabled?: boolean;
  logLevel?: string;
  logFormat?: string;
  serverPort?: number;
  clients?: PromtailHelmValuesConfigClientsElement[];
  positions?: PromtailHelmValuesConfigPositions;
  enableTracing?: boolean;
  snippets?: PromtailHelmValuesConfigSnippets;
  file?: string;
};

export type PromtailHelmValuesConfigClientsElement = {
  url?: string;
};

export type PromtailHelmValuesConfigPositions = {
  filename?: string;
};

export type PromtailHelmValuesConfigSnippets = {
  pipelineStages?: PromtailHelmValuesConfigSnippetsPipelineStagesElement[];
  common?: PromtailHelmValuesConfigSnippetsCommonElement[];
  addScrapeJobLabel?: boolean;
  extraLimitsConfig?: string;
  extraServerConfigs?: string;
  extraScrapeConfigs?: string;
  extraRelabelConfigs?: unknown[];
  scrapeConfigs?: string;
};

export type PromtailHelmValuesConfigSnippetsPipelineStagesElement = {
  cri?: PromtailHelmValuesConfigSnippetsPipelineStagesCri;
};

export type PromtailHelmValuesConfigSnippetsPipelineStagesCri = object;

export type PromtailHelmValuesConfigSnippetsCommonElement = {
  action?: string;
  source_labels?: string[];
  target_label?: string;
};

export type PromtailHelmValuesNetworkPolicy = {
  enabled?: boolean;
  metrics?: PromtailHelmValuesNetworkPolicyMetrics;
  k8sApi?: PromtailHelmValuesNetworkPolicyK8sApi;
};

export type PromtailHelmValuesNetworkPolicyMetrics = {
  podSelector?: PromtailHelmValuesNetworkPolicyMetricsPodSelector;
  namespaceSelector?: PromtailHelmValuesNetworkPolicyMetricsNamespaceSelector;
  cidrs?: unknown[];
};

export type PromtailHelmValuesNetworkPolicyMetricsPodSelector = object;

export type PromtailHelmValuesNetworkPolicyMetricsNamespaceSelector = object;

export type PromtailHelmValuesNetworkPolicyK8sApi = {
  port?: number;
  cidrs?: unknown[];
};

export type PromtailHelmValuesSidecar = {
  configReloader?: PromtailHelmValuesSidecarConfigReloader;
};

export type PromtailHelmValuesSidecarConfigReloader = {
  enabled?: boolean;
  image?: PromtailHelmValuesSidecarConfigReloaderImage;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  containerSecurityContext?: PromtailHelmValuesSidecarConfigReloaderContainerSecurityContext;
  readinessProbe?: PromtailHelmValuesSidecarConfigReloaderReadinessProbe;
  livenessProbe?: PromtailHelmValuesSidecarConfigReloaderLivenessProbe;
  resources?: PromtailHelmValuesSidecarConfigReloaderResources;
  config?: PromtailHelmValuesSidecarConfigReloaderConfig;
  serviceMonitor?: PromtailHelmValuesSidecarConfigReloaderServiceMonitor;
};

export type PromtailHelmValuesSidecarConfigReloaderImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  pullPolicy?: string;
};

export type PromtailHelmValuesSidecarConfigReloaderContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  capabilities?: PromtailHelmValuesSidecarConfigReloaderContainerSecurityContextCapabilities;
  allowPrivilegeEscalation?: boolean;
};

export type PromtailHelmValuesSidecarConfigReloaderContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type PromtailHelmValuesSidecarConfigReloaderReadinessProbe = object;

export type PromtailHelmValuesSidecarConfigReloaderLivenessProbe = object;

export type PromtailHelmValuesSidecarConfigReloaderResources = object;

export type PromtailHelmValuesSidecarConfigReloaderConfig = {
  serverPort?: number;
};

export type PromtailHelmValuesSidecarConfigReloaderServiceMonitor = {
  enabled?: boolean;
};

export type PromtailHelmValues = {
  nameOverride?: unknown;
  fullnameOverride?: unknown;
  global?: PromtailHelmValuesGlobal;
  daemonset?: PromtailHelmValuesDaemonset;
  deployment?: PromtailHelmValuesDeployment;
  service?: PromtailHelmValuesService;
  secret?: PromtailHelmValuesSecret;
  configmap?: PromtailHelmValuesConfigmap;
  initContainer?: unknown[];
  image?: PromtailHelmValuesImage;
  imagePullSecrets?: unknown[];
  hostAliases?: unknown[];
  hostNetwork?: unknown;
  annotations?: PromtailHelmValuesAnnotations;
  updateStrategy?: PromtailHelmValuesUpdateStrategy;
  podLabels?: PromtailHelmValuesPodLabels;
  podAnnotations?: PromtailHelmValuesPodAnnotations;
  priorityClassName?: unknown;
  livenessProbe?: PromtailHelmValuesLivenessProbe;
  readinessProbe?: PromtailHelmValuesReadinessProbe;
  resources?: PromtailHelmValuesResources;
  podSecurityContext?: PromtailHelmValuesPodSecurityContext;
  containerSecurityContext?: PromtailHelmValuesContainerSecurityContext;
  rbac?: PromtailHelmValuesRbac;
  namespace?: unknown;
  serviceAccount?: PromtailHelmValuesServiceAccount;
  automountServiceAccountToken?: boolean;
  nodeSelector?: PromtailHelmValuesNodeSelector;
  affinity?: PromtailHelmValuesAffinity;
  tolerations?: PromtailHelmValuesTolerationsElement[];
  defaultVolumes?: PromtailHelmValuesDefaultVolumesElement[];
  defaultVolumeMounts?: PromtailHelmValuesDefaultVolumeMountsElement[];
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  enableServiceLinks?: boolean;
  serviceMonitor?: PromtailHelmValuesServiceMonitor;
  extraContainers?: PromtailHelmValuesExtraContainers;
  extraPorts?: PromtailHelmValuesExtraPorts;
  podSecurityPolicy?: PromtailHelmValuesPodSecurityPolicy;
  config?: PromtailHelmValuesConfig;
  networkPolicy?: PromtailHelmValuesNetworkPolicy;
  httpPathPrefix?: string;
  sidecar?: PromtailHelmValuesSidecar;
  extraObjects?: unknown[];
};

export type PromtailHelmParameters = {
  nameOverride?: string;
  fullnameOverride?: string;
  "global.imageRegistry"?: string;
  "global.imagePullSecrets"?: string;
  "daemonset.enabled"?: string;
  "daemonset.autoscaling.enabled"?: string;
  "daemonset.autoscaling.controlledResources"?: string;
  "deployment.enabled"?: string;
  "deployment.replicaCount"?: string;
  "deployment.autoscaling.enabled"?: string;
  "deployment.autoscaling.minReplicas"?: string;
  "deployment.autoscaling.maxReplicas"?: string;
  "deployment.autoscaling.targetCPUUtilizationPercentage"?: string;
  "deployment.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "deployment.strategy.type"?: string;
  "service.enabled"?: string;
  "configmap.enabled"?: string;
  initContainer?: string;
  "image.registry"?: string;
  "image.repository"?: string;
  "image.tag"?: string;
  "image.pullPolicy"?: string;
  imagePullSecrets?: string;
  hostAliases?: string;
  hostNetwork?: string;
  priorityClassName?: string;
  "readinessProbe.failureThreshold"?: string;
  "readinessProbe.httpGet.path"?: string;
  "readinessProbe.httpGet.port"?: string;
  "readinessProbe.initialDelaySeconds"?: string;
  "readinessProbe.periodSeconds"?: string;
  "readinessProbe.successThreshold"?: string;
  "readinessProbe.timeoutSeconds"?: string;
  "podSecurityContext.runAsUser"?: string;
  "podSecurityContext.runAsGroup"?: string;
  "containerSecurityContext.readOnlyRootFilesystem"?: string;
  "containerSecurityContext.capabilities.drop"?: string;
  "containerSecurityContext.allowPrivilegeEscalation"?: string;
  "rbac.create"?: string;
  "rbac.pspEnabled"?: string;
  namespace?: string;
  "serviceAccount.create"?: string;
  "serviceAccount.name"?: string;
  "serviceAccount.imagePullSecrets"?: string;
  "serviceAccount.automountServiceAccountToken"?: string;
  automountServiceAccountToken?: string;
  "tolerations.key"?: string;
  "tolerations.operator"?: string;
  "tolerations.effect"?: string;
  "defaultVolumes.name"?: string;
  "defaultVolumes.hostPath.path"?: string;
  "defaultVolumeMounts.name"?: string;
  "defaultVolumeMounts.mountPath"?: string;
  extraVolumes?: string;
  extraVolumeMounts?: string;
  extraArgs?: string;
  extraEnv?: string;
  extraEnvFrom?: string;
  enableServiceLinks?: string;
  "serviceMonitor.enabled"?: string;
  "serviceMonitor.namespace"?: string;
  "serviceMonitor.interval"?: string;
  "serviceMonitor.scrapeTimeout"?: string;
  "serviceMonitor.relabelings"?: string;
  "serviceMonitor.metricRelabelings"?: string;
  "serviceMonitor.targetLabels"?: string;
  "serviceMonitor.scheme"?: string;
  "serviceMonitor.tlsConfig"?: string;
  "serviceMonitor.prometheusRule.enabled"?: string;
  "serviceMonitor.prometheusRule.rules"?: string;
  "podSecurityPolicy.privileged"?: string;
  "podSecurityPolicy.allowPrivilegeEscalation"?: string;
  "podSecurityPolicy.volumes"?: string;
  "podSecurityPolicy.hostNetwork"?: string;
  "podSecurityPolicy.hostIPC"?: string;
  "podSecurityPolicy.hostPID"?: string;
  "podSecurityPolicy.runAsUser.rule"?: string;
  "podSecurityPolicy.seLinux.rule"?: string;
  "podSecurityPolicy.supplementalGroups.rule"?: string;
  "podSecurityPolicy.fsGroup.rule"?: string;
  "podSecurityPolicy.readOnlyRootFilesystem"?: string;
  "podSecurityPolicy.requiredDropCapabilities"?: string;
  "config.enabled"?: string;
  "config.logLevel"?: string;
  "config.logFormat"?: string;
  "config.serverPort"?: string;
  "config.clients.url"?: string;
  "config.positions.filename"?: string;
  "config.enableTracing"?: string;
  "config.snippets.common.action"?: string;
  "config.snippets.common.source_labels"?: string;
  "config.snippets.common.target_label"?: string;
  "config.snippets.addScrapeJobLabel"?: string;
  "config.snippets.extraLimitsConfig"?: string;
  "config.snippets.extraServerConfigs"?: string;
  "config.snippets.extraScrapeConfigs"?: string;
  "config.snippets.extraRelabelConfigs"?: string;
  "config.snippets.scrapeConfigs"?: string;
  "config.file"?: string;
  "networkPolicy.enabled"?: string;
  "networkPolicy.metrics.cidrs"?: string;
  "networkPolicy.k8sApi.port"?: string;
  "networkPolicy.k8sApi.cidrs"?: string;
  httpPathPrefix?: string;
  "sidecar.configReloader.enabled"?: string;
  "sidecar.configReloader.image.registry"?: string;
  "sidecar.configReloader.image.repository"?: string;
  "sidecar.configReloader.image.tag"?: string;
  "sidecar.configReloader.image.pullPolicy"?: string;
  "sidecar.configReloader.extraArgs"?: string;
  "sidecar.configReloader.extraEnv"?: string;
  "sidecar.configReloader.extraEnvFrom"?: string;
  "sidecar.configReloader.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "sidecar.configReloader.containerSecurityContext.capabilities.drop"?: string;
  "sidecar.configReloader.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "sidecar.configReloader.config.serverPort"?: string;
  "sidecar.configReloader.serviceMonitor.enabled"?: string;
  extraObjects?: string;
};
