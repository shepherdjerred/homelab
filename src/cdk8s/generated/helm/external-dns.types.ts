// Generated TypeScript types for external-dns Helm chart

export type ExternaldnsHelmValuesGlobal = {
  /**
   * @schema item: object
   *
   * Global image pull secrets.
   *
   * @default []
   */
  imagePullSecrets?: object[];
};

export type ExternaldnsHelmValuesImage = {
  /**
   * @schema additionalProperties: false
   * Image repository for the `external-dns` container.
   *
   * Image repository for the `external-dns` container.
   *
   * @default "registry.k8s.io/external-dns/external-dns"
   */
  repository?: string;
  /**
   * Image tag for the `external-dns` container, this will default to `.Chart.AppVersion` if not set.
   * @schema type:[string, null]
   * Image pull policy for the `external-dns` container.
   *
   * Image tag for the `external-dns` container, this will default to `.Chart.AppVersion` if not set.
   *
   * @default null
   */
  tag?: string | null;
  /**
   * @schema enum:[IfNotPresent, Always]
   *
   * Image pull policy for the `external-dns` container.
   *
   * @default "IfNotPresent"
   */
  pullPolicy?: "IfNotPresent" | "Always";
};

export type ExternaldnsHelmValuesCommonLabels = object;

export type ExternaldnsHelmValuesServiceAccount = {
  /**
   * If `true`, create a new `ServiceAccount`.
   *
   * If `true`, create a new `ServiceAccount`.
   *
   * @default true
   */
  create?: boolean;
  /**
   * Labels to add to the service account.
   *
   * Labels to add to the service account.
   *
   * @default {}
   */
  labels?: ExternaldnsHelmValuesServiceAccountLabels;
  /**
   * Annotations to add to the service account. Templates are allowed in both the key and the value. Example: `example.com/annotation/{{ .Values.nameOverride }}: {{ .Values.nameOverride }}`
   *
   * Annotations to add to the service account. Templates are allowed in both the key and the value. Example: `example.com/annotation/{{ .Values.nameOverride }}: {{ .Values.nameOverride }}`
   *
   * @default {}
   */
  annotations?: ExternaldnsHelmValuesServiceAccountAnnotations;
  /**
   * (string) If this is set and `serviceAccount.create` is `true` this will be used for the created `ServiceAccount` name, if set and `serviceAccount.create` is `false` then this will define an existing `ServiceAccount` to use.
   * @schema type:[string, null]; default: null
   * Set this to `false` to [opt out of API credential automounting](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting) for the `ServiceAccount`.
   *
   * If this is set and `serviceAccount.create` is `true` this will be used for the created `ServiceAccount` name, if set and `serviceAccount.create` is `false` then this will define an existing `ServiceAccount` to use.
   *
   * @default null
   */
  name?: string | null;
  /**
   * Set this to `false` to [opt out of API credential automounting](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting) for the `ServiceAccount`.
   *
   * @default true
   */
  automountServiceAccountToken?: boolean;
};

export type ExternaldnsHelmValuesServiceAccountLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type ExternaldnsHelmValuesServiceAccountAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type ExternaldnsHelmValuesService = {
  /**
   * Service annotations.
   *
   * Service annotations.
   *
   * @default {}
   */
  annotations?: ExternaldnsHelmValuesServiceAnnotations;
  /**
   * Service HTTP port.
   * @schema minimum:0; default:7979
   *
   * Service HTTP port.
   *
   * @default 7979
   */
  port?: number;
  /**
   * Service IP families (e.g. IPv4 and/or IPv6).
   * @schema type: [array, null]; item: string; itemEnum: ["IPv4", "IPv6"]; minItems:0; maxItems:2; uniqueItems: true
   *
   * Service IP families (e.g. IPv4 and/or IPv6).
   *
   * @default []
   */
  ipFamilies?: unknown[] | null;
  /**
   * - IPv4
   * - IPv6
   * Service IP family policy.
   * @schema type: [string, null];  enum:[SingleStack, PreferDualStack, RequireDualStack, null]
   *
   * Service IP family policy.
   *
   * @default null
   */
  ipFamilyPolicy?: "SingleStack" | "PreferDualStack" | "RequireDualStack" | null;
};

export type ExternaldnsHelmValuesServiceAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type ExternaldnsHelmValuesRbac = {
  /**
   * @schema additionalProperties: true
   * If `true`, create a `ClusterRole` & `ClusterRoleBinding` with access to the Kubernetes API.
   *
   * If `true`, create a `ClusterRole` & `ClusterRoleBinding` with access to the Kubernetes API.
   *
   * @default true
   */
  create?: boolean;
  /**
   * Additional rules to add to the `ClusterRole`.
   *
   * Additional rules to add to the `ClusterRole`.
   *
   * @default []
   */
  additionalPermissions?: unknown[];
};

export type ExternaldnsHelmValuesDeploymentAnnotations = object;

export type ExternaldnsHelmValuesDeploymentStrategy = {
  /**
   * @schema enum:[Recreate, RollingUpdate]; type:string; default: Recreate
   *
   * @default "Recreate"
   */
  type?: "Recreate" | "RollingUpdate";
};

