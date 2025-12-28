// Generated TypeScript types for windmill Helm chart

export type WindmillHelmValuesPostgresql = {
  /**
   * enabled included Postgres container for demo purposes only using cloudnative-pg
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {"limits":{"memory":"2Gi"}}
   */
  resources?: WindmillHelmValuesPostgresqlResources;
  /**
   * @default {"postgresUser":"postgres","postgresPassword":"windmill","database":"windmill"}
   */
  auth?: WindmillHelmValuesPostgresqlAuth;
  /**
   * persistence configuration for PostgreSQL data
   *
   * @default {...} (4 keys)
   */
  persistence?: WindmillHelmValuesPostgresqlPersistence;
};

export type WindmillHelmValuesPostgresqlResources = {
  /**
   * @default {"memory":"2Gi"}
   */
  limits?: WindmillHelmValuesPostgresqlResourcesLimits;
  /**
   * Kubernetes resource requests (memory, cpu, etc.)
   */
  requests?: WindmillHelmValuesPostgresqlResourcesRequests;
};

export type WindmillHelmValuesPostgresqlResourcesLimits = {
  /**
   * @default "2Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesPostgresqlResourcesRequests = {
  /**
   * @default "2Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesPostgresqlAuth = {
  /**
   * @default "postgres"
   */
  postgresUser?: string;
  /**
   * @default "windmill"
   */
  postgresPassword?: string;
  /**
   * @default "windmill"
   */
  database?: string;
};

export type WindmillHelmValuesPostgresqlPersistence = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * enable persistence using PVC
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * storage class for the PVC (leave empty for default)
   *
   * @default ""
   */
  storageClass?: string;
  /**
   * access mode for the PVC
   *
   * @default "ReadWriteOnce"
   */
  accessMode?: string;
  /**
   * size of the PVC
   *
   * @default "50Gi"
   */
  size?: string;
};

export type WindmillHelmValuesMinio = {
  /**
   * enabled included Minio operator for s3 resource demo purposes
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * @default "windmill-minio"
   */
  fullnameOverride?: string;
  /**
   * @default "standalone"
   */
  mode?: string;
  /**
   * @default {"enabled":true}
   */
  primary?: WindmillHelmValuesMinioPrimary;
  /**
   * @default {"rootUser":"windmill","rootPassword":"windmill"}
   */
  auth?: WindmillHelmValuesMinioAuth;
};

export type WindmillHelmValuesMinioPrimary = {
  /**
   * @default true
   */
  enabled?: boolean;
};

export type WindmillHelmValuesMinioAuth = {
  /**
   * @default "windmill"
   */
  rootUser?: string;
  /**
   * @default "windmill"
   */
  rootPassword?: string;
};

export type WindmillHelmValuesWindmill = {
  /**
   * windmill app image tag, will use the App version if not defined
   *
   * @default ""
   */
  tag?: string;
  /**
   * windmill image tag, will use the Acorresponding ee or ce image from ghcr if not defined. Do not include tag in the image name.
   *
   * @default ""
   */
  image?: string;
  /**
   * image pull secrets for windmill.  by default no image pull secrets will be configured.
   *
   * @default ""
   */
  imagePullSecrets?: string;
  /**
   * replica for the application app
   *
   * @default 2
   */
  appReplicas?: number;
  /**
   * replicas for the lsp smart assistant (not required but useful for the web IDE)
   *
   * @default 2
   */
  lspReplicas?: number;
  /**
   * replicas for the multiplayer containers used by the app (ee only and ignored if enterprise not enabled)
   *
   * @default 1
   */
  multiplayerReplicas?: number;
  /**
   * name of the existing secret storing the database URI, take precedence over databaseUrl.
   *
   * @default ""
   */
  databaseUrlSecretName?: string;
  /**
   * name of the key in existing secret storing the database URI. The default key of the url is 'url'
   *
   * @default "url"
   */
  databaseUrlSecretKey?: string;
  /**
   * Postgres URI, pods will crashloop if database is unreachable, sets DATABASE_URL environment variable in app and worker container
   *
   * @default "postgres://postgres:windmill@windmill-postgresq..."
   */
  databaseUrl?: string;
  /**
   * whether to create a secret containing the value of databaseUrl
   *
   * @default false
   */
  databaseSecret?: boolean;
  /**
   * domain as shown in browser. url of ths service is at: {baseProtocol}://{baseDomain}
   *
   * @default "windmill"
   */
  baseDomain?: string;
  /**
   * protocol as shown in browser, change to https etc based on your endpoint/ingress configuration, this variable and `baseDomain` are used as part of the BASE_URL environment variable in app and worker container
   *
   * @default "http"
   */
  baseProtocol?: string;
  /**
   * domain to use for the cookies. Use it if windmill is hosted on a subdomain and you need to share the cookies with the hub for instance
   *
   * @default ""
   */
  cookieDomain?: string;
  /**
   * pass the index url to pip for private registries
   *
   * @default ""
   */
  pipIndexUrl?: string;
  /**
   * pass the extra index url to pip for private registries
   *
   * @default ""
   */
  pipExtraIndexUrl?: string;
  /**
   * pass the trusted host to pip for private registries
   *
   * @default ""
   */
  pipTrustedHost?: string;
  /**
   * pass the npm for private registries
   *
   * @default ""
   */
  npmConfigRegistry?: string;
  /**
   * send instance events to a webhook. Can be hooked back to windmill
   *
   * @default ""
   */
  instanceEventsWebhook?: string;
  /**
   * configure a custom openai base path for azure
   *
   * @default ""
   */
  openaiAzureBasePath?: string;
  /**
   * mount the docker socket inside the container to be able to run docker command as docker client to the host docker daemon
   *
   * @default false
   */
  exposeHostDocker?: boolean;
  /**
   * rust log level, set to debug for more information etc, sets RUST_LOG environment variable in app and worker container
   *
   * @default "info"
   */
  rustLog?: string;
  hostAliases?: unknown[];
  /**
   * domain to use for the public app. Use it for extra security so that custom apps cannot force the user to do custom api call on the main app
   *
   * @default ""
   */
  publicAppDomain?: string;
  /**
   * domain to use for the secondary api. Can be useful to have a secondary api domain that bypass a CDN like Cloudflare or similar.
   *
   * @default ""
   */
  secondaryApiDomain?: string;
  /**
   * image pull policy for the app, worker, lsp and multiplayer containers
   *
   * @default "Always"
   */
  imagePullPolicy?: string;
  /**
   * Disable PID namespace isolation (unshare). Set to true for nodes where user namespaces are disabled.
   * Some systems like Bottlerocket AMI have max_user_namespaces=0 which prevents unshare from working.
   *
   * @default false
   */
  disableUnsharePid?: boolean;
  workerGroups?: WindmillHelmValuesWindmillWorkerGroupsElement[];
  /**
   * app configuration
   *
   * @default {...} (19 keys)
   */
  app?: WindmillHelmValuesWindmillApp;
  /**
   * lsp configuration
   *
   * @default {...} (14 keys)
   */
  lsp?: WindmillHelmValuesWindmillLsp;
  /**
   * multiplayer configuration
   *
   * @default {...} (13 keys)
   */
  multiplayer?: WindmillHelmValuesWindmillMultiplayer;
  /**
   * indexer configuration
   *
   * @default {...} (12 keys)
   */
  indexer?: WindmillHelmValuesWindmillIndexer;
};

