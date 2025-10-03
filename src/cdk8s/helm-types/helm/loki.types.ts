/* eslint-disable max-lines */
// Generated TypeScript types for loki Helm chart

export type LokiHelmValuesGlobal = {
  image?: LokiHelmValuesGlobalImage;
  priorityClassName?: unknown;
  clusterDomain?: string;
  dnsService?: string;
  dnsNamespace?: string;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
};

export type LokiHelmValuesGlobalImage = {
  registry?: unknown;
};

export type LokiHelmValuesLoki = {
  livenessProbe?: LokiHelmValuesLokiLivenessProbe;
  readinessProbe?: LokiHelmValuesLokiReadinessProbe;
  startupProbe?: LokiHelmValuesLokiStartupProbe;
  image?: LokiHelmValuesLokiImage;
  annotations?: LokiHelmValuesLokiAnnotations;
  podAnnotations?: LokiHelmValuesLokiPodAnnotations;
  podLabels?: LokiHelmValuesLokiPodLabels;
  serviceAnnotations?: LokiHelmValuesLokiServiceAnnotations;
  serviceLabels?: LokiHelmValuesLokiServiceLabels;
  revisionHistoryLimit?: number;
  podSecurityContext?: LokiHelmValuesLokiPodSecurityContext;
  containerSecurityContext?: LokiHelmValuesLokiContainerSecurityContext;
  enableServiceLinks?: boolean;
  configStorageType?: string;
  configObjectName?: string;
  generatedConfigObjectName?: string;
  config?: string;
  auth_enabled?: boolean;
  memberlistConfig?: LokiHelmValuesLokiMemberlistConfig;
  extraMemberlistConfig?: LokiHelmValuesLokiExtraMemberlistConfig;
  tenants?: unknown[];
  server?: LokiHelmValuesLokiServer;
  limits_config?: LokiHelmValuesLokiLimitsconfig;
  runtimeConfig?: LokiHelmValuesLokiRuntimeConfig;
  commonConfig?: LokiHelmValuesLokiCommonConfig;
  storage?: LokiHelmValuesLokiStorage;
  schemaConfig?: LokiHelmValuesLokiSchemaConfig;
  useTestSchema?: boolean;
  testSchemaConfig?: LokiHelmValuesLokiTestSchemaConfig;
  rulerConfig?: LokiHelmValuesLokiRulerConfig;
  structuredConfig?: LokiHelmValuesLokiStructuredConfig;
  query_scheduler?: LokiHelmValuesLokiQueryscheduler;
  storage_config?: LokiHelmValuesLokiStorageconfig;
  compactor?: LokiHelmValuesLokiCompactor;
  compactor_grpc_client?: LokiHelmValuesLokiCompactorgrpcclient;
  pattern_ingester?: LokiHelmValuesLokiPatterningester;
  analytics?: LokiHelmValuesLokiAnalytics;
  ui?: LokiHelmValuesLokiUi;
  query_range?: LokiHelmValuesLokiQueryrange;
  querier?: LokiHelmValuesLokiQuerier;
  ingester?: LokiHelmValuesLokiIngester;
  ingester_client?: LokiHelmValuesLokiIngesterclient;
  block_builder?: LokiHelmValuesLokiBlockbuilder;
  index_gateway?: LokiHelmValuesLokiIndexgateway;
  frontend?: LokiHelmValuesLokiFrontend;
  frontend_worker?: LokiHelmValuesLokiFrontendworker;
  distributor?: LokiHelmValuesLokiDistributor;
  tracing?: LokiHelmValuesLokiTracing;
  bloom_build?: LokiHelmValuesLokiBloombuild;
  bloom_gateway?: LokiHelmValuesLokiBloomgateway;
  operational_config?: LokiHelmValuesLokiOperationalconfig;
};

export type LokiHelmValuesLokiLivenessProbe = object;

export type LokiHelmValuesLokiReadinessProbe = {
  httpGet?: LokiHelmValuesLokiReadinessProbeHttpGet;
  initialDelaySeconds?: number;
  timeoutSeconds?: number;
};

export type LokiHelmValuesLokiReadinessProbeHttpGet = {
  path?: string;
  port?: string;
};

export type LokiHelmValuesLokiStartupProbe = object;

export type LokiHelmValuesLokiImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  digest?: unknown;
  pullPolicy?: string;
};

export type LokiHelmValuesLokiAnnotations = object;

export type LokiHelmValuesLokiPodAnnotations = object;

export type LokiHelmValuesLokiPodLabels = object;

export type LokiHelmValuesLokiServiceAnnotations = object;

export type LokiHelmValuesLokiServiceLabels = object;

export type LokiHelmValuesLokiPodSecurityContext = {
  fsGroup?: number;
  runAsGroup?: number;
  runAsNonRoot?: boolean;
  runAsUser?: number;
};

export type LokiHelmValuesLokiContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  capabilities?: LokiHelmValuesLokiContainerSecurityContextCapabilities;
  allowPrivilegeEscalation?: boolean;
};

export type LokiHelmValuesLokiContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type LokiHelmValuesLokiMemberlistConfig = object;

export type LokiHelmValuesLokiExtraMemberlistConfig = object;

export type LokiHelmValuesLokiServer = {
  http_listen_port?: number;
  grpc_listen_port?: number;
  http_server_read_timeout?: string;
  http_server_write_timeout?: string;
};

export type LokiHelmValuesLokiLimitsconfig = {
  reject_old_samples?: boolean;
  reject_old_samples_max_age?: string;
  max_cache_freshness_per_query?: string;
  split_queries_by_interval?: string;
  query_timeout?: string;
  volume_enabled?: boolean;
  // manually added
  retention_period?: string;
};

export type LokiHelmValuesLokiRuntimeConfig = object;

export type LokiHelmValuesLokiCommonConfig = {
  path_prefix?: string;
  replication_factor?: number;
  compactor_grpc_address?: string;
};

export type LokiHelmValuesLokiStorage = {
  type?: string;
  s3?: LokiHelmValuesLokiStorageS3;
  gcs?: LokiHelmValuesLokiStorageGcs;
  azure?: LokiHelmValuesLokiStorageAzure;
  swift?: LokiHelmValuesLokiStorageSwift;
  filesystem?: LokiHelmValuesLokiStorageFilesystem;
  use_thanos_objstore?: boolean;
  object_store?: LokiHelmValuesLokiStorageObjectstore;
};

export type LokiHelmValuesLokiStorageS3 = {
  s3?: unknown;
  endpoint?: unknown;
  region?: unknown;
  secretAccessKey?: unknown;
  accessKeyId?: unknown;
  signatureVersion?: unknown;
  s3ForcePathStyle?: boolean;
  insecure?: boolean;
  http_config?: LokiHelmValuesLokiStorageS3Httpconfig;
  backoff_config?: LokiHelmValuesLokiStorageS3Backoffconfig;
  disable_dualstack?: boolean;
};

export type LokiHelmValuesLokiStorageS3Httpconfig = object;

export type LokiHelmValuesLokiStorageS3Backoffconfig = object;

export type LokiHelmValuesLokiStorageGcs = {
  chunkBufferSize?: number;
  requestTimeout?: string;
  enableHttp2?: boolean;
};

export type LokiHelmValuesLokiStorageAzure = {
  accountName?: unknown;
  accountKey?: unknown;
  connectionString?: unknown;
  useManagedIdentity?: boolean;
  useFederatedToken?: boolean;
  userAssignedId?: unknown;
  requestTimeout?: unknown;
  endpointSuffix?: unknown;
  chunkDelimiter?: unknown;
};

export type LokiHelmValuesLokiStorageSwift = {
  auth_version?: unknown;
  auth_url?: unknown;
  internal?: unknown;
  username?: unknown;
  user_domain_name?: unknown;
  user_domain_id?: unknown;
  user_id?: unknown;
  password?: unknown;
  domain_id?: unknown;
  domain_name?: unknown;
  project_id?: unknown;
  project_name?: unknown;
  project_domain_id?: unknown;
  project_domain_name?: unknown;
  region_name?: unknown;
  container_name?: unknown;
  max_retries?: unknown;
  connect_timeout?: unknown;
  request_timeout?: unknown;
};

export type LokiHelmValuesLokiStorageFilesystem = {
  chunks_directory?: string;
  rules_directory?: string;
};

export type LokiHelmValuesLokiStorageObjectstore = {
  type?: string;
  storage_prefix?: unknown;
  s3?: LokiHelmValuesLokiStorageObjectstoreS3;
  gcs?: LokiHelmValuesLokiStorageObjectstoreGcs;
  azure?: LokiHelmValuesLokiStorageObjectstoreAzure;
};

export type LokiHelmValuesLokiStorageObjectstoreS3 = {
  endpoint?: unknown;
  region?: unknown;
  access_key_id?: unknown;
  secret_access_key?: unknown;
  insecure?: boolean;
  sse?: LokiHelmValuesLokiStorageObjectstoreS3Sse;
  http?: LokiHelmValuesLokiStorageObjectstoreS3Http;
};

export type LokiHelmValuesLokiStorageObjectstoreS3Sse = object;

export type LokiHelmValuesLokiStorageObjectstoreS3Http = object;

export type LokiHelmValuesLokiStorageObjectstoreGcs = {
  bucket_name?: unknown;
  service_account?: unknown;
};

export type LokiHelmValuesLokiStorageObjectstoreAzure = {
  account_name?: unknown;
  account_key?: unknown;
};

export type LokiHelmValuesLokiSchemaConfig = object;

export type LokiHelmValuesLokiTestSchemaConfig = {
  configs?: LokiHelmValuesLokiTestSchemaConfigConfigsElement[];
};

export type LokiHelmValuesLokiTestSchemaConfigConfigsElement = {
  from?: unknown;
  store?: string;
  object_store?: string;
  schema?: string;
  index?: LokiHelmValuesLokiTestSchemaConfigConfigsIndex;
};

export type LokiHelmValuesLokiTestSchemaConfigConfigsIndex = {
  prefix?: string;
  period?: string;
};

export type LokiHelmValuesLokiRulerConfig = {
  wal?: LokiHelmValuesLokiRulerConfigWal;
};

export type LokiHelmValuesLokiRulerConfigWal = {
  dir?: string;
};

export type LokiHelmValuesLokiStructuredConfig = object;

export type LokiHelmValuesLokiQueryscheduler = object;

export type LokiHelmValuesLokiStorageconfig = {
  boltdb_shipper?: LokiHelmValuesLokiStorageconfigBoltdbshipper;
  tsdb_shipper?: LokiHelmValuesLokiStorageconfigTsdbshipper;
  bloom_shipper?: LokiHelmValuesLokiStorageconfigBloomshipper;
  hedging?: LokiHelmValuesLokiStorageconfigHedging;
};

export type LokiHelmValuesLokiStorageconfigBoltdbshipper = {
  index_gateway_client?: LokiHelmValuesLokiStorageconfigBoltdbshipperIndexgatewayclient;
};

export type LokiHelmValuesLokiStorageconfigBoltdbshipperIndexgatewayclient = {
  server_address?: string;
};

export type LokiHelmValuesLokiStorageconfigTsdbshipper = {
  index_gateway_client?: LokiHelmValuesLokiStorageconfigTsdbshipperIndexgatewayclient;
};

export type LokiHelmValuesLokiStorageconfigTsdbshipperIndexgatewayclient = {
  server_address?: string;
};

export type LokiHelmValuesLokiStorageconfigBloomshipper = {
  working_directory?: string;
};

export type LokiHelmValuesLokiStorageconfigHedging = {
  at?: string;
  max_per_second?: number;
  up_to?: number;
};

export type LokiHelmValuesLokiCompactor = object;

export type LokiHelmValuesLokiCompactorgrpcclient = object;

export type LokiHelmValuesLokiPatterningester = {
  enabled?: boolean;
};

export type LokiHelmValuesLokiAnalytics = object;

export type LokiHelmValuesLokiUi = {
  enabled?: boolean;
  gateway?: LokiHelmValuesLokiUiGateway;
};

export type LokiHelmValuesLokiUiGateway = {
  enabled?: boolean;
};

export type LokiHelmValuesLokiQueryrange = object;

export type LokiHelmValuesLokiQuerier = object;

export type LokiHelmValuesLokiIngester = object;

export type LokiHelmValuesLokiIngesterclient = object;

export type LokiHelmValuesLokiBlockbuilder = object;

export type LokiHelmValuesLokiIndexgateway = {
  mode?: string;
};

export type LokiHelmValuesLokiFrontend = {
  scheduler_address?: string;
  tail_proxy_url?: string;
};

export type LokiHelmValuesLokiFrontendworker = {
  scheduler_address?: string;
};

export type LokiHelmValuesLokiDistributor = object;

export type LokiHelmValuesLokiTracing = {
  enabled?: boolean;
};

export type LokiHelmValuesLokiBloombuild = {
  enabled?: boolean;
  builder?: LokiHelmValuesLokiBloombuildBuilder;
};

export type LokiHelmValuesLokiBloombuildBuilder = {
  planner_address?: string;
};

export type LokiHelmValuesLokiBloomgateway = {
  enabled?: boolean;
  client?: LokiHelmValuesLokiBloomgatewayClient;
};

export type LokiHelmValuesLokiBloomgatewayClient = {
  addresses?: string;
};

export type LokiHelmValuesLokiOperationalconfig = object;

export type LokiHelmValuesEnterprise = {
  enabled?: boolean;
  version?: string;
  cluster_name?: unknown;
  license?: LokiHelmValuesEnterpriseLicense;
  useExternalLicense?: boolean;
  externalLicenseName?: unknown;
  externalConfigName?: string;
  gelGateway?: boolean;
  adminApi?: LokiHelmValuesEnterpriseAdminApi;
  config?: string;
  image?: LokiHelmValuesEnterpriseImage;
  adminToken?: LokiHelmValuesEnterpriseAdminToken;
  canarySecret?: unknown;
  provisioner?: LokiHelmValuesEnterpriseProvisioner;
};

export type LokiHelmValuesEnterpriseLicense = {
  contents?: string;
};

export type LokiHelmValuesEnterpriseAdminApi = {
  enabled?: boolean;
};

export type LokiHelmValuesEnterpriseImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  digest?: unknown;
  pullPolicy?: string;
};

export type LokiHelmValuesEnterpriseAdminToken = {
  secret?: unknown;
};

export type LokiHelmValuesEnterpriseProvisioner = {
  enabled?: boolean;
  provisionedSecretPrefix?: unknown;
  hookType?: string;
  apiUrl?: string;
  additionalTenants?: unknown[];
  env?: unknown[];
  labels?: LokiHelmValuesEnterpriseProvisionerLabels;
  annotations?: LokiHelmValuesEnterpriseProvisionerAnnotations;
  affinity?: LokiHelmValuesEnterpriseProvisionerAffinity;
  nodeSelector?: LokiHelmValuesEnterpriseProvisionerNodeSelector;
  tolerations?: unknown[];
  priorityClassName?: unknown;
  securityContext?: LokiHelmValuesEnterpriseProvisionerSecurityContext;
  image?: LokiHelmValuesEnterpriseProvisionerImage;
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
};

export type LokiHelmValuesEnterpriseProvisionerLabels = object;

export type LokiHelmValuesEnterpriseProvisionerAnnotations = object;

export type LokiHelmValuesEnterpriseProvisionerAffinity = object;

export type LokiHelmValuesEnterpriseProvisionerNodeSelector = object;

export type LokiHelmValuesEnterpriseProvisionerSecurityContext = {
  runAsNonRoot?: boolean;
  runAsGroup?: number;
  runAsUser?: number;
  fsGroup?: number;
};

export type LokiHelmValuesEnterpriseProvisionerImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  digest?: unknown;
  pullPolicy?: string;
};

export type LokiHelmValuesTest = {
  enabled?: boolean;
  canaryServiceAddress?: string;
  prometheusAddress?: string;
  timeout?: string;
  labels?: LokiHelmValuesTestLabels;
  annotations?: LokiHelmValuesTestAnnotations;
  image?: LokiHelmValuesTestImage;
};

export type LokiHelmValuesTestLabels = object;

export type LokiHelmValuesTestAnnotations = object;

export type LokiHelmValuesTestImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  digest?: unknown;
  pullPolicy?: string;
};

export type LokiHelmValuesLokiCanary = {
  enabled?: boolean;
  kind?: string;
  push?: boolean;
  lokiurl?: unknown;
  labelname?: string;
  annotations?: LokiHelmValuesLokiCanaryAnnotations;
  podLabels?: LokiHelmValuesLokiCanaryPodLabels;
  service?: LokiHelmValuesLokiCanaryService;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesLokiCanaryResources;
  dnsConfig?: LokiHelmValuesLokiCanaryDnsConfig;
  nodeSelector?: LokiHelmValuesLokiCanaryNodeSelector;
  tolerations?: unknown[];
  affinity?: LokiHelmValuesLokiCanaryAffinity;
  priorityClassName?: unknown;
  image?: LokiHelmValuesLokiCanaryImage;
  updateStrategy?: LokiHelmValuesLokiCanaryUpdateStrategy;
};

export type LokiHelmValuesLokiCanaryAnnotations = object;

export type LokiHelmValuesLokiCanaryPodLabels = object;

export type LokiHelmValuesLokiCanaryService = {
  annotations?: LokiHelmValuesLokiCanaryServiceAnnotations;
  labels?: LokiHelmValuesLokiCanaryServiceLabels;
};

export type LokiHelmValuesLokiCanaryServiceAnnotations = object;

export type LokiHelmValuesLokiCanaryServiceLabels = object;

export type LokiHelmValuesLokiCanaryResources = object;

export type LokiHelmValuesLokiCanaryDnsConfig = object;

export type LokiHelmValuesLokiCanaryNodeSelector = object;

export type LokiHelmValuesLokiCanaryAffinity = object;

export type LokiHelmValuesLokiCanaryImage = {
  registry?: string;
  repository?: string;
  tag?: unknown;
  digest?: unknown;
  pullPolicy?: string;
};

export type LokiHelmValuesLokiCanaryUpdateStrategy = {
  type?: string;
  rollingUpdate?: LokiHelmValuesLokiCanaryUpdateStrategyRollingUpdate;
};

export type LokiHelmValuesLokiCanaryUpdateStrategyRollingUpdate = {
  maxUnavailable?: number;
};

export type LokiHelmValuesServiceAccount = {
  create?: boolean;
  name?: unknown;
  imagePullSecrets?: unknown[];
  annotations?: LokiHelmValuesServiceAccountAnnotations;
  labels?: LokiHelmValuesServiceAccountLabels;
  automountServiceAccountToken?: boolean;
};

export type LokiHelmValuesServiceAccountAnnotations = object;

export type LokiHelmValuesServiceAccountLabels = object;

export type LokiHelmValuesRbac = {
  pspEnabled?: boolean;
  sccEnabled?: boolean;
  sccAllowHostDirVolumePlugin?: boolean;
  pspAnnotations?: LokiHelmValuesRbacPspAnnotations;
  namespaced?: boolean;
};

export type LokiHelmValuesRbacPspAnnotations = object;

export type LokiHelmValuesNetworkPolicy = {
  enabled?: boolean;
  flavor?: string;
  metrics?: LokiHelmValuesNetworkPolicyMetrics;
  ingress?: LokiHelmValuesNetworkPolicyIngress;
  alertmanager?: LokiHelmValuesNetworkPolicyAlertmanager;
  externalStorage?: LokiHelmValuesNetworkPolicyExternalStorage;
  discovery?: LokiHelmValuesNetworkPolicyDiscovery;
  egressWorld?: LokiHelmValuesNetworkPolicyEgressWorld;
  egressKubeApiserver?: LokiHelmValuesNetworkPolicyEgressKubeApiserver;
};

export type LokiHelmValuesNetworkPolicyMetrics = {
  podSelector?: LokiHelmValuesNetworkPolicyMetricsPodSelector;
  namespaceSelector?: LokiHelmValuesNetworkPolicyMetricsNamespaceSelector;
  cidrs?: unknown[];
};

export type LokiHelmValuesNetworkPolicyMetricsPodSelector = object;

export type LokiHelmValuesNetworkPolicyMetricsNamespaceSelector = object;

export type LokiHelmValuesNetworkPolicyIngress = {
  podSelector?: LokiHelmValuesNetworkPolicyIngressPodSelector;
  namespaceSelector?: LokiHelmValuesNetworkPolicyIngressNamespaceSelector;
};

export type LokiHelmValuesNetworkPolicyIngressPodSelector = object;

