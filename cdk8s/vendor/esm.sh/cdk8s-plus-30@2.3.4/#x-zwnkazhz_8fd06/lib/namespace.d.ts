import { ApiObject } from 'cdk8s';
import { Construct, IConstruct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as base from './base.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as networkpolicy from './network-policy.d.ts';
import * as pod from './pod.d.ts';
/**
 * Configuration for selecting namespaces.
 */
export interface NamespaceSelectorConfig {
    /**
     * A selector to select namespaces by labels.
     */
    readonly labelSelector?: pod.LabelSelector;
    /**
     * A list of names to select namespaces by names.
     */
    readonly names?: string[];
}
/**
 * Represents an object that can select namespaces.
 */
export interface INamespaceSelector extends IConstruct {
    /**
     * Return the configuration of this selector.
     */
    toNamespaceSelectorConfig(): NamespaceSelectorConfig;
}
/**
 * Properties for `Namespace`.
 */
export interface NamespaceProps extends base.ResourceProps {
}
/**
 * In Kubernetes, namespaces provides a mechanism for isolating groups of resources within a single cluster.
 * Names of resources need to be unique within a namespace, but not across namespaces.
 * Namespace-based scoping is applicable only for namespaced objects (e.g. Deployments, Services, etc) and
 * not for cluster-wide objects (e.g. StorageClass, Nodes, PersistentVolumes, etc).
 */
export declare class Namespace extends base.Resource implements INamespaceSelector, networkpolicy.INetworkPolicyPeer {
    /**
     * @see https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/#automatic-labelling
     */
    static readonly NAME_LABEL = "kubernetes.io/metadata.name";
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType: string;
    private readonly _pods;
    constructor(scope: Construct, id: string, props?: NamespaceProps);
    /**
     * @see INamespaceSelector.toNamespaceSelectorConfig()
     */
    toNamespaceSelectorConfig(): NamespaceSelectorConfig;
    /**
     * @see INetworkPolicyPeer.toNetworkPolicyPeerConfig()
     */
    toNetworkPolicyPeerConfig(): networkpolicy.NetworkPolicyPeerConfig;
    /**
     * @see INetworkPolicyPeer.toPodSelector()
     */
    toPodSelector(): pod.IPodSelector | undefined;
    /**
     * @internal
     */
    _toKube(): k8s.NamespaceSpec;
}
/**
 * Options for `Namespaces.select`.
 */
export interface NamespacesSelectOptions {
    /**
     * Labels the namespaces must have.
     * This is equivalent to using an 'Is' selector.
     *
     * @default - no strict labels requirements.
     */
    readonly labels?: {
        [key: string]: string;
    };
    /**
     * Namespaces must satisfy these selectors.
     * The selectors query labels, just like the `labels` property, but they
     * provide a more advanced matching mechanism.
     *
     * @default - no selector requirements.
     */
    readonly expressions?: pod.LabelExpression[];
    /**
     * Namespaces names must be one of these.
     *
     * @default - no name requirements.
     */
    readonly names?: string[];
}
/**
 * Represents a group of namespaces.
 */
export declare class Namespaces extends Construct implements INamespaceSelector, networkpolicy.INetworkPolicyPeer {
    private readonly expressions?;
    private readonly names?;
    private readonly labels?;
    /**
     * Select specific namespaces.
     */
    static select(scope: Construct, id: string, options: NamespacesSelectOptions): Namespaces;
    /**
     * Select all namespaces.
     */
    static all(scope: Construct, id: string): Namespaces;
    private readonly _pods;
    constructor(scope: Construct, id: string, expressions?: pod.LabelExpression[] | undefined, names?: string[] | undefined, labels?: {
        [key: string]: string;
    } | undefined);
    /**
     * @see INamespaceSelector.toNamespaceSelectorConfig()
     */
    toNamespaceSelectorConfig(): NamespaceSelectorConfig;
    /**
     * @see INetworkPolicyPeer.toNetworkPolicyPeerConfig()
     */
    toNetworkPolicyPeerConfig(): networkpolicy.NetworkPolicyPeerConfig;
    /**
     * @see INetworkPolicyPeer.toPodSelector()
     */
    toPodSelector(): pod.IPodSelector | undefined;
}