export type WindmillHelmValuesWindmillWorkerGroupsElement = {
  /**
   * @default "default"
   */
  name?: string | number | boolean;
  /**
   * @default "Deployment"
   */
  controller?: string;
  /**
   * @default 3
   */
  replicas?: number;
  /**
   * @default {}
   */
  annotations?: WindmillHelmValuesWindmillWorkerGroupsAnnotations;
  /**
   * @default 604800
   */
  terminationGracePeriodSeconds?: number;
  /**
   * @default {}
   */
  labels?: WindmillHelmValuesWindmillWorkerGroupsLabels;
  /**
   * @default {}
   */
  nodeSelector?: WindmillHelmValuesWindmillWorkerGroupsNodeSelector;
  tolerations?: unknown[];
  hostAliases?: unknown[];
  /**
   * @default true
   */
  privileged?: boolean;
  /**
   * @default false
   */
  disableUnsharePid?: boolean;
  /**
   * @default {"runAsUser":0,"runAsNonRoot":false}
   */
  podSecurityContext?: WindmillHelmValuesWindmillWorkerGroupsPodSecurityContext;
  /**
   * @default {}
   */
  containerSecurityContext?: WindmillHelmValuesWindmillWorkerGroupsContainerSecurityContext;
  /**
   * @default {}
   */
  affinity?: WindmillHelmValuesWindmillWorkerGroupsAffinity;
  /**
   * @default {"limits":{"memory":"2Gi"}}
   */
  resources?: WindmillHelmValuesWindmillWorkerGroupsResources;
  extraEnv?: unknown[];
  extraContainers?: unknown[];
  /**
   * @default "worker"
   */
  mode?: string;
  initContainers?: unknown[];
  volumes?: unknown[];
  volumeMounts?: unknown[];
  volumeClaimTemplates?: unknown[];
  command?: unknown[];
  /**
   * @default false
   */
  exposeHostDocker?: boolean;
  topologySpreadConstraints?: unknown[];
};

export type WindmillHelmValuesWindmillWorkerGroupsAnnotations = object;

export type WindmillHelmValuesWindmillWorkerGroupsLabels = object;

export type WindmillHelmValuesWindmillWorkerGroupsNodeSelector = object;

export type WindmillHelmValuesWindmillWorkerGroupsPodSecurityContext = {
  /**
   * @default 0
   */
  runAsUser?: number;
  /**
   * @default false
   */
  runAsNonRoot?: boolean;
};

export type WindmillHelmValuesWindmillWorkerGroupsContainerSecurityContext = object;

export type WindmillHelmValuesWindmillWorkerGroupsAffinity = object;

export type WindmillHelmValuesWindmillWorkerGroupsResources = {
  /**
   * @default {"memory":"2Gi"}
   */
  limits?: WindmillHelmValuesWindmillWorkerGroupsResourcesLimits;
  /**
   * Kubernetes resource requests (memory, cpu, etc.)
   */
  requests?: WindmillHelmValuesWindmillWorkerGroupsResourcesRequests;
};

