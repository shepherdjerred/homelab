// Generated TypeScript types for gitlab Helm chart

export type GitlabHelmValuesGlobal = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default {"labels":{}}
   */
  common?: GitlabHelmValuesGlobalCommon;
  /**
   * Registry value override is only available for the following Charts:
   * - Spamcheck
   * - Mailroom
   * If specifying a value here, be sure to also configure
   * `gitlab.<subchart>.image.repository` to a value that does not
   * include the default registry domain `registry.gitlab.com`.
   * Support for other charts is coming as an iterative rollout.
   * See https://gitlab.com/gitlab-org/charts/gitlab/-/issues/2859
   * for more information.
   *
   * @default {}
   */
  image?: GitlabHelmValuesGlobalImage;
  /**
   * Supplemental Pod labels. Will not be used for selectors.
   *
   * @default {"labels":{}}
   */
  pod?: GitlabHelmValuesGlobalPod;
  /**
   * https://docs.gitlab.com/charts/installation/deployment#deploy-the-community-edition
   *
   * @default "ee"
   */
  edition?: string;
  /**
   * https://docs.gitlab.com/charts/charts/globals#gitlab-version
   *
   * @default "18.7.0"
   */
  gitlabVersion?: string;
  /**
   * https://docs.gitlab.com/charts/charts/globals#application-resource
   *
   * @default {"create":false,"links":[],"allowClusterRoles":true}
   */
  application?: GitlabHelmValuesGlobalApplication;
  /**
   * https://docs.gitlab.com/charts/charts/globals#configure-host-settings
   *
   * @default {...} (14 keys)
   */
  hosts?: GitlabHelmValuesGlobalHosts;
  /**
   * @default {...} (8 keys)
   */
  gatewayApi?: GitlabHelmValuesGlobalGatewayApi;
  /**
   * https://docs.gitlab.com/charts/charts/globals#configure-ingress-settings
   *
   * @default {...} (9 keys)
   */
  ingress?: GitlabHelmValuesGlobalIngress;
  /**
   * Override the API version to use for HorizontalPodAutoscaler
   *
   * @default {"apiVersion":""}
   */
  hpa?: GitlabHelmValuesGlobalHpa;
  /**
   * Enable KEDA globally (https://keda.sh/)
   *
   * @default {"enabled":false}
   */
  keda?: GitlabHelmValuesGlobalKeda;
  /**
   * Override the API version to use for PodDisruptionBudget
   *
   * @default {"apiVersion":""}
   */
  pdb?: GitlabHelmValuesGlobalPdb;
  /**
   * Override the API version to use for CronJob
   *
   * @default {"cronJob":{"apiVersion":""}}
   */
  batch?: GitlabHelmValuesGlobalBatch;
  /**
   * Override enablement of ServiceMonitor and PodMonitor objects.
   *
   * @default {"enabled":false}
   */
  monitoring?: GitlabHelmValuesGlobalMonitoring;
  /**
   * @default {"license":{}}
   */
  gitlab?: GitlabHelmValuesGlobalGitlab;
  /**
   * Initial root password for this GitLab installation
   * Secret created according to https://docs.gitlab.com/charts/installation/secrets#initial-root-password
   * If allowing shared-secrets generation, this is OPTIONAL.
   *
   * @default {}
   */
  initialRootPassword?: GitlabHelmValuesGlobalInitialRootPassword;
  /**
   * https://docs.gitlab.com/charts/charts/globals#configure-postgresql-settings
   *
   * @default {...} (10 keys)
   */
  psql?: GitlabHelmValuesGlobalPsql;
  /**
   * https://docs.gitlab.com/charts/charts/globals#configure-redis-settings
   *
   * @default {"auth":{"enabled":true},"sentinelAuth":{"enabled":false}}
   */
  redis?: GitlabHelmValuesGlobalRedis;
  /**
   * @default {...} (6 keys)
   */
  gitaly?: GitlabHelmValuesGlobalGitaly;
  /**
   * @default {...} (10 keys)
   */
  praefect?: GitlabHelmValuesGlobalPraefect;
  /**
   * @default {"enabled":true,"credentials":{}}
   */
  minio?: GitlabHelmValuesGlobalMinio;
  /**
   * @default {...} (47 keys)
   */
  appConfig?: GitlabHelmValuesGlobalAppConfig;
  /**
   * End of global.appConfig
   *
   * @default {"gitlab-pages":{}}
   */
  oauth?: GitlabHelmValuesGlobalOauth;
  /**
   * @default {...} (5 keys)
   */
  geo?: GitlabHelmValuesGlobalGeo;
  /**
   * @default {"enabled":true,"service":{"apiExternalPort":8153},"tls":{"enabled":false,"verify":true}}
   */
  kas?: GitlabHelmValuesGlobalKas;
  /**
   * @default {"enabled":false}
   */
  workspaces?: GitlabHelmValuesGlobalWorkspaces;
  /**
   * https://docs.gitlab.com/charts/charts/gitlab/spamcheck/
   *
   * @default {"enabled":false}
   */
  spamcheck?: GitlabHelmValuesGlobalSpamcheck;
  /**
   * https://docs.gitlab.com/charts/charts/globals#configure-gitlab-shell
   *
   * @default {"authToken":{},"hostKeys":{},"tcp":{"proxyProtocol":false}}
   */
  shell?: GitlabHelmValuesGlobalShell;
  /**
   * Rails application secrets
   * Secret created according to https://docs.gitlab.com/charts/installation/secrets#gitlab-rails-secret
   * If allowing shared-secrets generation, this is OPTIONAL.
   *
   * @default {}
   */
  railsSecrets?: GitlabHelmValuesGlobalRailsSecrets;
  /**
   * Rails generic setting, applicable to all Rails-based containers
   *
   * @default {"bootsnap":{"enabled":true},"sessionStore":{"sessionCookieTokenPrefix":""}}
   */
  rails?: GitlabHelmValuesGlobalRails;
  /**
   * https://docs.gitlab.com/charts/charts/globals#configure-registry-settings
   *
   * @default {...} (12 keys)
   */
  registry?: GitlabHelmValuesGlobalRegistry;
  /**
   * @default {...} (15 keys)
   */
  pages?: GitlabHelmValuesGlobalPages;
  /**
   * GitLab Runner
   * Secret created according to https://docs.gitlab.com/charts/installation/secrets#gitlab-runner-secret
   * If allowing shared-secrets generation, this is OPTIONAL.
   *
   * @default {"registrationToken":{}}
   */
  runner?: GitlabHelmValuesGlobalRunner;
  /**
   * @default {...} (11 keys)
   */
  smtp?: GitlabHelmValuesGlobalSmtp;
  /**
   * https://docs.gitlab.com/charts/charts/globals#outgoing-email
   * Email persona used in email sent by GitLab
   *
   * @default {...} (5 keys)
   */
  email?: GitlabHelmValuesGlobalEmail;
  /**
   * Timezone for containers.
   *
   * @default "UTC"
   */
  time_zone?: string;
  /**
   * Global Service Annotations and Labels
   *
   * @default {"labels":{},"annotations":{}}
   */
  service?: GitlabHelmValuesGlobalService;
  /**
   * Global Deployment Annotations
   *
   * @default {"annotations":{}}
   */
  deployment?: GitlabHelmValuesGlobalDeployment;
  nodeAffinity?: unknown;
  /**
   * @default "soft"
   */
  antiAffinity?: string;
  /**
   * @default {"podAntiAffinity":{"topologyKey":"kubernetes.io/hostname"},"nodeAffinity":{"key":"topology.kubernetes.io/zone","values":[]}}
   */
  affinity?: GitlabHelmValuesGlobalAffinity;
  /**
   * Priority class assigned to pods, may be overridden for individual components
   * https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/
   *
   * @default ""
   */
  priorityClassName?: string;
  /**
   * https://docs.gitlab.com/charts/charts/globals#configure-workhorse-settings
   * Global settings related to Workhorse
   *
   * @default {"serviceName":"webservice-default","tls":{"enabled":false}}
   */
  workhorse?: GitlabHelmValuesGlobalWorkhorse;
  /**
   * https://docs.gitlab.com/charts/charts/globals#configure-webservice
   *
   * @default {"workerTimeout":60}
   */
  webservice?: GitlabHelmValuesGlobalWebservice;
  /**
   * https://docs.gitlab.com/charts/charts/globals#custom-certificate-authorities
   * configuration of certificates container & custom CA injection
   * kubectl image used by hooks to carry out specific jobs
   *
   * @default {"image":{"repository":"registry.gitlab.com/gitlab-org/build/cng/certificates"},"customCAs":[]}
   */
  certificates?: GitlabHelmValuesGlobalCertificates;
  /**
   * @default {"image":{"repository":"registry.gitlab.com/gitlab-org/build/cng/kubectl"},"securityContext":{"runAsUser":65534,"fsGroup":65534,"seccompProfile":{"type":"RuntimeDefault"}}}
   */
  kubectl?: GitlabHelmValuesGlobalKubectl;
  /**
   * @default {"image":{"repository":"registry.gitlab.com/gitlab-org/build/cng/gitlab-base"}}
   */
  gitlabBase?: GitlabHelmValuesGlobalGitlabBase;
  /**
   * https://docs.gitlab.com/charts/charts/globals#service-accounts
   * Name to be used for serviceAccount, otherwise defaults to chart fullname
   * https://docs.gitlab.com/charts/charts/globals/#tracing
   *
   * @default {...} (4 keys)
   */
  serviceAccount?: GitlabHelmValuesGlobalServiceAccount;
  /**
   * @default {"connection":{"string":""},"urlTemplate":""}
   */
  tracing?: GitlabHelmValuesGlobalTracing;
  /**
   * @default {"gateway":{"basicAuth":{}},"indexer":{"internalApi":{}}}
   */
  zoekt?: GitlabHelmValuesGlobalZoekt;
  /**
   * https://docs.gitlab.com/ci/secrets/
   * Experimental, unsupported
   *
   * @default {...} (5 keys)
   */
  openbao?: GitlabHelmValuesGlobalOpenbao;
  /**
   * https://docs.gitlab.com/charts/charts/globals
   *
   * @default {}
   */
  extraEnv?: GitlabHelmValuesGlobalExtraEnv;
  /**
   * https://docs.gitlab.com/charts/charts/globals
   *
   * @default {}
   */
  extraEnvFrom?: GitlabHelmValuesGlobalExtraEnvFrom;
  /**
   * https://docs.gitlab.com/charts/charts/globals/#jobs
   *
   * @default {"nameSuffixOverride":null}
   */
  job?: GitlabHelmValuesGlobalJob;
  /**
   * @default {"apiVersion":""}
   */
  traefik?: GitlabHelmValuesGlobalTraefik;
};

export type GitlabHelmValuesGlobalCommon = {
  /**
   * @default {}
   */
  labels?: GitlabHelmValuesGlobalCommonLabels;
};

export type GitlabHelmValuesGlobalCommonLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalImage = object;

export type GitlabHelmValuesGlobalPod = {
  /**
   * @default {}
   */
  labels?: GitlabHelmValuesGlobalPodLabels;
};

export type GitlabHelmValuesGlobalPodLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalApplication = {
  /**
   * @default false
   */
  create?: boolean;
  links?: unknown[];
  /**
   * @default true
   */
  allowClusterRoles?: boolean;
};

export type GitlabHelmValuesGlobalHosts = {
  /**
   * @default "example.com"
   */
  domain?: string;
  hostSuffix?: unknown;
  /**
   * @default true
   */
  https?: boolean;
  externalIP?: unknown;
  ssh?: unknown;
  /**
   * @default {}
   */
  gitlab?: GitlabHelmValuesGlobalHostsGitlab;
  /**
   * @default {}
   */
  minio?: GitlabHelmValuesGlobalHostsMinio;
  /**
   * @default {}
   */
  registry?: GitlabHelmValuesGlobalHostsRegistry;
  /**
   * @default {}
   */
  tls?: GitlabHelmValuesGlobalHostsTls;
  /**
   * @default {}
   */
  smartcard?: GitlabHelmValuesGlobalHostsSmartcard;
  /**
   * @default {}
   */
  kas?: GitlabHelmValuesGlobalHostsKas;
  /**
   * @default {}
   */
  pages?: GitlabHelmValuesGlobalHostsPages;
  /**
   * @default {}
   */
  openbao?: GitlabHelmValuesGlobalHostsOpenbao;
  /**
   * @default {}
   */
  workspaces?: GitlabHelmValuesGlobalHostsWorkspaces;
};

export type GitlabHelmValuesGlobalHostsGitlab = object;

export type GitlabHelmValuesGlobalHostsMinio = object;

export type GitlabHelmValuesGlobalHostsRegistry = object;

export type GitlabHelmValuesGlobalHostsTls = object;

export type GitlabHelmValuesGlobalHostsSmartcard = object;

export type GitlabHelmValuesGlobalHostsKas = object;

export type GitlabHelmValuesGlobalHostsPages = object;

export type GitlabHelmValuesGlobalHostsOpenbao = object;

export type GitlabHelmValuesGlobalHostsWorkspaces = object;

export type GitlabHelmValuesGlobalGatewayApi = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default {"provider":{"type":"Kubernetes","kubernetes":{"envoyService":{"type":"LoadBalancer"}}}}
   */
  envoyProxySpec?: GitlabHelmValuesGlobalGatewayApiEnvoyProxySpec;
  /**
   * @default {"name":"gitlab-gw","controllerName":"gateway.envoyproxy.io/gitlab-gatewayclass-controller"}
   */
  class?: GitlabHelmValuesGlobalGatewayApiClass;
  /**
   * @default false
   */
  installEnvoy?: boolean;
  /**
   * @default false
   */
  configureCertmanager?: boolean;
  /**
   * @default "HTTPS"
   */
  protocol?: string;
  addresses?: unknown[];
  /**
   * @default {...} (9 keys)
   */
  listeners?: GitlabHelmValuesGlobalGatewayApiListeners;
};

export type GitlabHelmValuesGlobalGatewayApiEnvoyProxySpec = {
  /**
   * @default {"type":"Kubernetes","kubernetes":{"envoyService":{"type":"LoadBalancer"}}}
   */
  provider?: GitlabHelmValuesGlobalGatewayApiEnvoyProxySpecProvider;
};

export type GitlabHelmValuesGlobalGatewayApiEnvoyProxySpecProvider = {
  /**
   * @default "Kubernetes"
   */
  type?: string;
  /**
   * @default {"envoyService":{"type":"LoadBalancer"}}
   */
  kubernetes?: GitlabHelmValuesGlobalGatewayApiEnvoyProxySpecProviderKubernetes;
};

export type GitlabHelmValuesGlobalGatewayApiEnvoyProxySpecProviderKubernetes = {
  /**
   * @default {"type":"LoadBalancer"}
   */
  envoyService?: GitlabHelmValuesGlobalGatewayApiEnvoyProxySpecProviderKubernetesEnvoyService;
};

export type GitlabHelmValuesGlobalGatewayApiEnvoyProxySpecProviderKubernetesEnvoyService = {
  /**
   * @default "LoadBalancer"
   */
  type?: string;
};

export type GitlabHelmValuesGlobalGatewayApiClass = {
  /**
   * @default "gitlab-gw"
   */
  name?: string;
  /**
   * @default "gateway.envoyproxy.io/gitlab-gatewayclass-contr..."
   */
  controllerName?: string;
};

export type GitlabHelmValuesGlobalGatewayApiListeners = {
  /**
   * @default {"protocol":"HTTP"}
   */
  "certmanager-http"?: GitlabHelmValuesGlobalGatewayApiListenersCertmanagerhttp;
  /**
   * @default {"protocol":"","tls":{"mode":"Terminate","certificateRefs":[{"name":"gitlab-tls"}]}}
   */
  "gitlab-web"?: GitlabHelmValuesGlobalGatewayApiListenersGitlabweb;
  /**
   * @default {"protocol":"TCP"}
   */
  "gitlab-ssh"?: GitlabHelmValuesGlobalGatewayApiListenersGitlabssh;
  /**
   * @default {"protocol":"","tls":{"mode":"Terminate","certificateRefs":[{"name":"registry-tls"}]}}
   */
  "registry-web"?: GitlabHelmValuesGlobalGatewayApiListenersRegistryweb;
  /**
   * @default {"protocol":"","tls":{"mode":"Terminate","certificateRefs":[{"name":"pages-tls"}]}}
   */
  "pages-web"?: GitlabHelmValuesGlobalGatewayApiListenersPagesweb;
  /**
   * @default {"protocol":"","tls":{"mode":"Terminate","certificateRefs":[{"name":"kas-tls"}]}}
   */
  "kas-web"?: GitlabHelmValuesGlobalGatewayApiListenersKasweb;
  /**
   * @default {"protocol":"","tls":{"mode":"Terminate","certificateRefs":[{"name":"kas-workspaces-tls"}]}}
   */
  "kas-workspaces-web"?: GitlabHelmValuesGlobalGatewayApiListenersKasworkspacesweb;
  /**
   * @default {"protocol":"","tls":{"mode":"Terminate","certificateRefs":[{"name":"kas-workspaces-tls"}]}}
   */
  "kas-registry-web"?: GitlabHelmValuesGlobalGatewayApiListenersKasregistryweb;
  /**
   * @default {"protocol":"","tls":{"mode":"Terminate","certificateRefs":[{"name":"minio-tls"}]}}
   */
  "minio-web"?: GitlabHelmValuesGlobalGatewayApiListenersMinioweb;
};

export type GitlabHelmValuesGlobalGatewayApiListenersCertmanagerhttp = {
  /**
   * @default "HTTP"
   */
  protocol?: string;
};

export type GitlabHelmValuesGlobalGatewayApiListenersGitlabweb = {
  /**
   * @default ""
   */
  protocol?: string;
  /**
   * @default {"mode":"Terminate","certificateRefs":[{"name":"gitlab-tls"}]}
   */
  tls?: GitlabHelmValuesGlobalGatewayApiListenersGitlabwebTls;
};

export type GitlabHelmValuesGlobalGatewayApiListenersGitlabwebTls = {
  /**
   * @default "Terminate"
   */
  mode?: string;
  certificateRefs?: GitlabHelmValuesGlobalGatewayApiListenersGitlabwebTlsCertificateRefsElement[];
};

export type GitlabHelmValuesGlobalGatewayApiListenersGitlabwebTlsCertificateRefsElement = {
  /**
   * @default "gitlab-tls"
   */
  name?: string;
};

export type GitlabHelmValuesGlobalGatewayApiListenersGitlabssh = {
  /**
   * @default "TCP"
   */
  protocol?: string;
};

export type GitlabHelmValuesGlobalGatewayApiListenersRegistryweb = {
  /**
   * @default ""
   */
  protocol?: string;
  /**
   * @default {"mode":"Terminate","certificateRefs":[{"name":"registry-tls"}]}
   */
  tls?: GitlabHelmValuesGlobalGatewayApiListenersRegistrywebTls;
};

export type GitlabHelmValuesGlobalGatewayApiListenersRegistrywebTls = {
  /**
   * @default "Terminate"
   */
  mode?: string;
  certificateRefs?: GitlabHelmValuesGlobalGatewayApiListenersRegistrywebTlsCertificateRefsElement[];
};

export type GitlabHelmValuesGlobalGatewayApiListenersRegistrywebTlsCertificateRefsElement = {
  /**
   * @default "registry-tls"
   */
  name?: string;
};

export type GitlabHelmValuesGlobalGatewayApiListenersPagesweb = {
  /**
   * @default ""
   */
  protocol?: string;
  /**
   * @default {"mode":"Terminate","certificateRefs":[{"name":"pages-tls"}]}
   */
  tls?: GitlabHelmValuesGlobalGatewayApiListenersPageswebTls;
};

export type GitlabHelmValuesGlobalGatewayApiListenersPageswebTls = {
  /**
   * @default "Terminate"
   */
  mode?: string;
  certificateRefs?: GitlabHelmValuesGlobalGatewayApiListenersPageswebTlsCertificateRefsElement[];
};

export type GitlabHelmValuesGlobalGatewayApiListenersPageswebTlsCertificateRefsElement = {
  /**
   * @default "pages-tls"
   */
  name?: string;
};

export type GitlabHelmValuesGlobalGatewayApiListenersKasweb = {
  /**
   * @default ""
   */
  protocol?: string;
  /**
   * @default {"mode":"Terminate","certificateRefs":[{"name":"kas-tls"}]}
   */
  tls?: GitlabHelmValuesGlobalGatewayApiListenersKaswebTls;
};

export type GitlabHelmValuesGlobalGatewayApiListenersKaswebTls = {
  /**
   * @default "Terminate"
   */
  mode?: string;
  certificateRefs?: GitlabHelmValuesGlobalGatewayApiListenersKaswebTlsCertificateRefsElement[];
};

export type GitlabHelmValuesGlobalGatewayApiListenersKaswebTlsCertificateRefsElement = {
  /**
   * @default "kas-tls"
   */
  name?: string;
};

export type GitlabHelmValuesGlobalGatewayApiListenersKasworkspacesweb = {
  /**
   * @default ""
   */
  protocol?: string;
  /**
   * @default {"mode":"Terminate","certificateRefs":[{"name":"kas-workspaces-tls"}]}
   */
  tls?: GitlabHelmValuesGlobalGatewayApiListenersKasworkspaceswebTls;
};

export type GitlabHelmValuesGlobalGatewayApiListenersKasworkspaceswebTls = {
  /**
   * @default "Terminate"
   */
  mode?: string;
  certificateRefs?: GitlabHelmValuesGlobalGatewayApiListenersKasworkspaceswebTlsCertificateRefsElement[];
};

export type GitlabHelmValuesGlobalGatewayApiListenersKasworkspaceswebTlsCertificateRefsElement = {
  /**
   * @default "kas-workspaces-tls"
   */
  name?: string;
};

export type GitlabHelmValuesGlobalGatewayApiListenersKasregistryweb = {
  /**
   * @default ""
   */
  protocol?: string;
  /**
   * @default {"mode":"Terminate","certificateRefs":[{"name":"kas-workspaces-tls"}]}
   */
  tls?: GitlabHelmValuesGlobalGatewayApiListenersKasregistrywebTls;
};

export type GitlabHelmValuesGlobalGatewayApiListenersKasregistrywebTls = {
  /**
   * @default "Terminate"
   */
  mode?: string;
  certificateRefs?: GitlabHelmValuesGlobalGatewayApiListenersKasregistrywebTlsCertificateRefsElement[];
};

export type GitlabHelmValuesGlobalGatewayApiListenersKasregistrywebTlsCertificateRefsElement = {
  /**
   * @default "kas-workspaces-tls"
   */
  name?: string;
};

export type GitlabHelmValuesGlobalGatewayApiListenersMinioweb = {
  /**
   * @default ""
   */
  protocol?: string;
  /**
   * @default {"mode":"Terminate","certificateRefs":[{"name":"minio-tls"}]}
   */
  tls?: GitlabHelmValuesGlobalGatewayApiListenersMiniowebTls;
};

