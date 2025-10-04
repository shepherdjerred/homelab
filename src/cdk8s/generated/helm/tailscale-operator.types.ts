// Generated TypeScript types for tailscale-operator Helm chart

export type TailscaleoperatorHelmValuesOauth = object;

export type TailscaleoperatorHelmValuesOauthSecretVolume = object;

export type TailscaleoperatorHelmValuesOperatorConfig = {
  defaultTags?: string[];
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default {...} (4 keys)
   */
  image?: TailscaleoperatorHelmValuesOperatorConfigImage;
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default "info"
   */
  logging?: string;
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default "tailscale-operator"
   */
  hostname?: string;
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default {"kubernetes.io/os":"linux"}
   */
  nodeSelector?: TailscaleoperatorHelmValuesOperatorConfigNodeSelector;
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default {}
   */
  resources?: TailscaleoperatorHelmValuesOperatorConfigResources;
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default {}
   */
  podAnnotations?: TailscaleoperatorHelmValuesOperatorConfigPodAnnotations;
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default {}
   */
  podLabels?: TailscaleoperatorHelmValuesOperatorConfigPodLabels;
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default {}
   */
  serviceAccountAnnotations?: TailscaleoperatorHelmValuesOperatorConfigServiceAccountAnnotations;
  tolerations?: unknown[];
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default {}
   */
  affinity?: TailscaleoperatorHelmValuesOperatorConfigAffinity;
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default {}
   */
  podSecurityContext?: TailscaleoperatorHelmValuesOperatorConfigPodSecurityContext;
  /**
   * Multiple tags are defined as array items and passed to the operator as a comma-separated string
   *
   * @default {}
   */
  securityContext?: TailscaleoperatorHelmValuesOperatorConfigSecurityContext;
  extraEnv?: unknown[];
};

export type TailscaleoperatorHelmValuesOperatorConfigImage = {
  /**
   * Repository defaults to DockerHub, but images are also synced to ghcr.io/tailscale/k8s-operator.
   *
   * @default "tailscale/k8s-operator"
   */
  repository?: string;
  /**
   * Digest will be prioritized over tag. If neither are set appVersion will be
   * used.
   *
   * @default ""
   */
  tag?: string;
  /**
   * Repository defaults to DockerHub, but images are also synced to ghcr.io/tailscale/k8s-operator.
   *
   * @default ""
   */
  digest?: string;
  /**
   * Repository defaults to DockerHub, but images are also synced to ghcr.io/tailscale/k8s-operator.
   *
   * @default "Always"
   */
  pullPolicy?: string;
};

export type TailscaleoperatorHelmValuesOperatorConfigNodeSelector = {
  /**
   * @default "linux"
   */
  "kubernetes.io/os"?: string;
};

export type TailscaleoperatorHelmValuesOperatorConfigResources = object;

export type TailscaleoperatorHelmValuesOperatorConfigPodAnnotations = object;

export type TailscaleoperatorHelmValuesOperatorConfigPodLabels = object;

export type TailscaleoperatorHelmValuesOperatorConfigServiceAccountAnnotations = object;

export type TailscaleoperatorHelmValuesOperatorConfigAffinity = object;

export type TailscaleoperatorHelmValuesOperatorConfigPodSecurityContext = object;

export type TailscaleoperatorHelmValuesOperatorConfigSecurityContext = object;

export type TailscaleoperatorHelmValuesIngressClass = {
  /**
   * Allows for customization of the ingress class name used by the operator to identify ingresses to reconcile. This does
   * not allow multiple operator instances to manage different ingresses, but provides an onboarding route for users that
   * may have previously set up ingress classes named "tailscale" prior to using the operator.
   *
   * @default "tailscale"
   */
  name?: string;
  /**
   * Allows for customization of the ingress class name used by the operator to identify ingresses to reconcile. This does
   * not allow multiple operator instances to manage different ingresses, but provides an onboarding route for users that
   * may have previously set up ingress classes named "tailscale" prior to using the operator.
   *
   * @default true
   */
  enabled?: boolean;
};

export type TailscaleoperatorHelmValuesProxyConfig = {
  /**
   * Configure the proxy image to use instead of the default tailscale/tailscale:latest.
   * Applying a ProxyClass with `spec.statefulSet.pod.tailscaleContainer.image`
   * set will override any defaults here.
   * Note that ProxyGroups of type "kube-apiserver" use a different default image,
   * tailscale/k8s-proxy:latest, and it is currently only possible to override
   * that image via the same ProxyClass field.
   *
   * @default {"repository":"tailscale/tailscale","tag":"","digest":""}
   */
  image?: TailscaleoperatorHelmValuesProxyConfigImage;
  /**
   * Multiple tags can be passed as a comma-separated string i.e 'tag:k8s-proxies,tag:prod'.
   * Note that if you pass multiple tags to this field via `--set` flag to helm upgrade/install commands you must escape the comma (for example, "tag:k8s-proxies\,tag:prod"). See https://github.com/helm/helm/issues/1556
   *
   * @default "tag:k8s"
   */
  defaultTags?: string;
  /**
   * Configure the proxy image to use instead of the default tailscale/tailscale:latest.
   * Applying a ProxyClass with `spec.statefulSet.pod.tailscaleContainer.image`
   * set will override any defaults here.
   * Note that ProxyGroups of type "kube-apiserver" use a different default image,
   * tailscale/k8s-proxy:latest, and it is currently only possible to override
   * that image via the same ProxyClass field.
   *
   * @default "auto"
   */
  firewallMode?: string;
  /**
   * If defined, this proxy class will be used as the default proxy class for
   * service and ingress resources that do not have a proxy class defined. It
   * does not apply to Connector resources.
   *
   * @default ""
   */
  defaultProxyClass?: string;
};

