// Generated TypeScript types for argo-cd Helm chart

export type ArgocdHelmValuesApiVersionOverrides = object;

export type ArgocdHelmValuesOpenshift = {
  enabled?: boolean;
};

export type ArgocdHelmValuesCrds = {
  install?: boolean;
  keep?: boolean;
  annotations?: ArgocdHelmValuesCrdsAnnotations;
  additionalLabels?: ArgocdHelmValuesCrdsAdditionalLabels;
};

export type ArgocdHelmValuesCrdsAnnotations = object;

export type ArgocdHelmValuesCrdsAdditionalLabels = object;

export type ArgocdHelmValuesGlobal = {
  domain?: string;
  runtimeClassName?: string;
  additionalLabels?: ArgocdHelmValuesGlobalAdditionalLabels;
  revisionHistoryLimit?: number;
  image?: ArgocdHelmValuesGlobalImage;
  imagePullSecrets?: unknown[];
  logging?: ArgocdHelmValuesGlobalLogging;
  statefulsetAnnotations?: ArgocdHelmValuesGlobalStatefulsetAnnotations;
  deploymentAnnotations?: ArgocdHelmValuesGlobalDeploymentAnnotations;
  deploymentLabels?: ArgocdHelmValuesGlobalDeploymentLabels;
  podAnnotations?: ArgocdHelmValuesGlobalPodAnnotations;
  podLabels?: ArgocdHelmValuesGlobalPodLabels;
  addPrometheusAnnotations?: boolean;
  securityContext?: ArgocdHelmValuesGlobalSecurityContext;
  hostAliases?: unknown[];
  dualStack?: ArgocdHelmValuesGlobalDualStack;
  networkPolicy?: ArgocdHelmValuesGlobalNetworkPolicy;
  priorityClassName?: string;
  nodeSelector?: ArgocdHelmValuesGlobalNodeSelector;
  tolerations?: unknown[];
  affinity?: ArgocdHelmValuesGlobalAffinity;
  topologySpreadConstraints?: unknown[];
  deploymentStrategy?: ArgocdHelmValuesGlobalDeploymentStrategy;
  env?: unknown[];
  certificateAnnotations?: ArgocdHelmValuesGlobalCertificateAnnotations;
};

export type ArgocdHelmValuesGlobalAdditionalLabels = object;

export type ArgocdHelmValuesGlobalImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesGlobalLogging = {
  format?: string;
  level?: string;
};

export type ArgocdHelmValuesGlobalStatefulsetAnnotations = object;

export type ArgocdHelmValuesGlobalDeploymentAnnotations = object;

export type ArgocdHelmValuesGlobalDeploymentLabels = object;

export type ArgocdHelmValuesGlobalPodAnnotations = object;

export type ArgocdHelmValuesGlobalPodLabels = object;

export type ArgocdHelmValuesGlobalSecurityContext = object;

export type ArgocdHelmValuesGlobalDualStack = {
  ipFamilyPolicy?: string;
  ipFamilies?: unknown[];
};

export type ArgocdHelmValuesGlobalNetworkPolicy = {
  create?: boolean;
  defaultDenyIngress?: boolean;
};

export type ArgocdHelmValuesGlobalNodeSelector = {
  "kubernetes.io/os"?: string;
};

export type ArgocdHelmValuesGlobalAffinity = {
  podAntiAffinity?: string;
  nodeAffinity?: ArgocdHelmValuesGlobalAffinityNodeAffinity;
};

export type ArgocdHelmValuesGlobalAffinityNodeAffinity = {
  type?: string;
  matchExpressions?: unknown[];
};

export type ArgocdHelmValuesGlobalDeploymentStrategy = object;

export type ArgocdHelmValuesGlobalCertificateAnnotations = object;

export type ArgocdHelmValuesConfigs = {
  cm?: ArgocdHelmValuesConfigsCm;
  params?: ArgocdHelmValuesConfigsParams;
  rbac?: ArgocdHelmValuesConfigsRbac;
  gpg?: ArgocdHelmValuesConfigsGpg;
  ssh?: ArgocdHelmValuesConfigsSsh;
  tls?: ArgocdHelmValuesConfigsTls;
  cmp?: ArgocdHelmValuesConfigsCmp;
  clusterCredentials?: ArgocdHelmValuesConfigsClusterCredentials;
  credentialTemplates?: ArgocdHelmValuesConfigsCredentialTemplates;
  credentialTemplatesAnnotations?: ArgocdHelmValuesConfigsCredentialTemplatesAnnotations;
  repositories?: ArgocdHelmValuesConfigsRepositories;
  repositoriesAnnotations?: ArgocdHelmValuesConfigsRepositoriesAnnotations;
  secret?: ArgocdHelmValuesConfigsSecret;
  styles?: string;
};

export type ArgocdHelmValuesConfigsCm = {
  create?: boolean;
  annotations?: ArgocdHelmValuesConfigsCmAnnotations;
  "application.instanceLabelKey"?: string;
  "application.sync.impersonation.enabled"?: boolean;
  "server.rbac.log.enforce.enable"?: boolean;
  "exec.enabled"?: boolean;
  "admin.enabled"?: boolean;
  "timeout.reconciliation"?: string;
  "timeout.hard.reconciliation"?: string;
  "statusbadge.enabled"?: boolean;
  "resource.customizations.ignoreResourceUpdates.all"?: string;
  "resource.customizations.ignoreResourceUpdates.argoproj.io_Application"?: string;
  "resource.customizations.ignoreResourceUpdates.argoproj.io_Rollout"?: string;
  "resource.customizations.ignoreResourceUpdates.autoscaling_HorizontalPodAutoscaler"?: string;
  "resource.customizations.ignoreResourceUpdates.ConfigMap"?: string;
  "resource.customizations.ignoreResourceUpdates.apps_ReplicaSet"?: string;
  "resource.customizations.ignoreResourceUpdates.discovery.k8s.io_EndpointSlice"?: string;
  "resource.customizations.ignoreResourceUpdates.Endpoints"?: string;
  "resource.exclusions"?: string;
};

export type ArgocdHelmValuesConfigsCmAnnotations = object;

export type ArgocdHelmValuesConfigsParams = {
  create?: boolean;
  annotations?: ArgocdHelmValuesConfigsParamsAnnotations;
  "otlp.address"?: string;
  "controller.status.processors"?: number;
  "controller.operation.processors"?: number;
  "controller.self.heal.timeout.seconds"?: number;
  "controller.repo.server.timeout.seconds"?: number;
  "controller.sync.timeout.seconds"?: number;
  "server.insecure"?: boolean;
  "server.basehref"?: string;
  "server.rootpath"?: string;
  "server.staticassets"?: string;
  "server.disable.auth"?: boolean;
  "server.enable.gzip"?: boolean;
  "server.enable.proxy.extension"?: boolean;
  "hydrator.enabled"?: boolean;
  "server.x.frame.options"?: string;
  "reposerver.parallelism.limit"?: number;
  "applicationsetcontroller.policy"?: string;
  "applicationsetcontroller.enable.progressive.syncs"?: boolean;
  "applicationsetcontroller.namespaces"?: string;
  "application.namespaces"?: string;
  "controller.ignore.normalizer.jq.timeout"?: string;
};

export type ArgocdHelmValuesConfigsParamsAnnotations = object;

export type ArgocdHelmValuesConfigsRbac = {
  create?: boolean;
  annotations?: ArgocdHelmValuesConfigsRbacAnnotations;
  "policy.default"?: string;
  "policy.csv"?: string;
  scopes?: string;
  "policy.matchMode"?: string;
};

export type ArgocdHelmValuesConfigsRbacAnnotations = object;

export type ArgocdHelmValuesConfigsGpg = {
  annotations?: ArgocdHelmValuesConfigsGpgAnnotations;
  keys?: ArgocdHelmValuesConfigsGpgKeys;
};

export type ArgocdHelmValuesConfigsGpgAnnotations = object;

export type ArgocdHelmValuesConfigsGpgKeys = object;

export type ArgocdHelmValuesConfigsSsh = {
  create?: boolean;
  annotations?: ArgocdHelmValuesConfigsSshAnnotations;
  knownHosts?: string;
  extraHosts?: string;
};

export type ArgocdHelmValuesConfigsSshAnnotations = object;

export type ArgocdHelmValuesConfigsTls = {
  annotations?: ArgocdHelmValuesConfigsTlsAnnotations;
  certificates?: ArgocdHelmValuesConfigsTlsCertificates;
  create?: boolean;
};

export type ArgocdHelmValuesConfigsTlsAnnotations = object;

export type ArgocdHelmValuesConfigsTlsCertificates = object;

export type ArgocdHelmValuesConfigsCmp = {
  create?: boolean;
  annotations?: ArgocdHelmValuesConfigsCmpAnnotations;
  plugins?: ArgocdHelmValuesConfigsCmpPlugins;
};

export type ArgocdHelmValuesConfigsCmpAnnotations = object;

export type ArgocdHelmValuesConfigsCmpPlugins = object;

export type ArgocdHelmValuesConfigsClusterCredentials = object;

export type ArgocdHelmValuesConfigsCredentialTemplates = object;

export type ArgocdHelmValuesConfigsCredentialTemplatesAnnotations = object;

export type ArgocdHelmValuesConfigsRepositories = object;

export type ArgocdHelmValuesConfigsRepositoriesAnnotations = object;

export type ArgocdHelmValuesConfigsSecret = {
  createSecret?: boolean;
  labels?: ArgocdHelmValuesConfigsSecretLabels;
  annotations?: ArgocdHelmValuesConfigsSecretAnnotations;
  githubSecret?: string;
  gitlabSecret?: string;
  bitbucketServerSecret?: string;
  bitbucketUUID?: string;
  gogsSecret?: string;
  azureDevops?: ArgocdHelmValuesConfigsSecretAzureDevops;
  extra?: ArgocdHelmValuesConfigsSecretExtra;
  argocdServerAdminPassword?: string;
  argocdServerAdminPasswordMtime?: string;
};

export type ArgocdHelmValuesConfigsSecretLabels = object;

export type ArgocdHelmValuesConfigsSecretAnnotations = object;

export type ArgocdHelmValuesConfigsSecretAzureDevops = {
  username?: string;
  password?: string;
};

export type ArgocdHelmValuesConfigsSecretExtra = object;

export type ArgocdHelmValuesController = {
  name?: string;
  replicas?: number;
  dynamicClusterDistribution?: boolean;
  runtimeClassName?: string;
  heartbeatTime?: number;
  revisionHistoryLimit?: number;
  pdb?: ArgocdHelmValuesControllerPdb;
  image?: ArgocdHelmValuesControllerImage;
  imagePullSecrets?: unknown[];
  extraArgs?: unknown[];
  env?: unknown[];
  envFrom?: unknown[];
  extraContainers?: unknown[];
  initContainers?: unknown[];
  volumeMounts?: unknown[];
  volumes?: unknown[];
  emptyDir?: ArgocdHelmValuesControllerEmptyDir;
  statefulsetAnnotations?: ArgocdHelmValuesControllerStatefulsetAnnotations;
  deploymentAnnotations?: ArgocdHelmValuesControllerDeploymentAnnotations;
  deploymentLabels?: ArgocdHelmValuesControllerDeploymentLabels;
  podAnnotations?: ArgocdHelmValuesControllerPodAnnotations;
  podLabels?: ArgocdHelmValuesControllerPodLabels;
  resources?: ArgocdHelmValuesControllerResources;
  containerPorts?: ArgocdHelmValuesControllerContainerPorts;
  hostNetwork?: boolean;
  dnsConfig?: ArgocdHelmValuesControllerDnsConfig;
  dnsPolicy?: string;
  containerSecurityContext?: ArgocdHelmValuesControllerContainerSecurityContext;
  readinessProbe?: ArgocdHelmValuesControllerReadinessProbe;
  terminationGracePeriodSeconds?: number;
  priorityClassName?: string;
  nodeSelector?: ArgocdHelmValuesControllerNodeSelector;
  tolerations?: unknown[];
  affinity?: ArgocdHelmValuesControllerAffinity;
  topologySpreadConstraints?: unknown[];
  automountServiceAccountToken?: boolean;
  serviceAccount?: ArgocdHelmValuesControllerServiceAccount;
  metrics?: ArgocdHelmValuesControllerMetrics;
  clusterRoleRules?: ArgocdHelmValuesControllerClusterRoleRules;
  networkPolicy?: ArgocdHelmValuesControllerNetworkPolicy;
};

export type ArgocdHelmValuesControllerPdb = {
  enabled?: boolean;
  labels?: ArgocdHelmValuesControllerPdbLabels;
  annotations?: ArgocdHelmValuesControllerPdbAnnotations;
  minAvailable?: string;
  maxUnavailable?: string;
};

export type ArgocdHelmValuesControllerPdbLabels = object;

export type ArgocdHelmValuesControllerPdbAnnotations = object;

export type ArgocdHelmValuesControllerImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesControllerEmptyDir = {
  sizeLimit?: string;
};

export type ArgocdHelmValuesControllerStatefulsetAnnotations = object;

export type ArgocdHelmValuesControllerDeploymentAnnotations = object;

export type ArgocdHelmValuesControllerDeploymentLabels = object;

export type ArgocdHelmValuesControllerPodAnnotations = object;

export type ArgocdHelmValuesControllerPodLabels = object;

export type ArgocdHelmValuesControllerResources = object;

export type ArgocdHelmValuesControllerContainerPorts = {
  metrics?: number;
};

export type ArgocdHelmValuesControllerDnsConfig = object;

export type ArgocdHelmValuesControllerContainerSecurityContext = {
  runAsNonRoot?: boolean;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
  seccompProfile?: ArgocdHelmValuesControllerContainerSecurityContextSeccompProfile;
  capabilities?: ArgocdHelmValuesControllerContainerSecurityContextCapabilities;
};

export type ArgocdHelmValuesControllerContainerSecurityContextSeccompProfile = {
  type?: string;
};

export type ArgocdHelmValuesControllerContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type ArgocdHelmValuesControllerReadinessProbe = {
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type ArgocdHelmValuesControllerNodeSelector = object;

export type ArgocdHelmValuesControllerAffinity = object;

export type ArgocdHelmValuesControllerServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: ArgocdHelmValuesControllerServiceAccountAnnotations;
  labels?: ArgocdHelmValuesControllerServiceAccountLabels;
  automountServiceAccountToken?: boolean;
};

export type ArgocdHelmValuesControllerServiceAccountAnnotations = object;

export type ArgocdHelmValuesControllerServiceAccountLabels = object;

export type ArgocdHelmValuesControllerMetrics = {
  enabled?: boolean;
  scrapeTimeout?: string;
  applicationLabels?: ArgocdHelmValuesControllerMetricsApplicationLabels;
  service?: ArgocdHelmValuesControllerMetricsService;
  serviceMonitor?: ArgocdHelmValuesControllerMetricsServiceMonitor;
  rules?: ArgocdHelmValuesControllerMetricsRules;
};

