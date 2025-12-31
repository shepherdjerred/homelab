// Generated TypeScript types for knative-operator Helm chart

export type KnativeoperatorHelmValuesKnativeoperator = {
  /**
   * @default {...} (5 keys)
   */
  knative_operator?: KnativeoperatorHelmValuesKnativeoperatorKnativeoperator;
  /**
   * @default {...} (5 keys)
   */
  operator_webhook?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhook;
  /**
   * @default "v1.25.0"
   */
  kubernetes_min_version?: string;
};

export type KnativeoperatorHelmValuesKnativeoperatorKnativeoperator = {
  /**
   * @default "gcr.io/knative-releases/knative.dev/operator/cm..."
   */
  image?: string;
  /**
   * @default "v1.17.3"
   */
  tag?: string;
  /**
   * @default {}
   */
  affinity?: KnativeoperatorHelmValuesKnativeoperatorKnativeoperatorAffinity;
  /**
   * @default {"allowPrivilegeEscalation":false,"readOnlyRootFilesystem":true,"runAsNonRoot":true}
   */
  containerSecurityContext?: KnativeoperatorHelmValuesKnativeoperatorKnativeoperatorContainerSecurityContext;
  /**
   * @default {"requests":{"cpu":"100m","memory":"100Mi"},"limits":{"cpu":"1000m","memory":"1000Mi"}}
   */
  resources?: KnativeoperatorHelmValuesKnativeoperatorKnativeoperatorResources;
};

export type KnativeoperatorHelmValuesKnativeoperatorKnativeoperatorAffinity = object;

export type KnativeoperatorHelmValuesKnativeoperatorKnativeoperatorContainerSecurityContext = {
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
};

export type KnativeoperatorHelmValuesKnativeoperatorKnativeoperatorResources = {
  /**
   * @default {"cpu":"100m","memory":"100Mi"}
   */
  requests?: KnativeoperatorHelmValuesKnativeoperatorKnativeoperatorResourcesRequests;
  /**
   * @default {"cpu":"1000m","memory":"1000Mi"}
   */
  limits?: KnativeoperatorHelmValuesKnativeoperatorKnativeoperatorResourcesLimits;
};

export type KnativeoperatorHelmValuesKnativeoperatorKnativeoperatorResourcesRequests = {
  /**
   * @default "100m"
   */
  cpu?: string;
  /**
   * @default "100Mi"
   */
  memory?: string;
};