export type ExternaldnsHelmValuesPodLabels = object;

export type ExternaldnsHelmValuesPodAnnotations = object;

export type ExternaldnsHelmValuesPodSecurityContext = {
  /**
   * @default true
   */
  runAsNonRoot?: boolean;
  /**
   * @default 65534
   */
  fsGroup?: number;
  /**
   * @default {"type":"RuntimeDefault"}
   */
  seccompProfile?: ExternaldnsHelmValuesPodSecurityContextSeccompProfile;
};

export type ExternaldnsHelmValuesPodSecurityContextSeccompProfile = {
  /**
   * @default "RuntimeDefault"
   */
  type?: string;
};

export type ExternaldnsHelmValuesSecurityContext = {
  /**
   * @default false
   */
  privileged?: boolean;
  /**
   * @default false
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * @default true
   */
  readOnlyRootFilesystem?: boolean;
  /**
   * @default true
   */
  runAsNonRoot?: boolean;
  /**
   * @default 65532
   */
  runAsUser?: number;
  /**
   * @default 65532
   */
  runAsGroup?: number;
  /**
   * @default {"drop":["ALL"]}
   */
  capabilities?: ExternaldnsHelmValuesSecurityContextCapabilities;
};

export type ExternaldnsHelmValuesSecurityContextCapabilities = {
  /**
   * @default ["ALL"]
   */
  drop?: string[];
};

export type ExternaldnsHelmValuesLivenessProbe = {
  /**
   * @default {"path":"/healthz","port":"http"}
   */
  httpGet?: ExternaldnsHelmValuesLivenessProbeHttpGet;
  /**
   * @default 10
   */
  initialDelaySeconds?: number;
  /**
   * @default 10
   */
  periodSeconds?: number;
  /**
   * @default 5
   */
  timeoutSeconds?: number;
  /**
   * @default 2
   */
  failureThreshold?: number;
  /**
   * @default 1
   */
  successThreshold?: number;
};

export type ExternaldnsHelmValuesLivenessProbeHttpGet = {
  /**
   * @default "/healthz"
   */
  path?: string;
  /**
   * @default "http"
   */
  port?: string;
};

export type ExternaldnsHelmValuesReadinessProbe = {
  /**
   * @default {"path":"/healthz","port":"http"}
   */
  httpGet?: ExternaldnsHelmValuesReadinessProbeHttpGet;
  /**
   * @default 5
   */
  initialDelaySeconds?: number;
  /**
   * @default 10
   */
  periodSeconds?: number;
  /**
   * @default 5
   */
  timeoutSeconds?: number;
  /**
   * @default 6
   */
  failureThreshold?: number;
  /**
   * @default 1
   */
  successThreshold?: number;
};

export type ExternaldnsHelmValuesReadinessProbeHttpGet = {
  /**
   * @default "/healthz"
   */
  path?: string;
  /**
   * @default "http"
   */
  port?: string;
};

export type ExternaldnsHelmValuesResources = object;

export type ExternaldnsHelmValuesNodeSelector = object;

export type ExternaldnsHelmValuesAffinity = object;

export type ExternaldnsHelmValuesServiceMonitor = {
  /**
   * If `true`, create a `ServiceMonitor` resource to support the _Prometheus Operator_.
   *
   * If `true`, create a `ServiceMonitor` resource to support the _Prometheus Operator_.
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * Additional labels for the `ServiceMonitor`.
   *
   * Additional labels for the `ServiceMonitor`.
   *
   * @default {}
   */
  additionalLabels?: ExternaldnsHelmValuesServiceMonitorAdditionalLabels;
  /**
   * Annotations to add to the `ServiceMonitor`.
   *
   * Annotations to add to the `ServiceMonitor`.
   *
   * @default {}
   */
  annotations?: ExternaldnsHelmValuesServiceMonitorAnnotations;
  /**
   * (string) If set create the `ServiceMonitor` in an alternate namespace.
   * @schema type:[string, null]; default: null
   * (string) If set override the _Prometheus_ default interval.
   *
   * If set create the `ServiceMonitor` in an alternate namespace.
   *
   * @default null
   */
  namespace?: string | null;
  /**
   * @schema type:[string, null]; default: null
   * (string) If set override the _Prometheus_ default scrape timeout.
   *
   * If set override the _Prometheus_ default interval.
   *
   * @default null
   */
  interval?: string | null;
  /**
   * @schema type:[string, null]; default: null
   * (string) If set overrides the _Prometheus_ default scheme.
   *
   * If set override the _Prometheus_ default scrape timeout.
   *
   * @default null
   */
  scrapeTimeout?: string | null;
  /**
   * @schema type:[string, null]; default: null
   * Configure the `ServiceMonitor` [TLS config](https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#tlsconfig).
   *
   * If set overrides the _Prometheus_ default scheme.
   *
   * @default null
   */
  scheme?: string | null;
  /**
   * Configure the `ServiceMonitor` [TLS config](https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#tlsconfig).
   *
   * @default {}
   */
  tlsConfig?: ExternaldnsHelmValuesServiceMonitorTlsConfig;
  /**
   * (string) Provide a bearer token file for the `ServiceMonitor`.
   * @schema type:[string, null]; default: null
   * [Relabel configs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config) to apply to samples before ingestion.
   *
   * Provide a bearer token file for the `ServiceMonitor`.
   *
   * @default null
   */
  bearerTokenFile?: string | null;
  /**
   * [Relabel configs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config) to apply to samples before ingestion.
   *
   * @default []
   */
  relabelings?: unknown[];
  /**
   * [Metric relabel configs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#metric_relabel_configs) to apply to samples before ingestion.
   *
   * [Metric relabel configs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#metric_relabel_configs) to apply to samples before ingestion.
   *
   * @default []
   */
  metricRelabelings?: unknown[];
  /**
   * Provide target labels for the `ServiceMonitor`.
   *
   * Provide target labels for the `ServiceMonitor`.
   *
   * @default []
   */
  targetLabels?: unknown[];
};

