// Generated TypeScript types for cert-manager Helm chart

export type CertmanagerHelmValuesGlobal = {
  imagePullSecrets?: unknown[];
  commonLabels?: CertmanagerHelmValuesGlobalCommonLabels;
  priorityClassName?: string;
  rbac?: CertmanagerHelmValuesGlobalRbac;
  podSecurityPolicy?: CertmanagerHelmValuesGlobalPodSecurityPolicy;
  logLevel?: number;
  leaderElection?: CertmanagerHelmValuesGlobalLeaderElection;
};

export type CertmanagerHelmValuesGlobalCommonLabels = object;

export type CertmanagerHelmValuesGlobalRbac = {
  create?: boolean;
  aggregateClusterRoles?: boolean;
};

export type CertmanagerHelmValuesGlobalPodSecurityPolicy = {
  enabled?: boolean;
  useAppArmor?: boolean;
};

export type CertmanagerHelmValuesGlobalLeaderElection = {
  namespace?: string;
};

export type CertmanagerHelmValuesCrds = {
  enabled?: boolean;
  keep?: boolean;
};

export type CertmanagerHelmValuesStrategy = object;

export type CertmanagerHelmValuesPodDisruptionBudget = {
  enabled?: boolean;
};

export type CertmanagerHelmValuesImage = {
  repository?: string;
  pullPolicy?: string;
};

export type CertmanagerHelmValuesServiceAccount = {
  create?: boolean;
  automountServiceAccountToken?: boolean;
};

export type CertmanagerHelmValuesConfig = object;

export type CertmanagerHelmValuesResources = object;

export type CertmanagerHelmValuesSecurityContext = {
  runAsNonRoot?: boolean;
  seccompProfile?: CertmanagerHelmValuesSecurityContextSeccompProfile;
};

export type CertmanagerHelmValuesSecurityContextSeccompProfile = {
  type?: string;
};

export type CertmanagerHelmValuesContainerSecurityContext = {
  allowPrivilegeEscalation?: boolean;
  capabilities?: CertmanagerHelmValuesContainerSecurityContextCapabilities;
  readOnlyRootFilesystem?: boolean;
};

export type CertmanagerHelmValuesContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type CertmanagerHelmValuesPodLabels = object;

export type CertmanagerHelmValuesNodeSelector = {
  "kubernetes.io/os"?: string;
};

export type CertmanagerHelmValuesIngressShim = object;

export type CertmanagerHelmValuesAffinity = object;

export type CertmanagerHelmValuesLivenessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type CertmanagerHelmValuesPrometheus = {
  enabled?: boolean;
  servicemonitor?: CertmanagerHelmValuesPrometheusServicemonitor;
  podmonitor?: CertmanagerHelmValuesPrometheusPodmonitor;
};

export type CertmanagerHelmValuesPrometheusServicemonitor = {
  enabled?: boolean;
  prometheusInstance?: string;
  targetPort?: string;
  path?: string;
  interval?: string;
  scrapeTimeout?: string;
  labels?: CertmanagerHelmValuesPrometheusServicemonitorLabels;
  annotations?: CertmanagerHelmValuesPrometheusServicemonitorAnnotations;
  honorLabels?: boolean;
  endpointAdditionalProperties?: CertmanagerHelmValuesPrometheusServicemonitorEndpointAdditionalProperties;
};

export type CertmanagerHelmValuesPrometheusServicemonitorLabels = object;

export type CertmanagerHelmValuesPrometheusServicemonitorAnnotations = object;

export type CertmanagerHelmValuesPrometheusServicemonitorEndpointAdditionalProperties =
  object;

export type CertmanagerHelmValuesPrometheusPodmonitor = {
  enabled?: boolean;
  prometheusInstance?: string;
  path?: string;
  interval?: string;
  scrapeTimeout?: string;
  labels?: CertmanagerHelmValuesPrometheusPodmonitorLabels;
  annotations?: CertmanagerHelmValuesPrometheusPodmonitorAnnotations;
  honorLabels?: boolean;
  endpointAdditionalProperties?: CertmanagerHelmValuesPrometheusPodmonitorEndpointAdditionalProperties;
};

export type CertmanagerHelmValuesPrometheusPodmonitorLabels = object;

export type CertmanagerHelmValuesPrometheusPodmonitorAnnotations = object;

