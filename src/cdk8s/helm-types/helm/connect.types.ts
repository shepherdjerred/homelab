// Generated TypeScript types for connect Helm chart

export type ConnectHelmValuesCommonLabels = object;

export type ConnectHelmValuesConnect = {
  create?: boolean;
  replicas?: number;
  api?: ConnectHelmValuesConnectApi;
  sync?: ConnectHelmValuesConnectSync;
  applicationName?: string;
  host?: string;
  serviceType?: string;
  serviceAnnotations?: ConnectHelmValuesConnectServiceAnnotations;
  credentialsName?: string;
  credentialsKey?: string;
  credentials?: unknown;
  credentials_base64?: unknown;
  imagePullPolicy?: string;
  imagePullSecrets?: unknown[];
  version?: string;
  nodeSelector?: ConnectHelmValuesConnectNodeSelector;
  affinity?: ConnectHelmValuesConnectAffinity;
  hpa?: ConnectHelmValuesConnectHpa;
  pdb?: ConnectHelmValuesConnectPdb;
  probes?: ConnectHelmValuesConnectProbes;
  priorityClassName?: string;
  annotations?: ConnectHelmValuesConnectAnnotations;
  labels?: ConnectHelmValuesConnectLabels;
  podAnnotations?: ConnectHelmValuesConnectPodAnnotations;
  podLabels?: ConnectHelmValuesConnectPodLabels;
  tolerations?: unknown[];
  dataVolume?: ConnectHelmValuesConnectDataVolume;
  tls?: ConnectHelmValuesConnectTls;
  ingress?: ConnectHelmValuesConnectIngress;
  profiler?: ConnectHelmValuesConnectProfiler;
  customEnvVars?: unknown[];
};

export type ConnectHelmValuesConnectApi = {
  name?: string;
  imageRepository?: string;
  resources?: ConnectHelmValuesConnectApiResources;
  httpPort?: number;
  httpsPort?: number;
  logLevel?: string;
  serviceMonitor?: ConnectHelmValuesConnectApiServiceMonitor;
};

export type ConnectHelmValuesConnectApiResources = {
  limits?: ConnectHelmValuesConnectApiResourcesLimits;
  requests?: ConnectHelmValuesConnectApiResourcesRequests;
};

export type ConnectHelmValuesConnectApiResourcesLimits = {
  memory?: string;
};

export type ConnectHelmValuesConnectApiResourcesRequests = {
  cpu?: number;
};

export type ConnectHelmValuesConnectApiServiceMonitor = {
  enabled?: boolean;
  interval?: string;
  path?: string;
  params?: ConnectHelmValuesConnectApiServiceMonitorParams;
  annotations?: ConnectHelmValuesConnectApiServiceMonitorAnnotations;
};

export type ConnectHelmValuesConnectApiServiceMonitorParams = object;

export type ConnectHelmValuesConnectApiServiceMonitorAnnotations = object;

export type ConnectHelmValuesConnectSync = {
  name?: string;
  imageRepository?: string;
  resources?: ConnectHelmValuesConnectSyncResources;
  httpPort?: number;
  logLevel?: string;
};

export type ConnectHelmValuesConnectSyncResources = object;

export type ConnectHelmValuesConnectServiceAnnotations = object;

export type ConnectHelmValuesConnectNodeSelector = object;

export type ConnectHelmValuesConnectAffinity = object;

export type ConnectHelmValuesConnectHpa = {
  enabled?: boolean;
  annotations?: ConnectHelmValuesConnectHpaAnnotations;
  minReplicas?: number;
  maxReplicas?: number;
  avgMemoryUtilization?: number;
  avgCpuUtilization?: number;
  behavior?: ConnectHelmValuesConnectHpaBehavior;
};

export type ConnectHelmValuesConnectHpaAnnotations = object;

export type ConnectHelmValuesConnectHpaBehavior = object;

export type ConnectHelmValuesConnectPdb = {
  enabled?: boolean;
  annotations?: ConnectHelmValuesConnectPdbAnnotations;
  maxUnavailable?: number;
  minAvailable?: number;
};

export type ConnectHelmValuesConnectPdbAnnotations = object;

export type ConnectHelmValuesConnectProbes = {
  liveness?: boolean;
  readiness?: boolean;
};

export type ConnectHelmValuesConnectAnnotations = object;

export type ConnectHelmValuesConnectLabels = object;

export type ConnectHelmValuesConnectPodAnnotations = object;

export type ConnectHelmValuesConnectPodLabels = object;

export type ConnectHelmValuesConnectDataVolume = {
  name?: string;
  type?: string;
  values?: ConnectHelmValuesConnectDataVolumeValues;
};

export type ConnectHelmValuesConnectDataVolumeValues = object;

export type ConnectHelmValuesConnectTls = {
  enabled?: boolean;
  secret?: string;
};