export type ArgocdHelmValuesControllerMetricsApplicationLabels = {
  enabled?: boolean;
  labels?: unknown[];
};

export type ArgocdHelmValuesControllerMetricsService = {
  type?: string;
  clusterIP?: string;
  annotations?: ArgocdHelmValuesControllerMetricsServiceAnnotations;
  labels?: ArgocdHelmValuesControllerMetricsServiceLabels;
  servicePort?: number;
  portName?: string;
};

export type ArgocdHelmValuesControllerMetricsServiceAnnotations = object;

export type ArgocdHelmValuesControllerMetricsServiceLabels = object;

export type ArgocdHelmValuesControllerMetricsServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  honorLabels?: boolean;
  relabelings?: unknown[];
  metricRelabelings?: unknown[];
  selector?: ArgocdHelmValuesControllerMetricsServiceMonitorSelector;
  scheme?: string;
  tlsConfig?: ArgocdHelmValuesControllerMetricsServiceMonitorTlsConfig;
  namespace?: string;
  additionalLabels?: ArgocdHelmValuesControllerMetricsServiceMonitorAdditionalLabels;
  annotations?: ArgocdHelmValuesControllerMetricsServiceMonitorAnnotations;
};

export type ArgocdHelmValuesControllerMetricsServiceMonitorSelector = object;

export type ArgocdHelmValuesControllerMetricsServiceMonitorTlsConfig = object;

export type ArgocdHelmValuesControllerMetricsServiceMonitorAdditionalLabels =
  object;

export type ArgocdHelmValuesControllerMetricsServiceMonitorAnnotations = object;

export type ArgocdHelmValuesControllerMetricsRules = {
  enabled?: boolean;
  namespace?: string;
  selector?: ArgocdHelmValuesControllerMetricsRulesSelector;
  additionalLabels?: ArgocdHelmValuesControllerMetricsRulesAdditionalLabels;
  annotations?: ArgocdHelmValuesControllerMetricsRulesAnnotations;
  spec?: unknown[];
};

export type ArgocdHelmValuesControllerMetricsRulesSelector = object;

export type ArgocdHelmValuesControllerMetricsRulesAdditionalLabels = object;

export type ArgocdHelmValuesControllerMetricsRulesAnnotations = object;

export type ArgocdHelmValuesControllerClusterRoleRules = {
  enabled?: boolean;
  rules?: unknown[];
};

export type ArgocdHelmValuesControllerNetworkPolicy = {
  create?: boolean;
};

export type ArgocdHelmValuesDex = {
  enabled?: boolean;
  name?: string;
  extraArgs?: unknown[];
  runtimeClassName?: string;
  metrics?: ArgocdHelmValuesDexMetrics;
  pdb?: ArgocdHelmValuesDexPdb;
  image?: ArgocdHelmValuesDexImage;
  imagePullSecrets?: unknown[];
  initImage?: ArgocdHelmValuesDexInitImage;
  env?: unknown[];
  envFrom?: unknown[];
  extraContainers?: unknown[];
  initContainers?: unknown[];
  volumeMounts?: unknown[];
  volumes?: unknown[];
  emptyDir?: ArgocdHelmValuesDexEmptyDir;
  certificateSecret?: ArgocdHelmValuesDexCertificateSecret;
  deploymentAnnotations?: ArgocdHelmValuesDexDeploymentAnnotations;
  deploymentLabels?: ArgocdHelmValuesDexDeploymentLabels;
  podAnnotations?: ArgocdHelmValuesDexPodAnnotations;
  podLabels?: ArgocdHelmValuesDexPodLabels;
  resources?: ArgocdHelmValuesDexResources;
  containerPorts?: ArgocdHelmValuesDexContainerPorts;
  dnsConfig?: ArgocdHelmValuesDexDnsConfig;
  dnsPolicy?: string;
  containerSecurityContext?: ArgocdHelmValuesDexContainerSecurityContext;
  livenessProbe?: ArgocdHelmValuesDexLivenessProbe;
  readinessProbe?: ArgocdHelmValuesDexReadinessProbe;
  terminationGracePeriodSeconds?: number;
  automountServiceAccountToken?: boolean;
  serviceAccount?: ArgocdHelmValuesDexServiceAccount;
  servicePortHttp?: number;
  servicePortHttpName?: string;
  servicePortGrpc?: number;
  servicePortGrpcName?: string;
  servicePortMetrics?: number;
  priorityClassName?: string;
  nodeSelector?: ArgocdHelmValuesDexNodeSelector;
  tolerations?: unknown[];
  affinity?: ArgocdHelmValuesDexAffinity;
  topologySpreadConstraints?: unknown[];
  deploymentStrategy?: ArgocdHelmValuesDexDeploymentStrategy;
  networkPolicy?: ArgocdHelmValuesDexNetworkPolicy;
};

export type ArgocdHelmValuesDexMetrics = {
  enabled?: boolean;
  service?: ArgocdHelmValuesDexMetricsService;
  serviceMonitor?: ArgocdHelmValuesDexMetricsServiceMonitor;
};

export type ArgocdHelmValuesDexMetricsService = {
  annotations?: ArgocdHelmValuesDexMetricsServiceAnnotations;
  labels?: ArgocdHelmValuesDexMetricsServiceLabels;
  portName?: string;
};

export type ArgocdHelmValuesDexMetricsServiceAnnotations = object;

export type ArgocdHelmValuesDexMetricsServiceLabels = object;

export type ArgocdHelmValuesDexMetricsServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  honorLabels?: boolean;
  relabelings?: unknown[];
  metricRelabelings?: unknown[];
  selector?: ArgocdHelmValuesDexMetricsServiceMonitorSelector;
  scheme?: string;
  tlsConfig?: ArgocdHelmValuesDexMetricsServiceMonitorTlsConfig;
  namespace?: string;
  additionalLabels?: ArgocdHelmValuesDexMetricsServiceMonitorAdditionalLabels;
  annotations?: ArgocdHelmValuesDexMetricsServiceMonitorAnnotations;
};

export type ArgocdHelmValuesDexMetricsServiceMonitorSelector = object;

export type ArgocdHelmValuesDexMetricsServiceMonitorTlsConfig = object;

export type ArgocdHelmValuesDexMetricsServiceMonitorAdditionalLabels = object;

export type ArgocdHelmValuesDexMetricsServiceMonitorAnnotations = object;

export type ArgocdHelmValuesDexPdb = {
  enabled?: boolean;
  labels?: ArgocdHelmValuesDexPdbLabels;
  annotations?: ArgocdHelmValuesDexPdbAnnotations;
  minAvailable?: string;
  maxUnavailable?: string;
};

export type ArgocdHelmValuesDexPdbLabels = object;

export type ArgocdHelmValuesDexPdbAnnotations = object;

export type ArgocdHelmValuesDexImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesDexInitImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
  resources?: ArgocdHelmValuesDexInitImageResources;
};

export type ArgocdHelmValuesDexInitImageResources = object;

export type ArgocdHelmValuesDexEmptyDir = {
  sizeLimit?: string;
};

export type ArgocdHelmValuesDexCertificateSecret = {
  enabled?: boolean;
  labels?: ArgocdHelmValuesDexCertificateSecretLabels;
  annotations?: ArgocdHelmValuesDexCertificateSecretAnnotations;
  ca?: string;
  key?: string;
  crt?: string;
};

export type ArgocdHelmValuesDexCertificateSecretLabels = object;

export type ArgocdHelmValuesDexCertificateSecretAnnotations = object;

export type ArgocdHelmValuesDexDeploymentAnnotations = object;

export type ArgocdHelmValuesDexDeploymentLabels = object;

export type ArgocdHelmValuesDexPodAnnotations = object;

export type ArgocdHelmValuesDexPodLabels = object;

export type ArgocdHelmValuesDexResources = object;

export type ArgocdHelmValuesDexContainerPorts = {
  http?: number;
  grpc?: number;
  metrics?: number;
};

export type ArgocdHelmValuesDexDnsConfig = object;

export type ArgocdHelmValuesDexContainerSecurityContext = {
  runAsNonRoot?: boolean;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
  seccompProfile?: ArgocdHelmValuesDexContainerSecurityContextSeccompProfile;
  capabilities?: ArgocdHelmValuesDexContainerSecurityContextCapabilities;
};

export type ArgocdHelmValuesDexContainerSecurityContextSeccompProfile = {
  type?: string;
};

export type ArgocdHelmValuesDexContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type ArgocdHelmValuesDexLivenessProbe = {
  enabled?: boolean;
  httpPath?: string;
  httpPort?: string;
  httpScheme?: string;
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type ArgocdHelmValuesDexReadinessProbe = {
  enabled?: boolean;
  httpPath?: string;
  httpPort?: string;
  httpScheme?: string;
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type ArgocdHelmValuesDexServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: ArgocdHelmValuesDexServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type ArgocdHelmValuesDexServiceAccountAnnotations = object;

export type ArgocdHelmValuesDexNodeSelector = object;

export type ArgocdHelmValuesDexAffinity = object;

export type ArgocdHelmValuesDexDeploymentStrategy = object;

export type ArgocdHelmValuesDexNetworkPolicy = {
  create?: boolean;
};

export type ArgocdHelmValuesRedis = {
  enabled?: boolean;
  name?: string;
  runtimeClassName?: string;
  pdb?: ArgocdHelmValuesRedisPdb;
  image?: ArgocdHelmValuesRedisImage;
  exporter?: ArgocdHelmValuesRedisExporter;
  imagePullSecrets?: unknown[];
  extraArgs?: unknown[];
  env?: unknown[];
  envFrom?: unknown[];
  readinessProbe?: ArgocdHelmValuesRedisReadinessProbe;
  livenessProbe?: ArgocdHelmValuesRedisLivenessProbe;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  volumeMounts?: unknown[];
  volumes?: unknown[];
  deploymentAnnotations?: ArgocdHelmValuesRedisDeploymentAnnotations;
  deploymentLabels?: ArgocdHelmValuesRedisDeploymentLabels;
  podAnnotations?: ArgocdHelmValuesRedisPodAnnotations;
  podLabels?: ArgocdHelmValuesRedisPodLabels;
  resources?: ArgocdHelmValuesRedisResources;
  securityContext?: ArgocdHelmValuesRedisSecurityContext;
  containerPorts?: ArgocdHelmValuesRedisContainerPorts;
  dnsConfig?: ArgocdHelmValuesRedisDnsConfig;
  dnsPolicy?: string;
  containerSecurityContext?: ArgocdHelmValuesRedisContainerSecurityContext;
  servicePort?: number;
  priorityClassName?: string;
  nodeSelector?: ArgocdHelmValuesRedisNodeSelector;
  tolerations?: unknown[];
  affinity?: ArgocdHelmValuesRedisAffinity;
  topologySpreadConstraints?: unknown[];
  terminationGracePeriodSeconds?: number;
  automountServiceAccountToken?: boolean;
  serviceAccount?: ArgocdHelmValuesRedisServiceAccount;
  service?: ArgocdHelmValuesRedisService;
  metrics?: ArgocdHelmValuesRedisMetrics;
  networkPolicy?: ArgocdHelmValuesRedisNetworkPolicy;
};

export type ArgocdHelmValuesRedisPdb = {
  enabled?: boolean;
  labels?: ArgocdHelmValuesRedisPdbLabels;
  annotations?: ArgocdHelmValuesRedisPdbAnnotations;
  minAvailable?: string;
  maxUnavailable?: string;
};

export type ArgocdHelmValuesRedisPdbLabels = object;

export type ArgocdHelmValuesRedisPdbAnnotations = object;

export type ArgocdHelmValuesRedisImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesRedisExporter = {
  enabled?: boolean;
  env?: unknown[];
  image?: ArgocdHelmValuesRedisExporterImage;
  containerSecurityContext?: ArgocdHelmValuesRedisExporterContainerSecurityContext;
  readinessProbe?: ArgocdHelmValuesRedisExporterReadinessProbe;
  livenessProbe?: ArgocdHelmValuesRedisExporterLivenessProbe;
  resources?: ArgocdHelmValuesRedisExporterResources;
};

export type ArgocdHelmValuesRedisExporterImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesRedisExporterContainerSecurityContext = {
  runAsNonRoot?: boolean;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
  seccompProfile?: ArgocdHelmValuesRedisExporterContainerSecurityContextSeccompProfile;
  capabilities?: ArgocdHelmValuesRedisExporterContainerSecurityContextCapabilities;
};

export type ArgocdHelmValuesRedisExporterContainerSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type ArgocdHelmValuesRedisExporterContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type ArgocdHelmValuesRedisExporterReadinessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type ArgocdHelmValuesRedisExporterLivenessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type ArgocdHelmValuesRedisExporterResources = object;

export type ArgocdHelmValuesRedisReadinessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type ArgocdHelmValuesRedisLivenessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type ArgocdHelmValuesRedisDeploymentAnnotations = object;

export type ArgocdHelmValuesRedisDeploymentLabels = object;

export type ArgocdHelmValuesRedisPodAnnotations = object;

export type ArgocdHelmValuesRedisPodLabels = object;

export type ArgocdHelmValuesRedisResources = object;

export type ArgocdHelmValuesRedisSecurityContext = {
  runAsNonRoot?: boolean;
  runAsUser?: number;
  seccompProfile?: ArgocdHelmValuesRedisSecurityContextSeccompProfile;
};

export type ArgocdHelmValuesRedisSecurityContextSeccompProfile = {
  type?: string;
};

export type ArgocdHelmValuesRedisContainerPorts = {
  redis?: number;
  metrics?: number;
};

export type ArgocdHelmValuesRedisDnsConfig = object;

export type ArgocdHelmValuesRedisContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
  capabilities?: ArgocdHelmValuesRedisContainerSecurityContextCapabilities;
};

export type ArgocdHelmValuesRedisContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type ArgocdHelmValuesRedisNodeSelector = object;

export type ArgocdHelmValuesRedisAffinity = object;

export type ArgocdHelmValuesRedisServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: ArgocdHelmValuesRedisServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type ArgocdHelmValuesRedisServiceAccountAnnotations = object;

export type ArgocdHelmValuesRedisService = {
  annotations?: ArgocdHelmValuesRedisServiceAnnotations;
  labels?: ArgocdHelmValuesRedisServiceLabels;
};

export type ArgocdHelmValuesRedisServiceAnnotations = object;

export type ArgocdHelmValuesRedisServiceLabels = object;

export type ArgocdHelmValuesRedisMetrics = {
  enabled?: boolean;
  service?: ArgocdHelmValuesRedisMetricsService;
  serviceMonitor?: ArgocdHelmValuesRedisMetricsServiceMonitor;
};

export type ArgocdHelmValuesRedisMetricsService = {
  type?: string;
  clusterIP?: string;
  annotations?: ArgocdHelmValuesRedisMetricsServiceAnnotations;
  labels?: ArgocdHelmValuesRedisMetricsServiceLabels;
  servicePort?: number;
  portName?: string;
};

export type ArgocdHelmValuesRedisMetricsServiceAnnotations = object;

export type ArgocdHelmValuesRedisMetricsServiceLabels = object;

export type ArgocdHelmValuesRedisMetricsServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  honorLabels?: boolean;
  relabelings?: unknown[];
  metricRelabelings?: unknown[];
  selector?: ArgocdHelmValuesRedisMetricsServiceMonitorSelector;
  scheme?: string;
  tlsConfig?: ArgocdHelmValuesRedisMetricsServiceMonitorTlsConfig;
  namespace?: string;
  additionalLabels?: ArgocdHelmValuesRedisMetricsServiceMonitorAdditionalLabels;
  annotations?: ArgocdHelmValuesRedisMetricsServiceMonitorAnnotations;
};