export type TailscaleoperatorHelmValuesProxyConfigImage = {
  /**
   * Repository defaults to DockerHub, but images are also synced to ghcr.io/tailscale/tailscale.
   *
   * @default "tailscale/tailscale"
   */
  repository?: string;
  /**
   * Digest will be prioritized over tag. If neither are set appVersion will be
   * used.
   *
   * @default ""
   */
  tag?: string;
  /**
   * Repository defaults to DockerHub, but images are also synced to ghcr.io/tailscale/tailscale.
   *
   * @default ""
   */
  digest?: string;
};

export type TailscaleoperatorHelmValuesApiServerProxyConfig = {
  /**
   * Set to "true" to create the ClusterRole permissions required for the API
   * server proxy's auth mode. In auth mode, the API server proxy impersonates
   * groups and users based on tailnet ACL grants. Required for ProxyGroups of
   * type "kube-apiserver" running in auth mode.
   *
   * @default "false"
   */
  allowImpersonation?: boolean;
  /**
   * If true or noauth, the operator will run an in-process API server proxy.
   * You can deploy a ProxyGroup of type "kube-apiserver" to run a high
   * availability set of API server proxies instead.
   *
   * @default "false"
   */
  mode?: boolean;
};

export type TailscaleoperatorHelmValues = {
  /**
   * Operator oauth credentials. If set a Kubernetes Secret with the provided
   * values will be created in the operator namespace. If unset a Secret named
   * operator-oauth must be precreated or oauthSecretVolume needs to be adjusted.
   * This block will be overridden by oauthSecretVolume, if set.
   *
   * @default {}
   */
  oauth?: TailscaleoperatorHelmValuesOauth;
  /**
   * URL of the control plane to be used by all resources managed by the operator.
   *
   * @default ""
   */
  loginServer?: string;
  /**
   * Secret volume.
   * If set it defines the volume the oauth secrets will be mounted from.
   * The volume needs to contain two files named `client_id` and `client_secret`.
   * If unset the volume will reference the Secret named operator-oauth.
   * This block will override the oauth block.
   *
   * @default {}
   */
  oauthSecretVolume?: TailscaleoperatorHelmValuesOauthSecretVolume;
  /**
   * @default true
   */
  installCRDs?: boolean;
  /**
   * @default {...} (14 keys)
   */
  operatorConfig?: TailscaleoperatorHelmValuesOperatorConfig;
  /**
   * @default {"name":"tailscale","enabled":true}
   */
  ingressClass?: TailscaleoperatorHelmValuesIngressClass;
  /**
   * @default {...} (4 keys)
   */
  proxyConfig?: TailscaleoperatorHelmValuesProxyConfig;
  /**
   * @default {"allowImpersonation":"false","mode":"false"}
   */
  apiServerProxyConfig?: TailscaleoperatorHelmValuesApiServerProxyConfig;
  imagePullSecrets?: unknown[];
};

export type TailscaleoperatorHelmParameters = {
  loginServer?: string;
  installCRDs?: string;
  "operatorConfig.defaultTags"?: string;
  "operatorConfig.image.repository"?: string;
  "operatorConfig.image.tag"?: string;
  "operatorConfig.image.digest"?: string;
  "operatorConfig.image.pullPolicy"?: string;
  "operatorConfig.logging"?: string;
  "operatorConfig.hostname"?: string;
  "operatorConfig.nodeSelector.kubernetes.io/os"?: string;
  "operatorConfig.tolerations"?: string;
  "operatorConfig.extraEnv"?: string;
  "ingressClass.name"?: string;
  "ingressClass.enabled"?: string;
  "proxyConfig.image.repository"?: string;
  "proxyConfig.image.tag"?: string;
  "proxyConfig.image.digest"?: string;
  "proxyConfig.defaultTags"?: string;
  "proxyConfig.firewallMode"?: string;
  "proxyConfig.defaultProxyClass"?: string;
  "apiServerProxyConfig.allowImpersonation"?: string;
  "apiServerProxyConfig.mode"?: string;
  imagePullSecrets?: string;
};
