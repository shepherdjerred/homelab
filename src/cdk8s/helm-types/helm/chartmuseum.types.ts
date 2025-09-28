// Generated TypeScript types for chartmuseum Helm chart

export type ChartmuseumHelmValuesStrategy = {
  type?: string;
};

export type ChartmuseumHelmValuesImage = {
  repository?: string;
  tag?: string;
  pullPolicy?: string;
};

export type ChartmuseumHelmValuesSecret = {
  labels?: ChartmuseumHelmValuesSecretLabels;
};

export type ChartmuseumHelmValuesSecretLabels = object;

export type ChartmuseumHelmValuesCommonLabels = object;

export type ChartmuseumHelmValuesEnv = {
  open?: ChartmuseumHelmValuesEnvOpen;
  field?: ChartmuseumHelmValuesEnvField;
  secret?: ChartmuseumHelmValuesEnvSecret;
  existingSecret?: unknown;
  existingSecretMappings?: ChartmuseumHelmValuesEnvExistingSecretMappings;
};

export type ChartmuseumHelmValuesEnvOpen = {
  STORAGE?: string;
  STORAGE_ALIBABA_BUCKET?: unknown;
  STORAGE_ALIBABA_PREFIX?: unknown;
  STORAGE_ALIBABA_ENDPOINT?: unknown;
  STORAGE_ALIBABA_SSE?: unknown;
  STORAGE_AMAZON_BUCKET?: unknown;
  STORAGE_AMAZON_PREFIX?: unknown;
  STORAGE_AMAZON_REGION?: unknown;
  STORAGE_AMAZON_ENDPOINT?: unknown;
  STORAGE_AMAZON_SSE?: unknown;
  STORAGE_GOOGLE_BUCKET?: unknown;
  STORAGE_GOOGLE_PREFIX?: unknown;
  STORAGE_MICROSOFT_CONTAINER?: unknown;
  STORAGE_MICROSOFT_PREFIX?: unknown;
  STORAGE_OPENSTACK_CONTAINER?: unknown;
  STORAGE_OPENSTACK_PREFIX?: unknown;
  STORAGE_OPENSTACK_REGION?: unknown;
  STORAGE_OPENSTACK_CACERT?: unknown;
  STORAGE_ORACLE_COMPARTMENTID?: unknown;
  STORAGE_ORACLE_BUCKET?: unknown;
  STORAGE_ORACLE_PREFIX?: unknown;
  CHART_POST_FORM_FIELD_NAME?: string;
  PROV_POST_FORM_FIELD_NAME?: string;
  DEPTH?: number;
  DEBUG?: boolean;
  LOG_JSON?: boolean;
  DISABLE_STATEFILES?: boolean;
  ENABLE_METRICS?: boolean;
  DISABLE_API?: boolean;
  ALLOW_OVERWRITE?: boolean;
  CHART_URL?: unknown;
  AUTH_ANONYMOUS_GET?: boolean;
  CONTEXT_PATH?: unknown;
  INDEX_LIMIT?: number;
  CACHE?: unknown;
  CACHE_REDIS_ADDR?: unknown;
  CACHE_REDIS_DB?: number;
  BEARER_AUTH?: boolean;
  AUTH_REALM?: unknown;
  AUTH_SERVICE?: unknown;
};

export type ChartmuseumHelmValuesEnvField = object;

export type ChartmuseumHelmValuesEnvSecret = {
  BASIC_AUTH_USER?: unknown;
  BASIC_AUTH_PASS?: unknown;
  GOOGLE_CREDENTIALS_JSON?: unknown;
  CACHE_REDIS_PASSWORD?: unknown;
};

export type ChartmuseumHelmValuesEnvExistingSecretMappings = {
  BASIC_AUTH_USER?: unknown;
  BASIC_AUTH_PASS?: unknown;
  GOOGLE_CREDENTIALS_JSON?: unknown;
  CACHE_REDIS_PASSWORD?: unknown;
};

export type ChartmuseumHelmValuesDeployment = {
  annotations?: ChartmuseumHelmValuesDeploymentAnnotations;
  labels?: ChartmuseumHelmValuesDeploymentLabels;
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  sidecarContainers?: ChartmuseumHelmValuesDeploymentSidecarContainers;
};

export type ChartmuseumHelmValuesDeploymentAnnotations = object;

