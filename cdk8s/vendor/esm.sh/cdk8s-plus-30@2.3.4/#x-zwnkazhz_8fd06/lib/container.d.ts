import { Size } from 'cdk8s';
import * as configmap from './config-map.d.ts';
import * as handler from './handler.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as probe from './probe.d.ts';
import * as secret from './secret.d.ts';
import * as volume from './volume.d.ts';
/**
 * Capability - complete list of POSIX capabilities
 */
export declare enum Capability {
    /**
     * ALL
     */
    ALL = "ALL",
    /**
     * CAP_AUDIT_CONTROL
     */
    AUDIT_CONTROL = "AUDIT_CONTROL",
    /**
     * CAP_AUDIT_READ
     */
    AUDIT_READ = "AUDIT_READ",
    /**
     * CAP_AUDIT_WRITE
     */
    AUDIT_WRITE = "AUDIT_WRITE",
    /**
     * CAP_BLOCK_SUSPEND
     */
    BLOCK_SUSPEND = "BLOCK_SUSPEND",
    /**
     * CAP_BPF
     */
    BPF = "BPF",
    /**
     * CAP_CHECKPOINT_RESTORE
     */
    CHECKPOINT_RESTORE = "CHECKPOINT_RESTORE",
    /**
     * CAP_CHOWN
     */
    CHOWN = "CHOWN",
    /**
     * CAP_DAC_OVERRIDE
     */
    DAC_OVERRIDE = "DAC_OVERRIDE",
    /**
     * CAP_DAC_READ_SEARCH
     */
    DAC_READ_SEARCH = "DAC_READ_SEARCH",
    /**
     * CAP_FOWNER
     */
    FOWNER = "FOWNER",
    /**
     * CAP_FSETID
     */
    FSETID = "FSETID",
    /**
     * CAP_IPC_LOCK
     */
    IPC_LOCK = "IPC_LOCK",
    /**
     * CAP_IPC_OWNER
     */
    IPC_OWNER = "IPC_OWNER",
    /**
     * CAP_KILL
     */
    KILL = "KILL",
    /**
     * CAP_LEASE
     */
    LEASE = "LEASE",
    /**
     * CAP_LINUX_IMMUTABLE
     */
    LINUX_IMMUTABLE = "LINUX_IMMUTABLE",
    /**
     * CAP_MAC_ADMIN
     */
    MAC_ADMIN = "MAC_ADMIN",
    /**
     * CAP_MAC_OVERRIDE
     */
    MAC_OVERRIDE = "MAC_OVERRIDE",
    /**
     * CAP_MKNOD
     */
    MKNOD = "MKNOD",
    /**
     * CAP_NET_ADMIN
     */
    NET_ADMIN = "NET_ADMIN",
    /**
     * CAP_NET_BIND_SERVICE
     */
    NET_BIND_SERVICE = "NET_BIND_SERVICE",
    /**
     * CAP_NET_BROADCAST
     */
    NET_BROADCAST = "NET_BROADCAST",
    /**
     * CAP_NET_RAW
     */
    NET_RAW = "NET_RAW",
    /**
     * CAP_PERFMON
     */
    PERFMON = "PERFMON",
    /**
     * CAP_SETGID
     */
    SETGID = "SETGID",
    /**
     * CAP_SETFCAP
     */
    SETFCAP = "SETFCAP",
    /**
     * CAP_SETPCAP
     */
    SETPCAP = "SETPCAP",
    /**
     * CAP_SETUID
     */
    SETUID = "SETUID",
    /**
     * CAP_SYS_ADMIN
     */
    SYS_ADMIN = "SYS_ADMIN",
    /**
     * CAP_SYS_BOOT
     */
    SYS_BOOT = "SYS_BOOT",
    /**
     * CAP_SYS_CHROOT
     */
    SYS_CHROOT = "SYS_CHROOT",
    /**
     * CAP_SYS_MODULE
     */
    SYS_MODULE = "SYS_MODULE",
    /**
     * CAP_SYS_NICE
     */
    SYS_NICE = "SYS_NICE",
    /**
     * CAP_SYS_PACCT
     */
    SYS_PACCT = "SYS_PACCT",
    /**
     * CAP_SYS_PTRACE
     */
    SYS_PTRACE = "SYS_PTRACE",
    /**
     * CAP_SYS_RAWIO
     */
    SYS_RAWIO = "SYS_RAWIO",
    /**
     * CAP_SYS_RESOURCE
     */
    SYS_RESOURCE = "SYS_RESOURCE",
    /**
     * CAP_SYS_TIME
     */
    SYS_TIME = "SYS_TIME",
    /**
     * CAP_SYS_TTY_CONFIG
     */
    SYS_TTY_CONFIG = "SYS_TTY_CONFIG",
    /**
     * CAP_SYSLOG
     */
    SYSLOG = "SYSLOG",
    /**
     * CAP_WAKE_ALARM
     */
    WAKE_ALARM = "WAKE_ALARM"
}
export declare enum SeccompProfileType {
    /**
    * A profile defined in a file on the node should be used
    */
    LOCALHOST = "Localhost",
    /**
    * The container runtime default profile should be used
    */
    RUNTIME_DEFAULT = "RuntimeDefault",
    /**
    * No profile should be applied
    */
    UNCONFINED = "Unconfined"
}
export interface SeccompProfile {
    /**
     * localhostProfile indicates a profile defined in a file on the node should be used.
     * The profile must be preconfigured on the node to work. Must be a descending path,
     * relative to the kubelet's configured seccomp profile location.
     * Must only be set if type is "Localhost".
     *
     * @default - empty string
     */
    readonly localhostProfile?: string;
    /**
     * Indicates which kind of seccomp profile will be applied
     */
    readonly type: SeccompProfileType;
}
export interface ContainerSecutiryContextCapabilities {
    /**
     * Added capabilities
     */
    readonly add?: Capability[];
    /**
     * Removed capabilities
     */
    readonly drop?: Capability[];
}
/**
 * Properties for `ContainerSecurityContext`
 */
