// Generated TypeScript types for node-feature-discovery Helm chart

export type NodefeaturediscoveryHelmValuesImage = {
  /**
   * @default "registry.k8s.io/nfd/node-feature-discovery"
   */
  repository?: string;
  /**
   * This should be set to 'IfNotPresent' for released version
   *
   * @default "IfNotPresent"
   */
  pullPolicy?: string;
};

export type NodefeaturediscoveryHelmValuesFeatureGates = {
  /**
   * @default false
   */
  NodeFeatureGroupAPI?: boolean;
};

export type NodefeaturediscoveryHelmValuesMaster = {
  /**
   * @default true
   */
  enable?: boolean;
  extraArgs?: unknown[];
  extraEnvs?: unknown[];
  /**
   * @default false
   */
  hostNetwork?: boolean;
  config?: unknown;
  /**
   * <NFD-MASTER-CONF-END-DO-NOT-REMOVE>
   *
   * @default 8081
   */
  metricsPort?: number;
  /**
   * @default 8082
   */
  healthPort?: number;
  instance?: unknown;
  featureApi?: unknown;
  resyncPeriod?: unknown;
  denyLabelNs?: unknown[];
  extraLabelNs?: unknown[];
  /**
   * @default false
   */
  enableTaints?: boolean;
  featureRulesController?: unknown;
  nfdApiParallelism?: unknown;
  /**
   * @default {}
   */
  deploymentAnnotations?: NodefeaturediscoveryHelmValuesMasterDeploymentAnnotations;
  /**
   * @default 1
   */
  replicaCount?: number;
  /**
   * @default {}
   */
  podSecurityContext?: NodefeaturediscoveryHelmValuesMasterPodSecurityContext;
  /**
   * @default {...} (4 keys)
   */
  securityContext?: NodefeaturediscoveryHelmValuesMasterSecurityContext;
  /**
   * @default {"create":true,"annotations":{},"name":null}
   */
  serviceAccount?: NodefeaturediscoveryHelmValuesMasterServiceAccount;
  revisionHistoryLimit?: unknown;
  /**
   * @default {"create":true}
   */
  rbac?: NodefeaturediscoveryHelmValuesMasterRbac;
  /**
   * @default {"limits":{"memory":"4Gi"},"requests":{"cpu":"100m","memory":"128Mi"}}
   */
  resources?: NodefeaturediscoveryHelmValuesMasterResources;
  /**
   * @default {}
   */
  nodeSelector?: NodefeaturediscoveryHelmValuesMasterNodeSelector;
  tolerations?: NodefeaturediscoveryHelmValuesMasterTolerationsElement[];
  /**
   * @default {}
   */
  annotations?: NodefeaturediscoveryHelmValuesMasterAnnotations;
  /**
   * @default {"nodeAffinity":{"preferredDuringSchedulingIgnoredDuringExecution":[{"weight":1,"preference":{"matchExpressions":[{"key":"node-role.kubernetes.io/master","operator":"In","values":[""]}]}},{"weight":1,"preference":{"matchExpressions":[{"key":"node-role.kubernetes.io/control-plane","operator":"In","values":[""]}]}}]}}
   */
  affinity?: NodefeaturediscoveryHelmValuesMasterAffinity;
  /**
   * @default {"grpc":{"port":8082},"failureThreshold":30}
   */
  startupProbe?: NodefeaturediscoveryHelmValuesMasterStartupProbe;
  /**
   * @default {"grpc":{"port":8082}}
   */
  livenessProbe?: NodefeaturediscoveryHelmValuesMasterLivenessProbe;
  /**
   * @default {"grpc":{"port":8082},"failureThreshold":10}
   */
  readinessProbe?: NodefeaturediscoveryHelmValuesMasterReadinessProbe;
};

export type NodefeaturediscoveryHelmValuesMasterDeploymentAnnotations = object;

export type NodefeaturediscoveryHelmValuesMasterPodSecurityContext = object;