export type WindmillHelmValuesWindmillWorkerGroupsResourcesLimits = {
  /**
   * @default "2Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesWindmillWorkerGroupsResourcesRequests = {
  /**
   * @default "2Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesWindmillApp = {
  /**
   * Annotations to apply to the pods
   *
   * @default {}
   */
  annotations?: WindmillHelmValuesWindmillAppAnnotations;
  /**
   * Annotations to apply to the pods
   *
   * @default {}
   */
  labels?: WindmillHelmValuesWindmillAppLabels;
  /**
   * Node selector to use for scheduling the pods
   *
   * @default {}
   */
  nodeSelector?: WindmillHelmValuesWindmillAppNodeSelector;
  tolerations?: unknown[];
  hostAliases?: unknown[];
  /**
   * legacy, use podSecurityContext instead
   *
   * @default {}
   */
  securityContext?: WindmillHelmValuesWindmillAppSecurityContext;
  /**
   * Security context to apply to the pods
   *
   * @default {"runAsUser":0,"runAsNonRoot":false}
   */
  podSecurityContext?: WindmillHelmValuesWindmillAppPodSecurityContext;
  /**
   * @default {}
   */
  containerSecurityContext?: WindmillHelmValuesWindmillAppContainerSecurityContext;
  /**
   * Affinity rules to apply to the pods
   *
   * @default {}
   */
  affinity?: WindmillHelmValuesWindmillAppAffinity;
  /**
   * Resource limits and requests for the pods
   *
   * @default {"limits":{"memory":"2Gi"}}
   */
  resources?: WindmillHelmValuesWindmillAppResources;
  extraEnv?: unknown[];
  initContainers?: unknown[];
  extraContainers?: unknown[];
  volumes?: unknown[];
  volumeMounts?: unknown[];
  /**
   * app autoscaling configuration
   *
   * @default {"enabled":false,"maxReplicas":10,"targetCPUUtilizationPercentage":80}
   */
  autoscaling?: WindmillHelmValuesWindmillAppAutoscaling;
  /**
   * app service configuration
   *
   * @default {"annotations":{}}
   */
  service?: WindmillHelmValuesWindmillAppService;
  /**
   * smtp service configuration for email triggers
   *
   * @default {"enabled":false,"annotations":{}}
   */
  smtpService?: WindmillHelmValuesWindmillAppSmtpService;
  topologySpreadConstraints?: unknown[];
};

export type WindmillHelmValuesWindmillAppAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillAppLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillAppNodeSelector = object;

export type WindmillHelmValuesWindmillAppSecurityContext = object;

export type WindmillHelmValuesWindmillAppPodSecurityContext = {
  /**
   * run as user. The default is 0 for root user
   *
   * @default 0
   */
  runAsUser?: number;
  /**
   * run explicitly as a non-root user. The default is false.
   *
   * @default false
   */
  runAsNonRoot?: boolean;
};

export type WindmillHelmValuesWindmillAppContainerSecurityContext = object;

export type WindmillHelmValuesWindmillAppAffinity = object;

export type WindmillHelmValuesWindmillAppResources = {
  /**
   * @default {"memory":"2Gi"}
   */
  limits?: WindmillHelmValuesWindmillAppResourcesLimits;
  /**
   * Kubernetes resource requests (memory, cpu, etc.)
   */
  requests?: WindmillHelmValuesWindmillAppResourcesRequests;
};

export type WindmillHelmValuesWindmillAppResourcesLimits = {
  /**
   * @default "2Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesWindmillAppResourcesRequests = {
  /**
   * @default "2Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesWindmillAppAutoscaling = {
  /**
   * enable or disable autoscaling
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * maximum autoscaler replicas
   *
   * @default 10
   */
  maxReplicas?: number;
  /**
   * target CPU utilization
   *
   * @default 80
   */
  targetCPUUtilizationPercentage?: number;
};

export type WindmillHelmValuesWindmillAppService = {
  /**
   * Annotations to apply to the service
   *
   * @default {}
   */
  annotations?: WindmillHelmValuesWindmillAppServiceAnnotations;
};

export type WindmillHelmValuesWindmillAppServiceAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillAppSmtpService = {
  /**
   * whether to expose the smtp port of the app using a load balancer service
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * annotations to apply to the service
   *
   * @default {}
   */
  annotations?: WindmillHelmValuesWindmillAppSmtpServiceAnnotations;
};

export type WindmillHelmValuesWindmillAppSmtpServiceAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillLsp = {
  /**
   * image tag
   *
   * @default ""
   */
  tag?: string;
  /**
   * enable or disable lsp
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * Annotations to apply to the pods
   *
   * @default {}
   */
  annotations?: WindmillHelmValuesWindmillLspAnnotations;
  /**
   * Annotations to apply to the pods
   *
   * @default {}
   */
  labels?: WindmillHelmValuesWindmillLspLabels;
  /**
   * Node selector to use for scheduling the pods
   *
   * @default {}
   */
  nodeSelector?: WindmillHelmValuesWindmillLspNodeSelector;
  tolerations?: unknown[];
  securityContext?: unknown;
  /**
   * @default {"runAsUser":0,"runAsNonRoot":false}
   */
  podSecurityContext?: WindmillHelmValuesWindmillLspPodSecurityContext;
  /**
   * @default {}
   */
  containerSecurityContext?: WindmillHelmValuesWindmillLspContainerSecurityContext;
  /**
   * Affinity rules to apply to the pods
   *
   * @default {}
   */
  affinity?: WindmillHelmValuesWindmillLspAffinity;
  /**
   * Resource limits and requests for the pods
   *
   * @default {"limits":{"memory":"1Gi"}}
   */
  resources?: WindmillHelmValuesWindmillLspResources;
  extraEnv?: unknown[];
  /**
   * lsp autoscaling configuration
   *
   * @default {"enabled":false,"maxReplicas":10,"targetCPUUtilizationPercentage":80}
   */
  autoscaling?: WindmillHelmValuesWindmillLspAutoscaling;
  /**
   * lsp service configuration
   *
   * @default {"annotations":{}}
   */
  service?: WindmillHelmValuesWindmillLspService;
};

export type WindmillHelmValuesWindmillLspAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillLspLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillLspNodeSelector = object;

export type WindmillHelmValuesWindmillLspPodSecurityContext = {
  /**
   * run as user. The default is 0 for root user
   *
   * @default 0
   */
  runAsUser?: number;
  /**
   * run explicitly as a non-root user. The default is false.
   *
   * @default false
   */
  runAsNonRoot?: boolean;
};

export type WindmillHelmValuesWindmillLspContainerSecurityContext = object;

export type WindmillHelmValuesWindmillLspAffinity = object;

export type WindmillHelmValuesWindmillLspResources = {
  /**
   * @default {"memory":"1Gi"}
   */
  limits?: WindmillHelmValuesWindmillLspResourcesLimits;
  /**
   * Kubernetes resource requests (memory, cpu, etc.)
   */
  requests?: WindmillHelmValuesWindmillLspResourcesRequests;
};

export type WindmillHelmValuesWindmillLspResourcesLimits = {
  /**
   * @default "1Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesWindmillLspResourcesRequests = {
  /**
   * @default "1Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesWindmillLspAutoscaling = {
  /**
   * enable or disable autoscaling
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * maximum autoscaler replicas
   *
   * @default 10
   */
  maxReplicas?: number;
  /**
   * target CPU utilization
   *
   * @default 80
   */
  targetCPUUtilizationPercentage?: number;
};

export type WindmillHelmValuesWindmillLspService = {
  /**
   * Annotations to apply to the service
   *
   * @default {}
   */
  annotations?: WindmillHelmValuesWindmillLspServiceAnnotations;
};

export type WindmillHelmValuesWindmillLspServiceAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillMultiplayer = {
  /**
   * image tag
   *
   * @default "main"
   */
  tag?: string;
  /**
   * enable or disable multiplayer
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * Annotations to apply to the pods
   *
   * @default {}
   */
  annotations?: WindmillHelmValuesWindmillMultiplayerAnnotations;
  /**
   * Annotations to apply to the pods
   *
   * @default {}
   */
  labels?: WindmillHelmValuesWindmillMultiplayerLabels;
  /**
   * Node selector to use for scheduling the pods
   *
   * @default {}
   */
  nodeSelector?: WindmillHelmValuesWindmillMultiplayerNodeSelector;
  tolerations?: unknown[];
  securityContext?: unknown;
  /**
   * @default {"runAsUser":0,"runAsNonRoot":false}
   */
  podSecurityContext?: WindmillHelmValuesWindmillMultiplayerPodSecurityContext;
  /**
   * @default {}
   */
  containerSecurityContext?: WindmillHelmValuesWindmillMultiplayerContainerSecurityContext;
  /**
   * Affinity rules to apply to the pods
   *
   * @default {}
   */
  affinity?: WindmillHelmValuesWindmillMultiplayerAffinity;
  /**
   * Resource limits and requests for the pods
   *
   * @default {"limits":{"memory":"1Gi"}}
   */
  resources?: WindmillHelmValuesWindmillMultiplayerResources;
  extraEnv?: unknown[];
  /**
   * lsp autoscaling configuration
   *
   * @default {"enabled":false,"maxReplicas":10,"targetCPUUtilizationPercentage":80}
   */
  autoscaling?: WindmillHelmValuesWindmillMultiplayerAutoscaling;
};

export type WindmillHelmValuesWindmillMultiplayerAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillMultiplayerLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillMultiplayerNodeSelector = object;

export type WindmillHelmValuesWindmillMultiplayerPodSecurityContext = {
  /**
   * run as user. The default is 0 for root user
   *
   * @default 0
   */
  runAsUser?: number;
  /**
   * run explicitly as a non-root user. The default is false.
   *
   * @default false
   */
  runAsNonRoot?: boolean;
};

export type WindmillHelmValuesWindmillMultiplayerContainerSecurityContext = object;

export type WindmillHelmValuesWindmillMultiplayerAffinity = object;

export type WindmillHelmValuesWindmillMultiplayerResources = {
  /**
   * @default {"memory":"1Gi"}
   */
  limits?: WindmillHelmValuesWindmillMultiplayerResourcesLimits;
  /**
   * Kubernetes resource requests (memory, cpu, etc.)
   */
  requests?: WindmillHelmValuesWindmillMultiplayerResourcesRequests;
};

export type WindmillHelmValuesWindmillMultiplayerResourcesLimits = {
  /**
   * @default "1Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesWindmillMultiplayerResourcesRequests = {
  /**
   * @default "1Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesWindmillMultiplayerAutoscaling = {
  /**
   * enable or disable autoscaling
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * maximum autoscaler replicas
   *
   * @default 10
   */
  maxReplicas?: number;
  /**
   * target CPU utilization
   *
   * @default 80
   */
  targetCPUUtilizationPercentage?: number;
};