export type ExternaldnsHelmValuesServiceMonitorAdditionalLabels = object;

export type ExternaldnsHelmValuesServiceMonitorAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type ExternaldnsHelmValuesServiceMonitorTlsConfig = object;

export type ExternaldnsHelmValuesProvider = {
  /**
   * @schema type: [object, string]
   * _ExternalDNS_ provider name; for the available providers and how to configure them see [README](https://github.com/kubernetes-sigs/external-dns/blob/master/charts/external-dns/README.md#providers).
   *
   * _ExternalDNS_ provider name; for the available providers and how to configure them see [README](https://github.com/kubernetes-sigs/external-dns/blob/master/charts/external-dns/README.md#providers).
   *
   * @default "aws"
   */
  name?: string;
  /**
   * @default {...} (10 keys)
   */
  webhook?: ExternaldnsHelmValuesProviderWebhook;
};

export type ExternaldnsHelmValuesProviderWebhook = {
  /**
   * @default {"repository":null,"tag":null,"pullPolicy":"IfNotPresent"}
   */
  image?: ExternaldnsHelmValuesProviderWebhookImage;
  /**
   * [Environment variables](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/) for the `webhook` container.
   *
   * [Environment variables](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/) for the `webhook` container.
   *
   * @default []
   */
  env?: unknown[];
  /**
   * Extra arguments to provide for the `webhook` container.
   *
   * Extra arguments to provide for the `webhook` container.
   *
   * @default []
   */
  args?: unknown[];
  /**
   * Extra [volume mounts](https://kubernetes.io/docs/concepts/storage/volumes/) for the `webhook` container.
   *
   * Extra [volume mounts](https://kubernetes.io/docs/concepts/storage/volumes/) for the `webhook` container.
   *
   * @default []
   */
  extraVolumeMounts?: unknown[];
  /**
   * [Resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for the `webhook` container.
   *
   * [Resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for the `webhook` container.
   *
   * @default {}
   */
  resources?: ExternaldnsHelmValuesProviderWebhookResources;
  /**
   * [Pod security context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-container) for the `webhook` container.
   *
   * [Pod security context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-container) for the `webhook` container.
   *
   * @default {}
   */
  securityContext?: ExternaldnsHelmValuesProviderWebhookSecurityContext;
  /**
   * [Liveness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) configuration for the `external-dns` container.
   *
   * [Liveness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) configuration for the `external-dns` container.
   *
   * @default {...} (6 keys)
   */
  livenessProbe?: ExternaldnsHelmValuesProviderWebhookLivenessProbe;
  /**
   * [Readiness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) configuration for the `webhook` container.
   *
   * [Readiness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) configuration for the `webhook` container.
   *
   * @default {...} (6 keys)
   */
  readinessProbe?: ExternaldnsHelmValuesProviderWebhookReadinessProbe;
  /**
   * @default {"port":8080}
   */
  service?: ExternaldnsHelmValuesProviderWebhookService;
  /**
   * Optional [Service Monitor](https://prometheus-operator.dev/docs/operator/design/#servicemonitor) configuration for the `webhook` container.
   *
   * Optional [Service Monitor](https://prometheus-operator.dev/docs/operator/design/#servicemonitor) configuration for the `webhook` container.
   *
   * @default {...} (7 keys)
   */
  serviceMonitor?: ExternaldnsHelmValuesProviderWebhookServiceMonitor;
};

export type ExternaldnsHelmValuesProviderWebhookImage = {
  /**
   * @schema type:[string, null]; default: null
   * (string) Image tag for the `webhook` container.
   *
   * Image repository for the `webhook` container.
   *
   * @default null
   */
  repository?: string | null;
  /**
   * @schema type:[string, null]; default: null
   * Image pull policy for the `webhook` container.
   *
   * Image tag for the `webhook` container.
   *
   * @default null
   */
  tag?: string | null;
  /**
   * Image pull policy for the `webhook` container.
   *
   * @default "IfNotPresent"
   */
  pullPolicy?: string;
};