export type NodefeaturediscoveryHelmValuesMasterSecurityContext = {
  /**
   * @default false
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * @default {"drop":["ALL"]}
   */
  capabilities?: NodefeaturediscoveryHelmValuesMasterSecurityContextCapabilities;
  /**
   * @default true
   */
  readOnlyRootFilesystem?: boolean;
  /**
   * @default true
   */
  runAsNonRoot?: boolean;
};

export type NodefeaturediscoveryHelmValuesMasterSecurityContextCapabilities = {
  drop?: string[];
};

export type NodefeaturediscoveryHelmValuesMasterServiceAccount = {
  /**
   * Specifies whether a service account should be created
   *
   * @default true
   */
  create?: boolean;
  /**
   * Annotations to add to the service account
   *
   * @default {}
   */
  annotations?: NodefeaturediscoveryHelmValuesMasterServiceAccountAnnotations;
  name?: unknown;
};

export type NodefeaturediscoveryHelmValuesMasterServiceAccountAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type NodefeaturediscoveryHelmValuesMasterRbac = {
  /**
   * @default true
   */
  create?: boolean;
};

export type NodefeaturediscoveryHelmValuesMasterResources = {
  /**
   * @default {"memory":"4Gi"}
   */
  limits?: NodefeaturediscoveryHelmValuesMasterResourcesLimits;
  /**
   * @default {"cpu":"100m","memory":"128Mi"}
   */
  requests?: NodefeaturediscoveryHelmValuesMasterResourcesRequests;
};

