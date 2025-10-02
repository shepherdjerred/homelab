/* eslint-disable max-lines */
// Generated TypeScript types for kube-prometheus-stack Helm chart

export type KubeprometheusstackHelmValuesCommonLabels = object;

export type KubeprometheusstackHelmValuesCrds = {
  enabled?: boolean;
  upgradeJob?: KubeprometheusstackHelmValuesCrdsUpgradeJob;
};

export type KubeprometheusstackHelmValuesCrdsUpgradeJob = {
  enabled?: boolean;
  forceConflicts?: boolean;
  image?: KubeprometheusstackHelmValuesCrdsUpgradeJobImage;
  env?: KubeprometheusstackHelmValuesCrdsUpgradeJobEnv;
  resources?: KubeprometheusstackHelmValuesCrdsUpgradeJobResources;
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  nodeSelector?: KubeprometheusstackHelmValuesCrdsUpgradeJobNodeSelector;
  affinity?: KubeprometheusstackHelmValuesCrdsUpgradeJobAffinity;
  tolerations?: unknown[];
  topologySpreadConstraints?: unknown[];
  labels?: KubeprometheusstackHelmValuesCrdsUpgradeJobLabels;
  annotations?: KubeprometheusstackHelmValuesCrdsUpgradeJobAnnotations;
  podLabels?: KubeprometheusstackHelmValuesCrdsUpgradeJobPodLabels;
  podAnnotations?: KubeprometheusstackHelmValuesCrdsUpgradeJobPodAnnotations;
  serviceAccount?: KubeprometheusstackHelmValuesCrdsUpgradeJobServiceAccount;
  containerSecurityContext?: KubeprometheusstackHelmValuesCrdsUpgradeJobContainerSecurityContext;
  podSecurityContext?: KubeprometheusstackHelmValuesCrdsUpgradeJobPodSecurityContext;
};

export type KubeprometheusstackHelmValuesCrdsUpgradeJobImage = {
  busybox?: KubeprometheusstackHelmValuesCrdsUpgradeJobImageBusybox;
  kubectl?: KubeprometheusstackHelmValuesCrdsUpgradeJobImageKubectl;
};

export type KubeprometheusstackHelmValuesCrdsUpgradeJobImageBusybox = {
  registry?: string;
  repository?: string;
  tag?: string;
  sha?: string;
  pullPolicy?: string;
};

export type KubeprometheusstackHelmValuesCrdsUpgradeJobImageKubectl = {
  registry?: string;
  repository?: string;
  tag?: string;
  sha?: string;
  pullPolicy?: string;
};

export type KubeprometheusstackHelmValuesCrdsUpgradeJobEnv = object;

export type KubeprometheusstackHelmValuesCrdsUpgradeJobResources = object;

export type KubeprometheusstackHelmValuesCrdsUpgradeJobNodeSelector = object;

export type KubeprometheusstackHelmValuesCrdsUpgradeJobAffinity = object;

export type KubeprometheusstackHelmValuesCrdsUpgradeJobLabels = object;

export type KubeprometheusstackHelmValuesCrdsUpgradeJobAnnotations = object;

export type KubeprometheusstackHelmValuesCrdsUpgradeJobPodLabels = object;

export type KubeprometheusstackHelmValuesCrdsUpgradeJobPodAnnotations = object;

export type KubeprometheusstackHelmValuesCrdsUpgradeJobServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: KubeprometheusstackHelmValuesCrdsUpgradeJobServiceAccountAnnotations;
  labels?: KubeprometheusstackHelmValuesCrdsUpgradeJobServiceAccountLabels;
  automountServiceAccountToken?: boolean;
};

export type KubeprometheusstackHelmValuesCrdsUpgradeJobServiceAccountAnnotations =
  object;

export type KubeprometheusstackHelmValuesCrdsUpgradeJobServiceAccountLabels =
  object;

export type KubeprometheusstackHelmValuesCrdsUpgradeJobContainerSecurityContext =
  {
    allowPrivilegeEscalation?: boolean;
    readOnlyRootFilesystem?: boolean;
    capabilities?: KubeprometheusstackHelmValuesCrdsUpgradeJobContainerSecurityContextCapabilities;
  };

export type KubeprometheusstackHelmValuesCrdsUpgradeJobContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type KubeprometheusstackHelmValuesCrdsUpgradeJobPodSecurityContext = {
  fsGroup?: number;
  runAsGroup?: number;
  runAsNonRoot?: boolean;
  runAsUser?: number;
  seccompProfile?: KubeprometheusstackHelmValuesCrdsUpgradeJobPodSecurityContextSeccompProfile;
};

export type KubeprometheusstackHelmValuesCrdsUpgradeJobPodSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type KubeprometheusstackHelmValuesCustomRules = object;

export type KubeprometheusstackHelmValuesDefaultRules = {
  create?: boolean;
  rules?: KubeprometheusstackHelmValuesDefaultRulesRules;
  appNamespacesOperator?: string;
  appNamespacesTarget?: string;
  keepFiringFor?: string;
  labels?: KubeprometheusstackHelmValuesDefaultRulesLabels;
  annotations?: KubeprometheusstackHelmValuesDefaultRulesAnnotations;
  additionalRuleLabels?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleLabels;
  additionalRuleAnnotations?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleAnnotations;
  additionalRuleGroupLabels?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabels;
  additionalRuleGroupAnnotations?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotations;
  additionalAggregationLabels?: unknown[];
  runbookUrl?: string;
  node?: KubeprometheusstackHelmValuesDefaultRulesNode;
  disabled?: KubeprometheusstackHelmValuesDefaultRulesDisabled;
};

export type KubeprometheusstackHelmValuesDefaultRulesRules = {
  alertmanager?: boolean;
  etcd?: boolean;
  configReloaders?: boolean;
  general?: boolean;
  k8sContainerCpuUsageSecondsTotal?: boolean;
  k8sContainerMemoryCache?: boolean;
  k8sContainerMemoryRss?: boolean;
  k8sContainerMemorySwap?: boolean;
  k8sContainerResource?: boolean;
  k8sContainerMemoryWorkingSetBytes?: boolean;
  k8sPodOwner?: boolean;
  kubeApiserverAvailability?: boolean;
  kubeApiserverBurnrate?: boolean;
  kubeApiserverHistogram?: boolean;
  kubeApiserverSlos?: boolean;
  kubeControllerManager?: boolean;
  kubelet?: boolean;
  kubeProxy?: boolean;
  kubePrometheusGeneral?: boolean;
  kubePrometheusNodeRecording?: boolean;
  kubernetesApps?: boolean;
  kubernetesResources?: boolean;
  kubernetesStorage?: boolean;
  kubernetesSystem?: boolean;
  kubeSchedulerAlerting?: boolean;
  kubeSchedulerRecording?: boolean;
  kubeStateMetrics?: boolean;
  network?: boolean;
  node?: boolean;
  nodeExporterAlerting?: boolean;
  nodeExporterRecording?: boolean;
  prometheus?: boolean;
  prometheusOperator?: boolean;
  windows?: boolean;
};

export type KubeprometheusstackHelmValuesDefaultRulesLabels = object;

export type KubeprometheusstackHelmValuesDefaultRulesAnnotations = object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleLabels =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleAnnotations =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabels =
  {
    alertmanager?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsAlertmanager;
    etcd?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsEtcd;
    configReloaders?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsConfigReloaders;
    general?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsGeneral;
    k8sContainerCpuUsageSecondsTotal?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sContainerCpuUsageSecondsTotal;
    k8sContainerMemoryCache?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sContainerMemoryCache;
    k8sContainerMemoryRss?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sContainerMemoryRss;
    k8sContainerMemorySwap?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sContainerMemorySwap;
    k8sContainerResource?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sContainerResource;
    k8sPodOwner?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sPodOwner;
    kubeApiserverAvailability?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeApiserverAvailability;
    kubeApiserverBurnrate?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeApiserverBurnrate;
    kubeApiserverHistogram?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeApiserverHistogram;
    kubeApiserverSlos?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeApiserverSlos;
    kubeControllerManager?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeControllerManager;
    kubelet?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubelet;
    kubeProxy?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeProxy;
    kubePrometheusGeneral?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubePrometheusGeneral;
    kubePrometheusNodeRecording?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubePrometheusNodeRecording;
    kubernetesApps?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubernetesApps;
    kubernetesResources?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubernetesResources;
    kubernetesStorage?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubernetesStorage;
    kubernetesSystem?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubernetesSystem;
    kubeSchedulerAlerting?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeSchedulerAlerting;
    kubeSchedulerRecording?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeSchedulerRecording;
    kubeStateMetrics?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeStateMetrics;
    network?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsNetwork;
    node?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsNode;
    nodeExporterAlerting?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsNodeExporterAlerting;
    nodeExporterRecording?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsNodeExporterRecording;
    prometheus?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsPrometheus;
    prometheusOperator?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsPrometheusOperator;
  };

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsAlertmanager =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsEtcd =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsConfigReloaders =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsGeneral =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sContainerCpuUsageSecondsTotal =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sContainerMemoryCache =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sContainerMemoryRss =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sContainerMemorySwap =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sContainerResource =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsK8sPodOwner =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeApiserverAvailability =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeApiserverBurnrate =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeApiserverHistogram =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeApiserverSlos =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeControllerManager =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubelet =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeProxy =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubePrometheusGeneral =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubePrometheusNodeRecording =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubernetesApps =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubernetesResources =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubernetesStorage =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubernetesSystem =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeSchedulerAlerting =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeSchedulerRecording =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsKubeStateMetrics =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsNetwork =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsNode =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsNodeExporterAlerting =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsNodeExporterRecording =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsPrometheus =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupLabelsPrometheusOperator =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotations =
  {
    alertmanager?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsAlertmanager;
    etcd?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsEtcd;
    configReloaders?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsConfigReloaders;
    general?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsGeneral;
    k8sContainerCpuUsageSecondsTotal?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sContainerCpuUsageSecondsTotal;
    k8sContainerMemoryCache?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sContainerMemoryCache;
    k8sContainerMemoryRss?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sContainerMemoryRss;
    k8sContainerMemorySwap?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sContainerMemorySwap;
    k8sContainerResource?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sContainerResource;
    k8sPodOwner?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sPodOwner;
    kubeApiserverAvailability?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeApiserverAvailability;
    kubeApiserverBurnrate?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeApiserverBurnrate;
    kubeApiserverHistogram?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeApiserverHistogram;
    kubeApiserverSlos?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeApiserverSlos;
    kubeControllerManager?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeControllerManager;
    kubelet?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubelet;
    kubeProxy?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeProxy;
    kubePrometheusGeneral?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubePrometheusGeneral;
    kubePrometheusNodeRecording?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubePrometheusNodeRecording;
    kubernetesApps?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubernetesApps;
    kubernetesResources?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubernetesResources;
    kubernetesStorage?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubernetesStorage;
    kubernetesSystem?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubernetesSystem;
    kubeSchedulerAlerting?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeSchedulerAlerting;
    kubeSchedulerRecording?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeSchedulerRecording;
    kubeStateMetrics?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeStateMetrics;
    network?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsNetwork;
    node?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsNode;
    nodeExporterAlerting?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsNodeExporterAlerting;
    nodeExporterRecording?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsNodeExporterRecording;
    prometheus?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsPrometheus;
    prometheusOperator?: KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsPrometheusOperator;
  };

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsAlertmanager =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsEtcd =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsConfigReloaders =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsGeneral =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sContainerCpuUsageSecondsTotal =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sContainerMemoryCache =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sContainerMemoryRss =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sContainerMemorySwap =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sContainerResource =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsK8sPodOwner =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeApiserverAvailability =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeApiserverBurnrate =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeApiserverHistogram =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeApiserverSlos =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeControllerManager =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubelet =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeProxy =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubePrometheusGeneral =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubePrometheusNodeRecording =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubernetesApps =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubernetesResources =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubernetesStorage =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubernetesSystem =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeSchedulerAlerting =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeSchedulerRecording =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsKubeStateMetrics =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsNetwork =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsNode =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsNodeExporterAlerting =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsNodeExporterRecording =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsPrometheus =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesAdditionalRuleGroupAnnotationsPrometheusOperator =
  object;

export type KubeprometheusstackHelmValuesDefaultRulesNode = {
  fsSelector?: string;
};

export type KubeprometheusstackHelmValuesDefaultRulesDisabled = object;

export type KubeprometheusstackHelmValuesAdditionalPrometheusRulesMap = object;

export type KubeprometheusstackHelmValuesGlobal = {
  rbac?: KubeprometheusstackHelmValuesGlobalRbac;
  imageRegistry?: string;
  imagePullSecrets?: unknown[];
};

export type KubeprometheusstackHelmValuesGlobalRbac = {
  create?: boolean;
  createAggregateClusterRoles?: boolean;
};

export type KubeprometheusstackHelmValuesWindowsMonitoring = {
  enabled?: boolean;
};

export type KubeprometheusstackHelmValuesPrometheuswindowsexporter = {
  prometheus?: KubeprometheusstackHelmValuesPrometheuswindowsexporterPrometheus;
  releaseLabel?: boolean;
  podLabels?: KubeprometheusstackHelmValuesPrometheuswindowsexporterPodLabels;
  config?: string;
};

export type KubeprometheusstackHelmValuesPrometheuswindowsexporterPrometheus = {
  monitor?: KubeprometheusstackHelmValuesPrometheuswindowsexporterPrometheusMonitor;
};

export type KubeprometheusstackHelmValuesPrometheuswindowsexporterPrometheusMonitor =
  {
    enabled?: boolean;
    jobLabel?: string;
  };

export type KubeprometheusstackHelmValuesPrometheuswindowsexporterPodLabels = {
  jobLabel?: string;
};

export type KubeprometheusstackHelmValuesAlertmanager = {
  enabled?: boolean;
  namespaceOverride?: string;
  annotations?: KubeprometheusstackHelmValuesAlertmanagerAnnotations;
  additionalLabels?: KubeprometheusstackHelmValuesAlertmanagerAdditionalLabels;
  apiVersion?: string;
  enableFeatures?: unknown[];
  forceDeployDashboards?: boolean;
  networkPolicy?: KubeprometheusstackHelmValuesAlertmanagerNetworkPolicy;
  serviceAccount?: KubeprometheusstackHelmValuesAlertmanagerServiceAccount;
  podDisruptionBudget?: KubeprometheusstackHelmValuesAlertmanagerPodDisruptionBudget;
  config?: KubeprometheusstackHelmValuesAlertmanagerConfig;
  stringConfig?: string;
  tplConfig?: boolean;
  templateFiles?: KubeprometheusstackHelmValuesAlertmanagerTemplateFiles;
  ingress?: KubeprometheusstackHelmValuesAlertmanagerIngress;
  route?: KubeprometheusstackHelmValuesAlertmanagerRoute;
  secret?: KubeprometheusstackHelmValuesAlertmanagerSecret;
  ingressPerReplica?: KubeprometheusstackHelmValuesAlertmanagerIngressPerReplica;
  service?: KubeprometheusstackHelmValuesAlertmanagerService;
  servicePerReplica?: KubeprometheusstackHelmValuesAlertmanagerServicePerReplica;
  serviceMonitor?: KubeprometheusstackHelmValuesAlertmanagerServiceMonitor;
  alertmanagerSpec?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpec;
  extraSecret?: KubeprometheusstackHelmValuesAlertmanagerExtraSecret;
};

export type KubeprometheusstackHelmValuesAlertmanagerAnnotations = object;

export type KubeprometheusstackHelmValuesAlertmanagerAdditionalLabels = object;

export type KubeprometheusstackHelmValuesAlertmanagerNetworkPolicy = {
  enabled?: boolean;
  policyTypes?: string[];
  gateway?: KubeprometheusstackHelmValuesAlertmanagerNetworkPolicyGateway;
  additionalIngress?: unknown[];
  egress?: KubeprometheusstackHelmValuesAlertmanagerNetworkPolicyEgress;
  enableClusterRules?: boolean;
  monitoringRules?: KubeprometheusstackHelmValuesAlertmanagerNetworkPolicyMonitoringRules;
};

export type KubeprometheusstackHelmValuesAlertmanagerNetworkPolicyGateway = {
  namespace?: string;
  podLabels?: KubeprometheusstackHelmValuesAlertmanagerNetworkPolicyGatewayPodLabels;
};

export type KubeprometheusstackHelmValuesAlertmanagerNetworkPolicyGatewayPodLabels =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerNetworkPolicyEgress = {
  enabled?: boolean;
  rules?: unknown[];
};

export type KubeprometheusstackHelmValuesAlertmanagerNetworkPolicyMonitoringRules =
  {
    prometheus?: boolean;
    configReloader?: boolean;
  };

export type KubeprometheusstackHelmValuesAlertmanagerServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: KubeprometheusstackHelmValuesAlertmanagerServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type KubeprometheusstackHelmValuesAlertmanagerServiceAccountAnnotations =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerPodDisruptionBudget = {
  enabled?: boolean;
  minAvailable?: number;
  unhealthyPodEvictionPolicy?: string;
};

export type KubeprometheusstackHelmValuesAlertmanagerConfig = {
  global?: KubeprometheusstackHelmValuesAlertmanagerConfigGlobal;
  inhibit_rules?: KubeprometheusstackHelmValuesAlertmanagerConfigInhibitrulesElement[];
  route?: KubeprometheusstackHelmValuesAlertmanagerConfigRoute;
  receivers?: KubeprometheusstackHelmValuesAlertmanagerConfigReceiversElement[];
  templates?: string[];
};

export type KubeprometheusstackHelmValuesAlertmanagerConfigGlobal = {
  resolve_timeout?: string;
};

export type KubeprometheusstackHelmValuesAlertmanagerConfigInhibitrulesElement =
  {
    source_matchers?: string[];
    target_matchers?: string[];
    equal?: string[];
  };

export type KubeprometheusstackHelmValuesAlertmanagerConfigRoute = {
  group_by?: string[];
  group_wait?: string;
  group_interval?: string;
  repeat_interval?: string;
  receiver?: string;
  routes?: KubeprometheusstackHelmValuesAlertmanagerConfigRouteRoutesElement[];
};

export type KubeprometheusstackHelmValuesAlertmanagerConfigRouteRoutesElement =
  {
    receiver?: string;
    matchers?: string[];
  };

export type KubeprometheusstackHelmValuesAlertmanagerConfigReceiversElement = {
  name?: string;
  // manually added
  pagerduty_configs?: object[];
};

export type KubeprometheusstackHelmValuesAlertmanagerTemplateFiles = object;

export type KubeprometheusstackHelmValuesAlertmanagerIngress = {
  enabled?: boolean;
  ingressClassName?: string;
  annotations?: KubeprometheusstackHelmValuesAlertmanagerIngressAnnotations;
  labels?: KubeprometheusstackHelmValuesAlertmanagerIngressLabels;
  hosts?: unknown[];
  paths?: unknown[];
  tls?: unknown[];
};

export type KubeprometheusstackHelmValuesAlertmanagerIngressAnnotations =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerIngressLabels = object;

export type KubeprometheusstackHelmValuesAlertmanagerRoute = {
  main?: KubeprometheusstackHelmValuesAlertmanagerRouteMain;
};

export type KubeprometheusstackHelmValuesAlertmanagerRouteMain = {
  enabled?: boolean;
  apiVersion?: string;
  kind?: string;
  annotations?: KubeprometheusstackHelmValuesAlertmanagerRouteMainAnnotations;
  labels?: KubeprometheusstackHelmValuesAlertmanagerRouteMainLabels;
  hostnames?: unknown[];
  parentRefs?: unknown[];
  httpsRedirect?: boolean;
  matches?: KubeprometheusstackHelmValuesAlertmanagerRouteMainMatchesElement[];
  filters?: unknown[];
  additionalRules?: unknown[];
};

export type KubeprometheusstackHelmValuesAlertmanagerRouteMainAnnotations =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerRouteMainLabels = object;

export type KubeprometheusstackHelmValuesAlertmanagerRouteMainMatchesElement = {
  path?: KubeprometheusstackHelmValuesAlertmanagerRouteMainMatchesPath;
};