export type ExternaldnsHelmValuesProviderWebhookResources = object;

export type ExternaldnsHelmValuesProviderWebhookSecurityContext = object;

export type ExternaldnsHelmValuesProviderWebhookLivenessProbe = {
  /**
   * @default {"path":"/healthz","port":"http-webhook"}
   */
  httpGet?: ExternaldnsHelmValuesProviderWebhookLivenessProbeHttpGet;
  /**
   * @schema type:[integer, null]; default: null
   *
   * @default 10
   */
  initialDelaySeconds?: number | null;
  /**
   * @schema type:[integer, null]; default: null
   *
   * @default 10
   */
  periodSeconds?: number | null;
  /**
   * @schema type:[integer, null]; default: null
   *
   * @default 5
   */
  timeoutSeconds?: number | null;
  /**
   * @schema type:[integer, null]; default: null
   *
   * @default 2
   */
  failureThreshold?: number | null;
  /**
   * @schema type:[integer, null]; default: null
   *
   * @default 1
   */
  successThreshold?: number | null;
};

export type ExternaldnsHelmValuesProviderWebhookLivenessProbeHttpGet = {
  /**
   * @schema type:[string, null]; default: null
   *
   * @default "/healthz"
   */
  path?: string | null;
  /**
   * @schema type:[integer,string]; default: string
   *
   * @default "string"
   */
  port?: number | string;
};

export type ExternaldnsHelmValuesProviderWebhookReadinessProbe = {
  /**
   * @default {"path":"/healthz","port":"http-webhook"}
   */
  httpGet?: ExternaldnsHelmValuesProviderWebhookReadinessProbeHttpGet;
  /**
   * @schema type:[integer, null]; default: null
   *
   * @default 5
   */
  initialDelaySeconds?: number | null;
  /**
   * @schema type:[integer, null]; default: null
   *
   * @default 10
   */
  periodSeconds?: number | null;
  /**
   * @schema type:[integer, null]; default: null
   *
   * @default 5
   */
  timeoutSeconds?: number | null;
  /**
   * @schema type:[integer, null]; default: null
   *
   * @default 6
   */
  failureThreshold?: number | null;
  /**
   * @schema type:[integer, null]; default: null
   *
   * @default 1
   */
  successThreshold?: number | null;
};

export type ExternaldnsHelmValuesProviderWebhookReadinessProbeHttpGet = {
  /**
   * @schema type:[string, null]; default: null
   *
   * @default "/healthz"
   */
  path?: string | null;
  /**
   * @schema type:[integer,string]; default: string
   *
   * @default "string"
   */
  port?: number | string;
};

export type ExternaldnsHelmValuesProviderWebhookService = {
  /**
   * Webhook exposed HTTP port for the service.
   *
   * Webhook exposed HTTP port for the service.
   *
   * @default 8080
   */
  port?: number;
};

export type ExternaldnsHelmValuesProviderWebhookServiceMonitor = {
  /**
   * @schema type:[string, null]; default: null
   *
   * @default null
   */
  interval?: string | null;
  /**
   * @schema type:[string, null]; default: null
   *
   * @default null
   */
  scheme?: string | null;
  /**
   * @default {}
   */
  tlsConfig?: ExternaldnsHelmValuesProviderWebhookServiceMonitorTlsConfig;
  /**
   * @schema type:[string, null]; default: null
   *
   * @default null
   */
  bearerTokenFile?: string | null;
  /**
   * @schema type:[string, null]; default: null
   *
   * @default null
   */
  scrapeTimeout?: string | null;
  /**
   * @default []
   */
  metricRelabelings?: unknown[];
  /**
   * @default []
   */
  relabelings?: unknown[];
};

export type ExternaldnsHelmValuesProviderWebhookServiceMonitorTlsConfig = object;

export type ExternaldnsHelmValuesSecretConfiguration = {
  /**
   * If `true`, create a `Secret` to store sensitive provider configuration (**DEPRECATED**).
   *
   * If `true`, create a `Secret` to store sensitive provider configuration (**DEPRECATED**).
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * Mount path for the `Secret`, this can be templated.
   * @schema type:[string, null]; default: null
   * Sub-path for mounting the `Secret`, this can be templated.
   *
   * Mount path for the `Secret`, this can be templated.
   *
   * @default null
   */
  mountPath?: string | null;
  /**
   * @schema type:[string, null]; default: null
   * `Secret` data.
   *
   * Sub-path for mounting the `Secret`, this can be templated.
   *
   * @default null
   */
  subPath?: string | null;
  /**
   * `Secret` data.
   *
   * @default {}
   */
  data?: ExternaldnsHelmValuesSecretConfigurationData;
};