export type ChartmuseumHelmValuesDeploymentLabels = object;

export type ChartmuseumHelmValuesDeploymentSidecarContainers = object;

export type ChartmuseumHelmValuesPodAnnotations = object;

export type ChartmuseumHelmValuesPodLabels = object;

export type ChartmuseumHelmValuesService = {
  servicename?: unknown;
  type?: string;
  externalTrafficPolicy?: string;
  loadBalancerIP?: unknown;
  loadBalancerSourceRanges?: unknown[];
  externalPort?: number;
  targetPort?: unknown;
  nodePort?: unknown;
  annotations?: ChartmuseumHelmValuesServiceAnnotations;
  labels?: ChartmuseumHelmValuesServiceLabels;
};

export type ChartmuseumHelmValuesServiceAnnotations = object;

export type ChartmuseumHelmValuesServiceLabels = object;

export type ChartmuseumHelmValuesServiceMonitor = {
  enabled?: boolean;
  labels?: ChartmuseumHelmValuesServiceMonitorLabels;
  metricsPath?: string;
};

export type ChartmuseumHelmValuesServiceMonitorLabels = object;

export type ChartmuseumHelmValuesResources = object;

export type ChartmuseumHelmValuesProbes = {
  liveness?: ChartmuseumHelmValuesProbesLiveness;
  livenessHttpGetConfig?: ChartmuseumHelmValuesProbesLivenessHttpGetConfig;
  readiness?: ChartmuseumHelmValuesProbesReadiness;
  readinessHttpGetConfig?: ChartmuseumHelmValuesProbesReadinessHttpGetConfig;
};

export type ChartmuseumHelmValuesProbesLiveness = {
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type ChartmuseumHelmValuesProbesLivenessHttpGetConfig = {
  scheme?: string;
};

export type ChartmuseumHelmValuesProbesReadiness = {
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  successThreshold?: number;
  failureThreshold?: number;
};

export type ChartmuseumHelmValuesProbesReadinessHttpGetConfig = {
  scheme?: string;
};

export type ChartmuseumHelmValuesServiceAccount = {
  create?: boolean;
  name?: string;
  automountServiceAccountToken?: boolean;
  annotations?: ChartmuseumHelmValuesServiceAccountAnnotations;
};

export type ChartmuseumHelmValuesServiceAccountAnnotations = object;

export type ChartmuseumHelmValuesSecurityContext = {
  enabled?: boolean;
  fsGroup?: number;
};

export type ChartmuseumHelmValuesContainerSecurityContext = object;

export type ChartmuseumHelmValuesNodeSelector = object;

export type ChartmuseumHelmValuesAffinity = object;

export type ChartmuseumHelmValuesPersistence = {
  enabled?: boolean;
  accessMode?: string;
  size?: string;
  labels?: ChartmuseumHelmValuesPersistenceLabels;
  path?: string;
  pv?: ChartmuseumHelmValuesPersistencePv;
  // manually added
  storageClass?: string;
};

export type ChartmuseumHelmValuesPersistenceLabels = object;

export type ChartmuseumHelmValuesPersistencePv = {
  enabled?: boolean;
  pvname?: unknown;
  capacity?: ChartmuseumHelmValuesPersistencePvCapacity;
  accessMode?: string;
  nfs?: ChartmuseumHelmValuesPersistencePvNfs;
};

export type ChartmuseumHelmValuesPersistencePvCapacity = {
  storage?: string;
};

export type ChartmuseumHelmValuesPersistencePvNfs = {
  server?: unknown;
  path?: unknown;
};

export type ChartmuseumHelmValuesVolumePermissions = {
  image?: ChartmuseumHelmValuesVolumePermissionsImage;
};

export type ChartmuseumHelmValuesVolumePermissionsImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  pullPolicy?: string;
};

export type ChartmuseumHelmValuesIngress = {
  enabled?: boolean;
  pathType?: string;
  labels?: ChartmuseumHelmValuesIngressLabels;
  annotations?: ChartmuseumHelmValuesIngressAnnotations;
  hosts?: unknown[];
  ingressClassName?: unknown;
};

export type ChartmuseumHelmValuesIngressLabels = object;

export type ChartmuseumHelmValuesIngressAnnotations = object;

export type ChartmuseumHelmValuesGcp = {
  secret?: ChartmuseumHelmValuesGcpSecret;
};