export type WindmillHelmValuesWindmillIndexer = {
  /**
   * enable or disable indexer
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * Annotations to apply to the pods
   *
   * @default {}
   */
  annotations?: WindmillHelmValuesWindmillIndexerAnnotations;
  /**
   * Annotations to apply to the pods
   *
   * @default {}
   */
  labels?: WindmillHelmValuesWindmillIndexerLabels;
  /**
   * Node selector to use for scheduling the pods
   *
   * @default {}
   */
  nodeSelector?: WindmillHelmValuesWindmillIndexerNodeSelector;
  tolerations?: unknown[];
  securityContext?: unknown;
  /**
   * @default {"runAsUser":0,"runAsNonRoot":false}
   */
  podSecurityContext?: WindmillHelmValuesWindmillIndexerPodSecurityContext;
  /**
   * @default {}
   */
  containerSecurityContext?: WindmillHelmValuesWindmillIndexerContainerSecurityContext;
  /**
   * Affinity rules to apply to the pods
   *
   * @default {}
   */
  affinity?: WindmillHelmValuesWindmillIndexerAffinity;
  /**
   * Resource limits and requests for the pods
   *
   * @default {"limits":{"memory":"2Gi","ephemeral-storage":"50Gi"}}
   */
  resources?: WindmillHelmValuesWindmillIndexerResources;
  extraContainers?: unknown[];
  extraEnv?: unknown[];
};

export type WindmillHelmValuesWindmillIndexerAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillIndexerLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesWindmillIndexerNodeSelector = object;

export type WindmillHelmValuesWindmillIndexerPodSecurityContext = {
  /**
   * run as user. The default is 0 for root user
   *
   * @default 0
   */
  runAsUser?: number;
  /**
   * run explicitly as a non-root user. The default is false.
   *
   * @default false
   */
  runAsNonRoot?: boolean;
};

export type WindmillHelmValuesWindmillIndexerContainerSecurityContext = object;

export type WindmillHelmValuesWindmillIndexerAffinity = object;

export type WindmillHelmValuesWindmillIndexerResources = {
  /**
   * @default {"memory":"2Gi","ephemeral-storage":"50Gi"}
   */
  limits?: WindmillHelmValuesWindmillIndexerResourcesLimits;
  /**
   * Kubernetes resource requests (memory, cpu, etc.)
   */
  requests?: WindmillHelmValuesWindmillIndexerResourcesRequests;
};

export type WindmillHelmValuesWindmillIndexerResourcesLimits = {
  /**
   * @default "2Gi"
   */
  memory?: string;
  /**
   * @default "50Gi"
   */
  "ephemeral-storage"?: string;
};

export type WindmillHelmValuesWindmillIndexerResourcesRequests = {
  /**
   * @default "2Gi"
   */
  memory?: string;
  /**
   * @default "50Gi"
   */
  "ephemeral-storage"?: string;
};

export type WindmillHelmValuesIngress = {
  /**
   * enable/disable included ingress resource
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * @default ""
   */
  className?: string;
  /**
   * @default {}
   */
  annotations?: WindmillHelmValuesIngressAnnotations;
  tls?: unknown[];
};

export type WindmillHelmValuesIngressAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesEnterprise = {
  /**
   * enable Windmill Enterprise, requires license key.
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * name of the secret storing the enterprise license key, take precedence over licenseKey string.
   *
   * @default ""
   */
  licenseKeySecretName?: string;
  /**
   * name of the key in secret storing the enterprise license key. The default key is 'licenseKey'
   *
   * @default "licenseKey"
   */
  licenseKeySecretKey?: string;
  /**
   * enterprise license key. (Recommended to avoid: It is recommended to pass it from the Instance settings UI instead)
   *
   * @default ""
   */
  licenseKey?: string;
  /**
   * @default false
   */
  enabledS3DistributedCache?: boolean;
  /**
   * S3 bucket to use for dependency cache. Sets S3_CACHE_BUCKET environment variable in worker container
   *
   * @default ""
   */
  s3CacheBucket?: string;
  /**
   * SAML Metadata URL/Content to enable SAML SSO (Can be set in the Instance Settings UI which is the recommended method)
   *
   * @default ""
   */
  samlMetadata?: string;
  /**
   * SCIM token (Can be set in the instance settings UI which is the recommended method)
   *
   * @default ""
   */
  scimToken?: string;
  /**
   * name of the secret storing the SCIM token, takes precedence over SCIM token string.
   *
   * @default ""
   */
  scimTokenSecretName?: string;
  /**
   * name of the key in secret storing the SCIM token. The default key of the SCIM token is 'scimToken'
   *
   * @default "scimToken"
   */
  scimTokenSecretKey?: string;
  /**
   * use nsjail for sandboxing
   *
   * @default false
   */
  nsjail?: boolean;
  /**
   * Create RBAC Roles and RoleBindings needed for native k8s autoscaling integration.
   *
   * @default false
   */
  createKubernetesAutoscalingRolesAndBindings?: boolean;
};

export type WindmillHelmValuesServiceAccount = {
  /**
   * Specifies whether a ServiceAccount should be created
   *
   * @default true
   */
  create?: boolean;
  /**
   * The name of the ServiceAccount to use.
   * If not set and create is true, a name is generated using the fullname template
   *
   * @default ""
   */
  name?: string;
  /**
   * @default {}
   */
  annotations?: WindmillHelmValuesServiceAccountAnnotations;
  automountServiceAccountToken?: unknown;
};

export type WindmillHelmValuesServiceAccountAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesHub = {
  /**
   * enable Windmill Hub, requires Windmill Enterprise and license key
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * enterprise license key, deprecated use the enterprise values instead
   *
   * @default ""
   */
  licenseKey?: string;
  /**
   * replicas for the hub
   *
   * @default 1
   */
  replicas?: number;
  /**
   * image
   *
   * @default ""
   */
  image?: string;
  /**
   * @default "1.0.7"
   */
  tag?: string;
  /**
   * name of the secret storing the database URI, take precedence over databaseUrl.
   *
   * @default ""
   */
  databaseUrlSecretName?: string;
  /**
   * name of the key in secret storing the database URI. The default key of the url is 'url'
   *
   * @default "url"
   */
  databaseUrlSecretKey?: string;
  /**
   * Postgres URI, pods will crashloop if database is unreachable, sets DATABASE_URL environment variable in app and worker container
   *
   * @default "postgres://postgres:windmill@windmill-hub-postg..."
   */
  databaseUrl?: string;
  /**
   * whether to create a secret containing the value of databaseUrl
   *
   * @default false
   */
  databaseSecret?: boolean;
  /**
   * domain as shown in browser. url of ths service is at: {baseProtocol}://{baseDomain}
   * should be a subdomain of the app domain so that cookies can be shared
   * you also need to set the cookieDomain to the root domain in the app configuration
   *
   * @default "hub.windmill"
   */
  baseDomain?: string;
  /**
   * protocol as shown in browser, change to https etc based on your endpoint/ingress configuration, this variable and `baseDomain` are used as part of the BASE_URL environment variable in app and worker container
   *
   * @default "http"
   */
  baseProtocol?: string;
  /**
   * name of the secret storing the API secret, take precedence over apiSecret
   *
   * @default ""
   */
  apiSecretSecretName?: string;
  /**
   * name of the key in secret storing the API secret. The default key of the api secret is 'apiSecret'
   *
   * @default "apiSecret"
   */
  apiSecretSecretKey?: string;
  /**
   * API secret for the hub. Optional, only set if you want to restrict access to the hub.
   *
   * @default ""
   */
  apiSecret?: string;
  /**
   * Annotations to apply to the pods
   *
   * @default {}
   */
  annotations?: WindmillHelmValuesHubAnnotations;
  /**
   * Annotations to apply to the pods
   *
   * @default {}
   */
  labels?: WindmillHelmValuesHubLabels;
  /**
   * Node selector to use for scheduling the pods
   *
   * @default {}
   */
  nodeSelector?: WindmillHelmValuesHubNodeSelector;
  tolerations?: unknown[];
  securityContext?: unknown;
  /**
   * @default {"runAsUser":0,"runAsNonRoot":false}
   */
  podSecurityContext?: WindmillHelmValuesHubPodSecurityContext;
  /**
   * @default {}
   */
  containerSecurityContext?: WindmillHelmValuesHubContainerSecurityContext;
  /**
   * Affinity rules to apply to the pods
   *
   * @default {}
   */
  affinity?: WindmillHelmValuesHubAffinity;
  /**
   * Resource limits and requests for the pods
   *
   * @default {"limits":{"memory":"2Gi"}}
   */
  resources?: WindmillHelmValuesHubResources;
  extraEnv?: unknown[];
};

export type WindmillHelmValuesHubAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesHubLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type WindmillHelmValuesHubNodeSelector = object;

export type WindmillHelmValuesHubPodSecurityContext = {
  /**
   * run as user. The default is 0 for root user
   *
   * @default 0
   */
  runAsUser?: number;
  /**
   * run explicitly as a non-root user. The default is false.
   *
   * @default false
   */
  runAsNonRoot?: boolean;
};

export type WindmillHelmValuesHubContainerSecurityContext = object;

export type WindmillHelmValuesHubAffinity = object;

export type WindmillHelmValuesHubResources = {
  /**
   * @default {"memory":"2Gi"}
   */
  limits?: WindmillHelmValuesHubResourcesLimits;
  /**
   * Kubernetes resource requests (memory, cpu, etc.)
   */
  requests?: WindmillHelmValuesHubResourcesRequests;
};

export type WindmillHelmValuesHubResourcesLimits = {
  /**
   * @default "2Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesHubResourcesRequests = {
  /**
   * @default "2Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesHubpostgresql = {
  /**
   * enabled included Postgres container for demo purposes
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * @default {"limits":{"memory":"2Gi"}}
   */
  resources?: WindmillHelmValuesHubpostgresqlResources;
  /**
   * @default {"postgresUser":"postgres","postgresPassword":"windmill","database":"windmillhub"}
   */
  auth?: WindmillHelmValuesHubpostgresqlAuth;
  /**
   * persistence configuration for PostgreSQL data
   *
   * @default {...} (4 keys)
   */
  persistence?: WindmillHelmValuesHubpostgresqlPersistence;
};

export type WindmillHelmValuesHubpostgresqlResources = {
  /**
   * @default {"memory":"2Gi"}
   */
  limits?: WindmillHelmValuesHubpostgresqlResourcesLimits;
  /**
   * Kubernetes resource requests (memory, cpu, etc.)
   */
  requests?: WindmillHelmValuesHubpostgresqlResourcesRequests;
};

