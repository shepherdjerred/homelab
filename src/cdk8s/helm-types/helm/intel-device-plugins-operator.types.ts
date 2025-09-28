// Generated TypeScript types for intel-device-plugins-operator Helm chart

export type InteldevicepluginsoperatorHelmValuesNodeSelector = {
  "kubernetes.io/arch"?: string;
};

export type InteldevicepluginsoperatorHelmValuesManager = {
  image?: InteldevicepluginsoperatorHelmValuesManagerImage;
  devices?: unknown;
};

export type InteldevicepluginsoperatorHelmValuesManagerImage = {
  hub?: string;
  tag?: string;
  pullPolicy?: string;
};

export type InteldevicepluginsoperatorHelmValuesPrivateRegistry = {
  registryUrl?: string;
  registryUser?: string;
  registrySecret?: string;
};

export type InteldevicepluginsoperatorHelmValuesResources = {
  limits?: InteldevicepluginsoperatorHelmValuesResourcesLimits;
  requests?: InteldevicepluginsoperatorHelmValuesResourcesRequests;
};

export type InteldevicepluginsoperatorHelmValuesResourcesLimits = {
  cpu?: string;
  memory?: string;
};

export type InteldevicepluginsoperatorHelmValuesResourcesRequests = {
  cpu?: string;
  memory?: string;
};

export type InteldevicepluginsoperatorHelmValues = {
  nodeSelector?: InteldevicepluginsoperatorHelmValuesNodeSelector;
  manager?: InteldevicepluginsoperatorHelmValuesManager;
  privateRegistry?: InteldevicepluginsoperatorHelmValuesPrivateRegistry;
  resources?: InteldevicepluginsoperatorHelmValuesResources;
  tolerations?: unknown[];
  // manually added
  sharedDevNum?: number;
  nodeFeatureRule?: boolean;
  resourceManager?: boolean;
};

export type InteldevicepluginsoperatorHelmParameters = {
  "nodeSelector.kubernetes.io/arch"?: string;
  "manager.image.hub"?: string;
  "manager.image.tag"?: string;
  "manager.image.pullPolicy"?: string;
  "manager.devices"?: string;
  "privateRegistry.registryUrl"?: string;
  "privateRegistry.registryUser"?: string;
  "privateRegistry.registrySecret"?: string;
  "resources.limits.cpu"?: string;
  "resources.limits.memory"?: string;
  "resources.requests.cpu"?: string;
  "resources.requests.memory"?: string;
  tolerations?: string;
};
