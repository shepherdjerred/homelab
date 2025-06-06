import { ApiObject, ApiObjectMetadataDefinition, Duration } from 'cdk8s';
import { Construct, IConstruct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as base from './base.d.ts';
import * as container from './container.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as namespace from './namespace.d.ts';
import * as networkpolicy from './network-policy.d.ts';
import * as rb from './role-binding.d.ts';
import * as secret from './secret.d.ts';
import * as serviceaccount from './service-account.d.ts';
import * as volume from './volume.d.ts';
export declare abstract class AbstractPod extends base.Resource implements IPodSelector, networkpolicy.INetworkPolicyPeer, rb.ISubject {
    readonly restartPolicy?: RestartPolicy;
    readonly serviceAccount?: serviceaccount.IServiceAccount;
    readonly securityContext: PodSecurityContext;
    readonly dns: PodDns;
    readonly dockerRegistryAuth?: secret.ISecret;
    readonly automountServiceAccountToken: boolean;
    readonly shareProcessNamespace: boolean;
    readonly hostNetwork?: boolean;
    readonly terminationGracePeriod?: Duration;
    protected readonly isolate: boolean;
    private readonly _containers;
    private readonly _initContainers;
    private readonly _hostAliases;
    private readonly _volumes;
    abstract readonly podMetadata: ApiObjectMetadataDefinition;
    constructor(scope: Construct, id: string, props?: AbstractPodProps);
    get containers(): container.Container[];
    get initContainers(): container.Container[];
    get volumes(): volume.Volume[];
    get hostAliases(): HostAlias[];
    /**
     * @see IPodSelector.toPodSelectorConfig()
     */
    toPodSelectorConfig(): PodSelectorConfig;
    /**
     * @see INetworkPolicyPeer.toNetworkPolicyPeerConfig()
     */
    toNetworkPolicyPeerConfig(): networkpolicy.NetworkPolicyPeerConfig;
    /**
     * @see INetworkPolicyPeer.toPodSelector()
     */
    toPodSelector(): IPodSelector | undefined;
    addContainer(cont: container.ContainerProps): container.Container;
    attachContainer(cont: container.Container): void;
    addInitContainer(cont: container.ContainerProps): container.Container;
    private isSidecarContainer;
    addHostAlias(hostAlias: HostAlias): void;
    addVolume(vol: volume.Volume): void;
    /**
     * @see ISubect.toSubjectConfiguration()
     */
    toSubjectConfiguration(): rb.SubjectConfiguration;
    /**
     * @internal
     */
    _toPodSpec(): k8s.PodSpec;
}
/**
 * Sysctl defines a kernel parameter to be set
 */
export interface Sysctl {
    /**
     * Name of a property to set
     */
    readonly name: string;
    /**
     * Value of a property to set
     */
    readonly value: string;
}
/**
 * Properties for `PodSecurityContext`
 */
export interface PodSecurityContextProps {
    /**
     * Modify the ownership and permissions of pod volumes to this GID.
     *
     * @default - Volume ownership is not changed.
     */
    readonly fsGroup?: number;
    /**
     * Defines behavior of changing ownership and permission of the volume before being exposed inside Pod.
     * This field will only apply to volume types which support fsGroup based ownership(and permissions).
     * It will have no effect on ephemeral volume types such as: secret, configmaps and emptydir.
     *
     * @default FsGroupChangePolicy.ALWAYS
     */
    readonly fsGroupChangePolicy?: FsGroupChangePolicy;
    /**
     * The UID to run the entrypoint of the container process.
     *
     * @default - User specified in image metadata
     */
    readonly user?: number;
    /**
     * The GID to run the entrypoint of the container process.
     *
     * @default - Group configured by container runtime
     */
    readonly group?: number;
    /**
     * Indicates that the container must run as a non-root user.
     * If true, the Kubelet will validate the image at runtime to ensure that it does
     * not run as UID 0 (root) and fail to start the container if it does.
     *
     * @default true
     */
    readonly ensureNonRoot?: boolean;
    /**
     * Sysctls hold a list of namespaced sysctls used for the pod.
     * Pods with unsupported sysctls (by the container runtime) might fail to launch.
     *
     * @default - No sysctls
     */
    readonly sysctls?: Sysctl[];
}
/**
 * Properties for `AbstractPod`.
 */
export interface AbstractPodProps extends base.ResourceProps {
    /**
     * List of containers belonging to the pod. Containers cannot currently be
     * added or removed. There must be at least one container in a Pod.
     *
     * You can add additionnal containers using `podSpec.addContainer()`
     *
     * @default - No containers. Note that a pod spec must include at least one container.
     */
    readonly containers?: container.ContainerProps[];
    /**
     * List of initialization containers belonging to the pod.
     * Init containers are executed in order prior to containers being started.
     * If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy.
     * The name for an init container or normal container must be unique among all containers.
     * Init containers may not have Lifecycle actions, Readiness probes, Liveness probes, or Startup probes.
     * The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit
     * for each resource type, and then using the max of of that value or the sum of the normal containers.
     * Limits are applied to init containers in a similar fashion.
     *
     * Init containers cannot currently be added ,removed or updated.
     *
     * @see https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
     * @default - No init containers.
     */
    readonly initContainers?: container.ContainerProps[];
    /**
     * List of volumes that can be mounted by containers belonging to the pod.
     *
     * You can also add volumes later using `podSpec.addVolume()`
     *
     * @see https://kubernetes.io/docs/concepts/storage/volumes
     *
     * @default - No volumes.
     */
    readonly volumes?: volume.Volume[];
    /**
     * Restart policy for all containers within the pod.
     *
     * @see https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy
     *
     * @default RestartPolicy.ALWAYS
     */
    readonly restartPolicy?: RestartPolicy;
    /**
     * A service account provides an identity for processes that run in a Pod.
     *
     * When you (a human) access the cluster (for example, using kubectl), you are
     * authenticated by the apiserver as a particular User Account (currently this
     * is usually admin, unless your cluster administrator has customized your
     * cluster). Processes in containers inside pods can also contact the
     * apiserver. When they do, they are authenticated as a particular Service
     * Account (for example, default).
     *
     * @see https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
     *
     * @default - No service account.
     */
    readonly serviceAccount?: serviceaccount.IServiceAccount;
    /**
     * SecurityContext holds pod-level security attributes and common container settings.
     *
     * @default
     *
     *   fsGroupChangePolicy: FsGroupChangePolicy.FsGroupChangePolicy.ALWAYS
     *   ensureNonRoot: true
     */
    readonly securityContext?: PodSecurityContextProps;
    /**
     * HostAlias holds the mapping between IP and hostnames that will be injected as an entry in the pod's hosts file.
     *
     * @schema io.k8s.api.core.v1.HostAlias
     */
    readonly hostAliases?: HostAlias[];
    /**
     * DNS settings for the pod.
     *
     * @see https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/
     *
     * @default
     *
     *  policy: DnsPolicy.CLUSTER_FIRST
     *  hostnameAsFQDN: false
     */
    readonly dns?: PodDnsProps;
    /**
     * A secret containing docker credentials for authenticating to a registry.
     *
     * @default - No auth. Images are assumed to be publicly available.
     */
    readonly dockerRegistryAuth?: secret.ISecret;
    /**
     * Indicates whether a service account token should be automatically mounted.
     *
     * @default false
     * @see https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#use-the-default-service-account-to-access-the-api-server
     */
    readonly automountServiceAccountToken?: boolean;
    /**
     * When process namespace sharing is enabled, processes in a container are visible to all other containers in the same pod.
     *
     * @default false
     * @see https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/
     */
    readonly shareProcessNamespace?: boolean;
    /**
     * Isolates the pod. This will prevent any ingress or egress connections to / from this pod.
     * You can however allow explicit connections post instantiation by using the `.connections` property.
     *
     * @default false
     */
    readonly isolate?: boolean;
    /**
     * Host network for the pod.
     *
     * @default false
     */
    readonly hostNetwork?: boolean;
    /**
     * Grace period until the pod is terminated
     *
     * @default Duration.seconds(30)
     */
    readonly terminationGracePeriod?: Duration;
}
/**
 * Properties for `Pod`.
 */
export interface PodProps extends AbstractPodProps {
}
/**
 * Options for `LabelSelector.of`.
 */
export interface LabelSelectorOptions {
    /**
     * Strict label matchers.
     */
    readonly labels?: {
        [key: string]: string;
    };
    /**
     * Expression based label matchers.
     */
    readonly expressions?: LabelExpression[];
}
/**
 * Match a resource by labels.
 */
export declare class LabelSelector {
    private readonly expressions;
    private readonly labels;
    static of(options?: LabelSelectorOptions): LabelSelector;
    private constructor();
    isEmpty(): boolean;
    /**
     * @internal
     */
    _toKube(): k8s.LabelSelector;
}
/**
 * Configuration for selecting pods, optionally in particular namespaces.
 */
export interface PodSelectorConfig {
    /**
     * A selector to select pods by labels.
     */
    readonly labelSelector: LabelSelector;
    /**
     * Configuration for selecting which namepsaces are the pods allowed to be in.
     */
    readonly namespaces?: namespace.NamespaceSelectorConfig;
}
/**
 * Represents an object that can select pods.
 */
export interface IPodSelector extends IConstruct {
    /**
     * Return the configuration of this selector.
     */
    toPodSelectorConfig(): PodSelectorConfig;
}
/**
 * Pod is a collection of containers that can run on a host. This resource is
 * created by clients and scheduled onto hosts.
 */
export declare class Pod extends AbstractPod {
    /**
     * This label is autoamtically added by cdk8s to any pod. It provides
     * a unique and stable identifier for the pod.
     */
    static readonly ADDRESS_LABEL = "cdk8s.io/metadata.addr";
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "pods";
    readonly scheduling: PodScheduling;
    readonly connections: PodConnections;
    constructor(scope: Construct, id: string, props?: PodProps);
    get podMetadata(): ApiObjectMetadataDefinition;
    /**
     * @internal
     */
    _toKube(): k8s.PodSpec;
}
/**
 * Properties for `PodDns`.
 */
export interface PodDnsProps {
    /**
     * Specifies the hostname of the Pod.
     *
     * @default - Set to a system-defined value.
     */
    readonly hostname?: string;
    /**
     * If specified, the fully qualified Pod hostname will be "<hostname>.<subdomain>.<pod namespace>.svc.<cluster domain>".
     *
     * @default - No subdomain.
     */
    readonly subdomain?: string;
    /**
     * If true the pod's hostname will be configured as the pod's FQDN, rather than the leaf name (the default).
     * In Linux containers, this means setting the FQDN in the hostname field of the kernel (the nodename field of struct utsname).
     * In Windows containers, this means setting the registry value of hostname for the registry
     * key HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters to FQDN.
     * If a pod does not have FQDN, this has no effect.
     *
     * @default false
     */
    readonly hostnameAsFQDN?: boolean;
    /**
     * Set DNS policy for the pod.
     *
     * If policy is set to `None`, other configuration must be supplied.
     *
     * @default DnsPolicy.CLUSTER_FIRST
     */
    readonly policy?: DnsPolicy;
    /**
     * A list of IP addresses that will be used as DNS servers for the Pod. There can be at most 3 IP addresses specified.
     * When the policy is set to "NONE", the list must contain at least one IP address,
     * otherwise this property is optional.
     * The servers listed will be combined to the base nameservers generated from
     * the specified DNS policy with duplicate addresses removed.
     */
    readonly nameservers?: string[];
    /**
     * A list of DNS search domains for hostname lookup in the Pod.
     * When specified, the provided list will be merged into the base
     * search domain names generated from the chosen DNS policy.
     * Duplicate domain names are removed.
     *
     * Kubernetes allows for at most 6 search domains.
     */
    readonly searches?: string[];
    /**
     * List of objects where each object may have a name property (required)
     * and a value property (optional). The contents in this property
     * will be merged to the options generated from the specified DNS policy.
     * Duplicate entries are removed.
     */
    readonly options?: DnsOption[];
}
/**
 * Holds dns settings of the pod.
 */
export declare class PodDns {
    /**
     * The DNS policy of this pod.
     */
    readonly policy: DnsPolicy;
    /**
     * The configured hostname of the pod. Undefined means its set to a system-defined value.
     */
    readonly hostname?: string;
    /**
     * The configured subdomain of the pod.
     */
    readonly subdomain?: string;
    /**
     * Whether or not the pods hostname is set to its FQDN.
     */
    readonly hostnameAsFQDN: boolean;
    private readonly _nameservers;
    private readonly _searches;
    private readonly _options;
    constructor(props?: PodDnsProps);
    /**
     * Nameservers defined for this pod.
     */
    get nameservers(): string[];
    /**
     * Search domains defined for this pod.
     */
    get searches(): string[];
    /**
     * Custom dns options defined for this pod.
     */
    get options(): DnsOption[];
    /**
     * Add a nameserver.
     */
    addNameserver(...nameservers: string[]): void;
    /**
     * Add a search domain.
     */
    addSearch(...searches: string[]): void;
    /**
     * Add a custom option.
     */
    addOption(...options: DnsOption[]): void;
    /**
     * @internal
     */
    _toKube(): {
        hostname?: string;
        subdomain?: string;
        hostnameAsFQDN: boolean;
        policy: string;
        config: k8s.PodDnsConfig;
    };
}
/**
 * Holds pod-level security attributes and common container settings.
 */
export declare class PodSecurityContext {
    readonly ensureNonRoot: boolean;
    readonly user?: number;
    readonly group?: number;
    readonly fsGroup?: number;
    readonly fsGroupChangePolicy: FsGroupChangePolicy;
    private readonly _sysctls;
    constructor(props?: PodSecurityContextProps);
    get sysctls(): Sysctl[];
    /**
     * @internal
     */
    _toKube(): k8s.PodSecurityContext;
}
/**
 * Restart policy for all containers within the pod.
 */
export declare enum RestartPolicy {
    /**
     * Always restart the pod after it exits.
     */
    ALWAYS = "Always",
    /**
     * Only restart if the pod exits with a non-zero exit code.
     */
    ON_FAILURE = "OnFailure",
    /**
     * Never restart the pod.
     */
    NEVER = "Never"
}
export declare enum FsGroupChangePolicy {
    /**
     * Only change permissions and ownership if permission and ownership of root directory does
     * not match with expected permissions of the volume.
     * This could help shorten the time it takes to change ownership and permission of a volume
     */
    ON_ROOT_MISMATCH = "OnRootMismatch",
    /**
     * Always change permission and ownership of the volume when volume is mounted.
     */
    ALWAYS = "Always"
}
/**
 * Custom DNS option.
 */
export interface DnsOption {
    /**
     * Option name.
     */
    readonly name: string;
    /**
     * Option value.
     *
     * @default - No value.
     */
    readonly value?: string;
}
/**
 * Pod DNS policies.
 */
export declare enum DnsPolicy {
    /**
     * Any DNS query that does not match the configured cluster domain suffix,
     * such as "www.kubernetes.io", is forwarded to the
     * upstream nameserver inherited from the node.
     * Cluster administrators may have extra stub-domain and upstream DNS servers configured.
     */
    CLUSTER_FIRST = "ClusterFirst",
    /**
     * For Pods running with hostNetwork, you should
     * explicitly set its DNS policy "ClusterFirstWithHostNet".
     */
    CLUSTER_FIRST_WITH_HOST_NET = "ClusterFirstWithHostNet",
    /**
     * The Pod inherits the name resolution configuration
     * from the node that the pods run on.
     */
    DEFAULT = "Default",
    /**
     * It allows a Pod to ignore DNS settings from the Kubernetes environment.
     * All DNS settings are supposed to be provided using the dnsConfig
     * field in the Pod Spec.
     */
    NONE = "None"
}
/**
 * HostAlias holds the mapping between IP and hostnames that will be injected as
 * an entry in the pod's /etc/hosts file.
 */
export interface HostAlias {
    /**
     * Hostnames for the chosen IP address.
     */
    readonly hostnames: string[];
    /**
     * IP address of the host file entry.
     */
    readonly ip: string;
}
/**
 * Represents a query that can be performed against nodes with labels.
 */
export declare class NodeLabelQuery {
    private readonly key;
    private readonly operator;
    private readonly values?;
    /**
     * Requires value of label `key` to equal `value`.
     */
    static is(key: string, value: string): NodeLabelQuery;
    /**
     * Requires value of label `key` to be one of `values`.
     */
    static in(key: string, values: string[]): NodeLabelQuery;
    /**
     * Requires value of label `key` to be none of `values`.
     */
    static notIn(key: string, values: string[]): NodeLabelQuery;
    /**
     * Requires label `key` to exist.
     */
    static exists(key: string): NodeLabelQuery;
    /**
     * Requires label `key` to not exist.
     */
    static doesNotExist(key: string): NodeLabelQuery;
    /**
     * Requires value of label `key` to greater than all elements in `values`.
     */
    static gt(key: string, values: string[]): NodeLabelQuery;
    /**
     * Requires value of label `key` to less than all elements in `values`.
     */
    static lt(key: string, values: string[]): NodeLabelQuery;
    private constructor();
    /**
     * @internal
     */
    _toKube(): k8s.NodeSelectorRequirement;
}
/**
 * Represents a query that can be performed against resources with labels.
 */
export declare class LabelExpression {
    readonly key: string;
    readonly operator: string;
    readonly values?: string[] | undefined;
    /**
     * Requires value of label `key` to be one of `values`.
     */
    static in(key: string, values: string[]): LabelExpression;
    /**
     * Requires value of label `key` to be none of `values`.
     */
    static notIn(key: string, values: string[]): LabelExpression;
    /**
     * Requires label `key` to exist.
     */
    static exists(key: string): LabelExpression;
    /**
     * Requires label `key` to not exist.
     */
    static doesNotExist(key: string): LabelExpression;
    private constructor();
}
/**
 * Taint effects.
 */
export declare enum TaintEffect {
    /**
     * This means that no pod will be able to schedule
     * onto the node unless it has a matching toleration.
     */
    NO_SCHEDULE = "NoSchedule",
    /**
     * This is a "preference" or "soft" version of `NO_SCHEDULE` -- the system
     * will try to avoid placing a pod that does not tolerate the taint on the node,
     * but it is not required
     */
    PREFER_NO_SCHEDULE = "PreferNoSchedule",
    /**
     * This affects pods that are already running on the node as follows:
     *
     * - Pods that do not tolerate the taint are evicted immediately.
     * - Pods that tolerate the taint without specifying `duration` remain bound forever.
     * - Pods that tolerate the taint with a specified `duration` remain bound for
     *   the specified amount of time.
     */
    NO_EXECUTE = "NoExecute"
}
/**
 * Options for `NodeTaintQuery`.
 */
export interface NodeTaintQueryOptions {
    /**
     * The taint effect to match.
     *
     * @default - all effects are matched.
     */
    readonly effect?: TaintEffect;
    /**
     * How much time should a pod that tolerates the `NO_EXECUTE` effect
     * be bound to the node. Only applies for the `NO_EXECUTE` effect.
     *
     * @default - bound forever.
     */
    readonly evictAfter?: Duration;
}
/**
 * Taint queries that can be perfomed against nodes.
 */
export declare class NodeTaintQuery {
    private readonly operator;
    private readonly key?;
    private readonly value?;
    private readonly effect?;
    private readonly evictAfter?;
    /**
     * Matches a taint with a specific key and value.
     */
    static is(key: string, value: string, options?: NodeTaintQueryOptions): NodeTaintQuery;
    /**
     * Matches a tain with any value of a specific key.
     */
    static exists(key: string, options?: NodeTaintQueryOptions): NodeTaintQuery;
    /**
     * Matches any taint.
     */
    static any(): NodeTaintQuery;
    private constructor();
    /**
     * @internal
     */
    _toKube(): k8s.Toleration;
}
/**
 * Options for `Pods.all`.
 */
export interface PodsAllOptions {
    /**
     * Namespaces the pods are allowed to be in.
     * Use `Namespaces.all()` to allow all namespaces.
     *
     * @default - unset, implies the namespace of the resource this selection is used in.
     */
    readonly namespaces?: namespace.Namespaces;
}
/**
 * Options for `Pods.select`.
 */
export interface PodsSelectOptions {
    /**
     * Labels the pods must have.
     *
     * @default - no strict labels requirements.
     */
    readonly labels?: {
        [key: string]: string;
    };
    /**
      * Expressions the pods must satisify.
      *
      * @default - no expressions requirements.
      */
    readonly expressions?: LabelExpression[];
    /**
     * Namespaces the pods are allowed to be in.
     * Use `Namespaces.all()` to allow all namespaces.
     *
     * @default - unset, implies the namespace of the resource this selection is used in.
     */
    readonly namespaces?: namespace.Namespaces;
}
/**
 * Represents a group of pods.
 */
export declare class Pods extends Construct implements IPodSelector {
    private readonly expressions?;
    private readonly labels?;
    private readonly namespaces?;
    /**
     * Select pods in the cluster with various selectors.
     */
    static select(scope: Construct, id: string, options: PodsSelectOptions): Pods;
    /**
     * Select all pods.
     */
    static all(scope: Construct, id: string, options?: PodsAllOptions): Pods;
    constructor(scope: Construct, id: string, expressions?: LabelExpression[] | undefined, labels?: {
        [key: string]: string;
    } | undefined, namespaces?: namespace.INamespaceSelector | undefined);
    /**
     * @see IPodSelector.toPodSelectorConfig()
     */
    toPodSelectorConfig(): PodSelectorConfig;
    /**
     * @see INetworkPolicyPeer.toNetworkPolicyPeerConfig()
     */
    toNetworkPolicyPeerConfig(): networkpolicy.NetworkPolicyPeerConfig;
    /**
     * @see INetworkPolicyPeer.toPodSelector()
     */
    toPodSelector(): IPodSelector | undefined;
}
/**
 * A node that is matched by label selectors.
 */
export declare class LabeledNode {
    readonly labelSelector: NodeLabelQuery[];
    constructor(labelSelector: NodeLabelQuery[]);
}
/**
 * A node that is matched by taint selectors.
 */
export declare class TaintedNode {
    readonly taintSelector: NodeTaintQuery[];
    constructor(taintSelector: NodeTaintQuery[]);
}
/**
 * A node that is matched by its name.
 */
export declare class NamedNode {
    readonly name: string;
    constructor(name: string);
}
/**
 * Represents a node in the cluster.
 */
export declare class Node {
    /**
     * Match a node by its labels.
     */
    static labeled(...labelSelector: NodeLabelQuery[]): LabeledNode;
    /**
     * Match a node by its name.
     */
    static named(nodeName: string): NamedNode;
    /**
     * Match a node by its taints.
     */
    static tainted(...taintSelector: NodeTaintQuery[]): TaintedNode;
}
/**
 * Available topology domains.
 */
export declare class Topology {
    readonly key: string;
    /**
     * A hostname represents a single node in the cluster.
     *
     * @see https://kubernetes.io/docs/reference/labels-annotations-taints/#kubernetesiohostname
     */
    static readonly HOSTNAME: Topology;
    /**
     * A zone represents a logical failure domain. It is common for Kubernetes clusters to
     * span multiple zones for increased availability. While the exact definition of a zone is
     * left to infrastructure implementations, common properties of a zone include very low
     * network latency within a zone, no-cost network traffic within a zone, and failure
     * independence from other zones. For example, nodes within a zone might share a network
     * switch, but nodes in different zones should not.
     *
     * @see https://kubernetes.io/docs/reference/labels-annotations-taints/#topologykubernetesiozone
     */
    static readonly ZONE: Topology;
    /**
     * A region represents a larger domain, made up of one or more zones. It is uncommon
     * for Kubernetes clusters to span multiple regions. While the exact definition of a
     * zone or region is left to infrastructure implementations, common properties of a region
     * include higher network latency between them than within them, non-zero cost for network
     * traffic between them, and failure independence from other zones or regions.
     *
     * For example, nodes within a region might share power infrastructure (e.g. a UPS or generator), but
     * nodes in different regions typically would not.
     *
     * @see https://kubernetes.io/docs/reference/labels-annotations-taints/#topologykubernetesioregion
     */
    static readonly REGION: Topology;
    /**
     * Custom key for the node label that the system uses to denote the topology domain.
     */
    static custom(key: string): Topology;
    private constructor();
}
/**
 * Options for `PodScheduling.colocate`.
 */
export interface PodSchedulingColocateOptions {
    /**
     * Which topology to coloate on.
     *
     * @default - Topology.HOSTNAME
     */
    readonly topology?: Topology;
    /**
     * Indicates the co-location is optional (soft), with this weight score.
     *
     * @default - no weight. co-location is assumed to be required (hard).
     */
    readonly weight?: number;
}
/**
 * Options for `PodScheduling.separate`.
 */
export interface PodSchedulingSeparateOptions {
    /**
     * Which topology to separate on.
     *
     * @default - Topology.HOSTNAME
     */
    readonly topology?: Topology;
    /**
     * Indicates the separation is optional (soft), with this weight score.
     *
     * @default - no weight. separation is assumed to be required (hard).
     */
    readonly weight?: number;
}
/**
 * Options for `PodScheduling.attract`.
 */
export interface PodSchedulingAttractOptions {
    /**
     * Indicates the attraction is optional (soft), with this weight score.
     *
     * @default - no weight. assignment is assumed to be required (hard).
     */
    readonly weight?: number;
}
/**
 * Controls the pod scheduling strategy.
 */
export declare class PodScheduling {
    protected readonly instance: AbstractPod;
    private _nodeAffinityPreferred;
    private _nodeAffinityRequired;
    private _podAffinityPreferred;
    private _podAffinityRequired;
    private _podAntiAffinityPreferred;
    private _podAntiAffinityRequired;
    private _tolerations;
    private _nodeName?;
    constructor(instance: AbstractPod);
    /**
     * Assign this pod a specific node by name.
     *
     * The scheduler ignores the Pod, and the kubelet on the named node
     * tries to place the Pod on that node. Overrules any affinity rules of the pod.
     *
     * Some limitations of static assignment are:
     *
     * - If the named node does not exist, the Pod will not run, and in some
     *   cases may be automatically deleted.
     * - If the named node does not have the resources to accommodate the Pod,
     *   the Pod will fail and its reason will indicate why, for example OutOfmemory or OutOfcpu.
     * - Node names in cloud environments are not always predictable or stable.
     *
     * Will throw is the pod is already assigned to named node.
     *
     * Under the hood, this method utilizes the `nodeName` property.
     */
    assign(node: NamedNode): void;
    /**
     * Allow this pod to tolerate taints matching these tolerations.
     *
     * You can put multiple taints on the same node and multiple tolerations on the same pod.
     * The way Kubernetes processes multiple taints and tolerations is like a filter: start with
     * all of a node's taints, then ignore the ones for which the pod has a matching toleration;
     * the remaining un-ignored taints have the indicated effects on the pod. In particular:
     *
     * - if there is at least one un-ignored taint with effect NoSchedule then Kubernetes will
     *   not schedule the pod onto that node
     * - if there is no un-ignored taint with effect NoSchedule but there is at least one un-ignored
     *   taint with effect PreferNoSchedule then Kubernetes will try to not schedule the pod onto the node
     * - if there is at least one un-ignored taint with effect NoExecute then the pod will be evicted from
     *   the node (if it is already running on the node), and will not be scheduled onto the node (if it is
     *   not yet running on the node).
     *
     * Under the hood, this method utilizes the `tolerations` property.
     *
     * @see https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
     */
    tolerate(node: TaintedNode): void;
    /**
     * Attract this pod to a node matched by selectors.
     * You can select a node by using `Node.labeled()`.
     *
     * Attracting to multiple nodes (i.e invoking this method multiple times) acts as
     * an OR condition, meaning the pod will be assigned to either one of the nodes.
     *
     * Under the hood, this method utilizes the `nodeAffinity` property.
     *
     * @see https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#node-affinity
     */
    attract(node: LabeledNode, options?: PodSchedulingAttractOptions): void;
    /**
     * Co-locate this pod with a scheduling selection.
     *
     * A selection can be one of:
     *
     * - An instance of a `Pod`.
     * - An instance of a `Workload` (e.g `Deployment`, `StatefulSet`).
     * - An un-managed pod that can be selected via `Pods.select()`.
     *
     * Co-locating with multiple selections ((i.e invoking this method multiple times)) acts as
     * an AND condition. meaning the pod will be assigned to a node that satisfies all
     * selections (i.e runs at least one pod that satisifies each selection).
     *
     * Under the hood, this method utilizes the `podAffinity` property.
     *
     * @see https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity
     */
    colocate(selector: IPodSelector, options?: PodSchedulingColocateOptions): void;
    /**
     * Seperate this pod from a scheduling selection.
     *
     * A selection can be one of:
     *
     * - An instance of a `Pod`.
     * - An instance of a `Workload` (e.g `Deployment`, `StatefulSet`).
     * - An un-managed pod that can be selected via `Pods.select()`.
     *
     * Seperating from multiple selections acts as an AND condition. meaning the pod
     * will not be assigned to a node that satisfies all selections (i.e runs at least one pod that satisifies each selection).
     *
     * Under the hood, this method utilizes the `podAntiAffinity` property.
     *
     * @see https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity
     */
    separate(selector: IPodSelector, options?: PodSchedulingSeparateOptions): void;
    private createPodAffinityTerm;
    private createNodeAffinityTerm;
    private validateWeight;
    /**
     * @internal
     */
    _toKube(): {
        affinity?: k8s.Affinity;
        nodeName?: string;
        tolerations?: k8s.Toleration[];
    };
}
/**
 * Isolation determines which policies are created
 * when allowing connections from a a pod / workload to peers.
 */
export declare enum PodConnectionsIsolation {
    /**
     * Only creates network policies that select the pod.
     */
    POD = "POD",
    /**
     * Only creates network policies that select the peer.
     */
    PEER = "PEER"
}
/**
 * Options for `PodConnections.allowTo`.
 */
export interface PodConnectionsAllowToOptions {
    /**
     * Which isolation should be applied to establish the connection.
     *
     * @default - unset, isolates both the pod and the peer.
     */
    readonly isolation?: PodConnectionsIsolation;
    /**
     * Ports to allow outgoing traffic to.
     *
     * @default - If the peer is a managed pod, take its ports. Otherwise, all ports are allowed.
     */
    readonly ports?: networkpolicy.NetworkPolicyPort[];
}
/**
 * Options for `PodConnections.allowFrom`.
 */
export interface PodConnectionsAllowFromOptions {
    /**
     * Which isolation should be applied to establish the connection.
     *
     * @default - unset, isolates both the pod and the peer.
     */
    readonly isolation?: PodConnectionsIsolation;
    /**
     * Ports to allow incoming traffic to.
     *
     * @default - The pod ports.
     */
    readonly ports?: networkpolicy.NetworkPolicyPort[];
}
/**
 * Controls network isolation rules for inter-pod communication.
 */
export declare class PodConnections {
    protected readonly instance: AbstractPod;
    constructor(instance: AbstractPod);
    /**
     * Allow network traffic from this pod to the peer.
     *
     * By default, this will create an egress network policy for this pod, and an ingress
     * network policy for the peer. This is required if both sides are already isolated.
     * Use `options.isolation` to control this behavior.
     *
     * @example
     *
     * // create only an egress policy that selects the 'web' pod to allow outgoing traffic
     * // to the 'redis' pod. this requires the 'redis' pod to not be isolated for ingress.
     * web.connections.allowTo(redis, { isolation: Isolation.POD })
     *
     * // create only an ingress policy that selects the 'redis' peer to allow incoming traffic
     * // from the 'web' pod. this requires the 'web' pod to not be isolated for egress.
     * web.connections.allowTo(redis, { isolation: Isolation.PEER })
     *
     */
    allowTo(peer: networkpolicy.INetworkPolicyPeer, options?: PodConnectionsAllowToOptions): void;
    /**
     * Allow network traffic from the peer to this pod.
     *
     * By default, this will create an ingress network policy for this pod, and an egress
     * network policy for the peer. This is required if both sides are already isolated.
     * Use `options.isolation` to control this behavior.
     *
     * @example
     *
     * // create only an egress policy that selects the 'web' pod to allow outgoing traffic
     * // to the 'redis' pod. this requires the 'redis' pod to not be isolated for ingress.
     * redis.connections.allowFrom(web, { isolation: Isolation.PEER })
     *
     * // create only an ingress policy that selects the 'redis' peer to allow incoming traffic
     * // from the 'web' pod. this requires the 'web' pod to not be isolated for egress.
     * redis.connections.allowFrom(web, { isolation: Isolation.POD })
     *
     */
    allowFrom(peer: networkpolicy.INetworkPolicyPeer, options?: PodConnectionsAllowFromOptions): void;
    private allow;
    private extractPorts;
    /**
     * Sets the default network policy for Pod/Workload to have all egress and ingress connections as disabled
     */
    isolate(): void;
}