export type GitlabHelmValuesGlobalGatewayApiListenersMiniowebTls = {
  /**
   * @default "Terminate"
   */
  mode?: string;
  certificateRefs?: GitlabHelmValuesGlobalGatewayApiListenersMiniowebTlsCertificateRefsElement[];
};

export type GitlabHelmValuesGlobalGatewayApiListenersMiniowebTlsCertificateRefsElement = {
  /**
   * @default "minio-tls"
   */
  name?: string;
};

export type GitlabHelmValuesGlobalIngress = {
  /**
   * @default ""
   */
  apiVersion?: string;
  /**
   * @default true
   */
  configureCertmanager?: boolean;
  /**
   * @default false
   */
  useNewIngressForCerts?: boolean;
  /**
   * @default "nginx"
   */
  provider?: string;
  /**
   * @default {}
   */
  annotations?: GitlabHelmValuesGlobalIngressAnnotations;
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {}
   */
  tls?: GitlabHelmValuesGlobalIngressTls;
  /**
   * @default "/"
   */
  path?: string;
  /**
   * @default "Prefix"
   */
  pathType?: string;
};

export type GitlabHelmValuesGlobalIngressAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalIngressTls = object;

export type GitlabHelmValuesGlobalHpa = {
  /**
   * @default ""
   */
  apiVersion?: string;
};

export type GitlabHelmValuesGlobalKeda = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalPdb = {
  /**
   * @default ""
   */
  apiVersion?: string;
};

export type GitlabHelmValuesGlobalBatch = {
  /**
   * @default {"apiVersion":""}
   */
  cronJob?: GitlabHelmValuesGlobalBatchCronJob;
};

export type GitlabHelmValuesGlobalBatchCronJob = {
  /**
   * @default ""
   */
  apiVersion?: string;
};

export type GitlabHelmValuesGlobalMonitoring = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalGitlab = {
  /**
   * Enterprise license for this GitLab installation
   * Secret created according to https://docs.gitlab.com/charts/installation/secrets#initial-enterprise-license
   * If allowing shared-secrets generation, this is OPTIONAL.
   *
   * @default {}
   */
  license?: GitlabHelmValuesGlobalGitlabLicense;
};

export type GitlabHelmValuesGlobalGitlabLicense = object;

export type GitlabHelmValuesGlobalInitialRootPassword = object;

export type GitlabHelmValuesGlobalPsql = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  knownDecompositions?: string[];
  connectTimeout?: unknown;
  keepalives?: unknown;
  keepalivesIdle?: unknown;
  keepalivesInterval?: unknown;
  keepalivesCount?: unknown;
  tcpUserTimeout?: unknown;
  /**
   * @default {}
   */
  password?: GitlabHelmValuesGlobalPsqlPassword;
  /**
   * @default {}
   */
  main?: GitlabHelmValuesGlobalPsqlMain;
  /**
   * @default {}
   */
  ci?: GitlabHelmValuesGlobalPsqlCi;
};

export type GitlabHelmValuesGlobalPsqlPassword = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalPsqlMain = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalPsqlCi = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalRedis = {
  /**
   * @default {"enabled":true}
   */
  auth?: GitlabHelmValuesGlobalRedisAuth;
  /**
   * @default {"enabled":false}
   */
  sentinelAuth?: GitlabHelmValuesGlobalRedisSentinelAuth;
};

export type GitlabHelmValuesGlobalRedisAuth = {
  /**
   * @default true
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalRedisSentinelAuth = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalGitaly = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {}
   */
  authToken?: GitlabHelmValuesGlobalGitalyAuthToken;
  /**
   * @default {"names":["default"]}
   */
  internal?: GitlabHelmValuesGlobalGitalyInternal;
  external?: unknown[];
  /**
   * @default {...} (5 keys)
   */
  service?: GitlabHelmValuesGlobalGitalyService;
  /**
   * @default {"enabled":false}
   */
  tls?: GitlabHelmValuesGlobalGitalyTls;
};

export type GitlabHelmValuesGlobalGitalyAuthToken = object;

export type GitlabHelmValuesGlobalGitalyInternal = {
  names?: string | number | boolean[];
};

export type GitlabHelmValuesGlobalGitalyService = {
  /**
   * @default "gitaly"
   */
  name?: string;
  /**
   * @default "ClusterIP"
   */
  type?: string;
  /**
   * @default 8075
   */
  externalPort?: number;
  /**
   * @default 8075
   */
  internalPort?: number;
  /**
   * @default {"externalPort":8076,"internalPort":8076}
   */
  tls?: GitlabHelmValuesGlobalGitalyServiceTls;
};

export type GitlabHelmValuesGlobalGitalyServiceTls = {
  /**
   * @default 8076
   */
  externalPort?: number;
  /**
   * @default 8076
   */
  internalPort?: number;
};

export type GitlabHelmValuesGlobalGitalyTls = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalPraefect = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default "pool.ntp.org"
   */
  ntpHost?: string;
  /**
   * @default true
   */
  replaceInternalGitaly?: boolean;
  /**
   * @default {}
   */
  authToken?: GitlabHelmValuesGlobalPraefectAuthToken;
  /**
   * @default true
   */
  autoMigrate?: boolean;
  /**
   * @default {}
   */
  dbSecret?: GitlabHelmValuesGlobalPraefectDbSecret;
  virtualStorages?: GitlabHelmValuesGlobalPraefectVirtualStoragesElement[];
  /**
   * @default {"sslMode":"disable"}
   */
  psql?: GitlabHelmValuesGlobalPraefectPsql;
  /**
   * @default {...} (5 keys)
   */
  service?: GitlabHelmValuesGlobalPraefectService;
  /**
   * @default {"enabled":false}
   */
  tls?: GitlabHelmValuesGlobalPraefectTls;
};

export type GitlabHelmValuesGlobalPraefectAuthToken = object;

export type GitlabHelmValuesGlobalPraefectDbSecret = object;

export type GitlabHelmValuesGlobalPraefectVirtualStoragesElement = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "default"
   */
  name?: string | number | boolean;
  /**
   * @default 3
   */
  gitalyReplicas?: number;
  /**
   * @default 1
   */
  maxUnavailable?: number;
};

export type GitlabHelmValuesGlobalPraefectPsql = {
  /**
   * @default "disable"
   */
  sslMode?: string;
};

export type GitlabHelmValuesGlobalPraefectService = {
  /**
   * @default "praefect"
   */
  name?: string;
  /**
   * @default "ClusterIP"
   */
  type?: string;
  /**
   * @default 8075
   */
  externalPort?: number;
  /**
   * @default 8075
   */
  internalPort?: number;
  /**
   * @default {"externalPort":8076,"internalPort":8076}
   */
  tls?: GitlabHelmValuesGlobalPraefectServiceTls;
};

export type GitlabHelmValuesGlobalPraefectServiceTls = {
  /**
   * @default 8076
   */
  externalPort?: number;
  /**
   * @default 8076
   */
  internalPort?: number;
};

export type GitlabHelmValuesGlobalPraefectTls = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalMinio = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {}
   */
  credentials?: GitlabHelmValuesGlobalMinioCredentials;
};

export type GitlabHelmValuesGlobalMinioCredentials = object;

export type GitlabHelmValuesGlobalAppConfig = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * https://docs.gitlab.com/charts/charts/globals#general-application-settings
   *
   * @default ""
   */
  relativeUrlRoot?: string;
  /**
   * @default true
   */
  enableUsagePing?: boolean;
  /**
   * @default true
   */
  enableSeatLink?: boolean;
  enableImpersonation?: unknown;
  /**
   * @default 60
   */
  applicationSettingsCacheSeconds?: number;
  /**
   * @default true
   */
  usernameChangingEnabled?: boolean;
  issueClosingPattern?: unknown;
  defaultTheme?: unknown;
  defaultColorMode?: unknown;
  defaultSyntaxHighlightingTheme?: unknown;
  /**
   * @default {...} (5 keys)
   */
  defaultProjectsFeatures?: GitlabHelmValuesGlobalAppConfigDefaultProjectsFeatures;
  graphQlTimeout?: unknown;
  webhookTimeout?: unknown;
  maxRequestDurationSeconds?: unknown;
  /**
   * @default {"issuerUrl":""}
   */
  ciIdTokens?: GitlabHelmValuesGlobalAppConfigCiIdTokens;
  /**
   * https://docs.gitlab.com/charts/charts/globals#cron-jobs-related-settings
   * Flag stuck CI builds as failed
   * Schedule pipelines in the near future
   * Remove expired build artifacts
   * Periodically run 'git fsck' on all repositories.
   * Send admin emails once a week
   * Remove outdated repository archives
   * Verify custom GitLab Pages domains
   *
   * @default {}
   */
  cron_jobs?: GitlabHelmValuesGlobalAppConfigCronjobs;
  /**
   * @default {"enabled":false,"report_only":true}
   */
  contentSecurityPolicy?: GitlabHelmValuesGlobalAppConfigContentSecurityPolicy;
  /**
   * https://docs.gitlab.com/charts/charts/globals#gravatarlibravatar-settings
   *
   * @default {"plainUrl":null,"sslUrl":null}
   */
  gravatar?: GitlabHelmValuesGlobalAppConfigGravatar;
  /**
   * @default {...} (7 keys)
   */
  extra?: GitlabHelmValuesGlobalAppConfigExtra;
  /**
   * @default {...} (4 keys)
   */
  object_store?: GitlabHelmValuesGlobalAppConfigObjectstore;
  /**
   * @default {...} (4 keys)
   */
  lfs?: GitlabHelmValuesGlobalAppConfigLfs;
  /**
   * @default {...} (4 keys)
   */
  artifacts?: GitlabHelmValuesGlobalAppConfigArtifacts;
  /**
   * @default {...} (4 keys)
   */
  uploads?: GitlabHelmValuesGlobalAppConfigUploads;
  /**
   * @default {...} (4 keys)
   */
  packages?: GitlabHelmValuesGlobalAppConfigPackages;
  /**
   * @default {...} (5 keys)
   */
  externalDiffs?: GitlabHelmValuesGlobalAppConfigExternalDiffs;
  /**
   * @default {"enabled":false,"bucket":"gitlab-terraform-state","connection":{}}
   */
  terraformState?: GitlabHelmValuesGlobalAppConfigTerraformState;
  /**
   * @default {"enabled":false,"bucket":"gitlab-ci-secure-files","connection":{}}
   */
  ciSecureFiles?: GitlabHelmValuesGlobalAppConfigCiSecureFiles;
  /**
   * @default {...} (4 keys)
   */
  dependencyProxy?: GitlabHelmValuesGlobalAppConfigDependencyProxy;
  /**
   * @default {"bucket":"gitlab-backups","tmpBucket":"tmp"}
   */
  backups?: GitlabHelmValuesGlobalAppConfigBackups;
  /**
   * https://docs.gitlab.com/charts/charts/globals#outgoing-email
   * Microsoft Graph Mailer settings
   *
   * @default {...} (7 keys)
   */
  microsoft_graph_mailer?: GitlabHelmValuesGlobalAppConfigMicrosoftgraphmailer;
  /**
   * https://docs.gitlab.com/charts/installation/command-line-options.html#incoming-email-configuration
   * https://docs.gitlab.com/charts/charts/gitlab/mailroom/index.html#incoming-email
   *
   * @default {...} (18 keys)
   */
  incomingEmail?: GitlabHelmValuesGlobalAppConfigIncomingEmail;
  /**
   * @default {...} (18 keys)
   */
  serviceDeskEmail?: GitlabHelmValuesGlobalAppConfigServiceDeskEmail;
  /**
   * See documentation for complete example of a configured LDAP server
   *
   * @default {"preventSignin":false,"servers":{}}
   */
  ldap?: GitlabHelmValuesGlobalAppConfigLdap;
  /**
   * @default {"enabled":false}
   */
  duoAuth?: GitlabHelmValuesGlobalAppConfigDuoAuth;
  /**
   * @default {}
   */
  gitlab_kas?: GitlabHelmValuesGlobalAppConfigGitlabkas;
  /**
   * @default {}
   */
  workspaces?: GitlabHelmValuesGlobalAppConfigWorkspaces;
  /**
   * Configure GitLab Cells. Cells is a GitLab internal-use experiment.
   * https://docs.gitlab.com/administration/cells/
   *
   * @default {"enabled":false,"database":{"skipSequenceAlteration":false},"topologyServiceClient":{"tls":{"enabled":false}}}
   */
  cell?: GitlabHelmValuesGlobalAppConfigCell;
  /**
   * @default {}
   */
  suggested_reviewers?: GitlabHelmValuesGlobalAppConfigSuggestedreviewers;
  /**
   * https://docs.gitlab.com/charts/charts/globals#omniauth
   * https://docs.gitlab.com/charts/charts/globals#kerberos
   *
   * @default {...} (12 keys)
   */
  omniauth?: GitlabHelmValuesGlobalAppConfigOmniauth;
  /**
   * @default {...} (6 keys)
   */
  kerberos?: GitlabHelmValuesGlobalAppConfigKerberos;
  /**
   * https://docs.gitlab.com/charts/charts/globals#configure-appconfig-settings
   *
   * @default {...} (4 keys)
   */
  sentry?: GitlabHelmValuesGlobalAppConfigSentry;
  /**
   * @default {"enabled":false,"host":""}
   */
  gitlab_docs?: GitlabHelmValuesGlobalAppConfigGitlabdocs;
  /**
   * @default {"openidIdTokenExpireInSeconds":120}
   */
  oidcProvider?: GitlabHelmValuesGlobalAppConfigOidcProvider;
  /**
   * @default {...} (5 keys)
   */
  smartcard?: GitlabHelmValuesGlobalAppConfigSmartcard;
  /**
   * @default {"routingRules":[]}
   */
  sidekiq?: GitlabHelmValuesGlobalAppConfigSidekiq;
  /**
   * Config that only applies to the defaults on initial install
   *
   * @default {}
   */
  initialDefaults?: GitlabHelmValuesGlobalAppConfigInitialDefaults;
  actionCableAllowedOrigins?: unknown[];
};

export type GitlabHelmValuesGlobalAppConfigDefaultProjectsFeatures = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  issues?: boolean;
  /**
   * @default true
   */
  mergeRequests?: boolean;
  /**
   * @default true
   */
  wiki?: boolean;
  /**
   * @default true
   */
  snippets?: boolean;
  /**
   * @default true
   */
  builds?: boolean;
};

export type GitlabHelmValuesGlobalAppConfigCiIdTokens = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default ""
   */
  issuerUrl?: string;
};

export type GitlabHelmValuesGlobalAppConfigCronjobs = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigContentSecurityPolicy = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default true
   */
  report_only?: boolean;
};

export type GitlabHelmValuesGlobalAppConfigGravatar = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  plainUrl?: unknown;
  sslUrl?: unknown;
};

export type GitlabHelmValuesGlobalAppConfigExtra = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  googleAnalyticsId?: unknown;
  matomoUrl?: unknown;
  matomoSiteId?: unknown;
  matomoDisableCookies?: unknown;
  oneTrustId?: unknown;
  googleTagManagerNonceId?: unknown;
  bizible?: unknown;
};

export type GitlabHelmValuesGlobalAppConfigObjectstore = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default true
   */
  proxy_download?: boolean;
  /**
   * @default {}
   */
  storage_options?: GitlabHelmValuesGlobalAppConfigObjectstoreStorageoptions;
  /**
   * @default {}
   */
  connection?: GitlabHelmValuesGlobalAppConfigObjectstoreConnection;
};

export type GitlabHelmValuesGlobalAppConfigObjectstoreStorageoptions = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigObjectstoreConnection = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigLfs = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default true
   */
  proxy_download?: boolean;
  /**
   * @default "git-lfs"
   */
  bucket?: string;
  /**
   * @default {}
   */
  connection?: GitlabHelmValuesGlobalAppConfigLfsConnection;
};

export type GitlabHelmValuesGlobalAppConfigLfsConnection = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigArtifacts = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default true
   */
  proxy_download?: boolean;
  /**
   * @default "gitlab-artifacts"
   */
  bucket?: string;
  /**
   * @default {}
   */
  connection?: GitlabHelmValuesGlobalAppConfigArtifactsConnection;
};

export type GitlabHelmValuesGlobalAppConfigArtifactsConnection = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigUploads = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default true
   */
  proxy_download?: boolean;
  /**
   * @default "gitlab-uploads"
   */
  bucket?: string;
  /**
   * @default {}
   */
  connection?: GitlabHelmValuesGlobalAppConfigUploadsConnection;
};

export type GitlabHelmValuesGlobalAppConfigUploadsConnection = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigPackages = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default true
   */
  proxy_download?: boolean;
  /**
   * @default "gitlab-packages"
   */
  bucket?: string;
  /**
   * @default {}
   */
  connection?: GitlabHelmValuesGlobalAppConfigPackagesConnection;
};

export type GitlabHelmValuesGlobalAppConfigPackagesConnection = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigExternalDiffs = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  when?: unknown;
  /**
   * @default true
   */
  proxy_download?: boolean;
  /**
   * @default "gitlab-mr-diffs"
   */
  bucket?: string;
  /**
   * @default {}
   */
  connection?: GitlabHelmValuesGlobalAppConfigExternalDiffsConnection;
};

export type GitlabHelmValuesGlobalAppConfigExternalDiffsConnection = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigTerraformState = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default "gitlab-terraform-state"
   */
  bucket?: string;
  /**
   * @default {}
   */
  connection?: GitlabHelmValuesGlobalAppConfigTerraformStateConnection;
};

export type GitlabHelmValuesGlobalAppConfigTerraformStateConnection = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigCiSecureFiles = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default "gitlab-ci-secure-files"
   */
  bucket?: string;
  /**
   * @default {}
   */
  connection?: GitlabHelmValuesGlobalAppConfigCiSecureFilesConnection;
};

export type GitlabHelmValuesGlobalAppConfigCiSecureFilesConnection = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigDependencyProxy = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default true
   */
  proxy_download?: boolean;
  /**
   * @default "gitlab-dependency-proxy"
   */
  bucket?: string;
  /**
   * @default {}
   */
  connection?: GitlabHelmValuesGlobalAppConfigDependencyProxyConnection;
};

export type GitlabHelmValuesGlobalAppConfigDependencyProxyConnection = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigBackups = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "gitlab-backups"
   */
  bucket?: string;
  /**
   * @default "tmp"
   */
  tmpBucket?: string;
};

export type GitlabHelmValuesGlobalAppConfigMicrosoftgraphmailer = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default ""
   */
  user_id?: string;
  /**
   * @default ""
   */
  tenant?: string;
  /**
   * @default ""
   */
  client_id?: string;
  /**
   * @default {"secret":"","key":"secret"}
   */
  client_secret?: GitlabHelmValuesGlobalAppConfigMicrosoftgraphmailerClientsecret;
  /**
   * @default "https://login.microsoftonline.com"
   */
  azure_ad_endpoint?: string;
  /**
   * @default "https://graph.microsoft.com"
   */
  graph_endpoint?: string;
};

export type GitlabHelmValuesGlobalAppConfigMicrosoftgraphmailerClientsecret = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default ""
   */
  secret?: string;
  /**
   * @default "secret"
   */
  key?: string;
};

export type GitlabHelmValuesGlobalAppConfigIncomingEmail = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default ""
   */
  address?: string;
  /**
   * @default "imap.gmail.com"
   */
  host?: string;
  /**
   * @default 993
   */
  port?: number;
  /**
   * @default true
   */
  ssl?: boolean;
  /**
   * @default false
   */
  startTls?: boolean;
  /**
   * @default ""
   */
  user?: string;
  /**
   * @default {"secret":"","key":"password"}
   */
  password?: GitlabHelmValuesGlobalAppConfigIncomingEmailPassword;
  /**
   * @default true
   */
  deleteAfterDelivery?: boolean;
  /**
   * @default false
   */
  expungeDeleted?: boolean;
  /**
   * @default {"logPath":"/dev/stdout"}
   */
  logger?: GitlabHelmValuesGlobalAppConfigIncomingEmailLogger;
  /**
   * @default "inbox"
   */
  mailbox?: string;
  /**
   * @default 60
   */
  idleTimeout?: number;
  /**
   * @default "imap"
   */
  inboxMethod?: string;
  /**
   * @default {"key":"secret"}
   */
  clientSecret?: GitlabHelmValuesGlobalAppConfigIncomingEmailClientSecret;
  /**
   * @default 60
   */
  pollInterval?: number;
  /**
   * @default "webhook"
   */
  deliveryMethod?: string;
  /**
   * @default {}
   */
  authToken?: GitlabHelmValuesGlobalAppConfigIncomingEmailAuthToken;
};

export type GitlabHelmValuesGlobalAppConfigIncomingEmailPassword = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default ""
   */
  secret?: string;
  /**
   * @default "password"
   */
  key?: string;
};

export type GitlabHelmValuesGlobalAppConfigIncomingEmailLogger = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "/dev/stdout"
   */
  logPath?: string;
};

export type GitlabHelmValuesGlobalAppConfigIncomingEmailClientSecret = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "secret"
   */
  key?: string;
};

export type GitlabHelmValuesGlobalAppConfigIncomingEmailAuthToken = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigServiceDeskEmail = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default ""
   */
  address?: string;
  /**
   * @default "imap.gmail.com"
   */
  host?: string;
  /**
   * @default 993
   */
  port?: number;
  /**
   * @default true
   */
  ssl?: boolean;
  /**
   * @default false
   */
  startTls?: boolean;
  /**
   * @default ""
   */
  user?: string;
  /**
   * @default {"secret":"","key":"password"}
   */
  password?: GitlabHelmValuesGlobalAppConfigServiceDeskEmailPassword;
  /**
   * @default true
   */
  deleteAfterDelivery?: boolean;
  /**
   * @default false
   */
  expungeDeleted?: boolean;
  /**
   * @default {"logPath":"/dev/stdout"}
   */
  logger?: GitlabHelmValuesGlobalAppConfigServiceDeskEmailLogger;
  /**
   * @default "inbox"
   */
  mailbox?: string;
  /**
   * @default 60
   */
  idleTimeout?: number;
  /**
   * @default "imap"
   */
  inboxMethod?: string;
  /**
   * @default {"key":"secret"}
   */
  clientSecret?: GitlabHelmValuesGlobalAppConfigServiceDeskEmailClientSecret;
  /**
   * @default 60
   */
  pollInterval?: number;
  /**
   * @default "webhook"
   */
  deliveryMethod?: string;
  /**
   * @default {}
   */
  authToken?: GitlabHelmValuesGlobalAppConfigServiceDeskEmailAuthToken;
};

export type GitlabHelmValuesGlobalAppConfigServiceDeskEmailPassword = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default ""
   */
  secret?: string;
  /**
   * @default "password"
   */
  key?: string;
};

export type GitlabHelmValuesGlobalAppConfigServiceDeskEmailLogger = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "/dev/stdout"
   */
  logPath?: string;
};

export type GitlabHelmValuesGlobalAppConfigServiceDeskEmailClientSecret = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "secret"
   */
  key?: string;
};

export type GitlabHelmValuesGlobalAppConfigServiceDeskEmailAuthToken = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigLdap = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * prevent the use of LDAP for sign-in via web.
   *
   * @default false
   */
  preventSignin?: boolean;
  /**
   * @default {}
   */
  servers?: GitlabHelmValuesGlobalAppConfigLdapServers;
};