export type KubeprometheusstackHelmValuesAlertmanagerRouteMainMatchesPath = {
  type?: string;
  value?: string;
};

export type KubeprometheusstackHelmValuesAlertmanagerSecret = {
  annotations?: KubeprometheusstackHelmValuesAlertmanagerSecretAnnotations;
};

export type KubeprometheusstackHelmValuesAlertmanagerSecretAnnotations = object;

export type KubeprometheusstackHelmValuesAlertmanagerIngressPerReplica = {
  enabled?: boolean;
  ingressClassName?: string;
  annotations?: KubeprometheusstackHelmValuesAlertmanagerIngressPerReplicaAnnotations;
  labels?: KubeprometheusstackHelmValuesAlertmanagerIngressPerReplicaLabels;
  hostPrefix?: string;
  hostDomain?: string;
  paths?: unknown[];
  tlsSecretName?: string;
  tlsSecretPerReplica?: KubeprometheusstackHelmValuesAlertmanagerIngressPerReplicaTlsSecretPerReplica;
};

export type KubeprometheusstackHelmValuesAlertmanagerIngressPerReplicaAnnotations =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerIngressPerReplicaLabels =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerIngressPerReplicaTlsSecretPerReplica =
  {
    enabled?: boolean;
    prefix?: string;
  };

export type KubeprometheusstackHelmValuesAlertmanagerService = {
  enabled?: boolean;
  annotations?: KubeprometheusstackHelmValuesAlertmanagerServiceAnnotations;
  labels?: KubeprometheusstackHelmValuesAlertmanagerServiceLabels;
  clusterIP?: string;
  ipDualStack?: KubeprometheusstackHelmValuesAlertmanagerServiceIpDualStack;
  port?: number;
  targetPort?: number;
  nodePort?: number;
  additionalPorts?: unknown[];
  externalIPs?: unknown[];
  loadBalancerIP?: string;
  loadBalancerSourceRanges?: unknown[];
  externalTrafficPolicy?: string;
  sessionAffinity?: string;
  sessionAffinityConfig?: KubeprometheusstackHelmValuesAlertmanagerServiceSessionAffinityConfig;
  type?: string;
};

export type KubeprometheusstackHelmValuesAlertmanagerServiceAnnotations =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerServiceLabels = object;

export type KubeprometheusstackHelmValuesAlertmanagerServiceIpDualStack = {
  enabled?: boolean;
  ipFamilies?: string[];
  ipFamilyPolicy?: string;
};

export type KubeprometheusstackHelmValuesAlertmanagerServiceSessionAffinityConfig =
  {
    clientIP?: KubeprometheusstackHelmValuesAlertmanagerServiceSessionAffinityConfigClientIP;
  };

export type KubeprometheusstackHelmValuesAlertmanagerServiceSessionAffinityConfigClientIP =
  {
    timeoutSeconds?: number;
  };

export type KubeprometheusstackHelmValuesAlertmanagerServicePerReplica = {
  enabled?: boolean;
  annotations?: KubeprometheusstackHelmValuesAlertmanagerServicePerReplicaAnnotations;
  port?: number;
  targetPort?: number;
  nodePort?: number;
  loadBalancerSourceRanges?: unknown[];
  externalTrafficPolicy?: string;
  type?: string;
};

export type KubeprometheusstackHelmValuesAlertmanagerServicePerReplicaAnnotations =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerServiceMonitor = {
  selfMonitor?: boolean;
  interval?: string;
  additionalLabels?: KubeprometheusstackHelmValuesAlertmanagerServiceMonitorAdditionalLabels;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  proxyUrl?: string;
  scheme?: string;
  enableHttp2?: boolean;
  tlsConfig?: KubeprometheusstackHelmValuesAlertmanagerServiceMonitorTlsConfig;
  bearerTokenFile?: unknown;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
  additionalEndpoints?: unknown[];
};

export type KubeprometheusstackHelmValuesAlertmanagerServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerServiceMonitorTlsConfig =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpec = {
  persistentVolumeClaimRetentionPolicy?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecPersistentVolumeClaimRetentionPolicy;
  podMetadata?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecPodMetadata;
  serviceName?: unknown;
  image?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecImage;
  useExistingSecret?: boolean;
  secrets?: unknown[];
  automountServiceAccountToken?: boolean;
  configMaps?: unknown[];
  web?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecWeb;
  alertmanagerConfigSelector?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAlertmanagerConfigSelector;
  alertmanagerConfigNamespaceSelector?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAlertmanagerConfigNamespaceSelector;
  alertmanagerConfiguration?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAlertmanagerConfiguration;
  alertmanagerConfigMatcherStrategy?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAlertmanagerConfigMatcherStrategy;
  additionalArgs?: unknown[];
  logFormat?: string;
  logLevel?: string;
  replicas?: number;
  retention?: string;
  storage?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecStorage;
  externalUrl?: unknown;
  routePrefix?: string;
  scheme?: string;
  tlsConfig?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecTlsConfig;
  paused?: boolean;
  nodeSelector?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecNodeSelector;
  resources?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecResources;
  podAntiAffinity?: string;
  podAntiAffinityTopologyKey?: string;
  affinity?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAffinity;
  tolerations?: unknown[];
  topologySpreadConstraints?: unknown[];
  securityContext?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecSecurityContext;
  dnsConfig?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecDnsConfig;
  dnsPolicy?: string;
  listenLocal?: boolean;
  containers?: unknown[];
  volumes?: unknown[];
  volumeMounts?: unknown[];
  initContainers?: unknown[];
  priorityClassName?: string;
  additionalPeers?: unknown[];
  portName?: string;
  clusterAdvertiseAddress?: boolean;
  clusterGossipInterval?: string;
  clusterPeerTimeout?: string;
  clusterPushpullInterval?: string;
  clusterLabel?: string;
  forceEnableClusterMode?: boolean;
  minReadySeconds?: number;
  additionalConfig?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAdditionalConfig;
  additionalConfigString?: string;
};

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecPersistentVolumeClaimRetentionPolicy =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecPodMetadata =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  sha?: string;
  pullPolicy?: string;
};

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecWeb =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAlertmanagerConfigSelector =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAlertmanagerConfigNamespaceSelector =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAlertmanagerConfiguration =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAlertmanagerConfigMatcherStrategy =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecStorage =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecTlsConfig =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecNodeSelector =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecResources =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAffinity =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecSecurityContext =
  {
    runAsGroup?: number;
    runAsNonRoot?: boolean;
    runAsUser?: number;
    fsGroup?: number;
    seccompProfile?: KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecSecurityContextSeccompProfile;
  };

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecDnsConfig =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerAlertmanagerSpecAdditionalConfig =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerExtraSecret = {
  annotations?: KubeprometheusstackHelmValuesAlertmanagerExtraSecretAnnotations;
  data?: KubeprometheusstackHelmValuesAlertmanagerExtraSecretData;
};

export type KubeprometheusstackHelmValuesAlertmanagerExtraSecretAnnotations =
  object;

export type KubeprometheusstackHelmValuesAlertmanagerExtraSecretData = object;

export type KubeprometheusstackHelmValuesGrafana = {
  enabled?: boolean;
  namespaceOverride?: string;
  forceDeployDatasources?: boolean;
  forceDeployDashboards?: boolean;
  defaultDashboardsEnabled?: boolean;
  operator?: KubeprometheusstackHelmValuesGrafanaOperator;
  defaultDashboardsTimezone?: string;
  defaultDashboardsEditable?: boolean;
  defaultDashboardsInterval?: string;
  adminUser?: string;
  adminPassword?: string;
  rbac?: KubeprometheusstackHelmValuesGrafanaRbac;
  ingress?: KubeprometheusstackHelmValuesGrafanaIngress;
  serviceAccount?: KubeprometheusstackHelmValuesGrafanaServiceAccount;
  sidecar?: KubeprometheusstackHelmValuesGrafanaSidecar;
  extraConfigmapMounts?: unknown[];
  deleteDatasources?: unknown[];
  additionalDataSources?: unknown[];
  prune?: boolean;
  service?: KubeprometheusstackHelmValuesGrafanaService;
  serviceMonitor?: KubeprometheusstackHelmValuesGrafanaServiceMonitor;
  // manually added
  "grafana.ini"?: object;
  imageRenderer?: object;
  extraSecretMounts?: object[];
  persistence?: object;
};

export type KubeprometheusstackHelmValuesGrafanaOperator = {
  dashboardsConfigMapRefEnabled?: boolean;
  annotations?: KubeprometheusstackHelmValuesGrafanaOperatorAnnotations;
  matchLabels?: KubeprometheusstackHelmValuesGrafanaOperatorMatchLabels;
  resyncPeriod?: string;
  folder?: string;
};

export type KubeprometheusstackHelmValuesGrafanaOperatorAnnotations = object;

export type KubeprometheusstackHelmValuesGrafanaOperatorMatchLabels = object;

export type KubeprometheusstackHelmValuesGrafanaRbac = {
  pspEnabled?: boolean;
};

export type KubeprometheusstackHelmValuesGrafanaIngress = {
  enabled?: boolean;
  annotations?: KubeprometheusstackHelmValuesGrafanaIngressAnnotations;
  labels?: KubeprometheusstackHelmValuesGrafanaIngressLabels;
  hosts?: unknown[];
  path?: string;
  tls?: unknown[];
};

export type KubeprometheusstackHelmValuesGrafanaIngressAnnotations = object;

export type KubeprometheusstackHelmValuesGrafanaIngressLabels = object;

export type KubeprometheusstackHelmValuesGrafanaServiceAccount = {
  create?: boolean;
  autoMount?: boolean;
};

export type KubeprometheusstackHelmValuesGrafanaSidecar = {
  dashboards?: KubeprometheusstackHelmValuesGrafanaSidecarDashboards;
  datasources?: KubeprometheusstackHelmValuesGrafanaSidecarDatasources;
};

export type KubeprometheusstackHelmValuesGrafanaSidecarDashboards = {
  enabled?: boolean;
  label?: string;
  labelValue?: string;
  searchNamespace?: string;
  enableNewTablePanelSyntax?: boolean;
  annotations?: KubeprometheusstackHelmValuesGrafanaSidecarDashboardsAnnotations;
  multicluster?: KubeprometheusstackHelmValuesGrafanaSidecarDashboardsMulticluster;
  provider?: KubeprometheusstackHelmValuesGrafanaSidecarDashboardsProvider;
};

export type KubeprometheusstackHelmValuesGrafanaSidecarDashboardsAnnotations =
  object;

export type KubeprometheusstackHelmValuesGrafanaSidecarDashboardsMulticluster =
  {
    global?: KubeprometheusstackHelmValuesGrafanaSidecarDashboardsMulticlusterGlobal;
    etcd?: KubeprometheusstackHelmValuesGrafanaSidecarDashboardsMulticlusterEtcd;
  };

export type KubeprometheusstackHelmValuesGrafanaSidecarDashboardsMulticlusterGlobal =
  {
    enabled?: boolean;
  };

export type KubeprometheusstackHelmValuesGrafanaSidecarDashboardsMulticlusterEtcd =
  {
    enabled?: boolean;
  };

export type KubeprometheusstackHelmValuesGrafanaSidecarDashboardsProvider = {
  allowUiUpdates?: boolean;
};

export type KubeprometheusstackHelmValuesGrafanaSidecarDatasources = {
  enabled?: boolean;
  defaultDatasourceEnabled?: boolean;
  isDefaultDatasource?: boolean;
  name?: string;
  uid?: string;
  annotations?: KubeprometheusstackHelmValuesGrafanaSidecarDatasourcesAnnotations;
  httpMethod?: string;
  createPrometheusReplicasDatasources?: boolean;
  prometheusServiceName?: string;
  label?: string;
  labelValue?: string;
  exemplarTraceIdDestinations?: KubeprometheusstackHelmValuesGrafanaSidecarDatasourcesExemplarTraceIdDestinations;
  alertmanager?: KubeprometheusstackHelmValuesGrafanaSidecarDatasourcesAlertmanager;
};

export type KubeprometheusstackHelmValuesGrafanaSidecarDatasourcesAnnotations =
  object;

export type KubeprometheusstackHelmValuesGrafanaSidecarDatasourcesExemplarTraceIdDestinations =
  object;

export type KubeprometheusstackHelmValuesGrafanaSidecarDatasourcesAlertmanager =
  {
    enabled?: boolean;
    name?: string;
    uid?: string;
    handleGrafanaManagedAlerts?: boolean;
    implementation?: string;
  };

export type KubeprometheusstackHelmValuesGrafanaService = {
  portName?: string;
  ipFamilies?: unknown[];
  ipFamilyPolicy?: string;
};

export type KubeprometheusstackHelmValuesGrafanaServiceMonitor = {
  enabled?: boolean;
  path?: string;
  labels?: KubeprometheusstackHelmValuesGrafanaServiceMonitorLabels;
  interval?: string;
  scheme?: string;
  tlsConfig?: KubeprometheusstackHelmValuesGrafanaServiceMonitorTlsConfig;
  scrapeTimeout?: string;
  relabelings?: unknown[];
};

export type KubeprometheusstackHelmValuesGrafanaServiceMonitorLabels = object;

export type KubeprometheusstackHelmValuesGrafanaServiceMonitorTlsConfig =
  object;

export type KubeprometheusstackHelmValuesKubernetesServiceMonitors = {
  enabled?: boolean;
};

export type KubeprometheusstackHelmValuesKubeApiServer = {
  enabled?: boolean;
  tlsConfig?: KubeprometheusstackHelmValuesKubeApiServerTlsConfig;
  serviceMonitor?: KubeprometheusstackHelmValuesKubeApiServerServiceMonitor;
};

export type KubeprometheusstackHelmValuesKubeApiServerTlsConfig = {
  serverName?: string;
  insecureSkipVerify?: boolean;
};

export type KubeprometheusstackHelmValuesKubeApiServerServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  proxyUrl?: string;
  jobLabel?: string;
  selector?: KubeprometheusstackHelmValuesKubeApiServerServiceMonitorSelector;
  metricRelabelings?: KubeprometheusstackHelmValuesKubeApiServerServiceMonitorMetricRelabelingsElement[];
  relabelings?: unknown[];
  additionalLabels?: KubeprometheusstackHelmValuesKubeApiServerServiceMonitorAdditionalLabels;
  targetLabels?: unknown[];
};

export type KubeprometheusstackHelmValuesKubeApiServerServiceMonitorSelector = {
  matchLabels?: KubeprometheusstackHelmValuesKubeApiServerServiceMonitorSelectorMatchLabels;
};

export type KubeprometheusstackHelmValuesKubeApiServerServiceMonitorSelectorMatchLabels =
  {
    component?: string;
    provider?: string;
  };

export type KubeprometheusstackHelmValuesKubeApiServerServiceMonitorMetricRelabelingsElement =
  {
    action?: string;
    regex?: string;
    sourceLabels?: string[];
  };

export type KubeprometheusstackHelmValuesKubeApiServerServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesKubelet = {
  enabled?: boolean;
  namespace?: string;
  serviceMonitor?: KubeprometheusstackHelmValuesKubeletServiceMonitor;
};

export type KubeprometheusstackHelmValuesKubeletServiceMonitor = {
  enabled?: boolean;
  kubelet?: boolean;
  attachMetadata?: KubeprometheusstackHelmValuesKubeletServiceMonitorAttachMetadata;
  interval?: string;
  honorLabels?: boolean;
  honorTimestamps?: boolean;
  trackTimestampsStaleness?: boolean;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  proxyUrl?: string;
  https?: boolean;
  insecureSkipVerify?: boolean;
  probes?: boolean;
  resource?: boolean;
  resourcePath?: string;
  resourceInterval?: string;
  cAdvisor?: boolean;
  cAdvisorInterval?: string;
  cAdvisorMetricRelabelings?: KubeprometheusstackHelmValuesKubeletServiceMonitorCAdvisorMetricRelabelingsElement[];
  probesMetricRelabelings?: unknown[];
  cAdvisorRelabelings?: KubeprometheusstackHelmValuesKubeletServiceMonitorCAdvisorRelabelingsElement[];
  probesRelabelings?: KubeprometheusstackHelmValuesKubeletServiceMonitorProbesRelabelingsElement[];
  resourceRelabelings?: KubeprometheusstackHelmValuesKubeletServiceMonitorResourceRelabelingsElement[];
  metricRelabelings?: KubeprometheusstackHelmValuesKubeletServiceMonitorMetricRelabelingsElement[];
  relabelings?: KubeprometheusstackHelmValuesKubeletServiceMonitorRelabelingsElement[];
  additionalLabels?: KubeprometheusstackHelmValuesKubeletServiceMonitorAdditionalLabels;
  targetLabels?: unknown[];
};

export type KubeprometheusstackHelmValuesKubeletServiceMonitorAttachMetadata = {
  node?: boolean;
};

export type KubeprometheusstackHelmValuesKubeletServiceMonitorCAdvisorMetricRelabelingsElement =
  {
    sourceLabels?: string[];
    action?: string;
    regex?: string;
  };

export type KubeprometheusstackHelmValuesKubeletServiceMonitorCAdvisorRelabelingsElement =
  {
    action?: string;
    sourceLabels?: string[];
    targetLabel?: string;
  };

export type KubeprometheusstackHelmValuesKubeletServiceMonitorProbesRelabelingsElement =
  {
    action?: string;
    sourceLabels?: string[];
    targetLabel?: string;
  };

export type KubeprometheusstackHelmValuesKubeletServiceMonitorResourceRelabelingsElement =
  {
    action?: string;
    sourceLabels?: string[];
    targetLabel?: string;
  };

export type KubeprometheusstackHelmValuesKubeletServiceMonitorMetricRelabelingsElement =
  {
    action?: string;
    sourceLabels?: string[];
    regex?: string;
  };

export type KubeprometheusstackHelmValuesKubeletServiceMonitorRelabelingsElement =
  {
    action?: string;
    sourceLabels?: string[];
    targetLabel?: string;
  };

export type KubeprometheusstackHelmValuesKubeletServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesKubeControllerManager = {
  enabled?: boolean;
  endpoints?: unknown[];
  service?: KubeprometheusstackHelmValuesKubeControllerManagerService;
  serviceMonitor?: KubeprometheusstackHelmValuesKubeControllerManagerServiceMonitor;
};

export type KubeprometheusstackHelmValuesKubeControllerManagerService = {
  enabled?: boolean;
  port?: unknown;
  targetPort?: unknown;
  ipDualStack?: KubeprometheusstackHelmValuesKubeControllerManagerServiceIpDualStack;
};

export type KubeprometheusstackHelmValuesKubeControllerManagerServiceIpDualStack =
  {
    enabled?: boolean;
    ipFamilies?: string[];
    ipFamilyPolicy?: string;
  };

export type KubeprometheusstackHelmValuesKubeControllerManagerServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  proxyUrl?: string;
  port?: string;
  jobLabel?: string;
  selector?: KubeprometheusstackHelmValuesKubeControllerManagerServiceMonitorSelector;
  https?: unknown;
  insecureSkipVerify?: unknown;
  serverName?: unknown;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
  additionalLabels?: KubeprometheusstackHelmValuesKubeControllerManagerServiceMonitorAdditionalLabels;
  targetLabels?: unknown[];
};

export type KubeprometheusstackHelmValuesKubeControllerManagerServiceMonitorSelector =
  object;

export type KubeprometheusstackHelmValuesKubeControllerManagerServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesCoreDns = {
  enabled?: boolean;
  service?: KubeprometheusstackHelmValuesCoreDnsService;
  serviceMonitor?: KubeprometheusstackHelmValuesCoreDnsServiceMonitor;
};

export type KubeprometheusstackHelmValuesCoreDnsService = {
  enabled?: boolean;
  port?: number;
  targetPort?: number;
  ipDualStack?: KubeprometheusstackHelmValuesCoreDnsServiceIpDualStack;
};

export type KubeprometheusstackHelmValuesCoreDnsServiceIpDualStack = {
  enabled?: boolean;
  ipFamilies?: string[];
  ipFamilyPolicy?: string;
};

