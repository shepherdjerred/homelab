import { ApiObject, Duration } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import { Resource, ResourceProps, IResource } from './base.d.ts';
import * as container from './container.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as pod from './pod.d.ts';
/**
 * Properties used to configure the target of an Autoscaler.
 */
export interface ScalingTarget {
    /**
     * The object kind (e.g. "Deployment").
     */
    readonly kind: string;
    /**
     * The object's API version (e.g. "authorization.k8s.io/v1")
     */
    readonly apiVersion: string;
    /**
     * The Kubernetes name of this resource.
     */
    readonly name: string;
    /**
     * Container definitions associated with the target.
     */
    readonly containers: container.Container[];
    /**
     * The fixed number of replicas defined on the target. This is used
     * for validation purposes as Scalable targets should not have a
     * fixed number of replicas.
     */
    readonly replicas?: number;
}
/**
 * Represents a scalable workload.
 */
export interface IScalable {
    /**
     * If this is a target of an autoscaler.
     */
    hasAutoscaler: boolean;
    /**
     * Called on all IScalable targets when they are associated with an autoscaler.
     */
    markHasAutoscaler(): void;
    /**
     * Return the target spec properties of this Scalable.
     */
    toScalingTarget(): ScalingTarget;
}
/**
 * Properties for HorizontalPodAutoscaler
 */
export interface HorizontalPodAutoscalerProps extends ResourceProps {
    /**
     * The workload to scale up or down.
     *
     * Scalable workload types:
     * * Deployment
     * * StatefulSet
     */
    readonly target: IScalable;
    /**
     * The maximum number of replicas that can be scaled up to.
     */
    readonly maxReplicas: number;
    /**
     * The minimum number of replicas that can be scaled down to.
     *
     * Can be set to 0 if the alpha feature gate `HPAScaleToZero` is enabled and
     * at least one Object or External metric is configured.
     *
     * @default 1
     */
    readonly minReplicas?: number;
    /**
     * The metric conditions that trigger a scale up or scale down.
     *
     * @default - If metrics are not provided, then the target resource
     * constraints (e.g. cpu limit) will be used as scaling metrics.
     */
    readonly metrics?: Metric[];
    /**
     * The scaling behavior when scaling up.
     *
     * @default - Is the higher of:
     * * Increase no more than 4 pods per 60 seconds
     * * Double the number of pods per 60 seconds
     */
    readonly scaleUp?: ScalingRules;
    /**
     * The scaling behavior when scaling down.
     *
     * @default - Scale down to minReplica count with a 5 minute stabilization window.
     */
    readonly scaleDown?: ScalingRules;
}
/**
 * A HorizontalPodAutoscaler scales a workload up or down in response to a metric
 * change. This allows your services to scale up when demand is high and scale down
 * when they are no longer needed.
 *
 *
 * Typical use cases for HorizontalPodAutoscaler:
 *
 * * When Memory usage is above 70%, scale up the number of replicas to meet the demand.
 * * When CPU usage is below 30%, scale down the number of replicas to save resources.
 * * When a service is experiencing a spike in traffic, scale up the number of replicas
 *   to meet the demand. Then, when the traffic subsides, scale down the number of
 *   replicas to save resources.
 *
 * The autoscaler uses the following algorithm to determine the number of replicas to scale:
 *
 * `desiredReplicas = ceil[currentReplicas * ( currentMetricValue / desiredMetricValue )]`
 *
 * HorizontalPodAutoscaler's can be used to with any `Scalable` workload:
 * * Deployment
 * * StatefulSet
 *
 * **Targets that already have a replica count defined:**
 *
 * Remove any replica counts from the target resource before associating with a
 * HorizontalPodAutoscaler. If this isn't done, then any time a change to that object is applied,
 * Kubernetes will scale the current number of Pods to the value of the target.replicas key. This
 * may not be desired and could lead to unexpected behavior.
 *
 * @see https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#implicit-maintenance-mode-deactivation
 *
 * @example
 * const backend = new kplus.Deployment(this, 'Backend', ...);
 *
 * const hpa = new kplus.HorizontalPodAutoscaler(chart, 'Hpa', {
 *  target: backend,
 *  maxReplicas: 10,
 *  scaleUp: {
 *    policies: [
 *      {
 *        replicas: kplus.Replicas.absolute(3),
 *        duration: Duration.minutes(5),
 *      },
 *    ],
 *  },
 * });
 */