export type LokiHelmValuesNetworkPolicyIngressNamespaceSelector = object;

export type LokiHelmValuesNetworkPolicyAlertmanager = {
  port?: number;
  podSelector?: LokiHelmValuesNetworkPolicyAlertmanagerPodSelector;
  namespaceSelector?: LokiHelmValuesNetworkPolicyAlertmanagerNamespaceSelector;
};

export type LokiHelmValuesNetworkPolicyAlertmanagerPodSelector = object;

export type LokiHelmValuesNetworkPolicyAlertmanagerNamespaceSelector = object;

export type LokiHelmValuesNetworkPolicyExternalStorage = {
  ports?: unknown[];
  cidrs?: unknown[];
};

export type LokiHelmValuesNetworkPolicyDiscovery = {
  port?: unknown;
  podSelector?: LokiHelmValuesNetworkPolicyDiscoveryPodSelector;
  namespaceSelector?: LokiHelmValuesNetworkPolicyDiscoveryNamespaceSelector;
};

export type LokiHelmValuesNetworkPolicyDiscoveryPodSelector = object;

export type LokiHelmValuesNetworkPolicyDiscoveryNamespaceSelector = object;

export type LokiHelmValuesNetworkPolicyEgressWorld = {
  enabled?: boolean;
};

export type LokiHelmValuesNetworkPolicyEgressKubeApiserver = {
  enabled?: boolean;
};

export type LokiHelmValuesMemberlist = {
  service?: LokiHelmValuesMemberlistService;
};

export type LokiHelmValuesMemberlistService = {
  publishNotReadyAddresses?: boolean;
  annotations?: LokiHelmValuesMemberlistServiceAnnotations;
};

export type LokiHelmValuesMemberlistServiceAnnotations = object;

export type LokiHelmValuesAdminApi = {
  replicas?: number;
  hostAliases?: unknown[];
  extraArgs?: LokiHelmValuesAdminApiExtraArgs;
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  labels?: LokiHelmValuesAdminApiLabels;
  annotations?: LokiHelmValuesAdminApiAnnotations;
  service?: LokiHelmValuesAdminApiService;
  podSecurityContext?: LokiHelmValuesAdminApiPodSecurityContext;
  containerSecurityContext?: LokiHelmValuesAdminApiContainerSecurityContext;
  strategy?: LokiHelmValuesAdminApiStrategy;
  livenessProbe?: LokiHelmValuesAdminApiLivenessProbe;
  readinessProbe?: LokiHelmValuesAdminApiReadinessProbe;
  startupProbe?: LokiHelmValuesAdminApiStartupProbe;
  resources?: LokiHelmValuesAdminApiResources;
  env?: unknown[];
  initContainers?: unknown[];
  extraContainers?: unknown[];
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  affinity?: LokiHelmValuesAdminApiAffinity;
  nodeSelector?: LokiHelmValuesAdminApiNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  terminationGracePeriodSeconds?: number;
};

export type LokiHelmValuesAdminApiExtraArgs = object;

export type LokiHelmValuesAdminApiLabels = object;

export type LokiHelmValuesAdminApiAnnotations = object;

export type LokiHelmValuesAdminApiService = {
  labels?: LokiHelmValuesAdminApiServiceLabels;
  annotations?: LokiHelmValuesAdminApiServiceAnnotations;
};

export type LokiHelmValuesAdminApiServiceLabels = object;

export type LokiHelmValuesAdminApiServiceAnnotations = object;

export type LokiHelmValuesAdminApiPodSecurityContext = {
  runAsNonRoot?: boolean;
  runAsGroup?: number;
  runAsUser?: number;
};

export type LokiHelmValuesAdminApiContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  capabilities?: LokiHelmValuesAdminApiContainerSecurityContextCapabilities;
  allowPrivilegeEscalation?: boolean;
};

export type LokiHelmValuesAdminApiContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type LokiHelmValuesAdminApiStrategy = {
  type?: string;
};

export type LokiHelmValuesAdminApiLivenessProbe = object;

export type LokiHelmValuesAdminApiReadinessProbe = {
  httpGet?: LokiHelmValuesAdminApiReadinessProbeHttpGet;
  initialDelaySeconds?: number;
};

export type LokiHelmValuesAdminApiReadinessProbeHttpGet = {
  path?: string;
  port?: string;
};

export type LokiHelmValuesAdminApiStartupProbe = object;

export type LokiHelmValuesAdminApiResources = object;

export type LokiHelmValuesAdminApiAffinity = object;

export type LokiHelmValuesAdminApiNodeSelector = object;

export type LokiHelmValuesGateway = {
  enabled?: boolean;
  replicas?: number;
  containerPort?: number;
  verboseLogging?: boolean;
  autoscaling?: LokiHelmValuesGatewayAutoscaling;
  deploymentStrategy?: LokiHelmValuesGatewayDeploymentStrategy;
  image?: LokiHelmValuesGatewayImage;
  priorityClassName?: unknown;
  annotations?: LokiHelmValuesGatewayAnnotations;
  podAnnotations?: LokiHelmValuesGatewayPodAnnotations;
  podLabels?: LokiHelmValuesGatewayPodLabels;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  lifecycle?: LokiHelmValuesGatewayLifecycle;
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  podSecurityContext?: LokiHelmValuesGatewayPodSecurityContext;
  containerSecurityContext?: LokiHelmValuesGatewayContainerSecurityContext;
  resources?: LokiHelmValuesGatewayResources;
  extraContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesGatewayAffinity;
  dnsConfig?: LokiHelmValuesGatewayDnsConfig;
  nodeSelector?: LokiHelmValuesGatewayNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  service?: LokiHelmValuesGatewayService;
  ingress?: LokiHelmValuesGatewayIngress;
  basicAuth?: LokiHelmValuesGatewayBasicAuth;
  readinessProbe?: LokiHelmValuesGatewayReadinessProbe;
  nginxConfig?: LokiHelmValuesGatewayNginxConfig;
};

export type LokiHelmValuesGatewayAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
  behavior?: LokiHelmValuesGatewayAutoscalingBehavior;
};

export type LokiHelmValuesGatewayAutoscalingBehavior = object;

export type LokiHelmValuesGatewayDeploymentStrategy = {
  type?: string;
};

export type LokiHelmValuesGatewayImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  digest?: unknown;
  pullPolicy?: string;
};

export type LokiHelmValuesGatewayAnnotations = object;

export type LokiHelmValuesGatewayPodAnnotations = object;

export type LokiHelmValuesGatewayPodLabels = object;

export type LokiHelmValuesGatewayLifecycle = object;

export type LokiHelmValuesGatewayPodSecurityContext = {
  fsGroup?: number;
  runAsGroup?: number;
  runAsNonRoot?: boolean;
  runAsUser?: number;
};

export type LokiHelmValuesGatewayContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  capabilities?: LokiHelmValuesGatewayContainerSecurityContextCapabilities;
  allowPrivilegeEscalation?: boolean;
};

export type LokiHelmValuesGatewayContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type LokiHelmValuesGatewayResources = object;

export type LokiHelmValuesGatewayAffinity = {
  podAntiAffinity?: LokiHelmValuesGatewayAffinityPodAntiAffinity;
};

export type LokiHelmValuesGatewayAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector = {
  matchLabels?: LokiHelmValuesGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
};

export type LokiHelmValuesGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesGatewayDnsConfig = object;

export type LokiHelmValuesGatewayNodeSelector = object;

export type LokiHelmValuesGatewayService = {
  port?: number;
  type?: string;
  clusterIP?: unknown;
  nodePort?: unknown;
  loadBalancerIP?: unknown;
  annotations?: LokiHelmValuesGatewayServiceAnnotations;
  labels?: LokiHelmValuesGatewayServiceLabels;
};

export type LokiHelmValuesGatewayServiceAnnotations = object;

export type LokiHelmValuesGatewayServiceLabels = object;

export type LokiHelmValuesGatewayIngress = {
  enabled?: boolean;
  ingressClassName?: string;
  annotations?: LokiHelmValuesGatewayIngressAnnotations;
  labels?: LokiHelmValuesGatewayIngressLabels;
  hosts?: LokiHelmValuesGatewayIngressHostsElement[];
  tls?: LokiHelmValuesGatewayIngressTlsElement[];
};

export type LokiHelmValuesGatewayIngressAnnotations = object;

export type LokiHelmValuesGatewayIngressLabels = object;

export type LokiHelmValuesGatewayIngressHostsElement = {
  host?: string;
  paths?: LokiHelmValuesGatewayIngressHostsPathsElement[];
};

export type LokiHelmValuesGatewayIngressHostsPathsElement = {
  path?: string;
};

export type LokiHelmValuesGatewayIngressTlsElement = {
  secretName?: string;
  hosts?: string[];
};

export type LokiHelmValuesGatewayBasicAuth = {
  enabled?: boolean;
  username?: unknown;
  password?: unknown;
  htpasswd?: string;
  existingSecret?: unknown;
};

export type LokiHelmValuesGatewayReadinessProbe = {
  httpGet?: LokiHelmValuesGatewayReadinessProbeHttpGet;
  initialDelaySeconds?: number;
  timeoutSeconds?: number;
};

export type LokiHelmValuesGatewayReadinessProbeHttpGet = {
  path?: string;
  port?: string;
};

export type LokiHelmValuesGatewayNginxConfig = {
  schema?: string;
  enableIPv6?: boolean;
  logFormat?: string;
  serverSnippet?: string;
  httpSnippet?: string;
  locationSnippet?: string;
  clientMaxBodySize?: string;
  ssl?: boolean;
  customReadUrl?: unknown;
  customWriteUrl?: unknown;
  customBackendUrl?: unknown;
  resolver?: string;
  file?: string;
};

export type LokiHelmValuesEnterpriseGateway = {
  replicas?: number;
  hostAliases?: unknown[];
  extraArgs?: LokiHelmValuesEnterpriseGatewayExtraArgs;
  extraEnvFrom?: unknown[];
  labels?: LokiHelmValuesEnterpriseGatewayLabels;
  annotations?: LokiHelmValuesEnterpriseGatewayAnnotations;
  service?: LokiHelmValuesEnterpriseGatewayService;
  podSecurityContext?: LokiHelmValuesEnterpriseGatewayPodSecurityContext;
  containerSecurityContext?: LokiHelmValuesEnterpriseGatewayContainerSecurityContext;
  useDefaultProxyURLs?: boolean;
  strategy?: LokiHelmValuesEnterpriseGatewayStrategy;
  readinessProbe?: LokiHelmValuesEnterpriseGatewayReadinessProbe;
  resources?: LokiHelmValuesEnterpriseGatewayResources;
  env?: unknown[];
  initContainers?: unknown[];
  extraContainers?: unknown[];
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  affinity?: LokiHelmValuesEnterpriseGatewayAffinity;
  nodeSelector?: LokiHelmValuesEnterpriseGatewayNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  terminationGracePeriodSeconds?: number;
};

export type LokiHelmValuesEnterpriseGatewayExtraArgs = object;

export type LokiHelmValuesEnterpriseGatewayLabels = object;

export type LokiHelmValuesEnterpriseGatewayAnnotations = object;

export type LokiHelmValuesEnterpriseGatewayService = {
  type?: string;
  labels?: LokiHelmValuesEnterpriseGatewayServiceLabels;
  annotations?: LokiHelmValuesEnterpriseGatewayServiceAnnotations;
};

export type LokiHelmValuesEnterpriseGatewayServiceLabels = object;

export type LokiHelmValuesEnterpriseGatewayServiceAnnotations = object;

export type LokiHelmValuesEnterpriseGatewayPodSecurityContext = {
  runAsNonRoot?: boolean;
  runAsGroup?: number;
  runAsUser?: number;
  fsGroup?: number;
};

export type LokiHelmValuesEnterpriseGatewayContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  capabilities?: LokiHelmValuesEnterpriseGatewayContainerSecurityContextCapabilities;
  allowPrivilegeEscalation?: boolean;
};

export type LokiHelmValuesEnterpriseGatewayContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type LokiHelmValuesEnterpriseGatewayStrategy = {
  type?: string;
};

export type LokiHelmValuesEnterpriseGatewayReadinessProbe = {
  httpGet?: LokiHelmValuesEnterpriseGatewayReadinessProbeHttpGet;
  initialDelaySeconds?: number;
};

export type LokiHelmValuesEnterpriseGatewayReadinessProbeHttpGet = {
  path?: string;
  port?: string;
};

export type LokiHelmValuesEnterpriseGatewayResources = object;

export type LokiHelmValuesEnterpriseGatewayAffinity = object;

export type LokiHelmValuesEnterpriseGatewayNodeSelector = object;

export type LokiHelmValuesIngress = {
  enabled?: boolean;
  ingressClassName?: string;
  annotations?: LokiHelmValuesIngressAnnotations;
  labels?: LokiHelmValuesIngressLabels;
  paths?: LokiHelmValuesIngressPaths;
  hosts?: string[];
  tls?: unknown[];
};

export type LokiHelmValuesIngressAnnotations = object;

export type LokiHelmValuesIngressLabels = object;

export type LokiHelmValuesIngressPaths = {
  distributor?: string[];
  queryFrontend?: string[];
  ruler?: string[];
  compactor?: string[];
};

export type LokiHelmValuesMigrate = {
  fromDistributed?: LokiHelmValuesMigrateFromDistributed;
};

export type LokiHelmValuesMigrateFromDistributed = {
  enabled?: boolean;
  memberlistService?: string;
};

export type LokiHelmValuesSingleBinary = {
  replicas?: number;
  autoscaling?: LokiHelmValuesSingleBinaryAutoscaling;
  image?: LokiHelmValuesSingleBinaryImage;
  priorityClassName?: unknown;
  annotations?: LokiHelmValuesSingleBinaryAnnotations;
  podAnnotations?: LokiHelmValuesSingleBinaryPodAnnotations;
  podLabels?: LokiHelmValuesSingleBinaryPodLabels;
  selectorLabels?: LokiHelmValuesSingleBinarySelectorLabels;
  service?: LokiHelmValuesSingleBinaryService;
  targetModule?: string;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraContainers?: unknown[];
  initContainers?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesSingleBinaryResources;
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesSingleBinaryAffinity;
  dnsConfig?: LokiHelmValuesSingleBinaryDnsConfig;
  nodeSelector?: LokiHelmValuesSingleBinaryNodeSelector;
  tolerations?: unknown[];
  persistence?: LokiHelmValuesSingleBinaryPersistence;
};

export type LokiHelmValuesSingleBinaryAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
};

export type LokiHelmValuesSingleBinaryImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesSingleBinaryAnnotations = object;

export type LokiHelmValuesSingleBinaryPodAnnotations = object;

export type LokiHelmValuesSingleBinaryPodLabels = object;

export type LokiHelmValuesSingleBinarySelectorLabels = object;

export type LokiHelmValuesSingleBinaryService = {
  annotations?: LokiHelmValuesSingleBinaryServiceAnnotations;
  labels?: LokiHelmValuesSingleBinaryServiceLabels;
};

export type LokiHelmValuesSingleBinaryServiceAnnotations = object;

export type LokiHelmValuesSingleBinaryServiceLabels = object;

export type LokiHelmValuesSingleBinaryResources = object;

export type LokiHelmValuesSingleBinaryAffinity = {
  podAntiAffinity?: LokiHelmValuesSingleBinaryAffinityPodAntiAffinity;
};

export type LokiHelmValuesSingleBinaryAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesSingleBinaryAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesSingleBinaryAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesSingleBinaryAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesSingleBinaryAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesSingleBinaryAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesSingleBinaryAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesSingleBinaryDnsConfig = object;

export type LokiHelmValuesSingleBinaryNodeSelector = object;

export type LokiHelmValuesSingleBinaryPersistence = {
  enableStatefulSetAutoDeletePVC?: boolean;
  enabled?: boolean;
  size?: string;
  storageClass?: unknown;
  selector?: unknown;
  annotations?: LokiHelmValuesSingleBinaryPersistenceAnnotations;
  labels?: LokiHelmValuesSingleBinaryPersistenceLabels;
};

export type LokiHelmValuesSingleBinaryPersistenceAnnotations = object;

export type LokiHelmValuesSingleBinaryPersistenceLabels = object;

export type LokiHelmValuesWrite = {
  replicas?: number;
  autoscaling?: LokiHelmValuesWriteAutoscaling;
  image?: LokiHelmValuesWriteImage;
  priorityClassName?: unknown;
  annotations?: LokiHelmValuesWriteAnnotations;
  podAnnotations?: LokiHelmValuesWritePodAnnotations;
  podLabels?: LokiHelmValuesWritePodLabels;
  selectorLabels?: LokiHelmValuesWriteSelectorLabels;
  service?: LokiHelmValuesWriteService;
  targetModule?: string;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  lifecycle?: LokiHelmValuesWriteLifecycle;
  initContainers?: unknown[];
  extraContainers?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  extraVolumeClaimTemplates?: unknown[];
  resources?: LokiHelmValuesWriteResources;
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesWriteAffinity;
  dnsConfig?: LokiHelmValuesWriteDnsConfig;
  nodeSelector?: LokiHelmValuesWriteNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  podManagementPolicy?: string;
  persistence?: LokiHelmValuesWritePersistence;
};

export type LokiHelmValuesWriteAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
  behavior?: LokiHelmValuesWriteAutoscalingBehavior;
};

export type LokiHelmValuesWriteAutoscalingBehavior = {
  scaleUp?: LokiHelmValuesWriteAutoscalingBehaviorScaleUp;
  scaleDown?: LokiHelmValuesWriteAutoscalingBehaviorScaleDown;
};

export type LokiHelmValuesWriteAutoscalingBehaviorScaleUp = {
  policies?: LokiHelmValuesWriteAutoscalingBehaviorScaleUpPoliciesElement[];
};

export type LokiHelmValuesWriteAutoscalingBehaviorScaleUpPoliciesElement = {
  type?: string;
  value?: number;
  periodSeconds?: number;
};

export type LokiHelmValuesWriteAutoscalingBehaviorScaleDown = {
  policies?: LokiHelmValuesWriteAutoscalingBehaviorScaleDownPoliciesElement[];
  stabilizationWindowSeconds?: number;
};

export type LokiHelmValuesWriteAutoscalingBehaviorScaleDownPoliciesElement = {
  type?: string;
  value?: number;
  periodSeconds?: number;
};

export type LokiHelmValuesWriteImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesWriteAnnotations = object;

export type LokiHelmValuesWritePodAnnotations = object;

export type LokiHelmValuesWritePodLabels = object;

export type LokiHelmValuesWriteSelectorLabels = object;

export type LokiHelmValuesWriteService = {
  annotations?: LokiHelmValuesWriteServiceAnnotations;
  labels?: LokiHelmValuesWriteServiceLabels;
};

export type LokiHelmValuesWriteServiceAnnotations = object;

export type LokiHelmValuesWriteServiceLabels = object;

export type LokiHelmValuesWriteLifecycle = object;

export type LokiHelmValuesWriteResources = object;

export type LokiHelmValuesWriteAffinity = {
  podAntiAffinity?: LokiHelmValuesWriteAffinityPodAntiAffinity;
};

export type LokiHelmValuesWriteAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesWriteAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesWriteAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesWriteAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesWriteAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector = {
  matchLabels?: LokiHelmValuesWriteAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
};

export type LokiHelmValuesWriteAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesWriteDnsConfig = object;

export type LokiHelmValuesWriteNodeSelector = object;

export type LokiHelmValuesWritePersistence = {
  volumeClaimsEnabled?: boolean;
  dataVolumeParameters?: LokiHelmValuesWritePersistenceDataVolumeParameters;
  enableStatefulSetAutoDeletePVC?: boolean;
  size?: string;
  storageClass?: unknown;
  selector?: unknown;
  annotations?: LokiHelmValuesWritePersistenceAnnotations;
  labels?: LokiHelmValuesWritePersistenceLabels;
};

export type LokiHelmValuesWritePersistenceDataVolumeParameters = {
  emptyDir?: LokiHelmValuesWritePersistenceDataVolumeParametersEmptyDir;
};

export type LokiHelmValuesWritePersistenceDataVolumeParametersEmptyDir = object;

export type LokiHelmValuesWritePersistenceAnnotations = object;

export type LokiHelmValuesWritePersistenceLabels = object;