export type KubeprometheusstackHelmValuesCoreDnsServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  proxyUrl?: string;
  port?: string;
  jobLabel?: string;
  selector?: KubeprometheusstackHelmValuesCoreDnsServiceMonitorSelector;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
  additionalLabels?: KubeprometheusstackHelmValuesCoreDnsServiceMonitorAdditionalLabels;
  targetLabels?: unknown[];
};

export type KubeprometheusstackHelmValuesCoreDnsServiceMonitorSelector = object;

export type KubeprometheusstackHelmValuesCoreDnsServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesKubeDns = {
  enabled?: boolean;
  service?: KubeprometheusstackHelmValuesKubeDnsService;
  serviceMonitor?: KubeprometheusstackHelmValuesKubeDnsServiceMonitor;
};

export type KubeprometheusstackHelmValuesKubeDnsService = {
  dnsmasq?: KubeprometheusstackHelmValuesKubeDnsServiceDnsmasq;
  skydns?: KubeprometheusstackHelmValuesKubeDnsServiceSkydns;
  ipDualStack?: KubeprometheusstackHelmValuesKubeDnsServiceIpDualStack;
};

export type KubeprometheusstackHelmValuesKubeDnsServiceDnsmasq = {
  port?: number;
  targetPort?: number;
};

export type KubeprometheusstackHelmValuesKubeDnsServiceSkydns = {
  port?: number;
  targetPort?: number;
};

export type KubeprometheusstackHelmValuesKubeDnsServiceIpDualStack = {
  enabled?: boolean;
  ipFamilies?: string[];
  ipFamilyPolicy?: string;
};

export type KubeprometheusstackHelmValuesKubeDnsServiceMonitor = {
  interval?: string;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  proxyUrl?: string;
  jobLabel?: string;
  selector?: KubeprometheusstackHelmValuesKubeDnsServiceMonitorSelector;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
  dnsmasqMetricRelabelings?: unknown[];
  dnsmasqRelabelings?: unknown[];
  additionalLabels?: KubeprometheusstackHelmValuesKubeDnsServiceMonitorAdditionalLabels;
  targetLabels?: unknown[];
};

export type KubeprometheusstackHelmValuesKubeDnsServiceMonitorSelector = object;

export type KubeprometheusstackHelmValuesKubeDnsServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesKubeEtcd = {
  enabled?: boolean;
  endpoints?: unknown[];
  service?: KubeprometheusstackHelmValuesKubeEtcdService;
  serviceMonitor?: KubeprometheusstackHelmValuesKubeEtcdServiceMonitor;
};

export type KubeprometheusstackHelmValuesKubeEtcdService = {
  enabled?: boolean;
  port?: number;
  targetPort?: number;
  ipDualStack?: KubeprometheusstackHelmValuesKubeEtcdServiceIpDualStack;
};

export type KubeprometheusstackHelmValuesKubeEtcdServiceIpDualStack = {
  enabled?: boolean;
  ipFamilies?: string[];
  ipFamilyPolicy?: string;
};

export type KubeprometheusstackHelmValuesKubeEtcdServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  proxyUrl?: string;
  scheme?: string;
  insecureSkipVerify?: boolean;
  serverName?: string;
  caFile?: string;
  certFile?: string;
  keyFile?: string;
  port?: string;
  jobLabel?: string;
  selector?: KubeprometheusstackHelmValuesKubeEtcdServiceMonitorSelector;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
  additionalLabels?: KubeprometheusstackHelmValuesKubeEtcdServiceMonitorAdditionalLabels;
  targetLabels?: unknown[];
};

export type KubeprometheusstackHelmValuesKubeEtcdServiceMonitorSelector =
  object;

export type KubeprometheusstackHelmValuesKubeEtcdServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesKubeScheduler = {
  enabled?: boolean;
  endpoints?: unknown[];
  service?: KubeprometheusstackHelmValuesKubeSchedulerService;
  serviceMonitor?: KubeprometheusstackHelmValuesKubeSchedulerServiceMonitor;
};

export type KubeprometheusstackHelmValuesKubeSchedulerService = {
  enabled?: boolean;
  port?: unknown;
  targetPort?: unknown;
  ipDualStack?: KubeprometheusstackHelmValuesKubeSchedulerServiceIpDualStack;
};

export type KubeprometheusstackHelmValuesKubeSchedulerServiceIpDualStack = {
  enabled?: boolean;
  ipFamilies?: string[];
  ipFamilyPolicy?: string;
};

export type KubeprometheusstackHelmValuesKubeSchedulerServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  proxyUrl?: string;
  https?: unknown;
  port?: string;
  jobLabel?: string;
  selector?: KubeprometheusstackHelmValuesKubeSchedulerServiceMonitorSelector;
  insecureSkipVerify?: unknown;
  serverName?: unknown;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
  additionalLabels?: KubeprometheusstackHelmValuesKubeSchedulerServiceMonitorAdditionalLabels;
  targetLabels?: unknown[];
};

export type KubeprometheusstackHelmValuesKubeSchedulerServiceMonitorSelector =
  object;

export type KubeprometheusstackHelmValuesKubeSchedulerServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesKubeProxy = {
  enabled?: boolean;
  endpoints?: unknown[];
  service?: KubeprometheusstackHelmValuesKubeProxyService;
  serviceMonitor?: KubeprometheusstackHelmValuesKubeProxyServiceMonitor;
};

export type KubeprometheusstackHelmValuesKubeProxyService = {
  enabled?: boolean;
  port?: number;
  targetPort?: number;
  ipDualStack?: KubeprometheusstackHelmValuesKubeProxyServiceIpDualStack;
};

export type KubeprometheusstackHelmValuesKubeProxyServiceIpDualStack = {
  enabled?: boolean;
  ipFamilies?: string[];
  ipFamilyPolicy?: string;
};

export type KubeprometheusstackHelmValuesKubeProxyServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  proxyUrl?: string;
  port?: string;
  jobLabel?: string;
  selector?: KubeprometheusstackHelmValuesKubeProxyServiceMonitorSelector;
  https?: boolean;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
  additionalLabels?: KubeprometheusstackHelmValuesKubeProxyServiceMonitorAdditionalLabels;
  targetLabels?: unknown[];
};

export type KubeprometheusstackHelmValuesKubeProxyServiceMonitorSelector =
  object;

export type KubeprometheusstackHelmValuesKubeProxyServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesKubeStateMetrics = {
  enabled?: boolean;
};

export type KubeprometheusstackHelmValuesKubestatemetrics = {
  namespaceOverride?: string;
  rbac?: KubeprometheusstackHelmValuesKubestatemetricsRbac;
  releaseLabel?: boolean;
  prometheusScrape?: boolean;
  prometheus?: KubeprometheusstackHelmValuesKubestatemetricsPrometheus;
  selfMonitor?: KubeprometheusstackHelmValuesKubestatemetricsSelfMonitor;
};

export type KubeprometheusstackHelmValuesKubestatemetricsRbac = {
  create?: boolean;
};

export type KubeprometheusstackHelmValuesKubestatemetricsPrometheus = {
  monitor?: KubeprometheusstackHelmValuesKubestatemetricsPrometheusMonitor;
};

export type KubeprometheusstackHelmValuesKubestatemetricsPrometheusMonitor = {
  enabled?: boolean;
  interval?: string;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  scrapeTimeout?: string;
  proxyUrl?: string;
  honorLabels?: boolean;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
};

export type KubeprometheusstackHelmValuesKubestatemetricsSelfMonitor = {
  enabled?: boolean;
};

export type KubeprometheusstackHelmValuesNodeExporter = {
  enabled?: boolean;
  operatingSystems?: KubeprometheusstackHelmValuesNodeExporterOperatingSystems;
  forceDeployDashboards?: boolean;
};

export type KubeprometheusstackHelmValuesNodeExporterOperatingSystems = {
  linux?: KubeprometheusstackHelmValuesNodeExporterOperatingSystemsLinux;
  aix?: KubeprometheusstackHelmValuesNodeExporterOperatingSystemsAix;
  darwin?: KubeprometheusstackHelmValuesNodeExporterOperatingSystemsDarwin;
};

export type KubeprometheusstackHelmValuesNodeExporterOperatingSystemsLinux = {
  enabled?: boolean;
};

export type KubeprometheusstackHelmValuesNodeExporterOperatingSystemsAix = {
  enabled?: boolean;
};

export type KubeprometheusstackHelmValuesNodeExporterOperatingSystemsDarwin = {
  enabled?: boolean;
};

export type KubeprometheusstackHelmValuesPrometheusnodeexporter = {
  namespaceOverride?: string;
  podLabels?: KubeprometheusstackHelmValuesPrometheusnodeexporterPodLabels;
  releaseLabel?: boolean;
  extraArgs?: string[];
  service?: KubeprometheusstackHelmValuesPrometheusnodeexporterService;
  prometheus?: KubeprometheusstackHelmValuesPrometheusnodeexporterPrometheus;
  rbac?: KubeprometheusstackHelmValuesPrometheusnodeexporterRbac;
  // manually added
  extraHostVolumeMounts?: object[];
};

export type KubeprometheusstackHelmValuesPrometheusnodeexporterPodLabels = {
  jobLabel?: string;
};

export type KubeprometheusstackHelmValuesPrometheusnodeexporterService = {
  portName?: string;
  ipDualStack?: KubeprometheusstackHelmValuesPrometheusnodeexporterServiceIpDualStack;
  labels?: KubeprometheusstackHelmValuesPrometheusnodeexporterServiceLabels;
};