export type GitlabHelmValuesGlobalAppConfigLdapServers = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigDuoAuth = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalAppConfigGitlabkas = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigWorkspaces = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigCell = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default {"skipSequenceAlteration":false}
   */
  database?: GitlabHelmValuesGlobalAppConfigCellDatabase;
  /**
   * @default {"tls":{"enabled":false}}
   */
  topologyServiceClient?: GitlabHelmValuesGlobalAppConfigCellTopologyServiceClient;
};

export type GitlabHelmValuesGlobalAppConfigCellDatabase = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  skipSequenceAlteration?: boolean;
};

export type GitlabHelmValuesGlobalAppConfigCellTopologyServiceClient = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default {"enabled":false}
   */
  tls?: GitlabHelmValuesGlobalAppConfigCellTopologyServiceClientTls;
};

export type GitlabHelmValuesGlobalAppConfigCellTopologyServiceClientTls = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalAppConfigSuggestedreviewers = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAppConfigOmniauth = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  autoSignInWithProvider?: unknown;
  syncProfileFromProvider?: unknown[];
  syncProfileAttributes?: string[];
  allowSingleSignOn?: string[];
  /**
   * @default true
   */
  blockAutoCreatedUsers?: boolean;
  /**
   * @default false
   */
  autoLinkLdapUser?: boolean;
  /**
   * @default false
   */
  autoLinkSamlUser?: boolean;
  autoLinkUser?: unknown[];
  externalProviders?: unknown[];
  allowBypassTwoFactor?: unknown[];
  providers?: unknown[];
};

export type GitlabHelmValuesGlobalAppConfigKerberos = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default {"key":"keytab"}
   */
  keytab?: GitlabHelmValuesGlobalAppConfigKerberosKeytab;
  /**
   * @default ""
   */
  servicePrincipalName?: string;
  /**
   * @default ""
   */
  krb5Config?: string;
  /**
   * @default {"enabled":false,"port":8443,"https":true}
   */
  dedicatedPort?: GitlabHelmValuesGlobalAppConfigKerberosDedicatedPort;
  simpleLdapLinkingAllowedRealms?: unknown[];
};

export type GitlabHelmValuesGlobalAppConfigKerberosKeytab = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "keytab"
   */
  key?: string;
};

export type GitlabHelmValuesGlobalAppConfigKerberosDedicatedPort = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default 8443
   */
  port?: number;
  /**
   * @default true
   */
  https?: boolean;
};

export type GitlabHelmValuesGlobalAppConfigSentry = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  dsn?: unknown;
  clientside_dsn?: unknown;
  environment?: unknown;
};

export type GitlabHelmValuesGlobalAppConfigGitlabdocs = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default ""
   */
  host?: string;
};

export type GitlabHelmValuesGlobalAppConfigOidcProvider = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default 120
   */
  openidIdTokenExpireInSeconds?: number;
};

export type GitlabHelmValuesGlobalAppConfigSmartcard = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  CASecret?: unknown;
  clientCertificateRequiredHost?: unknown;
  /**
   * @default false
   */
  sanExtensions?: boolean;
  /**
   * @default false
   */
  requiredForGitAccess?: boolean;
};

export type GitlabHelmValuesGlobalAppConfigSidekiq = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  routingRules?: unknown[];
};

export type GitlabHelmValuesGlobalAppConfigInitialDefaults = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalOauth = {
  /**
   * @default {}
   */
  "gitlab-pages"?: GitlabHelmValuesGlobalOauthGitlabpages;
};

export type GitlabHelmValuesGlobalOauthGitlabpages = object;

export type GitlabHelmValuesGlobalGeo = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * Valid values: primary, secondary
   *
   * @default "primary"
   */
  role?: string;
  nodeName?: unknown;
  /**
   * @default {"password":{}}
   */
  psql?: GitlabHelmValuesGlobalGeoPsql;
  /**
   * @default {"replication":{"enabled":false,"primaryApiUrl":null}}
   */
  registry?: GitlabHelmValuesGlobalGeoRegistry;
};

export type GitlabHelmValuesGlobalGeoPsql = {
  /**
   * @default {}
   */
  password?: GitlabHelmValuesGlobalGeoPsqlPassword;
};

export type GitlabHelmValuesGlobalGeoPsqlPassword = object;

export type GitlabHelmValuesGlobalGeoRegistry = {
  /**
   * @default {"enabled":false,"primaryApiUrl":null}
   */
  replication?: GitlabHelmValuesGlobalGeoRegistryReplication;
};

export type GitlabHelmValuesGlobalGeoRegistryReplication = {
  /**
   * @default false
   */
  enabled?: boolean;
  primaryApiUrl?: unknown;
};

export type GitlabHelmValuesGlobalKas = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {"apiExternalPort":8153}
   */
  service?: GitlabHelmValuesGlobalKasService;
  /**
   * @default {"enabled":false,"verify":true}
   */
  tls?: GitlabHelmValuesGlobalKasTls;
};

export type GitlabHelmValuesGlobalKasService = {
  /**
   * port for connections from the GitLab backend
   *
   * @default 8153
   */
  apiExternalPort?: number;
};

export type GitlabHelmValuesGlobalKasTls = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default true
   */
  verify?: boolean;
};

export type GitlabHelmValuesGlobalWorkspaces = {
  /**
   * If workspaces is enabled, you must provide a hostname under global.hosts
   *
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalSpamcheck = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalShell = {
  /**
   * @default {}
   */
  authToken?: GitlabHelmValuesGlobalShellAuthToken;
  /**
   * @default {}
   */
  hostKeys?: GitlabHelmValuesGlobalShellHostKeys;
  /**
   * @default {"proxyProtocol":false}
   */
  tcp?: GitlabHelmValuesGlobalShellTcp;
};

export type GitlabHelmValuesGlobalShellAuthToken = object;

export type GitlabHelmValuesGlobalShellHostKeys = object;

export type GitlabHelmValuesGlobalShellTcp = {
  /**
   * @default false
   */
  proxyProtocol?: boolean;
};

export type GitlabHelmValuesGlobalRailsSecrets = object;

export type GitlabHelmValuesGlobalRails = {
  /**
   * @default {"enabled":true}
   */
  bootsnap?: GitlabHelmValuesGlobalRailsBootsnap;
  /**
   * @default {"sessionCookieTokenPrefix":""}
   */
  sessionStore?: GitlabHelmValuesGlobalRailsSessionStore;
};

export type GitlabHelmValuesGlobalRailsBootsnap = {
  /**
   * Enable / disable Shopify/Bootsnap cache
   *
   * @default true
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalRailsSessionStore = {
  /**
   * @default ""
   */
  sessionCookieTokenPrefix?: string;
};

export type GitlabHelmValuesGlobalRegistry = {
  /**
   * @default "registry"
   */
  bucket?: string;
  /**
   * @default {}
   */
  certificate?: GitlabHelmValuesGlobalRegistryCertificate;
  /**
   * @default {}
   */
  httpSecret?: GitlabHelmValuesGlobalRegistryHttpSecret;
  /**
   * @default {}
   */
  notificationSecret?: GitlabHelmValuesGlobalRegistryNotificationSecret;
  /**
   * Container Registry database configuration
   *
   * @default {"password":{}}
   */
  database?: GitlabHelmValuesGlobalRegistryDatabase;
  /**
   * @default {"enabled":false}
   */
  tls?: GitlabHelmValuesGlobalRegistryTls;
  /**
   * @default {"cache":{"password":{}},"rateLimiting":{"password":{}},"loadBalancing":{"password":{}}}
   */
  redis?: GitlabHelmValuesGlobalRegistryRedis;
  /**
   * https://docs.docker.com/registry/notifications/#configuration
   *
   * @default {}
   */
  notifications?: GitlabHelmValuesGlobalRegistryNotifications;
  /**
   * Settings utilized by other services referencing registry:
   *
   * @default true
   */
  enabled?: boolean;
  host?: unknown;
  /**
   * @default {"protocol":"http","serviceName":"registry","port":5000}
   */
  api?: GitlabHelmValuesGlobalRegistryApi;
  /**
   * @default "gitlab-issuer"
   */
  tokenIssuer?: string;
};

export type GitlabHelmValuesGlobalRegistryCertificate = object;

export type GitlabHelmValuesGlobalRegistryHttpSecret = object;

export type GitlabHelmValuesGlobalRegistryNotificationSecret = object;

export type GitlabHelmValuesGlobalRegistryDatabase = {
  /**
   * @default {}
   */
  password?: GitlabHelmValuesGlobalRegistryDatabasePassword;
};

export type GitlabHelmValuesGlobalRegistryDatabasePassword = object;

export type GitlabHelmValuesGlobalRegistryTls = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalRegistryRedis = {
  /**
   * @default {"password":{}}
   */
  cache?: GitlabHelmValuesGlobalRegistryRedisCache;
  /**
   * @default {"password":{}}
   */
  rateLimiting?: GitlabHelmValuesGlobalRegistryRedisRateLimiting;
  /**
   * @default {"password":{}}
   */
  loadBalancing?: GitlabHelmValuesGlobalRegistryRedisLoadBalancing;
};

export type GitlabHelmValuesGlobalRegistryRedisCache = {
  /**
   * @default {}
   */
  password?: GitlabHelmValuesGlobalRegistryRedisCachePassword;
};

export type GitlabHelmValuesGlobalRegistryRedisCachePassword = object;

export type GitlabHelmValuesGlobalRegistryRedisRateLimiting = {
  /**
   * @default {}
   */
  password?: GitlabHelmValuesGlobalRegistryRedisRateLimitingPassword;
};

export type GitlabHelmValuesGlobalRegistryRedisRateLimitingPassword = object;

export type GitlabHelmValuesGlobalRegistryRedisLoadBalancing = {
  /**
   * @default {}
   */
  password?: GitlabHelmValuesGlobalRegistryRedisLoadBalancingPassword;
};

export type GitlabHelmValuesGlobalRegistryRedisLoadBalancingPassword = object;

export type GitlabHelmValuesGlobalRegistryNotifications = object;

export type GitlabHelmValuesGlobalRegistryApi = {
  /**
   * @default "http"
   */
  protocol?: string;
  /**
   * @default "registry"
   */
  serviceName?: string;
  /**
   * @default 5000
   */
  port?: number;
};

export type GitlabHelmValuesGlobalPages = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default false
   */
  accessControl?: boolean;
  path?: unknown;
  host?: unknown;
  port?: unknown;
  https?: unknown;
  externalHttp?: unknown[];
  externalHttps?: unknown[];
  customDomainMode?: unknown;
  /**
   * @default true
   */
  artifactsServer?: boolean;
  /**
   * @default {"enabled":false}
   */
  localStore?: GitlabHelmValuesGlobalPagesLocalStore;
  /**
   * @default {"enabled":true,"bucket":"gitlab-pages","connection":{}}
   */
  objectStore?: GitlabHelmValuesGlobalPagesObjectStore;
  /**
   * @default {}
   */
  apiSecret?: GitlabHelmValuesGlobalPagesApiSecret;
  /**
   * @default {}
   */
  authSecret?: GitlabHelmValuesGlobalPagesAuthSecret;
  /**
   * @default false
   */
  namespaceInPath?: boolean;
};

export type GitlabHelmValuesGlobalPagesLocalStore = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalPagesObjectStore = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default "gitlab-pages"
   */
  bucket?: string;
  /**
   * @default {}
   */
  connection?: GitlabHelmValuesGlobalPagesObjectStoreConnection;
};

export type GitlabHelmValuesGlobalPagesObjectStoreConnection = object;

export type GitlabHelmValuesGlobalPagesApiSecret = object;

export type GitlabHelmValuesGlobalPagesAuthSecret = object;

export type GitlabHelmValuesGlobalRunner = {
  /**
   * @default {}
   */
  registrationToken?: GitlabHelmValuesGlobalRunnerRegistrationToken;
};

export type GitlabHelmValuesGlobalRunnerRegistrationToken = object;

export type GitlabHelmValuesGlobalSmtp = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default "smtp.mailgun.org"
   */
  address?: string;
  /**
   * @default 2525
   */
  port?: number;
  /**
   * @default ""
   */
  user_name?: string;
  /**
   * https://docs.gitlab.com/charts/installation/secrets#smtp-password
   *
   * @default {"secret":"","key":"password"}
   */
  password?: GitlabHelmValuesGlobalSmtpPassword;
  /**
   * @default "plain"
   */
  authentication?: string;
  /**
   * @default false
   */
  starttls_auto?: boolean;
  /**
   * @default "peer"
   */
  openssl_verify_mode?: string;
  /**
   * @default 30
   */
  open_timeout?: number;
  /**
   * @default 60
   */
  read_timeout?: number;
  /**
   * @default false
   */
  pool?: boolean;
};

export type GitlabHelmValuesGlobalSmtpPassword = {
  /**
   * @default ""
   */
  secret?: string;
  /**
   * @default "password"
   */
  key?: string;
};

export type GitlabHelmValuesGlobalEmail = {
  /**
   * @default ""
   */
  from?: string;
  /**
   * @default "GitLab"
   */
  display_name?: string;
  /**
   * @default ""
   */
  reply_to?: string;
  /**
   * @default ""
   */
  subject_suffix?: string;
  /**
   * @default {...} (4 keys)
   */
  smime?: GitlabHelmValuesGlobalEmailSmime;
};

export type GitlabHelmValuesGlobalEmailSmime = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default ""
   */
  secretName?: string;
  /**
   * @default "tls.key"
   */
  keyName?: string;
  /**
   * @default "tls.crt"
   */
  certName?: string;
};

export type GitlabHelmValuesGlobalService = {
  /**
   * @default {}
   */
  labels?: GitlabHelmValuesGlobalServiceLabels;
  /**
   * @default {}
   */
  annotations?: GitlabHelmValuesGlobalServiceAnnotations;
};

export type GitlabHelmValuesGlobalServiceLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalServiceAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalDeployment = {
  /**
   * @default {}
   */
  annotations?: GitlabHelmValuesGlobalDeploymentAnnotations;
};

export type GitlabHelmValuesGlobalDeploymentAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalAffinity = {
  /**
   * @default {"topologyKey":"kubernetes.io/hostname"}
   */
  podAntiAffinity?: GitlabHelmValuesGlobalAffinityPodAntiAffinity;
  /**
   * @default {"key":"topology.kubernetes.io/zone","values":[]}
   */
  nodeAffinity?: GitlabHelmValuesGlobalAffinityNodeAffinity;
};

export type GitlabHelmValuesGlobalAffinityPodAntiAffinity = {
  /**
   * @default "kubernetes.io/hostname"
   */
  topologyKey?: string;
};

export type GitlabHelmValuesGlobalAffinityNodeAffinity = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "topology.kubernetes.io/zone"
   */
  key?: string;
  values?: unknown[];
};

export type GitlabHelmValuesGlobalWorkhorse = {
  /**
   * @default "webservice-default"
   */
  serviceName?: string;
  /**
   * @default {"enabled":false}
   */
  tls?: GitlabHelmValuesGlobalWorkhorseTls;
};

export type GitlabHelmValuesGlobalWorkhorseTls = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesGlobalWebservice = {
  /**
   * @default 60
   */
  workerTimeout?: number;
};

export type GitlabHelmValuesGlobalCertificates = {
  /**
   * @default {"repository":"registry.gitlab.com/gitlab-org/build/cng/certificates"}
   */
  image?: GitlabHelmValuesGlobalCertificatesImage;
  customCAs?: unknown[];
};

export type GitlabHelmValuesGlobalCertificatesImage = {
  /**
   * @default "registry.gitlab.com/gitlab-org/build/cng/certif..."
   */
  repository?: string;
};

export type GitlabHelmValuesGlobalKubectl = {
  /**
   * @default {"repository":"registry.gitlab.com/gitlab-org/build/cng/kubectl"}
   */
  image?: GitlabHelmValuesGlobalKubectlImage;
  /**
   * @default {"runAsUser":65534,"fsGroup":65534,"seccompProfile":{"type":"RuntimeDefault"}}
   */
  securityContext?: GitlabHelmValuesGlobalKubectlSecurityContext;
};

export type GitlabHelmValuesGlobalKubectlImage = {
  /**
   * @default "registry.gitlab.com/gitlab-org/build/cng/kubectl"
   */
  repository?: string;
};

export type GitlabHelmValuesGlobalKubectlSecurityContext = {
  /**
   * in most base images, this is `nobody:nogroup`
   *
   * @default 65534
   */
  runAsUser?: number;
  /**
   * @default 65534
   */
  fsGroup?: number;
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesGlobalKubectlSecurityContextSeccompProfile;
};

export type GitlabHelmValuesGlobalKubectlSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesGlobalGitlabBase = {
  /**
   * @default {"repository":"registry.gitlab.com/gitlab-org/build/cng/gitlab-base"}
   */
  image?: GitlabHelmValuesGlobalGitlabBaseImage;
};

export type GitlabHelmValuesGlobalGitlabBaseImage = {
  /**
   * @default "registry.gitlab.com/gitlab-org/build/cng/gitlab..."
   */
  repository?: string;
};

export type GitlabHelmValuesGlobalServiceAccount = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default true
   */
  create?: boolean;
  /**
   * @default {}
   */
  annotations?: GitlabHelmValuesGlobalServiceAccountAnnotations;
  /**
   * @default false
   */
  automountServiceAccountToken?: boolean;
};

export type GitlabHelmValuesGlobalServiceAccountAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalTracing = {
  /**
   * @default {"string":""}
   */
  connection?: GitlabHelmValuesGlobalTracingConnection;
  /**
   * @default ""
   */
  urlTemplate?: string;
};

export type GitlabHelmValuesGlobalTracingConnection = {
  /**
   * @default ""
   */
  string?: string;
};

export type GitlabHelmValuesGlobalZoekt = {
  /**
   * @default {"basicAuth":{}}
   */
  gateway?: GitlabHelmValuesGlobalZoektGateway;
  /**
   * @default {"internalApi":{}}
   */
  indexer?: GitlabHelmValuesGlobalZoektIndexer;
};

export type GitlabHelmValuesGlobalZoektGateway = {
  /**
   * @default {}
   */
  basicAuth?: GitlabHelmValuesGlobalZoektGatewayBasicAuth;
};

export type GitlabHelmValuesGlobalZoektGatewayBasicAuth = object;

export type GitlabHelmValuesGlobalZoektIndexer = {
  /**
   * @default {}
   */
  internalApi?: GitlabHelmValuesGlobalZoektIndexerInternalApi;
};

export type GitlabHelmValuesGlobalZoektIndexerInternalApi = object;

export type GitlabHelmValuesGlobalOpenbao = {
  /**
   * @default false
   */
  enabled?: boolean;
  host?: unknown;
  https?: unknown;
  url?: unknown;
  /**
   * @default {"secret":"","key":"token"}
   */
  httpAudit?: GitlabHelmValuesGlobalOpenbaoHttpAudit;
};

export type GitlabHelmValuesGlobalOpenbaoHttpAudit = {
  /**
   * @default ""
   */
  secret?: string;
  /**
   * @default "token"
   */
  key?: string;
};

export type GitlabHelmValuesGlobalExtraEnv = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGlobalExtraEnvFrom = object;

export type GitlabHelmValuesGlobalJob = {
  nameSuffixOverride?: unknown;
};

export type GitlabHelmValuesGlobalTraefik = {
  /**
   * newer apiVersion: "traefik.io/v1alpha1"
   *
   * @default ""
   */
  apiVersion?: string;
};

export type GitlabHelmValuesUpgradeCheck = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {}
   */
  image?: GitlabHelmValuesUpgradeCheckImage;
  /**
   * @default {"runAsUser":65534,"fsGroup":65534,"seccompProfile":{"type":"RuntimeDefault"}}
   */
  securityContext?: GitlabHelmValuesUpgradeCheckSecurityContext;
  /**
   * Allow to overwrite the specific security context under which the container is running.
   *
   * @default {...} (4 keys)
   */
  containerSecurityContext?: GitlabHelmValuesUpgradeCheckContainerSecurityContext;
  tolerations?: unknown[];
  /**
   * @default {}
   */
  annotations?: GitlabHelmValuesUpgradeCheckAnnotations;
  /**
   * @default {}
   */
  configMapAnnotations?: GitlabHelmValuesUpgradeCheckConfigMapAnnotations;
  /**
   * @default {"requests":{"cpu":"50m"}}
   */
  resources?: GitlabHelmValuesUpgradeCheckResources;
  /**
   * @default ""
   */
  priorityClassName?: string;
};

export type GitlabHelmValuesUpgradeCheckImage = object;

export type GitlabHelmValuesUpgradeCheckSecurityContext = {
  /**
   * in alpine/debian/busybox based images, this is `nobody:nogroup`
   *
   * @default 65534
   */
  runAsUser?: number;
  /**
   * @default 65534
   */
  fsGroup?: number;
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesUpgradeCheckSecurityContextSeccompProfile;
};

export type GitlabHelmValuesUpgradeCheckSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesUpgradeCheckContainerSecurityContext = {
  /**
   * @default 65534
   */
  runAsUser?: number;
  /**
   * @default false
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * @default true
   */
  runAsNonRoot?: boolean;
  /**
   * @default {"drop":["ALL"]}
   */
  capabilities?: GitlabHelmValuesUpgradeCheckContainerSecurityContextCapabilities;
};

export type GitlabHelmValuesUpgradeCheckContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type GitlabHelmValuesUpgradeCheckAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesUpgradeCheckConfigMapAnnotations = object;

export type GitlabHelmValuesUpgradeCheckResources = {
  /**
   * @default {"cpu":"50m"}
   */
  requests?: GitlabHelmValuesUpgradeCheckResourcesRequests;
  /**
   * Kubernetes resource limits (memory, cpu, etc.)
   */
  limits?: GitlabHelmValuesUpgradeCheckResourcesLimits;
};

export type GitlabHelmValuesUpgradeCheckResourcesRequests = {
  /**
   * @default "50m"
   */
  cpu?: string;
};

export type GitlabHelmValuesUpgradeCheckResourcesLimits = {
  /**
   * @default "50m"
   */
  cpu?: string;
};

export type GitlabHelmValuesCertmanager = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  installCRDs?: boolean;
  /**
   * @default "certmanager"
   */
  nameOverride?: string;
};

export type GitlabHelmValuesNginxingress = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default "true"
   */
  tcpExternalConfig?: boolean;
  /**
   * @default {...} (15 keys)
   */
  controller?: GitlabHelmValuesNginxingressController;
  /**
   * @default {"podSecurityContext":{"seccompProfile":{"type":"RuntimeDefault"}},"resources":{"requests":{"cpu":"5m","memory":"5Mi"}}}
   */
  defaultBackend?: GitlabHelmValuesNginxingressDefaultBackend;
  /**
   * @default {"create":true,"scope":false}
   */
  rbac?: GitlabHelmValuesNginxingressRbac;
  /**
   * @default {"create":true}
   */
  serviceAccount?: GitlabHelmValuesNginxingressServiceAccount;
};