export interface ContainerSecurityContextProps {
    /**
      * The UID to run the entrypoint of the container process.
      *
      * @default - 25000. An arbitrary number bigger than 9999 is selected here.
      * This is so that the container is blocked to access host files even if
      * somehow it manages to get access to host file system.
      */
    readonly user?: number;
    /**
      * The GID to run the entrypoint of the container process.
      *
      * @default - 26000. An arbitrary number bigger than 9999 is selected here.
      * This is so that the container is blocked to access host files even if
      * somehow it manages to get access to host file system.
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
     * Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host.
     *
     * @default false
     */
    readonly privileged?: boolean;
    /**
     * Whether this container has a read-only root filesystem.
     *
     * @default true
     */
    readonly readOnlyRootFilesystem?: boolean;
    /**
     * Whether a process can gain more privileges than its parent process.
     *
     * @default false
     */
    readonly allowPrivilegeEscalation?: boolean;
    /**
     * POSIX capabilities for running containers
     *
     * @default none
     */
    readonly capabilities?: ContainerSecutiryContextCapabilities;
    /**
    * Container's seccomp profile settings. Only one profile source may be set
    *
    * @default none
    */
    readonly seccompProfile?: SeccompProfile;
}
/**
 * Represents a network port in a single container.
 */
export interface ContainerPort {
    /**
     * Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.
     */
    readonly number: number;
    /**
     * What host IP to bind the external port to.
     *
     * @default - 127.0.0.1.
     */
    readonly hostIp?: string;
    /**
     * Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536.
     * Most containers do not need this.
     *
     * @default - auto generated by kubernetes and might change on restarts.
     */
    readonly hostPort?: number;
    /**
     * If specified, this must be an IANA_SVC_NAME and unique within the pod.
     * Each named port in a pod must have a unique name.
     * Name for the port that can be referred to by services.
     *
     * @default - port is not named.
     */
    readonly name?: string;
    /**
     * Protocol for port. Must be UDP, TCP, or SCTP. Defaults to "TCP".
     *
     * @default Protocol.TCP
     */
    readonly protocol?: Protocol;
}
/**
 * Network protocols.
 */
export declare enum Protocol {
    /**
     * TCP.
     */
    TCP = "TCP",
    /**
     * UDP.
     */
    UDP = "UDP",
    /**
     * SCTP.
     */
    SCTP = "SCTP"
}
/**
 * Container security attributes and settings.
 */