export type ArgocdHelmValuesRedisMetricsServiceMonitorSelector = object;

export type ArgocdHelmValuesRedisMetricsServiceMonitorTlsConfig = object;

export type ArgocdHelmValuesRedisMetricsServiceMonitorAdditionalLabels = object;

export type ArgocdHelmValuesRedisMetricsServiceMonitorAnnotations = object;

export type ArgocdHelmValuesRedisNetworkPolicy = {
  create?: boolean;
};

export type ArgocdHelmValuesRedisha = {
  enabled?: boolean;
  image?: ArgocdHelmValuesRedishaImage;
  exporter?: ArgocdHelmValuesRedishaExporter;
  persistentVolume?: ArgocdHelmValuesRedishaPersistentVolume;
  redis?: ArgocdHelmValuesRedishaRedis;
  haproxy?: ArgocdHelmValuesRedishaHaproxy;
  auth?: boolean;
  existingSecret?: string;
  hardAntiAffinity?: boolean;
  additionalAffinities?: ArgocdHelmValuesRedishaAdditionalAffinities;
  affinity?: string;
  tolerations?: unknown[];
  topologySpreadConstraints?: ArgocdHelmValuesRedishaTopologySpreadConstraints;
  containerSecurityContext?: ArgocdHelmValuesRedishaContainerSecurityContext;
};

export type ArgocdHelmValuesRedishaImage = {
  repository?: string;
  tag?: string;
};

export type ArgocdHelmValuesRedishaExporter = {
  enabled?: boolean;
  image?: string;
  tag?: string;
};

export type ArgocdHelmValuesRedishaPersistentVolume = {
  enabled?: boolean;
};

export type ArgocdHelmValuesRedishaRedis = {
  masterGroupName?: string;
  config?: ArgocdHelmValuesRedishaRedisConfig;
};

export type ArgocdHelmValuesRedishaRedisConfig = {
  save?: string;
};

export type ArgocdHelmValuesRedishaHaproxy = {
  enabled?: boolean;
  labels?: ArgocdHelmValuesRedishaHaproxyLabels;
  image?: ArgocdHelmValuesRedishaHaproxyImage;
  metrics?: ArgocdHelmValuesRedishaHaproxyMetrics;
  hardAntiAffinity?: boolean;
  additionalAffinities?: ArgocdHelmValuesRedishaHaproxyAdditionalAffinities;
  affinity?: string;
  tolerations?: unknown[];
  containerSecurityContext?: ArgocdHelmValuesRedishaHaproxyContainerSecurityContext;
};

export type ArgocdHelmValuesRedishaHaproxyLabels = {
  "app.kubernetes.io/name"?: string;
};

export type ArgocdHelmValuesRedishaHaproxyImage = {
  repository?: string;
};

export type ArgocdHelmValuesRedishaHaproxyMetrics = {
  enabled?: boolean;
};

export type ArgocdHelmValuesRedishaHaproxyAdditionalAffinities = object;

export type ArgocdHelmValuesRedishaHaproxyContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
};

export type ArgocdHelmValuesRedishaAdditionalAffinities = object;

export type ArgocdHelmValuesRedishaTopologySpreadConstraints = {
  enabled?: boolean;
  maxSkew?: string;
  topologyKey?: string;
  whenUnsatisfiable?: string;
};

export type ArgocdHelmValuesRedishaContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
};

export type ArgocdHelmValuesExternalRedis = {
  host?: string;
  username?: string;
  password?: string;
  port?: number;
  existingSecret?: string;
  secretAnnotations?: ArgocdHelmValuesExternalRedisSecretAnnotations;
};

export type ArgocdHelmValuesExternalRedisSecretAnnotations = object;

export type ArgocdHelmValuesRedisSecretInit = {
  enabled?: boolean;
  name?: string;
  image?: ArgocdHelmValuesRedisSecretInitImage;
  imagePullSecrets?: unknown[];
  jobAnnotations?: ArgocdHelmValuesRedisSecretInitJobAnnotations;
  podAnnotations?: ArgocdHelmValuesRedisSecretInitPodAnnotations;
  podLabels?: ArgocdHelmValuesRedisSecretInitPodLabels;
  resources?: ArgocdHelmValuesRedisSecretInitResources;
  containerSecurityContext?: ArgocdHelmValuesRedisSecretInitContainerSecurityContext;
  securityContext?: ArgocdHelmValuesRedisSecretInitSecurityContext;
  serviceAccount?: ArgocdHelmValuesRedisSecretInitServiceAccount;
  priorityClassName?: string;
  affinity?: ArgocdHelmValuesRedisSecretInitAffinity;
  nodeSelector?: ArgocdHelmValuesRedisSecretInitNodeSelector;
  tolerations?: unknown[];
};

export type ArgocdHelmValuesRedisSecretInitImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesRedisSecretInitJobAnnotations = object;

export type ArgocdHelmValuesRedisSecretInitPodAnnotations = object;

export type ArgocdHelmValuesRedisSecretInitPodLabels = object;

export type ArgocdHelmValuesRedisSecretInitResources = object;

export type ArgocdHelmValuesRedisSecretInitContainerSecurityContext = {
  allowPrivilegeEscalation?: boolean;
  capabilities?: ArgocdHelmValuesRedisSecretInitContainerSecurityContextCapabilities;
  readOnlyRootFilesystem?: boolean;
  runAsNonRoot?: boolean;
  seccompProfile?: ArgocdHelmValuesRedisSecretInitContainerSecurityContextSeccompProfile;
};

export type ArgocdHelmValuesRedisSecretInitContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type ArgocdHelmValuesRedisSecretInitContainerSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type ArgocdHelmValuesRedisSecretInitSecurityContext = object;

export type ArgocdHelmValuesRedisSecretInitServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: ArgocdHelmValuesRedisSecretInitServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type ArgocdHelmValuesRedisSecretInitServiceAccountAnnotations = object;

export type ArgocdHelmValuesRedisSecretInitAffinity = object;

export type ArgocdHelmValuesRedisSecretInitNodeSelector = object;

export type ArgocdHelmValuesServer = {
  name?: string;
  replicas?: number;
  runtimeClassName?: string;
  autoscaling?: ArgocdHelmValuesServerAutoscaling;
  pdb?: ArgocdHelmValuesServerPdb;
  image?: ArgocdHelmValuesServerImage;
  imagePullSecrets?: unknown[];
  extraArgs?: unknown[];
  env?: unknown[];
  envFrom?: unknown[];
  lifecycle?: ArgocdHelmValuesServerLifecycle;
  extensions?: ArgocdHelmValuesServerExtensions;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  volumeMounts?: unknown[];
  volumes?: unknown[];
  emptyDir?: ArgocdHelmValuesServerEmptyDir;
  deploymentAnnotations?: ArgocdHelmValuesServerDeploymentAnnotations;
  deploymentLabels?: ArgocdHelmValuesServerDeploymentLabels;
  podAnnotations?: ArgocdHelmValuesServerPodAnnotations;
  podLabels?: ArgocdHelmValuesServerPodLabels;
  resources?: ArgocdHelmValuesServerResources;
  containerPorts?: ArgocdHelmValuesServerContainerPorts;
  hostNetwork?: boolean;
  dnsConfig?: ArgocdHelmValuesServerDnsConfig;
  dnsPolicy?: string;
  containerSecurityContext?: ArgocdHelmValuesServerContainerSecurityContext;
  readinessProbe?: ArgocdHelmValuesServerReadinessProbe;
  livenessProbe?: ArgocdHelmValuesServerLivenessProbe;
  terminationGracePeriodSeconds?: number;
  priorityClassName?: string;
  nodeSelector?: ArgocdHelmValuesServerNodeSelector;
  tolerations?: unknown[];
  affinity?: ArgocdHelmValuesServerAffinity;
  topologySpreadConstraints?: unknown[];
  deploymentStrategy?: ArgocdHelmValuesServerDeploymentStrategy;
  certificate?: ArgocdHelmValuesServerCertificate;
  certificateSecret?: ArgocdHelmValuesServerCertificateSecret;
  service?: ArgocdHelmValuesServerService;
  metrics?: ArgocdHelmValuesServerMetrics;
  automountServiceAccountToken?: boolean;
  serviceAccount?: ArgocdHelmValuesServerServiceAccount;
  ingress?: ArgocdHelmValuesServerIngress;
  ingressGrpc?: ArgocdHelmValuesServerIngressGrpc;
  route?: ArgocdHelmValuesServerRoute;
  clusterRoleRules?: ArgocdHelmValuesServerClusterRoleRules;
  networkPolicy?: ArgocdHelmValuesServerNetworkPolicy;
};

export type ArgocdHelmValuesServerAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: number;
  behavior?: ArgocdHelmValuesServerAutoscalingBehavior;
  metrics?: unknown[];
};

export type ArgocdHelmValuesServerAutoscalingBehavior = object;

export type ArgocdHelmValuesServerPdb = {
  enabled?: boolean;
  labels?: ArgocdHelmValuesServerPdbLabels;
  annotations?: ArgocdHelmValuesServerPdbAnnotations;
  minAvailable?: string;
  maxUnavailable?: string;
};

export type ArgocdHelmValuesServerPdbLabels = object;

export type ArgocdHelmValuesServerPdbAnnotations = object;

export type ArgocdHelmValuesServerImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesServerLifecycle = object;

export type ArgocdHelmValuesServerExtensions = {
  enabled?: boolean;
  image?: ArgocdHelmValuesServerExtensionsImage;
  extensionList?: unknown[];
  containerSecurityContext?: ArgocdHelmValuesServerExtensionsContainerSecurityContext;
  resources?: ArgocdHelmValuesServerExtensionsResources;
};

export type ArgocdHelmValuesServerExtensionsImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesServerExtensionsContainerSecurityContext = {
  runAsNonRoot?: boolean;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
  runAsUser?: number;
  seccompProfile?: ArgocdHelmValuesServerExtensionsContainerSecurityContextSeccompProfile;
  capabilities?: ArgocdHelmValuesServerExtensionsContainerSecurityContextCapabilities;
};

export type ArgocdHelmValuesServerExtensionsContainerSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type ArgocdHelmValuesServerExtensionsContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type ArgocdHelmValuesServerExtensionsResources = object;

export type ArgocdHelmValuesServerEmptyDir = {
  sizeLimit?: string;
};

export type ArgocdHelmValuesServerDeploymentAnnotations = object;

export type ArgocdHelmValuesServerDeploymentLabels = object;

export type ArgocdHelmValuesServerPodAnnotations = object;

export type ArgocdHelmValuesServerPodLabels = object;

export type ArgocdHelmValuesServerResources = object;

export type ArgocdHelmValuesServerContainerPorts = {
  server?: number;
  metrics?: number;
};

export type ArgocdHelmValuesServerDnsConfig = object;

export type ArgocdHelmValuesServerContainerSecurityContext = {
  runAsNonRoot?: boolean;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
  seccompProfile?: ArgocdHelmValuesServerContainerSecurityContextSeccompProfile;
  capabilities?: ArgocdHelmValuesServerContainerSecurityContextCapabilities;
};

export type ArgocdHelmValuesServerContainerSecurityContextSeccompProfile = {
  type?: string;
};

export type ArgocdHelmValuesServerContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type ArgocdHelmValuesServerReadinessProbe = {
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type ArgocdHelmValuesServerLivenessProbe = {
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type ArgocdHelmValuesServerNodeSelector = object;

export type ArgocdHelmValuesServerAffinity = object;

export type ArgocdHelmValuesServerDeploymentStrategy = object;

export type ArgocdHelmValuesServerCertificate = {
  enabled?: boolean;
  domain?: string;
  additionalHosts?: unknown[];
  duration?: string;
  renewBefore?: string;
  issuer?: ArgocdHelmValuesServerCertificateIssuer;
  privateKey?: ArgocdHelmValuesServerCertificatePrivateKey;
  annotations?: ArgocdHelmValuesServerCertificateAnnotations;
  usages?: unknown[];
  secretTemplateAnnotations?: ArgocdHelmValuesServerCertificateSecretTemplateAnnotations;
};

export type ArgocdHelmValuesServerCertificateIssuer = {
  group?: string;
  kind?: string;
  name?: string;
};

export type ArgocdHelmValuesServerCertificatePrivateKey = {
  rotationPolicy?: string;
  encoding?: string;
  algorithm?: string;
  size?: number;
};

export type ArgocdHelmValuesServerCertificateAnnotations = object;

export type ArgocdHelmValuesServerCertificateSecretTemplateAnnotations = object;

export type ArgocdHelmValuesServerCertificateSecret = {
  enabled?: boolean;
  annotations?: ArgocdHelmValuesServerCertificateSecretAnnotations;
  labels?: ArgocdHelmValuesServerCertificateSecretLabels;
  key?: string;
  crt?: string;
};

export type ArgocdHelmValuesServerCertificateSecretAnnotations = object;

export type ArgocdHelmValuesServerCertificateSecretLabels = object;

export type ArgocdHelmValuesServerService = {
  annotations?: ArgocdHelmValuesServerServiceAnnotations;
  labels?: ArgocdHelmValuesServerServiceLabels;
  type?: string;
  nodePortHttp?: number;
  nodePortHttps?: number;
  servicePortHttp?: number;
  servicePortHttps?: number;
  servicePortHttpName?: string;
  servicePortHttpsName?: string;
  servicePortHttpsAppProtocol?: string;
  loadBalancerClass?: string;
  loadBalancerIP?: string;
  loadBalancerSourceRanges?: unknown[];
  externalIPs?: unknown[];
  externalTrafficPolicy?: string;
  sessionAffinity?: string;
};

export type ArgocdHelmValuesServerServiceAnnotations = object;

export type ArgocdHelmValuesServerServiceLabels = object;

export type ArgocdHelmValuesServerMetrics = {
  enabled?: boolean;
  service?: ArgocdHelmValuesServerMetricsService;
  serviceMonitor?: ArgocdHelmValuesServerMetricsServiceMonitor;
};

export type ArgocdHelmValuesServerMetricsService = {
  type?: string;
  clusterIP?: string;
  annotations?: ArgocdHelmValuesServerMetricsServiceAnnotations;
  labels?: ArgocdHelmValuesServerMetricsServiceLabels;
  servicePort?: number;
  portName?: string;
};

export type ArgocdHelmValuesServerMetricsServiceAnnotations = object;

export type ArgocdHelmValuesServerMetricsServiceLabels = object;

export type ArgocdHelmValuesServerMetricsServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  scrapeTimeout?: string;
  honorLabels?: boolean;
  relabelings?: unknown[];
  metricRelabelings?: unknown[];
  selector?: ArgocdHelmValuesServerMetricsServiceMonitorSelector;
  scheme?: string;
  tlsConfig?: ArgocdHelmValuesServerMetricsServiceMonitorTlsConfig;
  namespace?: string;
  additionalLabels?: ArgocdHelmValuesServerMetricsServiceMonitorAdditionalLabels;
  annotations?: ArgocdHelmValuesServerMetricsServiceMonitorAnnotations;
};

export type ArgocdHelmValuesServerMetricsServiceMonitorSelector = object;

export type ArgocdHelmValuesServerMetricsServiceMonitorTlsConfig = object;

export type ArgocdHelmValuesServerMetricsServiceMonitorAdditionalLabels =
  object;

export type ArgocdHelmValuesServerMetricsServiceMonitorAnnotations = object;

export type ArgocdHelmValuesServerServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: ArgocdHelmValuesServerServiceAccountAnnotations;
  labels?: ArgocdHelmValuesServerServiceAccountLabels;
  automountServiceAccountToken?: boolean;
};