export type GitlabHelmValuesNginxingressController = {
  /**
   * @default {"seccompProfile":{"type":"RuntimeDefault"}}
   */
  podSecurityContext?: GitlabHelmValuesNginxingressControllerPodSecurityContext;
  /**
   * @default {...} (4 keys)
   */
  image?: GitlabHelmValuesNginxingressControllerImage;
  /**
   * @default {"Referrer-Policy":"strict-origin-when-cross-origin"}
   */
  addHeaders?: GitlabHelmValuesNginxingressControllerAddHeaders;
  /**
   * @default {...} (13 keys)
   */
  config?: GitlabHelmValuesNginxingressControllerConfig;
  /**
   * @default "ingress-controller-leader"
   */
  electionID?: string;
  /**
   * @default {...} (5 keys)
   */
  service?: GitlabHelmValuesNginxingressControllerService;
  /**
   * @default false
   */
  ingressClassByName?: boolean;
  /**
   * @default {"name":"{{ include \"ingress.class.name\" $ | quote }}"}
   */
  ingressClassResource?: GitlabHelmValuesNginxingressControllerIngressClassResource;
  /**
   * @default {"requests":{"cpu":"100m","memory":"100Mi"}}
   */
  resources?: GitlabHelmValuesNginxingressControllerResources;
  /**
   * @default {"enabled":true}
   */
  publishService?: GitlabHelmValuesNginxingressControllerPublishService;
  /**
   * @default 2
   */
  replicaCount?: number;
  /**
   * @default 1
   */
  minAvailable?: number;
  /**
   * @default {"enabled":true}
   */
  scope?: GitlabHelmValuesNginxingressControllerScope;
  /**
   * @default {"enabled":true,"service":{"annotations":{"gitlab.com/prometheus_scrape":"true","gitlab.com/prometheus_port":"10254","prometheus.io/scrape":"true","prometheus.io/port":"10254"}}}
   */
  metrics?: GitlabHelmValuesNginxingressControllerMetrics;
  /**
   * @default {"enabled":false}
   */
  admissionWebhooks?: GitlabHelmValuesNginxingressControllerAdmissionWebhooks;
};

export type GitlabHelmValuesNginxingressControllerPodSecurityContext = {
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesNginxingressControllerPodSecurityContextSeccompProfile;
};

export type GitlabHelmValuesNginxingressControllerPodSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesNginxingressControllerImage = {
  /**
   * @default "registry.gitlab.com"
   */
  registry?: string;
  /**
   * @default "gitlab-org/cloud-native/mirror/images/ingress-n..."
   */
  image?: string;
  /**
   * @default "v1.11.8"
   */
  tag?: string;
  /**
   * @default "sha256:695d79381ee6af00c7f5c9fd434f50851d7d3283..."
   */
  digest?: string;
};

export type GitlabHelmValuesNginxingressControllerAddHeaders = {
  /**
   * @default "strict-origin-when-cross-origin"
   */
  "Referrer-Policy"?: string;
};

export type GitlabHelmValuesNginxingressControllerConfig = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "load_module,lua_package,_by_lua,location,root,p..."
   */
  "annotation-value-word-blocklist"?: string;
  /**
   * @default "true"
   */
  hsts?: boolean;
  /**
   * @default "false"
   */
  "hsts-include-subdomains"?: boolean;
  /**
   * @default "63072000"
   */
  "hsts-max-age"?: number;
  /**
   * @default "256"
   */
  "server-name-hash-bucket-size"?: number;
  /**
   * @default "true"
   */
  "use-http2"?: boolean;
  /**
   * @default "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-..."
   */
  "ssl-ciphers"?: string;
  /**
   * @default "TLSv1.3 TLSv1.2"
   */
  "ssl-protocols"?: string;
  /**
   * @default "false"
   */
  "server-tokens"?: boolean;
  /**
   * Configure smaller defaults for upstream-keepalive-*, see https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration
   * Limit of 100 held-open connections
   *
   * @default 100
   */
  "upstream-keepalive-connections"?: number;
  /**
   * 30 second limit for connection reuse
   *
   * @default "30s"
   */
  "upstream-keepalive-time"?: string;
  /**
   * 5 second timeout to hold open idle connections
   *
   * @default 5
   */
  "upstream-keepalive-timeout"?: number;
  /**
   * 1000 requests per connection, before recycling
   *
   * @default 1000
   */
  "upstream-keepalive-requests"?: number;
};

export type GitlabHelmValuesNginxingressControllerService = {
  /**
   * @default "Local"
   */
  externalTrafficPolicy?: string;
  ipFamilies?: unknown[];
  /**
   * @default "PreferDualStack"
   */
  ipFamilyPolicy?: string;
  /**
   * @default false
   */
  appProtocol?: boolean;
  /**
   * @default {"appProtocol":false}
   */
  internal?: GitlabHelmValuesNginxingressControllerServiceInternal;
};

export type GitlabHelmValuesNginxingressControllerServiceInternal = {
  /**
   * @default false
   */
  appProtocol?: boolean;
};

export type GitlabHelmValuesNginxingressControllerIngressClassResource = {
  /**
   * @default "{{ include "ingress.class.name" $ | quote }}"
   */
  name?: string;
};

export type GitlabHelmValuesNginxingressControllerResources = {
  /**
   * @default {"cpu":"100m","memory":"100Mi"}
   */
  requests?: GitlabHelmValuesNginxingressControllerResourcesRequests;
  /**
   * Kubernetes resource limits (memory, cpu, etc.)
   */
  limits?: GitlabHelmValuesNginxingressControllerResourcesLimits;
};

export type GitlabHelmValuesNginxingressControllerResourcesRequests = {
  /**
   * @default "100m"
   */
  cpu?: string;
  /**
   * @default "100Mi"
   */
  memory?: string;
};

export type GitlabHelmValuesNginxingressControllerResourcesLimits = {
  /**
   * @default "100m"
   */
  cpu?: string;
  /**
   * @default "100Mi"
   */
  memory?: string;
};

export type GitlabHelmValuesNginxingressControllerPublishService = {
  /**
   * @default true
   */
  enabled?: boolean;
};

export type GitlabHelmValuesNginxingressControllerScope = {
  /**
   * @default true
   */
  enabled?: boolean;
};

export type GitlabHelmValuesNginxingressControllerMetrics = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {"annotations":{"gitlab.com/prometheus_scrape":"true","gitlab.com/prometheus_port":"10254","prometheus.io/scrape":"true","prometheus.io/port":"10254"}}
   */
  service?: GitlabHelmValuesNginxingressControllerMetricsService;
};

export type GitlabHelmValuesNginxingressControllerMetricsService = {
  /**
   * @default {...} (4 keys)
   */
  annotations?: GitlabHelmValuesNginxingressControllerMetricsServiceAnnotations;
};

export type GitlabHelmValuesNginxingressControllerMetricsServiceAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "true"
   */
  "gitlab.com/prometheus_scrape"?: boolean;
  /**
   * @default "10254"
   */
  "gitlab.com/prometheus_port"?: number;
  /**
   * @default "true"
   */
  "prometheus.io/scrape"?: boolean;
  /**
   * @default "10254"
   */
  "prometheus.io/port"?: number;
};

export type GitlabHelmValuesNginxingressControllerAdmissionWebhooks = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesNginxingressDefaultBackend = {
  /**
   * @default {"seccompProfile":{"type":"RuntimeDefault"}}
   */
  podSecurityContext?: GitlabHelmValuesNginxingressDefaultBackendPodSecurityContext;
  /**
   * @default {"requests":{"cpu":"5m","memory":"5Mi"}}
   */
  resources?: GitlabHelmValuesNginxingressDefaultBackendResources;
};

export type GitlabHelmValuesNginxingressDefaultBackendPodSecurityContext = {
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesNginxingressDefaultBackendPodSecurityContextSeccompProfile;
};

export type GitlabHelmValuesNginxingressDefaultBackendPodSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesNginxingressDefaultBackendResources = {
  /**
   * @default {"cpu":"5m","memory":"5Mi"}
   */
  requests?: GitlabHelmValuesNginxingressDefaultBackendResourcesRequests;
  /**
   * Kubernetes resource limits (memory, cpu, etc.)
   */
  limits?: GitlabHelmValuesNginxingressDefaultBackendResourcesLimits;
};

export type GitlabHelmValuesNginxingressDefaultBackendResourcesRequests = {
  /**
   * @default "5m"
   */
  cpu?: string;
  /**
   * @default "5Mi"
   */
  memory?: string;
};

export type GitlabHelmValuesNginxingressDefaultBackendResourcesLimits = {
  /**
   * @default "5m"
   */
  cpu?: string;
  /**
   * @default "5Mi"
   */
  memory?: string;
};

export type GitlabHelmValuesNginxingressRbac = {
  /**
   * @default true
   */
  create?: boolean;
  /**
   * Needed for k8s 1.20 and 1.21
   * https://github.com/kubernetes/ingress-nginx/issues/7510
   * https://github.com/kubernetes/ingress-nginx/issues/7519
   *
   * @default false
   */
  scope?: boolean;
};

export type GitlabHelmValuesNginxingressServiceAccount = {
  /**
   * @default true
   */
  create?: boolean;
};

export type GitlabHelmValuesNginxingressgeo = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default {...} (6 keys)
   */
  "<<"?: GitlabHelmValuesNginxingressgeoProperty;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default {...} (4 keys)
   */
  controller?: GitlabHelmValuesNginxingressgeoController;
  /**
   * A pre-defined/static external IP can be configured with global.hosts.externalGeoIP.
   *
   * @default "{{ .Values.global.hosts.externalGeoIP }}"
   */
  externalIpTpl?: string;
};

export type GitlabHelmValuesNginxingressgeoProperty = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default "true"
   */
  tcpExternalConfig?: boolean;
  /**
   * @default {...} (15 keys)
   */
  controller?: GitlabHelmValuesNginxingressgeoPropertyController;
  /**
   * @default {"podSecurityContext":{"seccompProfile":{"type":"RuntimeDefault"}},"resources":{"requests":{"cpu":"5m","memory":"5Mi"}}}
   */
  defaultBackend?: GitlabHelmValuesNginxingressgeoPropertyDefaultBackend;
  /**
   * @default {"create":true,"scope":false}
   */
  rbac?: GitlabHelmValuesNginxingressgeoPropertyRbac;
  /**
   * @default {"create":true}
   */
  serviceAccount?: GitlabHelmValuesNginxingressgeoPropertyServiceAccount;
};