export declare class ContainerSecurityContext {
    readonly ensureNonRoot: boolean;
    readonly privileged: boolean;
    readonly readOnlyRootFilesystem: boolean;
    readonly user?: number;
    readonly group?: number;
    readonly allowPrivilegeEscalation?: boolean;
    readonly capabilities?: ContainerSecutiryContextCapabilities;
    readonly seccompProfile?: SeccompProfile;
    constructor(props?: ContainerSecurityContextProps);
    /**
     * @internal
     */
    _toKube(): k8s.SecurityContext;
}
export declare enum EnvFieldPaths {
    /**
     * The name of the pod.
     */
    POD_NAME = "metadata.name",
    /**
     * The namespace of the pod.
     */
    POD_NAMESPACE = "metadata.namespace",
    /**
     * The uid of the pod.
     */
    POD_UID = "metadata.uid",
    /**
     * The labels of the pod.
     */
    POD_LABEL = "metadata.labels",
    /**
     * The annotations of the pod.
     */
    POD_ANNOTATION = "metadata.annotations",
    /**
     * The ipAddress of the pod.
     */
    POD_IP = "status.podIP",
    /**
     * The service account name of the pod.
     */
    SERVICE_ACCOUNT_NAME = "spec.serviceAccountName",
    /**
     * The name of the node.
     */
    NODE_NAME = "spec.nodeName",
    /**
     * The ipAddress of the node.
     */
    NODE_IP = "status.hostIP",
    /**
     * The ipAddresess of the pod.
     */
    POD_IPS = "status.podIPs"
}
export declare enum ResourceFieldPaths {
    /**
     * CPU limit of the container.
     */
    CPU_LIMIT = "limits.cpu",
    /**
     * Memory limit of the container.
     */
    MEMORY_LIMIT = "limits.memory",
    /**
     * CPU request of the container.
     */
    CPU_REQUEST = "requests.cpu",
    /**
     * Memory request of the container.
     */
    MEMORY_REQUEST = "requests.memory",
    /**
     * Ephemeral storage limit of the container.
     */
    STORAGE_LIMIT = "limits.ephemeral-storage",
    /**
     * Ephemeral storage request of the container.
     */
    STORAGE_REQUEST = "requests.ephemeral-storage"
}
/**
 * Options to specify an envionment variable value from a ConfigMap key.
 */
export interface EnvValueFromConfigMapOptions {
    /**
     * Specify whether the ConfigMap or its key must be defined.
     *
     * @default false
     */
    readonly optional?: boolean;
}
/**
 * Options to specify an environment variable value from a Secret.
 */
export interface EnvValueFromSecretOptions {
    /**
     * Specify whether the Secret or its key must be defined.
     *
     * @default false
     */
    readonly optional?: boolean;
}
/**
 * Options to specify an environment variable value from the process environment.
 */
export interface EnvValueFromProcessOptions {
    /**
     * Specify whether the key must exist in the environment.
     * If this is set to true, and the key does not exist, an error will thrown.
     *
     * @default false
     */
    readonly required?: boolean;
}
/**
 * Options to specify an environment variable value from a field reference.
 */
export interface EnvValueFromFieldRefOptions {
    /**
     * Version of the schema the FieldPath is written in terms of.
     */
    readonly apiVersion?: string;
    /**
     * The key to select the pod label or annotation.
     */
    readonly key?: string;
}
/**
 * Options to specify an environment variable value from a resource.
 */
export interface EnvValueFromResourceOptions {
    /**
     * The container to select the value from.
     */
    readonly container?: Container;
    /**
     * The output format of the exposed resource.
     */
    readonly divisor?: string;
}
/**
 * Utility class for creating reading env values from various sources.
 */