export type ConnectHelmValuesConnectIngress = {
  enabled?: boolean;
  labels?: ConnectHelmValuesConnectIngressLabels;
  annotations?: ConnectHelmValuesConnectIngressAnnotations;
  ingressClassName?: string;
  pathType?: string;
  hosts?: ConnectHelmValuesConnectIngressHostsElement[];
  extraPaths?: unknown[];
  tls?: unknown[];
};

export type ConnectHelmValuesConnectIngressLabels = object;

export type ConnectHelmValuesConnectIngressAnnotations = object;

export type ConnectHelmValuesConnectIngressHostsElement = {
  host?: string;
  paths?: unknown[];
};

export type ConnectHelmValuesConnectProfiler = {
  enabled?: boolean;
  interval?: string;
  keepLast?: number;
};

export type ConnectHelmValuesOperator = {
  create?: boolean;
  authMethod?: string;
  replicas?: number;
  autoRestart?: boolean;
  applicationName?: string;
  imagePullPolicy?: string;
  imagePullSecrets?: unknown[];
  imageRepository?: string;
  pollingInterval?: number;
  version?: string;
  nodeSelector?: ConnectHelmValuesOperatorNodeSelector;
  affinity?: ConnectHelmValuesOperatorAffinity;
  hpa?: ConnectHelmValuesOperatorHpa;
  pdb?: ConnectHelmValuesOperatorPdb;
  annotations?: ConnectHelmValuesOperatorAnnotations;
  labels?: ConnectHelmValuesOperatorLabels;
  podAnnotations?: ConnectHelmValuesOperatorPodAnnotations;
  podLabels?: ConnectHelmValuesOperatorPodLabels;
  priorityClassName?: string;
  tolerations?: unknown[];
  watchNamespace?: unknown[];
  resources?: ConnectHelmValuesOperatorResources;
  token?: ConnectHelmValuesOperatorToken;
  serviceAccountToken?: ConnectHelmValuesOperatorServiceAccountToken;
  serviceAccount?: ConnectHelmValuesOperatorServiceAccount;
  roleBinding?: ConnectHelmValuesOperatorRoleBinding;
  clusterRole?: ConnectHelmValuesOperatorClusterRole;
  clusterRoleBinding?: ConnectHelmValuesOperatorClusterRoleBinding;
  logLevel?: string;
  customEnvVars?: unknown[];
};

export type ConnectHelmValuesOperatorNodeSelector = object;

export type ConnectHelmValuesOperatorAffinity = object;

export type ConnectHelmValuesOperatorHpa = {
  enabled?: boolean;
  annotations?: ConnectHelmValuesOperatorHpaAnnotations;
  minReplicas?: number;
  maxReplicas?: number;
  avgMemoryUtilization?: number;
  avgCpuUtilization?: number;
  behavior?: ConnectHelmValuesOperatorHpaBehavior;
};

export type ConnectHelmValuesOperatorHpaAnnotations = object;

export type ConnectHelmValuesOperatorHpaBehavior = object;

export type ConnectHelmValuesOperatorPdb = {
  enabled?: boolean;
  annotations?: ConnectHelmValuesOperatorPdbAnnotations;
  maxUnavailable?: number;
  minAvailable?: number;
};

export type ConnectHelmValuesOperatorPdbAnnotations = object;

export type ConnectHelmValuesOperatorAnnotations = object;

export type ConnectHelmValuesOperatorLabels = object;

export type ConnectHelmValuesOperatorPodAnnotations = object;

export type ConnectHelmValuesOperatorPodLabels = object;

export type ConnectHelmValuesOperatorResources = object;

export type ConnectHelmValuesOperatorToken = {
  name?: string;
  key?: string;
  value?: unknown;
};

export type ConnectHelmValuesOperatorServiceAccountToken = {
  name?: string;
  key?: string;
  value?: unknown;
};

export type ConnectHelmValuesOperatorServiceAccount = {
  create?: string;
  annotations?: ConnectHelmValuesOperatorServiceAccountAnnotations;
  name?: string;
};

export type ConnectHelmValuesOperatorServiceAccountAnnotations = object;

export type ConnectHelmValuesOperatorRoleBinding = {
  create?: string;
  name?: string;
};

export type ConnectHelmValuesOperatorClusterRole = {
  create?: string;
  name?: string;
};

export type ConnectHelmValuesOperatorClusterRoleBinding = {
  create?: string;
  name?: string;
};

export type ConnectHelmValuesAcceptanceTests = {
  enabled?: boolean;
  fixtures?: ConnectHelmValuesAcceptanceTestsFixtures;
  healthCheck?: ConnectHelmValuesAcceptanceTestsHealthCheck;
};

export type ConnectHelmValuesAcceptanceTestsFixtures = object;

export type ConnectHelmValuesAcceptanceTestsHealthCheck = {
  enabled?: boolean;
  image?: ConnectHelmValuesAcceptanceTestsHealthCheckImage;
};