export type GitlabHelmValuesNginxingressgeoPropertyController = {
  /**
   * @default {"seccompProfile":{"type":"RuntimeDefault"}}
   */
  podSecurityContext?: GitlabHelmValuesNginxingressgeoPropertyControllerPodSecurityContext;
  /**
   * @default {...} (4 keys)
   */
  image?: GitlabHelmValuesNginxingressgeoPropertyControllerImage;
  /**
   * @default {"Referrer-Policy":"strict-origin-when-cross-origin"}
   */
  addHeaders?: GitlabHelmValuesNginxingressgeoPropertyControllerAddHeaders;
  /**
   * @default {...} (13 keys)
   */
  config?: GitlabHelmValuesNginxingressgeoPropertyControllerConfig;
  /**
   * @default "ingress-controller-leader"
   */
  electionID?: string;
  /**
   * @default {...} (5 keys)
   */
  service?: GitlabHelmValuesNginxingressgeoPropertyControllerService;
  /**
   * @default false
   */
  ingressClassByName?: boolean;
  /**
   * @default {"name":"{{ include \"ingress.class.name\" $ | quote }}"}
   */
  ingressClassResource?: GitlabHelmValuesNginxingressgeoPropertyControllerIngressClassResource;
  /**
   * @default {"requests":{"cpu":"100m","memory":"100Mi"}}
   */
  resources?: GitlabHelmValuesNginxingressgeoPropertyControllerResources;
  /**
   * @default {"enabled":true}
   */
  publishService?: GitlabHelmValuesNginxingressgeoPropertyControllerPublishService;
  /**
   * @default 2
   */
  replicaCount?: number;
  /**
   * @default 1
   */
  minAvailable?: number;
  /**
   * @default {"enabled":true}
   */
  scope?: GitlabHelmValuesNginxingressgeoPropertyControllerScope;
  /**
   * @default {"enabled":true,"service":{"annotations":{"gitlab.com/prometheus_scrape":"true","gitlab.com/prometheus_port":"10254","prometheus.io/scrape":"true","prometheus.io/port":"10254"}}}
   */
  metrics?: GitlabHelmValuesNginxingressgeoPropertyControllerMetrics;
  /**
   * @default {"enabled":false}
   */
  admissionWebhooks?: GitlabHelmValuesNginxingressgeoPropertyControllerAdmissionWebhooks;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerPodSecurityContext = {
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesNginxingressgeoPropertyControllerPodSecurityContextSeccompProfile;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerPodSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerImage = {
  /**
   * @default "registry.gitlab.com"
   */
  registry?: string;
  /**
   * @default "gitlab-org/cloud-native/mirror/images/ingress-n..."
   */
  image?: string;
  /**
   * @default "v1.11.8"
   */
  tag?: string;
  /**
   * @default "sha256:695d79381ee6af00c7f5c9fd434f50851d7d3283..."
   */
  digest?: string;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerAddHeaders = {
  /**
   * @default "strict-origin-when-cross-origin"
   */
  "Referrer-Policy"?: string;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerConfig = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "load_module,lua_package,_by_lua,location,root,p..."
   */
  "annotation-value-word-blocklist"?: string;
  /**
   * @default "true"
   */
  hsts?: boolean;
  /**
   * @default "false"
   */
  "hsts-include-subdomains"?: boolean;
  /**
   * @default "63072000"
   */
  "hsts-max-age"?: number;
  /**
   * @default "256"
   */
  "server-name-hash-bucket-size"?: number;
  /**
   * @default "true"
   */
  "use-http2"?: boolean;
  /**
   * @default "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-..."
   */
  "ssl-ciphers"?: string;
  /**
   * @default "TLSv1.3 TLSv1.2"
   */
  "ssl-protocols"?: string;
  /**
   * @default "false"
   */
  "server-tokens"?: boolean;
  /**
   * @default 100
   */
  "upstream-keepalive-connections"?: number;
  /**
   * @default "30s"
   */
  "upstream-keepalive-time"?: string;
  /**
   * @default 5
   */
  "upstream-keepalive-timeout"?: number;
  /**
   * @default 1000
   */
  "upstream-keepalive-requests"?: number;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerService = {
  /**
   * @default "Local"
   */
  externalTrafficPolicy?: string;
  ipFamilies?: unknown[];
  /**
   * @default "PreferDualStack"
   */
  ipFamilyPolicy?: string;
  /**
   * @default false
   */
  appProtocol?: boolean;
  /**
   * @default {"appProtocol":false}
   */
  internal?: GitlabHelmValuesNginxingressgeoPropertyControllerServiceInternal;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerServiceInternal = {
  /**
   * @default false
   */
  appProtocol?: boolean;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerIngressClassResource = {
  /**
   * @default "{{ include "ingress.class.name" $ | quote }}"
   */
  name?: string;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerResources = {
  /**
   * @default {"cpu":"100m","memory":"100Mi"}
   */
  requests?: GitlabHelmValuesNginxingressgeoPropertyControllerResourcesRequests;
  /**
   * Kubernetes resource limits (memory, cpu, etc.)
   */
  limits?: GitlabHelmValuesNginxingressgeoPropertyControllerResourcesLimits;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerResourcesRequests = {
  /**
   * @default "100m"
   */
  cpu?: string;
  /**
   * @default "100Mi"
   */
  memory?: string;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerResourcesLimits = {
  /**
   * @default "100m"
   */
  cpu?: string;
  /**
   * @default "100Mi"
   */
  memory?: string;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerPublishService = {
  /**
   * @default true
   */
  enabled?: boolean;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerScope = {
  /**
   * @default true
   */
  enabled?: boolean;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerMetrics = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {"annotations":{"gitlab.com/prometheus_scrape":"true","gitlab.com/prometheus_port":"10254","prometheus.io/scrape":"true","prometheus.io/port":"10254"}}
   */
  service?: GitlabHelmValuesNginxingressgeoPropertyControllerMetricsService;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerMetricsService = {
  /**
   * @default {...} (4 keys)
   */
  annotations?: GitlabHelmValuesNginxingressgeoPropertyControllerMetricsServiceAnnotations;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerMetricsServiceAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "true"
   */
  "gitlab.com/prometheus_scrape"?: boolean;
  /**
   * @default "10254"
   */
  "gitlab.com/prometheus_port"?: number;
  /**
   * @default "true"
   */
  "prometheus.io/scrape"?: boolean;
  /**
   * @default "10254"
   */
  "prometheus.io/port"?: number;
};

export type GitlabHelmValuesNginxingressgeoPropertyControllerAdmissionWebhooks = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesNginxingressgeoPropertyDefaultBackend = {
  /**
   * @default {"seccompProfile":{"type":"RuntimeDefault"}}
   */
  podSecurityContext?: GitlabHelmValuesNginxingressgeoPropertyDefaultBackendPodSecurityContext;
  /**
   * @default {"requests":{"cpu":"5m","memory":"5Mi"}}
   */
  resources?: GitlabHelmValuesNginxingressgeoPropertyDefaultBackendResources;
};

export type GitlabHelmValuesNginxingressgeoPropertyDefaultBackendPodSecurityContext = {
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesNginxingressgeoPropertyDefaultBackendPodSecurityContextSeccompProfile;
};

export type GitlabHelmValuesNginxingressgeoPropertyDefaultBackendPodSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesNginxingressgeoPropertyDefaultBackendResources = {
  /**
   * @default {"cpu":"5m","memory":"5Mi"}
   */
  requests?: GitlabHelmValuesNginxingressgeoPropertyDefaultBackendResourcesRequests;
  /**
   * Kubernetes resource limits (memory, cpu, etc.)
   */
  limits?: GitlabHelmValuesNginxingressgeoPropertyDefaultBackendResourcesLimits;
};

export type GitlabHelmValuesNginxingressgeoPropertyDefaultBackendResourcesRequests = {
  /**
   * @default "5m"
   */
  cpu?: string;
  /**
   * @default "5Mi"
   */
  memory?: string;
};

export type GitlabHelmValuesNginxingressgeoPropertyDefaultBackendResourcesLimits = {
  /**
   * @default "5m"
   */
  cpu?: string;
  /**
   * @default "5Mi"
   */
  memory?: string;
};

export type GitlabHelmValuesNginxingressgeoPropertyRbac = {
  /**
   * @default true
   */
  create?: boolean;
  /**
   * @default false
   */
  scope?: boolean;
};

export type GitlabHelmValuesNginxingressgeoPropertyServiceAccount = {
  /**
   * @default true
   */
  create?: boolean;
};

export type GitlabHelmValuesNginxingressgeoController = {
  /**
   * @default {...} (15 keys)
   */
  "<<"?: GitlabHelmValuesNginxingressgeoControllerProperty;
  /**
   * @default {"<<":{"annotation-value-word-blocklist":"load_module,lua_package,_by_lua,location,root,proxy_pass,serviceaccount,{,},',\"","hsts":"true","hsts-include-subdomains":"false","hsts-max-age":"63072000","server-name-hash-bucket-size":"256","use-http2":"true","ssl-ciphers":"ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4","ssl-protocols":"TLSv1.3 TLSv1.2","server-tokens":"false","upstream-keepalive-connections":100,"upstream-keepalive-time":"30s","upstream-keepalive-timeout":5,"upstream-keepalive-requests":1000},"use-forwarded-headers":true}
   */
  config?: GitlabHelmValuesNginxingressgeoControllerConfig;
  /**
   * @default "ingress-controller-leader-geo"
   */
  electionID?: string;
  /**
   * @default {"name":"{{ include \"gitlab.geo.ingress.class.name\" $ | quote }}","controllerValue":"k8s.io/nginx-ingress-geo"}
   */
  ingressClassResource?: GitlabHelmValuesNginxingressgeoControllerIngressClassResource;
};

export type GitlabHelmValuesNginxingressgeoControllerProperty = {
  /**
   * @default {"seccompProfile":{"type":"RuntimeDefault"}}
   */
  podSecurityContext?: GitlabHelmValuesNginxingressgeoControllerPropertyPodSecurityContext;
  /**
   * @default {...} (4 keys)
   */
  image?: GitlabHelmValuesNginxingressgeoControllerPropertyImage;
  /**
   * @default {"Referrer-Policy":"strict-origin-when-cross-origin"}
   */
  addHeaders?: GitlabHelmValuesNginxingressgeoControllerPropertyAddHeaders;
  /**
   * @default {...} (13 keys)
   */
  config?: GitlabHelmValuesNginxingressgeoControllerPropertyConfig;
  /**
   * @default "ingress-controller-leader"
   */
  electionID?: string;
  /**
   * @default {...} (5 keys)
   */
  service?: GitlabHelmValuesNginxingressgeoControllerPropertyService;
  /**
   * @default false
   */
  ingressClassByName?: boolean;
  /**
   * @default {"name":"{{ include \"ingress.class.name\" $ | quote }}"}
   */
  ingressClassResource?: GitlabHelmValuesNginxingressgeoControllerPropertyIngressClassResource;
  /**
   * @default {"requests":{"cpu":"100m","memory":"100Mi"}}
   */
  resources?: GitlabHelmValuesNginxingressgeoControllerPropertyResources;
  /**
   * @default {"enabled":true}
   */
  publishService?: GitlabHelmValuesNginxingressgeoControllerPropertyPublishService;
  /**
   * @default 2
   */
  replicaCount?: number;
  /**
   * @default 1
   */
  minAvailable?: number;
  /**
   * @default {"enabled":true}
   */
  scope?: GitlabHelmValuesNginxingressgeoControllerPropertyScope;
  /**
   * @default {"enabled":true,"service":{"annotations":{"gitlab.com/prometheus_scrape":"true","gitlab.com/prometheus_port":"10254","prometheus.io/scrape":"true","prometheus.io/port":"10254"}}}
   */
  metrics?: GitlabHelmValuesNginxingressgeoControllerPropertyMetrics;
  /**
   * @default {"enabled":false}
   */
  admissionWebhooks?: GitlabHelmValuesNginxingressgeoControllerPropertyAdmissionWebhooks;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyPodSecurityContext = {
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesNginxingressgeoControllerPropertyPodSecurityContextSeccompProfile;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyPodSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyImage = {
  /**
   * @default "registry.gitlab.com"
   */
  registry?: string;
  /**
   * @default "gitlab-org/cloud-native/mirror/images/ingress-n..."
   */
  image?: string;
  /**
   * @default "v1.11.8"
   */
  tag?: string;
  /**
   * @default "sha256:695d79381ee6af00c7f5c9fd434f50851d7d3283..."
   */
  digest?: string;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyAddHeaders = {
  /**
   * @default "strict-origin-when-cross-origin"
   */
  "Referrer-Policy"?: string;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyConfig = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "load_module,lua_package,_by_lua,location,root,p..."
   */
  "annotation-value-word-blocklist"?: string;
  /**
   * @default "true"
   */
  hsts?: boolean;
  /**
   * @default "false"
   */
  "hsts-include-subdomains"?: boolean;
  /**
   * @default "63072000"
   */
  "hsts-max-age"?: number;
  /**
   * @default "256"
   */
  "server-name-hash-bucket-size"?: number;
  /**
   * @default "true"
   */
  "use-http2"?: boolean;
  /**
   * @default "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-..."
   */
  "ssl-ciphers"?: string;
  /**
   * @default "TLSv1.3 TLSv1.2"
   */
  "ssl-protocols"?: string;
  /**
   * @default "false"
   */
  "server-tokens"?: boolean;
  /**
   * @default 100
   */
  "upstream-keepalive-connections"?: number;
  /**
   * @default "30s"
   */
  "upstream-keepalive-time"?: string;
  /**
   * @default 5
   */
  "upstream-keepalive-timeout"?: number;
  /**
   * @default 1000
   */
  "upstream-keepalive-requests"?: number;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyService = {
  /**
   * @default "Local"
   */
  externalTrafficPolicy?: string;
  ipFamilies?: unknown[];
  /**
   * @default "PreferDualStack"
   */
  ipFamilyPolicy?: string;
  /**
   * @default false
   */
  appProtocol?: boolean;
  /**
   * @default {"appProtocol":false}
   */
  internal?: GitlabHelmValuesNginxingressgeoControllerPropertyServiceInternal;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyServiceInternal = {
  /**
   * @default false
   */
  appProtocol?: boolean;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyIngressClassResource = {
  /**
   * @default "{{ include "ingress.class.name" $ | quote }}"
   */
  name?: string;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyResources = {
  /**
   * @default {"cpu":"100m","memory":"100Mi"}
   */
  requests?: GitlabHelmValuesNginxingressgeoControllerPropertyResourcesRequests;
  /**
   * Kubernetes resource limits (memory, cpu, etc.)
   */
  limits?: GitlabHelmValuesNginxingressgeoControllerPropertyResourcesLimits;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyResourcesRequests = {
  /**
   * @default "100m"
   */
  cpu?: string;
  /**
   * @default "100Mi"
   */
  memory?: string;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyResourcesLimits = {
  /**
   * @default "100m"
   */
  cpu?: string;
  /**
   * @default "100Mi"
   */
  memory?: string;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyPublishService = {
  /**
   * @default true
   */
  enabled?: boolean;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyScope = {
  /**
   * @default true
   */
  enabled?: boolean;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyMetrics = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {"annotations":{"gitlab.com/prometheus_scrape":"true","gitlab.com/prometheus_port":"10254","prometheus.io/scrape":"true","prometheus.io/port":"10254"}}
   */
  service?: GitlabHelmValuesNginxingressgeoControllerPropertyMetricsService;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyMetricsService = {
  /**
   * @default {...} (4 keys)
   */
  annotations?: GitlabHelmValuesNginxingressgeoControllerPropertyMetricsServiceAnnotations;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyMetricsServiceAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "true"
   */
  "gitlab.com/prometheus_scrape"?: boolean;
  /**
   * @default "10254"
   */
  "gitlab.com/prometheus_port"?: number;
  /**
   * @default "true"
   */
  "prometheus.io/scrape"?: boolean;
  /**
   * @default "10254"
   */
  "prometheus.io/port"?: number;
};

export type GitlabHelmValuesNginxingressgeoControllerPropertyAdmissionWebhooks = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesNginxingressgeoControllerConfig = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default {...} (13 keys)
   */
  "<<"?: GitlabHelmValuesNginxingressgeoControllerConfigProperty;
  /**
   * Pass incoming X-Forwarded-* headers to upstream. Required to handle requests
   * from other Geo sites.
   * https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#use-forwarded-headers
   *
   * @default true
   */
  "use-forwarded-headers"?: boolean;
};

export type GitlabHelmValuesNginxingressgeoControllerConfigProperty = {
  /**
   * @default "load_module,lua_package,_by_lua,location,root,p..."
   */
  "annotation-value-word-blocklist"?: string;
  /**
   * @default "true"
   */
  hsts?: boolean;
  /**
   * @default "false"
   */
  "hsts-include-subdomains"?: boolean;
  /**
   * @default "63072000"
   */
  "hsts-max-age"?: number;
  /**
   * @default "256"
   */
  "server-name-hash-bucket-size"?: number;
  /**
   * @default "true"
   */
  "use-http2"?: boolean;
  /**
   * @default "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-..."
   */
  "ssl-ciphers"?: string;
  /**
   * @default "TLSv1.3 TLSv1.2"
   */
  "ssl-protocols"?: string;
  /**
   * @default "false"
   */
  "server-tokens"?: boolean;
  /**
   * @default 100
   */
  "upstream-keepalive-connections"?: number;
  /**
   * @default "30s"
   */
  "upstream-keepalive-time"?: string;
  /**
   * @default 5
   */
  "upstream-keepalive-timeout"?: number;
  /**
   * @default 1000
   */
  "upstream-keepalive-requests"?: number;
};

export type GitlabHelmValuesNginxingressgeoControllerIngressClassResource = {
  /**
   * @default "{{ include "gitlab.geo.ingress.class.name" $ | ..."
   */
  name?: string;
  /**
   * @default "k8s.io/nginx-ingress-geo"
   */
  controllerValue?: string;
};

export type GitlabHelmValuesHaproxy = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  install?: boolean;
  /**
   * @default {"service":{"type":"LoadBalancer","tcpPorts":[{"name":"ssh","port":22,"targetPort":22}],"enablePorts":{"quic":false}},"extraArgs":["--configmap-tcp-services=$(POD_NAMESPACE)/$(POD_NAMESPACE)-haproxy-tcp"]}
   */
  controller?: GitlabHelmValuesHaproxyController;
};

export type GitlabHelmValuesHaproxyController = {
  /**
   * @default {"type":"LoadBalancer","tcpPorts":[{"name":"ssh","port":22,"targetPort":22}],"enablePorts":{"quic":false}}
   */
  service?: GitlabHelmValuesHaproxyControllerService;
  extraArgs?: string[];
};

export type GitlabHelmValuesHaproxyControllerService = {
  /**
   * @default "LoadBalancer"
   */
  type?: string;
  tcpPorts?: GitlabHelmValuesHaproxyControllerServiceTcpPortsElement[];
  /**
   * @default {"quic":false}
   */
  enablePorts?: GitlabHelmValuesHaproxyControllerServiceEnablePorts;
};

export type GitlabHelmValuesHaproxyControllerServiceTcpPortsElement = {
  /**
   * @default "ssh"
   */
  name?: string;
  /**
   * @default 22
   */
  port?: number;
  /**
   * @default 22
   */
  targetPort?: number;
};

export type GitlabHelmValuesHaproxyControllerServiceEnablePorts = {
  /**
   * Disable QUIC (UDP based) because LoadBalancer Services do not support UDP/TCP at the same time.
   *
   * @default false
   */
  quic?: boolean;
};

export type GitlabHelmValuesPrometheus = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  install?: boolean;
  /**
   * @default {"create":true}
   */
  rbac?: GitlabHelmValuesPrometheusRbac;
  /**
   * @default {"enabled":false}
   */
  alertmanager?: GitlabHelmValuesPrometheusAlertmanager;
  /**
   * @default {"enabled":false}
   */
  "kube-state-metrics"?: GitlabHelmValuesPrometheusKubestatemetrics;
  /**
   * @default {"enabled":false}
   */
  "prometheus-node-exporter"?: GitlabHelmValuesPrometheusPrometheusnodeexporter;
  /**
   * @default {"enabled":false}
   */
  "prometheus-pushgateway"?: GitlabHelmValuesPrometheusPrometheuspushgateway;
  /**
   * @default {"retention":"15d","strategy":{"type":"Recreate"},"containerSecurityContext":{"runAsUser":1000,"allowPrivilegeEscalation":false,"runAsNonRoot":true,"capabilities":{"drop":["ALL"]},"seccompProfile":{"type":"RuntimeDefault"}}}
   */
  server?: GitlabHelmValuesPrometheusServer;
  /**
   * @default {"enabled":false}
   */
  podSecurityPolicy?: GitlabHelmValuesPrometheusPodSecurityPolicy;
  /**
   * @default {"prometheus":{"containerSecurityContext":{"runAsUser":1000,"allowPrivilegeEscalation":false,"runAsNonRoot":true,"capabilities":{"drop":["ALL"]},"seccompProfile":{"type":"RuntimeDefault"}}}}
   */
  configmapReload?: GitlabHelmValuesPrometheusConfigmapReload;
  /**
   * @default {"prometheus.yml":{"scrape_configs":[{"job_name":"prometheus","static_configs":[{"targets":["localhost:9090"]}]},{"job_name":"kubernetes-apiservers","kubernetes_sd_configs":[{"role":"endpoints"}],"scheme":"https","tls_config":{"ca_file":"/var/run/secrets/kubernetes.io/serviceaccount/ca.crt","insecure_skip_verify":true},"bearer_token_file":"/var/run/secrets/kubernetes.io/serviceaccount/token","relabel_configs":[{"source_labels":["__meta_kubernetes_namespace","__meta_kubernetes_service_name","__meta_kubernetes_endpoint_port_name"],"action":"keep","regex":"default;kubernetes;https"}]},{"job_name":"kubernetes-pods","kubernetes_sd_configs":[{"role":"pod"}],"relabel_configs":[{"source_labels":["__meta_kubernetes_pod_annotation_gitlab_com_prometheus_scrape"],"action":"keep","regex":true},{"source_labels":["__meta_kubernetes_pod_annotation_gitlab_com_prometheus_scheme"],"action":"replace","regex":"(https?)","target_label":"__scheme__"},{"source_labels":["__meta_kubernetes_pod_annotation_gitlab_com_prometheus_path"],"action":"replace","target_label":"__metrics_path__","regex":"(.+)"},{"source_labels":["__address__","__meta_kubernetes_pod_annotation_gitlab_com_prometheus_port"],"action":"replace","regex":"([^:]+)(?::\\d+)?;(\\d+)","replacement":"$1:$2","target_label":"__address__"},{"action":"labelmap","regex":"__meta_kubernetes_pod_label_(.+)"},{"source_labels":["__meta_kubernetes_namespace"],"action":"replace","target_label":"kubernetes_namespace"},{"source_labels":["__meta_kubernetes_pod_name"],"action":"replace","target_label":"kubernetes_pod_name"}]},{"job_name":"kubernetes-service-endpoints","kubernetes_sd_configs":[{"role":"endpoints"}],"relabel_configs":[{"action":"keep","regex":true,"source_labels":["__meta_kubernetes_service_annotation_gitlab_com_prometheus_scrape"]},{"action":"replace","regex":"(https?)","source_labels":["__meta_kubernetes_service_annotation_gitlab_com_prometheus_scheme"],"target_label":"__scheme__"},{"action":"replace","regex":"(.+)","source_labels":["__meta_kubernetes_service_annotation_gitlab_com_prometheus_path"],"target_label":"__metrics_path__"},{"action":"replace","regex":"([^:]+)(?::\\d+)?;(\\d+)","replacement":"$1:$2","source_labels":["__address__","__meta_kubernetes_service_annotation_gitlab_com_prometheus_port"],"target_label":"__address__"},{"action":"labelmap","regex":"__meta_kubernetes_service_label_(.+)"},{"action":"replace","source_labels":["__meta_kubernetes_namespace"],"target_label":"kubernetes_namespace"},{"action":"replace","source_labels":["__meta_kubernetes_service_name"],"target_label":"kubernetes_name"},{"action":"replace","source_labels":["__meta_kubernetes_pod_node_name"],"target_label":"kubernetes_node"}]},{"job_name":"kubernetes-services","metrics_path":"/probe","params":{"module":["http_2xx"]},"kubernetes_sd_configs":[{"role":"service"}],"relabel_configs":[{"source_labels":["__meta_kubernetes_service_annotation_gitlab_com_prometheus_probe"],"action":"keep","regex":true},{"source_labels":["__address__"],"target_label":"__param_target"},{"target_label":"__address__","replacement":"blackbox"},{"source_labels":["__param_target"],"target_label":"instance"},{"action":"labelmap","regex":"__meta_kubernetes_service_label_(.+)"},{"source_labels":["__meta_kubernetes_namespace"],"target_label":"kubernetes_namespace"},{"source_labels":["__meta_kubernetes_service_name"],"target_label":"kubernetes_name"}]}]}}
   */
  serverFiles?: GitlabHelmValuesPrometheusServerFiles;
};

export type GitlabHelmValuesPrometheusRbac = {
  /**
   * @default true
   */
  create?: boolean;
};

export type GitlabHelmValuesPrometheusAlertmanager = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesPrometheusKubestatemetrics = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesPrometheusPrometheusnodeexporter = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesPrometheusPrometheuspushgateway = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesPrometheusServer = {
  /**
   * @default "15d"
   */
  retention?: string;
  /**
   * @default {"type":"Recreate"}
   */
  strategy?: GitlabHelmValuesPrometheusServerStrategy;
  /**
   * @default {...} (5 keys)
   */
  containerSecurityContext?: GitlabHelmValuesPrometheusServerContainerSecurityContext;
};

export type GitlabHelmValuesPrometheusServerStrategy = {
  /**
   * @default "Recreate"
   */
  type?: string;
};

export type GitlabHelmValuesPrometheusServerContainerSecurityContext = {
  /**
   * @default 1000
   */
  runAsUser?: number;
  /**
   * @default false
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * @default true
   */
  runAsNonRoot?: boolean;
  /**
   * @default {"drop":["ALL"]}
   */
  capabilities?: GitlabHelmValuesPrometheusServerContainerSecurityContextCapabilities;
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesPrometheusServerContainerSecurityContextSeccompProfile;
};

export type GitlabHelmValuesPrometheusServerContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type GitlabHelmValuesPrometheusServerContainerSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesPrometheusPodSecurityPolicy = {
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesPrometheusConfigmapReload = {
  /**
   * @default {"containerSecurityContext":{"runAsUser":1000,"allowPrivilegeEscalation":false,"runAsNonRoot":true,"capabilities":{"drop":["ALL"]},"seccompProfile":{"type":"RuntimeDefault"}}}
   */
  prometheus?: GitlabHelmValuesPrometheusConfigmapReloadPrometheus;
};

export type GitlabHelmValuesPrometheusConfigmapReloadPrometheus = {
  /**
   * @default {...} (5 keys)
   */
  containerSecurityContext?: GitlabHelmValuesPrometheusConfigmapReloadPrometheusContainerSecurityContext;
};

export type GitlabHelmValuesPrometheusConfigmapReloadPrometheusContainerSecurityContext = {
  /**
   * @default 1000
   */
  runAsUser?: number;
  /**
   * @default false
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * @default true
   */
  runAsNonRoot?: boolean;
  /**
   * @default {"drop":["ALL"]}
   */
  capabilities?: GitlabHelmValuesPrometheusConfigmapReloadPrometheusContainerSecurityContextCapabilities;
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesPrometheusConfigmapReloadPrometheusContainerSecurityContextSeccompProfile;
};

export type GitlabHelmValuesPrometheusConfigmapReloadPrometheusContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type GitlabHelmValuesPrometheusConfigmapReloadPrometheusContainerSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesPrometheusServerFiles = {
  /**
   * @default {"scrape_configs":[{"job_name":"prometheus","static_configs":[{"targets":["localhost:9090"]}]},{"job_name":"kubernetes-apiservers","kubernetes_sd_configs":[{"role":"endpoints"}],"scheme":"https","tls_config":{"ca_file":"/var/run/secrets/kubernetes.io/serviceaccount/ca.crt","insecure_skip_verify":true},"bearer_token_file":"/var/run/secrets/kubernetes.io/serviceaccount/token","relabel_configs":[{"source_labels":["__meta_kubernetes_namespace","__meta_kubernetes_service_name","__meta_kubernetes_endpoint_port_name"],"action":"keep","regex":"default;kubernetes;https"}]},{"job_name":"kubernetes-pods","kubernetes_sd_configs":[{"role":"pod"}],"relabel_configs":[{"source_labels":["__meta_kubernetes_pod_annotation_gitlab_com_prometheus_scrape"],"action":"keep","regex":true},{"source_labels":["__meta_kubernetes_pod_annotation_gitlab_com_prometheus_scheme"],"action":"replace","regex":"(https?)","target_label":"__scheme__"},{"source_labels":["__meta_kubernetes_pod_annotation_gitlab_com_prometheus_path"],"action":"replace","target_label":"__metrics_path__","regex":"(.+)"},{"source_labels":["__address__","__meta_kubernetes_pod_annotation_gitlab_com_prometheus_port"],"action":"replace","regex":"([^:]+)(?::\\d+)?;(\\d+)","replacement":"$1:$2","target_label":"__address__"},{"action":"labelmap","regex":"__meta_kubernetes_pod_label_(.+)"},{"source_labels":["__meta_kubernetes_namespace"],"action":"replace","target_label":"kubernetes_namespace"},{"source_labels":["__meta_kubernetes_pod_name"],"action":"replace","target_label":"kubernetes_pod_name"}]},{"job_name":"kubernetes-service-endpoints","kubernetes_sd_configs":[{"role":"endpoints"}],"relabel_configs":[{"action":"keep","regex":true,"source_labels":["__meta_kubernetes_service_annotation_gitlab_com_prometheus_scrape"]},{"action":"replace","regex":"(https?)","source_labels":["__meta_kubernetes_service_annotation_gitlab_com_prometheus_scheme"],"target_label":"__scheme__"},{"action":"replace","regex":"(.+)","source_labels":["__meta_kubernetes_service_annotation_gitlab_com_prometheus_path"],"target_label":"__metrics_path__"},{"action":"replace","regex":"([^:]+)(?::\\d+)?;(\\d+)","replacement":"$1:$2","source_labels":["__address__","__meta_kubernetes_service_annotation_gitlab_com_prometheus_port"],"target_label":"__address__"},{"action":"labelmap","regex":"__meta_kubernetes_service_label_(.+)"},{"action":"replace","source_labels":["__meta_kubernetes_namespace"],"target_label":"kubernetes_namespace"},{"action":"replace","source_labels":["__meta_kubernetes_service_name"],"target_label":"kubernetes_name"},{"action":"replace","source_labels":["__meta_kubernetes_pod_node_name"],"target_label":"kubernetes_node"}]},{"job_name":"kubernetes-services","metrics_path":"/probe","params":{"module":["http_2xx"]},"kubernetes_sd_configs":[{"role":"service"}],"relabel_configs":[{"source_labels":["__meta_kubernetes_service_annotation_gitlab_com_prometheus_probe"],"action":"keep","regex":true},{"source_labels":["__address__"],"target_label":"__param_target"},{"target_label":"__address__","replacement":"blackbox"},{"source_labels":["__param_target"],"target_label":"instance"},{"action":"labelmap","regex":"__meta_kubernetes_service_label_(.+)"},{"source_labels":["__meta_kubernetes_namespace"],"target_label":"kubernetes_namespace"},{"source_labels":["__meta_kubernetes_service_name"],"target_label":"kubernetes_name"}]}]}
   */
  "prometheus.yml"?: GitlabHelmValuesPrometheusServerFilesPrometheusyml;
};

export type GitlabHelmValuesPrometheusServerFilesPrometheusyml = {
  scrape_configs?: GitlabHelmValuesPrometheusServerFilesPrometheusymlScrapeconfigsElement[];
};

export type GitlabHelmValuesPrometheusServerFilesPrometheusymlScrapeconfigsElement = {
  /**
   * @default "prometheus"
   */
  job_name?: string;
  static_configs?: GitlabHelmValuesPrometheusServerFilesPrometheusymlScrapeconfigsStaticconfigsElement[];
};

export type GitlabHelmValuesPrometheusServerFilesPrometheusymlScrapeconfigsStaticconfigsElement = {
  targets?: string[];
};

export type GitlabHelmValuesRedis = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  install?: boolean;
  /**
   * @default {"repository":"bitnamilegacy/redis"}
   */
  image?: GitlabHelmValuesRedisImage;
  /**
   * @default {"existingSecret":"gitlab-redis-secret","existingSecretKey":"redis-password","usePasswordFiles":true}
   */
  auth?: GitlabHelmValuesRedisAuth;
  /**
   * @default "standalone"
   */
  architecture?: string;
  /**
   * @default {"enabled":false}
   */
  cluster?: GitlabHelmValuesRedisCluster;
  /**
   * @default {"enabled":true,"image":{"repository":"bitnamilegacy/redis-exporter"}}
   */
  metrics?: GitlabHelmValuesRedisMetrics;
  /**
   * @default {"enabled":false,"image":{"repository":"bitnamilegacy/redis-sentinel"}}
   */
  sentinel?: GitlabHelmValuesRedisSentinel;
  /**
   * @default {"enabled":false,"image":{"repository":"bitnamilegacy/kubectl"}}
   */
  kubectl?: GitlabHelmValuesRedisKubectl;
  /**
   * @default {"enabled":false,"image":{"repository":"bitnamilegacy/os-shell"}}
   */
  sysctl?: GitlabHelmValuesRedisSysctl;
  /**
   * @default {"enabled":false,"image":{"repository":"bitnamilegacy/os-shell"}}
   */
  volumePermissions?: GitlabHelmValuesRedisVolumePermissions;
};

export type GitlabHelmValuesRedisImage = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "bitnamilegacy/redis"
   */
  repository?: string;
};

export type GitlabHelmValuesRedisAuth = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "gitlab-redis-secret"
   */
  existingSecret?: string;
  /**
   * @default "redis-password"
   */
  existingSecretKey?: string;
  /**
   * @default true
   */
  usePasswordFiles?: boolean;
};

export type GitlabHelmValuesRedisCluster = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
};

export type GitlabHelmValuesRedisMetrics = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {"repository":"bitnamilegacy/redis-exporter"}
   */
  image?: GitlabHelmValuesRedisMetricsImage;
};

export type GitlabHelmValuesRedisMetricsImage = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "bitnamilegacy/redis-exporter"
   */
  repository?: string;
};

export type GitlabHelmValuesRedisSentinel = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default {"repository":"bitnamilegacy/redis-sentinel"}
   */
  image?: GitlabHelmValuesRedisSentinelImage;
};

export type GitlabHelmValuesRedisSentinelImage = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "bitnamilegacy/redis-sentinel"
   */
  repository?: string;
};

export type GitlabHelmValuesRedisKubectl = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default {"repository":"bitnamilegacy/kubectl"}
   */
  image?: GitlabHelmValuesRedisKubectlImage;
};

export type GitlabHelmValuesRedisKubectlImage = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "bitnamilegacy/kubectl"
   */
  repository?: string;
};

export type GitlabHelmValuesRedisSysctl = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default {"repository":"bitnamilegacy/os-shell"}
   */
  image?: GitlabHelmValuesRedisSysctlImage;
};

export type GitlabHelmValuesRedisSysctlImage = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "bitnamilegacy/os-shell"
   */
  repository?: string;
};

export type GitlabHelmValuesRedisVolumePermissions = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default {"repository":"bitnamilegacy/os-shell"}
   */
  image?: GitlabHelmValuesRedisVolumePermissionsImage;
};

export type GitlabHelmValuesRedisVolumePermissionsImage = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "bitnamilegacy/os-shell"
   */
  repository?: string;
};

export type GitlabHelmValuesPostgresql = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  install?: boolean;
  /**
   * @default {...} (5 keys)
   */
  auth?: GitlabHelmValuesPostgresqlAuth;
  /**
   * @default {"repository":"bitnamilegacy/postgresql","tag":"16.6.0"}
   */
  image?: GitlabHelmValuesPostgresqlImage;
  /**
   * @default {"enabled":false,"image":{"repository":"bitnamilegacy/os-shell"}}
   */
  volumePermissions?: GitlabHelmValuesPostgresqlVolumePermissions;
  /**
   * @default {...} (4 keys)
   */
  primary?: GitlabHelmValuesPostgresqlPrimary;
  /**
   * Optionally define additional custom metrics
   * ref: https://github.com/wrouesnel/postgres_exporter#adding-new-metrics-via-a-config-file
   * Installation & configuration charts/registry
   * https://docs.gitlab.com/charts/architecture/decisions#registry
   * https://docs.gitlab.com/charts/charts/registry/
   * Automatic shared secret generation
   * https://docs.gitlab.com/charts/installation/secrets
   * https://docs.gitlab.com/charts/charts/shared-secrets.html
   *
   * @default {"enabled":true,"image":{"repository":"bitnamilegacy/postgres-exporter"},"service":{"annotations":{"prometheus.io/scrape":"true","prometheus.io/port":"9187","gitlab.com/prometheus_scrape":"true","gitlab.com/prometheus_port":"9187"}}}
   */
  metrics?: GitlabHelmValuesPostgresqlMetrics;
};

export type GitlabHelmValuesPostgresqlAuth = {
  /**
   * These need to be set, for the sake of bitnami/postgresql upgrade patterns.
   * They are overridden by use of `existingSecret`
   *
   * @default "bogus-satisfy-upgrade"
   */
  password?: string;
  /**
   * @default "bogus-satisfy-upgrade"
   */
  postgresPassword?: string;
  /**
   * @default false
   */
  usePasswordFiles?: boolean;
  /**
   * @default "{{ include "gitlab.psql.password.secret" . }}"
   */
  existingSecret?: string;
  /**
   * @default {"adminPasswordKey":"postgresql-postgres-password","userPasswordKey":"{{ include \"gitlab.psql.password.key\" $ }}"}
   */
  secretKeys?: GitlabHelmValuesPostgresqlAuthSecretKeys;
};

export type GitlabHelmValuesPostgresqlAuthSecretKeys = {
  /**
   * @default "postgresql-postgres-password"
   */
  adminPasswordKey?: string;
  /**
   * @default "{{ include "gitlab.psql.password.key" $ }}"
   */
  userPasswordKey?: string;
};

export type GitlabHelmValuesPostgresqlImage = {
  /**
   * @default "bitnamilegacy/postgresql"
   */
  repository?: string;
  /**
   * @default "16.6.0"
   */
  tag?: string;
};

export type GitlabHelmValuesPostgresqlVolumePermissions = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default {"repository":"bitnamilegacy/os-shell"}
   */
  image?: GitlabHelmValuesPostgresqlVolumePermissionsImage;
};

export type GitlabHelmValuesPostgresqlVolumePermissionsImage = {
  /**
   * @default "bitnamilegacy/os-shell"
   */
  repository?: string;
};

export type GitlabHelmValuesPostgresqlPrimary = {
  /**
   * @default {"scriptsConfigMap":"{{ include \"gitlab.psql.initdbscripts\" $}}"}
   */
  initdb?: GitlabHelmValuesPostgresqlPrimaryInitdb;
  extraVolumeMounts?: GitlabHelmValuesPostgresqlPrimaryExtraVolumeMountsElement[];
  extraVolumes?: GitlabHelmValuesPostgresqlPrimaryExtraVolumesElement[];
  /**
   * @default {"postgresql.gitlab/init-revision":"1"}
   */
  podAnnotations?: GitlabHelmValuesPostgresqlPrimaryPodAnnotations;
};

export type GitlabHelmValuesPostgresqlPrimaryInitdb = {
  /**
   * @default "{{ include "gitlab.psql.initdbscripts" $}}"
   */
  scriptsConfigMap?: string;
};

export type GitlabHelmValuesPostgresqlPrimaryExtraVolumeMountsElement = {
  /**
   * @default "custom-init-scripts"
   */
  name?: string;
  /**
   * @default "/docker-entrypoint-preinitdb.d/init_revision.sh"
   */
  mountPath?: string;
  /**
   * @default "init_revision.sh"
   */
  subPath?: string;
};

export type GitlabHelmValuesPostgresqlPrimaryExtraVolumesElement = {
  /**
   * @default "registry-database-password"
   */
  name?: string;
  /**
   * @default {"sources":[{"secret":{"name":"{{ include \"gitlab.registry.database.password.secret\" . }}","items":[{"key":"{{ include \"gitlab.registry.database.password.key\" . }}","path":"database_password"}]}}]}
   */
  projected?: GitlabHelmValuesPostgresqlPrimaryExtraVolumesProjected;
};

export type GitlabHelmValuesPostgresqlPrimaryExtraVolumesProjected = {
  sources?: GitlabHelmValuesPostgresqlPrimaryExtraVolumesProjectedSourcesElement[];
};

export type GitlabHelmValuesPostgresqlPrimaryExtraVolumesProjectedSourcesElement = {
  /**
   * @default {"name":"{{ include \"gitlab.registry.database.password.secret\" . }}","items":[{"key":"{{ include \"gitlab.registry.database.password.key\" . }}","path":"database_password"}]}
   */
  secret?: GitlabHelmValuesPostgresqlPrimaryExtraVolumesProjectedSourcesSecret;
};

export type GitlabHelmValuesPostgresqlPrimaryExtraVolumesProjectedSourcesSecret = {
  /**
   * @default "{{ include "gitlab.registry.database.password.s..."
   */
  name?: string;
  items?: GitlabHelmValuesPostgresqlPrimaryExtraVolumesProjectedSourcesSecretItemsElement[];
};

export type GitlabHelmValuesPostgresqlPrimaryExtraVolumesProjectedSourcesSecretItemsElement = {
  /**
   * @default "{{ include "gitlab.registry.database.password.k..."
   */
  key?: string;
  /**
   * @default "database_password"
   */
  path?: string;
};

export type GitlabHelmValuesPostgresqlPrimaryPodAnnotations = {
  /**
   * @default "1"
   */
  "postgresql.gitlab/init-revision"?: number;
};

export type GitlabHelmValuesPostgresqlMetrics = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {"repository":"bitnamilegacy/postgres-exporter"}
   */
  image?: GitlabHelmValuesPostgresqlMetricsImage;
  /**
   * @default {"annotations":{"prometheus.io/scrape":"true","prometheus.io/port":"9187","gitlab.com/prometheus_scrape":"true","gitlab.com/prometheus_port":"9187"}}
   */
  service?: GitlabHelmValuesPostgresqlMetricsService;
};

export type GitlabHelmValuesPostgresqlMetricsImage = {
  /**
   * @default "bitnamilegacy/postgres-exporter"
   */
  repository?: string;
};

export type GitlabHelmValuesPostgresqlMetricsService = {
  /**
   * @default {...} (4 keys)
   */
  annotations?: GitlabHelmValuesPostgresqlMetricsServiceAnnotations;
};

export type GitlabHelmValuesPostgresqlMetricsServiceAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "true"
   */
  "prometheus.io/scrape"?: boolean;
  /**
   * @default "9187"
   */
  "prometheus.io/port"?: number;
  /**
   * @default "true"
   */
  "gitlab.com/prometheus_scrape"?: boolean;
  /**
   * @default "9187"
   */
  "gitlab.com/prometheus_port"?: number;
};

export type GitlabHelmValuesSharedsecrets = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {"create":true}
   */
  rbac?: GitlabHelmValuesSharedsecretsRbac;
  /**
   * @default {...} (5 keys)
   */
  selfsign?: GitlabHelmValuesSharedsecretsSelfsign;
  /**
   * @default "production"
   */
  env?: string;
  /**
   * @default {"enabled":true,"create":true,"name":null}
   */
  serviceAccount?: GitlabHelmValuesSharedsecretsServiceAccount;
  /**
   * @default {"requests":{"cpu":"50m"}}
   */
  resources?: GitlabHelmValuesSharedsecretsResources;
  /**
   * @default {"runAsUser":65534,"fsGroup":65534,"seccompProfile":{"type":"RuntimeDefault"}}
   */
  securityContext?: GitlabHelmValuesSharedsecretsSecurityContext;
  /**
   * @default {"allowPrivilegeEscalation":false,"runAsNonRoot":true,"capabilities":{"drop":["ALL"]}}
   */
  containerSecurityContext?: GitlabHelmValuesSharedsecretsContainerSecurityContext;
  tolerations?: unknown[];
  /**
   * @default {}
   */
  podLabels?: GitlabHelmValuesSharedsecretsPodLabels;
  /**
   * @default {}
   */
  annotations?: GitlabHelmValuesSharedsecretsAnnotations;
};

export type GitlabHelmValuesSharedsecretsRbac = {
  /**
   * @default true
   */
  create?: boolean;
};

export type GitlabHelmValuesSharedsecretsSelfsign = {
  /**
   * Default tag is `master`, overridable by `global.gitlabVersion`.
   *
   * @default {"repository":"registry.gitlab.com/gitlab-org/build/cng/cfssl-self-sign"}
   */
  image?: GitlabHelmValuesSharedsecretsSelfsignImage;
  /**
   * @default "rsa"
   */
  keyAlgorithm?: string;
  /**
   * @default "4096"
   */
  keySize?: number;
  /**
   * @default "3650d"
   */
  expiry?: string;
  /**
   * @default "GitLab Helm Chart"
   */
  caSubject?: string;
};

export type GitlabHelmValuesSharedsecretsSelfsignImage = {
  /**
   * @default "registry.gitlab.com/gitlab-org/build/cng/cfssl-..."
   */
  repository?: string;
};

export type GitlabHelmValuesSharedsecretsServiceAccount = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default true
   */
  create?: boolean;
  name?: unknown;
};

export type GitlabHelmValuesSharedsecretsResources = {
  /**
   * @default {"cpu":"50m"}
   */
  requests?: GitlabHelmValuesSharedsecretsResourcesRequests;
  /**
   * Kubernetes resource limits (memory, cpu, etc.)
   */
  limits?: GitlabHelmValuesSharedsecretsResourcesLimits;
};

export type GitlabHelmValuesSharedsecretsResourcesRequests = {
  /**
   * @default "50m"
   */
  cpu?: string;
};

export type GitlabHelmValuesSharedsecretsResourcesLimits = {
  /**
   * @default "50m"
   */
  cpu?: string;
};

export type GitlabHelmValuesSharedsecretsSecurityContext = {
  /**
   * in debian/alpine based images, this is `nobody:nogroup`
   *
   * @default 65534
   */
  runAsUser?: number;
  /**
   * @default 65534
   */
  fsGroup?: number;
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesSharedsecretsSecurityContextSeccompProfile;
};

export type GitlabHelmValuesSharedsecretsSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesSharedsecretsContainerSecurityContext = {
  /**
   * @default false
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * @default true
   */
  runAsNonRoot?: boolean;
  /**
   * @default {"drop":["ALL"]}
   */
  capabilities?: GitlabHelmValuesSharedsecretsContainerSecurityContextCapabilities;
};

export type GitlabHelmValuesSharedsecretsContainerSecurityContextCapabilities = {
  drop?: string[];
};

export type GitlabHelmValuesSharedsecretsPodLabels = object;

export type GitlabHelmValuesSharedsecretsAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type GitlabHelmValuesGitlabrunner = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default true
   */
  install?: boolean;
  /**
   * @default {"create":true}
   */
  rbac?: GitlabHelmValuesGitlabrunnerRbac;
  /**
   * @default {"locked":false,"secret":"nonempty","config":"[[runners]]\n  [runners.kubernetes]\n  image = \"ubuntu:22.04\"\n  {{- if .Values.global.minio.enabled }}\n  [runners.cache]\n    Type = \"s3\"\n    Path = \"gitlab-runner\"\n    Shared = true\n    [runners.cache.s3]\n      ServerAddress = {{ include \"gitlab-runner.cache-tpl.s3ServerAddress\" . }}\n      BucketName = \"runner-cache\"\n      BucketLocation = \"us-east-1\"\n      Insecure = false\n  {{ end }}\n"}
   */
  runners?: GitlabHelmValuesGitlabrunnerRunners;
  /**
   * @default {"gitlab.com/prometheus_scrape":"true","gitlab.com/prometheus_port":9252}
   */
  podAnnotations?: GitlabHelmValuesGitlabrunnerPodAnnotations;
  /**
   * @default {"seccompProfile":{"type":"RuntimeDefault"}}
   */
  podSecurityContext?: GitlabHelmValuesGitlabrunnerPodSecurityContext;
};

export type GitlabHelmValuesGitlabrunnerRbac = {
  /**
   * @default true
   */
  create?: boolean;
};

export type GitlabHelmValuesGitlabrunnerRunners = {
  /**
   * @default false
   */
  locked?: boolean;
  /**
   * Set secret to an arbitrary value because the runner chart renders the gitlab-runner.secret template only if it is not empty.
   * The parent/GitLab chart overrides the template to render the actual secret name.
   *
   * @default "nonempty"
   */
  secret?: string;
  /**
   * @default "[[runners]]
  [runners.kubernetes]
  image = "u..."
   */
  config?: string;
};

export type GitlabHelmValuesGitlabrunnerPodAnnotations = {
  /**
   * @default "true"
   */
  "gitlab.com/prometheus_scrape"?: boolean;
  /**
   * @default 9252
   */
  "gitlab.com/prometheus_port"?: number;
};

export type GitlabHelmValuesGitlabrunnerPodSecurityContext = {
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: GitlabHelmValuesGitlabrunnerPodSecurityContextSeccompProfile;
};

export type GitlabHelmValuesGitlabrunnerPodSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type GitlabHelmValuesTraefik = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  install?: boolean;
  /**
   * @default {"gitlab-shell":{"expose":true,"port":2222,"exposedPort":22}}
   */
  ports?: GitlabHelmValuesTraefikPorts;
};