export type CertmanagerHelmValuesPrometheusPodmonitorEndpointAdditionalProperties =
  object;

export type CertmanagerHelmValuesWebhook = {
  replicaCount?: number;
  timeoutSeconds?: number;
  config?: CertmanagerHelmValuesWebhookConfig;
  strategy?: CertmanagerHelmValuesWebhookStrategy;
  securityContext?: CertmanagerHelmValuesWebhookSecurityContext;
  containerSecurityContext?: CertmanagerHelmValuesWebhookContainerSecurityContext;
  podDisruptionBudget?: CertmanagerHelmValuesWebhookPodDisruptionBudget;
  validatingWebhookConfiguration?: CertmanagerHelmValuesWebhookValidatingWebhookConfiguration;
  mutatingWebhookConfiguration?: CertmanagerHelmValuesWebhookMutatingWebhookConfiguration;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  featureGates?: string;
  resources?: CertmanagerHelmValuesWebhookResources;
  livenessProbe?: CertmanagerHelmValuesWebhookLivenessProbe;
  readinessProbe?: CertmanagerHelmValuesWebhookReadinessProbe;
  nodeSelector?: CertmanagerHelmValuesWebhookNodeSelector;
  affinity?: CertmanagerHelmValuesWebhookAffinity;
  tolerations?: unknown[];
  topologySpreadConstraints?: unknown[];
  podLabels?: CertmanagerHelmValuesWebhookPodLabels;
  serviceLabels?: CertmanagerHelmValuesWebhookServiceLabels;
  serviceIPFamilyPolicy?: string;
  serviceIPFamilies?: unknown[];
  image?: CertmanagerHelmValuesWebhookImage;
  serviceAccount?: CertmanagerHelmValuesWebhookServiceAccount;
  securePort?: number;
  hostNetwork?: boolean;
  serviceType?: string;
  url?: CertmanagerHelmValuesWebhookUrl;
  networkPolicy?: CertmanagerHelmValuesWebhookNetworkPolicy;
  volumes?: unknown[];
  volumeMounts?: unknown[];
  enableServiceLinks?: boolean;
};

export type CertmanagerHelmValuesWebhookConfig = object;

export type CertmanagerHelmValuesWebhookStrategy = object;

export type CertmanagerHelmValuesWebhookSecurityContext = {
  runAsNonRoot?: boolean;
  seccompProfile?: CertmanagerHelmValuesWebhookSecurityContextSeccompProfile;
};

export type CertmanagerHelmValuesWebhookSecurityContextSeccompProfile = {
  type?: string;
};

export type CertmanagerHelmValuesWebhookContainerSecurityContext = {
  allowPrivilegeEscalation?: boolean;
  capabilities?: CertmanagerHelmValuesWebhookContainerSecurityContextCapabilities;
  readOnlyRootFilesystem?: boolean;
};

export type CertmanagerHelmValuesWebhookContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type CertmanagerHelmValuesWebhookPodDisruptionBudget = {
  enabled?: boolean;
};

export type CertmanagerHelmValuesWebhookValidatingWebhookConfiguration = {
  namespaceSelector?: CertmanagerHelmValuesWebhookValidatingWebhookConfigurationNamespaceSelector;
};

export type CertmanagerHelmValuesWebhookValidatingWebhookConfigurationNamespaceSelector =
  {
    matchExpressions?: CertmanagerHelmValuesWebhookValidatingWebhookConfigurationNamespaceSelectorMatchExpressions[];
  };

export type CertmanagerHelmValuesWebhookMutatingWebhookConfiguration = {
  namespaceSelector?: CertmanagerHelmValuesWebhookMutatingWebhookConfigurationNamespaceSelector;
};

export type CertmanagerHelmValuesWebhookMutatingWebhookConfigurationNamespaceSelector =
  object;

export type CertmanagerHelmValuesWebhookResources = object;