export declare class EnvValue {
    readonly value?: any;
    readonly valueFrom?: any;
    /**
     * Create a value by reading a specific key inside a config map.
     *
     * @param configMap - The config map.
     * @param key - The key to extract the value from.
     * @param options - Additional options.
     */
    static fromConfigMap(configMap: configmap.IConfigMap, key: string, options?: EnvValueFromConfigMapOptions): EnvValue;
    /**
     * Defines an environment value from a secret JSON value.
     *
     * @param secretValue The secret value (secrent + key)
     * @param options Additional options
     */
    static fromSecretValue(secretValue: secret.SecretValue, options?: EnvValueFromSecretOptions): EnvValue;
    /**
     * Create a value from the given argument.
     *
     * @param value - The value.
     */
    static fromValue(value: string): EnvValue;
    /**
     *
     * Create a value from a field reference.
     *
     * @param fieldPath: The field reference.
     * @param options: Additional options.
     */
    static fromFieldRef(fieldPath: EnvFieldPaths, options?: EnvValueFromFieldRefOptions): EnvValue;
    /**
     * Create a value from a resource.
     *
     * @param resource: Resource to select the value from.
     * @param options: Additional options.
     */
    static fromResource(resource: ResourceFieldPaths, options?: EnvValueFromResourceOptions): EnvValue;
    /**
     * Create a value from a key in the current process environment.
     *
     * @param key - The key to read.
     * @param options - Additional options.
     */
    static fromProcess(key: string, options?: EnvValueFromProcessOptions): EnvValue;
    private constructor();
}
export declare enum ImagePullPolicy {
    /**
     * Every time the kubelet launches a container, the kubelet queries the container image registry
     * to resolve the name to an image digest. If the kubelet has a container image with that exact
     * digest cached locally, the kubelet uses its cached image; otherwise, the kubelet downloads
     * (pulls) the image with the resolved digest, and uses that image to launch the container.
     *
     * Default is Always if ImagePullPolicy is omitted and either the image tag is :latest or
     * the image tag is omitted.
     */
    ALWAYS = "Always",
    /**
     * The image is pulled only if it is not already present locally.
     *
     * Default is IfNotPresent if ImagePullPolicy is omitted and the image tag is present but
     * not :latest
     */
    IF_NOT_PRESENT = "IfNotPresent",
    /**
     * The image is assumed to exist locally. No attempt is made to pull the image.
     */
    NEVER = "Never"
}
/**
 * Container lifecycle properties.
 */
export interface ContainerLifecycle {
    /**
     * This hook is executed immediately after a container is created. However,
     * there is no guarantee that the hook will execute before the container ENTRYPOINT.
     *
     * @default - No post start handler.
     */
    readonly postStart?: handler.Handler;
    /**
     * This hook is called immediately before a container is terminated due to an API request or management
     * event such as a liveness/startup probe failure, preemption, resource contention and others.
     * A call to the PreStop hook fails if the container is already in a terminated or completed state
     * and the hook must complete before the TERM signal to stop the container can be sent.
     * The Pod's termination grace period countdown begins before the PreStop hook is executed,
     * so regardless of the outcome of the handler, the container will eventually terminate
     * within the Pod's termination grace period. No parameters are passed to the handler.
     *
     * @see https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination
     *
     * @default - No pre stop handler.
     */
    readonly preStop?: handler.Handler;
}
/**
 * RestartPolicy defines the restart behavior of individual containers in a pod.
 * This field may only be set for init containers, and the only allowed value is "Always".
 * For non-init containers or when this field is not specified,
 * the restart behavior is defined by the Pod's restart policy and the container type.
 * Setting the RestartPolicy as "Always" for the init container will have the following effect:
 * this init container will be continually restarted on exit until all regular containers have terminated.
 * Once all regular containers have completed, all init containers with restartPolicy "Always" will be shut down.
 * This lifecycle differs from normal init containers and is often referred to as a "sidecar" container.
 *
 * @see https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/
 */
export declare enum ContainerRestartPolicy {
    /**
     * If an init container is created with its restartPolicy set to Always,
     * it will start and remain running during the entire life of the Pod.
     * For regular containers, this is ignored by Kubernetes.
     */
    ALWAYS = "Always"
}
/**
 * Properties for creating a container.
 */
export interface ContainerProps extends ContainerOpts {
    /**
     * Docker image name.
     */
    readonly image: string;
}
/**
 * Optional properties of a container.
 */