export type WindmillHelmValuesHubpostgresqlResourcesLimits = {
  /**
   * @default "2Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesHubpostgresqlResourcesRequests = {
  /**
   * @default "2Gi"
   */
  memory?: string;
};

export type WindmillHelmValuesHubpostgresqlAuth = {
  /**
   * @default "postgres"
   */
  postgresUser?: string;
  /**
   * @default "windmill"
   */
  postgresPassword?: string;
  /**
   * @default "windmillhub"
   */
  database?: string;
};

export type WindmillHelmValuesHubpostgresqlPersistence = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * enable persistence using PVC
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * storage class for the PVC (leave empty for default)
   *
   * @default ""
   */
  storageClass?: string;
  /**
   * access mode for the PVC
   *
   * @default "ReadWriteOnce"
   */
  accessMode?: string;
  /**
   * size of the PVC
   *
   * @default "50Gi"
   */
  size?: string;
};

export type WindmillHelmValues = {
  /**
   * @default {...} (4 keys)
   */
  postgresql?: WindmillHelmValuesPostgresql;
  /**
   * @default {...} (5 keys)
   */
  minio?: WindmillHelmValuesMinio;
  /**
   * @default {...} (31 keys)
   */
  windmill?: WindmillHelmValuesWindmill;
  /**
   * @default {...} (4 keys)
   */
  ingress?: WindmillHelmValuesIngress;
  /**
   * @default {...} (12 keys)
   */
  enterprise?: WindmillHelmValuesEnterprise;
  /**
   * @default {...} (4 keys)
   */
  serviceAccount?: WindmillHelmValuesServiceAccount;
  /**
   * @default {...} (24 keys)
   */
  hub?: WindmillHelmValuesHub;
  /**
   * @default {...} (4 keys)
   */
  "hub-postgresql"?: WindmillHelmValuesHubpostgresql;
  extraDeploy?: unknown[];
};