export type ArgocdHelmValuesServerServiceAccountAnnotations = object;

export type ArgocdHelmValuesServerServiceAccountLabels = object;

export type ArgocdHelmValuesServerIngress = {
  enabled?: boolean;
  controller?: string;
  labels?: ArgocdHelmValuesServerIngressLabels;
  annotations?: ArgocdHelmValuesServerIngressAnnotations;
  ingressClassName?: string;
  hostname?: string;
  path?: string;
  pathType?: string;
  tls?: boolean;
  extraHosts?: unknown[];
  extraPaths?: unknown[];
  extraRules?: unknown[];
  extraTls?: unknown[];
  aws?: ArgocdHelmValuesServerIngressAws;
  gke?: ArgocdHelmValuesServerIngressGke;
};

export type ArgocdHelmValuesServerIngressLabels = object;

export type ArgocdHelmValuesServerIngressAnnotations = object;

export type ArgocdHelmValuesServerIngressAws = {
  backendProtocolVersion?: string;
  serviceType?: string;
};

export type ArgocdHelmValuesServerIngressGke = {
  backendConfig?: ArgocdHelmValuesServerIngressGkeBackendConfig;
  frontendConfig?: ArgocdHelmValuesServerIngressGkeFrontendConfig;
  managedCertificate?: ArgocdHelmValuesServerIngressGkeManagedCertificate;
};

export type ArgocdHelmValuesServerIngressGkeBackendConfig = object;

export type ArgocdHelmValuesServerIngressGkeFrontendConfig = object;

export type ArgocdHelmValuesServerIngressGkeManagedCertificate = {
  create?: boolean;
  extraDomains?: unknown[];
};

export type ArgocdHelmValuesServerIngressGrpc = {
  enabled?: boolean;
  annotations?: ArgocdHelmValuesServerIngressGrpcAnnotations;
  labels?: ArgocdHelmValuesServerIngressGrpcLabels;
  ingressClassName?: string;
  hostname?: string;
  path?: string;
  pathType?: string;
  tls?: boolean;
  extraHosts?: unknown[];
  extraPaths?: unknown[];
  extraRules?: unknown[];
  extraTls?: unknown[];
};

export type ArgocdHelmValuesServerIngressGrpcAnnotations = object;

export type ArgocdHelmValuesServerIngressGrpcLabels = object;

export type ArgocdHelmValuesServerRoute = {
  enabled?: boolean;
  annotations?: ArgocdHelmValuesServerRouteAnnotations;
  hostname?: string;
  termination_type?: string;
  termination_policy?: string;
};

export type ArgocdHelmValuesServerRouteAnnotations = object;

export type ArgocdHelmValuesServerClusterRoleRules = {
  enabled?: boolean;
  rules?: unknown[];
};

export type ArgocdHelmValuesServerNetworkPolicy = {
  create?: boolean;
};

export type ArgocdHelmValuesRepoServer = {
  name?: string;
  replicas?: number;
  runtimeClassName?: string;
  autoscaling?: ArgocdHelmValuesRepoServerAutoscaling;
  pdb?: ArgocdHelmValuesRepoServerPdb;
  image?: ArgocdHelmValuesRepoServerImage;
  imagePullSecrets?: unknown[];
  extraArgs?: unknown[];
  env?: unknown[];
  envFrom?: unknown[];
  lifecycle?: ArgocdHelmValuesRepoServerLifecycle;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  volumeMounts?: unknown[];
  volumes?: unknown[];
  existingVolumes?: ArgocdHelmValuesRepoServerExistingVolumes;
  emptyDir?: ArgocdHelmValuesRepoServerEmptyDir;
  useEphemeralHelmWorkingDir?: boolean;
  deploymentAnnotations?: ArgocdHelmValuesRepoServerDeploymentAnnotations;
  deploymentLabels?: ArgocdHelmValuesRepoServerDeploymentLabels;
  podAnnotations?: ArgocdHelmValuesRepoServerPodAnnotations;
  podLabels?: ArgocdHelmValuesRepoServerPodLabels;
  resources?: ArgocdHelmValuesRepoServerResources;
  containerPorts?: ArgocdHelmValuesRepoServerContainerPorts;
  hostNetwork?: boolean;
  dnsConfig?: ArgocdHelmValuesRepoServerDnsConfig;
  dnsPolicy?: string;
  containerSecurityContext?: ArgocdHelmValuesRepoServerContainerSecurityContext;
  readinessProbe?: ArgocdHelmValuesRepoServerReadinessProbe;
  livenessProbe?: ArgocdHelmValuesRepoServerLivenessProbe;
  terminationGracePeriodSeconds?: number;
  nodeSelector?: ArgocdHelmValuesRepoServerNodeSelector;
  tolerations?: unknown[];
  affinity?: ArgocdHelmValuesRepoServerAffinity;
  topologySpreadConstraints?: unknown[];
  deploymentStrategy?: ArgocdHelmValuesRepoServerDeploymentStrategy;
  priorityClassName?: string;
  certificateSecret?: ArgocdHelmValuesRepoServerCertificateSecret;
  service?: ArgocdHelmValuesRepoServerService;
  metrics?: ArgocdHelmValuesRepoServerMetrics;
  clusterRoleRules?: ArgocdHelmValuesRepoServerClusterRoleRules;
  automountServiceAccountToken?: boolean;
  serviceAccount?: ArgocdHelmValuesRepoServerServiceAccount;
  rbac?: unknown[];
  networkPolicy?: ArgocdHelmValuesRepoServerNetworkPolicy;
};

export type ArgocdHelmValuesRepoServerAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: number;
  behavior?: ArgocdHelmValuesRepoServerAutoscalingBehavior;
  metrics?: unknown[];
};

export type ArgocdHelmValuesRepoServerAutoscalingBehavior = object;

export type ArgocdHelmValuesRepoServerPdb = {
  enabled?: boolean;
  labels?: ArgocdHelmValuesRepoServerPdbLabels;
  annotations?: ArgocdHelmValuesRepoServerPdbAnnotations;
  minAvailable?: string;
  maxUnavailable?: string;
};

export type ArgocdHelmValuesRepoServerPdbLabels = object;

export type ArgocdHelmValuesRepoServerPdbAnnotations = object;

export type ArgocdHelmValuesRepoServerImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesRepoServerLifecycle = object;

export type ArgocdHelmValuesRepoServerExistingVolumes = object;

export type ArgocdHelmValuesRepoServerEmptyDir = {
  sizeLimit?: string;
};

export type ArgocdHelmValuesRepoServerDeploymentAnnotations = object;

export type ArgocdHelmValuesRepoServerDeploymentLabels = object;

export type ArgocdHelmValuesRepoServerPodAnnotations = object;

export type ArgocdHelmValuesRepoServerPodLabels = object;

export type ArgocdHelmValuesRepoServerResources = object;

export type ArgocdHelmValuesRepoServerContainerPorts = {
  server?: number;
  metrics?: number;
};

export type ArgocdHelmValuesRepoServerDnsConfig = object;

export type ArgocdHelmValuesRepoServerContainerSecurityContext = {
  runAsNonRoot?: boolean;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
  seccompProfile?: ArgocdHelmValuesRepoServerContainerSecurityContextSeccompProfile;
  capabilities?: ArgocdHelmValuesRepoServerContainerSecurityContextCapabilities;
};

export type ArgocdHelmValuesRepoServerContainerSecurityContextSeccompProfile = {
  type?: string;
};

export type ArgocdHelmValuesRepoServerContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type ArgocdHelmValuesRepoServerReadinessProbe = {
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type ArgocdHelmValuesRepoServerLivenessProbe = {
  failureThreshold?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type ArgocdHelmValuesRepoServerNodeSelector = object;

export type ArgocdHelmValuesRepoServerAffinity = object;

export type ArgocdHelmValuesRepoServerDeploymentStrategy = object;

export type ArgocdHelmValuesRepoServerCertificateSecret = {
  enabled?: boolean;
  annotations?: ArgocdHelmValuesRepoServerCertificateSecretAnnotations;
  labels?: ArgocdHelmValuesRepoServerCertificateSecretLabels;
  ca?: string;
  key?: string;
  crt?: string;
};

export type ArgocdHelmValuesRepoServerCertificateSecretAnnotations = object;

export type ArgocdHelmValuesRepoServerCertificateSecretLabels = object;

export type ArgocdHelmValuesRepoServerService = {
  annotations?: ArgocdHelmValuesRepoServerServiceAnnotations;
  labels?: ArgocdHelmValuesRepoServerServiceLabels;
  port?: number;
  portName?: string;
  trafficDistribution?: string;
};

export type ArgocdHelmValuesRepoServerServiceAnnotations = object;

export type ArgocdHelmValuesRepoServerServiceLabels = object;

export type ArgocdHelmValuesRepoServerMetrics = {
  enabled?: boolean;
  service?: ArgocdHelmValuesRepoServerMetricsService;
  serviceMonitor?: ArgocdHelmValuesRepoServerMetricsServiceMonitor;
};

export type ArgocdHelmValuesRepoServerMetricsService = {
  type?: string;
  clusterIP?: string;
  annotations?: ArgocdHelmValuesRepoServerMetricsServiceAnnotations;
  labels?: ArgocdHelmValuesRepoServerMetricsServiceLabels;
  servicePort?: number;
  portName?: string;
};

export type ArgocdHelmValuesRepoServerMetricsServiceAnnotations = object;

export type ArgocdHelmValuesRepoServerMetricsServiceLabels = object;

export type ArgocdHelmValuesRepoServerMetricsServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  scrapeTimeout?: string;
  honorLabels?: boolean;
  relabelings?: unknown[];
  metricRelabelings?: unknown[];
  selector?: ArgocdHelmValuesRepoServerMetricsServiceMonitorSelector;
  scheme?: string;
  tlsConfig?: ArgocdHelmValuesRepoServerMetricsServiceMonitorTlsConfig;
  namespace?: string;
  additionalLabels?: ArgocdHelmValuesRepoServerMetricsServiceMonitorAdditionalLabels;
  annotations?: ArgocdHelmValuesRepoServerMetricsServiceMonitorAnnotations;
};

export type ArgocdHelmValuesRepoServerMetricsServiceMonitorSelector = object;

export type ArgocdHelmValuesRepoServerMetricsServiceMonitorTlsConfig = object;

export type ArgocdHelmValuesRepoServerMetricsServiceMonitorAdditionalLabels =
  object;

export type ArgocdHelmValuesRepoServerMetricsServiceMonitorAnnotations = object;

export type ArgocdHelmValuesRepoServerClusterRoleRules = {
  enabled?: boolean;
  rules?: unknown[];
};

export type ArgocdHelmValuesRepoServerServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: ArgocdHelmValuesRepoServerServiceAccountAnnotations;
  labels?: ArgocdHelmValuesRepoServerServiceAccountLabels;
  automountServiceAccountToken?: boolean;
};

export type ArgocdHelmValuesRepoServerServiceAccountAnnotations = object;

export type ArgocdHelmValuesRepoServerServiceAccountLabels = object;

export type ArgocdHelmValuesRepoServerNetworkPolicy = {
  create?: boolean;
};

export type ArgocdHelmValuesApplicationSet = {
  name?: string;
  replicas?: number;
  runtimeClassName?: string;
  pdb?: ArgocdHelmValuesApplicationSetPdb;
  image?: ArgocdHelmValuesApplicationSetImage;
  imagePullSecrets?: unknown[];
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraContainers?: unknown[];
  initContainers?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  emptyDir?: ArgocdHelmValuesApplicationSetEmptyDir;
  metrics?: ArgocdHelmValuesApplicationSetMetrics;
  service?: ArgocdHelmValuesApplicationSetService;
  automountServiceAccountToken?: boolean;
  serviceAccount?: ArgocdHelmValuesApplicationSetServiceAccount;
  deploymentAnnotations?: ArgocdHelmValuesApplicationSetDeploymentAnnotations;
  deploymentLabels?: ArgocdHelmValuesApplicationSetDeploymentLabels;
  podAnnotations?: ArgocdHelmValuesApplicationSetPodAnnotations;
  podLabels?: ArgocdHelmValuesApplicationSetPodLabels;
  resources?: ArgocdHelmValuesApplicationSetResources;
  containerPorts?: ArgocdHelmValuesApplicationSetContainerPorts;
  dnsConfig?: ArgocdHelmValuesApplicationSetDnsConfig;
  dnsPolicy?: string;
  containerSecurityContext?: ArgocdHelmValuesApplicationSetContainerSecurityContext;
  readinessProbe?: ArgocdHelmValuesApplicationSetReadinessProbe;
  livenessProbe?: ArgocdHelmValuesApplicationSetLivenessProbe;
  terminationGracePeriodSeconds?: number;
  nodeSelector?: ArgocdHelmValuesApplicationSetNodeSelector;
  tolerations?: unknown[];
  affinity?: ArgocdHelmValuesApplicationSetAffinity;
  topologySpreadConstraints?: unknown[];
  deploymentStrategy?: ArgocdHelmValuesApplicationSetDeploymentStrategy;
  priorityClassName?: string;
  certificate?: ArgocdHelmValuesApplicationSetCertificate;
  ingress?: ArgocdHelmValuesApplicationSetIngress;
  allowAnyNamespace?: boolean;
  networkPolicy?: ArgocdHelmValuesApplicationSetNetworkPolicy;
};