export type GitlabHelmValuesTraefikPorts = {
  /**
   * @default {"expose":true,"port":2222,"exposedPort":22}
   */
  "gitlab-shell"?: GitlabHelmValuesTraefikPortsGitlabshell;
};

export type GitlabHelmValuesTraefikPortsGitlabshell = {
  /**
   * @default true
   */
  expose?: boolean;
  /**
   * @default 2222
   */
  port?: number;
  /**
   * @default 22
   */
  exposedPort?: number;
};

export type GitlabHelmValuesGitlab = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * https://docs.gitlab.com/charts/charts/gitlab/toolbox
   *
   * @default {"replicas":1,"antiAffinityLabels":{"matchLabels":{"app":"gitaly"}}}
   */
  toolbox?: GitlabHelmValuesGitlabToolbox;
};

export type GitlabHelmValuesGitlabToolbox = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default 1
   */
  replicas?: number;
  /**
   * @default {"matchLabels":{"app":"gitaly"}}
   */
  antiAffinityLabels?: GitlabHelmValuesGitlabToolboxAntiAffinityLabels;
};

export type GitlabHelmValuesGitlabToolboxAntiAffinityLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default {"app":"gitaly"}
   */
  matchLabels?: GitlabHelmValuesGitlabToolboxAntiAffinityLabelsMatchLabels;
};

export type GitlabHelmValuesGitlabToolboxAntiAffinityLabelsMatchLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default "gitaly"
   */
  app?: string;
};

export type GitlabHelmValuesGitlabzoekt = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  install?: boolean;
  /**
   * @default {"basicAuth":{"enabled":false,"secretName":"{{ include \"gitlab.zoekt.gateway.basicAuth.secretName\" $ }}"}}
   */
  gateway?: GitlabHelmValuesGitlabzoektGateway;
  /**
   * @default {"internalApi":{"enabled":true,"secretName":"{{ include \"gitlab.zoekt.indexer.internalApi.secretName\" $ }}","secretKey":"{{ include \"gitlab.zoekt.indexer.internalApi.secretKey\" $ }}","gitlabUrl":"{{ include \"gitlab.zoekt.indexer.internalApi.gitlabUrl\" $ }}"}}
   */
  indexer?: GitlabHelmValuesGitlabzoektIndexer;
};

export type GitlabHelmValuesGitlabzoektGateway = {
  /**
   * @default {"enabled":false,"secretName":"{{ include \"gitlab.zoekt.gateway.basicAuth.secretName\" $ }}"}
   */
  basicAuth?: GitlabHelmValuesGitlabzoektGatewayBasicAuth;
};

export type GitlabHelmValuesGitlabzoektGatewayBasicAuth = {
  /**
   * Basic auth is no longer needed because we've switched to using JWT instead
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * @default "{{ include "gitlab.zoekt.gateway.basicAuth.secr..."
   */
  secretName?: string;
};

export type GitlabHelmValuesGitlabzoektIndexer = {
  /**
   * @default {...} (4 keys)
   */
  internalApi?: GitlabHelmValuesGitlabzoektIndexerInternalApi;
};

export type GitlabHelmValuesGitlabzoektIndexerInternalApi = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default "{{ include "gitlab.zoekt.indexer.internalApi.se..."
   */
  secretName?: string;
  /**
   * @default "{{ include "gitlab.zoekt.indexer.internalApi.se..."
   */
  secretKey?: string;
  /**
   * @default "{{ include "gitlab.zoekt.indexer.internalApi.gi..."
   */
  gitlabUrl?: string;
};

export type GitlabHelmValuesOpenbao = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default false
   */
  install?: boolean;
  /**
   * @default {}
   */
  workhorse?: GitlabHelmValuesOpenbaoWorkhorse;
  /**
   * Disable Openbao managed unseal and audting secret and mount secret managed by shared secrets.
   *
   * @default {"generate":false}
   */
  staticUnsealSecret?: GitlabHelmValuesOpenbaoStaticUnsealSecret;
  /**
   * @default {"generate":false}
   */
  httpAuditSecret?: GitlabHelmValuesOpenbaoHttpAuditSecret;
  /**
   * @default "- name: unseal
  secret:
    secretName: '{{ te..."
   */
  extraVolumes?: string;
  /**
   * @default "- name: unseal
  mountPath: /srv/openbao/keys/g..."
   */
  extraVolumeMounts?: string;
  /**
   * @default {}
   */
  psql?: GitlabHelmValuesOpenbaoPsql;
  /**
   * @default {...} (4 keys)
   */
  config?: GitlabHelmValuesOpenbaoConfig;
};

export type GitlabHelmValuesOpenbaoWorkhorse = object;

export type GitlabHelmValuesOpenbaoStaticUnsealSecret = {
  /**
   * @default false
   */
  generate?: boolean;
};

export type GitlabHelmValuesOpenbaoHttpAuditSecret = {
  /**
   * @default false
   */
  generate?: boolean;
};

export type GitlabHelmValuesOpenbaoPsql = object;

export type GitlabHelmValuesOpenbaoConfig = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default {"static":{"enabled":true,"currentKeyId":"gl-unseal-1","currentKey":"/srv/openbao/keys/gl-unseal-1"}}
   */
  unseal?: GitlabHelmValuesOpenbaoConfigUnseal;
  /**
   * Use external hostname in OpenBao auth.
   *
   * @default {"oidcDiscoveryUrl":"{{ include \"gitlab.gitlab.url\" . }}","boundIssuer":"{{ include \"gitlab.gitlab.url\" . }}"}
   */
  initialize?: GitlabHelmValuesOpenbaoConfigInitialize;
  /**
   * @default {"http":{"enabled":false,"streamingUri":"{{ include \"gitlab.workhorse.url\" . }}/api/v4/internal/secrets_manager/audit_logs"}}
   */
  audit?: GitlabHelmValuesOpenbaoConfigAudit;
  /**
   * @default {"postgresql":{"connection":{"host":"","database":"","username":"","sslMode":""}}}
   */
  storage?: GitlabHelmValuesOpenbaoConfigStorage;
};

export type GitlabHelmValuesOpenbaoConfigUnseal = {
  /**
   * @default {"enabled":true,"currentKeyId":"gl-unseal-1","currentKey":"/srv/openbao/keys/gl-unseal-1"}
   */
  static?: GitlabHelmValuesOpenbaoConfigUnsealStatic;
};

export type GitlabHelmValuesOpenbaoConfigUnsealStatic = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default "gl-unseal-1"
   */
  currentKeyId?: string;
  /**
   * @default "/srv/openbao/keys/gl-unseal-1"
   */
  currentKey?: string;
};

export type GitlabHelmValuesOpenbaoConfigInitialize = {
  /**
   * @default "{{ include "gitlab.gitlab.url" . }}"
   */
  oidcDiscoveryUrl?: string;
  /**
   * @default "{{ include "gitlab.gitlab.url" . }}"
   */
  boundIssuer?: string;
};

export type GitlabHelmValuesOpenbaoConfigAudit = {
  /**
   * @default {"enabled":false,"streamingUri":"{{ include \"gitlab.workhorse.url\" . }}/api/v4/internal/secrets_manager/audit_logs"}
   */
  http?: GitlabHelmValuesOpenbaoConfigAuditHttp;
};

export type GitlabHelmValuesOpenbaoConfigAuditHttp = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default "{{ include "gitlab.workhorse.url" . }}/api/v4/i..."
   */
  streamingUri?: string;
};

export type GitlabHelmValuesOpenbaoConfigStorage = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default {"connection":{"host":"","database":"","username":"","sslMode":""}}
   */
  postgresql?: GitlabHelmValuesOpenbaoConfigStoragePostgresql;
};

export type GitlabHelmValuesOpenbaoConfigStoragePostgresql = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * Set predefined keys to empty values to enable us merging these keys
   * with the main DB settings.
   *
   * @default {...} (4 keys)
   */
  connection?: GitlabHelmValuesOpenbaoConfigStoragePostgresqlConnection;
};

export type GitlabHelmValuesOpenbaoConfigStoragePostgresqlConnection = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default ""
   */
  host?: string;
  /**
   * @default ""
   */
  database?: string;
  /**
   * @default ""
   */
  username?: string;
  /**
   * @default ""
   */
  sslMode?: string;
};

export type GitlabHelmValuesEnvoygateway = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default {"envoyGateway":{"gateway":{"controllerName":"gateway.envoyproxy.io/gitlab-gatewayclass-controller"},"extensionApis":{"enableEnvoyPatchPolicy":true}}}
   */
  config?: GitlabHelmValuesEnvoygatewayConfig;
};

export type GitlabHelmValuesEnvoygatewayConfig = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default {"gateway":{"controllerName":"gateway.envoyproxy.io/gitlab-gatewayclass-controller"},"extensionApis":{"enableEnvoyPatchPolicy":true}}
   */
  envoyGateway?: GitlabHelmValuesEnvoygatewayConfigEnvoyGateway;
};