export type KubeprometheusstackHelmValuesPrometheusnodeexporterServiceIpDualStack =
  {
    enabled?: boolean;
    ipFamilies?: string[];
    ipFamilyPolicy?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusnodeexporterServiceLabels = {
  jobLabel?: string;
};

export type KubeprometheusstackHelmValuesPrometheusnodeexporterPrometheus = {
  monitor?: KubeprometheusstackHelmValuesPrometheusnodeexporterPrometheusMonitor;
};

export type KubeprometheusstackHelmValuesPrometheusnodeexporterPrometheusMonitor =
  {
    enabled?: boolean;
    jobLabel?: string;
    interval?: string;
    sampleLimit?: number;
    targetLimit?: number;
    labelLimit?: number;
    labelNameLengthLimit?: number;
    labelValueLengthLimit?: number;
    scrapeTimeout?: string;
    proxyUrl?: string;
    metricRelabelings?: unknown[];
    relabelings?: unknown[];
  };

export type KubeprometheusstackHelmValuesPrometheusnodeexporterRbac = {
  pspEnabled?: boolean;
};

export type KubeprometheusstackHelmValuesPrometheusOperator = {
  enabled?: boolean;
  fullnameOverride?: string;
  revisionHistoryLimit?: number;
  strategy?: KubeprometheusstackHelmValuesPrometheusOperatorStrategy;
  tls?: KubeprometheusstackHelmValuesPrometheusOperatorTls;
  livenessProbe?: KubeprometheusstackHelmValuesPrometheusOperatorLivenessProbe;
  readinessProbe?: KubeprometheusstackHelmValuesPrometheusOperatorReadinessProbe;
  admissionWebhooks?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooks;
  namespaces?: KubeprometheusstackHelmValuesPrometheusOperatorNamespaces;
  denyNamespaces?: unknown[];
  alertmanagerInstanceNamespaces?: unknown[];
  alertmanagerConfigNamespaces?: unknown[];
  prometheusInstanceNamespaces?: unknown[];
  thanosRulerInstanceNamespaces?: unknown[];
  networkPolicy?: KubeprometheusstackHelmValuesPrometheusOperatorNetworkPolicy;
  serviceAccount?: KubeprometheusstackHelmValuesPrometheusOperatorServiceAccount;
  terminationGracePeriodSeconds?: number;
  lifecycle?: KubeprometheusstackHelmValuesPrometheusOperatorLifecycle;
  service?: KubeprometheusstackHelmValuesPrometheusOperatorService;
  labels?: KubeprometheusstackHelmValuesPrometheusOperatorLabels;
  annotations?: KubeprometheusstackHelmValuesPrometheusOperatorAnnotations;
  podLabels?: KubeprometheusstackHelmValuesPrometheusOperatorPodLabels;
  podAnnotations?: KubeprometheusstackHelmValuesPrometheusOperatorPodAnnotations;
  podDisruptionBudget?: KubeprometheusstackHelmValuesPrometheusOperatorPodDisruptionBudget;
  kubeletService?: KubeprometheusstackHelmValuesPrometheusOperatorKubeletService;
  kubeletEndpointsEnabled?: boolean;
  kubeletEndpointSliceEnabled?: boolean;
  extraArgs?: unknown[];
  serviceMonitor?: KubeprometheusstackHelmValuesPrometheusOperatorServiceMonitor;
  resources?: KubeprometheusstackHelmValuesPrometheusOperatorResources;
  env?: KubeprometheusstackHelmValuesPrometheusOperatorEnv;
  hostNetwork?: boolean;
  nodeSelector?: KubeprometheusstackHelmValuesPrometheusOperatorNodeSelector;
  tolerations?: unknown[];
  affinity?: KubeprometheusstackHelmValuesPrometheusOperatorAffinity;
  dnsConfig?: KubeprometheusstackHelmValuesPrometheusOperatorDnsConfig;
  securityContext?: KubeprometheusstackHelmValuesPrometheusOperatorSecurityContext;
  containerSecurityContext?: KubeprometheusstackHelmValuesPrometheusOperatorContainerSecurityContext;
  verticalPodAutoscaler?: KubeprometheusstackHelmValuesPrometheusOperatorVerticalPodAutoscaler;
  image?: KubeprometheusstackHelmValuesPrometheusOperatorImage;
  prometheusConfigReloader?: KubeprometheusstackHelmValuesPrometheusOperatorPrometheusConfigReloader;
  thanosImage?: KubeprometheusstackHelmValuesPrometheusOperatorThanosImage;
  prometheusInstanceSelector?: string;
  alertmanagerInstanceSelector?: string;
  thanosRulerInstanceSelector?: string;
  secretFieldSelector?: string;
  automountServiceAccountToken?: boolean;
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
};

export type KubeprometheusstackHelmValuesPrometheusOperatorStrategy = object;

export type KubeprometheusstackHelmValuesPrometheusOperatorTls = {
  enabled?: boolean;
  tlsMinVersion?: string;
  internalPort?: number;
};

export type KubeprometheusstackHelmValuesPrometheusOperatorLivenessProbe = {
  enabled?: boolean;
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type KubeprometheusstackHelmValuesPrometheusOperatorReadinessProbe = {
  enabled?: boolean;
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooks = {
  failurePolicy?: string;
  timeoutSeconds?: number;
  enabled?: boolean;
  caBundle?: string;
  annotations?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksAnnotations;
  namespaceSelector?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksNamespaceSelector;
  objectSelector?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksObjectSelector;
  matchConditions?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksMatchConditions;
  mutatingWebhookConfiguration?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksMutatingWebhookConfiguration;
  validatingWebhookConfiguration?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksValidatingWebhookConfiguration;
  deployment?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeployment;
  patch?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatch;
  createSecretJob?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCreateSecretJob;
  patchWebhookJob?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchWebhookJob;
  certManager?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCertManager;
};

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksNamespaceSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksObjectSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksMatchConditions =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksMutatingWebhookConfiguration =
  {
    annotations?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksMutatingWebhookConfigurationAnnotations;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksMutatingWebhookConfigurationAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksValidatingWebhookConfiguration =
  {
    annotations?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksValidatingWebhookConfigurationAnnotations;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksValidatingWebhookConfigurationAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeployment =
  {
    enabled?: boolean;
    replicas?: number;
    strategy?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentStrategy;
    podDisruptionBudget?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentPodDisruptionBudget;
    revisionHistoryLimit?: number;
    tls?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentTls;
    serviceAccount?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentServiceAccount;
    service?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentService;
    labels?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentLabels;
    annotations?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentAnnotations;
    podLabels?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentPodLabels;
    podAnnotations?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentPodAnnotations;
    image?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentImage;
    livenessProbe?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentLivenessProbe;
    readinessProbe?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentReadinessProbe;
    resources?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentResources;
    hostNetwork?: boolean;
    nodeSelector?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentNodeSelector;
    tolerations?: unknown[];
    affinity?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentAffinity;
    dnsConfig?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentDnsConfig;
    securityContext?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentSecurityContext;
    containerSecurityContext?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentContainerSecurityContext;
    automountServiceAccountToken?: boolean;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentStrategy =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentPodDisruptionBudget =
  {
    enabled?: boolean;
    minAvailable?: number;
    unhealthyPodEvictionPolicy?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentTls =
  {
    enabled?: boolean;
    tlsMinVersion?: string;
    internalPort?: number;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentServiceAccount =
  {
    annotations?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentServiceAccountAnnotations;
    automountServiceAccountToken?: boolean;
    create?: boolean;
    name?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentServiceAccountAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentService =
  {
    annotations?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentServiceAnnotations;
    labels?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentServiceLabels;
    clusterIP?: string;
    ipDualStack?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentServiceIpDualStack;
    nodePort?: number;
    nodePortTls?: number;
    additionalPorts?: unknown[];
    loadBalancerIP?: string;
    loadBalancerSourceRanges?: unknown[];
    externalTrafficPolicy?: string;
    type?: string;
    externalIPs?: unknown[];
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentServiceAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentServiceLabels =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentServiceIpDualStack =
  {
    enabled?: boolean;
    ipFamilies?: string[];
    ipFamilyPolicy?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentLabels =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentPodLabels =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentPodAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentImage =
  {
    registry?: string;
    repository?: string;
    tag?: string;
    sha?: string;
    pullPolicy?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentLivenessProbe =
  {
    enabled?: boolean;
    failureThreshold?: number;
    initialDelaySeconds?: number;
    periodSeconds?: number;
    successThreshold?: number;
    timeoutSeconds?: number;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentReadinessProbe =
  {
    enabled?: boolean;
    failureThreshold?: number;
    initialDelaySeconds?: number;
    periodSeconds?: number;
    successThreshold?: number;
    timeoutSeconds?: number;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentResources =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentNodeSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentAffinity =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentDnsConfig =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentSecurityContext =
  {
    fsGroup?: number;
    runAsGroup?: number;
    runAsNonRoot?: boolean;
    runAsUser?: number;
    seccompProfile?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentSecurityContextSeccompProfile;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentContainerSecurityContext =
  {
    allowPrivilegeEscalation?: boolean;
    readOnlyRootFilesystem?: boolean;
    capabilities?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentContainerSecurityContextCapabilities;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksDeploymentContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatch =
  {
    enabled?: boolean;
    image?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchImage;
    resources?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchResources;
    priorityClassName?: string;
    ttlSecondsAfterFinished?: number;
    annotations?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchAnnotations;
    podAnnotations?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchPodAnnotations;
    nodeSelector?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchNodeSelector;
    affinity?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchAffinity;
    tolerations?: unknown[];
    securityContext?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchSecurityContext;
    serviceAccount?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchServiceAccount;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchImage =
  {
    registry?: string;
    repository?: string;
    tag?: string;
    sha?: string;
    pullPolicy?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchResources =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchPodAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchNodeSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchAffinity =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchSecurityContext =
  {
    runAsGroup?: number;
    runAsNonRoot?: boolean;
    runAsUser?: number;
    seccompProfile?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchSecurityContextSeccompProfile;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchServiceAccount =
  {
    create?: boolean;
    annotations?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchServiceAccountAnnotations;
    automountServiceAccountToken?: boolean;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchServiceAccountAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCreateSecretJob =
  {
    securityContext?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCreateSecretJobSecurityContext;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCreateSecretJobSecurityContext =
  {
    allowPrivilegeEscalation?: boolean;
    readOnlyRootFilesystem?: boolean;
    capabilities?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCreateSecretJobSecurityContextCapabilities;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCreateSecretJobSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchWebhookJob =
  {
    securityContext?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchWebhookJobSecurityContext;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchWebhookJobSecurityContext =
  {
    allowPrivilegeEscalation?: boolean;
    readOnlyRootFilesystem?: boolean;
    capabilities?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchWebhookJobSecurityContextCapabilities;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksPatchWebhookJobSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCertManager =
  {
    enabled?: boolean;
    rootCert?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCertManagerRootCert;
    admissionCert?: KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCertManagerAdmissionCert;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCertManagerRootCert =
  {
    duration?: string;
    revisionHistoryLimit?: unknown;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorAdmissionWebhooksCertManagerAdmissionCert =
  {
    duration?: string;
    revisionHistoryLimit?: unknown;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorNamespaces = object;

export type KubeprometheusstackHelmValuesPrometheusOperatorNetworkPolicy = {
  enabled?: boolean;
  flavor?: string;
};

export type KubeprometheusstackHelmValuesPrometheusOperatorServiceAccount = {
  create?: boolean;
  name?: string;
  automountServiceAccountToken?: boolean;
  annotations?: KubeprometheusstackHelmValuesPrometheusOperatorServiceAccountAnnotations;
};

export type KubeprometheusstackHelmValuesPrometheusOperatorServiceAccountAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorLifecycle = object;

export type KubeprometheusstackHelmValuesPrometheusOperatorService = {
  annotations?: KubeprometheusstackHelmValuesPrometheusOperatorServiceAnnotations;
  labels?: KubeprometheusstackHelmValuesPrometheusOperatorServiceLabels;
  clusterIP?: string;
  ipDualStack?: KubeprometheusstackHelmValuesPrometheusOperatorServiceIpDualStack;
  nodePort?: number;
  nodePortTls?: number;
  additionalPorts?: unknown[];
  loadBalancerIP?: string;
  loadBalancerSourceRanges?: unknown[];
  externalTrafficPolicy?: string;
  type?: string;
  externalIPs?: unknown[];
};

export type KubeprometheusstackHelmValuesPrometheusOperatorServiceAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorServiceLabels =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorServiceIpDualStack =
  {
    enabled?: boolean;
    ipFamilies?: string[];
    ipFamilyPolicy?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorLabels = object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAnnotations = object;

export type KubeprometheusstackHelmValuesPrometheusOperatorPodLabels = object;

export type KubeprometheusstackHelmValuesPrometheusOperatorPodAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorPodDisruptionBudget =
  {
    enabled?: boolean;
    minAvailable?: number;
    unhealthyPodEvictionPolicy?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorKubeletService = {
  enabled?: boolean;
  namespace?: string;
  selector?: string;
  name?: string;
};

export type KubeprometheusstackHelmValuesPrometheusOperatorServiceMonitor = {
  selfMonitor?: boolean;
  additionalLabels?: KubeprometheusstackHelmValuesPrometheusOperatorServiceMonitorAdditionalLabels;
  interval?: string;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  scrapeTimeout?: string;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
};

export type KubeprometheusstackHelmValuesPrometheusOperatorServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorResources = object;

export type KubeprometheusstackHelmValuesPrometheusOperatorEnv = {
  GOGC?: string;
};

export type KubeprometheusstackHelmValuesPrometheusOperatorNodeSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorAffinity = object;

export type KubeprometheusstackHelmValuesPrometheusOperatorDnsConfig = object;

export type KubeprometheusstackHelmValuesPrometheusOperatorSecurityContext = {
  fsGroup?: number;
  runAsGroup?: number;
  runAsNonRoot?: boolean;
  runAsUser?: number;
  seccompProfile?: KubeprometheusstackHelmValuesPrometheusOperatorSecurityContextSeccompProfile;
};

export type KubeprometheusstackHelmValuesPrometheusOperatorSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorContainerSecurityContext =
  {
    allowPrivilegeEscalation?: boolean;
    readOnlyRootFilesystem?: boolean;
    capabilities?: KubeprometheusstackHelmValuesPrometheusOperatorContainerSecurityContextCapabilities;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorVerticalPodAutoscaler =
  {
    enabled?: boolean;
    controlledResources?: unknown[];
    maxAllowed?: KubeprometheusstackHelmValuesPrometheusOperatorVerticalPodAutoscalerMaxAllowed;
    minAllowed?: KubeprometheusstackHelmValuesPrometheusOperatorVerticalPodAutoscalerMinAllowed;
    updatePolicy?: KubeprometheusstackHelmValuesPrometheusOperatorVerticalPodAutoscalerUpdatePolicy;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorVerticalPodAutoscalerMaxAllowed =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorVerticalPodAutoscalerMinAllowed =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorVerticalPodAutoscalerUpdatePolicy =
  {
    updateMode?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  sha?: string;
  pullPolicy?: string;
};

export type KubeprometheusstackHelmValuesPrometheusOperatorPrometheusConfigReloader =
  {
    image?: KubeprometheusstackHelmValuesPrometheusOperatorPrometheusConfigReloaderImage;
    enableProbe?: boolean;
    resources?: KubeprometheusstackHelmValuesPrometheusOperatorPrometheusConfigReloaderResources;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorPrometheusConfigReloaderImage =
  {
    registry?: string;
    repository?: string;
    tag?: string;
    sha?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusOperatorPrometheusConfigReloaderResources =
  object;

export type KubeprometheusstackHelmValuesPrometheusOperatorThanosImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  sha?: string;
};

export type KubeprometheusstackHelmValuesPrometheus = {
  enabled?: boolean;
  agentMode?: boolean;
  annotations?: KubeprometheusstackHelmValuesPrometheusAnnotations;
  additionalLabels?: KubeprometheusstackHelmValuesPrometheusAdditionalLabels;
  networkPolicy?: KubeprometheusstackHelmValuesPrometheusNetworkPolicy;
  serviceAccount?: KubeprometheusstackHelmValuesPrometheusServiceAccount;
  thanosService?: KubeprometheusstackHelmValuesPrometheusThanosService;
  thanosServiceMonitor?: KubeprometheusstackHelmValuesPrometheusThanosServiceMonitor;
  thanosServiceExternal?: KubeprometheusstackHelmValuesPrometheusThanosServiceExternal;
  service?: KubeprometheusstackHelmValuesPrometheusService;
  servicePerReplica?: KubeprometheusstackHelmValuesPrometheusServicePerReplica;
  podDisruptionBudget?: KubeprometheusstackHelmValuesPrometheusPodDisruptionBudget;
  thanosIngress?: KubeprometheusstackHelmValuesPrometheusThanosIngress;
  extraSecret?: KubeprometheusstackHelmValuesPrometheusExtraSecret;
  ingress?: KubeprometheusstackHelmValuesPrometheusIngress;
  route?: KubeprometheusstackHelmValuesPrometheusRoute;
  ingressPerReplica?: KubeprometheusstackHelmValuesPrometheusIngressPerReplica;
  serviceMonitor?: KubeprometheusstackHelmValuesPrometheusServiceMonitor;
  prometheusSpec?: KubeprometheusstackHelmValuesPrometheusPrometheusSpec;
  additionalRulesForClusterRole?: unknown[];
  additionalServiceMonitors?: unknown[];
  additionalPodMonitors?: unknown[];
};

export type KubeprometheusstackHelmValuesPrometheusAnnotations = object;

export type KubeprometheusstackHelmValuesPrometheusAdditionalLabels = object;

export type KubeprometheusstackHelmValuesPrometheusNetworkPolicy = {
  enabled?: boolean;
  flavor?: string;
};

export type KubeprometheusstackHelmValuesPrometheusServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: KubeprometheusstackHelmValuesPrometheusServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type KubeprometheusstackHelmValuesPrometheusServiceAccountAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusThanosService = {
  enabled?: boolean;
  annotations?: KubeprometheusstackHelmValuesPrometheusThanosServiceAnnotations;
  labels?: KubeprometheusstackHelmValuesPrometheusThanosServiceLabels;
  externalTrafficPolicy?: string;
  type?: string;
  ipDualStack?: KubeprometheusstackHelmValuesPrometheusThanosServiceIpDualStack;
  portName?: string;
  port?: number;
  targetPort?: string;
  httpPortName?: string;
  httpPort?: number;
  targetHttpPort?: string;
  clusterIP?: string;
  nodePort?: number;
  httpNodePort?: number;
};

export type KubeprometheusstackHelmValuesPrometheusThanosServiceAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusThanosServiceLabels = object;

export type KubeprometheusstackHelmValuesPrometheusThanosServiceIpDualStack = {
  enabled?: boolean;
  ipFamilies?: string[];
  ipFamilyPolicy?: string;
};

export type KubeprometheusstackHelmValuesPrometheusThanosServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  additionalLabels?: KubeprometheusstackHelmValuesPrometheusThanosServiceMonitorAdditionalLabels;
  scheme?: string;
  tlsConfig?: KubeprometheusstackHelmValuesPrometheusThanosServiceMonitorTlsConfig;
  bearerTokenFile?: unknown;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
};

export type KubeprometheusstackHelmValuesPrometheusThanosServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesPrometheusThanosServiceMonitorTlsConfig =
  object;

export type KubeprometheusstackHelmValuesPrometheusThanosServiceExternal = {
  enabled?: boolean;
  annotations?: KubeprometheusstackHelmValuesPrometheusThanosServiceExternalAnnotations;
  labels?: KubeprometheusstackHelmValuesPrometheusThanosServiceExternalLabels;
  loadBalancerIP?: string;
  loadBalancerSourceRanges?: unknown[];
  portName?: string;
  port?: number;
  targetPort?: string;
  httpPortName?: string;
  httpPort?: number;
  targetHttpPort?: string;
  externalTrafficPolicy?: string;
  type?: string;
  nodePort?: number;
  httpNodePort?: number;
};

export type KubeprometheusstackHelmValuesPrometheusThanosServiceExternalAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusThanosServiceExternalLabels =
  object;

export type KubeprometheusstackHelmValuesPrometheusService = {
  enabled?: boolean;
  annotations?: KubeprometheusstackHelmValuesPrometheusServiceAnnotations;
  labels?: KubeprometheusstackHelmValuesPrometheusServiceLabels;
  clusterIP?: string;
  ipDualStack?: KubeprometheusstackHelmValuesPrometheusServiceIpDualStack;
  port?: number;
  targetPort?: number;
  reloaderWebPort?: number;
  externalIPs?: unknown[];
  nodePort?: number;
  loadBalancerIP?: string;
  loadBalancerSourceRanges?: unknown[];
  externalTrafficPolicy?: string;
  type?: string;
  additionalPorts?: unknown[];
  publishNotReadyAddresses?: boolean;
  sessionAffinity?: string;
  sessionAffinityConfig?: KubeprometheusstackHelmValuesPrometheusServiceSessionAffinityConfig;
};

export type KubeprometheusstackHelmValuesPrometheusServiceAnnotations = object;

export type KubeprometheusstackHelmValuesPrometheusServiceLabels = object;

export type KubeprometheusstackHelmValuesPrometheusServiceIpDualStack = {
  enabled?: boolean;
  ipFamilies?: string[];
  ipFamilyPolicy?: string;
};

export type KubeprometheusstackHelmValuesPrometheusServiceSessionAffinityConfig =
  {
    clientIP?: KubeprometheusstackHelmValuesPrometheusServiceSessionAffinityConfigClientIP;
  };

export type KubeprometheusstackHelmValuesPrometheusServiceSessionAffinityConfigClientIP =
  {
    timeoutSeconds?: number;
  };

export type KubeprometheusstackHelmValuesPrometheusServicePerReplica = {
  enabled?: boolean;
  annotations?: KubeprometheusstackHelmValuesPrometheusServicePerReplicaAnnotations;
  port?: number;
  targetPort?: number;
  nodePort?: number;
  loadBalancerSourceRanges?: unknown[];
  externalTrafficPolicy?: string;
  type?: string;
  ipDualStack?: KubeprometheusstackHelmValuesPrometheusServicePerReplicaIpDualStack;
};

export type KubeprometheusstackHelmValuesPrometheusServicePerReplicaAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusServicePerReplicaIpDualStack =
  {
    enabled?: boolean;
    ipFamilies?: string[];
    ipFamilyPolicy?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusPodDisruptionBudget = {
  enabled?: boolean;
  minAvailable?: number;
  unhealthyPodEvictionPolicy?: string;
};

export type KubeprometheusstackHelmValuesPrometheusThanosIngress = {
  enabled?: boolean;
  ingressClassName?: string;
  annotations?: KubeprometheusstackHelmValuesPrometheusThanosIngressAnnotations;
  labels?: KubeprometheusstackHelmValuesPrometheusThanosIngressLabels;
  servicePort?: number;
  nodePort?: number;
  hosts?: unknown[];
  paths?: unknown[];
  tls?: unknown[];
};

export type KubeprometheusstackHelmValuesPrometheusThanosIngressAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusThanosIngressLabels = object;

export type KubeprometheusstackHelmValuesPrometheusExtraSecret = {
  annotations?: KubeprometheusstackHelmValuesPrometheusExtraSecretAnnotations;
  data?: KubeprometheusstackHelmValuesPrometheusExtraSecretData;
};

export type KubeprometheusstackHelmValuesPrometheusExtraSecretAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusExtraSecretData = object;

export type KubeprometheusstackHelmValuesPrometheusIngress = {
  enabled?: boolean;
  ingressClassName?: string;
  annotations?: KubeprometheusstackHelmValuesPrometheusIngressAnnotations;
  labels?: KubeprometheusstackHelmValuesPrometheusIngressLabels;
  hosts?: unknown[];
  paths?: unknown[];
  tls?: unknown[];
};

export type KubeprometheusstackHelmValuesPrometheusIngressAnnotations = object;

export type KubeprometheusstackHelmValuesPrometheusIngressLabels = object;

export type KubeprometheusstackHelmValuesPrometheusRoute = {
  main?: KubeprometheusstackHelmValuesPrometheusRouteMain;
};

export type KubeprometheusstackHelmValuesPrometheusRouteMain = {
  enabled?: boolean;
  apiVersion?: string;
  kind?: string;
  annotations?: KubeprometheusstackHelmValuesPrometheusRouteMainAnnotations;
  labels?: KubeprometheusstackHelmValuesPrometheusRouteMainLabels;
  hostnames?: unknown[];
  parentRefs?: unknown[];
  httpsRedirect?: boolean;
  matches?: KubeprometheusstackHelmValuesPrometheusRouteMainMatchesElement[];
  filters?: unknown[];
  additionalRules?: unknown[];
};

export type KubeprometheusstackHelmValuesPrometheusRouteMainAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusRouteMainLabels = object;

export type KubeprometheusstackHelmValuesPrometheusRouteMainMatchesElement = {
  path?: KubeprometheusstackHelmValuesPrometheusRouteMainMatchesPath;
};

export type KubeprometheusstackHelmValuesPrometheusRouteMainMatchesPath = {
  type?: string;
  value?: string;
};

export type KubeprometheusstackHelmValuesPrometheusIngressPerReplica = {
  enabled?: boolean;
  ingressClassName?: string;
  annotations?: KubeprometheusstackHelmValuesPrometheusIngressPerReplicaAnnotations;
  labels?: KubeprometheusstackHelmValuesPrometheusIngressPerReplicaLabels;
  hostPrefix?: string;
  hostDomain?: string;
  paths?: unknown[];
  tlsSecretName?: string;
  tlsSecretPerReplica?: KubeprometheusstackHelmValuesPrometheusIngressPerReplicaTlsSecretPerReplica;
};

export type KubeprometheusstackHelmValuesPrometheusIngressPerReplicaAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusIngressPerReplicaLabels =
  object;

export type KubeprometheusstackHelmValuesPrometheusIngressPerReplicaTlsSecretPerReplica =
  {
    enabled?: boolean;
    prefix?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusServiceMonitor = {
  selfMonitor?: boolean;
  interval?: string;
  additionalLabels?: KubeprometheusstackHelmValuesPrometheusServiceMonitorAdditionalLabels;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  scheme?: string;
  tlsConfig?: KubeprometheusstackHelmValuesPrometheusServiceMonitorTlsConfig;
  bearerTokenFile?: unknown;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
  additionalEndpoints?: unknown[];
};

export type KubeprometheusstackHelmValuesPrometheusServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesPrometheusServiceMonitorTlsConfig =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpec = {
  persistentVolumeClaimRetentionPolicy?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecPersistentVolumeClaimRetentionPolicy;
  disableCompaction?: boolean;
  automountServiceAccountToken?: boolean;
  apiserverConfig?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecApiserverConfig;
  additionalArgs?: unknown[];
  scrapeFailureLogFile?: string;
  scrapeInterval?: string;
  scrapeTimeout?: string;
  scrapeClasses?: unknown[];
  podTargetLabels?: unknown[];
  evaluationInterval?: string;
  listenLocal?: boolean;
  enableOTLPReceiver?: boolean;
  enableAdminAPI?: boolean;
  version?: string;
  web?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecWeb;
  exemplars?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecExemplars;
  enableFeatures?: unknown[];
  otlp?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecOtlp;
  serviceName?: unknown;
  image?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecImage;
  tolerations?: unknown[];
  topologySpreadConstraints?: unknown[];
  alertingEndpoints?: unknown[];
  externalLabels?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecExternalLabels;
  enableRemoteWriteReceiver?: boolean;
  replicaExternalLabelName?: string;
  replicaExternalLabelNameClear?: boolean;
  prometheusExternalLabelName?: string;
  prometheusExternalLabelNameClear?: boolean;
  externalUrl?: string;
  nodeSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecNodeSelector;
  secrets?: unknown[];
  configMaps?: unknown[];
  query?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecQuery;
  ruleNamespaceSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecRuleNamespaceSelector;
  ruleSelectorNilUsesHelmValues?: boolean;
  ruleSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecRuleSelector;
  serviceMonitorSelectorNilUsesHelmValues?: boolean;
  serviceMonitorSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecServiceMonitorSelector;
  serviceMonitorNamespaceSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecServiceMonitorNamespaceSelector;
  podMonitorSelectorNilUsesHelmValues?: boolean;
  podMonitorSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecPodMonitorSelector;
  podMonitorNamespaceSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecPodMonitorNamespaceSelector;
  probeSelectorNilUsesHelmValues?: boolean;
  probeSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecProbeSelector;
  probeNamespaceSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecProbeNamespaceSelector;
  scrapeConfigSelectorNilUsesHelmValues?: boolean;
  scrapeConfigSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecScrapeConfigSelector;
  scrapeConfigNamespaceSelector?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecScrapeConfigNamespaceSelector;
  retention?: string;
  retentionSize?: string;
  tsdb?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecTsdb;
  walCompression?: boolean;
  paused?: boolean;
  replicas?: number;
  shards?: number;
  logLevel?: string;
  logFormat?: string;
  routePrefix?: string;
  podMetadata?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecPodMetadata;
  podAntiAffinity?: string;
  podAntiAffinityTopologyKey?: string;
  affinity?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecAffinity;
  remoteRead?: unknown[];
  additionalRemoteRead?: unknown[];
  remoteWrite?: unknown[];
  additionalRemoteWrite?: unknown[];
  remoteWriteDashboards?: boolean;
  resources?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecResources;
  storageSpec?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecStorageSpec;
  volumes?: unknown[];
  volumeMounts?: unknown[];
  additionalScrapeConfigs?: unknown[];
  additionalScrapeConfigsSecret?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecAdditionalScrapeConfigsSecret;
  additionalPrometheusSecretsAnnotations?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecAdditionalPrometheusSecretsAnnotations;
  additionalAlertManagerConfigs?: unknown[];
  additionalAlertManagerConfigsSecret?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecAdditionalAlertManagerConfigsSecret;
  additionalAlertRelabelConfigs?: unknown[];
  additionalAlertRelabelConfigsSecret?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecAdditionalAlertRelabelConfigsSecret;
  securityContext?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecSecurityContext;
  dnsConfig?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecDnsConfig;
  dnsPolicy?: string;
  priorityClassName?: string;
  thanos?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecThanos;
  containers?: unknown[];
  initContainers?: unknown[];
  portName?: string;
  arbitraryFSAccessThroughSMs?: boolean;
  overrideHonorLabels?: boolean;
  overrideHonorTimestamps?: boolean;
  ignoreNamespaceSelectors?: boolean;
  enforcedNamespaceLabel?: string;
  prometheusRulesExcludedFromEnforce?: unknown[];
  excludedFromEnforcement?: unknown[];
  queryLogFile?: boolean;
  sampleLimit?: boolean;
  enforcedKeepDroppedTargets?: number;
  enforcedSampleLimit?: boolean;
  enforcedTargetLimit?: boolean;
  enforcedLabelLimit?: boolean;
  enforcedLabelNameLengthLimit?: boolean;
  enforcedLabelValueLengthLimit?: boolean;
  allowOverlappingBlocks?: boolean;
  nameValidationScheme?: string;
  minReadySeconds?: number;
  hostNetwork?: boolean;
  hostAliases?: unknown[];
  tracingConfig?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecTracingConfig;
  serviceDiscoveryRole?: string;
  additionalConfig?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecAdditionalConfig;
  additionalConfigString?: string;
  maximumStartupDurationSeconds?: number;
  scrapeProtocols?: unknown[];
};

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecPersistentVolumeClaimRetentionPolicy =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecApiserverConfig =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecWeb = object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecExemplars =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecOtlp = object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  sha?: string;
  pullPolicy?: string;
};

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecExternalLabels =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecNodeSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecQuery = object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecRuleNamespaceSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecRuleSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecServiceMonitorSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecServiceMonitorNamespaceSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecPodMonitorSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecPodMonitorNamespaceSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecProbeSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecProbeNamespaceSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecScrapeConfigSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecScrapeConfigNamespaceSelector =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecTsdb = {
  outOfOrderTimeWindow?: string;
};

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecPodMetadata =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecAffinity =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecResources =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecStorageSpec =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecAdditionalScrapeConfigsSecret =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecAdditionalPrometheusSecretsAnnotations =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecAdditionalAlertManagerConfigsSecret =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecAdditionalAlertRelabelConfigsSecret =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecSecurityContext =
  {
    runAsGroup?: number;
    runAsNonRoot?: boolean;
    runAsUser?: number;
    fsGroup?: number;
    seccompProfile?: KubeprometheusstackHelmValuesPrometheusPrometheusSpecSecurityContextSeccompProfile;
  };

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecDnsConfig =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecThanos =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecTracingConfig =
  object;

export type KubeprometheusstackHelmValuesPrometheusPrometheusSpecAdditionalConfig =
  object;

export type KubeprometheusstackHelmValuesThanosRuler = {
  enabled?: boolean;
  annotations?: KubeprometheusstackHelmValuesThanosRulerAnnotations;
  serviceAccount?: KubeprometheusstackHelmValuesThanosRulerServiceAccount;
  podDisruptionBudget?: KubeprometheusstackHelmValuesThanosRulerPodDisruptionBudget;
  ingress?: KubeprometheusstackHelmValuesThanosRulerIngress;
  route?: KubeprometheusstackHelmValuesThanosRulerRoute;
  service?: KubeprometheusstackHelmValuesThanosRulerService;
  serviceMonitor?: KubeprometheusstackHelmValuesThanosRulerServiceMonitor;
  thanosRulerSpec?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpec;
  extraSecret?: KubeprometheusstackHelmValuesThanosRulerExtraSecret;
};

export type KubeprometheusstackHelmValuesThanosRulerAnnotations = object;

export type KubeprometheusstackHelmValuesThanosRulerServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: KubeprometheusstackHelmValuesThanosRulerServiceAccountAnnotations;
};

export type KubeprometheusstackHelmValuesThanosRulerServiceAccountAnnotations =
  object;

export type KubeprometheusstackHelmValuesThanosRulerPodDisruptionBudget = {
  enabled?: boolean;
  minAvailable?: number;
  unhealthyPodEvictionPolicy?: string;
};

export type KubeprometheusstackHelmValuesThanosRulerIngress = {
  enabled?: boolean;
  ingressClassName?: string;
  annotations?: KubeprometheusstackHelmValuesThanosRulerIngressAnnotations;
  labels?: KubeprometheusstackHelmValuesThanosRulerIngressLabels;
  hosts?: unknown[];
  paths?: unknown[];
  tls?: unknown[];
};

export type KubeprometheusstackHelmValuesThanosRulerIngressAnnotations = object;

export type KubeprometheusstackHelmValuesThanosRulerIngressLabels = object;

export type KubeprometheusstackHelmValuesThanosRulerRoute = {
  main?: KubeprometheusstackHelmValuesThanosRulerRouteMain;
};

export type KubeprometheusstackHelmValuesThanosRulerRouteMain = {
  enabled?: boolean;
  apiVersion?: string;
  kind?: string;
  annotations?: KubeprometheusstackHelmValuesThanosRulerRouteMainAnnotations;
  labels?: KubeprometheusstackHelmValuesThanosRulerRouteMainLabels;
  hostnames?: unknown[];
  parentRefs?: unknown[];
  httpsRedirect?: boolean;
  matches?: KubeprometheusstackHelmValuesThanosRulerRouteMainMatchesElement[];
  filters?: unknown[];
  additionalRules?: unknown[];
};

export type KubeprometheusstackHelmValuesThanosRulerRouteMainAnnotations =
  object;

export type KubeprometheusstackHelmValuesThanosRulerRouteMainLabels = object;

export type KubeprometheusstackHelmValuesThanosRulerRouteMainMatchesElement = {
  path?: KubeprometheusstackHelmValuesThanosRulerRouteMainMatchesPath;
};

export type KubeprometheusstackHelmValuesThanosRulerRouteMainMatchesPath = {
  type?: string;
  value?: string;
};

export type KubeprometheusstackHelmValuesThanosRulerService = {
  enabled?: boolean;
  annotations?: KubeprometheusstackHelmValuesThanosRulerServiceAnnotations;
  labels?: KubeprometheusstackHelmValuesThanosRulerServiceLabels;
  clusterIP?: string;
  ipDualStack?: KubeprometheusstackHelmValuesThanosRulerServiceIpDualStack;
  port?: number;
  targetPort?: number;
  nodePort?: number;
  additionalPorts?: unknown[];
  externalIPs?: unknown[];
  loadBalancerIP?: string;
  loadBalancerSourceRanges?: unknown[];
  externalTrafficPolicy?: string;
  type?: string;
};

export type KubeprometheusstackHelmValuesThanosRulerServiceAnnotations = object;

export type KubeprometheusstackHelmValuesThanosRulerServiceLabels = object;

export type KubeprometheusstackHelmValuesThanosRulerServiceIpDualStack = {
  enabled?: boolean;
  ipFamilies?: string[];
  ipFamilyPolicy?: string;
};

export type KubeprometheusstackHelmValuesThanosRulerServiceMonitor = {
  selfMonitor?: boolean;
  interval?: string;
  additionalLabels?: KubeprometheusstackHelmValuesThanosRulerServiceMonitorAdditionalLabels;
  sampleLimit?: number;
  targetLimit?: number;
  labelLimit?: number;
  labelNameLengthLimit?: number;
  labelValueLengthLimit?: number;
  proxyUrl?: string;
  scheme?: string;
  tlsConfig?: KubeprometheusstackHelmValuesThanosRulerServiceMonitorTlsConfig;
  bearerTokenFile?: unknown;
  metricRelabelings?: unknown[];
  relabelings?: unknown[];
  additionalEndpoints?: unknown[];
};

export type KubeprometheusstackHelmValuesThanosRulerServiceMonitorAdditionalLabels =
  object;

export type KubeprometheusstackHelmValuesThanosRulerServiceMonitorTlsConfig =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpec = {
  podMetadata?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecPodMetadata;
  serviceName?: unknown;
  image?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecImage;
  ruleNamespaceSelector?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecRuleNamespaceSelector;
  ruleSelectorNilUsesHelmValues?: boolean;
  ruleSelector?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecRuleSelector;
  logFormat?: string;
  logLevel?: string;
  replicas?: number;
  retention?: string;
  evaluationInterval?: string;
  storage?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecStorage;
  alertmanagersConfig?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecAlertmanagersConfig;
  externalPrefix?: unknown;
  externalPrefixNilUsesHelmValues?: boolean;
  routePrefix?: string;
  objectStorageConfig?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecObjectStorageConfig;
  alertDropLabels?: unknown[];
  queryEndpoints?: unknown[];
  queryConfig?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecQueryConfig;
  labels?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecLabels;
  paused?: boolean;
  additionalArgs?: unknown[];
  nodeSelector?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecNodeSelector;
  resources?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecResources;
  podAntiAffinity?: string;
  podAntiAffinityTopologyKey?: string;
  affinity?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecAffinity;
  tolerations?: unknown[];
  topologySpreadConstraints?: unknown[];
  securityContext?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecSecurityContext;
  listenLocal?: boolean;
  containers?: unknown[];
  volumes?: unknown[];
  volumeMounts?: unknown[];
  initContainers?: unknown[];
  priorityClassName?: string;
  portName?: string;
  web?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecWeb;
  additionalConfig?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecAdditionalConfig;
  additionalConfigString?: string;
};

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecPodMetadata =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  sha?: string;
};

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecRuleNamespaceSelector =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecRuleSelector =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecStorage =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecAlertmanagersConfig =
  {
    existingSecret?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecAlertmanagersConfigExistingSecret;
    secret?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecAlertmanagersConfigSecret;
  };

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecAlertmanagersConfigExistingSecret =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecAlertmanagersConfigSecret =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecObjectStorageConfig =
  {
    existingSecret?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecObjectStorageConfigExistingSecret;
    secret?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecObjectStorageConfigSecret;
  };

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecObjectStorageConfigExistingSecret =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecObjectStorageConfigSecret =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecQueryConfig =
  {
    existingSecret?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecQueryConfigExistingSecret;
    secret?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecQueryConfigSecret;
  };

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecQueryConfigExistingSecret =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecQueryConfigSecret =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecLabels =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecNodeSelector =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecResources =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecAffinity =
  object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecSecurityContext =
  {
    runAsGroup?: number;
    runAsNonRoot?: boolean;
    runAsUser?: number;
    fsGroup?: number;
    seccompProfile?: KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecSecurityContextSeccompProfile;
  };

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecWeb = object;

export type KubeprometheusstackHelmValuesThanosRulerThanosRulerSpecAdditionalConfig =
  object;

export type KubeprometheusstackHelmValuesThanosRulerExtraSecret = {
  annotations?: KubeprometheusstackHelmValuesThanosRulerExtraSecretAnnotations;
  data?: KubeprometheusstackHelmValuesThanosRulerExtraSecretData;
};

export type KubeprometheusstackHelmValuesThanosRulerExtraSecretAnnotations =
  object;

export type KubeprometheusstackHelmValuesThanosRulerExtraSecretData = object;

export type KubeprometheusstackHelmValues = {
  nameOverride?: string;
  namespaceOverride?: string;
  kubeTargetVersionOverride?: string;
  kubeVersionOverride?: string;
  fullnameOverride?: string;
  commonLabels?: KubeprometheusstackHelmValuesCommonLabels;
  crds?: KubeprometheusstackHelmValuesCrds;
  customRules?: KubeprometheusstackHelmValuesCustomRules;
  defaultRules?: KubeprometheusstackHelmValuesDefaultRules;
  additionalPrometheusRulesMap?: KubeprometheusstackHelmValuesAdditionalPrometheusRulesMap;
  global?: KubeprometheusstackHelmValuesGlobal;
  windowsMonitoring?: KubeprometheusstackHelmValuesWindowsMonitoring;
  "prometheus-windows-exporter"?: KubeprometheusstackHelmValuesPrometheuswindowsexporter;
  alertmanager?: KubeprometheusstackHelmValuesAlertmanager;
  grafana?: KubeprometheusstackHelmValuesGrafana;
  kubernetesServiceMonitors?: KubeprometheusstackHelmValuesKubernetesServiceMonitors;
  kubeApiServer?: KubeprometheusstackHelmValuesKubeApiServer;
  kubelet?: KubeprometheusstackHelmValuesKubelet;
  kubeControllerManager?: KubeprometheusstackHelmValuesKubeControllerManager;
  coreDns?: KubeprometheusstackHelmValuesCoreDns;
  kubeDns?: KubeprometheusstackHelmValuesKubeDns;
  kubeEtcd?: KubeprometheusstackHelmValuesKubeEtcd;
  kubeScheduler?: KubeprometheusstackHelmValuesKubeScheduler;
  kubeProxy?: KubeprometheusstackHelmValuesKubeProxy;
  kubeStateMetrics?: KubeprometheusstackHelmValuesKubeStateMetrics;
  "kube-state-metrics"?: KubeprometheusstackHelmValuesKubestatemetrics;
  nodeExporter?: KubeprometheusstackHelmValuesNodeExporter;
  "prometheus-node-exporter"?: KubeprometheusstackHelmValuesPrometheusnodeexporter;
  prometheusOperator?: KubeprometheusstackHelmValuesPrometheusOperator;
  prometheus?: KubeprometheusstackHelmValuesPrometheus;
  thanosRuler?: KubeprometheusstackHelmValuesThanosRuler;
  cleanPrometheusOperatorObjectNames?: boolean;
  extraManifests?: unknown;
};

export type KubeprometheusstackHelmParameters = {
  nameOverride?: string;
  namespaceOverride?: string;
  kubeTargetVersionOverride?: string;
  kubeVersionOverride?: string;
  fullnameOverride?: string;
  "crds.enabled"?: string;
  "crds.upgradeJob.enabled"?: string;
  "crds.upgradeJob.forceConflicts"?: string;
  "crds.upgradeJob.image.busybox.registry"?: string;
  "crds.upgradeJob.image.busybox.repository"?: string;
  "crds.upgradeJob.image.busybox.tag"?: string;
  "crds.upgradeJob.image.busybox.sha"?: string;
  "crds.upgradeJob.image.busybox.pullPolicy"?: string;
  "crds.upgradeJob.image.kubectl.registry"?: string;
  "crds.upgradeJob.image.kubectl.repository"?: string;
  "crds.upgradeJob.image.kubectl.tag"?: string;
  "crds.upgradeJob.image.kubectl.sha"?: string;
  "crds.upgradeJob.image.kubectl.pullPolicy"?: string;
  "crds.upgradeJob.extraVolumes"?: string;
  "crds.upgradeJob.extraVolumeMounts"?: string;
  "crds.upgradeJob.tolerations"?: string;
  "crds.upgradeJob.topologySpreadConstraints"?: string;
  "crds.upgradeJob.serviceAccount.create"?: string;
  "crds.upgradeJob.serviceAccount.name"?: string;
  "crds.upgradeJob.serviceAccount.automountServiceAccountToken"?: string;
  "crds.upgradeJob.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "crds.upgradeJob.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "crds.upgradeJob.containerSecurityContext.capabilities.drop"?: string;
  "crds.upgradeJob.podSecurityContext.fsGroup"?: string;
  "crds.upgradeJob.podSecurityContext.runAsGroup"?: string;
  "crds.upgradeJob.podSecurityContext.runAsNonRoot"?: string;
  "crds.upgradeJob.podSecurityContext.runAsUser"?: string;
  "crds.upgradeJob.podSecurityContext.seccompProfile.type"?: string;
  "defaultRules.create"?: string;
  "defaultRules.rules.alertmanager"?: string;
  "defaultRules.rules.etcd"?: string;
  "defaultRules.rules.configReloaders"?: string;
  "defaultRules.rules.general"?: string;
  "defaultRules.rules.k8sContainerCpuUsageSecondsTotal"?: string;
  "defaultRules.rules.k8sContainerMemoryCache"?: string;
  "defaultRules.rules.k8sContainerMemoryRss"?: string;
  "defaultRules.rules.k8sContainerMemorySwap"?: string;
  "defaultRules.rules.k8sContainerResource"?: string;
  "defaultRules.rules.k8sContainerMemoryWorkingSetBytes"?: string;
  "defaultRules.rules.k8sPodOwner"?: string;
  "defaultRules.rules.kubeApiserverAvailability"?: string;
  "defaultRules.rules.kubeApiserverBurnrate"?: string;
  "defaultRules.rules.kubeApiserverHistogram"?: string;
  "defaultRules.rules.kubeApiserverSlos"?: string;
  "defaultRules.rules.kubeControllerManager"?: string;
  "defaultRules.rules.kubelet"?: string;
  "defaultRules.rules.kubeProxy"?: string;
  "defaultRules.rules.kubePrometheusGeneral"?: string;
  "defaultRules.rules.kubePrometheusNodeRecording"?: string;
  "defaultRules.rules.kubernetesApps"?: string;
  "defaultRules.rules.kubernetesResources"?: string;
  "defaultRules.rules.kubernetesStorage"?: string;
  "defaultRules.rules.kubernetesSystem"?: string;
  "defaultRules.rules.kubeSchedulerAlerting"?: string;
  "defaultRules.rules.kubeSchedulerRecording"?: string;
  "defaultRules.rules.kubeStateMetrics"?: string;
  "defaultRules.rules.network"?: string;
  "defaultRules.rules.node"?: string;
  "defaultRules.rules.nodeExporterAlerting"?: string;
  "defaultRules.rules.nodeExporterRecording"?: string;
  "defaultRules.rules.prometheus"?: string;
  "defaultRules.rules.prometheusOperator"?: string;
  "defaultRules.rules.windows"?: string;
  "defaultRules.appNamespacesOperator"?: string;
  "defaultRules.appNamespacesTarget"?: string;
  "defaultRules.keepFiringFor"?: string;
  "defaultRules.additionalAggregationLabels"?: string;
  "defaultRules.runbookUrl"?: string;
  "defaultRules.node.fsSelector"?: string;
  "global.rbac.create"?: string;
  "global.rbac.createAggregateClusterRoles"?: string;
  "global.imageRegistry"?: string;
  "global.imagePullSecrets"?: string;
  "windowsMonitoring.enabled"?: string;
  "prometheus-windows-exporter.prometheus.monitor.enabled"?: string;
  "prometheus-windows-exporter.prometheus.monitor.jobLabel"?: string;
  "prometheus-windows-exporter.releaseLabel"?: string;
  "prometheus-windows-exporter.podLabels.jobLabel"?: string;
  "prometheus-windows-exporter.config"?: string;
  "alertmanager.enabled"?: string;
  "alertmanager.namespaceOverride"?: string;
  "alertmanager.apiVersion"?: string;
  "alertmanager.enableFeatures"?: string;
  "alertmanager.forceDeployDashboards"?: string;
  "alertmanager.networkPolicy.enabled"?: string;
  "alertmanager.networkPolicy.policyTypes"?: string;
  "alertmanager.networkPolicy.gateway.namespace"?: string;
  "alertmanager.networkPolicy.additionalIngress"?: string;
  "alertmanager.networkPolicy.egress.enabled"?: string;
  "alertmanager.networkPolicy.egress.rules"?: string;
  "alertmanager.networkPolicy.enableClusterRules"?: string;
  "alertmanager.networkPolicy.monitoringRules.prometheus"?: string;
  "alertmanager.networkPolicy.monitoringRules.configReloader"?: string;
  "alertmanager.serviceAccount.create"?: string;
  "alertmanager.serviceAccount.name"?: string;
  "alertmanager.serviceAccount.automountServiceAccountToken"?: string;
  "alertmanager.podDisruptionBudget.enabled"?: string;
  "alertmanager.podDisruptionBudget.minAvailable"?: string;
  "alertmanager.podDisruptionBudget.unhealthyPodEvictionPolicy"?: string;
  "alertmanager.config.global.resolve_timeout"?: string;
  "alertmanager.config.inhibit_rules.source_matchers"?: string;
  "alertmanager.config.inhibit_rules.target_matchers"?: string;
  "alertmanager.config.inhibit_rules.equal"?: string;
  "alertmanager.config.route.group_by"?: string;
  "alertmanager.config.route.group_wait"?: string;
  "alertmanager.config.route.group_interval"?: string;
  "alertmanager.config.route.repeat_interval"?: string;
  "alertmanager.config.route.receiver"?: string;
  "alertmanager.config.route.routes.receiver"?: string;
  "alertmanager.config.route.routes.matchers"?: string;
  "alertmanager.config.receivers.name"?: string;
  "alertmanager.config.templates"?: string;
  "alertmanager.stringConfig"?: string;
  "alertmanager.tplConfig"?: string;
  "alertmanager.ingress.enabled"?: string;
  "alertmanager.ingress.ingressClassName"?: string;
  "alertmanager.ingress.hosts"?: string;
  "alertmanager.ingress.paths"?: string;
  "alertmanager.ingress.tls"?: string;
  "alertmanager.route.main.enabled"?: string;
  "alertmanager.route.main.apiVersion"?: string;
  "alertmanager.route.main.kind"?: string;
  "alertmanager.route.main.hostnames"?: string;
  "alertmanager.route.main.parentRefs"?: string;
  "alertmanager.route.main.httpsRedirect"?: string;
  "alertmanager.route.main.matches.path.type"?: string;
  "alertmanager.route.main.matches.path.value"?: string;
  "alertmanager.route.main.filters"?: string;
  "alertmanager.route.main.additionalRules"?: string;
  "alertmanager.ingressPerReplica.enabled"?: string;
  "alertmanager.ingressPerReplica.ingressClassName"?: string;
  "alertmanager.ingressPerReplica.hostPrefix"?: string;
  "alertmanager.ingressPerReplica.hostDomain"?: string;
  "alertmanager.ingressPerReplica.paths"?: string;
  "alertmanager.ingressPerReplica.tlsSecretName"?: string;
  "alertmanager.ingressPerReplica.tlsSecretPerReplica.enabled"?: string;
  "alertmanager.ingressPerReplica.tlsSecretPerReplica.prefix"?: string;
  "alertmanager.service.enabled"?: string;
  "alertmanager.service.clusterIP"?: string;
  "alertmanager.service.ipDualStack.enabled"?: string;
  "alertmanager.service.ipDualStack.ipFamilies"?: string;
  "alertmanager.service.ipDualStack.ipFamilyPolicy"?: string;
  "alertmanager.service.port"?: string;
  "alertmanager.service.targetPort"?: string;
  "alertmanager.service.nodePort"?: string;
  "alertmanager.service.additionalPorts"?: string;
  "alertmanager.service.externalIPs"?: string;
  "alertmanager.service.loadBalancerIP"?: string;
  "alertmanager.service.loadBalancerSourceRanges"?: string;
  "alertmanager.service.externalTrafficPolicy"?: string;
  "alertmanager.service.sessionAffinity"?: string;
  "alertmanager.service.sessionAffinityConfig.clientIP.timeoutSeconds"?: string;
  "alertmanager.service.type"?: string;
  "alertmanager.servicePerReplica.enabled"?: string;
  "alertmanager.servicePerReplica.port"?: string;
  "alertmanager.servicePerReplica.targetPort"?: string;
  "alertmanager.servicePerReplica.nodePort"?: string;
  "alertmanager.servicePerReplica.loadBalancerSourceRanges"?: string;
  "alertmanager.servicePerReplica.externalTrafficPolicy"?: string;
  "alertmanager.servicePerReplica.type"?: string;
  "alertmanager.serviceMonitor.selfMonitor"?: string;
  "alertmanager.serviceMonitor.interval"?: string;
  "alertmanager.serviceMonitor.sampleLimit"?: string;
  "alertmanager.serviceMonitor.targetLimit"?: string;
  "alertmanager.serviceMonitor.labelLimit"?: string;
  "alertmanager.serviceMonitor.labelNameLengthLimit"?: string;
  "alertmanager.serviceMonitor.labelValueLengthLimit"?: string;
  "alertmanager.serviceMonitor.proxyUrl"?: string;
  "alertmanager.serviceMonitor.scheme"?: string;
  "alertmanager.serviceMonitor.enableHttp2"?: string;
  "alertmanager.serviceMonitor.bearerTokenFile"?: string;
  "alertmanager.serviceMonitor.metricRelabelings"?: string;
  "alertmanager.serviceMonitor.relabelings"?: string;
  "alertmanager.serviceMonitor.additionalEndpoints"?: string;
  "alertmanager.alertmanagerSpec.serviceName"?: string;
  "alertmanager.alertmanagerSpec.image.registry"?: string;
  "alertmanager.alertmanagerSpec.image.repository"?: string;
  "alertmanager.alertmanagerSpec.image.tag"?: string;
  "alertmanager.alertmanagerSpec.image.sha"?: string;
  "alertmanager.alertmanagerSpec.image.pullPolicy"?: string;
  "alertmanager.alertmanagerSpec.useExistingSecret"?: string;
  "alertmanager.alertmanagerSpec.secrets"?: string;
  "alertmanager.alertmanagerSpec.automountServiceAccountToken"?: string;
  "alertmanager.alertmanagerSpec.configMaps"?: string;
  "alertmanager.alertmanagerSpec.additionalArgs"?: string;
  "alertmanager.alertmanagerSpec.logFormat"?: string;
  "alertmanager.alertmanagerSpec.logLevel"?: string;
  "alertmanager.alertmanagerSpec.replicas"?: string;
  "alertmanager.alertmanagerSpec.retention"?: string;
  "alertmanager.alertmanagerSpec.externalUrl"?: string;
  "alertmanager.alertmanagerSpec.routePrefix"?: string;
  "alertmanager.alertmanagerSpec.scheme"?: string;
  "alertmanager.alertmanagerSpec.paused"?: string;
  "alertmanager.alertmanagerSpec.podAntiAffinity"?: string;
  "alertmanager.alertmanagerSpec.podAntiAffinityTopologyKey"?: string;
  "alertmanager.alertmanagerSpec.tolerations"?: string;
  "alertmanager.alertmanagerSpec.topologySpreadConstraints"?: string;
  "alertmanager.alertmanagerSpec.securityContext.runAsGroup"?: string;
  "alertmanager.alertmanagerSpec.securityContext.runAsNonRoot"?: string;
  "alertmanager.alertmanagerSpec.securityContext.runAsUser"?: string;
  "alertmanager.alertmanagerSpec.securityContext.fsGroup"?: string;
  "alertmanager.alertmanagerSpec.securityContext.seccompProfile.type"?: string;
  "alertmanager.alertmanagerSpec.dnsPolicy"?: string;
  "alertmanager.alertmanagerSpec.listenLocal"?: string;
  "alertmanager.alertmanagerSpec.containers"?: string;
  "alertmanager.alertmanagerSpec.volumes"?: string;
  "alertmanager.alertmanagerSpec.volumeMounts"?: string;
  "alertmanager.alertmanagerSpec.initContainers"?: string;
  "alertmanager.alertmanagerSpec.priorityClassName"?: string;
  "alertmanager.alertmanagerSpec.additionalPeers"?: string;
  "alertmanager.alertmanagerSpec.portName"?: string;
  "alertmanager.alertmanagerSpec.clusterAdvertiseAddress"?: string;
  "alertmanager.alertmanagerSpec.clusterGossipInterval"?: string;
  "alertmanager.alertmanagerSpec.clusterPeerTimeout"?: string;
  "alertmanager.alertmanagerSpec.clusterPushpullInterval"?: string;
  "alertmanager.alertmanagerSpec.clusterLabel"?: string;
  "alertmanager.alertmanagerSpec.forceEnableClusterMode"?: string;
  "alertmanager.alertmanagerSpec.minReadySeconds"?: string;
  "alertmanager.alertmanagerSpec.additionalConfigString"?: string;
  "grafana.enabled"?: string;
  "grafana.namespaceOverride"?: string;
  "grafana.forceDeployDatasources"?: string;
  "grafana.forceDeployDashboards"?: string;
  "grafana.defaultDashboardsEnabled"?: string;
  "grafana.operator.dashboardsConfigMapRefEnabled"?: string;
  "grafana.operator.resyncPeriod"?: string;
  "grafana.operator.folder"?: string;
  "grafana.defaultDashboardsTimezone"?: string;
  "grafana.defaultDashboardsEditable"?: string;
  "grafana.defaultDashboardsInterval"?: string;
  "grafana.adminUser"?: string;
  "grafana.adminPassword"?: string;
  "grafana.rbac.pspEnabled"?: string;
  "grafana.ingress.enabled"?: string;
  "grafana.ingress.hosts"?: string;
  "grafana.ingress.path"?: string;
  "grafana.ingress.tls"?: string;
  "grafana.serviceAccount.create"?: string;
  "grafana.serviceAccount.autoMount"?: string;
  "grafana.sidecar.dashboards.enabled"?: string;
  "grafana.sidecar.dashboards.label"?: string;
  "grafana.sidecar.dashboards.labelValue"?: string;
  "grafana.sidecar.dashboards.searchNamespace"?: string;
  "grafana.sidecar.dashboards.enableNewTablePanelSyntax"?: string;
  "grafana.sidecar.dashboards.multicluster.global.enabled"?: string;
  "grafana.sidecar.dashboards.multicluster.etcd.enabled"?: string;
  "grafana.sidecar.dashboards.provider.allowUiUpdates"?: string;
  "grafana.sidecar.datasources.enabled"?: string;
  "grafana.sidecar.datasources.defaultDatasourceEnabled"?: string;
  "grafana.sidecar.datasources.isDefaultDatasource"?: string;
  "grafana.sidecar.datasources.name"?: string;
  "grafana.sidecar.datasources.uid"?: string;
  "grafana.sidecar.datasources.httpMethod"?: string;
  "grafana.sidecar.datasources.createPrometheusReplicasDatasources"?: string;
  "grafana.sidecar.datasources.prometheusServiceName"?: string;
  "grafana.sidecar.datasources.label"?: string;
  "grafana.sidecar.datasources.labelValue"?: string;
  "grafana.sidecar.datasources.alertmanager.enabled"?: string;
  "grafana.sidecar.datasources.alertmanager.name"?: string;
  "grafana.sidecar.datasources.alertmanager.uid"?: string;
  "grafana.sidecar.datasources.alertmanager.handleGrafanaManagedAlerts"?: string;
  "grafana.sidecar.datasources.alertmanager.implementation"?: string;
  "grafana.extraConfigmapMounts"?: string;
  "grafana.deleteDatasources"?: string;
  "grafana.additionalDataSources"?: string;
  "grafana.prune"?: string;
  "grafana.service.portName"?: string;
  "grafana.service.ipFamilies"?: string;
  "grafana.service.ipFamilyPolicy"?: string;
  "grafana.serviceMonitor.enabled"?: string;
  "grafana.serviceMonitor.path"?: string;
  "grafana.serviceMonitor.interval"?: string;
  "grafana.serviceMonitor.scheme"?: string;
  "grafana.serviceMonitor.scrapeTimeout"?: string;
  "grafana.serviceMonitor.relabelings"?: string;
  "kubernetesServiceMonitors.enabled"?: string;
  "kubeApiServer.enabled"?: string;
  "kubeApiServer.tlsConfig.serverName"?: string;
  "kubeApiServer.tlsConfig.insecureSkipVerify"?: string;
  "kubeApiServer.serviceMonitor.enabled"?: string;
  "kubeApiServer.serviceMonitor.interval"?: string;
  "kubeApiServer.serviceMonitor.sampleLimit"?: string;
  "kubeApiServer.serviceMonitor.targetLimit"?: string;
  "kubeApiServer.serviceMonitor.labelLimit"?: string;
  "kubeApiServer.serviceMonitor.labelNameLengthLimit"?: string;
  "kubeApiServer.serviceMonitor.labelValueLengthLimit"?: string;
  "kubeApiServer.serviceMonitor.proxyUrl"?: string;
  "kubeApiServer.serviceMonitor.jobLabel"?: string;
  "kubeApiServer.serviceMonitor.selector.matchLabels.component"?: string;
  "kubeApiServer.serviceMonitor.selector.matchLabels.provider"?: string;
  "kubeApiServer.serviceMonitor.metricRelabelings.action"?: string;
  "kubeApiServer.serviceMonitor.metricRelabelings.regex"?: string;
  "kubeApiServer.serviceMonitor.metricRelabelings.sourceLabels"?: string;
  "kubeApiServer.serviceMonitor.relabelings"?: string;
  "kubeApiServer.serviceMonitor.targetLabels"?: string;
  "kubelet.enabled"?: string;
  "kubelet.namespace"?: string;
  "kubelet.serviceMonitor.enabled"?: string;
  "kubelet.serviceMonitor.kubelet"?: string;
  "kubelet.serviceMonitor.attachMetadata.node"?: string;
  "kubelet.serviceMonitor.interval"?: string;
  "kubelet.serviceMonitor.honorLabels"?: string;
  "kubelet.serviceMonitor.honorTimestamps"?: string;
  "kubelet.serviceMonitor.trackTimestampsStaleness"?: string;
  "kubelet.serviceMonitor.sampleLimit"?: string;
  "kubelet.serviceMonitor.targetLimit"?: string;
  "kubelet.serviceMonitor.labelLimit"?: string;
  "kubelet.serviceMonitor.labelNameLengthLimit"?: string;
  "kubelet.serviceMonitor.labelValueLengthLimit"?: string;
  "kubelet.serviceMonitor.proxyUrl"?: string;
  "kubelet.serviceMonitor.https"?: string;
  "kubelet.serviceMonitor.insecureSkipVerify"?: string;
  "kubelet.serviceMonitor.probes"?: string;
  "kubelet.serviceMonitor.resource"?: string;
  "kubelet.serviceMonitor.resourcePath"?: string;
  "kubelet.serviceMonitor.resourceInterval"?: string;
  "kubelet.serviceMonitor.cAdvisor"?: string;
  "kubelet.serviceMonitor.cAdvisorInterval"?: string;
  "kubelet.serviceMonitor.cAdvisorMetricRelabelings.sourceLabels"?: string;
  "kubelet.serviceMonitor.cAdvisorMetricRelabelings.action"?: string;
  "kubelet.serviceMonitor.cAdvisorMetricRelabelings.regex"?: string;
  "kubelet.serviceMonitor.probesMetricRelabelings"?: string;
  "kubelet.serviceMonitor.cAdvisorRelabelings.action"?: string;
  "kubelet.serviceMonitor.cAdvisorRelabelings.sourceLabels"?: string;
  "kubelet.serviceMonitor.cAdvisorRelabelings.targetLabel"?: string;
  "kubelet.serviceMonitor.probesRelabelings.action"?: string;
  "kubelet.serviceMonitor.probesRelabelings.sourceLabels"?: string;
  "kubelet.serviceMonitor.probesRelabelings.targetLabel"?: string;
  "kubelet.serviceMonitor.resourceRelabelings.action"?: string;
  "kubelet.serviceMonitor.resourceRelabelings.sourceLabels"?: string;
  "kubelet.serviceMonitor.resourceRelabelings.targetLabel"?: string;
  "kubelet.serviceMonitor.metricRelabelings.action"?: string;
  "kubelet.serviceMonitor.metricRelabelings.sourceLabels"?: string;
  "kubelet.serviceMonitor.metricRelabelings.regex"?: string;
  "kubelet.serviceMonitor.relabelings.action"?: string;
  "kubelet.serviceMonitor.relabelings.sourceLabels"?: string;
  "kubelet.serviceMonitor.relabelings.targetLabel"?: string;
  "kubelet.serviceMonitor.targetLabels"?: string;
  "kubeControllerManager.enabled"?: string;
  "kubeControllerManager.endpoints"?: string;
  "kubeControllerManager.service.enabled"?: string;
  "kubeControllerManager.service.port"?: string;
  "kubeControllerManager.service.targetPort"?: string;
  "kubeControllerManager.service.ipDualStack.enabled"?: string;
  "kubeControllerManager.service.ipDualStack.ipFamilies"?: string;
  "kubeControllerManager.service.ipDualStack.ipFamilyPolicy"?: string;
  "kubeControllerManager.serviceMonitor.enabled"?: string;
  "kubeControllerManager.serviceMonitor.interval"?: string;
  "kubeControllerManager.serviceMonitor.sampleLimit"?: string;
  "kubeControllerManager.serviceMonitor.targetLimit"?: string;
  "kubeControllerManager.serviceMonitor.labelLimit"?: string;
  "kubeControllerManager.serviceMonitor.labelNameLengthLimit"?: string;
  "kubeControllerManager.serviceMonitor.labelValueLengthLimit"?: string;
  "kubeControllerManager.serviceMonitor.proxyUrl"?: string;
  "kubeControllerManager.serviceMonitor.port"?: string;
  "kubeControllerManager.serviceMonitor.jobLabel"?: string;
  "kubeControllerManager.serviceMonitor.https"?: string;
  "kubeControllerManager.serviceMonitor.insecureSkipVerify"?: string;
  "kubeControllerManager.serviceMonitor.serverName"?: string;
  "kubeControllerManager.serviceMonitor.metricRelabelings"?: string;
  "kubeControllerManager.serviceMonitor.relabelings"?: string;
  "kubeControllerManager.serviceMonitor.targetLabels"?: string;
  "coreDns.enabled"?: string;
  "coreDns.service.enabled"?: string;
  "coreDns.service.port"?: string;
  "coreDns.service.targetPort"?: string;
  "coreDns.service.ipDualStack.enabled"?: string;
  "coreDns.service.ipDualStack.ipFamilies"?: string;
  "coreDns.service.ipDualStack.ipFamilyPolicy"?: string;
  "coreDns.serviceMonitor.enabled"?: string;
  "coreDns.serviceMonitor.interval"?: string;
  "coreDns.serviceMonitor.sampleLimit"?: string;
  "coreDns.serviceMonitor.targetLimit"?: string;
  "coreDns.serviceMonitor.labelLimit"?: string;
  "coreDns.serviceMonitor.labelNameLengthLimit"?: string;
  "coreDns.serviceMonitor.labelValueLengthLimit"?: string;
  "coreDns.serviceMonitor.proxyUrl"?: string;
  "coreDns.serviceMonitor.port"?: string;
  "coreDns.serviceMonitor.jobLabel"?: string;
  "coreDns.serviceMonitor.metricRelabelings"?: string;
  "coreDns.serviceMonitor.relabelings"?: string;
  "coreDns.serviceMonitor.targetLabels"?: string;
  "kubeDns.enabled"?: string;
  "kubeDns.service.dnsmasq.port"?: string;
  "kubeDns.service.dnsmasq.targetPort"?: string;
  "kubeDns.service.skydns.port"?: string;
  "kubeDns.service.skydns.targetPort"?: string;
  "kubeDns.service.ipDualStack.enabled"?: string;
  "kubeDns.service.ipDualStack.ipFamilies"?: string;
  "kubeDns.service.ipDualStack.ipFamilyPolicy"?: string;
  "kubeDns.serviceMonitor.interval"?: string;
  "kubeDns.serviceMonitor.sampleLimit"?: string;
  "kubeDns.serviceMonitor.targetLimit"?: string;
  "kubeDns.serviceMonitor.labelLimit"?: string;
  "kubeDns.serviceMonitor.labelNameLengthLimit"?: string;
  "kubeDns.serviceMonitor.labelValueLengthLimit"?: string;
  "kubeDns.serviceMonitor.proxyUrl"?: string;
  "kubeDns.serviceMonitor.jobLabel"?: string;
  "kubeDns.serviceMonitor.metricRelabelings"?: string;
  "kubeDns.serviceMonitor.relabelings"?: string;
  "kubeDns.serviceMonitor.dnsmasqMetricRelabelings"?: string;
  "kubeDns.serviceMonitor.dnsmasqRelabelings"?: string;
  "kubeDns.serviceMonitor.targetLabels"?: string;
  "kubeEtcd.enabled"?: string;
  "kubeEtcd.endpoints"?: string;
  "kubeEtcd.service.enabled"?: string;
  "kubeEtcd.service.port"?: string;
  "kubeEtcd.service.targetPort"?: string;
  "kubeEtcd.service.ipDualStack.enabled"?: string;
  "kubeEtcd.service.ipDualStack.ipFamilies"?: string;
  "kubeEtcd.service.ipDualStack.ipFamilyPolicy"?: string;
  "kubeEtcd.serviceMonitor.enabled"?: string;
  "kubeEtcd.serviceMonitor.interval"?: string;
  "kubeEtcd.serviceMonitor.sampleLimit"?: string;
  "kubeEtcd.serviceMonitor.targetLimit"?: string;
  "kubeEtcd.serviceMonitor.labelLimit"?: string;
  "kubeEtcd.serviceMonitor.labelNameLengthLimit"?: string;
  "kubeEtcd.serviceMonitor.labelValueLengthLimit"?: string;
  "kubeEtcd.serviceMonitor.proxyUrl"?: string;
  "kubeEtcd.serviceMonitor.scheme"?: string;
  "kubeEtcd.serviceMonitor.insecureSkipVerify"?: string;
  "kubeEtcd.serviceMonitor.serverName"?: string;
  "kubeEtcd.serviceMonitor.caFile"?: string;
  "kubeEtcd.serviceMonitor.certFile"?: string;
  "kubeEtcd.serviceMonitor.keyFile"?: string;
  "kubeEtcd.serviceMonitor.port"?: string;
  "kubeEtcd.serviceMonitor.jobLabel"?: string;
  "kubeEtcd.serviceMonitor.metricRelabelings"?: string;
  "kubeEtcd.serviceMonitor.relabelings"?: string;
  "kubeEtcd.serviceMonitor.targetLabels"?: string;
  "kubeScheduler.enabled"?: string;
  "kubeScheduler.endpoints"?: string;
  "kubeScheduler.service.enabled"?: string;
  "kubeScheduler.service.port"?: string;
  "kubeScheduler.service.targetPort"?: string;
  "kubeScheduler.service.ipDualStack.enabled"?: string;
  "kubeScheduler.service.ipDualStack.ipFamilies"?: string;
  "kubeScheduler.service.ipDualStack.ipFamilyPolicy"?: string;
  "kubeScheduler.serviceMonitor.enabled"?: string;
  "kubeScheduler.serviceMonitor.interval"?: string;
  "kubeScheduler.serviceMonitor.sampleLimit"?: string;
  "kubeScheduler.serviceMonitor.targetLimit"?: string;
  "kubeScheduler.serviceMonitor.labelLimit"?: string;
  "kubeScheduler.serviceMonitor.labelNameLengthLimit"?: string;
  "kubeScheduler.serviceMonitor.labelValueLengthLimit"?: string;
  "kubeScheduler.serviceMonitor.proxyUrl"?: string;
  "kubeScheduler.serviceMonitor.https"?: string;
  "kubeScheduler.serviceMonitor.port"?: string;
  "kubeScheduler.serviceMonitor.jobLabel"?: string;
  "kubeScheduler.serviceMonitor.insecureSkipVerify"?: string;
  "kubeScheduler.serviceMonitor.serverName"?: string;
  "kubeScheduler.serviceMonitor.metricRelabelings"?: string;
  "kubeScheduler.serviceMonitor.relabelings"?: string;
  "kubeScheduler.serviceMonitor.targetLabels"?: string;
  "kubeProxy.enabled"?: string;
  "kubeProxy.endpoints"?: string;
  "kubeProxy.service.enabled"?: string;
  "kubeProxy.service.port"?: string;
  "kubeProxy.service.targetPort"?: string;
  "kubeProxy.service.ipDualStack.enabled"?: string;
  "kubeProxy.service.ipDualStack.ipFamilies"?: string;
  "kubeProxy.service.ipDualStack.ipFamilyPolicy"?: string;
  "kubeProxy.serviceMonitor.enabled"?: string;
  "kubeProxy.serviceMonitor.interval"?: string;
  "kubeProxy.serviceMonitor.sampleLimit"?: string;
  "kubeProxy.serviceMonitor.targetLimit"?: string;
  "kubeProxy.serviceMonitor.labelLimit"?: string;
  "kubeProxy.serviceMonitor.labelNameLengthLimit"?: string;
  "kubeProxy.serviceMonitor.labelValueLengthLimit"?: string;
  "kubeProxy.serviceMonitor.proxyUrl"?: string;
  "kubeProxy.serviceMonitor.port"?: string;
  "kubeProxy.serviceMonitor.jobLabel"?: string;
  "kubeProxy.serviceMonitor.https"?: string;
  "kubeProxy.serviceMonitor.metricRelabelings"?: string;
  "kubeProxy.serviceMonitor.relabelings"?: string;
  "kubeProxy.serviceMonitor.targetLabels"?: string;
  "kubeStateMetrics.enabled"?: string;
  "kube-state-metrics.namespaceOverride"?: string;
  "kube-state-metrics.rbac.create"?: string;
  "kube-state-metrics.releaseLabel"?: string;
  "kube-state-metrics.prometheusScrape"?: string;
  "kube-state-metrics.prometheus.monitor.enabled"?: string;
  "kube-state-metrics.prometheus.monitor.interval"?: string;
  "kube-state-metrics.prometheus.monitor.sampleLimit"?: string;
  "kube-state-metrics.prometheus.monitor.targetLimit"?: string;
  "kube-state-metrics.prometheus.monitor.labelLimit"?: string;
  "kube-state-metrics.prometheus.monitor.labelNameLengthLimit"?: string;
  "kube-state-metrics.prometheus.monitor.labelValueLengthLimit"?: string;
  "kube-state-metrics.prometheus.monitor.scrapeTimeout"?: string;
  "kube-state-metrics.prometheus.monitor.proxyUrl"?: string;
  "kube-state-metrics.prometheus.monitor.honorLabels"?: string;
  "kube-state-metrics.prometheus.monitor.metricRelabelings"?: string;
  "kube-state-metrics.prometheus.monitor.relabelings"?: string;
  "kube-state-metrics.selfMonitor.enabled"?: string;
  "nodeExporter.enabled"?: string;
  "nodeExporter.operatingSystems.linux.enabled"?: string;
  "nodeExporter.operatingSystems.aix.enabled"?: string;
  "nodeExporter.operatingSystems.darwin.enabled"?: string;
  "nodeExporter.forceDeployDashboards"?: string;
  "prometheus-node-exporter.namespaceOverride"?: string;
  "prometheus-node-exporter.podLabels.jobLabel"?: string;
  "prometheus-node-exporter.releaseLabel"?: string;
  "prometheus-node-exporter.extraArgs"?: string;
  "prometheus-node-exporter.service.portName"?: string;
  "prometheus-node-exporter.service.ipDualStack.enabled"?: string;
  "prometheus-node-exporter.service.ipDualStack.ipFamilies"?: string;
  "prometheus-node-exporter.service.ipDualStack.ipFamilyPolicy"?: string;
  "prometheus-node-exporter.service.labels.jobLabel"?: string;
  "prometheus-node-exporter.prometheus.monitor.enabled"?: string;
  "prometheus-node-exporter.prometheus.monitor.jobLabel"?: string;
  "prometheus-node-exporter.prometheus.monitor.interval"?: string;
  "prometheus-node-exporter.prometheus.monitor.sampleLimit"?: string;
  "prometheus-node-exporter.prometheus.monitor.targetLimit"?: string;
  "prometheus-node-exporter.prometheus.monitor.labelLimit"?: string;
  "prometheus-node-exporter.prometheus.monitor.labelNameLengthLimit"?: string;
  "prometheus-node-exporter.prometheus.monitor.labelValueLengthLimit"?: string;
  "prometheus-node-exporter.prometheus.monitor.scrapeTimeout"?: string;
  "prometheus-node-exporter.prometheus.monitor.proxyUrl"?: string;
  "prometheus-node-exporter.prometheus.monitor.metricRelabelings"?: string;
  "prometheus-node-exporter.prometheus.monitor.relabelings"?: string;
  "prometheus-node-exporter.rbac.pspEnabled"?: string;
  "prometheusOperator.enabled"?: string;
  "prometheusOperator.fullnameOverride"?: string;
  "prometheusOperator.revisionHistoryLimit"?: string;
  "prometheusOperator.tls.enabled"?: string;
  "prometheusOperator.tls.tlsMinVersion"?: string;
  "prometheusOperator.tls.internalPort"?: string;
  "prometheusOperator.livenessProbe.enabled"?: string;
  "prometheusOperator.livenessProbe.failureThreshold"?: string;
  "prometheusOperator.livenessProbe.initialDelaySeconds"?: string;
  "prometheusOperator.livenessProbe.periodSeconds"?: string;
  "prometheusOperator.livenessProbe.successThreshold"?: string;
  "prometheusOperator.livenessProbe.timeoutSeconds"?: string;
  "prometheusOperator.readinessProbe.enabled"?: string;
  "prometheusOperator.readinessProbe.failureThreshold"?: string;
  "prometheusOperator.readinessProbe.initialDelaySeconds"?: string;
  "prometheusOperator.readinessProbe.periodSeconds"?: string;
  "prometheusOperator.readinessProbe.successThreshold"?: string;
  "prometheusOperator.readinessProbe.timeoutSeconds"?: string;
  "prometheusOperator.admissionWebhooks.failurePolicy"?: string;
  "prometheusOperator.admissionWebhooks.timeoutSeconds"?: string;
  "prometheusOperator.admissionWebhooks.enabled"?: string;
  "prometheusOperator.admissionWebhooks.caBundle"?: string;
  "prometheusOperator.admissionWebhooks.deployment.enabled"?: string;
  "prometheusOperator.admissionWebhooks.deployment.replicas"?: string;
  "prometheusOperator.admissionWebhooks.deployment.podDisruptionBudget.enabled"?: string;
  "prometheusOperator.admissionWebhooks.deployment.podDisruptionBudget.minAvailable"?: string;
  "prometheusOperator.admissionWebhooks.deployment.podDisruptionBudget.unhealthyPodEvictionPolicy"?: string;
  "prometheusOperator.admissionWebhooks.deployment.revisionHistoryLimit"?: string;
  "prometheusOperator.admissionWebhooks.deployment.tls.enabled"?: string;
  "prometheusOperator.admissionWebhooks.deployment.tls.tlsMinVersion"?: string;
  "prometheusOperator.admissionWebhooks.deployment.tls.internalPort"?: string;
  "prometheusOperator.admissionWebhooks.deployment.serviceAccount.automountServiceAccountToken"?: string;
  "prometheusOperator.admissionWebhooks.deployment.serviceAccount.create"?: string;
  "prometheusOperator.admissionWebhooks.deployment.serviceAccount.name"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.clusterIP"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.ipDualStack.enabled"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.ipDualStack.ipFamilies"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.ipDualStack.ipFamilyPolicy"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.nodePort"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.nodePortTls"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.additionalPorts"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.loadBalancerIP"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.loadBalancerSourceRanges"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.externalTrafficPolicy"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.type"?: string;
  "prometheusOperator.admissionWebhooks.deployment.service.externalIPs"?: string;
  "prometheusOperator.admissionWebhooks.deployment.image.registry"?: string;
  "prometheusOperator.admissionWebhooks.deployment.image.repository"?: string;
  "prometheusOperator.admissionWebhooks.deployment.image.tag"?: string;
  "prometheusOperator.admissionWebhooks.deployment.image.sha"?: string;
  "prometheusOperator.admissionWebhooks.deployment.image.pullPolicy"?: string;
  "prometheusOperator.admissionWebhooks.deployment.livenessProbe.enabled"?: string;
  "prometheusOperator.admissionWebhooks.deployment.livenessProbe.failureThreshold"?: string;
  "prometheusOperator.admissionWebhooks.deployment.livenessProbe.initialDelaySeconds"?: string;
  "prometheusOperator.admissionWebhooks.deployment.livenessProbe.periodSeconds"?: string;
  "prometheusOperator.admissionWebhooks.deployment.livenessProbe.successThreshold"?: string;
  "prometheusOperator.admissionWebhooks.deployment.livenessProbe.timeoutSeconds"?: string;
  "prometheusOperator.admissionWebhooks.deployment.readinessProbe.enabled"?: string;
  "prometheusOperator.admissionWebhooks.deployment.readinessProbe.failureThreshold"?: string;
  "prometheusOperator.admissionWebhooks.deployment.readinessProbe.initialDelaySeconds"?: string;
  "prometheusOperator.admissionWebhooks.deployment.readinessProbe.periodSeconds"?: string;
  "prometheusOperator.admissionWebhooks.deployment.readinessProbe.successThreshold"?: string;
  "prometheusOperator.admissionWebhooks.deployment.readinessProbe.timeoutSeconds"?: string;
  "prometheusOperator.admissionWebhooks.deployment.hostNetwork"?: string;
  "prometheusOperator.admissionWebhooks.deployment.tolerations"?: string;
  "prometheusOperator.admissionWebhooks.deployment.securityContext.fsGroup"?: string;
  "prometheusOperator.admissionWebhooks.deployment.securityContext.runAsGroup"?: string;
  "prometheusOperator.admissionWebhooks.deployment.securityContext.runAsNonRoot"?: string;
  "prometheusOperator.admissionWebhooks.deployment.securityContext.runAsUser"?: string;
  "prometheusOperator.admissionWebhooks.deployment.securityContext.seccompProfile.type"?: string;
  "prometheusOperator.admissionWebhooks.deployment.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "prometheusOperator.admissionWebhooks.deployment.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "prometheusOperator.admissionWebhooks.deployment.containerSecurityContext.capabilities.drop"?: string;
  "prometheusOperator.admissionWebhooks.deployment.automountServiceAccountToken"?: string;
  "prometheusOperator.admissionWebhooks.patch.enabled"?: string;
  "prometheusOperator.admissionWebhooks.patch.image.registry"?: string;
  "prometheusOperator.admissionWebhooks.patch.image.repository"?: string;
  "prometheusOperator.admissionWebhooks.patch.image.tag"?: string;
  "prometheusOperator.admissionWebhooks.patch.image.sha"?: string;
  "prometheusOperator.admissionWebhooks.patch.image.pullPolicy"?: string;
  "prometheusOperator.admissionWebhooks.patch.priorityClassName"?: string;
  "prometheusOperator.admissionWebhooks.patch.ttlSecondsAfterFinished"?: string;
  "prometheusOperator.admissionWebhooks.patch.tolerations"?: string;
  "prometheusOperator.admissionWebhooks.patch.securityContext.runAsGroup"?: string;
  "prometheusOperator.admissionWebhooks.patch.securityContext.runAsNonRoot"?: string;
  "prometheusOperator.admissionWebhooks.patch.securityContext.runAsUser"?: string;
  "prometheusOperator.admissionWebhooks.patch.securityContext.seccompProfile.type"?: string;
  "prometheusOperator.admissionWebhooks.patch.serviceAccount.create"?: string;
  "prometheusOperator.admissionWebhooks.patch.serviceAccount.automountServiceAccountToken"?: string;
  "prometheusOperator.admissionWebhooks.createSecretJob.securityContext.allowPrivilegeEscalation"?: string;
  "prometheusOperator.admissionWebhooks.createSecretJob.securityContext.readOnlyRootFilesystem"?: string;
  "prometheusOperator.admissionWebhooks.createSecretJob.securityContext.capabilities.drop"?: string;
  "prometheusOperator.admissionWebhooks.patchWebhookJob.securityContext.allowPrivilegeEscalation"?: string;
  "prometheusOperator.admissionWebhooks.patchWebhookJob.securityContext.readOnlyRootFilesystem"?: string;
  "prometheusOperator.admissionWebhooks.patchWebhookJob.securityContext.capabilities.drop"?: string;
  "prometheusOperator.admissionWebhooks.certManager.enabled"?: string;
  "prometheusOperator.admissionWebhooks.certManager.rootCert.duration"?: string;
  "prometheusOperator.admissionWebhooks.certManager.rootCert.revisionHistoryLimit"?: string;
  "prometheusOperator.admissionWebhooks.certManager.admissionCert.duration"?: string;
  "prometheusOperator.admissionWebhooks.certManager.admissionCert.revisionHistoryLimit"?: string;
  "prometheusOperator.denyNamespaces"?: string;
  "prometheusOperator.alertmanagerInstanceNamespaces"?: string;
  "prometheusOperator.alertmanagerConfigNamespaces"?: string;
  "prometheusOperator.prometheusInstanceNamespaces"?: string;
  "prometheusOperator.thanosRulerInstanceNamespaces"?: string;
  "prometheusOperator.networkPolicy.enabled"?: string;
  "prometheusOperator.networkPolicy.flavor"?: string;
  "prometheusOperator.serviceAccount.create"?: string;
  "prometheusOperator.serviceAccount.name"?: string;
  "prometheusOperator.serviceAccount.automountServiceAccountToken"?: string;
  "prometheusOperator.terminationGracePeriodSeconds"?: string;
  "prometheusOperator.service.clusterIP"?: string;
  "prometheusOperator.service.ipDualStack.enabled"?: string;
  "prometheusOperator.service.ipDualStack.ipFamilies"?: string;
  "prometheusOperator.service.ipDualStack.ipFamilyPolicy"?: string;
  "prometheusOperator.service.nodePort"?: string;
  "prometheusOperator.service.nodePortTls"?: string;
  "prometheusOperator.service.additionalPorts"?: string;
  "prometheusOperator.service.loadBalancerIP"?: string;
  "prometheusOperator.service.loadBalancerSourceRanges"?: string;
  "prometheusOperator.service.externalTrafficPolicy"?: string;
  "prometheusOperator.service.type"?: string;
  "prometheusOperator.service.externalIPs"?: string;
  "prometheusOperator.podDisruptionBudget.enabled"?: string;
  "prometheusOperator.podDisruptionBudget.minAvailable"?: string;
  "prometheusOperator.podDisruptionBudget.unhealthyPodEvictionPolicy"?: string;
  "prometheusOperator.kubeletService.enabled"?: string;
  "prometheusOperator.kubeletService.namespace"?: string;
  "prometheusOperator.kubeletService.selector"?: string;
  "prometheusOperator.kubeletService.name"?: string;
  "prometheusOperator.kubeletEndpointsEnabled"?: string;
  "prometheusOperator.kubeletEndpointSliceEnabled"?: string;
  "prometheusOperator.extraArgs"?: string;
  "prometheusOperator.serviceMonitor.selfMonitor"?: string;
  "prometheusOperator.serviceMonitor.interval"?: string;
  "prometheusOperator.serviceMonitor.sampleLimit"?: string;
  "prometheusOperator.serviceMonitor.targetLimit"?: string;
  "prometheusOperator.serviceMonitor.labelLimit"?: string;
  "prometheusOperator.serviceMonitor.labelNameLengthLimit"?: string;
  "prometheusOperator.serviceMonitor.labelValueLengthLimit"?: string;
  "prometheusOperator.serviceMonitor.scrapeTimeout"?: string;
  "prometheusOperator.serviceMonitor.metricRelabelings"?: string;
  "prometheusOperator.serviceMonitor.relabelings"?: string;
  "prometheusOperator.env.GOGC"?: string;
  "prometheusOperator.hostNetwork"?: string;
  "prometheusOperator.tolerations"?: string;
  "prometheusOperator.securityContext.fsGroup"?: string;
  "prometheusOperator.securityContext.runAsGroup"?: string;
  "prometheusOperator.securityContext.runAsNonRoot"?: string;
  "prometheusOperator.securityContext.runAsUser"?: string;
  "prometheusOperator.securityContext.seccompProfile.type"?: string;
  "prometheusOperator.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "prometheusOperator.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "prometheusOperator.containerSecurityContext.capabilities.drop"?: string;
  "prometheusOperator.verticalPodAutoscaler.enabled"?: string;
  "prometheusOperator.verticalPodAutoscaler.controlledResources"?: string;
  "prometheusOperator.verticalPodAutoscaler.updatePolicy.updateMode"?: string;
  "prometheusOperator.image.registry"?: string;
  "prometheusOperator.image.repository"?: string;
  "prometheusOperator.image.tag"?: string;
  "prometheusOperator.image.sha"?: string;
  "prometheusOperator.image.pullPolicy"?: string;
  "prometheusOperator.prometheusConfigReloader.image.registry"?: string;
  "prometheusOperator.prometheusConfigReloader.image.repository"?: string;
  "prometheusOperator.prometheusConfigReloader.image.tag"?: string;
  "prometheusOperator.prometheusConfigReloader.image.sha"?: string;
  "prometheusOperator.prometheusConfigReloader.enableProbe"?: string;
  "prometheusOperator.thanosImage.registry"?: string;
  "prometheusOperator.thanosImage.repository"?: string;
  "prometheusOperator.thanosImage.tag"?: string;
  "prometheusOperator.thanosImage.sha"?: string;
  "prometheusOperator.prometheusInstanceSelector"?: string;
  "prometheusOperator.alertmanagerInstanceSelector"?: string;
  "prometheusOperator.thanosRulerInstanceSelector"?: string;
  "prometheusOperator.secretFieldSelector"?: string;
  "prometheusOperator.automountServiceAccountToken"?: string;
  "prometheusOperator.extraVolumes"?: string;
  "prometheusOperator.extraVolumeMounts"?: string;
  "prometheus.enabled"?: string;
  "prometheus.agentMode"?: string;
  "prometheus.networkPolicy.enabled"?: string;
  "prometheus.networkPolicy.flavor"?: string;
  "prometheus.serviceAccount.create"?: string;
  "prometheus.serviceAccount.name"?: string;
  "prometheus.serviceAccount.automountServiceAccountToken"?: string;
  "prometheus.thanosService.enabled"?: string;
  "prometheus.thanosService.externalTrafficPolicy"?: string;
  "prometheus.thanosService.type"?: string;
  "prometheus.thanosService.ipDualStack.enabled"?: string;
  "prometheus.thanosService.ipDualStack.ipFamilies"?: string;
  "prometheus.thanosService.ipDualStack.ipFamilyPolicy"?: string;
  "prometheus.thanosService.portName"?: string;
  "prometheus.thanosService.port"?: string;
  "prometheus.thanosService.targetPort"?: string;
  "prometheus.thanosService.httpPortName"?: string;
  "prometheus.thanosService.httpPort"?: string;
  "prometheus.thanosService.targetHttpPort"?: string;
  "prometheus.thanosService.clusterIP"?: string;
  "prometheus.thanosService.nodePort"?: string;
  "prometheus.thanosService.httpNodePort"?: string;
  "prometheus.thanosServiceMonitor.enabled"?: string;
  "prometheus.thanosServiceMonitor.interval"?: string;
  "prometheus.thanosServiceMonitor.scheme"?: string;
  "prometheus.thanosServiceMonitor.bearerTokenFile"?: string;
  "prometheus.thanosServiceMonitor.metricRelabelings"?: string;
  "prometheus.thanosServiceMonitor.relabelings"?: string;
  "prometheus.thanosServiceExternal.enabled"?: string;
  "prometheus.thanosServiceExternal.loadBalancerIP"?: string;
  "prometheus.thanosServiceExternal.loadBalancerSourceRanges"?: string;
  "prometheus.thanosServiceExternal.portName"?: string;
  "prometheus.thanosServiceExternal.port"?: string;
  "prometheus.thanosServiceExternal.targetPort"?: string;
  "prometheus.thanosServiceExternal.httpPortName"?: string;
  "prometheus.thanosServiceExternal.httpPort"?: string;
  "prometheus.thanosServiceExternal.targetHttpPort"?: string;
  "prometheus.thanosServiceExternal.externalTrafficPolicy"?: string;
  "prometheus.thanosServiceExternal.type"?: string;
  "prometheus.thanosServiceExternal.nodePort"?: string;
  "prometheus.thanosServiceExternal.httpNodePort"?: string;
  "prometheus.service.enabled"?: string;
  "prometheus.service.clusterIP"?: string;
  "prometheus.service.ipDualStack.enabled"?: string;
  "prometheus.service.ipDualStack.ipFamilies"?: string;
  "prometheus.service.ipDualStack.ipFamilyPolicy"?: string;
  "prometheus.service.port"?: string;
  "prometheus.service.targetPort"?: string;
  "prometheus.service.reloaderWebPort"?: string;
  "prometheus.service.externalIPs"?: string;
  "prometheus.service.nodePort"?: string;
  "prometheus.service.loadBalancerIP"?: string;
  "prometheus.service.loadBalancerSourceRanges"?: string;
  "prometheus.service.externalTrafficPolicy"?: string;
  "prometheus.service.type"?: string;
  "prometheus.service.additionalPorts"?: string;
  "prometheus.service.publishNotReadyAddresses"?: string;
  "prometheus.service.sessionAffinity"?: string;
  "prometheus.service.sessionAffinityConfig.clientIP.timeoutSeconds"?: string;
  "prometheus.servicePerReplica.enabled"?: string;
  "prometheus.servicePerReplica.port"?: string;
  "prometheus.servicePerReplica.targetPort"?: string;
  "prometheus.servicePerReplica.nodePort"?: string;
  "prometheus.servicePerReplica.loadBalancerSourceRanges"?: string;
  "prometheus.servicePerReplica.externalTrafficPolicy"?: string;
  "prometheus.servicePerReplica.type"?: string;
  "prometheus.servicePerReplica.ipDualStack.enabled"?: string;
  "prometheus.servicePerReplica.ipDualStack.ipFamilies"?: string;
  "prometheus.servicePerReplica.ipDualStack.ipFamilyPolicy"?: string;
  "prometheus.podDisruptionBudget.enabled"?: string;
  "prometheus.podDisruptionBudget.minAvailable"?: string;
  "prometheus.podDisruptionBudget.unhealthyPodEvictionPolicy"?: string;
  "prometheus.thanosIngress.enabled"?: string;
  "prometheus.thanosIngress.ingressClassName"?: string;
  "prometheus.thanosIngress.servicePort"?: string;
  "prometheus.thanosIngress.nodePort"?: string;
  "prometheus.thanosIngress.hosts"?: string;
  "prometheus.thanosIngress.paths"?: string;
  "prometheus.thanosIngress.tls"?: string;
  "prometheus.ingress.enabled"?: string;
  "prometheus.ingress.ingressClassName"?: string;
  "prometheus.ingress.hosts"?: string;
  "prometheus.ingress.paths"?: string;
  "prometheus.ingress.tls"?: string;
  "prometheus.route.main.enabled"?: string;
  "prometheus.route.main.apiVersion"?: string;
  "prometheus.route.main.kind"?: string;
  "prometheus.route.main.hostnames"?: string;
  "prometheus.route.main.parentRefs"?: string;
  "prometheus.route.main.httpsRedirect"?: string;
  "prometheus.route.main.matches.path.type"?: string;
  "prometheus.route.main.matches.path.value"?: string;
  "prometheus.route.main.filters"?: string;
  "prometheus.route.main.additionalRules"?: string;
  "prometheus.ingressPerReplica.enabled"?: string;
  "prometheus.ingressPerReplica.ingressClassName"?: string;
  "prometheus.ingressPerReplica.hostPrefix"?: string;
  "prometheus.ingressPerReplica.hostDomain"?: string;
  "prometheus.ingressPerReplica.paths"?: string;
  "prometheus.ingressPerReplica.tlsSecretName"?: string;
  "prometheus.ingressPerReplica.tlsSecretPerReplica.enabled"?: string;
  "prometheus.ingressPerReplica.tlsSecretPerReplica.prefix"?: string;
  "prometheus.serviceMonitor.selfMonitor"?: string;
  "prometheus.serviceMonitor.interval"?: string;
  "prometheus.serviceMonitor.sampleLimit"?: string;
  "prometheus.serviceMonitor.targetLimit"?: string;
  "prometheus.serviceMonitor.labelLimit"?: string;
  "prometheus.serviceMonitor.labelNameLengthLimit"?: string;
  "prometheus.serviceMonitor.labelValueLengthLimit"?: string;
  "prometheus.serviceMonitor.scheme"?: string;
  "prometheus.serviceMonitor.bearerTokenFile"?: string;
  "prometheus.serviceMonitor.metricRelabelings"?: string;
  "prometheus.serviceMonitor.relabelings"?: string;
  "prometheus.serviceMonitor.additionalEndpoints"?: string;
  "prometheus.prometheusSpec.disableCompaction"?: string;
  "prometheus.prometheusSpec.automountServiceAccountToken"?: string;
  "prometheus.prometheusSpec.additionalArgs"?: string;
  "prometheus.prometheusSpec.scrapeFailureLogFile"?: string;
  "prometheus.prometheusSpec.scrapeInterval"?: string;
  "prometheus.prometheusSpec.scrapeTimeout"?: string;
  "prometheus.prometheusSpec.scrapeClasses"?: string;
  "prometheus.prometheusSpec.podTargetLabels"?: string;
  "prometheus.prometheusSpec.evaluationInterval"?: string;
  "prometheus.prometheusSpec.listenLocal"?: string;
  "prometheus.prometheusSpec.enableOTLPReceiver"?: string;
  "prometheus.prometheusSpec.enableAdminAPI"?: string;
  "prometheus.prometheusSpec.version"?: string;
  "prometheus.prometheusSpec.enableFeatures"?: string;
  "prometheus.prometheusSpec.serviceName"?: string;
  "prometheus.prometheusSpec.image.registry"?: string;
  "prometheus.prometheusSpec.image.repository"?: string;
  "prometheus.prometheusSpec.image.tag"?: string;
  "prometheus.prometheusSpec.image.sha"?: string;
  "prometheus.prometheusSpec.image.pullPolicy"?: string;
  "prometheus.prometheusSpec.tolerations"?: string;
  "prometheus.prometheusSpec.topologySpreadConstraints"?: string;
  "prometheus.prometheusSpec.alertingEndpoints"?: string;
  "prometheus.prometheusSpec.enableRemoteWriteReceiver"?: string;
  "prometheus.prometheusSpec.replicaExternalLabelName"?: string;
  "prometheus.prometheusSpec.replicaExternalLabelNameClear"?: string;
  "prometheus.prometheusSpec.prometheusExternalLabelName"?: string;
  "prometheus.prometheusSpec.prometheusExternalLabelNameClear"?: string;
  "prometheus.prometheusSpec.externalUrl"?: string;
  "prometheus.prometheusSpec.secrets"?: string;
  "prometheus.prometheusSpec.configMaps"?: string;
  "prometheus.prometheusSpec.ruleSelectorNilUsesHelmValues"?: string;
  "prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues"?: string;
  "prometheus.prometheusSpec.podMonitorSelectorNilUsesHelmValues"?: string;
  "prometheus.prometheusSpec.probeSelectorNilUsesHelmValues"?: string;
  "prometheus.prometheusSpec.scrapeConfigSelectorNilUsesHelmValues"?: string;
  "prometheus.prometheusSpec.retention"?: string;
  "prometheus.prometheusSpec.retentionSize"?: string;
  "prometheus.prometheusSpec.tsdb.outOfOrderTimeWindow"?: string;
  "prometheus.prometheusSpec.walCompression"?: string;
  "prometheus.prometheusSpec.paused"?: string;
  "prometheus.prometheusSpec.replicas"?: string;
  "prometheus.prometheusSpec.shards"?: string;
  "prometheus.prometheusSpec.logLevel"?: string;
  "prometheus.prometheusSpec.logFormat"?: string;
  "prometheus.prometheusSpec.routePrefix"?: string;
  "prometheus.prometheusSpec.podAntiAffinity"?: string;
  "prometheus.prometheusSpec.podAntiAffinityTopologyKey"?: string;
  "prometheus.prometheusSpec.remoteRead"?: string;
  "prometheus.prometheusSpec.additionalRemoteRead"?: string;
  "prometheus.prometheusSpec.remoteWrite"?: string;
  "prometheus.prometheusSpec.additionalRemoteWrite"?: string;
  "prometheus.prometheusSpec.remoteWriteDashboards"?: string;
  "prometheus.prometheusSpec.volumes"?: string;
  "prometheus.prometheusSpec.volumeMounts"?: string;
  "prometheus.prometheusSpec.additionalScrapeConfigs"?: string;
  "prometheus.prometheusSpec.additionalAlertManagerConfigs"?: string;
  "prometheus.prometheusSpec.additionalAlertRelabelConfigs"?: string;
  "prometheus.prometheusSpec.securityContext.runAsGroup"?: string;
  "prometheus.prometheusSpec.securityContext.runAsNonRoot"?: string;
  "prometheus.prometheusSpec.securityContext.runAsUser"?: string;
  "prometheus.prometheusSpec.securityContext.fsGroup"?: string;
  "prometheus.prometheusSpec.securityContext.seccompProfile.type"?: string;
  "prometheus.prometheusSpec.dnsPolicy"?: string;
  "prometheus.prometheusSpec.priorityClassName"?: string;
  "prometheus.prometheusSpec.containers"?: string;
  "prometheus.prometheusSpec.initContainers"?: string;
  "prometheus.prometheusSpec.portName"?: string;
  "prometheus.prometheusSpec.arbitraryFSAccessThroughSMs"?: string;
  "prometheus.prometheusSpec.overrideHonorLabels"?: string;
  "prometheus.prometheusSpec.overrideHonorTimestamps"?: string;
  "prometheus.prometheusSpec.ignoreNamespaceSelectors"?: string;
  "prometheus.prometheusSpec.enforcedNamespaceLabel"?: string;
  "prometheus.prometheusSpec.prometheusRulesExcludedFromEnforce"?: string;
  "prometheus.prometheusSpec.excludedFromEnforcement"?: string;
  "prometheus.prometheusSpec.queryLogFile"?: string;
  "prometheus.prometheusSpec.sampleLimit"?: string;
  "prometheus.prometheusSpec.enforcedKeepDroppedTargets"?: string;
  "prometheus.prometheusSpec.enforcedSampleLimit"?: string;
  "prometheus.prometheusSpec.enforcedTargetLimit"?: string;
  "prometheus.prometheusSpec.enforcedLabelLimit"?: string;
  "prometheus.prometheusSpec.enforcedLabelNameLengthLimit"?: string;
  "prometheus.prometheusSpec.enforcedLabelValueLengthLimit"?: string;
  "prometheus.prometheusSpec.allowOverlappingBlocks"?: string;
  "prometheus.prometheusSpec.nameValidationScheme"?: string;
  "prometheus.prometheusSpec.minReadySeconds"?: string;
  "prometheus.prometheusSpec.hostNetwork"?: string;
  "prometheus.prometheusSpec.hostAliases"?: string;
  "prometheus.prometheusSpec.serviceDiscoveryRole"?: string;
  "prometheus.prometheusSpec.additionalConfigString"?: string;
  "prometheus.prometheusSpec.maximumStartupDurationSeconds"?: string;
  "prometheus.prometheusSpec.scrapeProtocols"?: string;
  "prometheus.additionalRulesForClusterRole"?: string;
  "prometheus.additionalServiceMonitors"?: string;
  "prometheus.additionalPodMonitors"?: string;
  "thanosRuler.enabled"?: string;
  "thanosRuler.serviceAccount.create"?: string;
  "thanosRuler.serviceAccount.name"?: string;
  "thanosRuler.podDisruptionBudget.enabled"?: string;
  "thanosRuler.podDisruptionBudget.minAvailable"?: string;
  "thanosRuler.podDisruptionBudget.unhealthyPodEvictionPolicy"?: string;
  "thanosRuler.ingress.enabled"?: string;
  "thanosRuler.ingress.ingressClassName"?: string;
  "thanosRuler.ingress.hosts"?: string;
  "thanosRuler.ingress.paths"?: string;
  "thanosRuler.ingress.tls"?: string;
  "thanosRuler.route.main.enabled"?: string;
  "thanosRuler.route.main.apiVersion"?: string;
  "thanosRuler.route.main.kind"?: string;
  "thanosRuler.route.main.hostnames"?: string;
  "thanosRuler.route.main.parentRefs"?: string;
  "thanosRuler.route.main.httpsRedirect"?: string;
  "thanosRuler.route.main.matches.path.type"?: string;
  "thanosRuler.route.main.matches.path.value"?: string;
  "thanosRuler.route.main.filters"?: string;
  "thanosRuler.route.main.additionalRules"?: string;
  "thanosRuler.service.enabled"?: string;
  "thanosRuler.service.clusterIP"?: string;
  "thanosRuler.service.ipDualStack.enabled"?: string;
  "thanosRuler.service.ipDualStack.ipFamilies"?: string;
  "thanosRuler.service.ipDualStack.ipFamilyPolicy"?: string;
  "thanosRuler.service.port"?: string;
  "thanosRuler.service.targetPort"?: string;
  "thanosRuler.service.nodePort"?: string;
  "thanosRuler.service.additionalPorts"?: string;
  "thanosRuler.service.externalIPs"?: string;
  "thanosRuler.service.loadBalancerIP"?: string;
  "thanosRuler.service.loadBalancerSourceRanges"?: string;
  "thanosRuler.service.externalTrafficPolicy"?: string;
  "thanosRuler.service.type"?: string;
  "thanosRuler.serviceMonitor.selfMonitor"?: string;
  "thanosRuler.serviceMonitor.interval"?: string;
  "thanosRuler.serviceMonitor.sampleLimit"?: string;
  "thanosRuler.serviceMonitor.targetLimit"?: string;
  "thanosRuler.serviceMonitor.labelLimit"?: string;
  "thanosRuler.serviceMonitor.labelNameLengthLimit"?: string;
  "thanosRuler.serviceMonitor.labelValueLengthLimit"?: string;
  "thanosRuler.serviceMonitor.proxyUrl"?: string;
  "thanosRuler.serviceMonitor.scheme"?: string;
  "thanosRuler.serviceMonitor.bearerTokenFile"?: string;
  "thanosRuler.serviceMonitor.metricRelabelings"?: string;
  "thanosRuler.serviceMonitor.relabelings"?: string;
  "thanosRuler.serviceMonitor.additionalEndpoints"?: string;
  "thanosRuler.thanosRulerSpec.serviceName"?: string;
  "thanosRuler.thanosRulerSpec.image.registry"?: string;
  "thanosRuler.thanosRulerSpec.image.repository"?: string;
  "thanosRuler.thanosRulerSpec.image.tag"?: string;
  "thanosRuler.thanosRulerSpec.image.sha"?: string;
  "thanosRuler.thanosRulerSpec.ruleSelectorNilUsesHelmValues"?: string;
  "thanosRuler.thanosRulerSpec.logFormat"?: string;
  "thanosRuler.thanosRulerSpec.logLevel"?: string;
  "thanosRuler.thanosRulerSpec.replicas"?: string;
  "thanosRuler.thanosRulerSpec.retention"?: string;
  "thanosRuler.thanosRulerSpec.evaluationInterval"?: string;
  "thanosRuler.thanosRulerSpec.externalPrefix"?: string;
  "thanosRuler.thanosRulerSpec.externalPrefixNilUsesHelmValues"?: string;
  "thanosRuler.thanosRulerSpec.routePrefix"?: string;
  "thanosRuler.thanosRulerSpec.alertDropLabels"?: string;
  "thanosRuler.thanosRulerSpec.queryEndpoints"?: string;
  "thanosRuler.thanosRulerSpec.paused"?: string;
  "thanosRuler.thanosRulerSpec.additionalArgs"?: string;
  "thanosRuler.thanosRulerSpec.podAntiAffinity"?: string;
  "thanosRuler.thanosRulerSpec.podAntiAffinityTopologyKey"?: string;
  "thanosRuler.thanosRulerSpec.tolerations"?: string;
  "thanosRuler.thanosRulerSpec.topologySpreadConstraints"?: string;
  "thanosRuler.thanosRulerSpec.securityContext.runAsGroup"?: string;
  "thanosRuler.thanosRulerSpec.securityContext.runAsNonRoot"?: string;
  "thanosRuler.thanosRulerSpec.securityContext.runAsUser"?: string;
  "thanosRuler.thanosRulerSpec.securityContext.fsGroup"?: string;
  "thanosRuler.thanosRulerSpec.securityContext.seccompProfile.type"?: string;
  "thanosRuler.thanosRulerSpec.listenLocal"?: string;
  "thanosRuler.thanosRulerSpec.containers"?: string;
  "thanosRuler.thanosRulerSpec.volumes"?: string;
  "thanosRuler.thanosRulerSpec.volumeMounts"?: string;
  "thanosRuler.thanosRulerSpec.initContainers"?: string;
  "thanosRuler.thanosRulerSpec.priorityClassName"?: string;
  "thanosRuler.thanosRulerSpec.portName"?: string;
  "thanosRuler.thanosRulerSpec.additionalConfigString"?: string;
  cleanPrometheusOperatorObjectNames?: string;
  extraManifests?: string;
};