export type CertmanagerHelmValuesWebhookLivenessProbe = {
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type CertmanagerHelmValuesWebhookReadinessProbe = {
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type CertmanagerHelmValuesWebhookNodeSelector = {
  "kubernetes.io/os"?: string;
};

export type CertmanagerHelmValuesWebhookAffinity = object;

export type CertmanagerHelmValuesWebhookPodLabels = object;

export type CertmanagerHelmValuesWebhookServiceLabels = object;

export type CertmanagerHelmValuesWebhookImage = {
  repository?: string;
  pullPolicy?: string;
};

export type CertmanagerHelmValuesWebhookServiceAccount = {
  create?: boolean;
  automountServiceAccountToken?: boolean;
};

export type CertmanagerHelmValuesWebhookUrl = object;

export type CertmanagerHelmValuesWebhookNetworkPolicy = {
  enabled?: boolean;
  ingress?: CertmanagerHelmValuesWebhookNetworkPolicyIngress[];
  egress?: CertmanagerHelmValuesWebhookNetworkPolicyEgress[];
};

export type CertmanagerHelmValuesCainjector = {
  enabled?: boolean;
  replicaCount?: number;
  config?: CertmanagerHelmValuesCainjectorConfig;
  strategy?: CertmanagerHelmValuesCainjectorStrategy;
  securityContext?: CertmanagerHelmValuesCainjectorSecurityContext;
  containerSecurityContext?: CertmanagerHelmValuesCainjectorContainerSecurityContext;
  podDisruptionBudget?: CertmanagerHelmValuesCainjectorPodDisruptionBudget;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  featureGates?: string;
  resources?: CertmanagerHelmValuesCainjectorResources;
  nodeSelector?: CertmanagerHelmValuesCainjectorNodeSelector;
  affinity?: CertmanagerHelmValuesCainjectorAffinity;
  tolerations?: unknown[];
  topologySpreadConstraints?: unknown[];
  podLabels?: CertmanagerHelmValuesCainjectorPodLabels;
  serviceLabels?: CertmanagerHelmValuesCainjectorServiceLabels;
  image?: CertmanagerHelmValuesCainjectorImage;
  serviceAccount?: CertmanagerHelmValuesCainjectorServiceAccount;
  volumes?: unknown[];
  volumeMounts?: unknown[];
  enableServiceLinks?: boolean;
};

export type CertmanagerHelmValuesCainjectorConfig = object;

export type CertmanagerHelmValuesCainjectorStrategy = object;

export type CertmanagerHelmValuesCainjectorSecurityContext = {
  runAsNonRoot?: boolean;
  seccompProfile?: CertmanagerHelmValuesCainjectorSecurityContextSeccompProfile;
};

export type CertmanagerHelmValuesCainjectorSecurityContextSeccompProfile = {
  type?: string;
};

export type CertmanagerHelmValuesCainjectorContainerSecurityContext = {
  allowPrivilegeEscalation?: boolean;
  capabilities?: CertmanagerHelmValuesCainjectorContainerSecurityContextCapabilities;
  readOnlyRootFilesystem?: boolean;
};

export type CertmanagerHelmValuesCainjectorContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type CertmanagerHelmValuesCainjectorPodDisruptionBudget = {
  enabled?: boolean;
};

export type CertmanagerHelmValuesCainjectorResources = object;

export type CertmanagerHelmValuesCainjectorNodeSelector = {
  "kubernetes.io/os"?: string;
};

export type CertmanagerHelmValuesCainjectorAffinity = object;

export type CertmanagerHelmValuesCainjectorPodLabels = object;

export type CertmanagerHelmValuesCainjectorServiceLabels = object;

export type CertmanagerHelmValuesCainjectorImage = {
  repository?: string;
  pullPolicy?: string;
};

export type CertmanagerHelmValuesCainjectorServiceAccount = {
  create?: boolean;
  automountServiceAccountToken?: boolean;
};

export type CertmanagerHelmValuesAcmesolver = {
  image?: CertmanagerHelmValuesAcmesolverImage;
};

export type CertmanagerHelmValuesAcmesolverImage = {
  repository?: string;
  pullPolicy?: string;
};

export type CertmanagerHelmValuesStartupapicheck = {
  enabled?: boolean;
  securityContext?: CertmanagerHelmValuesStartupapicheckSecurityContext;
  containerSecurityContext?: CertmanagerHelmValuesStartupapicheckContainerSecurityContext;
  timeout?: string;
  backoffLimit?: number;
  jobAnnotations?: CertmanagerHelmValuesStartupapicheckJobAnnotations;
  extraArgs?: string[];
  extraEnv?: unknown[];
  resources?: CertmanagerHelmValuesStartupapicheckResources;
  nodeSelector?: CertmanagerHelmValuesStartupapicheckNodeSelector;
  affinity?: CertmanagerHelmValuesStartupapicheckAffinity;
  tolerations?: unknown[];
  podLabels?: CertmanagerHelmValuesStartupapicheckPodLabels;
  image?: CertmanagerHelmValuesStartupapicheckImage;
  rbac?: CertmanagerHelmValuesStartupapicheckRbac;
  serviceAccount?: CertmanagerHelmValuesStartupapicheckServiceAccount;
  volumes?: unknown[];
  volumeMounts?: unknown[];
  enableServiceLinks?: boolean;
};

export type CertmanagerHelmValuesStartupapicheckSecurityContext = {
  runAsNonRoot?: boolean;
  seccompProfile?: CertmanagerHelmValuesStartupapicheckSecurityContextSeccompProfile;
};

export type CertmanagerHelmValuesStartupapicheckSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type CertmanagerHelmValuesStartupapicheckContainerSecurityContext = {
  allowPrivilegeEscalation?: boolean;
  capabilities?: CertmanagerHelmValuesStartupapicheckContainerSecurityContextCapabilities;
  readOnlyRootFilesystem?: boolean;
};

export type CertmanagerHelmValuesStartupapicheckContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type CertmanagerHelmValuesStartupapicheckJobAnnotations = {
  "helm.sh/hook"?: string;
  "helm.sh/hook-weight"?: string;
  "helm.sh/hook-delete-policy"?: string;
};

export type CertmanagerHelmValuesStartupapicheckResources = object;

export type CertmanagerHelmValuesStartupapicheckNodeSelector = {
  "kubernetes.io/os"?: string;
};

export type CertmanagerHelmValuesStartupapicheckAffinity = object;

export type CertmanagerHelmValuesStartupapicheckPodLabels = object;

export type CertmanagerHelmValuesStartupapicheckImage = {
  repository?: string;
  pullPolicy?: string;
};

export type CertmanagerHelmValuesStartupapicheckRbac = {
  annotations?: CertmanagerHelmValuesStartupapicheckRbacAnnotations;
};

export type CertmanagerHelmValuesStartupapicheckRbacAnnotations = {
  "helm.sh/hook"?: string;
  "helm.sh/hook-weight"?: string;
  "helm.sh/hook-delete-policy"?: string;
};

export type CertmanagerHelmValuesStartupapicheckServiceAccount = {
  create?: boolean;
  annotations?: CertmanagerHelmValuesStartupapicheckServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type CertmanagerHelmValuesStartupapicheckServiceAccountAnnotations = {
  "helm.sh/hook"?: string;
  "helm.sh/hook-weight"?: string;
  "helm.sh/hook-delete-policy"?: string;
};

export type CertmanagerHelmValues = {
  global?: CertmanagerHelmValuesGlobal;
  installCRDs?: boolean;
  crds?: CertmanagerHelmValuesCrds;
  replicaCount?: number;
  strategy?: CertmanagerHelmValuesStrategy;
  podDisruptionBudget?: CertmanagerHelmValuesPodDisruptionBudget;
  featureGates?: string;
  maxConcurrentChallenges?: number;
  image?: CertmanagerHelmValuesImage;
  clusterResourceNamespace?: string;
  namespace?: string;
  serviceAccount?: CertmanagerHelmValuesServiceAccount;
  enableCertificateOwnerRef?: boolean;
  config?: CertmanagerHelmValuesConfig;
  dns01RecursiveNameservers?: string;
  dns01RecursiveNameserversOnly?: boolean;
  disableAutoApproval?: boolean;
  approveSignerNames?: string[];
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  resources?: CertmanagerHelmValuesResources;
  securityContext?: CertmanagerHelmValuesSecurityContext;
  containerSecurityContext?: CertmanagerHelmValuesContainerSecurityContext;
  volumes?: unknown[];
  volumeMounts?: unknown[];
  podLabels?: CertmanagerHelmValuesPodLabels;
  hostAliases?: unknown[];
  nodeSelector?: CertmanagerHelmValuesNodeSelector;
  ingressShim?: CertmanagerHelmValuesIngressShim;
  affinity?: CertmanagerHelmValuesAffinity;
  tolerations?: unknown[];
  topologySpreadConstraints?: unknown[];
  livenessProbe?: CertmanagerHelmValuesLivenessProbe;
  enableServiceLinks?: boolean;
  prometheus?: CertmanagerHelmValuesPrometheus;
  webhook?: CertmanagerHelmValuesWebhook;
  cainjector?: CertmanagerHelmValuesCainjector;
  acmesolver?: CertmanagerHelmValuesAcmesolver;
  startupapicheck?: CertmanagerHelmValuesStartupapicheck;
  extraObjects?: unknown[];
  creator?: string;
  enabled?: boolean;
};

export type CertmanagerHelmParameters = {
  "global.imagePullSecrets"?: string;
  "global.priorityClassName"?: string;
  "global.rbac.create"?: string;
  "global.rbac.aggregateClusterRoles"?: string;
  "global.podSecurityPolicy.enabled"?: string;
  "global.podSecurityPolicy.useAppArmor"?: string;
  "global.logLevel"?: string;
  "global.leaderElection.namespace"?: string;
  installCRDs?: string;
  "crds.enabled"?: string;
  "crds.keep"?: string;
  replicaCount?: string;
  "podDisruptionBudget.enabled"?: string;
  featureGates?: string;
  maxConcurrentChallenges?: string;
  "image.repository"?: string;
  "image.pullPolicy"?: string;
  clusterResourceNamespace?: string;
  namespace?: string;
  "serviceAccount.create"?: string;
  "serviceAccount.automountServiceAccountToken"?: string;
  enableCertificateOwnerRef?: string;
  dns01RecursiveNameservers?: string;
  dns01RecursiveNameserversOnly?: string;
  disableAutoApproval?: string;
  approveSignerNames?: string;
  extraArgs?: string;
  extraEnv?: string;
  "securityContext.runAsNonRoot"?: string;
  "securityContext.seccompProfile.type"?: string;
  "containerSecurityContext.allowPrivilegeEscalation"?: string;
  "containerSecurityContext.capabilities.drop"?: string;
  "containerSecurityContext.readOnlyRootFilesystem"?: string;
  volumes?: string;
  volumeMounts?: string;
  hostAliases?: string;
  "nodeSelector.kubernetes.io/os"?: string;
  tolerations?: string;
  topologySpreadConstraints?: string;
  "livenessProbe.enabled"?: string;
  "livenessProbe.initialDelaySeconds"?: string;
  "livenessProbe.periodSeconds"?: string;
  "livenessProbe.timeoutSeconds"?: string;
  "livenessProbe.successThreshold"?: string;
  "livenessProbe.failureThreshold"?: string;
  enableServiceLinks?: string;
  "prometheus.enabled"?: string;
  "prometheus.servicemonitor.enabled"?: string;
  "prometheus.servicemonitor.prometheusInstance"?: string;
  "prometheus.servicemonitor.targetPort"?: string;
  "prometheus.servicemonitor.path"?: string;
  "prometheus.servicemonitor.interval"?: string;
  "prometheus.servicemonitor.scrapeTimeout"?: string;
  "prometheus.servicemonitor.honorLabels"?: string;
  "prometheus.podmonitor.enabled"?: string;
  "prometheus.podmonitor.prometheusInstance"?: string;
  "prometheus.podmonitor.path"?: string;
  "prometheus.podmonitor.interval"?: string;
  "prometheus.podmonitor.scrapeTimeout"?: string;
  "prometheus.podmonitor.honorLabels"?: string;
  "webhook.replicaCount"?: string;
  "webhook.timeoutSeconds"?: string;
  "webhook.securityContext.runAsNonRoot"?: string;
  "webhook.securityContext.seccompProfile.type"?: string;
  "webhook.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "webhook.containerSecurityContext.capabilities.drop"?: string;
  "webhook.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "webhook.podDisruptionBudget.enabled"?: string;
  "webhook.validatingWebhookConfiguration.namespaceSelector.matchExpressions"?: string;
  "webhook.extraArgs"?: string;
  "webhook.extraEnv"?: string;
  "webhook.featureGates"?: string;
  "webhook.livenessProbe.failureThreshold"?: string;
  "webhook.livenessProbe.initialDelaySeconds"?: string;
  "webhook.livenessProbe.periodSeconds"?: string;
  "webhook.livenessProbe.successThreshold"?: string;
  "webhook.livenessProbe.timeoutSeconds"?: string;
  "webhook.readinessProbe.failureThreshold"?: string;
  "webhook.readinessProbe.initialDelaySeconds"?: string;
  "webhook.readinessProbe.periodSeconds"?: string;
  "webhook.readinessProbe.successThreshold"?: string;
  "webhook.readinessProbe.timeoutSeconds"?: string;
  "webhook.nodeSelector.kubernetes.io/os"?: string;
  "webhook.tolerations"?: string;
  "webhook.topologySpreadConstraints"?: string;
  "webhook.serviceIPFamilyPolicy"?: string;
  "webhook.serviceIPFamilies"?: string;
  "webhook.image.repository"?: string;
  "webhook.image.pullPolicy"?: string;
  "webhook.serviceAccount.create"?: string;
  "webhook.serviceAccount.automountServiceAccountToken"?: string;
  "webhook.securePort"?: string;
  "webhook.hostNetwork"?: string;
  "webhook.serviceType"?: string;
  "webhook.networkPolicy.enabled"?: string;
  "webhook.networkPolicy.ingress"?: string;
  "webhook.networkPolicy.egress"?: string;
  "webhook.volumes"?: string;
  "webhook.volumeMounts"?: string;
  "webhook.enableServiceLinks"?: string;
  "cainjector.enabled"?: string;
  "cainjector.replicaCount"?: string;
  "cainjector.securityContext.runAsNonRoot"?: string;
  "cainjector.securityContext.seccompProfile.type"?: string;
  "cainjector.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "cainjector.containerSecurityContext.capabilities.drop"?: string;
  "cainjector.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "cainjector.podDisruptionBudget.enabled"?: string;
  "cainjector.extraArgs"?: string;
  "cainjector.extraEnv"?: string;
  "cainjector.featureGates"?: string;
  "cainjector.nodeSelector.kubernetes.io/os"?: string;
  "cainjector.tolerations"?: string;
  "cainjector.topologySpreadConstraints"?: string;
  "cainjector.image.repository"?: string;
  "cainjector.image.pullPolicy"?: string;
  "cainjector.serviceAccount.create"?: string;
  "cainjector.serviceAccount.automountServiceAccountToken"?: string;
  "cainjector.volumes"?: string;
  "cainjector.volumeMounts"?: string;
  "cainjector.enableServiceLinks"?: string;
  "acmesolver.image.repository"?: string;
  "acmesolver.image.pullPolicy"?: string;
  "startupapicheck.enabled"?: string;
  "startupapicheck.securityContext.runAsNonRoot"?: string;
  "startupapicheck.securityContext.seccompProfile.type"?: string;
  "startupapicheck.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "startupapicheck.containerSecurityContext.capabilities.drop"?: string;
  "startupapicheck.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "startupapicheck.timeout"?: string;
  "startupapicheck.backoffLimit"?: string;
  "startupapicheck.jobAnnotations.helm.sh/hook"?: string;
  "startupapicheck.jobAnnotations.helm.sh/hook-weight"?: string;
  "startupapicheck.jobAnnotations.helm.sh/hook-delete-policy"?: string;
  "startupapicheck.extraArgs"?: string;
  "startupapicheck.extraEnv"?: string;
  "startupapicheck.nodeSelector.kubernetes.io/os"?: string;
  "startupapicheck.tolerations"?: string;
  "startupapicheck.image.repository"?: string;
  "startupapicheck.image.pullPolicy"?: string;
  "startupapicheck.rbac.annotations.helm.sh/hook"?: string;
  "startupapicheck.rbac.annotations.helm.sh/hook-weight"?: string;
  "startupapicheck.rbac.annotations.helm.sh/hook-delete-policy"?: string;
  "startupapicheck.serviceAccount.create"?: string;
  "startupapicheck.serviceAccount.annotations.helm.sh/hook"?: string;
  "startupapicheck.serviceAccount.annotations.helm.sh/hook-weight"?: string;
  "startupapicheck.serviceAccount.annotations.helm.sh/hook-delete-policy"?: string;
  "startupapicheck.serviceAccount.automountServiceAccountToken"?: string;
  "startupapicheck.volumes"?: string;
  "startupapicheck.volumeMounts"?: string;
  "startupapicheck.enableServiceLinks"?: string;
  extraObjects?: string;
  creator?: string;
  enabled?: string;
};