export type GitlabHelmValuesEnvoygatewayConfigEnvoyGateway = {
  /**
   * @default {"controllerName":"gateway.envoyproxy.io/gitlab-gatewayclass-controller"}
   */
  gateway?: GitlabHelmValuesEnvoygatewayConfigEnvoyGatewayGateway;
  /**
   * @default {"enableEnvoyPatchPolicy":true}
   */
  extensionApis?: GitlabHelmValuesEnvoygatewayConfigEnvoyGatewayExtensionApis;
};

export type GitlabHelmValuesEnvoygatewayConfigEnvoyGatewayGateway = {
  /**
   * @default "gateway.envoyproxy.io/gitlab-gatewayclass-contr..."
   */
  controllerName?: string;
};

export type GitlabHelmValuesEnvoygatewayConfigEnvoyGatewayExtensionApis = {
  /**
   * @default true
   */
  enableEnvoyPatchPolicy?: boolean;
};

export type GitlabHelmValues = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * NOTICE
   * Due to the scope and complexity of this chart, all possible values are
   * not documented in this file. Extensive documentation is available.
   * Please read the docs: https://docs.gitlab.com/charts/
   * Because properties are regularly added, updated, or relocated, it is
   * _strongly suggest_ to not "copy and paste" this YAML. Please provide
   * Helm only those properties you need, and allow the defaults to be
   * provided by the version of this chart at the time of deployment.
   * Advanced Configuration
   * https://docs.gitlab.com/charts/advanced
   * Documentation for advanced configuration, such as
   * - External PostgreSQL
   * - External Gitaly
   * - External Redis
   * - External NGINX
   * - External Object Storage providers
   * - PersistentVolume configuration
   * The global properties are used to configure multiple charts at once.
   * https://docs.gitlab.com/charts/charts/globals
   *
   * @default {...} (55 keys)
   */
  global?: GitlabHelmValuesGlobal;
  /**
   * End of global
   *
   * @default {...} (9 keys)
   */
  upgradeCheck?: GitlabHelmValuesUpgradeCheck;
  /**
   * Installation of certmananger.
   * This value replaces `certmanager.install` to allow certmanager schema validation to pass.
   * See dependencies in Chart.yaml for current version
   *
   * @default true
   */
  installCertmanager?: boolean;
  /**
   * Configuration of jetstack/cert-manager
   *
   * @default {"installCRDs":true,"nameOverride":"certmanager"}
   */
  certmanager?: GitlabHelmValuesCertmanager;
  /**
   * https://docs.gitlab.com/charts/charts/nginx/
   * https://docs.gitlab.com/charts/architecture/decisions#nginx-ingress
   * Installation & configuration of charts/ingress-nginx:
   *
   * @default {...} (6 keys)
   */
  "nginx-ingress"?: GitlabHelmValuesNginxingress;
  /**
   * Ingress controller to handle requests forwarded from other Geo sites.
   * Configuration differences compared to the main nginx ingress:
   * - Pass X-Forwarded-For headers as is
   * - Use a different IngressClass name
   *
   * @default {...} (4 keys)
   */
  "nginx-ingress-geo"?: GitlabHelmValuesNginxingressgeo;
  /**
   * @default {"install":false,"controller":{"service":{"type":"LoadBalancer","tcpPorts":[{"name":"ssh","port":22,"targetPort":22}],"enablePorts":{"quic":false}},"extraArgs":["--configmap-tcp-services=$(POD_NAMESPACE)/$(POD_NAMESPACE)-haproxy-tcp"]}}
   */
  haproxy?: GitlabHelmValuesHaproxy;
  /**
   * Installation & configuration of stable/prometheus
   * See dependencies in Chart.yaml for current version
   *
   * @default {...} (10 keys)
   */
  prometheus?: GitlabHelmValuesPrometheus;
  /**
   * Configuration of Redis
   * https://docs.gitlab.com/charts/architecture/decisions#redis
   * https://docs.gitlab.com/charts/installation/deployment.html#redis
   *
   * @default {...} (10 keys)
   */
  redis?: GitlabHelmValuesRedis;
  /**
   * Installation & configuration of stable/postgresql
   * See dependencies in Chart.yaml for current version
   *
   * @default {...} (6 keys)
   */
  postgresql?: GitlabHelmValuesPostgresql;
  /**
   * @default {...} (11 keys)
   */
  "shared-secrets"?: GitlabHelmValuesSharedsecrets;
  /**
   * Installation & configuration of gitlab/gitlab-runner
   * See dependencies in Chart.yaml for current version
   *
   * @default {...} (5 keys)
   */
  "gitlab-runner"?: GitlabHelmValuesGitlabrunner;
  /**
   * @default {"install":false,"ports":{"gitlab-shell":{"expose":true,"port":2222,"exposedPort":22}}}
   */
  traefik?: GitlabHelmValuesTraefik;
  /**
   * Note: Many of these settings are configurable via globals
   * https://docs.gitlab.com/charts/charts/gitlab/migrations
   * Installation & configuration of gitlab/gitlab-zoekt
   *
   * @default {"toolbox":{"replicas":1,"antiAffinityLabels":{"matchLabels":{"app":"gitaly"}}}}
   */
  gitlab?: GitlabHelmValuesGitlab;
  /**
   * @default {"install":false,"gateway":{"basicAuth":{"enabled":false,"secretName":"{{ include \"gitlab.zoekt.gateway.basicAuth.secretName\" $ }}"}},"indexer":{"internalApi":{"enabled":true,"secretName":"{{ include \"gitlab.zoekt.indexer.internalApi.secretName\" $ }}","secretKey":"{{ include \"gitlab.zoekt.indexer.internalApi.secretKey\" $ }}","gitlabUrl":"{{ include \"gitlab.zoekt.indexer.internalApi.gitlabUrl\" $ }}"}}}
   */
  "gitlab-zoekt"?: GitlabHelmValuesGitlabzoekt;
  /**
   * Installation & configuration of OpenBao
   *
   * @default {...} (8 keys)
   */
  openbao?: GitlabHelmValuesOpenbao;
  /**
   * @default {"config":{"envoyGateway":{"gateway":{"controllerName":"gateway.envoyproxy.io/gitlab-gatewayclass-controller"},"extensionApis":{"enableEnvoyPatchPolicy":true}}}}
   */
  "envoy-gateway"?: GitlabHelmValuesEnvoygateway;
};

