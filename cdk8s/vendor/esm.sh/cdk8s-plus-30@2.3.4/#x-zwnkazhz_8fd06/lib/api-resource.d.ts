/**
 * Represents a resource or collection of resources.
 */
export interface IApiResource {
    /**
     * The group portion of the API version (e.g. `authorization.k8s.io`).
     */
    readonly apiGroup: string;
    /**
     * The name of a resource type as it appears in the relevant API endpoint.
     * @example - "pods" or "pods/log"
     * @see https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-resources
     */
    readonly resourceType: string;
    /**
     * The unique, namespace-global, name of an object inside the Kubernetes cluster.
     *
     * If this is omitted, the ApiResource should represent all objects of the given type.
     */
    readonly resourceName?: string;
}
/**
 * An API Endpoint can either be a resource descriptor (e.g /pods)
 * or a non resource url (e.g /healthz). It must be one or the other, and not both.
 */
export interface IApiEndpoint {
    /**
     * Return the IApiResource this object represents.
     */
    asApiResource(): IApiResource | undefined;
    /**
     * Return the non resource url this object represents.
     */
    asNonApiResource(): string | undefined;
}
/**
 * Options for `ApiResource`.
 */
export interface ApiResourceOptions {
    /**
     * The group portion of the API version (e.g. `authorization.k8s.io`).
     */
    readonly apiGroup: string;
    /**
     * The name of the resource type as it appears in the relevant API endpoint.
     * @example - "pods" or "pods/log"
     * @see https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-resources
     */
    readonly resourceType: string;
}
/**
 * Represents information about an API resource type.
 */