export type ArgocdHelmValuesApplicationSetPdb = {
  enabled?: boolean;
  labels?: ArgocdHelmValuesApplicationSetPdbLabels;
  annotations?: ArgocdHelmValuesApplicationSetPdbAnnotations;
  minAvailable?: string;
  maxUnavailable?: string;
};

export type ArgocdHelmValuesApplicationSetPdbLabels = object;

export type ArgocdHelmValuesApplicationSetPdbAnnotations = object;

export type ArgocdHelmValuesApplicationSetImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesApplicationSetEmptyDir = {
  sizeLimit?: string;
};

export type ArgocdHelmValuesApplicationSetMetrics = {
  enabled?: boolean;
  service?: ArgocdHelmValuesApplicationSetMetricsService;
  serviceMonitor?: ArgocdHelmValuesApplicationSetMetricsServiceMonitor;
};

export type ArgocdHelmValuesApplicationSetMetricsService = {
  type?: string;
  clusterIP?: string;
  annotations?: ArgocdHelmValuesApplicationSetMetricsServiceAnnotations;
  labels?: ArgocdHelmValuesApplicationSetMetricsServiceLabels;
  servicePort?: number;
  portName?: string;
};

export type ArgocdHelmValuesApplicationSetMetricsServiceAnnotations = object;

export type ArgocdHelmValuesApplicationSetMetricsServiceLabels = object;

export type ArgocdHelmValuesApplicationSetMetricsServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  scrapeTimeout?: string;
  honorLabels?: boolean;
  relabelings?: unknown[];
  metricRelabelings?: unknown[];
  selector?: ArgocdHelmValuesApplicationSetMetricsServiceMonitorSelector;
  scheme?: string;
  tlsConfig?: ArgocdHelmValuesApplicationSetMetricsServiceMonitorTlsConfig;
  namespace?: string;
  additionalLabels?: ArgocdHelmValuesApplicationSetMetricsServiceMonitorAdditionalLabels;
  annotations?: ArgocdHelmValuesApplicationSetMetricsServiceMonitorAnnotations;
};

export type ArgocdHelmValuesApplicationSetMetricsServiceMonitorSelector =
  object;

export type ArgocdHelmValuesApplicationSetMetricsServiceMonitorTlsConfig =
  object;

export type ArgocdHelmValuesApplicationSetMetricsServiceMonitorAdditionalLabels =
  object;

export type ArgocdHelmValuesApplicationSetMetricsServiceMonitorAnnotations =
  object;

export type ArgocdHelmValuesApplicationSetService = {
  annotations?: ArgocdHelmValuesApplicationSetServiceAnnotations;
  labels?: ArgocdHelmValuesApplicationSetServiceLabels;
  type?: string;
  port?: number;
  portName?: string;
};

export type ArgocdHelmValuesApplicationSetServiceAnnotations = object;

export type ArgocdHelmValuesApplicationSetServiceLabels = object;

export type ArgocdHelmValuesApplicationSetServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: ArgocdHelmValuesApplicationSetServiceAccountAnnotations;
  labels?: ArgocdHelmValuesApplicationSetServiceAccountLabels;
  automountServiceAccountToken?: boolean;
};

export type ArgocdHelmValuesApplicationSetServiceAccountAnnotations = object;

export type ArgocdHelmValuesApplicationSetServiceAccountLabels = object;

export type ArgocdHelmValuesApplicationSetDeploymentAnnotations = object;

export type ArgocdHelmValuesApplicationSetDeploymentLabels = object;

export type ArgocdHelmValuesApplicationSetPodAnnotations = object;

export type ArgocdHelmValuesApplicationSetPodLabels = object;

export type ArgocdHelmValuesApplicationSetResources = object;

export type ArgocdHelmValuesApplicationSetContainerPorts = {
  metrics?: number;
  probe?: number;
  webhook?: number;
};

export type ArgocdHelmValuesApplicationSetDnsConfig = object;

export type ArgocdHelmValuesApplicationSetContainerSecurityContext = {
  runAsNonRoot?: boolean;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
  seccompProfile?: ArgocdHelmValuesApplicationSetContainerSecurityContextSeccompProfile;
  capabilities?: ArgocdHelmValuesApplicationSetContainerSecurityContextCapabilities;
};

export type ArgocdHelmValuesApplicationSetContainerSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type ArgocdHelmValuesApplicationSetContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type ArgocdHelmValuesApplicationSetReadinessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type ArgocdHelmValuesApplicationSetLivenessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type ArgocdHelmValuesApplicationSetNodeSelector = object;

export type ArgocdHelmValuesApplicationSetAffinity = object;

export type ArgocdHelmValuesApplicationSetDeploymentStrategy = object;

export type ArgocdHelmValuesApplicationSetCertificate = {
  enabled?: boolean;
  domain?: string;
  additionalHosts?: unknown[];
  duration?: string;
  renewBefore?: string;
  issuer?: ArgocdHelmValuesApplicationSetCertificateIssuer;
  privateKey?: ArgocdHelmValuesApplicationSetCertificatePrivateKey;
  annotations?: ArgocdHelmValuesApplicationSetCertificateAnnotations;
};

export type ArgocdHelmValuesApplicationSetCertificateIssuer = {
  group?: string;
  kind?: string;
  name?: string;
};

export type ArgocdHelmValuesApplicationSetCertificatePrivateKey = {
  rotationPolicy?: string;
  encoding?: string;
  algorithm?: string;
  size?: number;
};

export type ArgocdHelmValuesApplicationSetCertificateAnnotations = object;

export type ArgocdHelmValuesApplicationSetIngress = {
  enabled?: boolean;
  labels?: ArgocdHelmValuesApplicationSetIngressLabels;
  annotations?: ArgocdHelmValuesApplicationSetIngressAnnotations;
  ingressClassName?: string;
  hostname?: string;
  path?: string;
  pathType?: string;
  tls?: boolean;
  extraHosts?: unknown[];
  extraPaths?: unknown[];
  extraRules?: unknown[];
  extraTls?: unknown[];
};

export type ArgocdHelmValuesApplicationSetIngressLabels = object;

export type ArgocdHelmValuesApplicationSetIngressAnnotations = object;

export type ArgocdHelmValuesApplicationSetNetworkPolicy = {
  create?: boolean;
};

export type ArgocdHelmValuesNotifications = {
  enabled?: boolean;
  name?: string;
  argocdUrl?: string;
  runtimeClassName?: string;
  pdb?: ArgocdHelmValuesNotificationsPdb;
  image?: ArgocdHelmValuesNotificationsImage;
  imagePullSecrets?: unknown[];
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraContainers?: unknown[];
  initContainers?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  context?: ArgocdHelmValuesNotificationsContext;
  secret?: ArgocdHelmValuesNotificationsSecret;
  metrics?: ArgocdHelmValuesNotificationsMetrics;
  notifiers?: ArgocdHelmValuesNotificationsNotifiers;
  deploymentAnnotations?: ArgocdHelmValuesNotificationsDeploymentAnnotations;
  deploymentLabels?: ArgocdHelmValuesNotificationsDeploymentLabels;
  podAnnotations?: ArgocdHelmValuesNotificationsPodAnnotations;
  podLabels?: ArgocdHelmValuesNotificationsPodLabels;
  resources?: ArgocdHelmValuesNotificationsResources;
  containerPorts?: ArgocdHelmValuesNotificationsContainerPorts;
  dnsConfig?: ArgocdHelmValuesNotificationsDnsConfig;
  dnsPolicy?: string;
  containerSecurityContext?: ArgocdHelmValuesNotificationsContainerSecurityContext;
  readinessProbe?: ArgocdHelmValuesNotificationsReadinessProbe;
  livenessProbe?: ArgocdHelmValuesNotificationsLivenessProbe;
  terminationGracePeriodSeconds?: number;
  nodeSelector?: ArgocdHelmValuesNotificationsNodeSelector;
  tolerations?: unknown[];
  affinity?: ArgocdHelmValuesNotificationsAffinity;
  topologySpreadConstraints?: unknown[];
  deploymentStrategy?: ArgocdHelmValuesNotificationsDeploymentStrategy;
  priorityClassName?: string;
  automountServiceAccountToken?: boolean;
  serviceAccount?: ArgocdHelmValuesNotificationsServiceAccount;
  cm?: ArgocdHelmValuesNotificationsCm;
  clusterRoleRules?: ArgocdHelmValuesNotificationsClusterRoleRules;
  subscriptions?: unknown[];
  templates?: ArgocdHelmValuesNotificationsTemplates;
  triggers?: ArgocdHelmValuesNotificationsTriggers;
  networkPolicy?: ArgocdHelmValuesNotificationsNetworkPolicy;
};

export type ArgocdHelmValuesNotificationsPdb = {
  enabled?: boolean;
  labels?: ArgocdHelmValuesNotificationsPdbLabels;
  annotations?: ArgocdHelmValuesNotificationsPdbAnnotations;
  minAvailable?: string;
  maxUnavailable?: string;
};

export type ArgocdHelmValuesNotificationsPdbLabels = object;

export type ArgocdHelmValuesNotificationsPdbAnnotations = object;

export type ArgocdHelmValuesNotificationsImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesNotificationsContext = object;

export type ArgocdHelmValuesNotificationsSecret = {
  create?: boolean;
  name?: string;
  annotations?: ArgocdHelmValuesNotificationsSecretAnnotations;
  labels?: ArgocdHelmValuesNotificationsSecretLabels;
  items?: ArgocdHelmValuesNotificationsSecretItems;
};

export type ArgocdHelmValuesNotificationsSecretAnnotations = object;

export type ArgocdHelmValuesNotificationsSecretLabels = object;

export type ArgocdHelmValuesNotificationsSecretItems = object;

export type ArgocdHelmValuesNotificationsMetrics = {
  enabled?: boolean;
  port?: number;
  service?: ArgocdHelmValuesNotificationsMetricsService;
  serviceMonitor?: ArgocdHelmValuesNotificationsMetricsServiceMonitor;
};

export type ArgocdHelmValuesNotificationsMetricsService = {
  type?: string;
  clusterIP?: string;
  annotations?: ArgocdHelmValuesNotificationsMetricsServiceAnnotations;
  labels?: ArgocdHelmValuesNotificationsMetricsServiceLabels;
  portName?: string;
};

export type ArgocdHelmValuesNotificationsMetricsServiceAnnotations = object;

export type ArgocdHelmValuesNotificationsMetricsServiceLabels = object;

export type ArgocdHelmValuesNotificationsMetricsServiceMonitor = {
  enabled?: boolean;
  selector?: ArgocdHelmValuesNotificationsMetricsServiceMonitorSelector;
  additionalLabels?: ArgocdHelmValuesNotificationsMetricsServiceMonitorAdditionalLabels;
  annotations?: ArgocdHelmValuesNotificationsMetricsServiceMonitorAnnotations;
  scheme?: string;
  tlsConfig?: ArgocdHelmValuesNotificationsMetricsServiceMonitorTlsConfig;
  honorLabels?: boolean;
  relabelings?: unknown[];
  metricRelabelings?: unknown[];
};

export type ArgocdHelmValuesNotificationsMetricsServiceMonitorSelector = object;

export type ArgocdHelmValuesNotificationsMetricsServiceMonitorAdditionalLabels =
  object;

export type ArgocdHelmValuesNotificationsMetricsServiceMonitorAnnotations =
  object;

export type ArgocdHelmValuesNotificationsMetricsServiceMonitorTlsConfig =
  object;

export type ArgocdHelmValuesNotificationsNotifiers = object;

export type ArgocdHelmValuesNotificationsDeploymentAnnotations = object;

export type ArgocdHelmValuesNotificationsDeploymentLabels = object;

export type ArgocdHelmValuesNotificationsPodAnnotations = object;

export type ArgocdHelmValuesNotificationsPodLabels = object;

export type ArgocdHelmValuesNotificationsResources = object;

export type ArgocdHelmValuesNotificationsContainerPorts = {
  metrics?: number;
};

export type ArgocdHelmValuesNotificationsDnsConfig = object;

export type ArgocdHelmValuesNotificationsContainerSecurityContext = {
  runAsNonRoot?: boolean;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
  seccompProfile?: ArgocdHelmValuesNotificationsContainerSecurityContextSeccompProfile;
  capabilities?: ArgocdHelmValuesNotificationsContainerSecurityContextCapabilities;
};

export type ArgocdHelmValuesNotificationsContainerSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type ArgocdHelmValuesNotificationsContainerSecurityContextCapabilities =
  {
    drop?: string[];
  };

export type ArgocdHelmValuesNotificationsReadinessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type ArgocdHelmValuesNotificationsLivenessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type ArgocdHelmValuesNotificationsNodeSelector = object;

export type ArgocdHelmValuesNotificationsAffinity = object;

export type ArgocdHelmValuesNotificationsDeploymentStrategy = {
  type?: string;
};

export type ArgocdHelmValuesNotificationsServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: ArgocdHelmValuesNotificationsServiceAccountAnnotations;
  labels?: ArgocdHelmValuesNotificationsServiceAccountLabels;
  automountServiceAccountToken?: boolean;
};

export type ArgocdHelmValuesNotificationsServiceAccountAnnotations = object;

export type ArgocdHelmValuesNotificationsServiceAccountLabels = object;

export type ArgocdHelmValuesNotificationsCm = {
  create?: boolean;
};

export type ArgocdHelmValuesNotificationsClusterRoleRules = {
  rules?: unknown[];
};

export type ArgocdHelmValuesNotificationsTemplates = object;

export type ArgocdHelmValuesNotificationsTriggers = object;

export type ArgocdHelmValuesNotificationsNetworkPolicy = {
  create?: boolean;
};

export type ArgocdHelmValuesCommitServer = {
  enabled?: boolean;
  name?: string;
  runtimeClassName?: string;
  image?: ArgocdHelmValuesCommitServerImage;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  metrics?: ArgocdHelmValuesCommitServerMetrics;
  service?: ArgocdHelmValuesCommitServerService;
  automountServiceAccountToken?: boolean;
  serviceAccount?: ArgocdHelmValuesCommitServerServiceAccount;
  deploymentAnnotations?: ArgocdHelmValuesCommitServerDeploymentAnnotations;
  deploymentLabels?: ArgocdHelmValuesCommitServerDeploymentLabels;
  podAnnotations?: ArgocdHelmValuesCommitServerPodAnnotations;
  podLabels?: ArgocdHelmValuesCommitServerPodLabels;
  resources?: ArgocdHelmValuesCommitServerResources;
  dnsConfig?: ArgocdHelmValuesCommitServerDnsConfig;
  dnsPolicy?: string;
  containerSecurityContext?: ArgocdHelmValuesCommitServerContainerSecurityContext;
  readinessProbe?: ArgocdHelmValuesCommitServerReadinessProbe;
  livenessProbe?: ArgocdHelmValuesCommitServerLivenessProbe;
  terminationGracePeriodSeconds?: number;
  nodeSelector?: ArgocdHelmValuesCommitServerNodeSelector;
  tolerations?: unknown[];
  affinity?: ArgocdHelmValuesCommitServerAffinity;
  topologySpreadConstraints?: unknown[];
  deploymentStrategy?: ArgocdHelmValuesCommitServerDeploymentStrategy;
  priorityClassName?: string;
  networkPolicy?: ArgocdHelmValuesCommitServerNetworkPolicy;
};