export interface ContainerOpts {
    /**
     * Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.
     *
     * @default 'main'
     */
    readonly name?: string;
    /**
     * @deprecated - use `portNumber`.
     */
    readonly port?: number;
    /**
     * Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.
     *
     * This is a convinience property if all you need a single TCP numbered port.
     * In case more advanced configuartion is required, use the `ports` property.
     *
     * This port is added to the list of ports mentioned in the `ports` property.
     *
     * @default - Only the ports mentiond in the `ports` property are exposed.
     */
    readonly portNumber?: number;
    /**
     * List of ports to expose from this container.
     *
     * @default - Only the port mentioned in the `portNumber` property is exposed.
     */
    readonly ports?: ContainerPort[];
    /**
     * Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment.
     * If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME).
     * Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated.
     * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     *
     * @default - The docker image's ENTRYPOINT.
     */
    readonly command?: string[];
    /**
     * Arguments to the entrypoint. The docker image's CMD is used if `command` is
     * not provided.
     *
     * Variable references $(VAR_NAME) are expanded using the container's
     * environment. If a variable cannot be resolved, the reference in the input
     * string will be unchanged. The $(VAR_NAME) syntax can be escaped with a
     * double $$, ie: $$(VAR_NAME). Escaped references will never be expanded,
     * regardless of whether the variable exists or not.
     *
     * Cannot be updated.
     *
     * @see https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     * @default []
     */
    readonly args?: string[];
    /**
     * Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.
     *
     * @default - The container runtime's default.
     */
    readonly workingDir?: string;
    /**
     * Environment variables to set in the container.
     *
     * @default - No environment variables.
     */
    readonly envVariables?: {
        [name: string]: EnvValue;
    };
    /**
     * List of sources to populate environment variables in the container.
     * When a key exists in multiple sources, the value associated with
     * the last source will take precedence. Values defined by the `envVariables` property
     * with a duplicate key will take precedence.
     *
     * @default - No sources.
     */
    readonly envFrom?: EnvFrom[];
    /**
     * Pod volumes to mount into the container's filesystem. Cannot be updated.
     */
    readonly volumeMounts?: VolumeMount[];
    /**
     * Image pull policy for this container
     * @default ImagePullPolicy.ALWAYS
     */
    readonly imagePullPolicy?: ImagePullPolicy;
    /**
     * Determines when the container is ready to serve traffic.
     *
     * @default - no readiness probe is defined
     */
    readonly readiness?: probe.Probe;
    /**
     * Periodic probe of container liveness. Container will be restarted if the probe fails.
     *
     * @default - no liveness probe is defined
     */
    readonly liveness?: probe.Probe;
    /**
     * StartupProbe indicates that the Pod has successfully initialized.
     * If specified, no other probes are executed until this completes successfully
     *
     * @default - If a port is provided, then knocks on that port
     * to determine when the container is ready for readiness and
     * liveness probe checks.
     * Otherwise, no startup probe is defined.
     */
    readonly startup?: probe.Probe;
    /**
     * Describes actions that the management system should take in response to container lifecycle events.
     */
    readonly lifecycle?: ContainerLifecycle;
    /**
     * Compute resources (CPU and memory requests and limits) required by the container
     * @see https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     *
     * @default
     *    cpu:
     *      request: 1000 millis
     *      limit: 1500 millis
     *    memory:
     *      request: 512 mebibytes
     *      limit: 2048 mebibytes
     */
    readonly resources?: ContainerResources;
    /**
     * SecurityContext defines the security options the container should be run with.
     * If set, the fields override equivalent fields of the pod's security context.
     *
     * @see https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
     * @default
     *
     *   ensureNonRoot: true
     *   privileged: false
     *   readOnlyRootFilesystem: true
     *   allowPrivilegeEscalation: false
     *   user: 25000
     *   group: 26000
     */
    readonly securityContext?: ContainerSecurityContextProps;
    /**
     * Kubelet will start init containers with restartPolicy=Always in the order with other init containers,
     * but instead of waiting for its completion, it will wait for the container startup completion
     * Currently, only accepted value is Always
     * @see https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/
     * @default - no restart policy is defined and the pod restart policy is applied
     */
    readonly restartPolicy?: ContainerRestartPolicy;
}
/**
 * A single application container that you want to run within a pod.
 */
