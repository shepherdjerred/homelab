// Generated TypeScript types for tailscale-operator Helm chart

export type TailscaleoperatorHelmValuesOauth = object;

export type TailscaleoperatorHelmValuesOauthSecretVolume = object;

export type TailscaleoperatorHelmValuesOperatorConfig = {
  defaultTags?: string[];
  image?: TailscaleoperatorHelmValuesOperatorConfigImage;
  logging?: string;
  hostname?: string;
  nodeSelector?: TailscaleoperatorHelmValuesOperatorConfigNodeSelector;
  resources?: TailscaleoperatorHelmValuesOperatorConfigResources;
  podAnnotations?: TailscaleoperatorHelmValuesOperatorConfigPodAnnotations;
  podLabels?: TailscaleoperatorHelmValuesOperatorConfigPodLabels;
  serviceAccountAnnotations?: TailscaleoperatorHelmValuesOperatorConfigServiceAccountAnnotations;
  tolerations?: unknown[];
  affinity?: TailscaleoperatorHelmValuesOperatorConfigAffinity;
  podSecurityContext?: TailscaleoperatorHelmValuesOperatorConfigPodSecurityContext;
  securityContext?: TailscaleoperatorHelmValuesOperatorConfigSecurityContext;
  extraEnv?: unknown[];
};

export type TailscaleoperatorHelmValuesOperatorConfigImage = {
  repository?: string;
  tag?: string;
  digest?: string;
  pullPolicy?: string;
};

export type TailscaleoperatorHelmValuesOperatorConfigNodeSelector = {
  "kubernetes.io/os"?: string;
};

export type TailscaleoperatorHelmValuesOperatorConfigResources = object;

export type TailscaleoperatorHelmValuesOperatorConfigPodAnnotations = object;

export type TailscaleoperatorHelmValuesOperatorConfigPodLabels = object;

export type TailscaleoperatorHelmValuesOperatorConfigServiceAccountAnnotations =
  object;

export type TailscaleoperatorHelmValuesOperatorConfigAffinity = object;

export type TailscaleoperatorHelmValuesOperatorConfigPodSecurityContext =
  object;

export type TailscaleoperatorHelmValuesOperatorConfigSecurityContext = object;

export type TailscaleoperatorHelmValuesIngressClass = {
  name?: string;
  enabled?: boolean;
};

export type TailscaleoperatorHelmValuesProxyConfig = {
  image?: TailscaleoperatorHelmValuesProxyConfigImage;
  defaultTags?: string;
  firewallMode?: string;
  defaultProxyClass?: string;
};

export type TailscaleoperatorHelmValuesProxyConfigImage = {
  repository?: string;
  tag?: string;
  digest?: string;
};

export type TailscaleoperatorHelmValuesApiServerProxyConfig = {
  allowImpersonation?: string;
  mode?: string;
};

export type TailscaleoperatorHelmValues = {
  oauth?: TailscaleoperatorHelmValuesOauth;
  loginServer?: string;
  oauthSecretVolume?: TailscaleoperatorHelmValuesOauthSecretVolume;
  installCRDs?: boolean;
  operatorConfig?: TailscaleoperatorHelmValuesOperatorConfig;
  ingressClass?: TailscaleoperatorHelmValuesIngressClass;
  proxyConfig?: TailscaleoperatorHelmValuesProxyConfig;
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