export type ArgocdHelmValuesCommitServerImage = {
  repository?: string;
  tag?: string;
  imagePullPolicy?: string;
};

export type ArgocdHelmValuesCommitServerMetrics = {
  enabled?: boolean;
  service?: ArgocdHelmValuesCommitServerMetricsService;
};

export type ArgocdHelmValuesCommitServerMetricsService = {
  type?: string;
  clusterIP?: string;
  annotations?: ArgocdHelmValuesCommitServerMetricsServiceAnnotations;
  labels?: ArgocdHelmValuesCommitServerMetricsServiceLabels;
  servicePort?: number;
  portName?: string;
};

export type ArgocdHelmValuesCommitServerMetricsServiceAnnotations = object;

export type ArgocdHelmValuesCommitServerMetricsServiceLabels = object;

export type ArgocdHelmValuesCommitServerService = {
  annotations?: ArgocdHelmValuesCommitServerServiceAnnotations;
  labels?: ArgocdHelmValuesCommitServerServiceLabels;
  port?: number;
  portName?: string;
};

export type ArgocdHelmValuesCommitServerServiceAnnotations = object;

export type ArgocdHelmValuesCommitServerServiceLabels = object;

export type ArgocdHelmValuesCommitServerServiceAccount = {
  create?: boolean;
  name?: string;
  annotations?: ArgocdHelmValuesCommitServerServiceAccountAnnotations;
  labels?: ArgocdHelmValuesCommitServerServiceAccountLabels;
  automountServiceAccountToken?: boolean;
};

export type ArgocdHelmValuesCommitServerServiceAccountAnnotations = object;

export type ArgocdHelmValuesCommitServerServiceAccountLabels = object;

export type ArgocdHelmValuesCommitServerDeploymentAnnotations = object;

export type ArgocdHelmValuesCommitServerDeploymentLabels = object;

export type ArgocdHelmValuesCommitServerPodAnnotations = object;

export type ArgocdHelmValuesCommitServerPodLabels = object;

export type ArgocdHelmValuesCommitServerResources = object;

export type ArgocdHelmValuesCommitServerDnsConfig = object;

export type ArgocdHelmValuesCommitServerContainerSecurityContext = {
  runAsNonRoot?: boolean;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
  capabilities?: ArgocdHelmValuesCommitServerContainerSecurityContextCapabilities;
  seccompProfile?: ArgocdHelmValuesCommitServerContainerSecurityContextSeccompProfile;
};

export type ArgocdHelmValuesCommitServerContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type ArgocdHelmValuesCommitServerContainerSecurityContextSeccompProfile =
  {
    type?: string;
  };

export type ArgocdHelmValuesCommitServerReadinessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  failureThreshold?: number;
};

export type ArgocdHelmValuesCommitServerLivenessProbe = {
  enabled?: boolean;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  failureThreshold?: number;
};

export type ArgocdHelmValuesCommitServerNodeSelector = object;

export type ArgocdHelmValuesCommitServerAffinity = object;

export type ArgocdHelmValuesCommitServerDeploymentStrategy = object;

export type ArgocdHelmValuesCommitServerNetworkPolicy = {
  create?: boolean;
};

export type ArgocdHelmValues = {
  nameOverride?: string;
  fullnameOverride?: string;
  namespaceOverride?: string;
  kubeVersionOverride?: string;
  apiVersionOverrides?: ArgocdHelmValuesApiVersionOverrides;
  createAggregateRoles?: boolean;
  createClusterRoles?: boolean;
  openshift?: ArgocdHelmValuesOpenshift;
  crds?: ArgocdHelmValuesCrds;
  global?: ArgocdHelmValuesGlobal;
  configs?: ArgocdHelmValuesConfigs;
  extraObjects?: unknown[];
  controller?: ArgocdHelmValuesController;
  dex?: ArgocdHelmValuesDex;
  redis?: ArgocdHelmValuesRedis;
  "redis-ha"?: ArgocdHelmValuesRedisha;
  externalRedis?: ArgocdHelmValuesExternalRedis;
  redisSecretInit?: ArgocdHelmValuesRedisSecretInit;
  server?: ArgocdHelmValuesServer;
  repoServer?: ArgocdHelmValuesRepoServer;
  applicationSet?: ArgocdHelmValuesApplicationSet;
  notifications?: ArgocdHelmValuesNotifications;
  commitServer?: ArgocdHelmValuesCommitServer;
};