export type LokiHelmValuesRead = {
  replicas?: number;
  autoscaling?: LokiHelmValuesReadAutoscaling;
  image?: LokiHelmValuesReadImage;
  priorityClassName?: unknown;
  annotations?: LokiHelmValuesReadAnnotations;
  podAnnotations?: LokiHelmValuesReadPodAnnotations;
  podLabels?: LokiHelmValuesReadPodLabels;
  selectorLabels?: LokiHelmValuesReadSelectorLabels;
  service?: LokiHelmValuesReadService;
  targetModule?: string;
  legacyReadTarget?: boolean;
  extraArgs?: unknown[];
  extraContainers?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  lifecycle?: LokiHelmValuesReadLifecycle;
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesReadResources;
  livenessProbe?: LokiHelmValuesReadLivenessProbe;
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesReadAffinity;
  dnsConfig?: LokiHelmValuesReadDnsConfig;
  nodeSelector?: LokiHelmValuesReadNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  podManagementPolicy?: string;
  persistence?: LokiHelmValuesReadPersistence;
};

export type LokiHelmValuesReadAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
  behavior?: LokiHelmValuesReadAutoscalingBehavior;
};

export type LokiHelmValuesReadAutoscalingBehavior = object;

export type LokiHelmValuesReadImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesReadAnnotations = object;

export type LokiHelmValuesReadPodAnnotations = object;

export type LokiHelmValuesReadPodLabels = object;

export type LokiHelmValuesReadSelectorLabels = object;

export type LokiHelmValuesReadService = {
  annotations?: LokiHelmValuesReadServiceAnnotations;
  labels?: LokiHelmValuesReadServiceLabels;
};

export type LokiHelmValuesReadServiceAnnotations = object;

export type LokiHelmValuesReadServiceLabels = object;

export type LokiHelmValuesReadLifecycle = object;

export type LokiHelmValuesReadResources = object;

export type LokiHelmValuesReadLivenessProbe = object;

export type LokiHelmValuesReadAffinity = {
  podAntiAffinity?: LokiHelmValuesReadAffinityPodAntiAffinity;
};

export type LokiHelmValuesReadAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesReadAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesReadAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesReadAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesReadAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector = {
  matchLabels?: LokiHelmValuesReadAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
};

export type LokiHelmValuesReadAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesReadDnsConfig = object;

export type LokiHelmValuesReadNodeSelector = object;

export type LokiHelmValuesReadPersistence = {
  enableStatefulSetAutoDeletePVC?: boolean;
  size?: string;
  storageClass?: unknown;
  selector?: unknown;
  annotations?: LokiHelmValuesReadPersistenceAnnotations;
  labels?: LokiHelmValuesReadPersistenceLabels;
};

export type LokiHelmValuesReadPersistenceAnnotations = object;

export type LokiHelmValuesReadPersistenceLabels = object;

export type LokiHelmValuesBackend = {
  replicas?: number;
  autoscaling?: LokiHelmValuesBackendAutoscaling;
  image?: LokiHelmValuesBackendImage;
  priorityClassName?: unknown;
  annotations?: LokiHelmValuesBackendAnnotations;
  podAnnotations?: LokiHelmValuesBackendPodAnnotations;
  podLabels?: LokiHelmValuesBackendPodLabels;
  selectorLabels?: LokiHelmValuesBackendSelectorLabels;
  service?: LokiHelmValuesBackendService;
  targetModule?: string;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  initContainers?: unknown[];
  extraContainers?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesBackendResources;
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesBackendAffinity;
  dnsConfig?: LokiHelmValuesBackendDnsConfig;
  nodeSelector?: LokiHelmValuesBackendNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  podManagementPolicy?: string;
  persistence?: LokiHelmValuesBackendPersistence;
};

export type LokiHelmValuesBackendAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
  behavior?: LokiHelmValuesBackendAutoscalingBehavior;
};

export type LokiHelmValuesBackendAutoscalingBehavior = object;

export type LokiHelmValuesBackendImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesBackendAnnotations = object;

export type LokiHelmValuesBackendPodAnnotations = object;

export type LokiHelmValuesBackendPodLabels = object;

export type LokiHelmValuesBackendSelectorLabels = object;

export type LokiHelmValuesBackendService = {
  annotations?: LokiHelmValuesBackendServiceAnnotations;
  labels?: LokiHelmValuesBackendServiceLabels;
};

export type LokiHelmValuesBackendServiceAnnotations = object;

export type LokiHelmValuesBackendServiceLabels = object;

export type LokiHelmValuesBackendResources = object;

export type LokiHelmValuesBackendAffinity = {
  podAntiAffinity?: LokiHelmValuesBackendAffinityPodAntiAffinity;
};

export type LokiHelmValuesBackendAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesBackendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesBackendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesBackendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesBackendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector = {
  matchLabels?: LokiHelmValuesBackendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
};

export type LokiHelmValuesBackendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesBackendDnsConfig = object;

export type LokiHelmValuesBackendNodeSelector = object;

export type LokiHelmValuesBackendPersistence = {
  volumeClaimsEnabled?: boolean;
  dataVolumeParameters?: LokiHelmValuesBackendPersistenceDataVolumeParameters;
  enableStatefulSetAutoDeletePVC?: boolean;
  size?: string;
  storageClass?: unknown;
  selector?: unknown;
  annotations?: LokiHelmValuesBackendPersistenceAnnotations;
  labels?: LokiHelmValuesBackendPersistenceLabels;
};

export type LokiHelmValuesBackendPersistenceDataVolumeParameters = {
  emptyDir?: LokiHelmValuesBackendPersistenceDataVolumeParametersEmptyDir;
};

export type LokiHelmValuesBackendPersistenceDataVolumeParametersEmptyDir = object;

export type LokiHelmValuesBackendPersistenceAnnotations = object;

export type LokiHelmValuesBackendPersistenceLabels = object;

export type LokiHelmValuesIngester = {
  replicas?: number;
  hostAliases?: unknown[];
  autoscaling?: LokiHelmValuesIngesterAutoscaling;
  image?: LokiHelmValuesIngesterImage;
  command?: unknown;
  labels?: LokiHelmValuesIngesterLabels;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesIngesterPodLabels;
  podAnnotations?: LokiHelmValuesIngesterPodAnnotations;
  serviceLabels?: LokiHelmValuesIngesterServiceLabels;
  serviceAnnotations?: LokiHelmValuesIngesterServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesIngesterResources;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  lifecycle?: LokiHelmValuesIngesterLifecycle;
  topologySpreadConstraints?: LokiHelmValuesIngesterTopologySpreadConstraintsElement[];
  affinity?: LokiHelmValuesIngesterAffinity;
  maxUnavailable?: number;
  nodeSelector?: LokiHelmValuesIngesterNodeSelector;
  tolerations?: unknown[];
  readinessProbe?: LokiHelmValuesIngesterReadinessProbe;
  livenessProbe?: LokiHelmValuesIngesterLivenessProbe;
  updateStrategy?: LokiHelmValuesIngesterUpdateStrategy;
  persistence?: LokiHelmValuesIngesterPersistence;
  appProtocol?: LokiHelmValuesIngesterAppProtocol;
  zoneAwareReplication?: LokiHelmValuesIngesterZoneAwareReplication;
  rolloutGroupPrefix?: unknown;
  addIngesterNamePrefix?: boolean;
};

export type LokiHelmValuesIngesterAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
  customMetrics?: unknown[];
  behavior?: LokiHelmValuesIngesterAutoscalingBehavior;
};

export type LokiHelmValuesIngesterAutoscalingBehavior = {
  enabled?: boolean;
  scaleDown?: LokiHelmValuesIngesterAutoscalingBehaviorScaleDown;
  scaleUp?: LokiHelmValuesIngesterAutoscalingBehaviorScaleUp;
};

export type LokiHelmValuesIngesterAutoscalingBehaviorScaleDown = object;

export type LokiHelmValuesIngesterAutoscalingBehaviorScaleUp = object;

export type LokiHelmValuesIngesterImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesIngesterLabels = object;

export type LokiHelmValuesIngesterPodLabels = object;

export type LokiHelmValuesIngesterPodAnnotations = object;

export type LokiHelmValuesIngesterServiceLabels = object;

export type LokiHelmValuesIngesterServiceAnnotations = object;

export type LokiHelmValuesIngesterResources = object;

export type LokiHelmValuesIngesterLifecycle = object;

export type LokiHelmValuesIngesterTopologySpreadConstraintsElement = {
  maxSkew?: number;
  topologyKey?: string;
  whenUnsatisfiable?: string;
  labelSelector?: LokiHelmValuesIngesterTopologySpreadConstraintsLabelSelector;
};

export type LokiHelmValuesIngesterTopologySpreadConstraintsLabelSelector = {
  matchLabels?: LokiHelmValuesIngesterTopologySpreadConstraintsLabelSelectorMatchLabels;
};

export type LokiHelmValuesIngesterTopologySpreadConstraintsLabelSelectorMatchLabels = {
  "app.kubernetes.io/component"?: string;
};

export type LokiHelmValuesIngesterAffinity = {
  podAntiAffinity?: LokiHelmValuesIngesterAffinityPodAntiAffinity;
};

export type LokiHelmValuesIngesterAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector = {
  matchLabels?: LokiHelmValuesIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
};

export type LokiHelmValuesIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesIngesterNodeSelector = object;

export type LokiHelmValuesIngesterReadinessProbe = object;

export type LokiHelmValuesIngesterLivenessProbe = object;

export type LokiHelmValuesIngesterUpdateStrategy = {
  type?: string;
};

export type LokiHelmValuesIngesterPersistence = {
  enabled?: boolean;
  inMemory?: boolean;
  claims?: LokiHelmValuesIngesterPersistenceClaimsElement[];
  enableStatefulSetAutoDeletePVC?: boolean;
  whenDeleted?: string;
  whenScaled?: string;
};

export type LokiHelmValuesIngesterPersistenceClaimsElement = {
  name?: string;
  size?: string;
  storageClass?: unknown;
};

export type LokiHelmValuesIngesterAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesIngesterZoneAwareReplication = {
  enabled?: boolean;
  maxUnavailablePct?: number;
  zoneA?: LokiHelmValuesIngesterZoneAwareReplicationZoneA;
  zoneB?: LokiHelmValuesIngesterZoneAwareReplicationZoneB;
  zoneC?: LokiHelmValuesIngesterZoneAwareReplicationZoneC;
  migration?: LokiHelmValuesIngesterZoneAwareReplicationMigration;
};

export type LokiHelmValuesIngesterZoneAwareReplicationZoneA = {
  nodeSelector?: unknown;
  extraAffinity?: LokiHelmValuesIngesterZoneAwareReplicationZoneAExtraAffinity;
  annotations?: LokiHelmValuesIngesterZoneAwareReplicationZoneAAnnotations;
  podAnnotations?: LokiHelmValuesIngesterZoneAwareReplicationZoneAPodAnnotations;
};

export type LokiHelmValuesIngesterZoneAwareReplicationZoneAExtraAffinity = object;

export type LokiHelmValuesIngesterZoneAwareReplicationZoneAAnnotations = object;

export type LokiHelmValuesIngesterZoneAwareReplicationZoneAPodAnnotations = object;

export type LokiHelmValuesIngesterZoneAwareReplicationZoneB = {
  nodeSelector?: unknown;
  extraAffinity?: LokiHelmValuesIngesterZoneAwareReplicationZoneBExtraAffinity;
  annotations?: LokiHelmValuesIngesterZoneAwareReplicationZoneBAnnotations;
  podAnnotations?: LokiHelmValuesIngesterZoneAwareReplicationZoneBPodAnnotations;
};

export type LokiHelmValuesIngesterZoneAwareReplicationZoneBExtraAffinity = object;

export type LokiHelmValuesIngesterZoneAwareReplicationZoneBAnnotations = object;

export type LokiHelmValuesIngesterZoneAwareReplicationZoneBPodAnnotations = object;

export type LokiHelmValuesIngesterZoneAwareReplicationZoneC = {
  nodeSelector?: unknown;
  extraAffinity?: LokiHelmValuesIngesterZoneAwareReplicationZoneCExtraAffinity;
  annotations?: LokiHelmValuesIngesterZoneAwareReplicationZoneCAnnotations;
  podAnnotations?: LokiHelmValuesIngesterZoneAwareReplicationZoneCPodAnnotations;
};

export type LokiHelmValuesIngesterZoneAwareReplicationZoneCExtraAffinity = object;

export type LokiHelmValuesIngesterZoneAwareReplicationZoneCAnnotations = object;

export type LokiHelmValuesIngesterZoneAwareReplicationZoneCPodAnnotations = object;

export type LokiHelmValuesIngesterZoneAwareReplicationMigration = {
  enabled?: boolean;
  excludeDefaultZone?: boolean;
  readPath?: boolean;
  writePath?: boolean;
};

export type LokiHelmValuesDistributor = {
  replicas?: number;
  hostAliases?: unknown[];
  autoscaling?: LokiHelmValuesDistributorAutoscaling;
  image?: LokiHelmValuesDistributorImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesDistributorPodLabels;
  podAnnotations?: LokiHelmValuesDistributorPodAnnotations;
  serviceLabels?: LokiHelmValuesDistributorServiceLabels;
  serviceAnnotations?: LokiHelmValuesDistributorServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesDistributorResources;
  extraContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesDistributorAffinity;
  maxUnavailable?: unknown;
  maxSurge?: number;
  nodeSelector?: LokiHelmValuesDistributorNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  appProtocol?: LokiHelmValuesDistributorAppProtocol;
  trafficDistribution?: string;
};

export type LokiHelmValuesDistributorAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
  customMetrics?: unknown[];
  behavior?: LokiHelmValuesDistributorAutoscalingBehavior;
};

export type LokiHelmValuesDistributorAutoscalingBehavior = {
  enabled?: boolean;
  scaleDown?: LokiHelmValuesDistributorAutoscalingBehaviorScaleDown;
  scaleUp?: LokiHelmValuesDistributorAutoscalingBehaviorScaleUp;
};

export type LokiHelmValuesDistributorAutoscalingBehaviorScaleDown = object;

export type LokiHelmValuesDistributorAutoscalingBehaviorScaleUp = object;

export type LokiHelmValuesDistributorImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesDistributorPodLabels = object;

export type LokiHelmValuesDistributorPodAnnotations = object;

export type LokiHelmValuesDistributorServiceLabels = object;

export type LokiHelmValuesDistributorServiceAnnotations = object;

export type LokiHelmValuesDistributorResources = object;

export type LokiHelmValuesDistributorAffinity = {
  podAntiAffinity?: LokiHelmValuesDistributorAffinityPodAntiAffinity;
};

export type LokiHelmValuesDistributorAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesDistributorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesDistributorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesDistributorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesDistributorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesDistributorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesDistributorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesDistributorNodeSelector = object;

export type LokiHelmValuesDistributorAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesQuerier = {
  replicas?: number;
  hostAliases?: unknown[];
  autoscaling?: LokiHelmValuesQuerierAutoscaling;
  image?: LokiHelmValuesQuerierImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesQuerierPodLabels;
  podAnnotations?: LokiHelmValuesQuerierPodAnnotations;
  serviceLabels?: LokiHelmValuesQuerierServiceLabels;
  serviceAnnotations?: LokiHelmValuesQuerierServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesQuerierResources;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  topologySpreadConstraints?: LokiHelmValuesQuerierTopologySpreadConstraintsElement[];
  affinity?: LokiHelmValuesQuerierAffinity;
  maxUnavailable?: unknown;
  maxSurge?: number;
  nodeSelector?: LokiHelmValuesQuerierNodeSelector;
  tolerations?: unknown[];
  dnsConfig?: LokiHelmValuesQuerierDnsConfig;
  appProtocol?: LokiHelmValuesQuerierAppProtocol;
};

export type LokiHelmValuesQuerierAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
  customMetrics?: unknown[];
  behavior?: LokiHelmValuesQuerierAutoscalingBehavior;
};

export type LokiHelmValuesQuerierAutoscalingBehavior = {
  enabled?: boolean;
  scaleDown?: LokiHelmValuesQuerierAutoscalingBehaviorScaleDown;
  scaleUp?: LokiHelmValuesQuerierAutoscalingBehaviorScaleUp;
};

export type LokiHelmValuesQuerierAutoscalingBehaviorScaleDown = object;

export type LokiHelmValuesQuerierAutoscalingBehaviorScaleUp = object;

export type LokiHelmValuesQuerierImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesQuerierPodLabels = object;

export type LokiHelmValuesQuerierPodAnnotations = object;

export type LokiHelmValuesQuerierServiceLabels = object;

export type LokiHelmValuesQuerierServiceAnnotations = object;

export type LokiHelmValuesQuerierResources = object;

export type LokiHelmValuesQuerierTopologySpreadConstraintsElement = {
  maxSkew?: number;
  topologyKey?: string;
  whenUnsatisfiable?: string;
  labelSelector?: LokiHelmValuesQuerierTopologySpreadConstraintsLabelSelector;
};

export type LokiHelmValuesQuerierTopologySpreadConstraintsLabelSelector = {
  matchLabels?: LokiHelmValuesQuerierTopologySpreadConstraintsLabelSelectorMatchLabels;
};

export type LokiHelmValuesQuerierTopologySpreadConstraintsLabelSelectorMatchLabels = {
  "app.kubernetes.io/component"?: string;
};

export type LokiHelmValuesQuerierAffinity = {
  podAntiAffinity?: LokiHelmValuesQuerierAffinityPodAntiAffinity;
};

export type LokiHelmValuesQuerierAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesQuerierAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesQuerierAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesQuerierAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesQuerierAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector = {
  matchLabels?: LokiHelmValuesQuerierAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
};

export type LokiHelmValuesQuerierAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesQuerierNodeSelector = object;

export type LokiHelmValuesQuerierDnsConfig = object;

export type LokiHelmValuesQuerierAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesQueryFrontend = {
  replicas?: number;
  hostAliases?: unknown[];
  autoscaling?: LokiHelmValuesQueryFrontendAutoscaling;
  image?: LokiHelmValuesQueryFrontendImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesQueryFrontendPodLabels;
  podAnnotations?: LokiHelmValuesQueryFrontendPodAnnotations;
  serviceLabels?: LokiHelmValuesQueryFrontendServiceLabels;
  serviceAnnotations?: LokiHelmValuesQueryFrontendServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesQueryFrontendResources;
  extraContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesQueryFrontendAffinity;
  maxUnavailable?: unknown;
  nodeSelector?: LokiHelmValuesQueryFrontendNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  appProtocol?: LokiHelmValuesQueryFrontendAppProtocol;
};

export type LokiHelmValuesQueryFrontendAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
  customMetrics?: unknown[];
  behavior?: LokiHelmValuesQueryFrontendAutoscalingBehavior;
};

export type LokiHelmValuesQueryFrontendAutoscalingBehavior = {
  enabled?: boolean;
  scaleDown?: LokiHelmValuesQueryFrontendAutoscalingBehaviorScaleDown;
  scaleUp?: LokiHelmValuesQueryFrontendAutoscalingBehaviorScaleUp;
};

export type LokiHelmValuesQueryFrontendAutoscalingBehaviorScaleDown = object;

export type LokiHelmValuesQueryFrontendAutoscalingBehaviorScaleUp = object;

export type LokiHelmValuesQueryFrontendImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesQueryFrontendPodLabels = object;

export type LokiHelmValuesQueryFrontendPodAnnotations = object;

export type LokiHelmValuesQueryFrontendServiceLabels = object;

export type LokiHelmValuesQueryFrontendServiceAnnotations = object;

export type LokiHelmValuesQueryFrontendResources = object;

export type LokiHelmValuesQueryFrontendAffinity = {
  podAntiAffinity?: LokiHelmValuesQueryFrontendAffinityPodAntiAffinity;
};

export type LokiHelmValuesQueryFrontendAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesQueryFrontendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesQueryFrontendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesQueryFrontendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesQueryFrontendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesQueryFrontendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesQueryFrontendAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesQueryFrontendNodeSelector = object;

export type LokiHelmValuesQueryFrontendAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesQueryScheduler = {
  replicas?: number;
  hostAliases?: unknown[];
  image?: LokiHelmValuesQuerySchedulerImage;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesQuerySchedulerPodLabels;
  podAnnotations?: LokiHelmValuesQuerySchedulerPodAnnotations;
  serviceLabels?: LokiHelmValuesQuerySchedulerServiceLabels;
  serviceAnnotations?: LokiHelmValuesQuerySchedulerServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesQuerySchedulerResources;
  extraContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesQuerySchedulerAffinity;
  maxUnavailable?: number;
  nodeSelector?: LokiHelmValuesQuerySchedulerNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  appProtocol?: LokiHelmValuesQuerySchedulerAppProtocol;
};

export type LokiHelmValuesQuerySchedulerImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesQuerySchedulerPodLabels = object;

export type LokiHelmValuesQuerySchedulerPodAnnotations = object;

export type LokiHelmValuesQuerySchedulerServiceLabels = object;

export type LokiHelmValuesQuerySchedulerServiceAnnotations = object;

export type LokiHelmValuesQuerySchedulerResources = object;

export type LokiHelmValuesQuerySchedulerAffinity = {
  podAntiAffinity?: LokiHelmValuesQuerySchedulerAffinityPodAntiAffinity;
};

export type LokiHelmValuesQuerySchedulerAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesQuerySchedulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesQuerySchedulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesQuerySchedulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesQuerySchedulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesQuerySchedulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesQuerySchedulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesQuerySchedulerNodeSelector = object;

export type LokiHelmValuesQuerySchedulerAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesIndexGateway = {
  replicas?: number;
  joinMemberlist?: boolean;
  hostAliases?: unknown[];
  image?: LokiHelmValuesIndexGatewayImage;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesIndexGatewayPodLabels;
  podAnnotations?: LokiHelmValuesIndexGatewayPodAnnotations;
  serviceLabels?: LokiHelmValuesIndexGatewayServiceLabels;
  serviceAnnotations?: LokiHelmValuesIndexGatewayServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesIndexGatewayResources;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesIndexGatewayAffinity;
  maxUnavailable?: unknown;
  nodeSelector?: LokiHelmValuesIndexGatewayNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  persistence?: LokiHelmValuesIndexGatewayPersistence;
  appProtocol?: LokiHelmValuesIndexGatewayAppProtocol;
  updateStrategy?: LokiHelmValuesIndexGatewayUpdateStrategy;
};

export type LokiHelmValuesIndexGatewayImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesIndexGatewayPodLabels = object;

export type LokiHelmValuesIndexGatewayPodAnnotations = object;

export type LokiHelmValuesIndexGatewayServiceLabels = object;

export type LokiHelmValuesIndexGatewayServiceAnnotations = object;

export type LokiHelmValuesIndexGatewayResources = object;

export type LokiHelmValuesIndexGatewayAffinity = {
  podAntiAffinity?: LokiHelmValuesIndexGatewayAffinityPodAntiAffinity;
};

export type LokiHelmValuesIndexGatewayAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesIndexGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesIndexGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesIndexGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesIndexGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesIndexGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesIndexGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesIndexGatewayNodeSelector = object;

export type LokiHelmValuesIndexGatewayPersistence = {
  enabled?: boolean;
  inMemory?: boolean;
  size?: string;
  storageClass?: unknown;
  annotations?: LokiHelmValuesIndexGatewayPersistenceAnnotations;
  labels?: LokiHelmValuesIndexGatewayPersistenceLabels;
  enableStatefulSetAutoDeletePVC?: boolean;
  whenDeleted?: string;
  whenScaled?: string;
};

export type LokiHelmValuesIndexGatewayPersistenceAnnotations = object;

export type LokiHelmValuesIndexGatewayPersistenceLabels = object;

export type LokiHelmValuesIndexGatewayAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesIndexGatewayUpdateStrategy = {
  type?: string;
};

export type LokiHelmValuesCompactor = {
  replicas?: number;
  hostAliases?: unknown[];
  image?: LokiHelmValuesCompactorImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesCompactorPodLabels;
  podAnnotations?: LokiHelmValuesCompactorPodAnnotations;
  affinity?: LokiHelmValuesCompactorAffinity;
  serviceLabels?: LokiHelmValuesCompactorServiceLabels;
  serviceAnnotations?: LokiHelmValuesCompactorServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  readinessProbe?: LokiHelmValuesCompactorReadinessProbe;
  livenessProbe?: LokiHelmValuesCompactorLivenessProbe;
  resources?: LokiHelmValuesCompactorResources;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  nodeSelector?: LokiHelmValuesCompactorNodeSelector;
  tolerations?: unknown[];
  appProtocol?: LokiHelmValuesCompactorAppProtocol;
  persistence?: LokiHelmValuesCompactorPersistence;
  serviceAccount?: LokiHelmValuesCompactorServiceAccount;
  // manually added
  enabled?: boolean;
  retention_enabled?: boolean;
  working_directory?: string;
  compaction_interval?: string;
  retention_delete_delay?: string;
};

export type LokiHelmValuesCompactorImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesCompactorPodLabels = object;

export type LokiHelmValuesCompactorPodAnnotations = object;

export type LokiHelmValuesCompactorAffinity = {
  podAntiAffinity?: LokiHelmValuesCompactorAffinityPodAntiAffinity;
};

export type LokiHelmValuesCompactorAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesCompactorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesCompactorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesCompactorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesCompactorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesCompactorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesCompactorAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesCompactorServiceLabels = object;

export type LokiHelmValuesCompactorServiceAnnotations = object;

export type LokiHelmValuesCompactorReadinessProbe = object;

export type LokiHelmValuesCompactorLivenessProbe = object;

export type LokiHelmValuesCompactorResources = object;

export type LokiHelmValuesCompactorNodeSelector = object;

export type LokiHelmValuesCompactorAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesCompactorPersistence = {
  enabled?: boolean;
  size?: string;
  storageClass?: unknown;
  claims?: LokiHelmValuesCompactorPersistenceClaimsElement[];
  enableStatefulSetAutoDeletePVC?: boolean;
  whenDeleted?: string;
  whenScaled?: string;
};

export type LokiHelmValuesCompactorPersistenceClaimsElement = {
  name?: string;
  size?: string;
  storageClass?: unknown;
  annotations?: LokiHelmValuesCompactorPersistenceClaimsAnnotations;
  labels?: LokiHelmValuesCompactorPersistenceClaimsLabels;
};

export type LokiHelmValuesCompactorPersistenceClaimsAnnotations = object;

export type LokiHelmValuesCompactorPersistenceClaimsLabels = object;

export type LokiHelmValuesCompactorServiceAccount = {
  create?: boolean;
  name?: unknown;
  imagePullSecrets?: unknown[];
  annotations?: LokiHelmValuesCompactorServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type LokiHelmValuesCompactorServiceAccountAnnotations = object;

export type LokiHelmValuesBloomGateway = {
  replicas?: number;
  hostAliases?: unknown[];
  image?: LokiHelmValuesBloomGatewayImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesBloomGatewayPodLabels;
  podAnnotations?: LokiHelmValuesBloomGatewayPodAnnotations;
  affinity?: LokiHelmValuesBloomGatewayAffinity;
  serviceLabels?: LokiHelmValuesBloomGatewayServiceLabels;
  serviceAnnotations?: LokiHelmValuesBloomGatewayServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  readinessProbe?: LokiHelmValuesBloomGatewayReadinessProbe;
  livenessProbe?: LokiHelmValuesBloomGatewayLivenessProbe;
  startupProbe?: LokiHelmValuesBloomGatewayStartupProbe;
  resources?: LokiHelmValuesBloomGatewayResources;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  nodeSelector?: LokiHelmValuesBloomGatewayNodeSelector;
  tolerations?: unknown[];
  appProtocol?: LokiHelmValuesBloomGatewayAppProtocol;
  persistence?: LokiHelmValuesBloomGatewayPersistence;
  serviceAccount?: LokiHelmValuesBloomGatewayServiceAccount;
};

export type LokiHelmValuesBloomGatewayImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesBloomGatewayPodLabels = object;

export type LokiHelmValuesBloomGatewayPodAnnotations = object;

export type LokiHelmValuesBloomGatewayAffinity = {
  podAntiAffinity?: LokiHelmValuesBloomGatewayAffinityPodAntiAffinity;
};

export type LokiHelmValuesBloomGatewayAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesBloomGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesBloomGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesBloomGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesBloomGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesBloomGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesBloomGatewayAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesBloomGatewayServiceLabels = object;

export type LokiHelmValuesBloomGatewayServiceAnnotations = object;

export type LokiHelmValuesBloomGatewayReadinessProbe = object;

export type LokiHelmValuesBloomGatewayLivenessProbe = object;

export type LokiHelmValuesBloomGatewayStartupProbe = object;

export type LokiHelmValuesBloomGatewayResources = object;

export type LokiHelmValuesBloomGatewayNodeSelector = object;

export type LokiHelmValuesBloomGatewayAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesBloomGatewayPersistence = {
  enabled?: boolean;
  annotations?: LokiHelmValuesBloomGatewayPersistenceAnnotations;
  labels?: LokiHelmValuesBloomGatewayPersistenceLabels;
  claims?: LokiHelmValuesBloomGatewayPersistenceClaimsElement[];
  enableStatefulSetAutoDeletePVC?: boolean;
  whenDeleted?: string;
  whenScaled?: string;
};

export type LokiHelmValuesBloomGatewayPersistenceAnnotations = object;

export type LokiHelmValuesBloomGatewayPersistenceLabels = object;

export type LokiHelmValuesBloomGatewayPersistenceClaimsElement = {
  name?: string;
  size?: string;
  storageClass?: unknown;
};

export type LokiHelmValuesBloomGatewayServiceAccount = {
  create?: boolean;
  name?: unknown;
  imagePullSecrets?: unknown[];
  annotations?: LokiHelmValuesBloomGatewayServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type LokiHelmValuesBloomGatewayServiceAccountAnnotations = object;

export type LokiHelmValuesBloomPlanner = {
  replicas?: number;
  hostAliases?: unknown[];
  image?: LokiHelmValuesBloomPlannerImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesBloomPlannerPodLabels;
  podAnnotations?: LokiHelmValuesBloomPlannerPodAnnotations;
  affinity?: LokiHelmValuesBloomPlannerAffinity;
  serviceLabels?: LokiHelmValuesBloomPlannerServiceLabels;
  serviceAnnotations?: LokiHelmValuesBloomPlannerServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  readinessProbe?: LokiHelmValuesBloomPlannerReadinessProbe;
  livenessProbe?: LokiHelmValuesBloomPlannerLivenessProbe;
  startupProbe?: LokiHelmValuesBloomPlannerStartupProbe;
  resources?: LokiHelmValuesBloomPlannerResources;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  nodeSelector?: LokiHelmValuesBloomPlannerNodeSelector;
  tolerations?: unknown[];
  appProtocol?: LokiHelmValuesBloomPlannerAppProtocol;
  persistence?: LokiHelmValuesBloomPlannerPersistence;
  serviceAccount?: LokiHelmValuesBloomPlannerServiceAccount;
};

export type LokiHelmValuesBloomPlannerImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesBloomPlannerPodLabels = object;

export type LokiHelmValuesBloomPlannerPodAnnotations = object;

export type LokiHelmValuesBloomPlannerAffinity = {
  podAntiAffinity?: LokiHelmValuesBloomPlannerAffinityPodAntiAffinity;
};

export type LokiHelmValuesBloomPlannerAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesBloomPlannerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesBloomPlannerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesBloomPlannerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesBloomPlannerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesBloomPlannerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesBloomPlannerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesBloomPlannerServiceLabels = object;

export type LokiHelmValuesBloomPlannerServiceAnnotations = object;

export type LokiHelmValuesBloomPlannerReadinessProbe = object;

export type LokiHelmValuesBloomPlannerLivenessProbe = object;

export type LokiHelmValuesBloomPlannerStartupProbe = object;

export type LokiHelmValuesBloomPlannerResources = object;

export type LokiHelmValuesBloomPlannerNodeSelector = object;

export type LokiHelmValuesBloomPlannerAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesBloomPlannerPersistence = {
  enabled?: boolean;
  claims?: LokiHelmValuesBloomPlannerPersistenceClaimsElement[];
  enableStatefulSetAutoDeletePVC?: boolean;
  whenDeleted?: string;
  whenScaled?: string;
};

export type LokiHelmValuesBloomPlannerPersistenceClaimsElement = {
  name?: string;
  size?: string;
  storageClass?: unknown;
  annotations?: LokiHelmValuesBloomPlannerPersistenceClaimsAnnotations;
  labels?: LokiHelmValuesBloomPlannerPersistenceClaimsLabels;
};

export type LokiHelmValuesBloomPlannerPersistenceClaimsAnnotations = object;

export type LokiHelmValuesBloomPlannerPersistenceClaimsLabels = object;

export type LokiHelmValuesBloomPlannerServiceAccount = {
  create?: boolean;
  name?: unknown;
  imagePullSecrets?: unknown[];
  annotations?: LokiHelmValuesBloomPlannerServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type LokiHelmValuesBloomPlannerServiceAccountAnnotations = object;

export type LokiHelmValuesBloomBuilder = {
  replicas?: number;
  hostAliases?: unknown[];
  autoscaling?: LokiHelmValuesBloomBuilderAutoscaling;
  image?: LokiHelmValuesBloomBuilderImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesBloomBuilderPodLabels;
  podAnnotations?: LokiHelmValuesBloomBuilderPodAnnotations;
  serviceLabels?: LokiHelmValuesBloomBuilderServiceLabels;
  serviceAnnotations?: LokiHelmValuesBloomBuilderServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesBloomBuilderResources;
  extraContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesBloomBuilderAffinity;
  maxUnavailable?: unknown;
  nodeSelector?: LokiHelmValuesBloomBuilderNodeSelector;
  tolerations?: unknown[];
  appProtocol?: LokiHelmValuesBloomBuilderAppProtocol;
};

export type LokiHelmValuesBloomBuilderAutoscaling = {
  enabled?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  targetCPUUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: unknown;
  customMetrics?: unknown[];
  behavior?: LokiHelmValuesBloomBuilderAutoscalingBehavior;
};

export type LokiHelmValuesBloomBuilderAutoscalingBehavior = {
  enabled?: boolean;
  scaleDown?: LokiHelmValuesBloomBuilderAutoscalingBehaviorScaleDown;
  scaleUp?: LokiHelmValuesBloomBuilderAutoscalingBehaviorScaleUp;
};

export type LokiHelmValuesBloomBuilderAutoscalingBehaviorScaleDown = object;

export type LokiHelmValuesBloomBuilderAutoscalingBehaviorScaleUp = object;

export type LokiHelmValuesBloomBuilderImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesBloomBuilderPodLabels = object;

export type LokiHelmValuesBloomBuilderPodAnnotations = object;

export type LokiHelmValuesBloomBuilderServiceLabels = object;

export type LokiHelmValuesBloomBuilderServiceAnnotations = object;

export type LokiHelmValuesBloomBuilderResources = object;

export type LokiHelmValuesBloomBuilderAffinity = {
  podAntiAffinity?: LokiHelmValuesBloomBuilderAffinityPodAntiAffinity;
};

export type LokiHelmValuesBloomBuilderAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesBloomBuilderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesBloomBuilderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesBloomBuilderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesBloomBuilderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesBloomBuilderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesBloomBuilderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesBloomBuilderNodeSelector = object;

export type LokiHelmValuesBloomBuilderAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesPatternIngester = {
  replicas?: number;
  hostAliases?: unknown[];
  image?: LokiHelmValuesPatternIngesterImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesPatternIngesterPodLabels;
  podAnnotations?: LokiHelmValuesPatternIngesterPodAnnotations;
  affinity?: LokiHelmValuesPatternIngesterAffinity;
  maxUnavailable?: unknown;
  serviceLabels?: LokiHelmValuesPatternIngesterServiceLabels;
  serviceAnnotations?: LokiHelmValuesPatternIngesterServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  readinessProbe?: LokiHelmValuesPatternIngesterReadinessProbe;
  livenessProbe?: LokiHelmValuesPatternIngesterLivenessProbe;
  resources?: LokiHelmValuesPatternIngesterResources;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  nodeSelector?: LokiHelmValuesPatternIngesterNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  appProtocol?: LokiHelmValuesPatternIngesterAppProtocol;
  persistence?: LokiHelmValuesPatternIngesterPersistence;
  serviceAccount?: LokiHelmValuesPatternIngesterServiceAccount;
};

export type LokiHelmValuesPatternIngesterImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesPatternIngesterPodLabels = object;

export type LokiHelmValuesPatternIngesterPodAnnotations = object;

export type LokiHelmValuesPatternIngesterAffinity = {
  podAntiAffinity?: LokiHelmValuesPatternIngesterAffinityPodAntiAffinity;
};

export type LokiHelmValuesPatternIngesterAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesPatternIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesPatternIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement =
  {
    labelSelector?: LokiHelmValuesPatternIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
    topologyKey?: string;
  };

export type LokiHelmValuesPatternIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesPatternIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesPatternIngesterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesPatternIngesterServiceLabels = object;

export type LokiHelmValuesPatternIngesterServiceAnnotations = object;

export type LokiHelmValuesPatternIngesterReadinessProbe = object;

export type LokiHelmValuesPatternIngesterLivenessProbe = object;

export type LokiHelmValuesPatternIngesterResources = object;

export type LokiHelmValuesPatternIngesterNodeSelector = object;

export type LokiHelmValuesPatternIngesterAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesPatternIngesterPersistence = {
  enabled?: boolean;
  size?: string;
  storageClass?: unknown;
  claims?: LokiHelmValuesPatternIngesterPersistenceClaimsElement[];
  enableStatefulSetAutoDeletePVC?: boolean;
  whenDeleted?: string;
  whenScaled?: string;
};

export type LokiHelmValuesPatternIngesterPersistenceClaimsElement = {
  name?: string;
  size?: string;
  storageClass?: unknown;
  annotations?: LokiHelmValuesPatternIngesterPersistenceClaimsAnnotations;
  labels?: LokiHelmValuesPatternIngesterPersistenceClaimsLabels;
};

export type LokiHelmValuesPatternIngesterPersistenceClaimsAnnotations = object;

export type LokiHelmValuesPatternIngesterPersistenceClaimsLabels = object;

export type LokiHelmValuesPatternIngesterServiceAccount = {
  create?: boolean;
  name?: unknown;
  imagePullSecrets?: unknown[];
  annotations?: LokiHelmValuesPatternIngesterServiceAccountAnnotations;
  automountServiceAccountToken?: boolean;
};

export type LokiHelmValuesPatternIngesterServiceAccountAnnotations = object;

export type LokiHelmValuesRuler = {
  enabled?: boolean;
  sidecar?: boolean;
  replicas?: number;
  hostAliases?: unknown[];
  image?: LokiHelmValuesRulerImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesRulerPodLabels;
  podAnnotations?: LokiHelmValuesRulerPodAnnotations;
  serviceLabels?: LokiHelmValuesRulerServiceLabels;
  serviceAnnotations?: LokiHelmValuesRulerServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesRulerResources;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesRulerAffinity;
  maxUnavailable?: unknown;
  nodeSelector?: LokiHelmValuesRulerNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  dnsConfig?: LokiHelmValuesRulerDnsConfig;
  persistence?: LokiHelmValuesRulerPersistence;
  appProtocol?: LokiHelmValuesRulerAppProtocol;
  directories?: LokiHelmValuesRulerDirectories;
};

export type LokiHelmValuesRulerImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesRulerPodLabels = object;

export type LokiHelmValuesRulerPodAnnotations = object;

export type LokiHelmValuesRulerServiceLabels = object;

export type LokiHelmValuesRulerServiceAnnotations = object;

export type LokiHelmValuesRulerResources = object;

export type LokiHelmValuesRulerAffinity = {
  podAntiAffinity?: LokiHelmValuesRulerAffinityPodAntiAffinity;
};

export type LokiHelmValuesRulerAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesRulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesRulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesRulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesRulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector = {
  matchLabels?: LokiHelmValuesRulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
};

export type LokiHelmValuesRulerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesRulerNodeSelector = object;

export type LokiHelmValuesRulerDnsConfig = object;

export type LokiHelmValuesRulerPersistence = {
  enabled?: boolean;
  size?: string;
  storageClass?: unknown;
  annotations?: LokiHelmValuesRulerPersistenceAnnotations;
  labels?: LokiHelmValuesRulerPersistenceLabels;
};

export type LokiHelmValuesRulerPersistenceAnnotations = object;

export type LokiHelmValuesRulerPersistenceLabels = object;

export type LokiHelmValuesRulerAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesRulerDirectories = object;

export type LokiHelmValuesOverridesExporter = {
  enabled?: boolean;
  replicas?: number;
  hostAliases?: unknown[];
  image?: LokiHelmValuesOverridesExporterImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesOverridesExporterPodLabels;
  podAnnotations?: LokiHelmValuesOverridesExporterPodAnnotations;
  serviceLabels?: LokiHelmValuesOverridesExporterServiceLabels;
  serviceAnnotations?: LokiHelmValuesOverridesExporterServiceAnnotations;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesOverridesExporterResources;
  extraContainers?: unknown[];
  initContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesOverridesExporterAffinity;
  maxUnavailable?: unknown;
  nodeSelector?: LokiHelmValuesOverridesExporterNodeSelector;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  appProtocol?: LokiHelmValuesOverridesExporterAppProtocol;
};

export type LokiHelmValuesOverridesExporterImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesOverridesExporterPodLabels = object;

export type LokiHelmValuesOverridesExporterPodAnnotations = object;

export type LokiHelmValuesOverridesExporterServiceLabels = object;

export type LokiHelmValuesOverridesExporterServiceAnnotations = object;

export type LokiHelmValuesOverridesExporterResources = object;

export type LokiHelmValuesOverridesExporterAffinity = {
  podAntiAffinity?: LokiHelmValuesOverridesExporterAffinityPodAntiAffinity;
};

export type LokiHelmValuesOverridesExporterAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesOverridesExporterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesOverridesExporterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement =
  {
    labelSelector?: LokiHelmValuesOverridesExporterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
    topologyKey?: string;
  };

export type LokiHelmValuesOverridesExporterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesOverridesExporterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesOverridesExporterAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesOverridesExporterNodeSelector = object;

export type LokiHelmValuesOverridesExporterAppProtocol = {
  grpc?: string;
};

export type LokiHelmValuesMemcached = {
  enabled?: boolean;
  image?: LokiHelmValuesMemcachedImage;
  podSecurityContext?: LokiHelmValuesMemcachedPodSecurityContext;
  priorityClassName?: unknown;
  containerSecurityContext?: LokiHelmValuesMemcachedContainerSecurityContext;
  readinessProbe?: LokiHelmValuesMemcachedReadinessProbe;
  livenessProbe?: LokiHelmValuesMemcachedLivenessProbe;
};

export type LokiHelmValuesMemcachedImage = {
  repository?: string;
  tag?: string;
  pullPolicy?: string;
};

export type LokiHelmValuesMemcachedPodSecurityContext = {
  runAsNonRoot?: boolean;
  runAsUser?: number;
  runAsGroup?: number;
  fsGroup?: number;
};

export type LokiHelmValuesMemcachedContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  capabilities?: LokiHelmValuesMemcachedContainerSecurityContextCapabilities;
  allowPrivilegeEscalation?: boolean;
};

export type LokiHelmValuesMemcachedContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type LokiHelmValuesMemcachedReadinessProbe = {
  tcpSocket?: LokiHelmValuesMemcachedReadinessProbeTcpSocket;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  failureThreshold?: number;
};

export type LokiHelmValuesMemcachedReadinessProbeTcpSocket = {
  port?: string;
};

export type LokiHelmValuesMemcachedLivenessProbe = {
  tcpSocket?: LokiHelmValuesMemcachedLivenessProbeTcpSocket;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  failureThreshold?: number;
};

export type LokiHelmValuesMemcachedLivenessProbeTcpSocket = {
  port?: string;
};

export type LokiHelmValuesMemcachedExporter = {
  enabled?: boolean;
  image?: LokiHelmValuesMemcachedExporterImage;
  resources?: LokiHelmValuesMemcachedExporterResources;
  containerSecurityContext?: LokiHelmValuesMemcachedExporterContainerSecurityContext;
  extraArgs?: LokiHelmValuesMemcachedExporterExtraArgs;
  livenessProbe?: LokiHelmValuesMemcachedExporterLivenessProbe;
  readinessProbe?: LokiHelmValuesMemcachedExporterReadinessProbe;
};

export type LokiHelmValuesMemcachedExporterImage = {
  repository?: string;
  tag?: string;
  pullPolicy?: string;
};

export type LokiHelmValuesMemcachedExporterResources = {
  requests?: LokiHelmValuesMemcachedExporterResourcesRequests;
  limits?: LokiHelmValuesMemcachedExporterResourcesLimits;
};

export type LokiHelmValuesMemcachedExporterResourcesRequests = object;

export type LokiHelmValuesMemcachedExporterResourcesLimits = object;

export type LokiHelmValuesMemcachedExporterContainerSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  capabilities?: LokiHelmValuesMemcachedExporterContainerSecurityContextCapabilities;
  allowPrivilegeEscalation?: boolean;
};

export type LokiHelmValuesMemcachedExporterContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type LokiHelmValuesMemcachedExporterExtraArgs = object;

export type LokiHelmValuesMemcachedExporterLivenessProbe = {
  httpGet?: LokiHelmValuesMemcachedExporterLivenessProbeHttpGet;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  failureThreshold?: number;
};

export type LokiHelmValuesMemcachedExporterLivenessProbeHttpGet = {
  path?: string;
  port?: string;
};

export type LokiHelmValuesMemcachedExporterReadinessProbe = {
  httpGet?: LokiHelmValuesMemcachedExporterReadinessProbeHttpGet;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  timeoutSeconds?: number;
  failureThreshold?: number;
};

export type LokiHelmValuesMemcachedExporterReadinessProbeHttpGet = {
  path?: string;
  port?: string;
};

export type LokiHelmValuesResultsCache = {
  enabled?: boolean;
  addresses?: string;
  defaultValidity?: string;
  timeout?: string;
  replicas?: number;
  port?: number;
  allocatedMemory?: number;
  maxItemMemory?: number;
  connectionLimit?: number;
  writebackSizeLimit?: string;
  writebackBuffer?: number;
  writebackParallelism?: number;
  initContainers?: unknown[];
  annotations?: LokiHelmValuesResultsCacheAnnotations;
  nodeSelector?: LokiHelmValuesResultsCacheNodeSelector;
  affinity?: LokiHelmValuesResultsCacheAffinity;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  maxUnavailable?: number;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesResultsCachePodLabels;
  podAnnotations?: LokiHelmValuesResultsCachePodAnnotations;
  podManagementPolicy?: string;
  terminationGracePeriodSeconds?: number;
  statefulStrategy?: LokiHelmValuesResultsCacheStatefulStrategy;
  extraExtendedOptions?: string;
  extraArgs?: LokiHelmValuesResultsCacheExtraArgs;
  extraContainers?: unknown[];
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  resources?: unknown;
  service?: LokiHelmValuesResultsCacheService;
  persistence?: LokiHelmValuesResultsCachePersistence;
};

export type LokiHelmValuesResultsCacheAnnotations = object;

export type LokiHelmValuesResultsCacheNodeSelector = object;

export type LokiHelmValuesResultsCacheAffinity = object;

export type LokiHelmValuesResultsCachePodLabels = object;

export type LokiHelmValuesResultsCachePodAnnotations = object;

export type LokiHelmValuesResultsCacheStatefulStrategy = {
  type?: string;
};

export type LokiHelmValuesResultsCacheExtraArgs = object;

export type LokiHelmValuesResultsCacheService = {
  annotations?: LokiHelmValuesResultsCacheServiceAnnotations;
  labels?: LokiHelmValuesResultsCacheServiceLabels;
};

export type LokiHelmValuesResultsCacheServiceAnnotations = object;

export type LokiHelmValuesResultsCacheServiceLabels = object;

export type LokiHelmValuesResultsCachePersistence = {
  enabled?: boolean;
  storageSize?: string;
  storageClass?: unknown;
  mountPath?: string;
  labels?: LokiHelmValuesResultsCachePersistenceLabels;
};

export type LokiHelmValuesResultsCachePersistenceLabels = object;

export type LokiHelmValuesChunksCache = {
  suffix?: string;
  enabled?: boolean;
  addresses?: string;
  batchSize?: number;
  parallelism?: number;
  timeout?: string;
  defaultValidity?: string;
  replicas?: number;
  port?: number;
  allocatedMemory?: number;
  maxItemMemory?: number;
  connectionLimit?: number;
  writebackSizeLimit?: string;
  writebackBuffer?: number;
  writebackParallelism?: number;
  initContainers?: unknown[];
  annotations?: LokiHelmValuesChunksCacheAnnotations;
  nodeSelector?: LokiHelmValuesChunksCacheNodeSelector;
  affinity?: LokiHelmValuesChunksCacheAffinity;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  maxUnavailable?: number;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesChunksCachePodLabels;
  podAnnotations?: LokiHelmValuesChunksCachePodAnnotations;
  podManagementPolicy?: string;
  terminationGracePeriodSeconds?: number;
  statefulStrategy?: LokiHelmValuesChunksCacheStatefulStrategy;
  extraExtendedOptions?: string;
  extraArgs?: LokiHelmValuesChunksCacheExtraArgs;
  extraContainers?: unknown[];
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  resources?: unknown;
  service?: LokiHelmValuesChunksCacheService;
  persistence?: LokiHelmValuesChunksCachePersistence;
  l2?: LokiHelmValuesChunksCacheL2;
};

export type LokiHelmValuesChunksCacheAnnotations = object;

export type LokiHelmValuesChunksCacheNodeSelector = object;

export type LokiHelmValuesChunksCacheAffinity = object;

export type LokiHelmValuesChunksCachePodLabels = object;

export type LokiHelmValuesChunksCachePodAnnotations = object;

export type LokiHelmValuesChunksCacheStatefulStrategy = {
  type?: string;
};

export type LokiHelmValuesChunksCacheExtraArgs = object;

export type LokiHelmValuesChunksCacheService = {
  annotations?: LokiHelmValuesChunksCacheServiceAnnotations;
  labels?: LokiHelmValuesChunksCacheServiceLabels;
};

export type LokiHelmValuesChunksCacheServiceAnnotations = object;

export type LokiHelmValuesChunksCacheServiceLabels = object;

export type LokiHelmValuesChunksCachePersistence = {
  enabled?: boolean;
  storageSize?: string;
  storageClass?: unknown;
  mountPath?: string;
  labels?: LokiHelmValuesChunksCachePersistenceLabels;
};

export type LokiHelmValuesChunksCachePersistenceLabels = object;

export type LokiHelmValuesChunksCacheL2 = {
  suffix?: string;
  l2ChunkCacheHandoff?: string;
  enabled?: boolean;
  addresses?: string;
  batchSize?: number;
  parallelism?: number;
  timeout?: string;
  defaultValidity?: string;
  replicas?: number;
  port?: number;
  allocatedMemory?: number;
  maxItemMemory?: number;
  connectionLimit?: number;
  writebackSizeLimit?: string;
  writebackBuffer?: number;
  writebackParallelism?: number;
  initContainers?: unknown[];
  annotations?: LokiHelmValuesChunksCacheL2Annotations;
  nodeSelector?: LokiHelmValuesChunksCacheL2NodeSelector;
  affinity?: LokiHelmValuesChunksCacheL2Affinity;
  topologySpreadConstraints?: unknown[];
  tolerations?: unknown[];
  maxUnavailable?: number;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesChunksCacheL2PodLabels;
  podAnnotations?: LokiHelmValuesChunksCacheL2PodAnnotations;
  podManagementPolicy?: string;
  terminationGracePeriodSeconds?: number;
  statefulStrategy?: LokiHelmValuesChunksCacheL2StatefulStrategy;
  extraExtendedOptions?: string;
  extraArgs?: LokiHelmValuesChunksCacheL2ExtraArgs;
  extraContainers?: unknown[];
  extraVolumes?: unknown[];
  extraVolumeMounts?: unknown[];
  resources?: unknown;
  service?: LokiHelmValuesChunksCacheL2Service;
  persistence?: LokiHelmValuesChunksCacheL2Persistence;
};

export type LokiHelmValuesChunksCacheL2Annotations = object;

export type LokiHelmValuesChunksCacheL2NodeSelector = object;

export type LokiHelmValuesChunksCacheL2Affinity = object;

export type LokiHelmValuesChunksCacheL2PodLabels = object;

export type LokiHelmValuesChunksCacheL2PodAnnotations = object;

export type LokiHelmValuesChunksCacheL2StatefulStrategy = {
  type?: string;
};

export type LokiHelmValuesChunksCacheL2ExtraArgs = object;

export type LokiHelmValuesChunksCacheL2Service = {
  annotations?: LokiHelmValuesChunksCacheL2ServiceAnnotations;
  labels?: LokiHelmValuesChunksCacheL2ServiceLabels;
};

export type LokiHelmValuesChunksCacheL2ServiceAnnotations = object;

export type LokiHelmValuesChunksCacheL2ServiceLabels = object;

export type LokiHelmValuesChunksCacheL2Persistence = {
  enabled?: boolean;
  storageSize?: string;
  storageClass?: unknown;
  mountPath?: string;
  labels?: LokiHelmValuesChunksCacheL2PersistenceLabels;
};

export type LokiHelmValuesChunksCacheL2PersistenceLabels = object;

export type LokiHelmValuesRolloutoperator = {
  enabled?: boolean;
  podSecurityContext?: LokiHelmValuesRolloutoperatorPodSecurityContext;
  securityContext?: LokiHelmValuesRolloutoperatorSecurityContext;
};

export type LokiHelmValuesRolloutoperatorPodSecurityContext = {
  fsGroup?: number;
  runAsGroup?: number;
  runAsNonRoot?: boolean;
  runAsUser?: number;
  seccompProfile?: LokiHelmValuesRolloutoperatorPodSecurityContextSeccompProfile;
};

export type LokiHelmValuesRolloutoperatorPodSecurityContextSeccompProfile = {
  type?: string;
};

export type LokiHelmValuesRolloutoperatorSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  capabilities?: LokiHelmValuesRolloutoperatorSecurityContextCapabilities;
  allowPrivilegeEscalation?: boolean;
};