export declare class Container {
    /**
     * The port number that was configured for this container.
     * If undefined, either the container doesn't expose a port, or its
     * port configuration is stored in the `ports` field.
     */
    readonly portNumber?: number;
    /**
     * Volume mounts configured for this container.
     */
    readonly mounts: VolumeMount[];
    /**
     * Image pull policy for this container
     */
    readonly imagePullPolicy: ImagePullPolicy;
    /**
     * The container image.
     */
    readonly image: string;
    /**
     * The name of the container.
     */
    readonly name: string;
    /**
     * The working directory inside the container.
     */
    readonly workingDir?: string;
    /**
     * Compute resources (CPU and memory requests and limits) required by the container
     * @see https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     */
    readonly resources?: ContainerResources;
    /**
     * The security context of the container.
     */
    readonly securityContext: ContainerSecurityContext;
    /**
     * The environment of the container.
     */
    readonly env: Env;
    /**
     * The restart policy of the container.
     */
    readonly restartPolicy?: ContainerRestartPolicy;
    private readonly _command?;
    private readonly _args?;
    private readonly _ports;
    private readonly _readiness?;
    private readonly _liveness?;
    private readonly _startup?;
    private readonly _lifecycle?;
    constructor(props: ContainerProps);
    /**
     * @deprecated - use `portNumber`.
     */
    get port(): number | undefined;
    /**
     * Ports exposed by this containers.
     * Returns a copy, use `addPort` to modify.
     */
    get ports(): ContainerPort[];
    /**
     * Entrypoint array (the command to execute when the container starts).
     * @returns a copy of the entrypoint array, cannot be modified
     */
    get command(): string[] | undefined;
    /**
     * Arguments to the entrypoint.
     *
     * @returns a copy of the arguments array, cannot be modified.
     */
    get args(): string[] | undefined;
    /**
     * Mount a volume to a specific path so that it is accessible by the container.
     * Every pod that is configured to use this container will autmoatically have access to the volume.
     *
     * @param path - The desired path in the container.
     * @param storage - The storage to mount.
     */
    mount(path: string, storage: volume.IStorage, options?: MountOptions): void;
    /**
     * Add a port to expose from this container.
     */
    addPort(port: ContainerPort): void;
    /**
     * @internal
     */
    _toKube(): k8s.Container;
}
/**
 * Options for mounts.
 */
export interface MountOptions {
    /**
     * Determines how mounts are propagated from the host to container and the
     * other way around. When not set, MountPropagationNone is used.
     *
     * Mount propagation allows for sharing volumes mounted by a Container to
     * other Containers in the same Pod, or even to other Pods on the same node.
     *
     * @default MountPropagation.NONE
     */
    readonly propagation?: MountPropagation;
    /**
     * Mounted read-only if true, read-write otherwise (false or unspecified).
     * Defaults to false.
     *
     * @default false
     */
    readonly readOnly?: boolean;
    /**
     * Path within the volume from which the container's volume should be mounted.).
     *
     * @default "" the volume's root
     */
    readonly subPath?: string;
    /**
     * Expanded path within the volume from which the container's volume should be
     * mounted. Behaves similarly to SubPath but environment variable references
     * $(VAR_NAME) are expanded using the container's environment. Defaults to ""
     * (volume's root).
     *
     * `subPathExpr` and `subPath` are mutually exclusive.
     *
     * @default "" volume's root.
     */
    readonly subPathExpr?: string;
}
/**
 * Mount a volume from the pod to the container.
 */
