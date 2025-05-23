import { ApiObjectMetadata, ApiObjectMetadataDefinition } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as pod from './pod.d.ts';
/**
 * Properties for `Workload`.
 */
export interface WorkloadProps extends pod.AbstractPodProps {
    /**
     * The pod metadata of this workload.
     */
    readonly podMetadata?: ApiObjectMetadata;
    /**
     * Automatically allocates a pod label selector for this workload and add
     * it to the pod metadata. This ensures this workload manages pods created by
     * its pod template.
     *
     * @default true
     */
    readonly select?: boolean;
    /**
     * Automatically spread pods across hostname and zones.
     *
     * @see https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/#internal-default-constraints
     * @default false
     */
    readonly spread?: boolean;
}
/**
 * A label selector requirement is a selector that contains values, a key, and an operator that
 * relates the key and values.
 */
export interface LabelSelectorRequirement {
    /**
     * The label key that the selector applies to.
     */
    readonly key: string;
    /**
     * Represents a key's relationship to a set of values.
     */
    readonly operator: string;
    /**
     * An array of string values. If the operator is In or NotIn, the values array
     * must be non-empty. If the operator is Exists or DoesNotExist,
     * the values array must be empty. This array is replaced during a strategic merge patch.
     */
    readonly values?: string[];
}
/**
 * A workload is an application running on Kubernetes. Whether your workload is a single
 * component or several that work together, on Kubernetes you run it inside a set of pods.
 * In Kubernetes, a Pod represents a set of running containers on your cluster.
 */
export declare abstract class Workload extends pod.AbstractPod {
    readonly connections: pod.PodConnections;
    readonly scheduling: WorkloadScheduling;
    private readonly spread;
    private readonly _matchLabels;
    private readonly _matchExpressions;
    private _podMetadata?;
    private readonly _props;
    private readonly _matcher;
    constructor(scope: Construct, id: string, props: WorkloadProps);
    /**
     * The metadata of pods in this workload.
     */
    get podMetadata(): ApiObjectMetadataDefinition;
    /**
     * Configure selectors for this workload.
     */
    select(...selectors: pod.LabelSelector[]): void;
    /**
     * The label matchers this workload will use in order to select pods.
     *
     * Returns a a copy. Use `select()` to add label matchers.
     */
    get matchLabels(): Record<string, string>;
    /**
     * The expression matchers this workload will use in order to select pods.
     *
     * Returns a a copy. Use `select()` to add expression matchers.
     */
    get matchExpressions(): LabelSelectorRequirement[];
    /**
     * @internal
     */
    _toLabelSelector(): k8s.LabelSelector;
    /**
     * @internal
     */
    _toPodSpec(): k8s.PodSpec;
}
/**
 * Options for `WorkloadScheduling.spread`.
 */
export interface WorkloadSchedulingSpreadOptions {
    /**
     * Indicates the spread is optional, with this weight score.
     *
     * @default - no weight. spread is assumed to be required.
     */
    readonly weight?: number;
    /**
     * Which topology to spread on.
     *
     * @default - Topology.HOSTNAME
     */
    readonly topology?: pod.Topology;
}
/**
 * Controls the pod scheduling strategy of this workload.
 * It offers some additional API's on top of the core pod scheduling.
 */
export declare class WorkloadScheduling extends pod.PodScheduling {
    /**
     * Spread the pods in this workload by the topology key.
     * A spread is a separation of the pod from itself and is used to
     * balance out pod replicas across a given topology.
     */
    spread(options?: WorkloadSchedulingSpreadOptions): void;
}
