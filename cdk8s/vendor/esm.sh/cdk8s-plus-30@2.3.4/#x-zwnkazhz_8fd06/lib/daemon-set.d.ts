import { ApiObject } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as workload from './workload.d.ts';
/**
 * Properties for `DaemonSet`.
 */
export interface DaemonSetProps extends workload.WorkloadProps {
    /**
     * Minimum number of seconds for which a newly created pod should
     * be ready without any of its container crashing, for it to be considered available.
     *
     * @default 0
     */
    readonly minReadySeconds?: number;
}
/**
 * A DaemonSet ensures that all (or some) Nodes run a copy of a Pod.
 * As nodes are added to the cluster, Pods are added to them.
 * As nodes are removed from the cluster, those Pods are garbage collected.
 * Deleting a DaemonSet will clean up the Pods it created.
 *
 * Some typical uses of a DaemonSet are:
 *
 * - running a cluster storage daemon on every node
 * - running a logs collection daemon on every node
 * - running a node monitoring daemon on every node
 *
 * In a simple case, one DaemonSet, covering all nodes, would be used for each type of daemon.
 * A more complex setup might use multiple DaemonSets for a single type of daemon,
 * but with different flags and/or different memory and cpu requests for different hardware types.
 */
export declare class DaemonSet extends workload.Workload {
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "daemonsets";
    readonly minReadySeconds: number;
    constructor(scope: Construct, id: string, props?: DaemonSetProps);
    /**
     * @internal
     */
    _toKube(): k8s.DaemonSetSpec;
}