export interface VolumeMount extends MountOptions {
    /**
     * The volume to mount.
     */
    readonly volume: volume.Volume;
    /**
     * Path within the container at which the volume should be mounted. Must not
     * contain ':'.
     */
    readonly path: string;
}
export declare enum MountPropagation {
    /**
     * This volume mount will not receive any subsequent mounts that are mounted
     * to this volume or any of its subdirectories by the host. In similar
     * fashion, no mounts created by the Container will be visible on the host.
     *
     * This is the default mode.
     *
     * This mode is equal to `private` mount propagation as described in the Linux
     * kernel documentation
     */
    NONE = "None",
    /**
     * This volume mount will receive all subsequent mounts that are mounted to
     * this volume or any of its subdirectories.
     *
     * In other words, if the host mounts anything inside the volume mount, the
     * Container will see it mounted there.
     *
     * Similarly, if any Pod with Bidirectional mount propagation to the same
     * volume mounts anything there, the Container with HostToContainer mount
     * propagation will see it.
     *
     * This mode is equal to `rslave` mount propagation as described in the Linux
     * kernel documentation
     */
    HOST_TO_CONTAINER = "HostToContainer",
    /**
     * This volume mount behaves the same the HostToContainer mount. In addition,
     * all volume mounts created by the Container will be propagated back to the
     * host and to all Containers of all Pods that use the same volume
     *
     * A typical use case for this mode is a Pod with a FlexVolume or CSI driver
     * or a Pod that needs to mount something on the host using a hostPath volume.
     *
     * This mode is equal to `rshared` mount propagation as described in the Linux
     * kernel documentation
     *
     * Caution: Bidirectional mount propagation can be dangerous. It can damage
     * the host operating system and therefore it is allowed only in privileged
     * Containers. Familiarity with Linux kernel behavior is strongly recommended.
     * In addition, any volume mounts created by Containers in Pods must be
     * destroyed (unmounted) by the Containers on termination.
     *
     */
    BIDIRECTIONAL = "Bidirectional"
}
/**
 * CPU and memory compute resources
 */
export interface ContainerResources {
    readonly cpu?: CpuResources;
    readonly memory?: MemoryResources;
    readonly ephemeralStorage?: EphemeralStorageResources;
}
/**
 * CPU request and limit
 */
export interface CpuResources {
    readonly request?: Cpu;
    readonly limit?: Cpu;
}
/**
 * Represents the amount of CPU.
 * The amount can be passed as millis or units.
 */
export declare class Cpu {
    static millis(amount: number): Cpu;
    static units(amount: number): Cpu;
    amount: string;
    private constructor();
}
/**
 * Memory request and limit
 */
export interface MemoryResources {
    readonly request?: Size;
    readonly limit?: Size;
}
/**
 * Emphemeral storage request and limit
 */
export interface EphemeralStorageResources {
    readonly request?: Size;
    readonly limit?: Size;
}
/**
 * A collection of env variables defined in other resources.
 */
export declare class EnvFrom {
    private readonly configMap?;
    private readonly prefix?;
    private readonly sec?;
    constructor(configMap?: configmap.IConfigMap | undefined, prefix?: string | undefined, sec?: secret.ISecret | undefined);
    /**
     * @internal
     */
    _toKube(): k8s.EnvFromSource;
}
export declare function extractContainerPorts(selector?: any): ContainerPort[];
/**
 * Container environment variables.
 */
export declare class Env {
    /**
     * Selects a ConfigMap to populate the environment variables with.
     * The contents of the target ConfigMap's Data field will represent
     * the key-value pairs as environment variables.
     */
    static fromConfigMap(configMap: configmap.IConfigMap, prefix?: string): EnvFrom;
    /**
     * Selects a Secret to populate the environment variables with.
     * The contents of the target Secret's Data field will represent
     * the key-value pairs as environment variables.
     */
    static fromSecret(secr: secret.ISecret): EnvFrom;
    private readonly _sources;
    private readonly _variables;
    constructor(sources: EnvFrom[], variables: {
        [name: string]: EnvValue;
    });
    /**
     * Add a single variable by name and value.
     * The variable value can come from various dynamic sources such a secrets of config maps.
     * Use `EnvValue.fromXXX` to select sources.
     */
    addVariable(name: string, value: EnvValue): void;
    /**
     * The environment variables for this container.
     * Returns a copy. To add environment variables use `container.env.addVariable()`.
     */
    get variables(): {
        [name: string]: EnvValue;
    };
    /**
     * Add a collection of variables by copying from another source.
     * Use `Env.fromXXX` functions to select sources.
     */
    copyFrom(from: EnvFrom): void;
    /**
     * The list of sources used to populate the container environment,
     * in addition to the `variables`.
     *
     * Returns a copy. To add a source use `container.env.copyFrom()`.
     */
    get sources(): EnvFrom[];
    private renderEnv;
    /**
     * @internal
     */
    _toKube(): {
        variables?: k8s.EnvVar[];
        from?: k8s.EnvFromSource[];
    };
}