export type ConnectHelmValuesAcceptanceTestsHealthCheckImage = {
  repository?: string;
  tag?: string;
};

export type ConnectHelmValues = {
  commonLabels?: ConnectHelmValuesCommonLabels;
  connect?: ConnectHelmValuesConnect;
  operator?: ConnectHelmValuesOperator;
  acceptanceTests?: ConnectHelmValuesAcceptanceTests;
};

export type ConnectHelmParameters = {
  "connect.create"?: string;
  "connect.replicas"?: string;
  "connect.api.name"?: string;
  "connect.api.imageRepository"?: string;
  "connect.api.resources.limits.memory"?: string;
  "connect.api.resources.requests.cpu"?: string;
  "connect.api.httpPort"?: string;
  "connect.api.httpsPort"?: string;
  "connect.api.logLevel"?: string;
  "connect.api.serviceMonitor.enabled"?: string;
  "connect.api.serviceMonitor.interval"?: string;
  "connect.api.serviceMonitor.path"?: string;
  "connect.sync.name"?: string;
  "connect.sync.imageRepository"?: string;
  "connect.sync.httpPort"?: string;
  "connect.sync.logLevel"?: string;
  "connect.applicationName"?: string;
  "connect.host"?: string;
  "connect.serviceType"?: string;
  "connect.credentialsName"?: string;
  "connect.credentialsKey"?: string;
  "connect.credentials"?: string;
  "connect.credentials_base64"?: string;
  "connect.imagePullPolicy"?: string;
  "connect.imagePullSecrets"?: string;
  "connect.version"?: string;
  "connect.hpa.enabled"?: string;
  "connect.hpa.minReplicas"?: string;
  "connect.hpa.maxReplicas"?: string;
  "connect.hpa.avgMemoryUtilization"?: string;
  "connect.hpa.avgCpuUtilization"?: string;
  "connect.pdb.enabled"?: string;
  "connect.pdb.maxUnavailable"?: string;
  "connect.pdb.minAvailable"?: string;
  "connect.probes.liveness"?: string;
  "connect.probes.readiness"?: string;
  "connect.priorityClassName"?: string;
  "connect.tolerations"?: string;
  "connect.dataVolume.name"?: string;
  "connect.dataVolume.type"?: string;
  "connect.tls.enabled"?: string;
  "connect.tls.secret"?: string;
  "connect.ingress.enabled"?: string;
  "connect.ingress.ingressClassName"?: string;
  "connect.ingress.pathType"?: string;
  "connect.ingress.hosts.host"?: string;
  "connect.ingress.hosts.paths"?: string;
  "connect.ingress.extraPaths"?: string;
  "connect.ingress.tls"?: string;
  "connect.profiler.enabled"?: string;
  "connect.profiler.interval"?: string;
  "connect.profiler.keepLast"?: string;
  "connect.customEnvVars"?: string;
  "operator.create"?: string;
  "operator.authMethod"?: string;
  "operator.replicas"?: string;
  "operator.autoRestart"?: string;
  "operator.applicationName"?: string;
  "operator.imagePullPolicy"?: string;
  "operator.imagePullSecrets"?: string;
  "operator.imageRepository"?: string;
  "operator.pollingInterval"?: string;
  "operator.version"?: string;
  "operator.hpa.enabled"?: string;
  "operator.hpa.minReplicas"?: string;
  "operator.hpa.maxReplicas"?: string;
  "operator.hpa.avgMemoryUtilization"?: string;
  "operator.hpa.avgCpuUtilization"?: string;
  "operator.pdb.enabled"?: string;
  "operator.pdb.maxUnavailable"?: string;
  "operator.pdb.minAvailable"?: string;
  "operator.priorityClassName"?: string;
  "operator.tolerations"?: string;
  "operator.watchNamespace"?: string;
  "operator.token.name"?: string;
  "operator.token.key"?: string;
  "operator.token.value"?: string;
  "operator.serviceAccountToken.name"?: string;
  "operator.serviceAccountToken.key"?: string;
  "operator.serviceAccountToken.value"?: string;
  "operator.serviceAccount.create"?: string;
  "operator.serviceAccount.name"?: string;
  "operator.roleBinding.create"?: string;
  "operator.roleBinding.name"?: string;
  "operator.clusterRole.create"?: string;
  "operator.clusterRole.name"?: string;
  "operator.clusterRoleBinding.create"?: string;
  "operator.clusterRoleBinding.name"?: string;
  "operator.logLevel"?: string;
  "operator.customEnvVars"?: string;
  "acceptanceTests.enabled"?: string;
  "acceptanceTests.healthCheck.enabled"?: string;
  "acceptanceTests.healthCheck.image.repository"?: string;
  "acceptanceTests.healthCheck.image.tag"?: string;
};
