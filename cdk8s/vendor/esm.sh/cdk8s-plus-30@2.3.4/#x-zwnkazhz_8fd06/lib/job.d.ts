import { ApiObject, Duration } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as workload from './workload.d.ts';
/**
 * Properties for `Job`.
 */
export interface JobProps extends workload.WorkloadProps {
    /**
     * Specifies the duration the job may be active before the system tries to terminate it.
     *
     * @default - If unset, then there is no deadline.
     */
    readonly activeDeadline?: Duration;
    /**
     * Specifies the number of retries before marking this job failed.
     *
     * @default - If not set, system defaults to 6.
     */
    readonly backoffLimit?: number;
    /**
     * Limits the lifetime of a Job that has finished execution (either Complete
     * or Failed). If this field is set, after the Job finishes, it is eligible to
     * be automatically deleted. When the Job is being deleted, its lifecycle
     * guarantees (e.g. finalizers) will be honored. If this field is set to zero,
     * the Job becomes eligible to be deleted immediately after it finishes. This
     * field is alpha-level and is only honored by servers that enable the
     * `TTLAfterFinished` feature.
     *
     * @default - If this field is unset, the Job won't be automatically deleted.
     */
    readonly ttlAfterFinished?: Duration;
}
/**
 * A Job creates one or more Pods and ensures that a specified number of them successfully terminate. As pods successfully complete,
 * the Job tracks the successful completions. When a specified number of successful completions is reached, the task (ie, Job) is complete.
 * Deleting a Job will clean up the Pods it created. A simple case is to create one Job object in order to reliably run one Pod to completion.
 * The Job object will start a new Pod if the first Pod fails or is deleted (for example due to a node hardware failure or a node reboot).
 * You can also use a Job to run multiple Pods in parallel.
 */
export declare class Job extends workload.Workload {
    /**
     * Duration before job is terminated. If undefined, there is no deadline.
     */
    readonly activeDeadline?: Duration;
    /**
     * Number of retries before marking failed.
     */
    readonly backoffLimit?: number;
    /**
     * TTL before the job is deleted after it is finished.
     */
    readonly ttlAfterFinished?: Duration;
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "jobs";
    constructor(scope: Construct, id: string, props?: JobProps);
    /**
     * @internal
     */
    _toKube(): k8s.JobSpec;
}