export declare class HorizontalPodAutoscaler extends Resource {
    /**
   * @see base.Resource.apiObject
   */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "horizontalpodautoscaler";
    /**
     * The workload to scale up or down.
     */
    readonly target: IScalable;
    /**
     * The maximum number of replicas that can be scaled up to.
     */
    readonly maxReplicas: number;
    /**
     * The minimum number of replicas that can be scaled down to.
     */
    readonly minReplicas: number;
    /**
     * The metric conditions that trigger a scale up or scale down.
     */
    readonly metrics?: Metric[];
    /**
     * The scaling behavior when scaling up.
     */
    readonly scaleUp: ScalingRules;
    /**
     * The scaling behavior when scaling down.
     */
    readonly scaleDown: ScalingRules;
    private readonly _defaultScalingDuration;
    constructor(scope: Construct, id: string, props: HorizontalPodAutoscalerProps);
    /**
     * Validate a list of scaling policies.
     * @internal
     */
    private _validateScalingPolicies;
    /**
     * Validate `ScalingPolicy.duration` is within the allowed range.
     *
     * `duration` range: 1 second - 30 min
     *
     * Kubernetes name: `ScalingPolicy.periodSeconds`.
     * @see https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/horizontal-pod-autoscaler-v2/#HorizontalPodAutoscalerSpec
     * @internal
     */
    private _validateScalingPolicyDuration;
    /**
     * Validate `ScalingRules.stabilizationWindow` is within the allowed range.
     *
     * `stabilizationWindow` range: 0 seconds - 1 hour
     *
     * @see https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/horizontal-pod-autoscaler-v2/#HorizontalPodAutoscalerSpec
     * @internal
     */
    private _validateStabilizationWindow;
    /**
     * Guarantee the HPA has a metric to scale on.
     * Verify that metrics are configured, if not check every pod container has a resource limit or
     * request defined.
     * @internal
     */
    private _validateTargetContainers;
    /**
     * Prevent the HPA from scaling a target with a replica count defined.
     * @see https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#implicit-maintenance-mode-deactivation
     * @internal
     */
    private _validateTargetReplicas;
    /**
     * Validate that the container has at least one CPU/memory request/limit defined.
     * @internal
     */
    private _hasRequestsOrLimits;
    /**
     * @internal
     */
    _toKube(): k8s.HorizontalPodAutoscalerSpecV2;
}
/**
 * Base options for a Metric
 */
export interface MetricOptions {
    /**
     * The target metric value that will trigger scaling.
     */
    readonly target: MetricTarget;
    /**
    * The name of the metric to scale on.
    */
    readonly name: string;
    /**
     * A selector to find a metric by label.
     *
     * When set, it is passed as an additional parameter to the metrics server
     * for more specific metrics scoping.
     *
     * @default - Just the metric 'name' will be used to gather metrics.
     */
    readonly labelSelector?: pod.LabelSelector;
}
/**
 * Options for `Metric.containerResource()`
 */
export interface MetricContainerResourceOptions {
    /**
     * Container where the metric can be found.
     */
    readonly container: container.Container;
    /**
     * Target metric value that will trigger scaling.
     */
    readonly target: MetricTarget;
}
/**
 * Options for `Metric.object()`
 */
export interface MetricObjectOptions extends MetricOptions {
    /**
     * Resource where the metric can be found.
     */
    readonly object: IResource;
}
/**
 * A metric condition that HorizontalPodAutoscaler's scale on.
 */
export declare class Metric {
    private readonly metric;
    /**
     * Metric that tracks the CPU of a container. This metric
     * will be tracked across all pods of the current scale target.
     *
     */
    static containerCpu(options: MetricContainerResourceOptions): Metric;
    /**
     * Metric that tracks the Memory of a container. This metric
     * will be tracked across all pods of the current scale target.
     *
     */
    static containerMemory(options: MetricContainerResourceOptions): Metric;
    /**
     * Metric that tracks the volume size of a container. This metric
     * will be tracked across all pods of the current scale target.
     *
     */
    static containerStorage(options: MetricContainerResourceOptions): Metric;
    /**
     * Metric that tracks the local ephemeral storage of a container. This metric
     * will be tracked across all pods of the current scale target.
     *
     */
    static containerEphemeralStorage(options: MetricContainerResourceOptions): Metric;
    /**
     * A global metric that is not associated with any Kubernetes object.
     * Allows for autoscaling based on information coming from components running outside of
     * the cluster.
     *
     * Use case:
     * * Scale up when the length of an SQS queue is greater than 10 messages.
     * * Scale down when an outside load balancer's queries are less than 10000 per second.
     */
    static external(options: MetricOptions): Metric;
    /**
    * Metric that describes a metric of a kubernetes object
    *
    * Use case:
    * * Scale on a Kubernetes Ingress's hits-per-second metric.
    */
    static object(options: MetricObjectOptions): Metric;
    /**
     * A pod metric that will be averaged across all pods of the current scale target.
     *
     * Use case:
     * * Average CPU utilization across all pods
     * * Transactions processed per second across all pods
     */
    static pods(options: MetricOptions): Metric;
    /**
     * Tracks the available CPU of the pods in a target.
     *
     * Note: Since the resource usages of all the containers are summed up the total
     * pod utilization may not accurately represent the individual container resource
     * usage. This could lead to situations where a single container might be running
     * with high usage and the HPA will not scale out because the overall pod usage
     * is still within acceptable limits.
     *
     * Use case:
     * * Scale up when CPU is above 40%.
     */
    static resourceCpu(target: MetricTarget): Metric;
    /**
     * Tracks the available Memory of the pods in a target.
     *
     * Note: Since the resource usages of all the containers are summed up the total
     * pod utilization may not accurately represent the individual container resource
     * usage. This could lead to situations where a single container might be running
     * with high usage and the HPA will not scale out because the overall pod usage
     * is still within acceptable limits.
     *
     * Use case:
     * * Scale up when Memory is above 512MB.
     */
    static resourceMemory(target: MetricTarget): Metric;
    /**
     * Tracks the available Storage of the pods in a target.
     *
     * Note: Since the resource usages of all the containers are summed up the total
     * pod utilization may not accurately represent the individual container resource
     * usage. This could lead to situations where a single container might be running
     * with high usage and the HPA will not scale out because the overall pod usage
     * is still within acceptable limits.
     *
     */
    static resourceStorage(target: MetricTarget): Metric;
    /**
     * Tracks the available Ephemeral Storage of the pods in a target.
     *
     * Note: Since the resource usages of all the containers are summed up the total
     * pod utilization may not accurately represent the individual container resource
     * usage. This could lead to situations where a single container might be running
     * with high usage and the HPA will not scale out because the overall pod usage
     * is still within acceptable limits.
     *
     */
    static resourceEphemeralStorage(target: MetricTarget): Metric;
    readonly type: string;
    private constructor();
    /**
     * @internal
     */
    _toKube(): k8s.MetricSpecV2;
}
/**
 * A metric condition that will trigger scaling behavior when satisfied.
 *
 * @example
 *
 * MetricTarget.averageUtilization(70); // 70% average utilization
 *
 */