export type ChartmuseumHelmValuesGcpSecret = {
  enabled?: boolean;
  name?: unknown;
  key?: string;
};

export type ChartmuseumHelmValuesOracle = {
  secret?: ChartmuseumHelmValuesOracleSecret;
};

export type ChartmuseumHelmValuesOracleSecret = {
  enabled?: boolean;
  name?: unknown;
  config?: string;
  key_file?: string;
};

export type ChartmuseumHelmValuesBearerAuth = {
  secret?: ChartmuseumHelmValuesBearerAuthSecret;
};

export type ChartmuseumHelmValuesBearerAuthSecret = {
  enabled?: boolean;
  publicKeySecret?: string;
};

export type ChartmuseumHelmValues = {
  extraArgs?: unknown[];
  replicaCount?: number;
  strategy?: ChartmuseumHelmValuesStrategy;
  image?: ChartmuseumHelmValuesImage;
  secret?: ChartmuseumHelmValuesSecret;
  commonLabels?: ChartmuseumHelmValuesCommonLabels;
  env?: ChartmuseumHelmValuesEnv;
  deployment?: ChartmuseumHelmValuesDeployment;
  podAnnotations?: ChartmuseumHelmValuesPodAnnotations;
  podLabels?: ChartmuseumHelmValuesPodLabels;
  service?: ChartmuseumHelmValuesService;
  serviceMonitor?: ChartmuseumHelmValuesServiceMonitor;
  resources?: ChartmuseumHelmValuesResources;
  probes?: ChartmuseumHelmValuesProbes;
  serviceAccount?: ChartmuseumHelmValuesServiceAccount;
  securityContext?: ChartmuseumHelmValuesSecurityContext;
  containerSecurityContext?: ChartmuseumHelmValuesContainerSecurityContext;
  priorityClassName?: string;
  nodeSelector?: ChartmuseumHelmValuesNodeSelector;
  tolerations?: unknown[];
  affinity?: ChartmuseumHelmValuesAffinity;
  persistence?: ChartmuseumHelmValuesPersistence;
  volumePermissions?: ChartmuseumHelmValuesVolumePermissions;
  ingress?: ChartmuseumHelmValuesIngress;
  gcp?: ChartmuseumHelmValuesGcp;
  oracle?: ChartmuseumHelmValuesOracle;
  bearerAuth?: ChartmuseumHelmValuesBearerAuth;
};

