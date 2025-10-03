// Generated TypeScript types for coder Helm chart

export type CoderHelmValuesCoder = {
  env?: unknown[];
  envFrom?: unknown[];
  envUseClusterAccessURL?: boolean;
  image?: CoderHelmValuesCoderImage;
  initContainers?: unknown[];
  annotations?: CoderHelmValuesCoderAnnotations;
  labels?: CoderHelmValuesCoderLabels;
  podAnnotations?: CoderHelmValuesCoderPodAnnotations;
  podLabels?: CoderHelmValuesCoderPodLabels;
  serviceAccount?: CoderHelmValuesCoderServiceAccount;
  securityContext?: CoderHelmValuesCoderSecurityContext;
  podSecurityContext?: CoderHelmValuesCoderPodSecurityContext;
  volumes?: unknown[];
  volumeMounts?: unknown[];
  tls?: CoderHelmValuesCoderTls;
  replicaCount?: number;
  workspaceProxy?: boolean;
  lifecycle?: CoderHelmValuesCoderLifecycle;
  resources?: unknown;
  readinessProbe?: CoderHelmValuesCoderReadinessProbe;
  livenessProbe?: CoderHelmValuesCoderLivenessProbe;
  certs?: CoderHelmValuesCoderCerts;
  affinity?: CoderHelmValuesCoderAffinity;
  topologySpreadConstraints?: unknown;
  tolerations?: unknown[];
  nodeSelector?: CoderHelmValuesCoderNodeSelector;
  service?: CoderHelmValuesCoderService;
  ingress?: CoderHelmValuesCoderIngress;
  command?: string[];
  // manually added
  args?: string[];
  commandArgs?: unknown[];
};

export type CoderHelmValuesCoderImage = {
  repo?: string;
  tag?: string;
  pullPolicy?: string;
  pullSecrets?: unknown[];
};

export type CoderHelmValuesCoderAnnotations = object;

export type CoderHelmValuesCoderLabels = object;

export type CoderHelmValuesCoderPodAnnotations = object;

export type CoderHelmValuesCoderPodLabels = object;

export type CoderHelmValuesCoderServiceAccount = {
  workspacePerms?: boolean;
  enableDeployments?: boolean;
  extraRules?: unknown[];
  annotations?: CoderHelmValuesCoderServiceAccountAnnotations;
  name?: string;
  disableCreate?: boolean;
};

export type CoderHelmValuesCoderServiceAccountAnnotations = object;

export type CoderHelmValuesCoderSecurityContext = {
  runAsNonRoot?: boolean;
  runAsUser?: number;
  runAsGroup?: number;
  readOnlyRootFilesystem?: unknown;
  seccompProfile?: CoderHelmValuesCoderSecurityContextSeccompProfile;
  allowPrivilegeEscalation?: boolean;
};

export type CoderHelmValuesCoderSecurityContextSeccompProfile = {
  type?: string;
};

export type CoderHelmValuesCoderPodSecurityContext = object;

export type CoderHelmValuesCoderTls = {
  secretNames?: unknown[];
};

export type CoderHelmValuesCoderLifecycle = object;

export type CoderHelmValuesCoderReadinessProbe = {
  initialDelaySeconds?: number;
};

export type CoderHelmValuesCoderLivenessProbe = {
  initialDelaySeconds?: number;
};

export type CoderHelmValuesCoderCerts = {
  secrets?: unknown[];
};

export type CoderHelmValuesCoderAffinity = {
  podAntiAffinity?: CoderHelmValuesCoderAffinityPodAntiAffinity;
};