export type LokiHelmValuesRolloutoperatorSecurityContextCapabilities = {
  drop?: string[];
};

export type LokiHelmValuesMinio = {
  enabled?: boolean;
  replicas?: number;
  drivesPerNode?: number;
  rootUser?: string;
  rootPassword?: string;
  users?: LokiHelmValuesMinioUsersElement[];
  buckets?: LokiHelmValuesMinioBucketsElement[];
  persistence?: LokiHelmValuesMinioPersistence;
  resources?: LokiHelmValuesMinioResources;
  address?: unknown;
};

export type LokiHelmValuesMinioUsersElement = {
  accessKey?: string;
  secretKey?: string;
  policy?: string;
};

export type LokiHelmValuesMinioBucketsElement = {
  name?: string;
  policy?: string;
  purge?: boolean;
};

export type LokiHelmValuesMinioPersistence = {
  size?: string;
  annotations?: LokiHelmValuesMinioPersistenceAnnotations;
  // manually added
  storageClass?: string;
};

export type LokiHelmValuesMinioPersistenceAnnotations = object;

export type LokiHelmValuesMinioResources = {
  requests?: LokiHelmValuesMinioResourcesRequests;
};

export type LokiHelmValuesMinioResourcesRequests = {
  cpu?: string;
  memory?: string;
};

export type LokiHelmValuesSidecar = {
  image?: LokiHelmValuesSidecarImage;
  resources?: LokiHelmValuesSidecarResources;
  securityContext?: LokiHelmValuesSidecarSecurityContext;
  skipTlsVerify?: boolean;
  enableUniqueFilenames?: boolean;
  readinessProbe?: LokiHelmValuesSidecarReadinessProbe;
  livenessProbe?: LokiHelmValuesSidecarLivenessProbe;
  startupProbe?: LokiHelmValuesSidecarStartupProbe;
  rules?: LokiHelmValuesSidecarRules;
};

export type LokiHelmValuesSidecarImage = {
  repository?: string;
  tag?: string;
  sha?: string;
  pullPolicy?: string;
};

export type LokiHelmValuesSidecarResources = object;

export type LokiHelmValuesSidecarSecurityContext = {
  readOnlyRootFilesystem?: boolean;
  capabilities?: LokiHelmValuesSidecarSecurityContextCapabilities;
  allowPrivilegeEscalation?: boolean;
};

export type LokiHelmValuesSidecarSecurityContextCapabilities = {
  drop?: string[];
};

export type LokiHelmValuesSidecarReadinessProbe = object;

export type LokiHelmValuesSidecarLivenessProbe = object;

export type LokiHelmValuesSidecarStartupProbe = object;

export type LokiHelmValuesSidecarRules = {
  enabled?: boolean;
  label?: string;
  labelValue?: string;
  folder?: string;
  folderAnnotation?: unknown;
  searchNamespace?: unknown;
  watchMethod?: string;
  resource?: string;
  script?: unknown;
  watchServerTimeout?: number;
  watchClientTimeout?: number;
  logLevel?: string;
};

export type LokiHelmValuesMonitoring = {
  dashboards?: LokiHelmValuesMonitoringDashboards;
  rules?: LokiHelmValuesMonitoringRules;
  serviceMonitor?: LokiHelmValuesMonitoringServiceMonitor;
  selfMonitoring?: LokiHelmValuesMonitoringSelfMonitoring;
};

export type LokiHelmValuesMonitoringDashboards = {
  enabled?: boolean;
  namespace?: unknown;
  annotations?: LokiHelmValuesMonitoringDashboardsAnnotations;
  labels?: LokiHelmValuesMonitoringDashboardsLabels;
};

export type LokiHelmValuesMonitoringDashboardsAnnotations = object;

export type LokiHelmValuesMonitoringDashboardsLabels = {
  grafana_dashboard?: string;
};

export type LokiHelmValuesMonitoringRules = {
  enabled?: boolean;
  alerting?: boolean;
  disabled?: LokiHelmValuesMonitoringRulesDisabled;
  namespace?: unknown;
  annotations?: LokiHelmValuesMonitoringRulesAnnotations;
  labels?: LokiHelmValuesMonitoringRulesLabels;
  additionalRuleLabels?: LokiHelmValuesMonitoringRulesAdditionalRuleLabels;
  additionalGroups?: unknown[];
};

export type LokiHelmValuesMonitoringRulesDisabled = object;

export type LokiHelmValuesMonitoringRulesAnnotations = object;

export type LokiHelmValuesMonitoringRulesLabels = object;

export type LokiHelmValuesMonitoringRulesAdditionalRuleLabels = object;

export type LokiHelmValuesMonitoringServiceMonitor = {
  enabled?: boolean;
  namespaceSelector?: LokiHelmValuesMonitoringServiceMonitorNamespaceSelector;
  annotations?: LokiHelmValuesMonitoringServiceMonitorAnnotations;
  labels?: LokiHelmValuesMonitoringServiceMonitorLabels;
  interval?: string;
  scrapeTimeout?: unknown;
  relabelings?: unknown[];
  metricRelabelings?: unknown[];
  scheme?: string;
  tlsConfig?: unknown;
  metricsInstance?: LokiHelmValuesMonitoringServiceMonitorMetricsInstance;
};

export type LokiHelmValuesMonitoringServiceMonitorNamespaceSelector = object;

export type LokiHelmValuesMonitoringServiceMonitorAnnotations = object;

export type LokiHelmValuesMonitoringServiceMonitorLabels = object;

export type LokiHelmValuesMonitoringServiceMonitorMetricsInstance = {
  enabled?: boolean;
  annotations?: LokiHelmValuesMonitoringServiceMonitorMetricsInstanceAnnotations;
  labels?: LokiHelmValuesMonitoringServiceMonitorMetricsInstanceLabels;
  remoteWrite?: unknown;
};

export type LokiHelmValuesMonitoringServiceMonitorMetricsInstanceAnnotations = object;

export type LokiHelmValuesMonitoringServiceMonitorMetricsInstanceLabels = object;

export type LokiHelmValuesMonitoringSelfMonitoring = {
  enabled?: boolean;
  tenant?: LokiHelmValuesMonitoringSelfMonitoringTenant;
  grafanaAgent?: LokiHelmValuesMonitoringSelfMonitoringGrafanaAgent;
  podLogs?: LokiHelmValuesMonitoringSelfMonitoringPodLogs;
  logsInstance?: LokiHelmValuesMonitoringSelfMonitoringLogsInstance;
};

export type LokiHelmValuesMonitoringSelfMonitoringTenant = {
  name?: string;
  password?: unknown;
  secretNamespace?: string;
};