export type ChartmuseumHelmParameters = {
  extraArgs?: string;
  replicaCount?: string;
  "strategy.type"?: string;
  "image.repository"?: string;
  "image.tag"?: string;
  "image.pullPolicy"?: string;
  "env.open.STORAGE"?: string;
  "env.open.STORAGE_ALIBABA_BUCKET"?: string;
  "env.open.STORAGE_ALIBABA_PREFIX"?: string;
  "env.open.STORAGE_ALIBABA_ENDPOINT"?: string;
  "env.open.STORAGE_ALIBABA_SSE"?: string;
  "env.open.STORAGE_AMAZON_BUCKET"?: string;
  "env.open.STORAGE_AMAZON_PREFIX"?: string;
  "env.open.STORAGE_AMAZON_REGION"?: string;
  "env.open.STORAGE_AMAZON_ENDPOINT"?: string;
  "env.open.STORAGE_AMAZON_SSE"?: string;
  "env.open.STORAGE_GOOGLE_BUCKET"?: string;
  "env.open.STORAGE_GOOGLE_PREFIX"?: string;
  "env.open.STORAGE_MICROSOFT_CONTAINER"?: string;
  "env.open.STORAGE_MICROSOFT_PREFIX"?: string;
  "env.open.STORAGE_OPENSTACK_CONTAINER"?: string;
  "env.open.STORAGE_OPENSTACK_PREFIX"?: string;
  "env.open.STORAGE_OPENSTACK_REGION"?: string;
  "env.open.STORAGE_OPENSTACK_CACERT"?: string;
  "env.open.STORAGE_ORACLE_COMPARTMENTID"?: string;
  "env.open.STORAGE_ORACLE_BUCKET"?: string;
  "env.open.STORAGE_ORACLE_PREFIX"?: string;
  "env.open.CHART_POST_FORM_FIELD_NAME"?: string;
  "env.open.PROV_POST_FORM_FIELD_NAME"?: string;
  "env.open.DEPTH"?: string;
  "env.open.DEBUG"?: string;
  "env.open.LOG_JSON"?: string;
  "env.open.DISABLE_STATEFILES"?: string;
  "env.open.ENABLE_METRICS"?: string;
  "env.open.DISABLE_API"?: string;
  "env.open.ALLOW_OVERWRITE"?: string;
  "env.open.CHART_URL"?: string;
  "env.open.AUTH_ANONYMOUS_GET"?: string;
  "env.open.CONTEXT_PATH"?: string;
  "env.open.INDEX_LIMIT"?: string;
  "env.open.CACHE"?: string;
  "env.open.CACHE_REDIS_ADDR"?: string;
  "env.open.CACHE_REDIS_DB"?: string;
  "env.open.BEARER_AUTH"?: string;
  "env.open.AUTH_REALM"?: string;
  "env.open.AUTH_SERVICE"?: string;
  "env.secret.BASIC_AUTH_USER"?: string;
  "env.secret.BASIC_AUTH_PASS"?: string;
  "env.secret.GOOGLE_CREDENTIALS_JSON"?: string;
  "env.secret.CACHE_REDIS_PASSWORD"?: string;
  "env.existingSecret"?: string;
  "env.existingSecretMappings.BASIC_AUTH_USER"?: string;
  "env.existingSecretMappings.BASIC_AUTH_PASS"?: string;
  "env.existingSecretMappings.GOOGLE_CREDENTIALS_JSON"?: string;
  "env.existingSecretMappings.CACHE_REDIS_PASSWORD"?: string;
  "deployment.extraVolumes"?: string;
  "deployment.extraVolumeMounts"?: string;
  "service.servicename"?: string;
  "service.type"?: string;
  "service.externalTrafficPolicy"?: string;
  "service.loadBalancerIP"?: string;
  "service.loadBalancerSourceRanges"?: string;
  "service.externalPort"?: string;
  "service.targetPort"?: string;
  "service.nodePort"?: string;
  "serviceMonitor.enabled"?: string;
  "serviceMonitor.metricsPath"?: string;
  "probes.liveness.initialDelaySeconds"?: string;
  "probes.liveness.periodSeconds"?: string;
  "probes.liveness.timeoutSeconds"?: string;
  "probes.liveness.successThreshold"?: string;
  "probes.liveness.failureThreshold"?: string;
  "probes.livenessHttpGetConfig.scheme"?: string;
  "probes.readiness.initialDelaySeconds"?: string;
  "probes.readiness.periodSeconds"?: string;
  "probes.readiness.timeoutSeconds"?: string;
  "probes.readiness.successThreshold"?: string;
  "probes.readiness.failureThreshold"?: string;
  "probes.readinessHttpGetConfig.scheme"?: string;
  "serviceAccount.create"?: string;
  "serviceAccount.name"?: string;
  "serviceAccount.automountServiceAccountToken"?: string;
  "securityContext.enabled"?: string;
  "securityContext.fsGroup"?: string;
  priorityClassName?: string;
  tolerations?: string;
  "persistence.enabled"?: string;
  "persistence.accessMode"?: string;
  "persistence.size"?: string;
  "persistence.path"?: string;
  "persistence.pv.enabled"?: string;
  "persistence.pv.pvname"?: string;
  "persistence.pv.capacity.storage"?: string;
  "persistence.pv.accessMode"?: string;
  "persistence.pv.nfs.server"?: string;
  "persistence.pv.nfs.path"?: string;
  "volumePermissions.image.registry"?: string;
  "volumePermissions.image.repository"?: string;
  "volumePermissions.image.tag"?: string;
  "volumePermissions.image.pullPolicy"?: string;
  "ingress.enabled"?: string;
  "ingress.pathType"?: string;
  "ingress.hosts"?: string;
  "ingress.ingressClassName"?: string;
  "gcp.secret.enabled"?: string;
  "gcp.secret.name"?: string;
  "gcp.secret.key"?: string;
  "oracle.secret.enabled"?: string;
  "oracle.secret.name"?: string;
  "oracle.secret.config"?: string;
  "oracle.secret.key_file"?: string;
  "bearerAuth.secret.enabled"?: string;
  "bearerAuth.secret.publicKeySecret"?: string;
};