export type ExternaldnsHelmValuesSecretConfigurationData = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type ExternaldnsHelmValues = {
  /**
   * @default {"imagePullSecrets":[]}
   */
  global?: ExternaldnsHelmValuesGlobal;
  /**
   * @default {"repository":"registry.k8s.io/external-dns/external-dns","tag":null,"pullPolicy":"IfNotPresent"}
   */
  image?: ExternaldnsHelmValuesImage;
  /**
   * Image pull secrets.
   * @schema item: object
   *
   * Image pull secrets.
   *
   * @default []
   */
  imagePullSecrets?: object[];
  /**
   * (string) Override the name of the chart.
   * @schema type:[string, null]; default: null
   *
   * Override the name of the chart.
   *
   * @default null
   */
  nameOverride?: string | null;
  /**
   * (string) Override the full name of the chart.
   * @schema type:[string, null]; default: null
   *
   * Override the full name of the chart.
   *
   * @default null
   */
  fullnameOverride?: string | null;
  /**
   * Labels to add to all chart resources.
   *
   * Labels to add to all chart resources.
   *
   * @default {}
   */
  commonLabels?: ExternaldnsHelmValuesCommonLabels;
  /**
   * @default {...} (5 keys)
   */
  serviceAccount?: ExternaldnsHelmValuesServiceAccount;
  /**
   * @default {...} (4 keys)
   */
  service?: ExternaldnsHelmValuesService;
  /**
   * @default {"create":true,"additionalPermissions":[]}
   */
  rbac?: ExternaldnsHelmValuesRbac;
  /**
   * Annotations to add to the `Deployment`.
   *
   * Annotations to add to the `Deployment`.
   *
   * @default {}
   */
  deploymentAnnotations?: ExternaldnsHelmValuesDeploymentAnnotations;
  /**
   * Extra containers to add to the `Deployment`.
   *
   * Extra containers to add to the `Deployment`.
   *
   * @default []
   */
  extraContainers?: unknown[];
  /**
   * [Deployment Strategy](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy).
   *
   * [Deployment Strategy](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy).
   *
   * @default {"type":"Recreate"}
   */
  deploymentStrategy?: ExternaldnsHelmValuesDeploymentStrategy;
  /**
   * (int) Specify the number of old `ReplicaSets` to retain to allow rollback of the `Deployment``.
   * @schema type:[integer, null];minimum:0
   *
   * Specify the number of old `ReplicaSets` to retain to allow rollback of the `Deployment``.
   *
   * @default null
   */
  revisionHistoryLimit?: number | null;
  /**
   * Labels to add to the `Pod`.
   *
   * Labels to add to the `Pod`.
   *
   * @default {}
   */
  podLabels?: ExternaldnsHelmValuesPodLabels;
  /**
   * Annotations to add to the `Pod`.
   *
   * Annotations to add to the `Pod`.
   *
   * @default {}
   */
  podAnnotations?: ExternaldnsHelmValuesPodAnnotations;
  /**
   * (bool) Set this to `false` to [opt out of API credential automounting](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting) for the `Pod`.
   *
   * Set this to `false` to [opt out of API credential automounting](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting) for the `Pod`.
   *
   * @default true
   */
  automountServiceAccountToken?: boolean;
  /**
   * If `true`, the `Pod` will have [process namespace sharing](https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/) enabled.
   *
   * If `true`, the `Pod` will have [process namespace sharing](https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/) enabled.
   *
   * @default false
   */
  shareProcessNamespace?: boolean;
  /**
   * [Pod security context](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#podsecuritycontext-v1-core), this supports full customisation.
   *
   * [Pod security context](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#podsecuritycontext-v1-core), this supports full customisation.
   *
   * @default {"runAsNonRoot":true,"fsGroup":65534,"seccompProfile":{"type":"RuntimeDefault"}}
   */
  podSecurityContext?: ExternaldnsHelmValuesPodSecurityContext;
  /**
   * (string) Priority class name for the `Pod`.
   * @schema type:[string, null]; default: null
   *
   * Priority class name for the `Pod`.
   *
   * @default null
   */
  priorityClassName?: string | null;
  /**
   * (int) Termination grace period for the `Pod` in seconds.
   * @schema type:[integer, null]
   *
   * Termination grace period for the `Pod` in seconds.
   *
   * @default null
   */
  terminationGracePeriodSeconds?: number | null;
  /**
   * (string) [DNS policy](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy) for the pod, if not set the default will be used.
   * @schema type:[string, null]; default: null
   *
   * [DNS policy](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy) for the pod, if not set the default will be used.
   *
   * @default null
   */
  dnsPolicy?: string | null;
  /**
   * (object) [DNS config](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config) for the pod, if not set the default will be used.
   * @schema type:[object, null]; default: null
   *
   * [DNS config](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config) for the pod, if not set the default will be used.
   *
   * @default null
   */
  dnsConfig?: object | null;
  /**
   * [Init containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) to add to the `Pod` definition.
   *
   * [Init containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) to add to the `Pod` definition.
   *
   * @default []
   */
  initContainers?: unknown[];
  /**
   * [Security context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-container) for the `external-dns` container.
   *
   * [Security context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-container) for the `external-dns` container.
   *
   * @default {...} (7 keys)
   */
  securityContext?: ExternaldnsHelmValuesSecurityContext;
  /**
   * [Environment variables](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/) for the `external-dns` container.
   *
   * [Environment variables](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/) for the `external-dns` container.
   *
   * @default []
   */
  env?: unknown[];
  /**
   * [Liveness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) configuration for the `external-dns` container.
   *
   * [Liveness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) configuration for the `external-dns` container.
   *
   * @default {...} (6 keys)
   */
  livenessProbe?: ExternaldnsHelmValuesLivenessProbe;
  /**
   * [Readiness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) configuration for the `external-dns` container.
   *
   * [Readiness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) configuration for the `external-dns` container.
   *
   * @default {...} (6 keys)
   */
  readinessProbe?: ExternaldnsHelmValuesReadinessProbe;
  /**
   * Extra [volumes](https://kubernetes.io/docs/concepts/storage/volumes/) for the `Pod`.
   *
   * Extra [volumes](https://kubernetes.io/docs/concepts/storage/volumes/) for the `Pod`.
   *
   * @default []
   */
  extraVolumes?: unknown[];
  /**
   * Extra [volume mounts](https://kubernetes.io/docs/concepts/storage/volumes/) for the `external-dns` container.
   *
   * Extra [volume mounts](https://kubernetes.io/docs/concepts/storage/volumes/) for the `external-dns` container.
   *
   * @default []
   */
  extraVolumeMounts?: unknown[];
  /**
   * [Resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for the `external-dns` container.
   *
   * [Resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for the `external-dns` container.
   *
   * @default {}
   */
  resources?: ExternaldnsHelmValuesResources;
  /**
   * Node labels to match for `Pod` [scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/).
   *
   * Node labels to match for `Pod` [scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/).
   *
   * @default {}
   */
  nodeSelector?: ExternaldnsHelmValuesNodeSelector;
  /**
   * Affinity settings for `Pod` [scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/). If an explicit label selector is not provided for pod affinity or pod anti-affinity one will be created from the pod selector labels.
   *
   * Affinity settings for `Pod` [scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/). If an explicit label selector is not provided for pod affinity or pod anti-affinity one will be created from the pod selector labels.
   *
   * @default {}
   */
  affinity?: ExternaldnsHelmValuesAffinity;
  /**
   * Topology spread constraints for `Pod` [scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/). If an explicit label selector is not provided one will be created from the pod selector labels.
   *
   * Topology spread constraints for `Pod` [scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/). If an explicit label selector is not provided one will be created from the pod selector labels.
   *
   * @default []
   */
  topologySpreadConstraints?: unknown[];
  /**
   * Node taints which will be tolerated for `Pod` [scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/).
   *
   * Node taints which will be tolerated for `Pod` [scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/).
   *
   * @default []
   */
  tolerations?: unknown[];
  /**
   * @default {...} (12 keys)
   */
  serviceMonitor?: ExternaldnsHelmValuesServiceMonitor;
  /**
   * Log level.
   * @schema enum:[panic, debug, info, warning, error, fatal]; type:string; default: "info"
   *
   * Log level.
   *
   * @default "info"
   */
  logLevel?: "panic" | "debug" | "info" | "warning" | "error" | "fatal";
  /**
   * Log format.
   * @schema enum:["text", "json"]; type:string; default: "text"
   *
   * Log format.
   *
   * @default "text"
   */
  logFormat?: "text" | "json";
  /**
   * Interval for DNS updates.
   *
   * Interval for DNS updates.
   *
   * @default "1m"
   */
  interval?: string;
  /**
   * If `true`, triggers run loop on create/update/delete events in addition of regular interval.
   *
   * If `true`, triggers run loop on create/update/delete events in addition of regular interval.
   *
   * @default false
   */
  triggerLoopOnEvent?: boolean;
  /**
   * if `true`, _ExternalDNS_ will run in a namespaced scope (`Role`` and `Rolebinding`` will be namespaced too).
   *
   * if `true`, _ExternalDNS_ will run in a namespaced scope (`Role`` and `Rolebinding`` will be namespaced too).
   *
   * @default false
   */
  namespaced?: boolean;
  /**
   * _Gateway API_ gateway namespace to watch.
   * @schema type:[string, null]; default: null
   *
   * _Gateway API_ gateway namespace to watch.
   *
   * @default null
   */
  gatewayNamespace?: string | null;
  /**
   * _Kubernetes_ resources to monitor for DNS entries.
   *
   * _Kubernetes_ resources to monitor for DNS entries.
   *
   * @default ["service","ingress"]
   */
  sources?: string[];
  /**
   * How DNS records are synchronized between sources and providers; available values are `create-only`, `sync`, & `upsert-only`.
   * @schema enum:[create-only, sync, upsert-only]; type:string; default: "upsert-only"
   *
   * How DNS records are synchronized between sources and providers; available values are `create-only`, `sync`, & `upsert-only`.
   *
   * @default "upsert-only"
   */
  policy?: "create-only" | "sync" | "upsert-only";
  /**
   * Specify the registry for storing ownership and labels.
   * Valid values are `txt`, `aws-sd`, `dynamodb` & `noop`.
   * @schema enum:[txt, aws-sd, dynamodb, noop]; default: "txt"
   *
   * Specify the registry for storing ownership and labels. Valid values are `txt`, `aws-sd`, `dynamodb` & `noop`.
   *
   * @default "txt"
   */
  registry?: "txt" | "aws-sd" | "dynamodb" | "noop";
  /**
   * (string) Specify an identifier for this instance of _ExternalDNS_ when using a registry other than `noop`.
   * @schema type:[string, null]; default: null
   * (string) Specify a prefix for the domain names of TXT records created for the `txt` registry.
   *
   * Specify an identifier for this instance of _ExternalDNS_ when using a registry other than `noop`.
   *
   * @default null
   */
  txtOwnerId?: string | null;
  /**
   * Mutually exclusive with `txtSuffix`.
   * @schema type:[string, null]; default: null
   * (string) Specify a suffix for the domain names of TXT records created for the `txt` registry.
   *
   * Specify a prefix for the domain names of TXT records created for the `txt` registry. Mutually exclusive with `txtSuffix`.
   *
   * @default null
   */
  txtPrefix?: string | null;
  /**
   * Mutually exclusive with `txtPrefix`.
   * @schema type:[string, null]; default: null
   *
   * Specify a suffix for the domain names of TXT records created for the `txt` registry. Mutually exclusive with `txtPrefix`.
   *
   * @default null
   */
  txtSuffix?: string | null;
  /**
   * Limit possible target zones by domain suffixes.
   *
   * Limit possible target zones by domain suffixes.
   *
   * @default []
   */
  domainFilters?: unknown[];
  /**
   * Intentionally exclude domains from being managed.
   *
   * Intentionally exclude domains from being managed.
   *
   * @default []
   */
  excludeDomains?: unknown[];
  /**
   * Filter resources queried for endpoints by label selector.
   * @schema type: [string,null]; default: null
   *
   * Filter resources queried for endpoints by label selector.
   *
   * @default null
   */
  labelFilter?: string | null;
  /**
   * Filter resources queried for endpoints by annotation selector.
   * @schema type: [string,null]; default: null
   *
   * Filter resources queried for endpoints by annotation selector.
   *
   * @default null
   */
  annotationFilter?: string | null;
  /**
   * Annotation prefix for external-dns annotations (useful for split horizon DNS with multiple instances).
   * @schema type: [string,null]; default: null
   *
   * Annotation prefix for external-dns annotations (useful for split horizon DNS with multiple instances).
   *
   * @default null
   */
  annotationPrefix?: string | null;
  /**
   * Record types to manage (default: A, AAAA, CNAME)
   * @schema type: [array, null]; item: string; uniqueItems: true
   *
   * Record types to manage (default: A, AAAA, CNAME)
   *
   * @default []
   */
  managedRecordTypes?: unknown[] | null;
  /**
   * @default {"name":"aws","webhook":{"image":{"repository":null,"tag":null,"pullPolicy":"IfNotPresent"},"env":[],"args":[],"extraVolumeMounts":[],"resources":{},"securityContext":{},"livenessProbe":{"httpGet":{"path":"/healthz","port":"http-webhook"},"initialDelaySeconds":10,"periodSeconds":10,"timeoutSeconds":5,"failureThreshold":2,"successThreshold":1},"readinessProbe":{"httpGet":{"path":"/healthz","port":"http-webhook"},"initialDelaySeconds":5,"periodSeconds":10,"timeoutSeconds":5,"failureThreshold":6,"successThreshold":1},"service":{"port":8080},"serviceMonitor":{"interval":null,"scheme":null,"tlsConfig":{},"bearerTokenFile":null,"scrapeTimeout":null,"metricRelabelings":[],"relabelings":[]}}}
   */
  provider?: ExternaldnsHelmValuesProvider;
  /**
   * Extra arguments to provide to _ExternalDNS_.
   * An array or map can be used, with maps allowing for value overrides; maps also support slice values to use the same arg multiple times.
   * @schema type: [array, null, object]; item: string; uniqueItems: true
   *
   * Extra arguments to provide to _ExternalDNS_. An array or map can be used, with maps allowing for value overrides; maps also support slice values to use the same arg multiple times.
   *
   * @default {}
   */
  extraArgs?: unknown[] | null | object;
  /**
   * @default {...} (4 keys)
   */
  secretConfiguration?: ExternaldnsHelmValuesSecretConfiguration;
  /**
   * (bool) No effect - reserved for use in sub-charting.
   * @schema type: [boolean, null]; description: No effect - reserved for use in sub-charting
   *
   * No effect - reserved for use in sub-charting
   *
   * @default null
   */
  enabled?: boolean | null;
};