export type LokiHelmValuesMonitoringSelfMonitoringGrafanaAgent = {
  installOperator?: boolean;
  annotations?: LokiHelmValuesMonitoringSelfMonitoringGrafanaAgentAnnotations;
  labels?: LokiHelmValuesMonitoringSelfMonitoringGrafanaAgentLabels;
  enableConfigReadAPI?: boolean;
  priorityClassName?: unknown;
  resources?: LokiHelmValuesMonitoringSelfMonitoringGrafanaAgentResources;
  tolerations?: unknown[];
};

export type LokiHelmValuesMonitoringSelfMonitoringGrafanaAgentAnnotations = object;

export type LokiHelmValuesMonitoringSelfMonitoringGrafanaAgentLabels = object;

export type LokiHelmValuesMonitoringSelfMonitoringGrafanaAgentResources = object;

export type LokiHelmValuesMonitoringSelfMonitoringPodLogs = {
  apiVersion?: string;
  annotations?: LokiHelmValuesMonitoringSelfMonitoringPodLogsAnnotations;
  labels?: LokiHelmValuesMonitoringSelfMonitoringPodLogsLabels;
  relabelings?: unknown[];
  additionalPipelineStages?: unknown[];
};

export type LokiHelmValuesMonitoringSelfMonitoringPodLogsAnnotations = object;

export type LokiHelmValuesMonitoringSelfMonitoringPodLogsLabels = object;

export type LokiHelmValuesMonitoringSelfMonitoringLogsInstance = {
  annotations?: LokiHelmValuesMonitoringSelfMonitoringLogsInstanceAnnotations;
  labels?: LokiHelmValuesMonitoringSelfMonitoringLogsInstanceLabels;
  clients?: unknown;
};

export type LokiHelmValuesMonitoringSelfMonitoringLogsInstanceAnnotations = object;

export type LokiHelmValuesMonitoringSelfMonitoringLogsInstanceLabels = object;

export type LokiHelmValuesTableManager = {
  enabled?: boolean;
  image?: LokiHelmValuesTableManagerImage;
  command?: unknown;
  priorityClassName?: unknown;
  podLabels?: LokiHelmValuesTableManagerPodLabels;
  annotations?: LokiHelmValuesTableManagerAnnotations;
  podAnnotations?: LokiHelmValuesTableManagerPodAnnotations;
  service?: LokiHelmValuesTableManagerService;
  extraArgs?: unknown[];
  extraEnv?: unknown[];
  extraEnvFrom?: unknown[];
  extraVolumeMounts?: unknown[];
  extraVolumes?: unknown[];
  resources?: LokiHelmValuesTableManagerResources;
  extraContainers?: unknown[];
  terminationGracePeriodSeconds?: number;
  affinity?: LokiHelmValuesTableManagerAffinity;
  dnsConfig?: LokiHelmValuesTableManagerDnsConfig;
  nodeSelector?: LokiHelmValuesTableManagerNodeSelector;
  tolerations?: unknown[];
  retention_deletes_enabled?: boolean;
  retention_period?: number;
};

export type LokiHelmValuesTableManagerImage = {
  registry?: unknown;
  repository?: unknown;
  tag?: unknown;
};

export type LokiHelmValuesTableManagerPodLabels = object;

export type LokiHelmValuesTableManagerAnnotations = object;

export type LokiHelmValuesTableManagerPodAnnotations = object;

export type LokiHelmValuesTableManagerService = {
  annotations?: LokiHelmValuesTableManagerServiceAnnotations;
  labels?: LokiHelmValuesTableManagerServiceLabels;
};

export type LokiHelmValuesTableManagerServiceAnnotations = object;

export type LokiHelmValuesTableManagerServiceLabels = object;

export type LokiHelmValuesTableManagerResources = object;

export type LokiHelmValuesTableManagerAffinity = {
  podAntiAffinity?: LokiHelmValuesTableManagerAffinityPodAntiAffinity;
};