export type NodefeaturediscoveryHelmValuesMasterResourcesLimits = {
  /**
   * @default "4Gi"
   */
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesMasterResourcesRequests = {
  /**
   * @default "100m"
   */
  cpu?: string;
  /**
   * You may want to use the same value for `requests.memory` and `limits.memory`. The “requests” value affects scheduling to accommodate pods on nodes.
   * If there is a large difference between “requests” and “limits” and nodes experience memory pressure, the kernel may invoke
   * the OOM Killer, even if the memory does not exceed the “limits” threshold. This can cause unexpected pod evictions. Memory
   * cannot be compressed and once allocated to a pod, it can only be reclaimed by killing the pod.
   * Natan Yellin 22/09/2022 https://home.robusta.dev/blog/kubernetes-memory-limit
   *
   * @default "128Mi"
   */
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesMasterNodeSelector = object;

export type NodefeaturediscoveryHelmValuesMasterTolerationsElement = {
  /**
   * @default "node-role.kubernetes.io/master"
   */
  key?: string;
  /**
   * @default "Equal"
   */
  operator?: string;
  /**
   * @default ""
   */
  value?: string;
  /**
   * @default "NoSchedule"
   */
  effect?: string;
};

export type NodefeaturediscoveryHelmValuesMasterAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type NodefeaturediscoveryHelmValuesMasterAffinity = {
  /**
   * @default {"preferredDuringSchedulingIgnoredDuringExecution":[{"weight":1,"preference":{"matchExpressions":[{"key":"node-role.kubernetes.io/master","operator":"In","values":[""]}]}},{"weight":1,"preference":{"matchExpressions":[{"key":"node-role.kubernetes.io/control-plane","operator":"In","values":[""]}]}}]}
   */
  nodeAffinity?: NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinity;
};

export type NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinity = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  preferredDuringSchedulingIgnoredDuringExecution?: NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionElement[];
};

export type NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionElement =
  {
    /**
     * @default 1
     */
    weight?: number;
    /**
     * @default {"matchExpressions":[{"key":"node-role.kubernetes.io/master","operator":"In","values":[""]}]}
     */
    preference?: NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionPreference;
  };

export type NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionPreference =
  {
    matchExpressions?: NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionPreferenceMatchExpressionsElement[];
  };

export type NodefeaturediscoveryHelmValuesMasterAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionPreferenceMatchExpressionsElement =
  {
    /**
     * @default "node-role.kubernetes.io/master"
     */
    key?: string;
    /**
     * @default "In"
     */
    operator?: string;
    values?: string[];
  };

export type NodefeaturediscoveryHelmValuesMasterStartupProbe = {
  /**
   * @default {"port":8082}
   */
  grpc?: NodefeaturediscoveryHelmValuesMasterStartupProbeGrpc;
  /**
   * @default 30
   */
  failureThreshold?: number;
};

export type NodefeaturediscoveryHelmValuesMasterStartupProbeGrpc = {
  /**
   * @default 8082
   */
  port?: number;
};

export type NodefeaturediscoveryHelmValuesMasterLivenessProbe = {
  /**
   * @default {"port":8082}
   */
  grpc?: NodefeaturediscoveryHelmValuesMasterLivenessProbeGrpc;
};

export type NodefeaturediscoveryHelmValuesMasterLivenessProbeGrpc = {
  /**
   * @default 8082
   */
  port?: number;
};

export type NodefeaturediscoveryHelmValuesMasterReadinessProbe = {
  /**
   * @default {"port":8082}
   */
  grpc?: NodefeaturediscoveryHelmValuesMasterReadinessProbeGrpc;
  /**
   * @default 10
   */
  failureThreshold?: number;
};

export type NodefeaturediscoveryHelmValuesMasterReadinessProbeGrpc = {
  /**
   * @default 8082
   */
  port?: number;
};

export type NodefeaturediscoveryHelmValuesWorker = {
  /**
   * @default true
   */
  enable?: boolean;
  extraArgs?: unknown[];
  extraEnvs?: unknown[];
  /**
   * @default false
   */
  hostNetwork?: boolean;
  config?: unknown;
  /**
   * @default 8081
   */
  metricsPort?: number;
  /**
   * @default 8082
   */
  healthPort?: number;
  /**
   * @default {}
   */
  daemonsetAnnotations?: NodefeaturediscoveryHelmValuesWorkerDaemonsetAnnotations;
  /**
   * @default {}
   */
  podSecurityContext?: NodefeaturediscoveryHelmValuesWorkerPodSecurityContext;
  /**
   * @default {...} (4 keys)
   */
  securityContext?: NodefeaturediscoveryHelmValuesWorkerSecurityContext;
  /**
   * @default {"grpc":{"port":8082},"initialDelaySeconds":10}
   */
  livenessProbe?: NodefeaturediscoveryHelmValuesWorkerLivenessProbe;
  /**
   * @default {"grpc":{"port":8082},"initialDelaySeconds":5,"failureThreshold":10}
   */
  readinessProbe?: NodefeaturediscoveryHelmValuesWorkerReadinessProbe;
  /**
   * @default {"create":true,"annotations":{},"name":null}
   */
  serviceAccount?: NodefeaturediscoveryHelmValuesWorkerServiceAccount;
  revisionHistoryLimit?: unknown;
  /**
   * @default {"create":true}
   */
  rbac?: NodefeaturediscoveryHelmValuesWorkerRbac;
  /**
   * Allow users to mount the hostPath /usr/src, useful for RHCOS on s390x
   * Does not work on systems without /usr/src AND a read-only /usr, such as Talos
   *
   * @default false
   */
  mountUsrSrc?: boolean;
  /**
   * @default {"limits":{"memory":"512Mi"},"requests":{"cpu":"5m","memory":"64Mi"}}
   */
  resources?: NodefeaturediscoveryHelmValuesWorkerResources;
  /**
   * @default {}
   */
  nodeSelector?: NodefeaturediscoveryHelmValuesWorkerNodeSelector;
  tolerations?: unknown[];
  /**
   * @default {}
   */
  annotations?: NodefeaturediscoveryHelmValuesWorkerAnnotations;
  /**
   * @default {}
   */
  affinity?: NodefeaturediscoveryHelmValuesWorkerAffinity;
  /**
   * @default ""
   */
  priorityClassName?: string;
};

export type NodefeaturediscoveryHelmValuesWorkerDaemonsetAnnotations = object;

export type NodefeaturediscoveryHelmValuesWorkerPodSecurityContext = object;

export type NodefeaturediscoveryHelmValuesWorkerSecurityContext = {
  /**
   * @default false
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * @default {"drop":["ALL"]}
   */
  capabilities?: NodefeaturediscoveryHelmValuesWorkerSecurityContextCapabilities;
  /**
   * @default true
   */
  readOnlyRootFilesystem?: boolean;
  /**
   * @default true
   */
  runAsNonRoot?: boolean;
};

export type NodefeaturediscoveryHelmValuesWorkerSecurityContextCapabilities = {
  drop?: string[];
};

export type NodefeaturediscoveryHelmValuesWorkerLivenessProbe = {
  /**
   * @default {"port":8082}
   */
  grpc?: NodefeaturediscoveryHelmValuesWorkerLivenessProbeGrpc;
  /**
   * @default 10
   */
  initialDelaySeconds?: number;
};

export type NodefeaturediscoveryHelmValuesWorkerLivenessProbeGrpc = {
  /**
   * @default 8082
   */
  port?: number;
};

export type NodefeaturediscoveryHelmValuesWorkerReadinessProbe = {
  /**
   * @default {"port":8082}
   */
  grpc?: NodefeaturediscoveryHelmValuesWorkerReadinessProbeGrpc;
  /**
   * @default 5
   */
  initialDelaySeconds?: number;
  /**
   * @default 10
   */
  failureThreshold?: number;
};

export type NodefeaturediscoveryHelmValuesWorkerReadinessProbeGrpc = {
  /**
   * @default 8082
   */
  port?: number;
};

export type NodefeaturediscoveryHelmValuesWorkerServiceAccount = {
  /**
   * Specifies whether a service account should be created.
   * We create this by default to make it easier for downstream users to apply PodSecurityPolicies.
   *
   * @default true
   */
  create?: boolean;
  /**
   * Annotations to add to the service account
   *
   * @default {}
   */
  annotations?: NodefeaturediscoveryHelmValuesWorkerServiceAccountAnnotations;
  name?: unknown;
};

export type NodefeaturediscoveryHelmValuesWorkerServiceAccountAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type NodefeaturediscoveryHelmValuesWorkerRbac = {
  /**
   * @default true
   */
  create?: boolean;
};

export type NodefeaturediscoveryHelmValuesWorkerResources = {
  /**
   * @default {"memory":"512Mi"}
   */
  limits?: NodefeaturediscoveryHelmValuesWorkerResourcesLimits;
  /**
   * @default {"cpu":"5m","memory":"64Mi"}
   */
  requests?: NodefeaturediscoveryHelmValuesWorkerResourcesRequests;
};

export type NodefeaturediscoveryHelmValuesWorkerResourcesLimits = {
  /**
   * @default "512Mi"
   */
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesWorkerResourcesRequests = {
  /**
   * @default "5m"
   */
  cpu?: string;
  /**
   * @default "64Mi"
   */
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesWorkerNodeSelector = object;

export type NodefeaturediscoveryHelmValuesWorkerAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type NodefeaturediscoveryHelmValuesWorkerAffinity = object;

export type NodefeaturediscoveryHelmValuesTopologyUpdater = {
  config?: unknown;
  /**
   * @default false
   */
  enable?: boolean;
  /**
   * @default false
   */
  createCRDs?: boolean;
  extraArgs?: unknown[];
  extraEnvs?: unknown[];
  /**
   * @default false
   */
  hostNetwork?: boolean;
  /**
   * @default {"create":true,"annotations":{},"name":null}
   */
  serviceAccount?: NodefeaturediscoveryHelmValuesTopologyUpdaterServiceAccount;
  revisionHistoryLimit?: unknown;
  /**
   * @default {"create":true}
   */
  rbac?: NodefeaturediscoveryHelmValuesTopologyUpdaterRbac;
  /**
   * @default 8081
   */
  metricsPort?: number;
  /**
   * @default 8082
   */
  healthPort?: number;
  kubeletConfigPath?: unknown;
  kubeletPodResourcesSockPath?: unknown;
  /**
   * @default "60s"
   */
  updateInterval?: string;
  /**
   * @default "*"
   */
  watchNamespace?: string;
  /**
   * @default "/var/lib/kubelet"
   */
  kubeletStateDir?: string;
  /**
   * @default {}
   */
  podSecurityContext?: NodefeaturediscoveryHelmValuesTopologyUpdaterPodSecurityContext;
  /**
   * @default {...} (4 keys)
   */
  securityContext?: NodefeaturediscoveryHelmValuesTopologyUpdaterSecurityContext;
  /**
   * @default {"grpc":{"port":8082},"initialDelaySeconds":10}
   */
  livenessProbe?: NodefeaturediscoveryHelmValuesTopologyUpdaterLivenessProbe;
  /**
   * @default {"grpc":{"port":8082},"initialDelaySeconds":5,"failureThreshold":10}
   */
  readinessProbe?: NodefeaturediscoveryHelmValuesTopologyUpdaterReadinessProbe;
  /**
   * @default {"limits":{"memory":"60Mi"},"requests":{"cpu":"50m","memory":"40Mi"}}
   */
  resources?: NodefeaturediscoveryHelmValuesTopologyUpdaterResources;
  /**
   * @default {}
   */
  nodeSelector?: NodefeaturediscoveryHelmValuesTopologyUpdaterNodeSelector;
  tolerations?: unknown[];
  /**
   * @default {}
   */
  annotations?: NodefeaturediscoveryHelmValuesTopologyUpdaterAnnotations;
  /**
   * @default {}
   */
  daemonsetAnnotations?: NodefeaturediscoveryHelmValuesTopologyUpdaterDaemonsetAnnotations;
  /**
   * @default {}
   */
  affinity?: NodefeaturediscoveryHelmValuesTopologyUpdaterAffinity;
  /**
   * @default true
   */
  podSetFingerprint?: boolean;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterServiceAccount = {
  /**
   * @default true
   */
  create?: boolean;
  /**
   * @default {}
   */
  annotations?: NodefeaturediscoveryHelmValuesTopologyUpdaterServiceAccountAnnotations;
  name?: unknown;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterServiceAccountAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterRbac = {
  /**
   * @default true
   */
  create?: boolean;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterPodSecurityContext = object;

export type NodefeaturediscoveryHelmValuesTopologyUpdaterSecurityContext = {
  /**
   * @default false
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * @default {"drop":["ALL"]}
   */
  capabilities?: NodefeaturediscoveryHelmValuesTopologyUpdaterSecurityContextCapabilities;
  /**
   * @default true
   */
  readOnlyRootFilesystem?: boolean;
  /**
   * @default 0
   */
  runAsUser?: number;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterSecurityContextCapabilities = {
  drop?: string[];
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterLivenessProbe = {
  /**
   * @default {"port":8082}
   */
  grpc?: NodefeaturediscoveryHelmValuesTopologyUpdaterLivenessProbeGrpc;
  /**
   * @default 10
   */
  initialDelaySeconds?: number;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterLivenessProbeGrpc = {
  /**
   * @default 8082
   */
  port?: number;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterReadinessProbe = {
  /**
   * @default {"port":8082}
   */
  grpc?: NodefeaturediscoveryHelmValuesTopologyUpdaterReadinessProbeGrpc;
  /**
   * @default 5
   */
  initialDelaySeconds?: number;
  /**
   * @default 10
   */
  failureThreshold?: number;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterReadinessProbeGrpc = {
  /**
   * @default 8082
   */
  port?: number;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterResources = {
  /**
   * @default {"memory":"60Mi"}
   */
  limits?: NodefeaturediscoveryHelmValuesTopologyUpdaterResourcesLimits;
  /**
   * @default {"cpu":"50m","memory":"40Mi"}
   */
  requests?: NodefeaturediscoveryHelmValuesTopologyUpdaterResourcesRequests;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterResourcesLimits = {
  /**
   * @default "60Mi"
   */
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterResourcesRequests = {
  /**
   * @default "50m"
   */
  cpu?: string;
  /**
   * @default "40Mi"
   */
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterNodeSelector = object;

export type NodefeaturediscoveryHelmValuesTopologyUpdaterAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type NodefeaturediscoveryHelmValuesTopologyUpdaterDaemonsetAnnotations = object;

export type NodefeaturediscoveryHelmValuesTopologyUpdaterAffinity = object;

export type NodefeaturediscoveryHelmValuesGc = {
  /**
   * @default true
   */
  enable?: boolean;
  extraArgs?: unknown[];
  extraEnvs?: unknown[];
  /**
   * @default false
   */
  hostNetwork?: boolean;
  /**
   * @default 1
   */
  replicaCount?: number;
  /**
   * @default {"create":true,"annotations":{},"name":null}
   */
  serviceAccount?: NodefeaturediscoveryHelmValuesGcServiceAccount;
  /**
   * @default {"create":true}
   */
  rbac?: NodefeaturediscoveryHelmValuesGcRbac;
  /**
   * @default "1h"
   */
  interval?: string;
  /**
   * @default {}
   */
  podSecurityContext?: NodefeaturediscoveryHelmValuesGcPodSecurityContext;
  /**
   * @default {"limits":{"memory":"1Gi"},"requests":{"cpu":"10m","memory":"128Mi"}}
   */
  resources?: NodefeaturediscoveryHelmValuesGcResources;
  /**
   * @default 8081
   */
  metricsPort?: number;
  /**
   * @default {}
   */
  nodeSelector?: NodefeaturediscoveryHelmValuesGcNodeSelector;
  tolerations?: unknown[];
  /**
   * @default {}
   */
  annotations?: NodefeaturediscoveryHelmValuesGcAnnotations;
  /**
   * @default {}
   */
  deploymentAnnotations?: NodefeaturediscoveryHelmValuesGcDeploymentAnnotations;
  /**
   * @default {}
   */
  affinity?: NodefeaturediscoveryHelmValuesGcAffinity;
  revisionHistoryLimit?: unknown;
};

export type NodefeaturediscoveryHelmValuesGcServiceAccount = {
  /**
   * @default true
   */
  create?: boolean;
  /**
   * @default {}
   */
  annotations?: NodefeaturediscoveryHelmValuesGcServiceAccountAnnotations;
  name?: unknown;
};

export type NodefeaturediscoveryHelmValuesGcServiceAccountAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type NodefeaturediscoveryHelmValuesGcRbac = {
  /**
   * @default true
   */
  create?: boolean;
};

export type NodefeaturediscoveryHelmValuesGcPodSecurityContext = object;

export type NodefeaturediscoveryHelmValuesGcResources = {
  /**
   * @default {"memory":"1Gi"}
   */
  limits?: NodefeaturediscoveryHelmValuesGcResourcesLimits;
  /**
   * @default {"cpu":"10m","memory":"128Mi"}
   */
  requests?: NodefeaturediscoveryHelmValuesGcResourcesRequests;
};

export type NodefeaturediscoveryHelmValuesGcResourcesLimits = {
  /**
   * @default "1Gi"
   */
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesGcResourcesRequests = {
  /**
   * @default "10m"
   */
  cpu?: string;
  /**
   * @default "128Mi"
   */
  memory?: string;
};

export type NodefeaturediscoveryHelmValuesGcNodeSelector = object;

export type NodefeaturediscoveryHelmValuesGcAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type NodefeaturediscoveryHelmValuesGcDeploymentAnnotations = object;

export type NodefeaturediscoveryHelmValuesGcAffinity = object;

export type NodefeaturediscoveryHelmValuesPrometheus = {
  /**
   * @default false
   */
  enable?: boolean;
  /**
   * @default "10s"
   */
  scrapeInterval?: string;
  /**
   * @default {}
   */
  labels?: NodefeaturediscoveryHelmValuesPrometheusLabels;
};

export type NodefeaturediscoveryHelmValuesPrometheusLabels = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type NodefeaturediscoveryHelmValues = {
  /**
   * tag, if defined will use the given image tag, else Chart.AppVersion will be used
   * tag
   *
   * @default {"repository":"registry.k8s.io/nfd/node-feature-discovery","pullPolicy":"IfNotPresent"}
   */
  image?: NodefeaturediscoveryHelmValuesImage;
  imagePullSecrets?: unknown[];
  /**
   * @default ""
   */
  nameOverride?: string;
  /**
   * @default ""
   */
  fullnameOverride?: string;
  /**
   * @default ""
   */
  namespaceOverride?: string;
  /**
   * @default {"NodeFeatureGroupAPI":false}
   */
  featureGates?: NodefeaturediscoveryHelmValuesFeatureGates;
  /**
   * @default ""
   */
  priorityClassName?: string;
  /**
   * @default {...} (30 keys)
   */
  master?: NodefeaturediscoveryHelmValuesMaster;
  /**
   * @default {...} (22 keys)
   */
  worker?: NodefeaturediscoveryHelmValuesWorker;
  /**
   * @default {...} (27 keys)
   */
  topologyUpdater?: NodefeaturediscoveryHelmValuesTopologyUpdater;
  /**
   * @default {...} (17 keys)
   */
  gc?: NodefeaturediscoveryHelmValuesGc;
  /**
   * @default {"enable":false,"scrapeInterval":"10s","labels":{}}
   */
  prometheus?: NodefeaturediscoveryHelmValuesPrometheus;
};

export type NodefeaturediscoveryHelmParameters = {
  "image.repository"?: string;
  "image.pullPolicy"?: string;
  imagePullSecrets?: string;
  nameOverride?: string;
  fullnameOverride?: string;
  namespaceOverride?: string;
  "featureGates.NodeFeatureGroupAPI"?: string;
  priorityClassName?: string;
  "master.enable"?: string;
  "master.extraArgs"?: string;
  "master.extraEnvs"?: string;
  "master.hostNetwork"?: string;
  "master.config"?: string;
  "master.metricsPort"?: string;
  "master.healthPort"?: string;
  "master.instance"?: string;
  "master.featureApi"?: string;
  "master.resyncPeriod"?: string;
  "master.denyLabelNs"?: string;
  "master.extraLabelNs"?: string;
  "master.enableTaints"?: string;
  "master.featureRulesController"?: string;
  "master.nfdApiParallelism"?: string;
  "master.replicaCount"?: string;
  "master.securityContext.allowPrivilegeEscalation"?: string;
  "master.securityContext.capabilities.drop"?: string;
  "master.securityContext.readOnlyRootFilesystem"?: string;
  "master.securityContext.runAsNonRoot"?: string;
  "master.serviceAccount.create"?: string;
  "master.serviceAccount.name"?: string;
  "master.revisionHistoryLimit"?: string;
  "master.rbac.create"?: string;
  "master.resources.limits.memory"?: string;
  "master.resources.requests.cpu"?: string;
  "master.resources.requests.memory"?: string;
  "master.tolerations.key"?: string;
  "master.tolerations.operator"?: string;
  "master.tolerations.value"?: string;
  "master.tolerations.effect"?: string;
  "master.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution.weight"?: string;
  "master.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution.preference.matchExpressions.key"?: string;
  "master.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution.preference.matchExpressions.operator"?: string;
  "master.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution.preference.matchExpressions.values"?: string;
  "master.startupProbe.grpc.port"?: string;
  "master.startupProbe.failureThreshold"?: string;
  "master.livenessProbe.grpc.port"?: string;
  "master.readinessProbe.grpc.port"?: string;
  "master.readinessProbe.failureThreshold"?: string;
  "worker.enable"?: string;
  "worker.extraArgs"?: string;
  "worker.extraEnvs"?: string;
  "worker.hostNetwork"?: string;
  "worker.config"?: string;
  "worker.metricsPort"?: string;
  "worker.healthPort"?: string;
  "worker.securityContext.allowPrivilegeEscalation"?: string;
  "worker.securityContext.capabilities.drop"?: string;
  "worker.securityContext.readOnlyRootFilesystem"?: string;
  "worker.securityContext.runAsNonRoot"?: string;
  "worker.livenessProbe.grpc.port"?: string;
  "worker.livenessProbe.initialDelaySeconds"?: string;
  "worker.readinessProbe.grpc.port"?: string;
  "worker.readinessProbe.initialDelaySeconds"?: string;
  "worker.readinessProbe.failureThreshold"?: string;
  "worker.serviceAccount.create"?: string;
  "worker.serviceAccount.name"?: string;
  "worker.revisionHistoryLimit"?: string;
  "worker.rbac.create"?: string;
  "worker.mountUsrSrc"?: string;
  "worker.resources.limits.memory"?: string;
  "worker.resources.requests.cpu"?: string;
  "worker.resources.requests.memory"?: string;
  "worker.tolerations"?: string;
  "worker.priorityClassName"?: string;
  "topologyUpdater.config"?: string;
  "topologyUpdater.enable"?: string;
  "topologyUpdater.createCRDs"?: string;
  "topologyUpdater.extraArgs"?: string;
  "topologyUpdater.extraEnvs"?: string;
  "topologyUpdater.hostNetwork"?: string;
  "topologyUpdater.serviceAccount.create"?: string;
  "topologyUpdater.serviceAccount.name"?: string;
  "topologyUpdater.revisionHistoryLimit"?: string;
  "topologyUpdater.rbac.create"?: string;
  "topologyUpdater.metricsPort"?: string;
  "topologyUpdater.healthPort"?: string;
  "topologyUpdater.kubeletConfigPath"?: string;
  "topologyUpdater.kubeletPodResourcesSockPath"?: string;
  "topologyUpdater.updateInterval"?: string;
  "topologyUpdater.watchNamespace"?: string;
  "topologyUpdater.kubeletStateDir"?: string;
  "topologyUpdater.securityContext.allowPrivilegeEscalation"?: string;
  "topologyUpdater.securityContext.capabilities.drop"?: string;
  "topologyUpdater.securityContext.readOnlyRootFilesystem"?: string;
  "topologyUpdater.securityContext.runAsUser"?: string;
  "topologyUpdater.livenessProbe.grpc.port"?: string;
  "topologyUpdater.livenessProbe.initialDelaySeconds"?: string;
  "topologyUpdater.readinessProbe.grpc.port"?: string;
  "topologyUpdater.readinessProbe.initialDelaySeconds"?: string;
  "topologyUpdater.readinessProbe.failureThreshold"?: string;
  "topologyUpdater.resources.limits.memory"?: string;
  "topologyUpdater.resources.requests.cpu"?: string;
  "topologyUpdater.resources.requests.memory"?: string;
  "topologyUpdater.tolerations"?: string;
  "topologyUpdater.podSetFingerprint"?: string;
  "gc.enable"?: string;
  "gc.extraArgs"?: string;
  "gc.extraEnvs"?: string;
  "gc.hostNetwork"?: string;
  "gc.replicaCount"?: string;
  "gc.serviceAccount.create"?: string;
  "gc.serviceAccount.name"?: string;
  "gc.rbac.create"?: string;
  "gc.interval"?: string;
  "gc.resources.limits.memory"?: string;
  "gc.resources.requests.cpu"?: string;
  "gc.resources.requests.memory"?: string;
  "gc.metricsPort"?: string;
  "gc.tolerations"?: string;
  "gc.revisionHistoryLimit"?: string;
  "prometheus.enable"?: string;
  "prometheus.scrapeInterval"?: string;
};