export type CoderHelmValuesCoderAffinityPodAntiAffinity = {
  preferredDuringSchedulingIgnoredDuringExecution?: CoderHelmValuesCoderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type CoderHelmValuesCoderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionElement = {
  podAffinityTerm?: CoderHelmValuesCoderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTerm;
  weight?: number;
};

export type CoderHelmValuesCoderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTerm =
  {
    labelSelector?: CoderHelmValuesCoderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTermLabelSelector;
    topologyKey?: string;
  };

export type CoderHelmValuesCoderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTermLabelSelector =
  {
    matchExpressions?: CoderHelmValuesCoderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTermLabelSelectorMatchExpressionsElement[];
  };

export type CoderHelmValuesCoderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTermLabelSelectorMatchExpressionsElement =
  {
    key?: string;
    operator?: string;
    values?: string[];
  };

export type CoderHelmValuesCoderNodeSelector = object;

export type CoderHelmValuesCoderService = {
  enable?: boolean;
  type?: string;
  sessionAffinity?: string;
  externalTrafficPolicy?: string;
  loadBalancerIP?: string;
  loadBalancerClass?: string;
  annotations?: CoderHelmValuesCoderServiceAnnotations;
  httpNodePort?: string;
  httpsNodePort?: string;
};

export type CoderHelmValuesCoderServiceAnnotations = object;

export type CoderHelmValuesCoderIngress = {
  enable?: boolean;
  className?: string;
  host?: string;
  wildcardHost?: string;
  annotations?: CoderHelmValuesCoderIngressAnnotations;
  tls?: CoderHelmValuesCoderIngressTls;
};

export type CoderHelmValuesCoderIngressAnnotations = object;

export type CoderHelmValuesCoderIngressTls = {
  enable?: boolean;
  secretName?: string;
  wildcardSecretName?: string;
};

export type CoderHelmValuesProvisionerDaemon = {
  pskSecretName?: string;
};

export type CoderHelmValues = {
  coder?: CoderHelmValuesCoder;
  provisionerDaemon?: CoderHelmValuesProvisionerDaemon;
  extraTemplates?: unknown;
};

export type CoderHelmParameters = {
  "coder.env"?: string;
  "coder.envFrom"?: string;
  "coder.envUseClusterAccessURL"?: string;
  "coder.image.repo"?: string;
  "coder.image.tag"?: string;
  "coder.image.pullPolicy"?: string;
  "coder.image.pullSecrets"?: string;
  "coder.initContainers"?: string;
  "coder.serviceAccount.workspacePerms"?: string;
  "coder.serviceAccount.enableDeployments"?: string;
  "coder.serviceAccount.extraRules"?: string;
  "coder.serviceAccount.name"?: string;
  "coder.serviceAccount.disableCreate"?: string;
  "coder.securityContext.runAsNonRoot"?: string;
  "coder.securityContext.runAsUser"?: string;
  "coder.securityContext.runAsGroup"?: string;
  "coder.securityContext.readOnlyRootFilesystem"?: string;
  "coder.securityContext.seccompProfile.type"?: string;
  "coder.securityContext.allowPrivilegeEscalation"?: string;
  "coder.volumes"?: string;
  "coder.volumeMounts"?: string;
  "coder.tls.secretNames"?: string;
  "coder.replicaCount"?: string;
  "coder.workspaceProxy"?: string;
  "coder.resources"?: string;
  "coder.readinessProbe.initialDelaySeconds"?: string;
  "coder.livenessProbe.initialDelaySeconds"?: string;
  "coder.certs.secrets"?: string;
  "coder.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution.podAffinityTerm.labelSelector.matchExpressions.key"?: string;
  "coder.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution.podAffinityTerm.labelSelector.matchExpressions.operator"?: string;
  "coder.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution.podAffinityTerm.labelSelector.matchExpressions.values"?: string;
  "coder.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution.podAffinityTerm.topologyKey"?: string;
  "coder.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution.weight"?: string;
  "coder.topologySpreadConstraints"?: string;
  "coder.tolerations"?: string;
  "coder.service.enable"?: string;
  "coder.service.type"?: string;
  "coder.service.sessionAffinity"?: string;
  "coder.service.externalTrafficPolicy"?: string;
  "coder.service.loadBalancerIP"?: string;
  "coder.service.loadBalancerClass"?: string;
  "coder.service.httpNodePort"?: string;
  "coder.service.httpsNodePort"?: string;
  "coder.ingress.enable"?: string;
  "coder.ingress.className"?: string;
  "coder.ingress.host"?: string;
  "coder.ingress.wildcardHost"?: string;
  "coder.ingress.tls.enable"?: string;
  "coder.ingress.tls.secretName"?: string;
  "coder.ingress.tls.wildcardSecretName"?: string;
  "coder.command"?: string;
  "coder.commandArgs"?: string;
  "provisionerDaemon.pskSecretName"?: string;
  extraTemplates?: string;
};