export type KnativeoperatorHelmValuesKnativeoperatorKnativeoperatorResourcesLimits = {
  /**
   * @default "1000m"
   */
  cpu?: string;
  /**
   * @default "1000Mi"
   */
  memory?: string;
};

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhook = {
  /**
   * @default "gcr.io/knative-releases/knative.dev/operator/cm..."
   */
  image?: string;
  /**
   * @default "v1.17.3"
   */
  tag?: string;
  /**
   * @default {"podAntiAffinity":{"preferredDuringSchedulingIgnoredDuringExecution":[{"podAffinityTerm":{"labelSelector":{"matchLabels":{"app":"operator-webhook"}},"topologyKey":"kubernetes.io/hostname"},"weight":100}]}}
   */
  affinity?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinity;
  /**
   * @default {"allowPrivilegeEscalation":false,"readOnlyRootFilesystem":true,"runAsNonRoot":true}
   */
  containerSecurityContext?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookContainerSecurityContext;
  /**
   * @default {"requests":{"cpu":"100m","memory":"100Mi"},"limits":{"cpu":"500m","memory":"500Mi"}}
   */
  resources?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookResources;
};

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinity = {
  /**
   * To avoid node becoming SPOF, spread our replicas to different nodes.
   *
   * @default {"preferredDuringSchedulingIgnoredDuringExecution":[{"podAffinityTerm":{"labelSelector":{"matchLabels":{"app":"operator-webhook"}},"topologyKey":"kubernetes.io/hostname"},"weight":100}]}
   */
  podAntiAffinity?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinityPodAntiAffinity;
};

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinityPodAntiAffinity = {
  preferredDuringSchedulingIgnoredDuringExecution?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionElement =
  {
    /**
     * @default {"labelSelector":{"matchLabels":{"app":"operator-webhook"}},"topologyKey":"kubernetes.io/hostname"}
     */
    podAffinityTerm?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTerm;
    /**
     * @default 100
     */
    weight?: number;
  };

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTerm =
  {
    /**
     * @default {"matchLabels":{"app":"operator-webhook"}}
     */
    labelSelector?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTermLabelSelector;
    /**
     * @default "kubernetes.io/hostname"
     */
    topologyKey?: string;
  };

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTermLabelSelector =
  {
    /**
     * @default {"app":"operator-webhook"}
     */
    matchLabels?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTermLabelSelectorMatchLabels;
  };

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionPodAffinityTermLabelSelectorMatchLabels =
  {
    /**
     * @default "operator-webhook"
     */
    app?: string;
  };

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookContainerSecurityContext = {
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
};

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookResources = {
  /**
   * @default {"cpu":"100m","memory":"100Mi"}
   */
  requests?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookResourcesRequests;
  /**
   * @default {"cpu":"500m","memory":"500Mi"}
   */
  limits?: KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookResourcesLimits;
};

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookResourcesRequests = {
  /**
   * @default "100m"
   */
  cpu?: string;
  /**
   * @default "100Mi"
   */
  memory?: string;
};

export type KnativeoperatorHelmValuesKnativeoperatorOperatorwebhookResourcesLimits = {
  /**
   * @default "500m"
   */
  cpu?: string;
  /**
   * @default "500Mi"
   */
  memory?: string;
};

export type KnativeoperatorHelmValues = {
  /**
   * @default {"knative_operator":{"image":"gcr.io/knative-releases/knative.dev/operator/cmd/operator","tag":"v1.17.3","affinity":{},"containerSecurityContext":{"allowPrivilegeEscalation":false,"readOnlyRootFilesystem":true,"runAsNonRoot":true},"resources":{"requests":{"cpu":"100m","memory":"100Mi"},"limits":{"cpu":"1000m","memory":"1000Mi"}}},"operator_webhook":{"image":"gcr.io/knative-releases/knative.dev/operator/cmd/webhook","tag":"v1.17.3","affinity":{"podAntiAffinity":{"preferredDuringSchedulingIgnoredDuringExecution":[{"podAffinityTerm":{"labelSelector":{"matchLabels":{"app":"operator-webhook"}},"topologyKey":"kubernetes.io/hostname"},"weight":100}]}},"containerSecurityContext":{"allowPrivilegeEscalation":false,"readOnlyRootFilesystem":true,"runAsNonRoot":true},"resources":{"requests":{"cpu":"100m","memory":"100Mi"},"limits":{"cpu":"500m","memory":"500Mi"}}},"kubernetes_min_version":"v1.25.0"}
   */
  knative_operator?: KnativeoperatorHelmValuesKnativeoperator;
};

export type KnativeoperatorHelmParameters = {
  "knative_operator.knative_operator.image"?: string;
  "knative_operator.knative_operator.tag"?: string;
  "knative_operator.knative_operator.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "knative_operator.knative_operator.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "knative_operator.knative_operator.containerSecurityContext.runAsNonRoot"?: string;
  "knative_operator.knative_operator.resources.requests.cpu"?: string;
  "knative_operator.knative_operator.resources.requests.memory"?: string;
  "knative_operator.knative_operator.resources.limits.cpu"?: string;
  "knative_operator.knative_operator.resources.limits.memory"?: string;
  "knative_operator.operator_webhook.image"?: string;
  "knative_operator.operator_webhook.tag"?: string;
  "knative_operator.operator_webhook.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution.podAffinityTerm.labelSelector.matchLabels.app"?: string;
  "knative_operator.operator_webhook.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution.podAffinityTerm.topologyKey"?: string;
  "knative_operator.operator_webhook.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution.weight"?: string;
  "knative_operator.operator_webhook.containerSecurityContext.allowPrivilegeEscalation"?: string;
  "knative_operator.operator_webhook.containerSecurityContext.readOnlyRootFilesystem"?: string;
  "knative_operator.operator_webhook.containerSecurityContext.runAsNonRoot"?: string;
  "knative_operator.operator_webhook.resources.requests.cpu"?: string;
  "knative_operator.operator_webhook.resources.requests.memory"?: string;
  "knative_operator.operator_webhook.resources.limits.cpu"?: string;
  "knative_operator.operator_webhook.resources.limits.memory"?: string;
  "knative_operator.kubernetes_min_version"?: string;
};