export type ArgocdHelmParameters = {
  nameOverride?: string;
  fullnameOverride?: string;
  namespaceOverride?: string;
  kubeVersionOverride?: string;
  createAggregateRoles?: string;
  createClusterRoles?: string;
  "openshift.enabled"?: string;
  "crds.install"?: string;
  "crds.keep"?: string;
  "global.domain"?: string;
  "global.runtimeClassName"?: string;
  "global.revisionHistoryLimit"?: string;
  "global.image.repository"?: string;
  "global.image.tag"?: string;
  "global.image.imagePullPolicy"?: string;
  "global.imagePullSecrets"?: string;
  "global.logging.format"?: string;
  "global.logging.level"?: string;
  "global.addPrometheusAnnotations"?: string;
  "global.hostAliases"?: string;
  "global.dualStack.ipFamilyPolicy"?: string;
  "global.dualStack.ipFamilies"?: string;
  "global.networkPolicy.create"?: string;
  "global.networkPolicy.defaultDenyIngress"?: string;
  "global.priorityClassName"?: string;
  "global.nodeSelector.kubernetes.io/os"?: string;
  "global.tolerations"?: string;
  "global.affinity.podAntiAffinity"?: string;
  "global.affinity.nodeAffinity.type"?: string;
  "global.affinity.nodeAffinity.matchExpressions"?: string;
  "global.topologySpreadConstraints"?: string;
  "global.env"?: string;
  "configs.cm.create"?: string;
  "configs.cm.application.instanceLabelKey"?: string;
  "configs.cm.application.sync.impersonation.enabled"?: string;
  "configs.cm.server.rbac.log.enforce.enable"?: string;
  "configs.cm.exec.enabled"?: string;
  "configs.cm.admin.enabled"?: string;
  "configs.cm.timeout.reconciliation"?: string;
  "configs.cm.timeout.hard.reconciliation"?: string;
  "configs.cm.statusbadge.enabled"?: string;
  "configs.cm.resource.customizations.ignoreResourceUpdates.all"?: string;
  "configs.cm.resource.customizations.ignoreResourceUpdates.argoproj.io_Application"?: string;
  "configs.cm.resource.customizations.ignoreResourceUpdates.argoproj.io_Rollout"?: string;
  "configs.cm.resource.customizations.ignoreResourceUpdates.autoscaling_HorizontalPodAutoscaler"?: string;
  "configs.cm.resource.customizations.ignoreResourceUpdates.ConfigMap"?: string;
  "configs.cm.resource.customizations.ignoreResourceUpdates.apps_ReplicaSet"?: string;
  "configs.cm.resource.customizations.ignoreResourceUpdates.discovery.k8s.io_EndpointSlice"?: string;
  "configs.cm.resource.customizations.ignoreResourceUpdates.Endpoints"?: string;
  "configs.cm.resource.exclusions"?: string;
  "configs.params.create"?: string;
  "configs.params.otlp.address"?: string;
  "configs.params.controller.status.processors"?: string;
  "configs.params.controller.operation.processors"?: string;
  "configs.params.controller.self.heal.timeout.seconds"?: string;
  "configs.params.controller.repo.server.timeout.seconds"?: string;
  "configs.params.controller.sync.timeout.seconds"?: string;
  "configs.params.server.insecure"?: string;
  "configs.params.server.basehref"?: string;
  "configs.params.server.rootpath"?: string;
  "configs.params.server.staticassets"?: string;
  "configs.params.server.disable.auth"?: string;
  "configs.params.server.enable.gzip"?: string;
  "configs.params.server.enable.proxy.extension"?: string;
  "configs.params.hydrator.enabled"?: string;
  "configs.params.server.x.frame.options"?: string;
  "configs.params.reposerver.parallelism.limit"?: string;
  "configs.params.applicationsetcontroller.policy"?: string;
  "configs.params.applicationsetcontroller.enable.progressive.syncs"?: string;
  "configs.params.applicationsetcontroller.namespaces"?: string;
  "configs.params.application.namespaces"?: string;
  "configs.params.controller.ignore.normalizer.jq.timeout"?: string;
  "configs.rbac.create"?: string;
  "configs.rbac.policy.default"?: string;
  "configs.rbac.policy.csv"?: string;
  "configs.rbac.scopes"?: string;
  "configs.rbac.policy.matchMode"?: string;
  "configs.ssh.create"?: string;
  "configs.ssh.knownHosts"?: string;
  "configs.ssh.extraHosts"?: string;
  "configs.tls.create"?: string;
  "configs.cmp.create"?: string;
  "configs.secret.createSecret"?: string;
  "configs.secret.githubSecret"?: string;
  "configs.secret.gitlabSecret"?: string;
  "configs.secret.bitbucketServerSecret"?: string;
  "configs.secret.bitbucketUUID"?: string;
  "configs.secret.gogsSecret"?: string;
  "configs.secret.azureDevops.username"?: string;
  "configs.secret.azureDevops.password"?: string;
  "configs.secret.argocdServerAdminPassword"?: string;
  "configs.secret.argocdServerAdminPasswordMtime"?: string;
  "configs.styles"?: string;
  extraObjects?: string;
  "controller.name"?: string;
  "controller.replicas"?: string;
  "controller.dynamicClusterDistribution"?: string;
  "controller.runtimeClassName"?: string;
  "controller.heartbeatTime"?: string;
  "controller.revisionHistoryLimit"?: string;
  "controller.pdb.enabled"?: string;
  "controller.pdb.minAvailable"?: string;
  "controller.pdb.maxUnavailable"?: string;
  "controller.image.repository"?: string;
  "controller.image.tag"?: string;
  "controller.image.imagePullPolicy"?: string;
  "controller.imagePullSecrets"?: string;
  "controller.extraArgs"?: string;
  "controller.env"?: string;
  "controller.envFrom"?: string;
  "controller.extraContainers"?: string;
  "controller.initContainers"?: string;
  "controller.volumeMounts"?: string;
  "controller.volumes"?: string;
  "controller.emptyDir.sizeLimit"?: string;
  "controller.containerPorts.metrics"?: string;
  "controller.hostNetwork"?: string;
  "controller.dnsPolicy"?: string;
  "controller.containerSecurityContext.runAsNonRoot"?: string;
  "controller.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "controller.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "controller.containerSecurityContext.seccompProfile.type"?: string;
  "controller.containerSecurityContext.capabilities.drop"?: string;
  "controller.readinessProbe.failureThreshold"?: string;
  "controller.readinessProbe.initialDelaySeconds"?: string;
  "controller.readinessProbe.periodSeconds"?: string;
  "controller.readinessProbe.successThreshold"?: string;
  "controller.readinessProbe.timeoutSeconds"?: string;
  "controller.terminationGracePeriodSeconds"?: string;
  "controller.priorityClassName"?: string;
  "controller.tolerations"?: string;
  "controller.topologySpreadConstraints"?: string;
  "controller.automountServiceAccountToken"?: string;
  "controller.serviceAccount.create"?: string;
  "controller.serviceAccount.name"?: string;
  "controller.serviceAccount.automountServiceAccountToken"?: string;
  "controller.metrics.enabled"?: string;
  "controller.metrics.scrapeTimeout"?: string;
  "controller.metrics.applicationLabels.enabled"?: string;
  "controller.metrics.applicationLabels.labels"?: string;
  "controller.metrics.service.type"?: string;
  "controller.metrics.service.clusterIP"?: string;
  "controller.metrics.service.servicePort"?: string;
  "controller.metrics.service.portName"?: string;
  "controller.metrics.serviceMonitor.enabled"?: string;
  "controller.metrics.serviceMonitor.interval"?: string;
  "controller.metrics.serviceMonitor.honorLabels"?: string;
  "controller.metrics.serviceMonitor.relabelings"?: string;
  "controller.metrics.serviceMonitor.metricRelabelings"?: string;
  "controller.metrics.serviceMonitor.scheme"?: string;
  "controller.metrics.serviceMonitor.namespace"?: string;
  "controller.metrics.rules.enabled"?: string;
  "controller.metrics.rules.namespace"?: string;
  "controller.metrics.rules.spec"?: string;
  "controller.clusterRoleRules.enabled"?: string;
  "controller.clusterRoleRules.rules"?: string;
  "controller.networkPolicy.create"?: string;
  "dex.enabled"?: string;
  "dex.name"?: string;
  "dex.extraArgs"?: string;
  "dex.runtimeClassName"?: string;
  "dex.metrics.enabled"?: string;
  "dex.metrics.service.portName"?: string;
  "dex.metrics.serviceMonitor.enabled"?: string;
  "dex.metrics.serviceMonitor.interval"?: string;
  "dex.metrics.serviceMonitor.honorLabels"?: string;
  "dex.metrics.serviceMonitor.relabelings"?: string;
  "dex.metrics.serviceMonitor.metricRelabelings"?: string;
  "dex.metrics.serviceMonitor.scheme"?: string;
  "dex.metrics.serviceMonitor.namespace"?: string;
  "dex.pdb.enabled"?: string;
  "dex.pdb.minAvailable"?: string;
  "dex.pdb.maxUnavailable"?: string;
  "dex.image.repository"?: string;
  "dex.image.tag"?: string;
  "dex.image.imagePullPolicy"?: string;
  "dex.imagePullSecrets"?: string;
  "dex.initImage.repository"?: string;
  "dex.initImage.tag"?: string;
  "dex.initImage.imagePullPolicy"?: string;
  "dex.env"?: string;
  "dex.envFrom"?: string;
  "dex.extraContainers"?: string;
  "dex.initContainers"?: string;
  "dex.volumeMounts"?: string;
  "dex.volumes"?: string;
  "dex.emptyDir.sizeLimit"?: string;
  "dex.certificateSecret.enabled"?: string;
  "dex.certificateSecret.ca"?: string;
  "dex.certificateSecret.key"?: string;
  "dex.certificateSecret.crt"?: string;
  "dex.containerPorts.http"?: string;
  "dex.containerPorts.grpc"?: string;
  "dex.containerPorts.metrics"?: string;
  "dex.dnsPolicy"?: string;
  "dex.containerSecurityContext.runAsNonRoot"?: string;
  "dex.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "dex.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "dex.containerSecurityContext.seccompProfile.type"?: string;
  "dex.containerSecurityContext.capabilities.drop"?: string;
  "dex.livenessProbe.enabled"?: string;
  "dex.livenessProbe.httpPath"?: string;
  "dex.livenessProbe.httpPort"?: string;
  "dex.livenessProbe.httpScheme"?: string;
  "dex.livenessProbe.failureThreshold"?: string;
  "dex.livenessProbe.initialDelaySeconds"?: string;
  "dex.livenessProbe.periodSeconds"?: string;
  "dex.livenessProbe.successThreshold"?: string;
  "dex.livenessProbe.timeoutSeconds"?: string;
  "dex.readinessProbe.enabled"?: string;
  "dex.readinessProbe.httpPath"?: string;
  "dex.readinessProbe.httpPort"?: string;
  "dex.readinessProbe.httpScheme"?: string;
  "dex.readinessProbe.failureThreshold"?: string;
  "dex.readinessProbe.initialDelaySeconds"?: string;
  "dex.readinessProbe.periodSeconds"?: string;
  "dex.readinessProbe.successThreshold"?: string;
  "dex.readinessProbe.timeoutSeconds"?: string;
  "dex.terminationGracePeriodSeconds"?: string;
  "dex.automountServiceAccountToken"?: string;
  "dex.serviceAccount.create"?: string;
  "dex.serviceAccount.name"?: string;
  "dex.serviceAccount.automountServiceAccountToken"?: string;
  "dex.servicePortHttp"?: string;
  "dex.servicePortHttpName"?: string;
  "dex.servicePortGrpc"?: string;
  "dex.servicePortGrpcName"?: string;
  "dex.servicePortMetrics"?: string;
  "dex.priorityClassName"?: string;
  "dex.tolerations"?: string;
  "dex.topologySpreadConstraints"?: string;
  "dex.networkPolicy.create"?: string;
  "redis.enabled"?: string;
  "redis.name"?: string;
  "redis.runtimeClassName"?: string;
  "redis.pdb.enabled"?: string;
  "redis.pdb.minAvailable"?: string;
  "redis.pdb.maxUnavailable"?: string;
  "redis.image.repository"?: string;
  "redis.image.tag"?: string;
  "redis.image.imagePullPolicy"?: string;
  "redis.exporter.enabled"?: string;
  "redis.exporter.env"?: string;
  "redis.exporter.image.repository"?: string;
  "redis.exporter.image.tag"?: string;
  "redis.exporter.image.imagePullPolicy"?: string;
  "redis.exporter.containerSecurityContext.runAsNonRoot"?: string;
  "redis.exporter.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "redis.exporter.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "redis.exporter.containerSecurityContext.seccompProfile.type"?: string;
  "redis.exporter.containerSecurityContext.capabilities.drop"?: string;
  "redis.exporter.readinessProbe.enabled"?: string;
  "redis.exporter.readinessProbe.initialDelaySeconds"?: string;
  "redis.exporter.readinessProbe.periodSeconds"?: string;
  "redis.exporter.readinessProbe.timeoutSeconds"?: string;
  "redis.exporter.readinessProbe.successThreshold"?: string;
  "redis.exporter.readinessProbe.failureThreshold"?: string;
  "redis.exporter.livenessProbe.enabled"?: string;
  "redis.exporter.livenessProbe.initialDelaySeconds"?: string;
  "redis.exporter.livenessProbe.periodSeconds"?: string;
  "redis.exporter.livenessProbe.timeoutSeconds"?: string;
  "redis.exporter.livenessProbe.successThreshold"?: string;
  "redis.exporter.livenessProbe.failureThreshold"?: string;
  "redis.imagePullSecrets"?: string;
  "redis.extraArgs"?: string;
  "redis.env"?: string;
  "redis.envFrom"?: string;
  "redis.readinessProbe.enabled"?: string;
  "redis.readinessProbe.initialDelaySeconds"?: string;
  "redis.readinessProbe.periodSeconds"?: string;
  "redis.readinessProbe.timeoutSeconds"?: string;
  "redis.readinessProbe.successThreshold"?: string;
  "redis.readinessProbe.failureThreshold"?: string;
  "redis.livenessProbe.enabled"?: string;
  "redis.livenessProbe.initialDelaySeconds"?: string;
  "redis.livenessProbe.periodSeconds"?: string;
  "redis.livenessProbe.timeoutSeconds"?: string;
  "redis.livenessProbe.successThreshold"?: string;
  "redis.livenessProbe.failureThreshold"?: string;
  "redis.extraContainers"?: string;
  "redis.initContainers"?: string;
  "redis.volumeMounts"?: string;
  "redis.volumes"?: string;
  "redis.securityContext.runAsNonRoot"?: string;
  "redis.securityContext.runAsUser"?: string;
  "redis.securityContext.seccompProfile.type"?: string;
  "redis.containerPorts.redis"?: string;
  "redis.containerPorts.metrics"?: string;
  "redis.dnsPolicy"?: string;
  "redis.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "redis.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "redis.containerSecurityContext.capabilities.drop"?: string;
  "redis.servicePort"?: string;
  "redis.priorityClassName"?: string;
  "redis.tolerations"?: string;
  "redis.topologySpreadConstraints"?: string;
  "redis.terminationGracePeriodSeconds"?: string;
  "redis.automountServiceAccountToken"?: string;
  "redis.serviceAccount.create"?: string;
  "redis.serviceAccount.name"?: string;
  "redis.serviceAccount.automountServiceAccountToken"?: string;
  "redis.metrics.enabled"?: string;
  "redis.metrics.service.type"?: string;
  "redis.metrics.service.clusterIP"?: string;
  "redis.metrics.service.servicePort"?: string;
  "redis.metrics.service.portName"?: string;
  "redis.metrics.serviceMonitor.enabled"?: string;
  "redis.metrics.serviceMonitor.interval"?: string;
  "redis.metrics.serviceMonitor.honorLabels"?: string;
  "redis.metrics.serviceMonitor.relabelings"?: string;
  "redis.metrics.serviceMonitor.metricRelabelings"?: string;
  "redis.metrics.serviceMonitor.scheme"?: string;
  "redis.metrics.serviceMonitor.namespace"?: string;
  "redis.networkPolicy.create"?: string;
  "redis-ha.enabled"?: string;
  "redis-ha.image.repository"?: string;
  "redis-ha.image.tag"?: string;
  "redis-ha.exporter.enabled"?: string;
  "redis-ha.exporter.image"?: string;
  "redis-ha.exporter.tag"?: string;
  "redis-ha.persistentVolume.enabled"?: string;
  "redis-ha.redis.masterGroupName"?: string;
  "redis-ha.redis.config.save"?: string;
  "redis-ha.haproxy.enabled"?: string;
  "redis-ha.haproxy.labels.app.kubernetes.io/name"?: string;
  "redis-ha.haproxy.image.repository"?: string;
  "redis-ha.haproxy.metrics.enabled"?: string;
  "redis-ha.haproxy.hardAntiAffinity"?: string;
  "redis-ha.haproxy.affinity"?: string;
  "redis-ha.haproxy.tolerations"?: string;
  "redis-ha.haproxy.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "redis-ha.auth"?: string;
  "redis-ha.existingSecret"?: string;
  "redis-ha.hardAntiAffinity"?: string;
  "redis-ha.affinity"?: string;
  "redis-ha.tolerations"?: string;
  "redis-ha.topologySpreadConstraints.enabled"?: string;
  "redis-ha.topologySpreadConstraints.maxSkew"?: string;
  "redis-ha.topologySpreadConstraints.topologyKey"?: string;
  "redis-ha.topologySpreadConstraints.whenUnsatisfiable"?: string;
  "redis-ha.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "externalRedis.host"?: string;
  "externalRedis.username"?: string;
  "externalRedis.password"?: string;
  "externalRedis.port"?: string;
  "externalRedis.existingSecret"?: string;
  "redisSecretInit.enabled"?: string;
  "redisSecretInit.name"?: string;
  "redisSecretInit.image.repository"?: string;
  "redisSecretInit.image.tag"?: string;
  "redisSecretInit.image.imagePullPolicy"?: string;
  "redisSecretInit.imagePullSecrets"?: string;
  "redisSecretInit.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "redisSecretInit.containerSecurityContext.capabilities.drop"?: string;
  "redisSecretInit.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "redisSecretInit.containerSecurityContext.runAsNonRoot"?: string;
  "redisSecretInit.containerSecurityContext.seccompProfile.type"?: string;
  "redisSecretInit.serviceAccount.create"?: string;
  "redisSecretInit.serviceAccount.name"?: string;
  "redisSecretInit.serviceAccount.automountServiceAccountToken"?: string;
  "redisSecretInit.priorityClassName"?: string;
  "redisSecretInit.tolerations"?: string;
  "server.name"?: string;
  "server.replicas"?: string;
  "server.runtimeClassName"?: string;
  "server.autoscaling.enabled"?: string;
  "server.autoscaling.minReplicas"?: string;
  "server.autoscaling.maxReplicas"?: string;
  "server.autoscaling.targetCPUUtilizationPercentage"?: string;
  "server.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "server.autoscaling.metrics"?: string;
  "server.pdb.enabled"?: string;
  "server.pdb.minAvailable"?: string;
  "server.pdb.maxUnavailable"?: string;
  "server.image.repository"?: string;
  "server.image.tag"?: string;
  "server.image.imagePullPolicy"?: string;
  "server.imagePullSecrets"?: string;
  "server.extraArgs"?: string;
  "server.env"?: string;
  "server.envFrom"?: string;
  "server.extensions.enabled"?: string;
  "server.extensions.image.repository"?: string;
  "server.extensions.image.tag"?: string;
  "server.extensions.image.imagePullPolicy"?: string;
  "server.extensions.extensionList"?: string;
  "server.extensions.containerSecurityContext.runAsNonRoot"?: string;
  "server.extensions.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "server.extensions.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "server.extensions.containerSecurityContext.runAsUser"?: string;
  "server.extensions.containerSecurityContext.seccompProfile.type"?: string;
  "server.extensions.containerSecurityContext.capabilities.drop"?: string;
  "server.extraContainers"?: string;
  "server.initContainers"?: string;
  "server.volumeMounts"?: string;
  "server.volumes"?: string;
  "server.emptyDir.sizeLimit"?: string;
  "server.containerPorts.server"?: string;
  "server.containerPorts.metrics"?: string;
  "server.hostNetwork"?: string;
  "server.dnsPolicy"?: string;
  "server.containerSecurityContext.runAsNonRoot"?: string;
  "server.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "server.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "server.containerSecurityContext.seccompProfile.type"?: string;
  "server.containerSecurityContext.capabilities.drop"?: string;
  "server.readinessProbe.failureThreshold"?: string;
  "server.readinessProbe.initialDelaySeconds"?: string;
  "server.readinessProbe.periodSeconds"?: string;
  "server.readinessProbe.successThreshold"?: string;
  "server.readinessProbe.timeoutSeconds"?: string;
  "server.livenessProbe.failureThreshold"?: string;
  "server.livenessProbe.initialDelaySeconds"?: string;
  "server.livenessProbe.periodSeconds"?: string;
  "server.livenessProbe.successThreshold"?: string;
  "server.livenessProbe.timeoutSeconds"?: string;
  "server.terminationGracePeriodSeconds"?: string;
  "server.priorityClassName"?: string;
  "server.tolerations"?: string;
  "server.topologySpreadConstraints"?: string;
  "server.certificate.enabled"?: string;
  "server.certificate.domain"?: string;
  "server.certificate.additionalHosts"?: string;
  "server.certificate.duration"?: string;
  "server.certificate.renewBefore"?: string;
  "server.certificate.issuer.group"?: string;
  "server.certificate.issuer.kind"?: string;
  "server.certificate.issuer.name"?: string;
  "server.certificate.privateKey.rotationPolicy"?: string;
  "server.certificate.privateKey.encoding"?: string;
  "server.certificate.privateKey.algorithm"?: string;
  "server.certificate.privateKey.size"?: string;
  "server.certificate.usages"?: string;
  "server.certificateSecret.enabled"?: string;
  "server.certificateSecret.key"?: string;
  "server.certificateSecret.crt"?: string;
  "server.service.type"?: string;
  "server.service.nodePortHttp"?: string;
  "server.service.nodePortHttps"?: string;
  "server.service.servicePortHttp"?: string;
  "server.service.servicePortHttps"?: string;
  "server.service.servicePortHttpName"?: string;
  "server.service.servicePortHttpsName"?: string;
  "server.service.servicePortHttpsAppProtocol"?: string;
  "server.service.loadBalancerClass"?: string;
  "server.service.loadBalancerIP"?: string;
  "server.service.loadBalancerSourceRanges"?: string;
  "server.service.externalIPs"?: string;
  "server.service.externalTrafficPolicy"?: string;
  "server.service.sessionAffinity"?: string;
  "server.metrics.enabled"?: string;
  "server.metrics.service.type"?: string;
  "server.metrics.service.clusterIP"?: string;
  "server.metrics.service.servicePort"?: string;
  "server.metrics.service.portName"?: string;
  "server.metrics.serviceMonitor.enabled"?: string;
  "server.metrics.serviceMonitor.interval"?: string;
  "server.metrics.serviceMonitor.scrapeTimeout"?: string;
  "server.metrics.serviceMonitor.honorLabels"?: string;
  "server.metrics.serviceMonitor.relabelings"?: string;
  "server.metrics.serviceMonitor.metricRelabelings"?: string;
  "server.metrics.serviceMonitor.scheme"?: string;
  "server.metrics.serviceMonitor.namespace"?: string;
  "server.automountServiceAccountToken"?: string;
  "server.serviceAccount.create"?: string;
  "server.serviceAccount.name"?: string;
  "server.serviceAccount.automountServiceAccountToken"?: string;
  "server.ingress.enabled"?: string;
  "server.ingress.controller"?: string;
  "server.ingress.ingressClassName"?: string;
  "server.ingress.hostname"?: string;
  "server.ingress.path"?: string;
  "server.ingress.pathType"?: string;
  "server.ingress.tls"?: string;
  "server.ingress.extraHosts"?: string;
  "server.ingress.extraPaths"?: string;
  "server.ingress.extraRules"?: string;
  "server.ingress.extraTls"?: string;
  "server.ingress.aws.backendProtocolVersion"?: string;
  "server.ingress.aws.serviceType"?: string;
  "server.ingress.gke.managedCertificate.create"?: string;
  "server.ingress.gke.managedCertificate.extraDomains"?: string;
  "server.ingressGrpc.enabled"?: string;
  "server.ingressGrpc.ingressClassName"?: string;
  "server.ingressGrpc.hostname"?: string;
  "server.ingressGrpc.path"?: string;
  "server.ingressGrpc.pathType"?: string;
  "server.ingressGrpc.tls"?: string;
  "server.ingressGrpc.extraHosts"?: string;
  "server.ingressGrpc.extraPaths"?: string;
  "server.ingressGrpc.extraRules"?: string;
  "server.ingressGrpc.extraTls"?: string;
  "server.route.enabled"?: string;
  "server.route.hostname"?: string;
  "server.route.termination_type"?: string;
  "server.route.termination_policy"?: string;
  "server.clusterRoleRules.enabled"?: string;
  "server.clusterRoleRules.rules"?: string;
  "server.networkPolicy.create"?: string;
  "repoServer.name"?: string;
  "repoServer.replicas"?: string;
  "repoServer.runtimeClassName"?: string;
  "repoServer.autoscaling.enabled"?: string;
  "repoServer.autoscaling.minReplicas"?: string;
  "repoServer.autoscaling.maxReplicas"?: string;
  "repoServer.autoscaling.targetCPUUtilizationPercentage"?: string;
  "repoServer.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "repoServer.autoscaling.metrics"?: string;
  "repoServer.pdb.enabled"?: string;
  "repoServer.pdb.minAvailable"?: string;
  "repoServer.pdb.maxUnavailable"?: string;
  "repoServer.image.repository"?: string;
  "repoServer.image.tag"?: string;
  "repoServer.image.imagePullPolicy"?: string;
  "repoServer.imagePullSecrets"?: string;
  "repoServer.extraArgs"?: string;
  "repoServer.env"?: string;
  "repoServer.envFrom"?: string;
  "repoServer.extraContainers"?: string;
  "repoServer.initContainers"?: string;
  "repoServer.volumeMounts"?: string;
  "repoServer.volumes"?: string;
  "repoServer.emptyDir.sizeLimit"?: string;
  "repoServer.useEphemeralHelmWorkingDir"?: string;
  "repoServer.containerPorts.server"?: string;
  "repoServer.containerPorts.metrics"?: string;
  "repoServer.hostNetwork"?: string;
  "repoServer.dnsPolicy"?: string;
  "repoServer.containerSecurityContext.runAsNonRoot"?: string;
  "repoServer.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "repoServer.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "repoServer.containerSecurityContext.seccompProfile.type"?: string;
  "repoServer.containerSecurityContext.capabilities.drop"?: string;
  "repoServer.readinessProbe.failureThreshold"?: string;
  "repoServer.readinessProbe.initialDelaySeconds"?: string;
  "repoServer.readinessProbe.periodSeconds"?: string;
  "repoServer.readinessProbe.successThreshold"?: string;
  "repoServer.readinessProbe.timeoutSeconds"?: string;
  "repoServer.livenessProbe.failureThreshold"?: string;
  "repoServer.livenessProbe.initialDelaySeconds"?: string;
  "repoServer.livenessProbe.periodSeconds"?: string;
  "repoServer.livenessProbe.successThreshold"?: string;
  "repoServer.livenessProbe.timeoutSeconds"?: string;
  "repoServer.terminationGracePeriodSeconds"?: string;
  "repoServer.tolerations"?: string;
  "repoServer.topologySpreadConstraints"?: string;
  "repoServer.priorityClassName"?: string;
  "repoServer.certificateSecret.enabled"?: string;
  "repoServer.certificateSecret.ca"?: string;
  "repoServer.certificateSecret.key"?: string;
  "repoServer.certificateSecret.crt"?: string;
  "repoServer.service.port"?: string;
  "repoServer.service.portName"?: string;
  "repoServer.service.trafficDistribution"?: string;
  "repoServer.metrics.enabled"?: string;
  "repoServer.metrics.service.type"?: string;
  "repoServer.metrics.service.clusterIP"?: string;
  "repoServer.metrics.service.servicePort"?: string;
  "repoServer.metrics.service.portName"?: string;
  "repoServer.metrics.serviceMonitor.enabled"?: string;
  "repoServer.metrics.serviceMonitor.interval"?: string;
  "repoServer.metrics.serviceMonitor.scrapeTimeout"?: string;
  "repoServer.metrics.serviceMonitor.honorLabels"?: string;
  "repoServer.metrics.serviceMonitor.relabelings"?: string;
  "repoServer.metrics.serviceMonitor.metricRelabelings"?: string;
  "repoServer.metrics.serviceMonitor.scheme"?: string;
  "repoServer.metrics.serviceMonitor.namespace"?: string;
  "repoServer.clusterRoleRules.enabled"?: string;
  "repoServer.clusterRoleRules.rules"?: string;
  "repoServer.automountServiceAccountToken"?: string;
  "repoServer.serviceAccount.create"?: string;
  "repoServer.serviceAccount.name"?: string;
  "repoServer.serviceAccount.automountServiceAccountToken"?: string;
  "repoServer.rbac"?: string;
  "repoServer.networkPolicy.create"?: string;
  "applicationSet.name"?: string;
  "applicationSet.replicas"?: string;
  "applicationSet.runtimeClassName"?: string;
  "applicationSet.pdb.enabled"?: string;
  "applicationSet.pdb.minAvailable"?: string;
  "applicationSet.pdb.maxUnavailable"?: string;
  "applicationSet.image.repository"?: string;
  "applicationSet.image.tag"?: string;
  "applicationSet.image.imagePullPolicy"?: string;
  "applicationSet.imagePullSecrets"?: string;
  "applicationSet.extraArgs"?: string;
  "applicationSet.extraEnv"?: string;
  "applicationSet.extraEnvFrom"?: string;
  "applicationSet.extraContainers"?: string;
  "applicationSet.initContainers"?: string;
  "applicationSet.extraVolumeMounts"?: string;
  "applicationSet.extraVolumes"?: string;
  "applicationSet.emptyDir.sizeLimit"?: string;
  "applicationSet.metrics.enabled"?: string;
  "applicationSet.metrics.service.type"?: string;
  "applicationSet.metrics.service.clusterIP"?: string;
  "applicationSet.metrics.service.servicePort"?: string;
  "applicationSet.metrics.service.portName"?: string;
  "applicationSet.metrics.serviceMonitor.enabled"?: string;
  "applicationSet.metrics.serviceMonitor.interval"?: string;
  "applicationSet.metrics.serviceMonitor.scrapeTimeout"?: string;
  "applicationSet.metrics.serviceMonitor.honorLabels"?: string;
  "applicationSet.metrics.serviceMonitor.relabelings"?: string;
  "applicationSet.metrics.serviceMonitor.metricRelabelings"?: string;
  "applicationSet.metrics.serviceMonitor.scheme"?: string;
  "applicationSet.metrics.serviceMonitor.namespace"?: string;
  "applicationSet.service.type"?: string;
  "applicationSet.service.port"?: string;
  "applicationSet.service.portName"?: string;
  "applicationSet.automountServiceAccountToken"?: string;
  "applicationSet.serviceAccount.create"?: string;
  "applicationSet.serviceAccount.name"?: string;
  "applicationSet.serviceAccount.automountServiceAccountToken"?: string;
  "applicationSet.containerPorts.metrics"?: string;
  "applicationSet.containerPorts.probe"?: string;
  "applicationSet.containerPorts.webhook"?: string;
  "applicationSet.dnsPolicy"?: string;
  "applicationSet.containerSecurityContext.runAsNonRoot"?: string;
  "applicationSet.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "applicationSet.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "applicationSet.containerSecurityContext.seccompProfile.type"?: string;
  "applicationSet.containerSecurityContext.capabilities.drop"?: string;
  "applicationSet.readinessProbe.enabled"?: string;
  "applicationSet.readinessProbe.initialDelaySeconds"?: string;
  "applicationSet.readinessProbe.periodSeconds"?: string;
  "applicationSet.readinessProbe.timeoutSeconds"?: string;
  "applicationSet.readinessProbe.successThreshold"?: string;
  "applicationSet.readinessProbe.failureThreshold"?: string;
  "applicationSet.livenessProbe.enabled"?: string;
  "applicationSet.livenessProbe.initialDelaySeconds"?: string;
  "applicationSet.livenessProbe.periodSeconds"?: string;
  "applicationSet.livenessProbe.timeoutSeconds"?: string;
  "applicationSet.livenessProbe.successThreshold"?: string;
  "applicationSet.livenessProbe.failureThreshold"?: string;
  "applicationSet.terminationGracePeriodSeconds"?: string;
  "applicationSet.tolerations"?: string;
  "applicationSet.topologySpreadConstraints"?: string;
  "applicationSet.priorityClassName"?: string;
  "applicationSet.certificate.enabled"?: string;
  "applicationSet.certificate.domain"?: string;
  "applicationSet.certificate.additionalHosts"?: string;
  "applicationSet.certificate.duration"?: string;
  "applicationSet.certificate.renewBefore"?: string;
  "applicationSet.certificate.issuer.group"?: string;
  "applicationSet.certificate.issuer.kind"?: string;
  "applicationSet.certificate.issuer.name"?: string;
  "applicationSet.certificate.privateKey.rotationPolicy"?: string;
  "applicationSet.certificate.privateKey.encoding"?: string;
  "applicationSet.certificate.privateKey.algorithm"?: string;
  "applicationSet.certificate.privateKey.size"?: string;
  "applicationSet.ingress.enabled"?: string;
  "applicationSet.ingress.ingressClassName"?: string;
  "applicationSet.ingress.hostname"?: string;
  "applicationSet.ingress.path"?: string;
  "applicationSet.ingress.pathType"?: string;
  "applicationSet.ingress.tls"?: string;
  "applicationSet.ingress.extraHosts"?: string;
  "applicationSet.ingress.extraPaths"?: string;
  "applicationSet.ingress.extraRules"?: string;
  "applicationSet.ingress.extraTls"?: string;
  "applicationSet.allowAnyNamespace"?: string;
  "applicationSet.networkPolicy.create"?: string;
  "notifications.enabled"?: string;
  "notifications.name"?: string;
  "notifications.argocdUrl"?: string;
  "notifications.runtimeClassName"?: string;
  "notifications.pdb.enabled"?: string;
  "notifications.pdb.minAvailable"?: string;
  "notifications.pdb.maxUnavailable"?: string;
  "notifications.image.repository"?: string;
  "notifications.image.tag"?: string;
  "notifications.image.imagePullPolicy"?: string;
  "notifications.imagePullSecrets"?: string;
  "notifications.extraArgs"?: string;
  "notifications.extraEnv"?: string;
  "notifications.extraEnvFrom"?: string;
  "notifications.extraContainers"?: string;
  "notifications.initContainers"?: string;
  "notifications.extraVolumeMounts"?: string;
  "notifications.extraVolumes"?: string;
  "notifications.secret.create"?: string;
  "notifications.secret.name"?: string;
  "notifications.metrics.enabled"?: string;
  "notifications.metrics.port"?: string;
  "notifications.metrics.service.type"?: string;
  "notifications.metrics.service.clusterIP"?: string;
  "notifications.metrics.service.portName"?: string;
  "notifications.metrics.serviceMonitor.enabled"?: string;
  "notifications.metrics.serviceMonitor.scheme"?: string;
  "notifications.metrics.serviceMonitor.honorLabels"?: string;
  "notifications.metrics.serviceMonitor.relabelings"?: string;
  "notifications.metrics.serviceMonitor.metricRelabelings"?: string;
  "notifications.containerPorts.metrics"?: string;
  "notifications.dnsPolicy"?: string;
  "notifications.containerSecurityContext.runAsNonRoot"?: string;
  "notifications.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "notifications.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "notifications.containerSecurityContext.seccompProfile.type"?: string;
  "notifications.containerSecurityContext.capabilities.drop"?: string;
  "notifications.readinessProbe.enabled"?: string;
  "notifications.readinessProbe.initialDelaySeconds"?: string;
  "notifications.readinessProbe.periodSeconds"?: string;
  "notifications.readinessProbe.timeoutSeconds"?: string;
  "notifications.readinessProbe.successThreshold"?: string;
  "notifications.readinessProbe.failureThreshold"?: string;
  "notifications.livenessProbe.enabled"?: string;
  "notifications.livenessProbe.initialDelaySeconds"?: string;
  "notifications.livenessProbe.periodSeconds"?: string;
  "notifications.livenessProbe.timeoutSeconds"?: string;
  "notifications.livenessProbe.successThreshold"?: string;
  "notifications.livenessProbe.failureThreshold"?: string;
  "notifications.terminationGracePeriodSeconds"?: string;
  "notifications.tolerations"?: string;
  "notifications.topologySpreadConstraints"?: string;
  "notifications.deploymentStrategy.type"?: string;
  "notifications.priorityClassName"?: string;
  "notifications.automountServiceAccountToken"?: string;
  "notifications.serviceAccount.create"?: string;
  "notifications.serviceAccount.name"?: string;
  "notifications.serviceAccount.automountServiceAccountToken"?: string;
  "notifications.cm.create"?: string;
  "notifications.clusterRoleRules.rules"?: string;
  "notifications.subscriptions"?: string;
  "notifications.networkPolicy.create"?: string;
  "commitServer.enabled"?: string;
  "commitServer.name"?: string;
  "commitServer.runtimeClassName"?: string;
  "commitServer.image.repository"?: string;
  "commitServer.image.tag"?: string;
  "commitServer.image.imagePullPolicy"?: string;
  "commitServer.extraArgs"?: string;
  "commitServer.extraEnv"?: string;
  "commitServer.extraEnvFrom"?: string;
  "commitServer.extraVolumeMounts"?: string;
  "commitServer.extraVolumes"?: string;
  "commitServer.metrics.enabled"?: string;
  "commitServer.metrics.service.type"?: string;
  "commitServer.metrics.service.clusterIP"?: string;
  "commitServer.metrics.service.servicePort"?: string;
  "commitServer.metrics.service.portName"?: string;
  "commitServer.service.port"?: string;
  "commitServer.service.portName"?: string;
  "commitServer.automountServiceAccountToken"?: string;
  "commitServer.serviceAccount.create"?: string;
  "commitServer.serviceAccount.name"?: string;
  "commitServer.serviceAccount.automountServiceAccountToken"?: string;
  "commitServer.dnsPolicy"?: string;
  "commitServer.containerSecurityContext.runAsNonRoot"?: string;
  "commitServer.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "commitServer.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "commitServer.containerSecurityContext.capabilities.drop"?: string;
  "commitServer.containerSecurityContext.seccompProfile.type"?: string;
  "commitServer.readinessProbe.enabled"?: string;
  "commitServer.readinessProbe.initialDelaySeconds"?: string;
  "commitServer.readinessProbe.periodSeconds"?: string;
  "commitServer.readinessProbe.timeoutSeconds"?: string;
  "commitServer.readinessProbe.failureThreshold"?: string;
  "commitServer.livenessProbe.enabled"?: string;
  "commitServer.livenessProbe.initialDelaySeconds"?: string;
  "commitServer.livenessProbe.periodSeconds"?: string;
  "commitServer.livenessProbe.timeoutSeconds"?: string;
  "commitServer.livenessProbe.failureThreshold"?: string;
  "commitServer.terminationGracePeriodSeconds"?: string;
  "commitServer.tolerations"?: string;
  "commitServer.topologySpreadConstraints"?: string;
  "commitServer.priorityClassName"?: string;
  "commitServer.networkPolicy.create"?: string;
};