export type WindmillHelmParameters = {
  "postgresql.enabled"?: string;
  "postgresql.resources.limits.memory"?: string;
  "postgresql.resources.requests.memory"?: string;
  "postgresql.auth.postgresUser"?: string;
  "postgresql.auth.postgresPassword"?: string;
  "postgresql.auth.database"?: string;
  "postgresql.persistence.enabled"?: string;
  "postgresql.persistence.storageClass"?: string;
  "postgresql.persistence.accessMode"?: string;
  "postgresql.persistence.size"?: string;
  "minio.enabled"?: string;
  "minio.fullnameOverride"?: string;
  "minio.mode"?: string;
  "minio.primary.enabled"?: string;
  "minio.auth.rootUser"?: string;
  "minio.auth.rootPassword"?: string;
  "windmill.tag"?: string;
  "windmill.image"?: string;
  "windmill.imagePullSecrets"?: string;
  "windmill.appReplicas"?: string;
  "windmill.lspReplicas"?: string;
  "windmill.multiplayerReplicas"?: string;
  "windmill.databaseUrlSecretName"?: string;
  "windmill.databaseUrlSecretKey"?: string;
  "windmill.databaseUrl"?: string;
  "windmill.databaseSecret"?: string;
  "windmill.baseDomain"?: string;
  "windmill.baseProtocol"?: string;
  "windmill.cookieDomain"?: string;
  "windmill.pipIndexUrl"?: string;
  "windmill.pipExtraIndexUrl"?: string;
  "windmill.pipTrustedHost"?: string;
  "windmill.npmConfigRegistry"?: string;
  "windmill.instanceEventsWebhook"?: string;
  "windmill.openaiAzureBasePath"?: string;
  "windmill.exposeHostDocker"?: string;
  "windmill.rustLog"?: string;
  "windmill.hostAliases"?: string;
  "windmill.publicAppDomain"?: string;
  "windmill.secondaryApiDomain"?: string;
  "windmill.imagePullPolicy"?: string;
  "windmill.disableUnsharePid"?: string;
  "windmill.workerGroups.name"?: string;
  "windmill.workerGroups.controller"?: string;
  "windmill.workerGroups.replicas"?: string;
  "windmill.workerGroups.terminationGracePeriodSeconds"?: string;
  "windmill.workerGroups.tolerations"?: string;
  "windmill.workerGroups.hostAliases"?: string;
  "windmill.workerGroups.privileged"?: string;
  "windmill.workerGroups.disableUnsharePid"?: string;
  "windmill.workerGroups.podSecurityContext.runAsUser"?: string;
  "windmill.workerGroups.podSecurityContext.runAsNonRoot"?: string;
  "windmill.workerGroups.resources.limits.memory"?: string;
  "windmill.workerGroups.resources.requests.memory"?: string;
  "windmill.workerGroups.extraEnv"?: string;
  "windmill.workerGroups.extraContainers"?: string;
  "windmill.workerGroups.mode"?: string;
  "windmill.workerGroups.initContainers"?: string;
  "windmill.workerGroups.volumes"?: string;
  "windmill.workerGroups.volumeMounts"?: string;
  "windmill.workerGroups.volumeClaimTemplates"?: string;
  "windmill.workerGroups.command"?: string;
  "windmill.workerGroups.exposeHostDocker"?: string;
  "windmill.workerGroups.topologySpreadConstraints"?: string;
  "windmill.app.tolerations"?: string;
  "windmill.app.hostAliases"?: string;
  "windmill.app.podSecurityContext.runAsUser"?: string;
  "windmill.app.podSecurityContext.runAsNonRoot"?: string;
  "windmill.app.resources.limits.memory"?: string;
  "windmill.app.resources.requests.memory"?: string;
  "windmill.app.extraEnv"?: string;
  "windmill.app.initContainers"?: string;
  "windmill.app.extraContainers"?: string;
  "windmill.app.volumes"?: string;
  "windmill.app.volumeMounts"?: string;
  "windmill.app.autoscaling.enabled"?: string;
  "windmill.app.autoscaling.maxReplicas"?: string;
  "windmill.app.autoscaling.targetCPUUtilizationPercentage"?: string;
  "windmill.app.smtpService.enabled"?: string;
  "windmill.app.topologySpreadConstraints"?: string;
  "windmill.lsp.tag"?: string;
  "windmill.lsp.enabled"?: string;
  "windmill.lsp.tolerations"?: string;
  "windmill.lsp.securityContext"?: string;
  "windmill.lsp.podSecurityContext.runAsUser"?: string;
  "windmill.lsp.podSecurityContext.runAsNonRoot"?: string;
  "windmill.lsp.resources.limits.memory"?: string;
  "windmill.lsp.resources.requests.memory"?: string;
  "windmill.lsp.extraEnv"?: string;
  "windmill.lsp.autoscaling.enabled"?: string;
  "windmill.lsp.autoscaling.maxReplicas"?: string;
  "windmill.lsp.autoscaling.targetCPUUtilizationPercentage"?: string;
  "windmill.multiplayer.tag"?: string;
  "windmill.multiplayer.enabled"?: string;
  "windmill.multiplayer.tolerations"?: string;
  "windmill.multiplayer.securityContext"?: string;
  "windmill.multiplayer.podSecurityContext.runAsUser"?: string;
  "windmill.multiplayer.podSecurityContext.runAsNonRoot"?: string;
  "windmill.multiplayer.resources.limits.memory"?: string;
  "windmill.multiplayer.resources.requests.memory"?: string;
  "windmill.multiplayer.extraEnv"?: string;
  "windmill.multiplayer.autoscaling.enabled"?: string;
  "windmill.multiplayer.autoscaling.maxReplicas"?: string;
  "windmill.multiplayer.autoscaling.targetCPUUtilizationPercentage"?: string;
  "windmill.indexer.enabled"?: string;
  "windmill.indexer.tolerations"?: string;
  "windmill.indexer.securityContext"?: string;
  "windmill.indexer.podSecurityContext.runAsUser"?: string;
  "windmill.indexer.podSecurityContext.runAsNonRoot"?: string;
  "windmill.indexer.resources.limits.memory"?: string;
  "windmill.indexer.resources.limits.ephemeral-storage"?: string;
  "windmill.indexer.resources.requests.memory"?: string;
  "windmill.indexer.resources.requests.ephemeral-storage"?: string;
  "windmill.indexer.extraContainers"?: string;
  "windmill.indexer.extraEnv"?: string;
  "ingress.enabled"?: string;
  "ingress.className"?: string;
  "ingress.tls"?: string;
  "enterprise.enabled"?: string;
  "enterprise.licenseKeySecretName"?: string;
  "enterprise.licenseKeySecretKey"?: string;
  "enterprise.licenseKey"?: string;
  "enterprise.enabledS3DistributedCache"?: string;
  "enterprise.s3CacheBucket"?: string;
  "enterprise.samlMetadata"?: string;
  "enterprise.scimToken"?: string;
  "enterprise.scimTokenSecretName"?: string;
  "enterprise.scimTokenSecretKey"?: string;
  "enterprise.nsjail"?: string;
  "enterprise.createKubernetesAutoscalingRolesAndBindings"?: string;
  "serviceAccount.create"?: string;
  "serviceAccount.name"?: string;
  "serviceAccount.automountServiceAccountToken"?: string;
  "hub.enabled"?: string;
  "hub.licenseKey"?: string;
  "hub.replicas"?: string;
  "hub.image"?: string;
  "hub.tag"?: string;
  "hub.databaseUrlSecretName"?: string;
  "hub.databaseUrlSecretKey"?: string;
  "hub.databaseUrl"?: string;
  "hub.databaseSecret"?: string;
  "hub.baseDomain"?: string;
  "hub.baseProtocol"?: string;
  "hub.apiSecretSecretName"?: string;
  "hub.apiSecretSecretKey"?: string;
  "hub.apiSecret"?: string;
  "hub.tolerations"?: string;
  "hub.securityContext"?: string;
  "hub.podSecurityContext.runAsUser"?: string;
  "hub.podSecurityContext.runAsNonRoot"?: string;
  "hub.resources.limits.memory"?: string;
  "hub.resources.requests.memory"?: string;
  "hub.extraEnv"?: string;
  "hub-postgresql.enabled"?: string;
  "hub-postgresql.resources.limits.memory"?: string;
  "hub-postgresql.resources.requests.memory"?: string;
  "hub-postgresql.auth.postgresUser"?: string;
  "hub-postgresql.auth.postgresPassword"?: string;
  "hub-postgresql.auth.database"?: string;
  "hub-postgresql.persistence.enabled"?: string;
  "hub-postgresql.persistence.storageClass"?: string;
  "hub-postgresql.persistence.accessMode"?: string;
  "hub-postgresql.persistence.size"?: string;
  extraDeploy?: string;
};