export type LokiHelmValuesTableManagerAffinityPodAntiAffinity = {
  requiredDuringSchedulingIgnoredDuringExecution?: LokiHelmValuesTableManagerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type LokiHelmValuesTableManagerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionElement = {
  labelSelector?: LokiHelmValuesTableManagerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector;
  topologyKey?: string;
};

export type LokiHelmValuesTableManagerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelector =
  {
    matchLabels?: LokiHelmValuesTableManagerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels;
  };

export type LokiHelmValuesTableManagerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionLabelSelectorMatchLabels =
  {
    "app.kubernetes.io/component"?: string;
  };

export type LokiHelmValuesTableManagerDnsConfig = object;

export type LokiHelmValuesTableManagerNodeSelector = object;

export type LokiHelmValues = {
  kubeVersionOverride?: unknown;
  global?: LokiHelmValuesGlobal;
  nameOverride?: unknown;
  fullnameOverride?: unknown;
  clusterLabelOverride?: unknown;
  imagePullSecrets?: unknown[];
  deploymentMode?: string;
  loki?: LokiHelmValuesLoki;
  enterprise?: LokiHelmValuesEnterprise;
  test?: LokiHelmValuesTest;
  lokiCanary?: LokiHelmValuesLokiCanary;
  serviceAccount?: LokiHelmValuesServiceAccount;
  rbac?: LokiHelmValuesRbac;
  networkPolicy?: LokiHelmValuesNetworkPolicy;
  memberlist?: LokiHelmValuesMemberlist;
  adminApi?: LokiHelmValuesAdminApi;
  gateway?: LokiHelmValuesGateway;
  enterpriseGateway?: LokiHelmValuesEnterpriseGateway;
  ingress?: LokiHelmValuesIngress;
  migrate?: LokiHelmValuesMigrate;
  singleBinary?: LokiHelmValuesSingleBinary;
  write?: LokiHelmValuesWrite;
  read?: LokiHelmValuesRead;
  backend?: LokiHelmValuesBackend;
  ingester?: LokiHelmValuesIngester;
  distributor?: LokiHelmValuesDistributor;
  querier?: LokiHelmValuesQuerier;
  queryFrontend?: LokiHelmValuesQueryFrontend;
  queryScheduler?: LokiHelmValuesQueryScheduler;
  indexGateway?: LokiHelmValuesIndexGateway;
  compactor?: LokiHelmValuesCompactor;
  bloomGateway?: LokiHelmValuesBloomGateway;
  bloomPlanner?: LokiHelmValuesBloomPlanner;
  bloomBuilder?: LokiHelmValuesBloomBuilder;
  patternIngester?: LokiHelmValuesPatternIngester;
  ruler?: LokiHelmValuesRuler;
  overridesExporter?: LokiHelmValuesOverridesExporter;
  memcached?: LokiHelmValuesMemcached;
  memcachedExporter?: LokiHelmValuesMemcachedExporter;
  resultsCache?: LokiHelmValuesResultsCache;
  chunksCache?: LokiHelmValuesChunksCache;
  rollout_operator?: LokiHelmValuesRolloutoperator;
  minio?: LokiHelmValuesMinio;
  extraObjects?: unknown[];
  sidecar?: LokiHelmValuesSidecar;
  monitoring?: LokiHelmValuesMonitoring;
  tableManager?: LokiHelmValuesTableManager;
};

export type LokiHelmParameters = {
  kubeVersionOverride?: string;
  "global.image.registry"?: string;
  "global.priorityClassName"?: string;
  "global.clusterDomain"?: string;
  "global.dnsService"?: string;
  "global.dnsNamespace"?: string;
  "global.extraArgs"?: string;
  "global.extraEnv"?: string;
  "global.extraEnvFrom"?: string;
  "global.extraVolumes"?: string;
  "global.extraVolumeMounts"?: string;
  nameOverride?: string;
  fullnameOverride?: string;
  clusterLabelOverride?: string;
  imagePullSecrets?: string;
  deploymentMode?: string;
  "loki.readinessProbe.httpGet.path"?: string;
  "loki.readinessProbe.httpGet.port"?: string;
  "loki.readinessProbe.initialDelaySeconds"?: string;
  "loki.readinessProbe.timeoutSeconds"?: string;
  "loki.image.registry"?: string;
  "loki.image.repository"?: string;
  "loki.image.tag"?: string;
  "loki.image.digest"?: string;
  "loki.image.pullPolicy"?: string;
  "loki.revisionHistoryLimit"?: string;
  "loki.podSecurityContext.fsGroup"?: string;
  "loki.podSecurityContext.runAsGroup"?: string;
  "loki.podSecurityContext.runAsNonRoot"?: string;
  "loki.podSecurityContext.runAsUser"?: string;
  "loki.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "loki.containerSecurityContext.capabilities.drop"?: string;
  "loki.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "loki.enableServiceLinks"?: string;
  "loki.configStorageType"?: string;
  "loki.configObjectName"?: string;
  "loki.generatedConfigObjectName"?: string;
  "loki.config"?: string;
  "loki.auth_enabled"?: string;
  "loki.tenants"?: string;
  "loki.server.http_listen_port"?: string;
  "loki.server.grpc_listen_port"?: string;
  "loki.server.http_server_read_timeout"?: string;
  "loki.server.http_server_write_timeout"?: string;
  "loki.limits_config.reject_old_samples"?: string;
  "loki.limits_config.reject_old_samples_max_age"?: string;
  "loki.limits_config.max_cache_freshness_per_query"?: string;
  "loki.limits_config.split_queries_by_interval"?: string;
  "loki.limits_config.query_timeout"?: string;
  "loki.limits_config.volume_enabled"?: string;
  "loki.commonConfig.path_prefix"?: string;
  "loki.commonConfig.replication_factor"?: string;
  "loki.commonConfig.compactor_grpc_address"?: string;
  "loki.storage.type"?: string;
  "loki.storage.s3.s3"?: string;
  "loki.storage.s3.endpoint"?: string;
  "loki.storage.s3.region"?: string;
  "loki.storage.s3.secretAccessKey"?: string;
  "loki.storage.s3.accessKeyId"?: string;
  "loki.storage.s3.signatureVersion"?: string;
  "loki.storage.s3.s3ForcePathStyle"?: string;
  "loki.storage.s3.insecure"?: string;
  "loki.storage.s3.disable_dualstack"?: string;
  "loki.storage.gcs.chunkBufferSize"?: string;
  "loki.storage.gcs.requestTimeout"?: string;
  "loki.storage.gcs.enableHttp2"?: string;
  "loki.storage.azure.accountName"?: string;
  "loki.storage.azure.accountKey"?: string;
  "loki.storage.azure.connectionString"?: string;
  "loki.storage.azure.useManagedIdentity"?: string;
  "loki.storage.azure.useFederatedToken"?: string;
  "loki.storage.azure.userAssignedId"?: string;
  "loki.storage.azure.requestTimeout"?: string;
  "loki.storage.azure.endpointSuffix"?: string;
  "loki.storage.azure.chunkDelimiter"?: string;
  "loki.storage.swift.auth_version"?: string;
  "loki.storage.swift.auth_url"?: string;
  "loki.storage.swift.internal"?: string;
  "loki.storage.swift.username"?: string;
  "loki.storage.swift.user_domain_name"?: string;
  "loki.storage.swift.user_domain_id"?: string;
  "loki.storage.swift.user_id"?: string;
  "loki.storage.swift.password"?: string;
  "loki.storage.swift.domain_id"?: string;
  "loki.storage.swift.domain_name"?: string;
  "loki.storage.swift.project_id"?: string;
  "loki.storage.swift.project_name"?: string;
  "loki.storage.swift.project_domain_id"?: string;
  "loki.storage.swift.project_domain_name"?: string;
  "loki.storage.swift.region_name"?: string;
  "loki.storage.swift.container_name"?: string;
  "loki.storage.swift.max_retries"?: string;
  "loki.storage.swift.connect_timeout"?: string;
  "loki.storage.swift.request_timeout"?: string;
  "loki.storage.filesystem.chunks_directory"?: string;
  "loki.storage.filesystem.rules_directory"?: string;
  "loki.storage.use_thanos_objstore"?: string;
  "loki.storage.object_store.type"?: string;
  "loki.storage.object_store.storage_prefix"?: string;
  "loki.storage.object_store.s3.endpoint"?: string;
  "loki.storage.object_store.s3.region"?: string;
  "loki.storage.object_store.s3.access_key_id"?: string;
  "loki.storage.object_store.s3.secret_access_key"?: string;
  "loki.storage.object_store.s3.insecure"?: string;
  "loki.storage.object_store.gcs.bucket_name"?: string;
  "loki.storage.object_store.gcs.service_account"?: string;
  "loki.storage.object_store.azure.account_name"?: string;
  "loki.storage.object_store.azure.account_key"?: string;
  "loki.useTestSchema"?: string;
  "loki.testSchemaConfig.configs.from"?: string;
  "loki.testSchemaConfig.configs.store"?: string;
  "loki.testSchemaConfig.configs.object_store"?: string;
  "loki.testSchemaConfig.configs.schema"?: string;
  "loki.testSchemaConfig.configs.index.prefix"?: string;
  "loki.testSchemaConfig.configs.index.period"?: string;
  "loki.rulerConfig.wal.dir"?: string;
  "loki.storage_config.boltdb_shipper.index_gateway_client.server_address"?: string;
  "loki.storage_config.tsdb_shipper.index_gateway_client.server_address"?: string;
  "loki.storage_config.bloom_shipper.working_directory"?: string;
  "loki.storage_config.hedging.at"?: string;
  "loki.storage_config.hedging.max_per_second"?: string;
  "loki.storage_config.hedging.up_to"?: string;
  "loki.pattern_ingester.enabled"?: string;
  "loki.ui.enabled"?: string;
  "loki.ui.gateway.enabled"?: string;
  "loki.index_gateway.mode"?: string;
  "loki.frontend.scheduler_address"?: string;
  "loki.frontend.tail_proxy_url"?: string;
  "loki.frontend_worker.scheduler_address"?: string;
  "loki.tracing.enabled"?: string;
  "loki.bloom_build.enabled"?: string;
  "loki.bloom_build.builder.planner_address"?: string;
  "loki.bloom_gateway.enabled"?: string;
  "loki.bloom_gateway.client.addresses"?: string;
  "enterprise.enabled"?: string;
  "enterprise.version"?: string;
  "enterprise.cluster_name"?: string;
  "enterprise.license.contents"?: string;
  "enterprise.useExternalLicense"?: string;
  "enterprise.externalLicenseName"?: string;
  "enterprise.externalConfigName"?: string;
  "enterprise.gelGateway"?: string;
  "enterprise.adminApi.enabled"?: string;
  "enterprise.config"?: string;
  "enterprise.image.registry"?: string;
  "enterprise.image.repository"?: string;
  "enterprise.image.tag"?: string;
  "enterprise.image.digest"?: string;
  "enterprise.image.pullPolicy"?: string;
  "enterprise.adminToken.secret"?: string;
  "enterprise.canarySecret"?: string;
  "enterprise.provisioner.enabled"?: string;
  "enterprise.provisioner.provisionedSecretPrefix"?: string;
  "enterprise.provisioner.hookType"?: string;
  "enterprise.provisioner.apiUrl"?: string;
  "enterprise.provisioner.additionalTenants"?: string;
  "enterprise.provisioner.env"?: string;
  "enterprise.provisioner.tolerations"?: string;
  "enterprise.provisioner.priorityClassName"?: string;
  "enterprise.provisioner.securityContext.runAsNonRoot"?: string;
  "enterprise.provisioner.securityContext.runAsGroup"?: string;
  "enterprise.provisioner.securityContext.runAsUser"?: string;
  "enterprise.provisioner.securityContext.fsGroup"?: string;
  "enterprise.provisioner.image.registry"?: string;
  "enterprise.provisioner.image.repository"?: string;
  "enterprise.provisioner.image.tag"?: string;
  "enterprise.provisioner.image.digest"?: string;
  "enterprise.provisioner.image.pullPolicy"?: string;
  "enterprise.provisioner.extraVolumeMounts"?: string;
  "enterprise.provisioner.extraVolumes"?: string;
  "test.enabled"?: string;
  "test.canaryServiceAddress"?: string;
  "test.prometheusAddress"?: string;
  "test.timeout"?: string;
  "test.image.registry"?: string;
  "test.image.repository"?: string;
  "test.image.tag"?: string;
  "test.image.digest"?: string;
  "test.image.pullPolicy"?: string;
  "lokiCanary.enabled"?: string;
  "lokiCanary.kind"?: string;
  "lokiCanary.push"?: string;
  "lokiCanary.lokiurl"?: string;
  "lokiCanary.labelname"?: string;
  "lokiCanary.extraArgs"?: string;
  "lokiCanary.extraEnv"?: string;
  "lokiCanary.extraEnvFrom"?: string;
  "lokiCanary.extraVolumeMounts"?: string;
  "lokiCanary.extraVolumes"?: string;
  "lokiCanary.tolerations"?: string;
  "lokiCanary.priorityClassName"?: string;
  "lokiCanary.image.registry"?: string;
  "lokiCanary.image.repository"?: string;
  "lokiCanary.image.tag"?: string;
  "lokiCanary.image.digest"?: string;
  "lokiCanary.image.pullPolicy"?: string;
  "lokiCanary.updateStrategy.type"?: string;
  "lokiCanary.updateStrategy.rollingUpdate.maxUnavailable"?: string;
  "serviceAccount.create"?: string;
  "serviceAccount.name"?: string;
  "serviceAccount.imagePullSecrets"?: string;
  "serviceAccount.automountServiceAccountToken"?: string;
  "rbac.pspEnabled"?: string;
  "rbac.sccEnabled"?: string;
  "rbac.sccAllowHostDirVolumePlugin"?: string;
  "rbac.namespaced"?: string;
  "networkPolicy.enabled"?: string;
  "networkPolicy.flavor"?: string;
  "networkPolicy.metrics.cidrs"?: string;
  "networkPolicy.alertmanager.port"?: string;
  "networkPolicy.externalStorage.ports"?: string;
  "networkPolicy.externalStorage.cidrs"?: string;
  "networkPolicy.discovery.port"?: string;
  "networkPolicy.egressWorld.enabled"?: string;
  "networkPolicy.egressKubeApiserver.enabled"?: string;
  "memberlist.service.publishNotReadyAddresses"?: string;
  "adminApi.replicas"?: string;
  "adminApi.hostAliases"?: string;
  "adminApi.extraEnv"?: string;
  "adminApi.extraEnvFrom"?: string;
  "adminApi.podSecurityContext.runAsNonRoot"?: string;
  "adminApi.podSecurityContext.runAsGroup"?: string;
  "adminApi.podSecurityContext.runAsUser"?: string;
  "adminApi.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "adminApi.containerSecurityContext.capabilities.drop"?: string;
  "adminApi.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "adminApi.strategy.type"?: string;
  "adminApi.readinessProbe.httpGet.path"?: string;
  "adminApi.readinessProbe.httpGet.port"?: string;
  "adminApi.readinessProbe.initialDelaySeconds"?: string;
  "adminApi.env"?: string;
  "adminApi.initContainers"?: string;
  "adminApi.extraContainers"?: string;
  "adminApi.extraVolumes"?: string;
  "adminApi.extraVolumeMounts"?: string;
  "adminApi.topologySpreadConstraints"?: string;
  "adminApi.tolerations"?: string;
  "adminApi.terminationGracePeriodSeconds"?: string;
  "gateway.enabled"?: string;
  "gateway.replicas"?: string;
  "gateway.containerPort"?: string;
  "gateway.verboseLogging"?: string;
  "gateway.autoscaling.enabled"?: string;
  "gateway.autoscaling.minReplicas"?: string;
  "gateway.autoscaling.maxReplicas"?: string;
  "gateway.autoscaling.targetCPUUtilizationPercentage"?: string;
  "gateway.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "gateway.deploymentStrategy.type"?: string;
  "gateway.image.registry"?: string;
  "gateway.image.repository"?: string;
  "gateway.image.tag"?: string;
  "gateway.image.digest"?: string;
  "gateway.image.pullPolicy"?: string;
  "gateway.priorityClassName"?: string;
  "gateway.extraArgs"?: string;
  "gateway.extraEnv"?: string;
  "gateway.extraEnvFrom"?: string;
  "gateway.extraVolumes"?: string;
  "gateway.extraVolumeMounts"?: string;
  "gateway.podSecurityContext.fsGroup"?: string;
  "gateway.podSecurityContext.runAsGroup"?: string;
  "gateway.podSecurityContext.runAsNonRoot"?: string;
  "gateway.podSecurityContext.runAsUser"?: string;
  "gateway.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "gateway.containerSecurityContext.capabilities.drop"?: string;
  "gateway.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "gateway.extraContainers"?: string;
  "gateway.terminationGracePeriodSeconds"?: string;
  "gateway.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "gateway.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "gateway.topologySpreadConstraints"?: string;
  "gateway.tolerations"?: string;
  "gateway.service.port"?: string;
  "gateway.service.type"?: string;
  "gateway.service.clusterIP"?: string;
  "gateway.service.nodePort"?: string;
  "gateway.service.loadBalancerIP"?: string;
  "gateway.ingress.enabled"?: string;
  "gateway.ingress.ingressClassName"?: string;
  "gateway.ingress.hosts.host"?: string;
  "gateway.ingress.hosts.paths.path"?: string;
  "gateway.ingress.tls.secretName"?: string;
  "gateway.ingress.tls.hosts"?: string;
  "gateway.basicAuth.enabled"?: string;
  "gateway.basicAuth.username"?: string;
  "gateway.basicAuth.password"?: string;
  "gateway.basicAuth.htpasswd"?: string;
  "gateway.basicAuth.existingSecret"?: string;
  "gateway.readinessProbe.httpGet.path"?: string;
  "gateway.readinessProbe.httpGet.port"?: string;
  "gateway.readinessProbe.initialDelaySeconds"?: string;
  "gateway.readinessProbe.timeoutSeconds"?: string;
  "gateway.nginxConfig.schema"?: string;
  "gateway.nginxConfig.enableIPv6"?: string;
  "gateway.nginxConfig.logFormat"?: string;
  "gateway.nginxConfig.serverSnippet"?: string;
  "gateway.nginxConfig.httpSnippet"?: string;
  "gateway.nginxConfig.locationSnippet"?: string;
  "gateway.nginxConfig.clientMaxBodySize"?: string;
  "gateway.nginxConfig.ssl"?: string;
  "gateway.nginxConfig.customReadUrl"?: string;
  "gateway.nginxConfig.customWriteUrl"?: string;
  "gateway.nginxConfig.customBackendUrl"?: string;
  "gateway.nginxConfig.resolver"?: string;
  "gateway.nginxConfig.file"?: string;
  "enterpriseGateway.replicas"?: string;
  "enterpriseGateway.hostAliases"?: string;
  "enterpriseGateway.extraEnvFrom"?: string;
  "enterpriseGateway.service.type"?: string;
  "enterpriseGateway.podSecurityContext.runAsNonRoot"?: string;
  "enterpriseGateway.podSecurityContext.runAsGroup"?: string;
  "enterpriseGateway.podSecurityContext.runAsUser"?: string;
  "enterpriseGateway.podSecurityContext.fsGroup"?: string;
  "enterpriseGateway.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "enterpriseGateway.containerSecurityContext.capabilities.drop"?: string;
  "enterpriseGateway.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "enterpriseGateway.useDefaultProxyURLs"?: string;
  "enterpriseGateway.strategy.type"?: string;
  "enterpriseGateway.readinessProbe.httpGet.path"?: string;
  "enterpriseGateway.readinessProbe.httpGet.port"?: string;
  "enterpriseGateway.readinessProbe.initialDelaySeconds"?: string;
  "enterpriseGateway.env"?: string;
  "enterpriseGateway.initContainers"?: string;
  "enterpriseGateway.extraContainers"?: string;
  "enterpriseGateway.extraVolumes"?: string;
  "enterpriseGateway.extraVolumeMounts"?: string;
  "enterpriseGateway.topologySpreadConstraints"?: string;
  "enterpriseGateway.tolerations"?: string;
  "enterpriseGateway.terminationGracePeriodSeconds"?: string;
  "ingress.enabled"?: string;
  "ingress.ingressClassName"?: string;
  "ingress.paths.distributor"?: string;
  "ingress.paths.queryFrontend"?: string;
  "ingress.paths.ruler"?: string;
  "ingress.paths.compactor"?: string;
  "ingress.hosts"?: string;
  "ingress.tls"?: string;
  "migrate.fromDistributed.enabled"?: string;
  "migrate.fromDistributed.memberlistService"?: string;
  "singleBinary.replicas"?: string;
  "singleBinary.autoscaling.enabled"?: string;
  "singleBinary.autoscaling.minReplicas"?: string;
  "singleBinary.autoscaling.maxReplicas"?: string;
  "singleBinary.autoscaling.targetCPUUtilizationPercentage"?: string;
  "singleBinary.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "singleBinary.image.registry"?: string;
  "singleBinary.image.repository"?: string;
  "singleBinary.image.tag"?: string;
  "singleBinary.priorityClassName"?: string;
  "singleBinary.targetModule"?: string;
  "singleBinary.extraArgs"?: string;
  "singleBinary.extraEnv"?: string;
  "singleBinary.extraEnvFrom"?: string;
  "singleBinary.extraContainers"?: string;
  "singleBinary.initContainers"?: string;
  "singleBinary.extraVolumeMounts"?: string;
  "singleBinary.extraVolumes"?: string;
  "singleBinary.terminationGracePeriodSeconds"?: string;
  "singleBinary.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "singleBinary.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "singleBinary.tolerations"?: string;
  "singleBinary.persistence.enableStatefulSetAutoDeletePVC"?: string;
  "singleBinary.persistence.enabled"?: string;
  "singleBinary.persistence.size"?: string;
  "singleBinary.persistence.storageClass"?: string;
  "singleBinary.persistence.selector"?: string;
  "write.replicas"?: string;
  "write.autoscaling.enabled"?: string;
  "write.autoscaling.minReplicas"?: string;
  "write.autoscaling.maxReplicas"?: string;
  "write.autoscaling.targetCPUUtilizationPercentage"?: string;
  "write.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "write.autoscaling.behavior.scaleUp.policies.type"?: string;
  "write.autoscaling.behavior.scaleUp.policies.value"?: string;
  "write.autoscaling.behavior.scaleUp.policies.periodSeconds"?: string;
  "write.autoscaling.behavior.scaleDown.policies.type"?: string;
  "write.autoscaling.behavior.scaleDown.policies.value"?: string;
  "write.autoscaling.behavior.scaleDown.policies.periodSeconds"?: string;
  "write.autoscaling.behavior.scaleDown.stabilizationWindowSeconds"?: string;
  "write.image.registry"?: string;
  "write.image.repository"?: string;
  "write.image.tag"?: string;
  "write.priorityClassName"?: string;
  "write.targetModule"?: string;
  "write.extraArgs"?: string;
  "write.extraEnv"?: string;
  "write.extraEnvFrom"?: string;
  "write.initContainers"?: string;
  "write.extraContainers"?: string;
  "write.extraVolumeMounts"?: string;
  "write.extraVolumes"?: string;
  "write.extraVolumeClaimTemplates"?: string;
  "write.terminationGracePeriodSeconds"?: string;
  "write.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "write.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "write.topologySpreadConstraints"?: string;
  "write.tolerations"?: string;
  "write.podManagementPolicy"?: string;
  "write.persistence.volumeClaimsEnabled"?: string;
  "write.persistence.enableStatefulSetAutoDeletePVC"?: string;
  "write.persistence.size"?: string;
  "write.persistence.storageClass"?: string;
  "write.persistence.selector"?: string;
  "read.replicas"?: string;
  "read.autoscaling.enabled"?: string;
  "read.autoscaling.minReplicas"?: string;
  "read.autoscaling.maxReplicas"?: string;
  "read.autoscaling.targetCPUUtilizationPercentage"?: string;
  "read.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "read.image.registry"?: string;
  "read.image.repository"?: string;
  "read.image.tag"?: string;
  "read.priorityClassName"?: string;
  "read.targetModule"?: string;
  "read.legacyReadTarget"?: string;
  "read.extraArgs"?: string;
  "read.extraContainers"?: string;
  "read.extraEnv"?: string;
  "read.extraEnvFrom"?: string;
  "read.extraVolumeMounts"?: string;
  "read.extraVolumes"?: string;
  "read.terminationGracePeriodSeconds"?: string;
  "read.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "read.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "read.topologySpreadConstraints"?: string;
  "read.tolerations"?: string;
  "read.podManagementPolicy"?: string;
  "read.persistence.enableStatefulSetAutoDeletePVC"?: string;
  "read.persistence.size"?: string;
  "read.persistence.storageClass"?: string;
  "read.persistence.selector"?: string;
  "backend.replicas"?: string;
  "backend.autoscaling.enabled"?: string;
  "backend.autoscaling.minReplicas"?: string;
  "backend.autoscaling.maxReplicas"?: string;
  "backend.autoscaling.targetCPUUtilizationPercentage"?: string;
  "backend.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "backend.image.registry"?: string;
  "backend.image.repository"?: string;
  "backend.image.tag"?: string;
  "backend.priorityClassName"?: string;
  "backend.targetModule"?: string;
  "backend.extraArgs"?: string;
  "backend.extraEnv"?: string;
  "backend.extraEnvFrom"?: string;
  "backend.initContainers"?: string;
  "backend.extraContainers"?: string;
  "backend.extraVolumeMounts"?: string;
  "backend.extraVolumes"?: string;
  "backend.terminationGracePeriodSeconds"?: string;
  "backend.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "backend.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "backend.topologySpreadConstraints"?: string;
  "backend.tolerations"?: string;
  "backend.podManagementPolicy"?: string;
  "backend.persistence.volumeClaimsEnabled"?: string;
  "backend.persistence.enableStatefulSetAutoDeletePVC"?: string;
  "backend.persistence.size"?: string;
  "backend.persistence.storageClass"?: string;
  "backend.persistence.selector"?: string;
  "ingester.replicas"?: string;
  "ingester.hostAliases"?: string;
  "ingester.autoscaling.enabled"?: string;
  "ingester.autoscaling.minReplicas"?: string;
  "ingester.autoscaling.maxReplicas"?: string;
  "ingester.autoscaling.targetCPUUtilizationPercentage"?: string;
  "ingester.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "ingester.autoscaling.customMetrics"?: string;
  "ingester.autoscaling.behavior.enabled"?: string;
  "ingester.image.registry"?: string;
  "ingester.image.repository"?: string;
  "ingester.image.tag"?: string;
  "ingester.command"?: string;
  "ingester.priorityClassName"?: string;
  "ingester.extraArgs"?: string;
  "ingester.extraEnv"?: string;
  "ingester.extraEnvFrom"?: string;
  "ingester.extraVolumeMounts"?: string;
  "ingester.extraVolumes"?: string;
  "ingester.extraContainers"?: string;
  "ingester.initContainers"?: string;
  "ingester.terminationGracePeriodSeconds"?: string;
  "ingester.topologySpreadConstraints.maxSkew"?: string;
  "ingester.topologySpreadConstraints.topologyKey"?: string;
  "ingester.topologySpreadConstraints.whenUnsatisfiable"?: string;
  "ingester.topologySpreadConstraints.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "ingester.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "ingester.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "ingester.maxUnavailable"?: string;
  "ingester.tolerations"?: string;
  "ingester.updateStrategy.type"?: string;
  "ingester.persistence.enabled"?: string;
  "ingester.persistence.inMemory"?: string;
  "ingester.persistence.claims.name"?: string;
  "ingester.persistence.claims.size"?: string;
  "ingester.persistence.claims.storageClass"?: string;
  "ingester.persistence.enableStatefulSetAutoDeletePVC"?: string;
  "ingester.persistence.whenDeleted"?: string;
  "ingester.persistence.whenScaled"?: string;
  "ingester.appProtocol.grpc"?: string;
  "ingester.zoneAwareReplication.enabled"?: string;
  "ingester.zoneAwareReplication.maxUnavailablePct"?: string;
  "ingester.zoneAwareReplication.zoneA.nodeSelector"?: string;
  "ingester.zoneAwareReplication.zoneB.nodeSelector"?: string;
  "ingester.zoneAwareReplication.zoneC.nodeSelector"?: string;
  "ingester.zoneAwareReplication.migration.enabled"?: string;
  "ingester.zoneAwareReplication.migration.excludeDefaultZone"?: string;
  "ingester.zoneAwareReplication.migration.readPath"?: string;
  "ingester.zoneAwareReplication.migration.writePath"?: string;
  "ingester.rolloutGroupPrefix"?: string;
  "ingester.addIngesterNamePrefix"?: string;
  "distributor.replicas"?: string;
  "distributor.hostAliases"?: string;
  "distributor.autoscaling.enabled"?: string;
  "distributor.autoscaling.minReplicas"?: string;
  "distributor.autoscaling.maxReplicas"?: string;
  "distributor.autoscaling.targetCPUUtilizationPercentage"?: string;
  "distributor.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "distributor.autoscaling.customMetrics"?: string;
  "distributor.autoscaling.behavior.enabled"?: string;
  "distributor.image.registry"?: string;
  "distributor.image.repository"?: string;
  "distributor.image.tag"?: string;
  "distributor.command"?: string;
  "distributor.priorityClassName"?: string;
  "distributor.extraArgs"?: string;
  "distributor.extraEnv"?: string;
  "distributor.extraEnvFrom"?: string;
  "distributor.extraVolumeMounts"?: string;
  "distributor.extraVolumes"?: string;
  "distributor.extraContainers"?: string;
  "distributor.terminationGracePeriodSeconds"?: string;
  "distributor.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "distributor.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "distributor.maxUnavailable"?: string;
  "distributor.maxSurge"?: string;
  "distributor.topologySpreadConstraints"?: string;
  "distributor.tolerations"?: string;
  "distributor.appProtocol.grpc"?: string;
  "distributor.trafficDistribution"?: string;
  "querier.replicas"?: string;
  "querier.hostAliases"?: string;
  "querier.autoscaling.enabled"?: string;
  "querier.autoscaling.minReplicas"?: string;
  "querier.autoscaling.maxReplicas"?: string;
  "querier.autoscaling.targetCPUUtilizationPercentage"?: string;
  "querier.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "querier.autoscaling.customMetrics"?: string;
  "querier.autoscaling.behavior.enabled"?: string;
  "querier.image.registry"?: string;
  "querier.image.repository"?: string;
  "querier.image.tag"?: string;
  "querier.command"?: string;
  "querier.priorityClassName"?: string;
  "querier.extraArgs"?: string;
  "querier.extraEnv"?: string;
  "querier.extraEnvFrom"?: string;
  "querier.extraVolumeMounts"?: string;
  "querier.extraVolumes"?: string;
  "querier.extraContainers"?: string;
  "querier.initContainers"?: string;
  "querier.terminationGracePeriodSeconds"?: string;
  "querier.topologySpreadConstraints.maxSkew"?: string;
  "querier.topologySpreadConstraints.topologyKey"?: string;
  "querier.topologySpreadConstraints.whenUnsatisfiable"?: string;
  "querier.topologySpreadConstraints.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "querier.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "querier.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "querier.maxUnavailable"?: string;
  "querier.maxSurge"?: string;
  "querier.tolerations"?: string;
  "querier.appProtocol.grpc"?: string;
  "queryFrontend.replicas"?: string;
  "queryFrontend.hostAliases"?: string;
  "queryFrontend.autoscaling.enabled"?: string;
  "queryFrontend.autoscaling.minReplicas"?: string;
  "queryFrontend.autoscaling.maxReplicas"?: string;
  "queryFrontend.autoscaling.targetCPUUtilizationPercentage"?: string;
  "queryFrontend.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "queryFrontend.autoscaling.customMetrics"?: string;
  "queryFrontend.autoscaling.behavior.enabled"?: string;
  "queryFrontend.image.registry"?: string;
  "queryFrontend.image.repository"?: string;
  "queryFrontend.image.tag"?: string;
  "queryFrontend.command"?: string;
  "queryFrontend.priorityClassName"?: string;
  "queryFrontend.extraArgs"?: string;
  "queryFrontend.extraEnv"?: string;
  "queryFrontend.extraEnvFrom"?: string;
  "queryFrontend.extraVolumeMounts"?: string;
  "queryFrontend.extraVolumes"?: string;
  "queryFrontend.extraContainers"?: string;
  "queryFrontend.terminationGracePeriodSeconds"?: string;
  "queryFrontend.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "queryFrontend.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "queryFrontend.maxUnavailable"?: string;
  "queryFrontend.topologySpreadConstraints"?: string;
  "queryFrontend.tolerations"?: string;
  "queryFrontend.appProtocol.grpc"?: string;
  "queryScheduler.replicas"?: string;
  "queryScheduler.hostAliases"?: string;
  "queryScheduler.image.registry"?: string;
  "queryScheduler.image.repository"?: string;
  "queryScheduler.image.tag"?: string;
  "queryScheduler.priorityClassName"?: string;
  "queryScheduler.extraArgs"?: string;
  "queryScheduler.extraEnv"?: string;
  "queryScheduler.extraEnvFrom"?: string;
  "queryScheduler.extraVolumeMounts"?: string;
  "queryScheduler.extraVolumes"?: string;
  "queryScheduler.extraContainers"?: string;
  "queryScheduler.terminationGracePeriodSeconds"?: string;
  "queryScheduler.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "queryScheduler.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "queryScheduler.maxUnavailable"?: string;
  "queryScheduler.topologySpreadConstraints"?: string;
  "queryScheduler.tolerations"?: string;
  "queryScheduler.appProtocol.grpc"?: string;
  "indexGateway.replicas"?: string;
  "indexGateway.joinMemberlist"?: string;
  "indexGateway.hostAliases"?: string;
  "indexGateway.image.registry"?: string;
  "indexGateway.image.repository"?: string;
  "indexGateway.image.tag"?: string;
  "indexGateway.priorityClassName"?: string;
  "indexGateway.extraArgs"?: string;
  "indexGateway.extraEnv"?: string;
  "indexGateway.extraEnvFrom"?: string;
  "indexGateway.extraVolumeMounts"?: string;
  "indexGateway.extraVolumes"?: string;
  "indexGateway.extraContainers"?: string;
  "indexGateway.initContainers"?: string;
  "indexGateway.terminationGracePeriodSeconds"?: string;
  "indexGateway.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "indexGateway.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "indexGateway.maxUnavailable"?: string;
  "indexGateway.topologySpreadConstraints"?: string;
  "indexGateway.tolerations"?: string;
  "indexGateway.persistence.enabled"?: string;
  "indexGateway.persistence.inMemory"?: string;
  "indexGateway.persistence.size"?: string;
  "indexGateway.persistence.storageClass"?: string;
  "indexGateway.persistence.enableStatefulSetAutoDeletePVC"?: string;
  "indexGateway.persistence.whenDeleted"?: string;
  "indexGateway.persistence.whenScaled"?: string;
  "indexGateway.appProtocol.grpc"?: string;
  "indexGateway.updateStrategy.type"?: string;
  "compactor.replicas"?: string;
  "compactor.hostAliases"?: string;
  "compactor.image.registry"?: string;
  "compactor.image.repository"?: string;
  "compactor.image.tag"?: string;
  "compactor.command"?: string;
  "compactor.priorityClassName"?: string;
  "compactor.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "compactor.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "compactor.extraArgs"?: string;
  "compactor.extraEnv"?: string;
  "compactor.extraEnvFrom"?: string;
  "compactor.extraVolumeMounts"?: string;
  "compactor.extraVolumes"?: string;
  "compactor.extraContainers"?: string;
  "compactor.initContainers"?: string;
  "compactor.terminationGracePeriodSeconds"?: string;
  "compactor.tolerations"?: string;
  "compactor.appProtocol.grpc"?: string;
  "compactor.persistence.enabled"?: string;
  "compactor.persistence.size"?: string;
  "compactor.persistence.storageClass"?: string;
  "compactor.persistence.claims.name"?: string;
  "compactor.persistence.claims.size"?: string;
  "compactor.persistence.claims.storageClass"?: string;
  "compactor.persistence.enableStatefulSetAutoDeletePVC"?: string;
  "compactor.persistence.whenDeleted"?: string;
  "compactor.persistence.whenScaled"?: string;
  "compactor.serviceAccount.create"?: string;
  "compactor.serviceAccount.name"?: string;
  "compactor.serviceAccount.imagePullSecrets"?: string;
  "compactor.serviceAccount.automountServiceAccountToken"?: string;
  "bloomGateway.replicas"?: string;
  "bloomGateway.hostAliases"?: string;
  "bloomGateway.image.registry"?: string;
  "bloomGateway.image.repository"?: string;
  "bloomGateway.image.tag"?: string;
  "bloomGateway.command"?: string;
  "bloomGateway.priorityClassName"?: string;
  "bloomGateway.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "bloomGateway.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "bloomGateway.extraArgs"?: string;
  "bloomGateway.extraEnv"?: string;
  "bloomGateway.extraEnvFrom"?: string;
  "bloomGateway.extraVolumeMounts"?: string;
  "bloomGateway.extraVolumes"?: string;
  "bloomGateway.extraContainers"?: string;
  "bloomGateway.initContainers"?: string;
  "bloomGateway.terminationGracePeriodSeconds"?: string;
  "bloomGateway.tolerations"?: string;
  "bloomGateway.appProtocol.grpc"?: string;
  "bloomGateway.persistence.enabled"?: string;
  "bloomGateway.persistence.claims.name"?: string;
  "bloomGateway.persistence.claims.size"?: string;
  "bloomGateway.persistence.claims.storageClass"?: string;
  "bloomGateway.persistence.enableStatefulSetAutoDeletePVC"?: string;
  "bloomGateway.persistence.whenDeleted"?: string;
  "bloomGateway.persistence.whenScaled"?: string;
  "bloomGateway.serviceAccount.create"?: string;
  "bloomGateway.serviceAccount.name"?: string;
  "bloomGateway.serviceAccount.imagePullSecrets"?: string;
  "bloomGateway.serviceAccount.automountServiceAccountToken"?: string;
  "bloomPlanner.replicas"?: string;
  "bloomPlanner.hostAliases"?: string;
  "bloomPlanner.image.registry"?: string;
  "bloomPlanner.image.repository"?: string;
  "bloomPlanner.image.tag"?: string;
  "bloomPlanner.command"?: string;
  "bloomPlanner.priorityClassName"?: string;
  "bloomPlanner.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "bloomPlanner.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "bloomPlanner.extraArgs"?: string;
  "bloomPlanner.extraEnv"?: string;
  "bloomPlanner.extraEnvFrom"?: string;
  "bloomPlanner.extraVolumeMounts"?: string;
  "bloomPlanner.extraVolumes"?: string;
  "bloomPlanner.extraContainers"?: string;
  "bloomPlanner.initContainers"?: string;
  "bloomPlanner.terminationGracePeriodSeconds"?: string;
  "bloomPlanner.tolerations"?: string;
  "bloomPlanner.appProtocol.grpc"?: string;
  "bloomPlanner.persistence.enabled"?: string;
  "bloomPlanner.persistence.claims.name"?: string;
  "bloomPlanner.persistence.claims.size"?: string;
  "bloomPlanner.persistence.claims.storageClass"?: string;
  "bloomPlanner.persistence.enableStatefulSetAutoDeletePVC"?: string;
  "bloomPlanner.persistence.whenDeleted"?: string;
  "bloomPlanner.persistence.whenScaled"?: string;
  "bloomPlanner.serviceAccount.create"?: string;
  "bloomPlanner.serviceAccount.name"?: string;
  "bloomPlanner.serviceAccount.imagePullSecrets"?: string;
  "bloomPlanner.serviceAccount.automountServiceAccountToken"?: string;
  "bloomBuilder.replicas"?: string;
  "bloomBuilder.hostAliases"?: string;
  "bloomBuilder.autoscaling.enabled"?: string;
  "bloomBuilder.autoscaling.minReplicas"?: string;
  "bloomBuilder.autoscaling.maxReplicas"?: string;
  "bloomBuilder.autoscaling.targetCPUUtilizationPercentage"?: string;
  "bloomBuilder.autoscaling.targetMemoryUtilizationPercentage"?: string;
  "bloomBuilder.autoscaling.customMetrics"?: string;
  "bloomBuilder.autoscaling.behavior.enabled"?: string;
  "bloomBuilder.image.registry"?: string;
  "bloomBuilder.image.repository"?: string;
  "bloomBuilder.image.tag"?: string;
  "bloomBuilder.command"?: string;
  "bloomBuilder.priorityClassName"?: string;
  "bloomBuilder.extraArgs"?: string;
  "bloomBuilder.extraEnv"?: string;
  "bloomBuilder.extraEnvFrom"?: string;
  "bloomBuilder.extraVolumeMounts"?: string;
  "bloomBuilder.extraVolumes"?: string;
  "bloomBuilder.extraContainers"?: string;
  "bloomBuilder.terminationGracePeriodSeconds"?: string;
  "bloomBuilder.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "bloomBuilder.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "bloomBuilder.maxUnavailable"?: string;
  "bloomBuilder.tolerations"?: string;
  "bloomBuilder.appProtocol.grpc"?: string;
  "patternIngester.replicas"?: string;
  "patternIngester.hostAliases"?: string;
  "patternIngester.image.registry"?: string;
  "patternIngester.image.repository"?: string;
  "patternIngester.image.tag"?: string;
  "patternIngester.command"?: string;
  "patternIngester.priorityClassName"?: string;
  "patternIngester.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "patternIngester.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "patternIngester.maxUnavailable"?: string;
  "patternIngester.extraArgs"?: string;
  "patternIngester.extraEnv"?: string;
  "patternIngester.extraEnvFrom"?: string;
  "patternIngester.extraVolumeMounts"?: string;
  "patternIngester.extraVolumes"?: string;
  "patternIngester.extraContainers"?: string;
  "patternIngester.initContainers"?: string;
  "patternIngester.terminationGracePeriodSeconds"?: string;
  "patternIngester.topologySpreadConstraints"?: string;
  "patternIngester.tolerations"?: string;
  "patternIngester.appProtocol.grpc"?: string;
  "patternIngester.persistence.enabled"?: string;
  "patternIngester.persistence.size"?: string;
  "patternIngester.persistence.storageClass"?: string;
  "patternIngester.persistence.claims.name"?: string;
  "patternIngester.persistence.claims.size"?: string;
  "patternIngester.persistence.claims.storageClass"?: string;
  "patternIngester.persistence.enableStatefulSetAutoDeletePVC"?: string;
  "patternIngester.persistence.whenDeleted"?: string;
  "patternIngester.persistence.whenScaled"?: string;
  "patternIngester.serviceAccount.create"?: string;
  "patternIngester.serviceAccount.name"?: string;
  "patternIngester.serviceAccount.imagePullSecrets"?: string;
  "patternIngester.serviceAccount.automountServiceAccountToken"?: string;
  "ruler.enabled"?: string;
  "ruler.sidecar"?: string;
  "ruler.replicas"?: string;
  "ruler.hostAliases"?: string;
  "ruler.image.registry"?: string;
  "ruler.image.repository"?: string;
  "ruler.image.tag"?: string;
  "ruler.command"?: string;
  "ruler.priorityClassName"?: string;
  "ruler.extraArgs"?: string;
  "ruler.extraEnv"?: string;
  "ruler.extraEnvFrom"?: string;
  "ruler.extraVolumeMounts"?: string;
  "ruler.extraVolumes"?: string;
  "ruler.extraContainers"?: string;
  "ruler.initContainers"?: string;
  "ruler.terminationGracePeriodSeconds"?: string;
  "ruler.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "ruler.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "ruler.maxUnavailable"?: string;
  "ruler.topologySpreadConstraints"?: string;
  "ruler.tolerations"?: string;
  "ruler.persistence.enabled"?: string;
  "ruler.persistence.size"?: string;
  "ruler.persistence.storageClass"?: string;
  "ruler.appProtocol.grpc"?: string;
  "overridesExporter.enabled"?: string;
  "overridesExporter.replicas"?: string;
  "overridesExporter.hostAliases"?: string;
  "overridesExporter.image.registry"?: string;
  "overridesExporter.image.repository"?: string;
  "overridesExporter.image.tag"?: string;
  "overridesExporter.command"?: string;
  "overridesExporter.priorityClassName"?: string;
  "overridesExporter.extraArgs"?: string;
  "overridesExporter.extraEnv"?: string;
  "overridesExporter.extraEnvFrom"?: string;
  "overridesExporter.extraVolumeMounts"?: string;
  "overridesExporter.extraVolumes"?: string;
  "overridesExporter.extraContainers"?: string;
  "overridesExporter.initContainers"?: string;
  "overridesExporter.terminationGracePeriodSeconds"?: string;
  "overridesExporter.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "overridesExporter.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "overridesExporter.maxUnavailable"?: string;
  "overridesExporter.topologySpreadConstraints"?: string;
  "overridesExporter.tolerations"?: string;
  "overridesExporter.appProtocol.grpc"?: string;
  "memcached.enabled"?: string;
  "memcached.image.repository"?: string;
  "memcached.image.tag"?: string;
  "memcached.image.pullPolicy"?: string;
  "memcached.podSecurityContext.runAsNonRoot"?: string;
  "memcached.podSecurityContext.runAsUser"?: string;
  "memcached.podSecurityContext.runAsGroup"?: string;
  "memcached.podSecurityContext.fsGroup"?: string;
  "memcached.priorityClassName"?: string;
  "memcached.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "memcached.containerSecurityContext.capabilities.drop"?: string;
  "memcached.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "memcached.readinessProbe.tcpSocket.port"?: string;
  "memcached.readinessProbe.initialDelaySeconds"?: string;
  "memcached.readinessProbe.periodSeconds"?: string;
  "memcached.readinessProbe.timeoutSeconds"?: string;
  "memcached.readinessProbe.failureThreshold"?: string;
  "memcached.livenessProbe.tcpSocket.port"?: string;
  "memcached.livenessProbe.initialDelaySeconds"?: string;
  "memcached.livenessProbe.periodSeconds"?: string;
  "memcached.livenessProbe.timeoutSeconds"?: string;
  "memcached.livenessProbe.failureThreshold"?: string;
  "memcachedExporter.enabled"?: string;
  "memcachedExporter.image.repository"?: string;
  "memcachedExporter.image.tag"?: string;
  "memcachedExporter.image.pullPolicy"?: string;
  "memcachedExporter.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "memcachedExporter.containerSecurityContext.capabilities.drop"?: string;
  "memcachedExporter.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "memcachedExporter.livenessProbe.httpGet.path"?: string;
  "memcachedExporter.livenessProbe.httpGet.port"?: string;
  "memcachedExporter.livenessProbe.initialDelaySeconds"?: string;
  "memcachedExporter.livenessProbe.periodSeconds"?: string;
  "memcachedExporter.livenessProbe.timeoutSeconds"?: string;
  "memcachedExporter.livenessProbe.failureThreshold"?: string;
  "memcachedExporter.readinessProbe.httpGet.path"?: string;
  "memcachedExporter.readinessProbe.httpGet.port"?: string;
  "memcachedExporter.readinessProbe.initialDelaySeconds"?: string;
  "memcachedExporter.readinessProbe.periodSeconds"?: string;
  "memcachedExporter.readinessProbe.timeoutSeconds"?: string;
  "memcachedExporter.readinessProbe.failureThreshold"?: string;
  "resultsCache.enabled"?: string;
  "resultsCache.addresses"?: string;
  "resultsCache.defaultValidity"?: string;
  "resultsCache.timeout"?: string;
  "resultsCache.replicas"?: string;
  "resultsCache.port"?: string;
  "resultsCache.allocatedMemory"?: string;
  "resultsCache.maxItemMemory"?: string;
  "resultsCache.connectionLimit"?: string;
  "resultsCache.writebackSizeLimit"?: string;
  "resultsCache.writebackBuffer"?: string;
  "resultsCache.writebackParallelism"?: string;
  "resultsCache.initContainers"?: string;
  "resultsCache.topologySpreadConstraints"?: string;
  "resultsCache.tolerations"?: string;
  "resultsCache.maxUnavailable"?: string;
  "resultsCache.priorityClassName"?: string;
  "resultsCache.podManagementPolicy"?: string;
  "resultsCache.terminationGracePeriodSeconds"?: string;
  "resultsCache.statefulStrategy.type"?: string;
  "resultsCache.extraExtendedOptions"?: string;
  "resultsCache.extraContainers"?: string;
  "resultsCache.extraVolumes"?: string;
  "resultsCache.extraVolumeMounts"?: string;
  "resultsCache.resources"?: string;
  "resultsCache.persistence.enabled"?: string;
  "resultsCache.persistence.storageSize"?: string;
  "resultsCache.persistence.storageClass"?: string;
  "resultsCache.persistence.mountPath"?: string;
  "chunksCache.suffix"?: string;
  "chunksCache.enabled"?: string;
  "chunksCache.addresses"?: string;
  "chunksCache.batchSize"?: string;
  "chunksCache.parallelism"?: string;
  "chunksCache.timeout"?: string;
  "chunksCache.defaultValidity"?: string;
  "chunksCache.replicas"?: string;
  "chunksCache.port"?: string;
  "chunksCache.allocatedMemory"?: string;
  "chunksCache.maxItemMemory"?: string;
  "chunksCache.connectionLimit"?: string;
  "chunksCache.writebackSizeLimit"?: string;
  "chunksCache.writebackBuffer"?: string;
  "chunksCache.writebackParallelism"?: string;
  "chunksCache.initContainers"?: string;
  "chunksCache.topologySpreadConstraints"?: string;
  "chunksCache.tolerations"?: string;
  "chunksCache.maxUnavailable"?: string;
  "chunksCache.priorityClassName"?: string;
  "chunksCache.podManagementPolicy"?: string;
  "chunksCache.terminationGracePeriodSeconds"?: string;
  "chunksCache.statefulStrategy.type"?: string;
  "chunksCache.extraExtendedOptions"?: string;
  "chunksCache.extraContainers"?: string;
  "chunksCache.extraVolumes"?: string;
  "chunksCache.extraVolumeMounts"?: string;
  "chunksCache.resources"?: string;
  "chunksCache.persistence.enabled"?: string;
  "chunksCache.persistence.storageSize"?: string;
  "chunksCache.persistence.storageClass"?: string;
  "chunksCache.persistence.mountPath"?: string;
  "chunksCache.l2.suffix"?: string;
  "chunksCache.l2.l2ChunkCacheHandoff"?: string;
  "chunksCache.l2.enabled"?: string;
  "chunksCache.l2.addresses"?: string;
  "chunksCache.l2.batchSize"?: string;
  "chunksCache.l2.parallelism"?: string;
  "chunksCache.l2.timeout"?: string;
  "chunksCache.l2.defaultValidity"?: string;
  "chunksCache.l2.replicas"?: string;
  "chunksCache.l2.port"?: string;
  "chunksCache.l2.allocatedMemory"?: string;
  "chunksCache.l2.maxItemMemory"?: string;
  "chunksCache.l2.connectionLimit"?: string;
  "chunksCache.l2.writebackSizeLimit"?: string;
  "chunksCache.l2.writebackBuffer"?: string;
  "chunksCache.l2.writebackParallelism"?: string;
  "chunksCache.l2.initContainers"?: string;
  "chunksCache.l2.topologySpreadConstraints"?: string;
  "chunksCache.l2.tolerations"?: string;
  "chunksCache.l2.maxUnavailable"?: string;
  "chunksCache.l2.priorityClassName"?: string;
  "chunksCache.l2.podManagementPolicy"?: string;
  "chunksCache.l2.terminationGracePeriodSeconds"?: string;
  "chunksCache.l2.statefulStrategy.type"?: string;
  "chunksCache.l2.extraExtendedOptions"?: string;
  "chunksCache.l2.extraContainers"?: string;
  "chunksCache.l2.extraVolumes"?: string;
  "chunksCache.l2.extraVolumeMounts"?: string;
  "chunksCache.l2.resources"?: string;
  "chunksCache.l2.persistence.enabled"?: string;
  "chunksCache.l2.persistence.storageSize"?: string;
  "chunksCache.l2.persistence.storageClass"?: string;
  "chunksCache.l2.persistence.mountPath"?: string;
  "rollout_operator.enabled"?: string;
  "rollout_operator.podSecurityContext.fsGroup"?: string;
  "rollout_operator.podSecurityContext.runAsGroup"?: string;
  "rollout_operator.podSecurityContext.runAsNonRoot"?: string;
  "rollout_operator.podSecurityContext.runAsUser"?: string;
  "rollout_operator.podSecurityContext.seccompProfile.type"?: string;
  "rollout_operator.securityContext.readOnlyRootFilesystem"?: string;
  "rollout_operator.securityContext.capabilities.drop"?: string;
  "rollout_operator.securityContext.allowPrivilegeEscalation"?: string;
  "minio.enabled"?: string;
  "minio.replicas"?: string;
  "minio.drivesPerNode"?: string;
  "minio.rootUser"?: string;
  "minio.rootPassword"?: string;
  "minio.users.accessKey"?: string;
  "minio.users.secretKey"?: string;
  "minio.users.policy"?: string;
  "minio.buckets.name"?: string;
  "minio.buckets.policy"?: string;
  "minio.buckets.purge"?: string;
  "minio.persistence.size"?: string;
  "minio.resources.requests.cpu"?: string;
  "minio.resources.requests.memory"?: string;
  "minio.address"?: string;
  extraObjects?: string;
  "sidecar.image.repository"?: string;
  "sidecar.image.tag"?: string;
  "sidecar.image.sha"?: string;
  "sidecar.image.pullPolicy"?: string;
  "sidecar.securityContext.readOnlyRootFilesystem"?: string;
  "sidecar.securityContext.capabilities.drop"?: string;
  "sidecar.securityContext.allowPrivilegeEscalation"?: string;
  "sidecar.skipTlsVerify"?: string;
  "sidecar.enableUniqueFilenames"?: string;
  "sidecar.rules.enabled"?: string;
  "sidecar.rules.label"?: string;
  "sidecar.rules.labelValue"?: string;
  "sidecar.rules.folder"?: string;
  "sidecar.rules.folderAnnotation"?: string;
  "sidecar.rules.searchNamespace"?: string;
  "sidecar.rules.watchMethod"?: string;
  "sidecar.rules.resource"?: string;
  "sidecar.rules.script"?: string;
  "sidecar.rules.watchServerTimeout"?: string;
  "sidecar.rules.watchClientTimeout"?: string;
  "sidecar.rules.logLevel"?: string;
  "monitoring.dashboards.enabled"?: string;
  "monitoring.dashboards.namespace"?: string;
  "monitoring.dashboards.labels.grafana_dashboard"?: string;
  "monitoring.rules.enabled"?: string;
  "monitoring.rules.alerting"?: string;
  "monitoring.rules.namespace"?: string;
  "monitoring.rules.additionalGroups"?: string;
  "monitoring.serviceMonitor.enabled"?: string;
  "monitoring.serviceMonitor.interval"?: string;
  "monitoring.serviceMonitor.scrapeTimeout"?: string;
  "monitoring.serviceMonitor.relabelings"?: string;
  "monitoring.serviceMonitor.metricRelabelings"?: string;
  "monitoring.serviceMonitor.scheme"?: string;
  "monitoring.serviceMonitor.tlsConfig"?: string;
  "monitoring.serviceMonitor.metricsInstance.enabled"?: string;
  "monitoring.serviceMonitor.metricsInstance.remoteWrite"?: string;
  "monitoring.selfMonitoring.enabled"?: string;
  "monitoring.selfMonitoring.tenant.name"?: string;
  "monitoring.selfMonitoring.tenant.password"?: string;
  "monitoring.selfMonitoring.tenant.secretNamespace"?: string;
  "monitoring.selfMonitoring.grafanaAgent.installOperator"?: string;
  "monitoring.selfMonitoring.grafanaAgent.enableConfigReadAPI"?: string;
  "monitoring.selfMonitoring.grafanaAgent.priorityClassName"?: string;
  "monitoring.selfMonitoring.grafanaAgent.tolerations"?: string;
  "monitoring.selfMonitoring.podLogs.apiVersion"?: string;
  "monitoring.selfMonitoring.podLogs.relabelings"?: string;
  "monitoring.selfMonitoring.podLogs.additionalPipelineStages"?: string;
  "monitoring.selfMonitoring.logsInstance.clients"?: string;
  "tableManager.enabled"?: string;
  "tableManager.image.registry"?: string;
  "tableManager.image.repository"?: string;
  "tableManager.image.tag"?: string;
  "tableManager.command"?: string;
  "tableManager.priorityClassName"?: string;
  "tableManager.extraArgs"?: string;
  "tableManager.extraEnv"?: string;
  "tableManager.extraEnvFrom"?: string;
  "tableManager.extraVolumeMounts"?: string;
  "tableManager.extraVolumes"?: string;
  "tableManager.extraContainers"?: string;
  "tableManager.terminationGracePeriodSeconds"?: string;
  "tableManager.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.labelSelector.matchLabels.app.kubernetes.io/component"?: string;
  "tableManager.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution.topologyKey"?: string;
  "tableManager.tolerations"?: string;
  "tableManager.retention_deletes_enabled"?: string;
  "tableManager.retention_period"?: string;
};