export type GitlabHelmParameters = {
  "global.edition"?: string;
  "global.gitlabVersion"?: string;
  "global.application.create"?: string;
  "global.application.links"?: string;
  "global.application.allowClusterRoles"?: string;
  "global.hosts.domain"?: string;
  "global.hosts.hostSuffix"?: string;
  "global.hosts.https"?: string;
  "global.hosts.externalIP"?: string;
  "global.hosts.ssh"?: string;
  "global.gatewayApi.enabled"?: string;
  "global.gatewayApi.envoyProxySpec.provider.type"?: string;
  "global.gatewayApi.envoyProxySpec.provider.kubernetes.envoyService.type"?: string;
  "global.gatewayApi.class.name"?: string;
  "global.gatewayApi.class.controllerName"?: string;
  "global.gatewayApi.installEnvoy"?: string;
  "global.gatewayApi.configureCertmanager"?: string;
  "global.gatewayApi.protocol"?: string;
  "global.gatewayApi.addresses"?: string;
  "global.gatewayApi.listeners.certmanager-http.protocol"?: string;
  "global.gatewayApi.listeners.gitlab-web.protocol"?: string;
  "global.gatewayApi.listeners.gitlab-web.tls.mode"?: string;
  "global.gatewayApi.listeners.gitlab-web.tls.certificateRefs.name"?: string;
  "global.gatewayApi.listeners.gitlab-ssh.protocol"?: string;
  "global.gatewayApi.listeners.registry-web.protocol"?: string;
  "global.gatewayApi.listeners.registry-web.tls.mode"?: string;
  "global.gatewayApi.listeners.registry-web.tls.certificateRefs.name"?: string;
  "global.gatewayApi.listeners.pages-web.protocol"?: string;
  "global.gatewayApi.listeners.pages-web.tls.mode"?: string;
  "global.gatewayApi.listeners.pages-web.tls.certificateRefs.name"?: string;
  "global.gatewayApi.listeners.kas-web.protocol"?: string;
  "global.gatewayApi.listeners.kas-web.tls.mode"?: string;
  "global.gatewayApi.listeners.kas-web.tls.certificateRefs.name"?: string;
  "global.gatewayApi.listeners.kas-workspaces-web.protocol"?: string;
  "global.gatewayApi.listeners.kas-workspaces-web.tls.mode"?: string;
  "global.gatewayApi.listeners.kas-workspaces-web.tls.certificateRefs.name"?: string;
  "global.gatewayApi.listeners.kas-registry-web.protocol"?: string;
  "global.gatewayApi.listeners.kas-registry-web.tls.mode"?: string;
  "global.gatewayApi.listeners.kas-registry-web.tls.certificateRefs.name"?: string;
  "global.gatewayApi.listeners.minio-web.protocol"?: string;
  "global.gatewayApi.listeners.minio-web.tls.mode"?: string;
  "global.gatewayApi.listeners.minio-web.tls.certificateRefs.name"?: string;
  "global.ingress.apiVersion"?: string;
  "global.ingress.configureCertmanager"?: string;
  "global.ingress.useNewIngressForCerts"?: string;
  "global.ingress.provider"?: string;
  "global.ingress.enabled"?: string;
  "global.ingress.path"?: string;
  "global.ingress.pathType"?: string;
  "global.hpa.apiVersion"?: string;
  "global.keda.enabled"?: string;
  "global.pdb.apiVersion"?: string;
  "global.batch.cronJob.apiVersion"?: string;
  "global.monitoring.enabled"?: string;
  "global.psql.knownDecompositions"?: string;
  "global.psql.connectTimeout"?: string;
  "global.psql.keepalives"?: string;
  "global.psql.keepalivesIdle"?: string;
  "global.psql.keepalivesInterval"?: string;
  "global.psql.keepalivesCount"?: string;
  "global.psql.tcpUserTimeout"?: string;
  "global.redis.auth.enabled"?: string;
  "global.redis.sentinelAuth.enabled"?: string;
  "global.gitaly.enabled"?: string;
  "global.gitaly.internal.names"?: string;
  "global.gitaly.external"?: string;
  "global.gitaly.service.name"?: string;
  "global.gitaly.service.type"?: string;
  "global.gitaly.service.externalPort"?: string;
  "global.gitaly.service.internalPort"?: string;
  "global.gitaly.service.tls.externalPort"?: string;
  "global.gitaly.service.tls.internalPort"?: string;
  "global.gitaly.tls.enabled"?: string;
  "global.praefect.enabled"?: string;
  "global.praefect.ntpHost"?: string;
  "global.praefect.replaceInternalGitaly"?: string;
  "global.praefect.autoMigrate"?: string;
  "global.praefect.virtualStorages.name"?: string;
  "global.praefect.virtualStorages.gitalyReplicas"?: string;
  "global.praefect.virtualStorages.maxUnavailable"?: string;
  "global.praefect.psql.sslMode"?: string;
  "global.praefect.service.name"?: string;
  "global.praefect.service.type"?: string;
  "global.praefect.service.externalPort"?: string;
  "global.praefect.service.internalPort"?: string;
  "global.praefect.service.tls.externalPort"?: string;
  "global.praefect.service.tls.internalPort"?: string;
  "global.praefect.tls.enabled"?: string;
  "global.minio.enabled"?: string;
  "global.appConfig.relativeUrlRoot"?: string;
  "global.appConfig.enableUsagePing"?: string;
  "global.appConfig.enableSeatLink"?: string;
  "global.appConfig.enableImpersonation"?: string;
  "global.appConfig.applicationSettingsCacheSeconds"?: string;
  "global.appConfig.usernameChangingEnabled"?: string;
  "global.appConfig.issueClosingPattern"?: string;
  "global.appConfig.defaultTheme"?: string;
  "global.appConfig.defaultColorMode"?: string;
  "global.appConfig.defaultSyntaxHighlightingTheme"?: string;
  "global.appConfig.defaultProjectsFeatures.issues"?: string;
  "global.appConfig.defaultProjectsFeatures.mergeRequests"?: string;
  "global.appConfig.defaultProjectsFeatures.wiki"?: string;
  "global.appConfig.defaultProjectsFeatures.snippets"?: string;
  "global.appConfig.defaultProjectsFeatures.builds"?: string;
  "global.appConfig.graphQlTimeout"?: string;
  "global.appConfig.webhookTimeout"?: string;
  "global.appConfig.maxRequestDurationSeconds"?: string;
  "global.appConfig.ciIdTokens.issuerUrl"?: string;
  "global.appConfig.contentSecurityPolicy.enabled"?: string;
  "global.appConfig.contentSecurityPolicy.report_only"?: string;
  "global.appConfig.gravatar.plainUrl"?: string;
  "global.appConfig.gravatar.sslUrl"?: string;
  "global.appConfig.extra.googleAnalyticsId"?: string;
  "global.appConfig.extra.matomoUrl"?: string;
  "global.appConfig.extra.matomoSiteId"?: string;
  "global.appConfig.extra.matomoDisableCookies"?: string;
  "global.appConfig.extra.oneTrustId"?: string;
  "global.appConfig.extra.googleTagManagerNonceId"?: string;
  "global.appConfig.extra.bizible"?: string;
  "global.appConfig.object_store.enabled"?: string;
  "global.appConfig.object_store.proxy_download"?: string;
  "global.appConfig.lfs.enabled"?: string;
  "global.appConfig.lfs.proxy_download"?: string;
  "global.appConfig.lfs.bucket"?: string;
  "global.appConfig.artifacts.enabled"?: string;
  "global.appConfig.artifacts.proxy_download"?: string;
  "global.appConfig.artifacts.bucket"?: string;
  "global.appConfig.uploads.enabled"?: string;
  "global.appConfig.uploads.proxy_download"?: string;
  "global.appConfig.uploads.bucket"?: string;
  "global.appConfig.packages.enabled"?: string;
  "global.appConfig.packages.proxy_download"?: string;
  "global.appConfig.packages.bucket"?: string;
  "global.appConfig.externalDiffs.enabled"?: string;
  "global.appConfig.externalDiffs.when"?: string;
  "global.appConfig.externalDiffs.proxy_download"?: string;
  "global.appConfig.externalDiffs.bucket"?: string;
  "global.appConfig.terraformState.enabled"?: string;
  "global.appConfig.terraformState.bucket"?: string;
  "global.appConfig.ciSecureFiles.enabled"?: string;
  "global.appConfig.ciSecureFiles.bucket"?: string;
  "global.appConfig.dependencyProxy.enabled"?: string;
  "global.appConfig.dependencyProxy.proxy_download"?: string;
  "global.appConfig.dependencyProxy.bucket"?: string;
  "global.appConfig.backups.bucket"?: string;
  "global.appConfig.backups.tmpBucket"?: string;
  "global.appConfig.microsoft_graph_mailer.enabled"?: string;
  "global.appConfig.microsoft_graph_mailer.user_id"?: string;
  "global.appConfig.microsoft_graph_mailer.tenant"?: string;
  "global.appConfig.microsoft_graph_mailer.client_id"?: string;
  "global.appConfig.microsoft_graph_mailer.client_secret.secret"?: string;
  "global.appConfig.microsoft_graph_mailer.client_secret.key"?: string;
  "global.appConfig.microsoft_graph_mailer.azure_ad_endpoint"?: string;
  "global.appConfig.microsoft_graph_mailer.graph_endpoint"?: string;
  "global.appConfig.incomingEmail.enabled"?: string;
  "global.appConfig.incomingEmail.address"?: string;
  "global.appConfig.incomingEmail.host"?: string;
  "global.appConfig.incomingEmail.port"?: string;
  "global.appConfig.incomingEmail.ssl"?: string;
  "global.appConfig.incomingEmail.startTls"?: string;
  "global.appConfig.incomingEmail.user"?: string;
  "global.appConfig.incomingEmail.password.secret"?: string;
  "global.appConfig.incomingEmail.password.key"?: string;
  "global.appConfig.incomingEmail.deleteAfterDelivery"?: string;
  "global.appConfig.incomingEmail.expungeDeleted"?: string;
  "global.appConfig.incomingEmail.logger.logPath"?: string;
  "global.appConfig.incomingEmail.mailbox"?: string;
  "global.appConfig.incomingEmail.idleTimeout"?: string;
  "global.appConfig.incomingEmail.inboxMethod"?: string;
  "global.appConfig.incomingEmail.clientSecret.key"?: string;
  "global.appConfig.incomingEmail.pollInterval"?: string;
  "global.appConfig.incomingEmail.deliveryMethod"?: string;
  "global.appConfig.serviceDeskEmail.enabled"?: string;
  "global.appConfig.serviceDeskEmail.address"?: string;
  "global.appConfig.serviceDeskEmail.host"?: string;
  "global.appConfig.serviceDeskEmail.port"?: string;
  "global.appConfig.serviceDeskEmail.ssl"?: string;
  "global.appConfig.serviceDeskEmail.startTls"?: string;
  "global.appConfig.serviceDeskEmail.user"?: string;
  "global.appConfig.serviceDeskEmail.password.secret"?: string;
  "global.appConfig.serviceDeskEmail.password.key"?: string;
  "global.appConfig.serviceDeskEmail.deleteAfterDelivery"?: string;
  "global.appConfig.serviceDeskEmail.expungeDeleted"?: string;
  "global.appConfig.serviceDeskEmail.logger.logPath"?: string;
  "global.appConfig.serviceDeskEmail.mailbox"?: string;
  "global.appConfig.serviceDeskEmail.idleTimeout"?: string;
  "global.appConfig.serviceDeskEmail.inboxMethod"?: string;
  "global.appConfig.serviceDeskEmail.clientSecret.key"?: string;
  "global.appConfig.serviceDeskEmail.pollInterval"?: string;
  "global.appConfig.serviceDeskEmail.deliveryMethod"?: string;
  "global.appConfig.ldap.preventSignin"?: string;
  "global.appConfig.duoAuth.enabled"?: string;
  "global.appConfig.cell.enabled"?: string;
  "global.appConfig.cell.database.skipSequenceAlteration"?: string;
  "global.appConfig.cell.topologyServiceClient.tls.enabled"?: string;
  "global.appConfig.omniauth.enabled"?: string;
  "global.appConfig.omniauth.autoSignInWithProvider"?: string;
  "global.appConfig.omniauth.syncProfileFromProvider"?: string;
  "global.appConfig.omniauth.syncProfileAttributes"?: string;
  "global.appConfig.omniauth.allowSingleSignOn"?: string;
  "global.appConfig.omniauth.blockAutoCreatedUsers"?: string;
  "global.appConfig.omniauth.autoLinkLdapUser"?: string;
  "global.appConfig.omniauth.autoLinkSamlUser"?: string;
  "global.appConfig.omniauth.autoLinkUser"?: string;
  "global.appConfig.omniauth.externalProviders"?: string;
  "global.appConfig.omniauth.allowBypassTwoFactor"?: string;
  "global.appConfig.omniauth.providers"?: string;
  "global.appConfig.kerberos.enabled"?: string;
  "global.appConfig.kerberos.keytab.key"?: string;
  "global.appConfig.kerberos.servicePrincipalName"?: string;
  "global.appConfig.kerberos.krb5Config"?: string;
  "global.appConfig.kerberos.dedicatedPort.enabled"?: string;
  "global.appConfig.kerberos.dedicatedPort.port"?: string;
  "global.appConfig.kerberos.dedicatedPort.https"?: string;
  "global.appConfig.kerberos.simpleLdapLinkingAllowedRealms"?: string;
  "global.appConfig.sentry.enabled"?: string;
  "global.appConfig.sentry.dsn"?: string;
  "global.appConfig.sentry.clientside_dsn"?: string;
  "global.appConfig.sentry.environment"?: string;
  "global.appConfig.gitlab_docs.enabled"?: string;
  "global.appConfig.gitlab_docs.host"?: string;
  "global.appConfig.oidcProvider.openidIdTokenExpireInSeconds"?: string;
  "global.appConfig.smartcard.enabled"?: string;
  "global.appConfig.smartcard.CASecret"?: string;
  "global.appConfig.smartcard.clientCertificateRequiredHost"?: string;
  "global.appConfig.smartcard.sanExtensions"?: string;
  "global.appConfig.smartcard.requiredForGitAccess"?: string;
  "global.appConfig.sidekiq.routingRules"?: string;
  "global.appConfig.actionCableAllowedOrigins"?: string;
  "global.geo.enabled"?: string;
  "global.geo.role"?: string;
  "global.geo.nodeName"?: string;
  "global.geo.registry.replication.enabled"?: string;
  "global.geo.registry.replication.primaryApiUrl"?: string;
  "global.kas.enabled"?: string;
  "global.kas.service.apiExternalPort"?: string;
  "global.kas.tls.enabled"?: string;
  "global.kas.tls.verify"?: string;
  "global.workspaces.enabled"?: string;
  "global.spamcheck.enabled"?: string;
  "global.shell.tcp.proxyProtocol"?: string;
  "global.rails.bootsnap.enabled"?: string;
  "global.rails.sessionStore.sessionCookieTokenPrefix"?: string;
  "global.registry.bucket"?: string;
  "global.registry.tls.enabled"?: string;
  "global.registry.enabled"?: string;
  "global.registry.host"?: string;
  "global.registry.api.protocol"?: string;
  "global.registry.api.serviceName"?: string;
  "global.registry.api.port"?: string;
  "global.registry.tokenIssuer"?: string;
  "global.pages.enabled"?: string;
  "global.pages.accessControl"?: string;
  "global.pages.path"?: string;
  "global.pages.host"?: string;
  "global.pages.port"?: string;
  "global.pages.https"?: string;
  "global.pages.externalHttp"?: string;
  "global.pages.externalHttps"?: string;
  "global.pages.customDomainMode"?: string;
  "global.pages.artifactsServer"?: string;
  "global.pages.localStore.enabled"?: string;
  "global.pages.objectStore.enabled"?: string;
  "global.pages.objectStore.bucket"?: string;
  "global.pages.namespaceInPath"?: string;
  "global.smtp.enabled"?: string;
  "global.smtp.address"?: string;
  "global.smtp.port"?: string;
  "global.smtp.user_name"?: string;
  "global.smtp.password.secret"?: string;
  "global.smtp.password.key"?: string;
  "global.smtp.authentication"?: string;
  "global.smtp.starttls_auto"?: string;
  "global.smtp.openssl_verify_mode"?: string;
  "global.smtp.open_timeout"?: string;
  "global.smtp.read_timeout"?: string;
  "global.smtp.pool"?: string;
  "global.email.from"?: string;
  "global.email.display_name"?: string;
  "global.email.reply_to"?: string;
  "global.email.subject_suffix"?: string;
  "global.email.smime.enabled"?: string;
  "global.email.smime.secretName"?: string;
  "global.email.smime.keyName"?: string;
  "global.email.smime.certName"?: string;
  "global.time_zone"?: string;
  "global.nodeAffinity"?: string;
  "global.antiAffinity"?: string;
  "global.affinity.podAntiAffinity.topologyKey"?: string;
  "global.affinity.nodeAffinity.key"?: string;
  "global.affinity.nodeAffinity.values"?: string;
  "global.priorityClassName"?: string;
  "global.workhorse.serviceName"?: string;
  "global.workhorse.tls.enabled"?: string;
  "global.webservice.workerTimeout"?: string;
  "global.certificates.image.repository"?: string;
  "global.certificates.customCAs"?: string;
  "global.kubectl.image.repository"?: string;
  "global.kubectl.securityContext.runAsUser"?: string;
  "global.kubectl.securityContext.fsGroup"?: string;
  "global.kubectl.securityContext.seccompProfile.type"?: string;
  "global.gitlabBase.image.repository"?: string;
  "global.serviceAccount.enabled"?: string;
  "global.serviceAccount.create"?: string;
  "global.serviceAccount.automountServiceAccountToken"?: string;
  "global.tracing.connection.string"?: string;
  "global.tracing.urlTemplate"?: string;
  "global.openbao.enabled"?: string;
  "global.openbao.host"?: string;
  "global.openbao.https"?: string;
  "global.openbao.url"?: string;
  "global.openbao.httpAudit.secret"?: string;
  "global.openbao.httpAudit.key"?: string;
  "global.job.nameSuffixOverride"?: string;
  "global.traefik.apiVersion"?: string;
  "upgradeCheck.enabled"?: string;
  "upgradeCheck.securityContext.runAsUser"?: string;
  "upgradeCheck.securityContext.fsGroup"?: string;
  "upgradeCheck.securityContext.seccompProfile.type"?: string;
  "upgradeCheck.containerSecurityContext.runAsUser"?: string;
  "upgradeCheck.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "upgradeCheck.containerSecurityContext.runAsNonRoot"?: string;
  "upgradeCheck.containerSecurityContext.capabilities.drop"?: string;
  "upgradeCheck.tolerations"?: string;
  "upgradeCheck.resources.requests.cpu"?: string;
  "upgradeCheck.resources.limits.cpu"?: string;
  "upgradeCheck.priorityClassName"?: string;
  installCertmanager?: string;
  "certmanager.installCRDs"?: string;
  "certmanager.nameOverride"?: string;
  "nginx-ingress.enabled"?: string;
  "nginx-ingress.tcpExternalConfig"?: string;
  "nginx-ingress.controller.podSecurityContext.seccompProfile.type"?: string;
  "nginx-ingress.controller.image.registry"?: string;
  "nginx-ingress.controller.image.image"?: string;
  "nginx-ingress.controller.image.tag"?: string;
  "nginx-ingress.controller.image.digest"?: string;
  "nginx-ingress.controller.addHeaders.Referrer-Policy"?: string;
  "nginx-ingress.controller.config.annotation-value-word-blocklist"?: string;
  "nginx-ingress.controller.config.hsts"?: string;
  "nginx-ingress.controller.config.hsts-include-subdomains"?: string;
  "nginx-ingress.controller.config.hsts-max-age"?: string;
  "nginx-ingress.controller.config.server-name-hash-bucket-size"?: string;
  "nginx-ingress.controller.config.use-http2"?: string;
  "nginx-ingress.controller.config.ssl-ciphers"?: string;
  "nginx-ingress.controller.config.ssl-protocols"?: string;
  "nginx-ingress.controller.config.server-tokens"?: string;
  "nginx-ingress.controller.config.upstream-keepalive-connections"?: string;
  "nginx-ingress.controller.config.upstream-keepalive-time"?: string;
  "nginx-ingress.controller.config.upstream-keepalive-timeout"?: string;
  "nginx-ingress.controller.config.upstream-keepalive-requests"?: string;
  "nginx-ingress.controller.electionID"?: string;
  "nginx-ingress.controller.service.externalTrafficPolicy"?: string;
  "nginx-ingress.controller.service.ipFamilies"?: string;
  "nginx-ingress.controller.service.ipFamilyPolicy"?: string;
  "nginx-ingress.controller.service.appProtocol"?: string;
  "nginx-ingress.controller.service.internal.appProtocol"?: string;
  "nginx-ingress.controller.ingressClassByName"?: string;
  "nginx-ingress.controller.ingressClassResource.name"?: string;
  "nginx-ingress.controller.resources.requests.cpu"?: string;
  "nginx-ingress.controller.resources.requests.memory"?: string;
  "nginx-ingress.controller.resources.limits.cpu"?: string;
  "nginx-ingress.controller.resources.limits.memory"?: string;
  "nginx-ingress.controller.publishService.enabled"?: string;
  "nginx-ingress.controller.replicaCount"?: string;
  "nginx-ingress.controller.minAvailable"?: string;
  "nginx-ingress.controller.scope.enabled"?: string;
  "nginx-ingress.controller.metrics.enabled"?: string;
  "nginx-ingress.controller.metrics.service.annotations.gitlab.com/prometheus_scrape"?: string;
  "nginx-ingress.controller.metrics.service.annotations.gitlab.com/prometheus_port"?: string;
  "nginx-ingress.controller.metrics.service.annotations.prometheus.io/scrape"?: string;
  "nginx-ingress.controller.metrics.service.annotations.prometheus.io/port"?: string;
  "nginx-ingress.controller.admissionWebhooks.enabled"?: string;
  "nginx-ingress.defaultBackend.podSecurityContext.seccompProfile.type"?: string;
  "nginx-ingress.defaultBackend.resources.requests.cpu"?: string;
  "nginx-ingress.defaultBackend.resources.requests.memory"?: string;
  "nginx-ingress.defaultBackend.resources.limits.cpu"?: string;
  "nginx-ingress.defaultBackend.resources.limits.memory"?: string;
  "nginx-ingress.rbac.create"?: string;
  "nginx-ingress.rbac.scope"?: string;
  "nginx-ingress.serviceAccount.create"?: string;
  "nginx-ingress-geo.<<.enabled"?: string;
  "nginx-ingress-geo.<<.tcpExternalConfig"?: string;
  "nginx-ingress-geo.<<.controller.podSecurityContext.seccompProfile.type"?: string;
  "nginx-ingress-geo.<<.controller.image.registry"?: string;
  "nginx-ingress-geo.<<.controller.image.image"?: string;
  "nginx-ingress-geo.<<.controller.image.tag"?: string;
  "nginx-ingress-geo.<<.controller.image.digest"?: string;
  "nginx-ingress-geo.<<.controller.addHeaders.Referrer-Policy"?: string;
  "nginx-ingress-geo.<<.controller.config.annotation-value-word-blocklist"?: string;
  "nginx-ingress-geo.<<.controller.config.hsts"?: string;
  "nginx-ingress-geo.<<.controller.config.hsts-include-subdomains"?: string;
  "nginx-ingress-geo.<<.controller.config.hsts-max-age"?: string;
  "nginx-ingress-geo.<<.controller.config.server-name-hash-bucket-size"?: string;
  "nginx-ingress-geo.<<.controller.config.use-http2"?: string;
  "nginx-ingress-geo.<<.controller.config.ssl-ciphers"?: string;
  "nginx-ingress-geo.<<.controller.config.ssl-protocols"?: string;
  "nginx-ingress-geo.<<.controller.config.server-tokens"?: string;
  "nginx-ingress-geo.<<.controller.config.upstream-keepalive-connections"?: string;
  "nginx-ingress-geo.<<.controller.config.upstream-keepalive-time"?: string;
  "nginx-ingress-geo.<<.controller.config.upstream-keepalive-timeout"?: string;
  "nginx-ingress-geo.<<.controller.config.upstream-keepalive-requests"?: string;
  "nginx-ingress-geo.<<.controller.electionID"?: string;
  "nginx-ingress-geo.<<.controller.service.externalTrafficPolicy"?: string;
  "nginx-ingress-geo.<<.controller.service.ipFamilies"?: string;
  "nginx-ingress-geo.<<.controller.service.ipFamilyPolicy"?: string;
  "nginx-ingress-geo.<<.controller.service.appProtocol"?: string;
  "nginx-ingress-geo.<<.controller.service.internal.appProtocol"?: string;
  "nginx-ingress-geo.<<.controller.ingressClassByName"?: string;
  "nginx-ingress-geo.<<.controller.ingressClassResource.name"?: string;
  "nginx-ingress-geo.<<.controller.resources.requests.cpu"?: string;
  "nginx-ingress-geo.<<.controller.resources.requests.memory"?: string;
  "nginx-ingress-geo.<<.controller.resources.limits.cpu"?: string;
  "nginx-ingress-geo.<<.controller.resources.limits.memory"?: string;
  "nginx-ingress-geo.<<.controller.publishService.enabled"?: string;
  "nginx-ingress-geo.<<.controller.replicaCount"?: string;
  "nginx-ingress-geo.<<.controller.minAvailable"?: string;
  "nginx-ingress-geo.<<.controller.scope.enabled"?: string;
  "nginx-ingress-geo.<<.controller.metrics.enabled"?: string;
  "nginx-ingress-geo.<<.controller.metrics.service.annotations.gitlab.com/prometheus_scrape"?: string;
  "nginx-ingress-geo.<<.controller.metrics.service.annotations.gitlab.com/prometheus_port"?: string;
  "nginx-ingress-geo.<<.controller.metrics.service.annotations.prometheus.io/scrape"?: string;
  "nginx-ingress-geo.<<.controller.metrics.service.annotations.prometheus.io/port"?: string;
  "nginx-ingress-geo.<<.controller.admissionWebhooks.enabled"?: string;
  "nginx-ingress-geo.<<.defaultBackend.podSecurityContext.seccompProfile.type"?: string;
  "nginx-ingress-geo.<<.defaultBackend.resources.requests.cpu"?: string;
  "nginx-ingress-geo.<<.defaultBackend.resources.requests.memory"?: string;
  "nginx-ingress-geo.<<.defaultBackend.resources.limits.cpu"?: string;
  "nginx-ingress-geo.<<.defaultBackend.resources.limits.memory"?: string;
  "nginx-ingress-geo.<<.rbac.create"?: string;
  "nginx-ingress-geo.<<.rbac.scope"?: string;
  "nginx-ingress-geo.<<.serviceAccount.create"?: string;
  "nginx-ingress-geo.enabled"?: string;
  "nginx-ingress-geo.controller.<<.podSecurityContext.seccompProfile.type"?: string;
  "nginx-ingress-geo.controller.<<.image.registry"?: string;
  "nginx-ingress-geo.controller.<<.image.image"?: string;
  "nginx-ingress-geo.controller.<<.image.tag"?: string;
  "nginx-ingress-geo.controller.<<.image.digest"?: string;
  "nginx-ingress-geo.controller.<<.addHeaders.Referrer-Policy"?: string;
  "nginx-ingress-geo.controller.<<.config.annotation-value-word-blocklist"?: string;
  "nginx-ingress-geo.controller.<<.config.hsts"?: string;
  "nginx-ingress-geo.controller.<<.config.hsts-include-subdomains"?: string;
  "nginx-ingress-geo.controller.<<.config.hsts-max-age"?: string;
  "nginx-ingress-geo.controller.<<.config.server-name-hash-bucket-size"?: string;
  "nginx-ingress-geo.controller.<<.config.use-http2"?: string;
  "nginx-ingress-geo.controller.<<.config.ssl-ciphers"?: string;
  "nginx-ingress-geo.controller.<<.config.ssl-protocols"?: string;
  "nginx-ingress-geo.controller.<<.config.server-tokens"?: string;
  "nginx-ingress-geo.controller.<<.config.upstream-keepalive-connections"?: string;
  "nginx-ingress-geo.controller.<<.config.upstream-keepalive-time"?: string;
  "nginx-ingress-geo.controller.<<.config.upstream-keepalive-timeout"?: string;
  "nginx-ingress-geo.controller.<<.config.upstream-keepalive-requests"?: string;
  "nginx-ingress-geo.controller.<<.electionID"?: string;
  "nginx-ingress-geo.controller.<<.service.externalTrafficPolicy"?: string;
  "nginx-ingress-geo.controller.<<.service.ipFamilies"?: string;
  "nginx-ingress-geo.controller.<<.service.ipFamilyPolicy"?: string;
  "nginx-ingress-geo.controller.<<.service.appProtocol"?: string;
  "nginx-ingress-geo.controller.<<.service.internal.appProtocol"?: string;
  "nginx-ingress-geo.controller.<<.ingressClassByName"?: string;
  "nginx-ingress-geo.controller.<<.ingressClassResource.name"?: string;
  "nginx-ingress-geo.controller.<<.resources.requests.cpu"?: string;
  "nginx-ingress-geo.controller.<<.resources.requests.memory"?: string;
  "nginx-ingress-geo.controller.<<.resources.limits.cpu"?: string;
  "nginx-ingress-geo.controller.<<.resources.limits.memory"?: string;
  "nginx-ingress-geo.controller.<<.publishService.enabled"?: string;
  "nginx-ingress-geo.controller.<<.replicaCount"?: string;
  "nginx-ingress-geo.controller.<<.minAvailable"?: string;
  "nginx-ingress-geo.controller.<<.scope.enabled"?: string;
  "nginx-ingress-geo.controller.<<.metrics.enabled"?: string;
  "nginx-ingress-geo.controller.<<.metrics.service.annotations.gitlab.com/prometheus_scrape"?: string;
  "nginx-ingress-geo.controller.<<.metrics.service.annotations.gitlab.com/prometheus_port"?: string;
  "nginx-ingress-geo.controller.<<.metrics.service.annotations.prometheus.io/scrape"?: string;
  "nginx-ingress-geo.controller.<<.metrics.service.annotations.prometheus.io/port"?: string;
  "nginx-ingress-geo.controller.<<.admissionWebhooks.enabled"?: string;
  "nginx-ingress-geo.controller.config.<<.annotation-value-word-blocklist"?: string;
  "nginx-ingress-geo.controller.config.<<.hsts"?: string;
  "nginx-ingress-geo.controller.config.<<.hsts-include-subdomains"?: string;
  "nginx-ingress-geo.controller.config.<<.hsts-max-age"?: string;
  "nginx-ingress-geo.controller.config.<<.server-name-hash-bucket-size"?: string;
  "nginx-ingress-geo.controller.config.<<.use-http2"?: string;
  "nginx-ingress-geo.controller.config.<<.ssl-ciphers"?: string;
  "nginx-ingress-geo.controller.config.<<.ssl-protocols"?: string;
  "nginx-ingress-geo.controller.config.<<.server-tokens"?: string;
  "nginx-ingress-geo.controller.config.<<.upstream-keepalive-connections"?: string;
  "nginx-ingress-geo.controller.config.<<.upstream-keepalive-time"?: string;
  "nginx-ingress-geo.controller.config.<<.upstream-keepalive-timeout"?: string;
  "nginx-ingress-geo.controller.config.<<.upstream-keepalive-requests"?: string;
  "nginx-ingress-geo.controller.config.use-forwarded-headers"?: string;
  "nginx-ingress-geo.controller.electionID"?: string;
  "nginx-ingress-geo.controller.ingressClassResource.name"?: string;
  "nginx-ingress-geo.controller.ingressClassResource.controllerValue"?: string;
  "nginx-ingress-geo.externalIpTpl"?: string;
  "haproxy.install"?: string;
  "haproxy.controller.service.type"?: string;
  "haproxy.controller.service.tcpPorts.name"?: string;
  "haproxy.controller.service.tcpPorts.port"?: string;
  "haproxy.controller.service.tcpPorts.targetPort"?: string;
  "haproxy.controller.service.enablePorts.quic"?: string;
  "haproxy.controller.extraArgs"?: string;
  "prometheus.install"?: string;
  "prometheus.rbac.create"?: string;
  "prometheus.alertmanager.enabled"?: string;
  "prometheus.kube-state-metrics.enabled"?: string;
  "prometheus.prometheus-node-exporter.enabled"?: string;
  "prometheus.prometheus-pushgateway.enabled"?: string;
  "prometheus.server.retention"?: string;
  "prometheus.server.strategy.type"?: string;
  "prometheus.server.containerSecurityContext.runAsUser"?: string;
  "prometheus.server.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "prometheus.server.containerSecurityContext.runAsNonRoot"?: string;
  "prometheus.server.containerSecurityContext.capabilities.drop"?: string;
  "prometheus.server.containerSecurityContext.seccompProfile.type"?: string;
  "prometheus.podSecurityPolicy.enabled"?: string;
  "prometheus.configmapReload.prometheus.containerSecurityContext.runAsUser"?: string;
  "prometheus.configmapReload.prometheus.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "prometheus.configmapReload.prometheus.containerSecurityContext.runAsNonRoot"?: string;
  "prometheus.configmapReload.prometheus.containerSecurityContext.capabilities.drop"?: string;
  "prometheus.configmapReload.prometheus.containerSecurityContext.seccompProfile.type"?: string;
  "prometheus.serverFiles.prometheus.yml.scrape_configs.job_name"?: string;
  "prometheus.serverFiles.prometheus.yml.scrape_configs.static_configs.targets"?: string;
  "redis.install"?: string;
  "redis.image.repository"?: string;
  "redis.auth.existingSecret"?: string;
  "redis.auth.existingSecretKey"?: string;
  "redis.auth.usePasswordFiles"?: string;
  "redis.architecture"?: string;
  "redis.cluster.enabled"?: string;
  "redis.metrics.enabled"?: string;
  "redis.metrics.image.repository"?: string;
  "redis.sentinel.enabled"?: string;
  "redis.sentinel.image.repository"?: string;
  "redis.kubectl.enabled"?: string;
  "redis.kubectl.image.repository"?: string;
  "redis.sysctl.enabled"?: string;
  "redis.sysctl.image.repository"?: string;
  "redis.volumePermissions.enabled"?: string;
  "redis.volumePermissions.image.repository"?: string;
  "postgresql.install"?: string;
  "postgresql.auth.password"?: string;
  "postgresql.auth.postgresPassword"?: string;
  "postgresql.auth.usePasswordFiles"?: string;
  "postgresql.auth.existingSecret"?: string;
  "postgresql.auth.secretKeys.adminPasswordKey"?: string;
  "postgresql.auth.secretKeys.userPasswordKey"?: string;
  "postgresql.image.repository"?: string;
  "postgresql.image.tag"?: string;
  "postgresql.volumePermissions.enabled"?: string;
  "postgresql.volumePermissions.image.repository"?: string;
  "postgresql.primary.initdb.scriptsConfigMap"?: string;
  "postgresql.primary.extraVolumeMounts.name"?: string;
  "postgresql.primary.extraVolumeMounts.mountPath"?: string;
  "postgresql.primary.extraVolumeMounts.subPath"?: string;
  "postgresql.primary.extraVolumes.name"?: string;
  "postgresql.primary.extraVolumes.projected.sources.secret.name"?: string;
  "postgresql.primary.extraVolumes.projected.sources.secret.items.key"?: string;
  "postgresql.primary.extraVolumes.projected.sources.secret.items.path"?: string;
  "postgresql.primary.podAnnotations.postgresql.gitlab/init-revision"?: string;
  "postgresql.metrics.enabled"?: string;
  "postgresql.metrics.image.repository"?: string;
  "postgresql.metrics.service.annotations.prometheus.io/scrape"?: string;
  "postgresql.metrics.service.annotations.prometheus.io/port"?: string;
  "postgresql.metrics.service.annotations.gitlab.com/prometheus_scrape"?: string;
  "postgresql.metrics.service.annotations.gitlab.com/prometheus_port"?: string;
  "shared-secrets.enabled"?: string;
  "shared-secrets.rbac.create"?: string;
  "shared-secrets.selfsign.image.repository"?: string;
  "shared-secrets.selfsign.keyAlgorithm"?: string;
  "shared-secrets.selfsign.keySize"?: string;
  "shared-secrets.selfsign.expiry"?: string;
  "shared-secrets.selfsign.caSubject"?: string;
  "shared-secrets.env"?: string;
  "shared-secrets.serviceAccount.enabled"?: string;
  "shared-secrets.serviceAccount.create"?: string;
  "shared-secrets.serviceAccount.name"?: string;
  "shared-secrets.resources.requests.cpu"?: string;
  "shared-secrets.resources.limits.cpu"?: string;
  "shared-secrets.securityContext.runAsUser"?: string;
  "shared-secrets.securityContext.fsGroup"?: string;
  "shared-secrets.securityContext.seccompProfile.type"?: string;
  "shared-secrets.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "shared-secrets.containerSecurityContext.runAsNonRoot"?: string;
  "shared-secrets.containerSecurityContext.capabilities.drop"?: string;
  "shared-secrets.tolerations"?: string;
  "gitlab-runner.install"?: string;
  "gitlab-runner.rbac.create"?: string;
  "gitlab-runner.runners.locked"?: string;
  "gitlab-runner.runners.secret"?: string;
  "gitlab-runner.runners.config"?: string;
  "gitlab-runner.podAnnotations.gitlab.com/prometheus_scrape"?: string;
  "gitlab-runner.podAnnotations.gitlab.com/prometheus_port"?: string;
  "gitlab-runner.podSecurityContext.seccompProfile.type"?: string;
  "traefik.install"?: string;
  "traefik.ports.gitlab-shell.expose"?: string;
  "traefik.ports.gitlab-shell.port"?: string;
  "traefik.ports.gitlab-shell.exposedPort"?: string;
  "gitlab.toolbox.replicas"?: string;
  "gitlab.toolbox.antiAffinityLabels.matchLabels.app"?: string;
  "gitlab-zoekt.install"?: string;
  "gitlab-zoekt.gateway.basicAuth.enabled"?: string;
  "gitlab-zoekt.gateway.basicAuth.secretName"?: string;
  "gitlab-zoekt.indexer.internalApi.enabled"?: string;
  "gitlab-zoekt.indexer.internalApi.secretName"?: string;
  "gitlab-zoekt.indexer.internalApi.secretKey"?: string;
  "gitlab-zoekt.indexer.internalApi.gitlabUrl"?: string;
  "openbao.install"?: string;
  "openbao.staticUnsealSecret.generate"?: string;
  "openbao.httpAuditSecret.generate"?: string;
  "openbao.extraVolumes"?: string;
  "openbao.extraVolumeMounts"?: string;
  "openbao.config.unseal.static.enabled"?: string;
  "openbao.config.unseal.static.currentKeyId"?: string;
  "openbao.config.unseal.static.currentKey"?: string;
  "openbao.config.initialize.oidcDiscoveryUrl"?: string;
  "openbao.config.initialize.boundIssuer"?: string;
  "openbao.config.audit.http.enabled"?: string;
  "openbao.config.audit.http.streamingUri"?: string;
  "openbao.config.storage.postgresql.connection.host"?: string;
  "openbao.config.storage.postgresql.connection.database"?: string;
  "openbao.config.storage.postgresql.connection.username"?: string;
  "openbao.config.storage.postgresql.connection.sslMode"?: string;
  "envoy-gateway.config.envoyGateway.gateway.controllerName"?: string;
  "envoy-gateway.config.envoyGateway.extensionApis.enableEnvoyPatchPolicy"?: string;
};