export declare class ApiResource implements IApiResource, IApiEndpoint {
    /**
     * API resource information for Binding.
     */
    static readonly BINDINGS: ApiResource;
    /**
     * API resource information for ComponentStatus.
     */
    static readonly COMPONENT_STATUSES: ApiResource;
    /**
     * API resource information for ConfigMap.
     */
    static readonly CONFIG_MAPS: ApiResource;
    /**
     * API resource information for Endpoints.
     */
    static readonly ENDPOINTS: ApiResource;
    /**
     * API resource information for Event.
     */
    static readonly EVENTS: ApiResource;
    /**
     * API resource information for LimitRange.
     */
    static readonly LIMIT_RANGES: ApiResource;
    /**
     * API resource information for Namespace.
     */
    static readonly NAMESPACES: ApiResource;
    /**
     * API resource information for Node.
     */
    static readonly NODES: ApiResource;
    /**
     * API resource information for PersistentVolumeClaim.
     */
    static readonly PERSISTENT_VOLUME_CLAIMS: ApiResource;
    /**
     * API resource information for PersistentVolume.
     */
    static readonly PERSISTENT_VOLUMES: ApiResource;
    /**
     * API resource information for Pod.
     */
    static readonly PODS: ApiResource;
    /**
     * API resource information for PodTemplate.
     */
    static readonly POD_TEMPLATES: ApiResource;
    /**
     * API resource information for ReplicationController.
     */
    static readonly REPLICATION_CONTROLLERS: ApiResource;
    /**
     * API resource information for ResourceQuota.
     */
    static readonly RESOURCE_QUOTAS: ApiResource;
    /**
     * API resource information for Secret.
     */
    static readonly SECRETS: ApiResource;
    /**
     * API resource information for ServiceAccount.
     */
    static readonly SERVICE_ACCOUNTS: ApiResource;
    /**
     * API resource information for Service.
     */
    static readonly SERVICES: ApiResource;
    /**
     * API resource information for MutatingWebhookConfiguration.
     */
    static readonly MUTATING_WEBHOOK_CONFIGURATIONS: ApiResource;
    /**
     * API resource information for ValidatingWebhookConfiguration.
     */
    static readonly VALIDATING_WEBHOOK_CONFIGURATIONS: ApiResource;
    /**
     * API resource information for CustomResourceDefinition.
     */
    static readonly CUSTOM_RESOURCE_DEFINITIONS: ApiResource;
    /**
     * API resource information for APIService.
     */
    static readonly API_SERVICES: ApiResource;
    /**
     * API resource information for ControllerRevision.
     */
    static readonly CONTROLLER_REVISIONS: ApiResource;
    /**
     * API resource information for DaemonSet.
     */
    static readonly DAEMON_SETS: ApiResource;
    /**
     * API resource information for Deployment.
     */
    static readonly DEPLOYMENTS: ApiResource;
    /**
     * API resource information for ReplicaSet.
     */
    static readonly REPLICA_SETS: ApiResource;
    /**
     * API resource information for StatefulSet.
     */
    static readonly STATEFUL_SETS: ApiResource;
    /**
     * API resource information for TokenReview.
     */
    static readonly TOKEN_REVIEWS: ApiResource;
    /**
     * API resource information for LocalSubjectAccessReview.
     */
    static readonly LOCAL_SUBJECT_ACCESS_REVIEWS: ApiResource;
    /**
     * API resource information for SelfSubjectAccessReview.
     */
    static readonly SELF_SUBJECT_ACCESS_REVIEWS: ApiResource;
    /**
     * API resource information for SelfSubjectRulesReview.
     */
    static readonly SELF_SUBJECT_RULES_REVIEWS: ApiResource;
    /**
     * API resource information for SubjectAccessReview.
     */
    static readonly SUBJECT_ACCESS_REVIEWS: ApiResource;
    /**
     * API resource information for HorizontalPodAutoscaler.
     */
    static readonly HORIZONTAL_POD_AUTOSCALERS: ApiResource;
    /**
     * API resource information for CronJob.
     */
    static readonly CRON_JOBS: ApiResource;
    /**
     * API resource information for Job.
     */
    static readonly JOBS: ApiResource;
    /**
     * API resource information for CertificateSigningRequest.
     */
    static readonly CERTIFICATE_SIGNING_REQUESTS: ApiResource;
    /**
     * API resource information for Lease.
     */
    static readonly LEASES: ApiResource;
    /**
     * API resource information for EndpointSlice.
     */
    static readonly ENDPOINT_SLICES: ApiResource;
    /**
     * API resource information for FlowSchema.
     */
    static readonly FLOW_SCHEMAS: ApiResource;
    /**
     * API resource information for PriorityLevelConfiguration.
     */
    static readonly PRIORITY_LEVEL_CONFIGURATIONS: ApiResource;
    /**
     * API resource information for IngressClass.
     */
    static readonly INGRESS_CLASSES: ApiResource;
    /**
     * API resource information for Ingress.
     */
    static readonly INGRESSES: ApiResource;
    /**
     * API resource information for NetworkPolicy.
     */
    static readonly NETWORK_POLICIES: ApiResource;
    /**
     * API resource information for RuntimeClass.
     */
    static readonly RUNTIME_CLASSES: ApiResource;
    /**
     * API resource information for PodDisruptionBudget.
     */
    static readonly POD_DISRUPTION_BUDGETS: ApiResource;
    /**
     * API resource information for ClusterRoleBinding.
     */
    static readonly CLUSTER_ROLE_BINDINGS: ApiResource;
    /**
     * API resource information for ClusterRole.
     */
    static readonly CLUSTER_ROLES: ApiResource;
    /**
     * API resource information for RoleBinding.
     */
    static readonly ROLE_BINDINGS: ApiResource;
    /**
     * API resource information for Role.
     */
    static readonly ROLES: ApiResource;
    /**
     * API resource information for PriorityClass.
     */
    static readonly PRIORITY_CLASSES: ApiResource;
    /**
     * API resource information for CSIDriver.
     */
    static readonly CSI_DRIVERS: ApiResource;
    /**
     * API resource information for CSINode.
     */
    static readonly CSI_NODES: ApiResource;
    /**
     * API resource information for CSIStorageCapacity.
     */
    static readonly CSI_STORAGE_CAPACITIES: ApiResource;
    /**
     * API resource information for StorageClass.
     */
    static readonly STORAGE_CLASSES: ApiResource;
    /**
     * API resource information for VolumeAttachment.
     */
    static readonly VOLUME_ATTACHMENTS: ApiResource;
    /**
     * API resource information for a custom resource type.
     */
    static custom(options: ApiResourceOptions): ApiResource;
    /**
     * The group portion of the API version (e.g. `authorization.k8s.io`).
     */
    readonly apiGroup: string;
    /**
     * The name of the resource type as it appears in the relevant API endpoint.
     * @example - "pods" or "pods/log"
     * @see https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-resources
     */
    readonly resourceType: string;
    private constructor();
    asApiResource(): IApiResource | undefined;
    asNonApiResource(): string | undefined;
}
/**
 * Factory for creating non api resources.
 */
export declare class NonApiResource implements IApiEndpoint {
    private readonly nonResourceUrl;
    static of(url: string): NonApiResource;
    private constructor();
    asApiResource(): IApiResource | undefined;
    asNonApiResource(): string | undefined;
}
