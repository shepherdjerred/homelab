import { ApiObject, Duration } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import { IScalable, ScalingTarget } from './horizontal-pod-autoscaler.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as service from './service.d.ts';
import * as workload from './workload.d.ts';
/**
 * Controls how pods are created during initial scale up, when replacing pods on nodes,
 * or when scaling down.
 *
 * The default policy is `OrderedReady`, where pods are created in increasing order
 * (pod-0, then pod-1, etc) and the controller will wait until each pod is ready before
 * continuing. When scaling down, the pods are removed in the opposite order.
 *
 * The alternative policy is `Parallel` which will create pods in parallel to match the
 * desired scale without waiting, and on scale down will delete all pods at once.
 */
export declare enum PodManagementPolicy {
    ORDERED_READY = "OrderedReady",
    PARALLEL = "Parallel"
}
/**
 * Properties for initialization of `StatefulSet`.
 */
export interface StatefulSetProps extends workload.WorkloadProps {
    /**
     * Service to associate with the statefulset.
     *
     * @default - A new headless service will be created.
     */
    readonly service?: service.Service;
    /**
      * Number of desired pods.
      *
      * @default 1
      */
    readonly replicas?: number;
    /**
      * Pod management policy to use for this statefulset.
      *
      * @default PodManagementPolicy.ORDERED_READY
      */
    readonly podManagementPolicy?: PodManagementPolicy;
    /**
     * Indicates the StatefulSetUpdateStrategy that will be employed to update Pods in the StatefulSet when a revision is made to Template.
     *
     * @default - RollingUpdate with partition set to 0
     */
    readonly strategy?: StatefulSetUpdateStrategy;
    /**
     * Minimum duration for which a newly created pod should be ready without any of its container crashing,
     * for it to be considered available. Zero means the pod will be considered available as soon as it is ready.
     *
     * This is an alpha field and requires enabling StatefulSetMinReadySeconds feature gate.
     *
     * @see https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#min-ready-seconds
     * @default Duration.seconds(0)
     */
    readonly minReady?: Duration;
}
/**
 * StatefulSet is the workload API object used to manage stateful applications.
 *
 * Manages the deployment and scaling of a set of Pods, and provides guarantees
 * about the ordering and uniqueness of these Pods.
 *
 * Like a Deployment, a StatefulSet manages Pods that are based on an identical
 * container spec. Unlike a Deployment, a StatefulSet maintains a sticky identity
 * for each of their Pods. These pods are created from the same spec, but are not
 * interchangeable: each has a persistent identifier that it maintains across any
 * rescheduling.
 *
 * If you want to use storage volumes to provide persistence for your workload, you
 * can use a StatefulSet as part of the solution. Although individual Pods in a StatefulSet
 * are susceptible to failure, the persistent Pod identifiers make it easier to match existing
 * volumes to the new Pods that replace any that have failed.
 *
 * Using StatefulSets
 * ------------------
 * StatefulSets are valuable for applications that require one or more of the following.
 *
 * - Stable, unique network identifiers.
 * - Stable, persistent storage.
 * - Ordered, graceful deployment and scaling.
 * - Ordered, automated rolling updates.
 */
export declare class StatefulSet extends workload.Workload implements IScalable {
    /**
      * Number of desired pods.
      */
    readonly replicas?: number;
    /**
      * Management policy to use for the set.
      */
    readonly podManagementPolicy: PodManagementPolicy;
    /**
     * The update startegy of this stateful set.
     */
    readonly strategy: StatefulSetUpdateStrategy;
    /**
     * Minimum duration for which a newly created pod should be ready without
     * any of its container crashing, for it to be considered available.
     */
    readonly minReady: Duration;
    /**
      * @see base.Resource.apiObject
      */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "statefulsets";
    hasAutoscaler: boolean;
    readonly service: service.Service;
    constructor(scope: Construct, id: string, props: StatefulSetProps);
    private _createHeadlessService;
    /**
      * @internal
      */
    _toKube(): k8s.StatefulSetSpec;
    /**
     * @see IScalable.markHasAutoscaler()
     */
    markHasAutoscaler(): void;
    /**
     * @see IScalable.toScalingTarget()
     */
    toScalingTarget(): ScalingTarget;
}
/**
 * Options for `StatefulSetUpdateStrategy.rollingUpdate`.
 */
export interface StatefulSetUpdateStrategyRollingUpdateOptions {
    /**
     * If specified, all Pods with an ordinal that is greater than or equal to the partition will
     * be updated when the StatefulSet's .spec.template is updated. All Pods with an ordinal that
     * is less than the partition will not be updated, and, even if they are deleted, they will be
     * recreated at the previous version.
     *
     * If the partition is greater than replicas, updates to the pod template will not be propagated to Pods.
     * In most cases you will not need to use a partition, but they are useful if you want to stage an
     * update, roll out a canary, or perform a phased roll out.
     *
     * @see https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#partitions
     * @default 0
     */
    readonly partition?: number;
}
/**
 * StatefulSet update strategies.
 */
export declare class StatefulSetUpdateStrategy {
    private readonly strategy;
    /**
     * The controller will not automatically update the Pods in a StatefulSet.
     * Users must manually delete Pods to cause the controller to create new Pods
     * that reflect modifications.
     */
    static onDelete(): StatefulSetUpdateStrategy;
    /**
     * The controller will delete and recreate each Pod in the StatefulSet.
     * It will proceed in the same order as Pod termination (from the largest ordinal to the smallest),
     * updating each Pod one at a time. The Kubernetes control plane waits until an updated
     * Pod is Running and Ready prior to updating its predecessor.
     */
    static rollingUpdate(options?: StatefulSetUpdateStrategyRollingUpdateOptions): StatefulSetUpdateStrategy;
    private constructor();
    /**
     * @internal
     */
    _toKube(): k8s.StatefulSetUpdateStrategy;
}