export type ExternaldnsHelmParameters = {
  "global.imagePullSecrets"?: string;
  "image.repository"?: string;
  "image.tag"?: string;
  "image.pullPolicy"?: string;
  imagePullSecrets?: string;
  nameOverride?: string;
  fullnameOverride?: string;
  "serviceAccount.create"?: string;
  "serviceAccount.name"?: string;
  "serviceAccount.automountServiceAccountToken"?: string;
  "service.port"?: string;
  "service.ipFamilies"?: string;
  "service.ipFamilyPolicy"?: string;
  "rbac.create"?: string;
  "rbac.additionalPermissions"?: string;
  extraContainers?: string;
  "deploymentStrategy.type"?: string;
  revisionHistoryLimit?: string;
  automountServiceAccountToken?: string;
  shareProcessNamespace?: string;
  "podSecurityContext.runAsNonRoot"?: string;
  "podSecurityContext.fsGroup"?: string;
  "podSecurityContext.seccompProfile.type"?: string;
  priorityClassName?: string;
  terminationGracePeriodSeconds?: string;
  dnsPolicy?: string;
  dnsConfig?: string;
  initContainers?: string;
  "securityContext.privileged"?: string;
  "securityContext.allowPrivilegeEscalation"?: string;
  "securityContext.readOnlyRootFilesystem"?: string;
  "securityContext.runAsNonRoot"?: string;
  "securityContext.runAsUser"?: string;
  "securityContext.runAsGroup"?: string;
  "securityContext.capabilities.drop"?: string;
  env?: string;
  "livenessProbe.httpGet.path"?: string;
  "livenessProbe.httpGet.port"?: string;
  "livenessProbe.initialDelaySeconds"?: string;
  "livenessProbe.periodSeconds"?: string;
  "livenessProbe.timeoutSeconds"?: string;
  "livenessProbe.failureThreshold"?: string;
  "livenessProbe.successThreshold"?: string;
  "readinessProbe.httpGet.path"?: string;
  "readinessProbe.httpGet.port"?: string;
  "readinessProbe.initialDelaySeconds"?: string;
  "readinessProbe.periodSeconds"?: string;
  "readinessProbe.timeoutSeconds"?: string;
  "readinessProbe.failureThreshold"?: string;
  "readinessProbe.successThreshold"?: string;
  extraVolumes?: string;
  extraVolumeMounts?: string;
  topologySpreadConstraints?: string;
  tolerations?: string;
  "serviceMonitor.enabled"?: string;
  "serviceMonitor.namespace"?: string;
  "serviceMonitor.interval"?: string;
  "serviceMonitor.scrapeTimeout"?: string;
  "serviceMonitor.scheme"?: string;
  "serviceMonitor.bearerTokenFile"?: string;
  "serviceMonitor.relabelings"?: string;
  "serviceMonitor.metricRelabelings"?: string;
  "serviceMonitor.targetLabels"?: string;
  logLevel?: string;
  logFormat?: string;
  interval?: string;
  triggerLoopOnEvent?: string;
  namespaced?: string;
  gatewayNamespace?: string;
  sources?: string;
  policy?: string;
  registry?: string;
  txtOwnerId?: string;
  txtPrefix?: string;
  txtSuffix?: string;
  domainFilters?: string;
  excludeDomains?: string;
  labelFilter?: string;
  annotationFilter?: string;
  annotationPrefix?: string;
  managedRecordTypes?: string;
  "provider.name"?: string;
  "provider.webhook.image.repository"?: string;
  "provider.webhook.image.tag"?: string;
  "provider.webhook.image.pullPolicy"?: string;
  "provider.webhook.env"?: string;
  "provider.webhook.args"?: string;
  "provider.webhook.extraVolumeMounts"?: string;
  "provider.webhook.livenessProbe.httpGet.path"?: string;
  "provider.webhook.livenessProbe.httpGet.port"?: string;
  "provider.webhook.livenessProbe.initialDelaySeconds"?: string;
  "provider.webhook.livenessProbe.periodSeconds"?: string;
  "provider.webhook.livenessProbe.timeoutSeconds"?: string;
  "provider.webhook.livenessProbe.failureThreshold"?: string;
  "provider.webhook.livenessProbe.successThreshold"?: string;
  "provider.webhook.readinessProbe.httpGet.path"?: string;
  "provider.webhook.readinessProbe.httpGet.port"?: string;
  "provider.webhook.readinessProbe.initialDelaySeconds"?: string;
  "provider.webhook.readinessProbe.periodSeconds"?: string;
  "provider.webhook.readinessProbe.timeoutSeconds"?: string;
  "provider.webhook.readinessProbe.failureThreshold"?: string;
  "provider.webhook.readinessProbe.successThreshold"?: string;
  "provider.webhook.service.port"?: string;
  "provider.webhook.serviceMonitor.interval"?: string;
  "provider.webhook.serviceMonitor.scheme"?: string;
  "provider.webhook.serviceMonitor.bearerTokenFile"?: string;
  "provider.webhook.serviceMonitor.scrapeTimeout"?: string;
  "provider.webhook.serviceMonitor.metricRelabelings"?: string;
  "provider.webhook.serviceMonitor.relabelings"?: string;
  extraArgs?: string;
  "secretConfiguration.enabled"?: string;
  "secretConfiguration.mountPath"?: string;
  "secretConfiguration.subPath"?: string;
  enabled?: string;
};