export declare class MetricTarget {
    private readonly metric;
    /**
    * Target a specific target value.
    *
    * @param value The target value.
    */
    static value(value: number): MetricTarget;
    /**
     * Target the average value across all relevant pods.
     *
     * @param averageValue The average metric value.
     */
    static averageValue(averageValue: number): MetricTarget;
    /**
     * Target a percentage value across all relevant pods.
     *
     * @param averageUtilization The percentage of the utilization metric. e.g. `50` for 50%.
     */
    static averageUtilization(averageUtilization: number): MetricTarget;
    private constructor();
    /**
     * @internal
     */
    _toKube(): k8s.MetricSpecV2;
}
/**
 * Defines the scaling behavior for one direction.
 */
export interface ScalingRules {
    /**
     * Defines the window of past metrics that the autoscaler should consider when calculating
     * wether or not autoscaling should occur.
     *
     * Minimum duration is 1 second, max is 1 hour.
     *
     * @example
     * stabilizationWindow: Duration.minutes(30)
     * // Autoscaler considers the last 30 minutes of metrics when deciding whether to scale.
     *
     * @default * On scale down no stabilization is performed.
     * * On scale up stabilization is performed for 5 minutes.
     */
    readonly stabilizationWindow?: Duration;
    /**
     * The strategy to use when scaling.
     *
     * @default MAX_CHANGE
     */
    readonly strategy?: ScalingStrategy;
    /**
     * The scaling policies.
     *
     * @default * Scale up
     *            * Increase no more than 4 pods per 60 seconds
     *            * Double the number of pods per 60 seconds
     *          * Scale down
     *            * Decrease to minReplica count
     */
    readonly policies?: ScalingPolicy[];
}
export declare enum ScalingStrategy {
    /**
     * Use the policy that provisions the most changes.
     */
    MAX_CHANGE = "Max",
    /**
     * Use the policy that provisions the least amount of changes.
     */
    MIN_CHANGE = "Min",
    /**
     * Disables scaling in this direction.
     *
     * @deprecated - Omit the ScalingRule instead
     */
    DISABLED = "Disabled"
}
export interface ScalingPolicy {
    /**
     * The type and quantity of replicas to change.
     */
    readonly replicas: Replicas;
    /**
     * The amount of time the scaling policy has to
     * continue scaling before the target metric must be
     * revalidated.
     *
     * Must be greater than 0 seconds and no longer than 30 minutes.
     *
     * @default - 15 seconds
     */
    readonly duration?: Duration;
}
/**
 * The amount of replicas that will change.
 */
export declare class Replicas {
    private readonly replicas;
    /**
     * Changes the pods by a percentage of the it's current value.
     *
     * @param value The percentage of change to apply. Must be greater than 0.
     */
    static percent(value: number): Replicas;
    /**
     * Changes the pods by a percentage of the it's current value.
     *
     * @param value The amount of change to apply. Must be greater than 0.
     */
    static absolute(value: number): Replicas;
    private constructor();
    /**
     * @internal
     */
    _toKube(): Pick<k8s.HpaScalingPolicyV2, 'type' | 'value'>;
}
