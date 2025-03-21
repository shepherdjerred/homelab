import { ApiObject } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import { IApiResource, IApiEndpoint } from './api-resource.d.ts';
import * as base from './base.d.ts';
import * as rb from './role-binding.d.ts';
/**
 * A reference to any Role or ClusterRole.
 */
export interface IRole extends base.IResource {
}
/**
 * Properties for `Role`.
 */
export interface RoleProps extends base.ResourceProps {
    /**
     * A list of rules the role should allow.
     *
     * @default []
     */
    readonly rules?: RolePolicyRule[];
}
/**
 * Policy rule of a `Role.
 */
export interface RolePolicyRule {
    /**
     * Verbs to allow. (e.g ['get', 'watch'])
     */
    readonly verbs: string[];
    /**
     * Resources this rule applies to.
     */
    readonly resources: IApiResource[];
}
/**
 * Role is a namespaced, logical grouping of PolicyRules that can be referenced
 * as a unit by a RoleBinding.
 */
export declare class Role extends base.Resource implements IRole {
    /**
     * Imports a role from the cluster as a reference.
     */
    static fromRoleName(scope: Construct, id: string, name: string): IRole;
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "roles";
    private readonly _rules;
    constructor(scope: Construct, id: string, props?: RoleProps);
    /**
     * Rules associaated with this Role.
     * Returns a copy, use `allow` to add rules.
     */
    get rules(): RolePolicyRule[];
    /**
     * Add permission to perform a list of HTTP verbs on a collection of
     * resources.
     *
     * @param resources The resource(s) to apply to
     * @see https://kubernetes.io/docs/reference/access-authn-authz/authorization/#determine-the-request-verb
     */
    allow(verbs: string[], ...resources: IApiResource[]): void;
    /**
     * Add "create" permission for the resources.
     * @param resources The resource(s) to apply to
     */
    allowCreate(...resources: IApiResource[]): void;
    /**
     * Add "get" permission for the resources.
     * @param resources The resource(s) to apply to
     */
    allowGet(...resources: IApiResource[]): void;
    /**
     * Add "list" permission for the resources.
     * @param resources The resource(s) to apply to
     */
    allowList(...resources: IApiResource[]): void;
    /**
     * Add "watch" permission for the resources.
     * @param resources The resource(s) to apply to
     */
    allowWatch(...resources: IApiResource[]): void;
    /**
     * Add "update" permission for the resources.
     * @param resources The resource(s) to apply to
     */
    allowUpdate(...resources: IApiResource[]): void;
    /**
     * Add "patch" permission for the resources.
     * @param resources The resource(s) to apply to
     */
    allowPatch(...resources: IApiResource[]): void;
    /**
     * Add "delete" permission for the resources.
     * @param resources The resource(s) to apply to
     */
    allowDelete(...resources: IApiResource[]): void;
    /**
     * Add "deletecollection" permission for the resources.
     * @param resources The resource(s) to apply to
     */
    allowDeleteCollection(...resources: IApiResource[]): void;
    /**
     * Add "get", "list", and "watch" permissions for the resources.
     * @param resources The resource(s) to apply to
     */
    allowRead(...resources: IApiResource[]): void;
    /**
     * Add "get", "list", "watch", "create", "update", "patch", "delete", and
     * "deletecollection" permissions for the resources.
     *
     * @param resources The resource(s) to apply to
     */
    allowReadWrite(...resources: IApiResource[]): void;
    /**
     * Create a RoleBinding that binds the permissions in this Role
     * to a list of subjects, that will only apply this role's namespace.
     * @param subjects a list of subjects to bind to
     */
    bind(...subjects: rb.ISubject[]): rb.RoleBinding;
    private synthesizeRules;
}
/**
 * Represents a cluster-level role.
 */
export interface IClusterRole extends base.IResource {
}
/**
 * Properties for `ClusterRole`.
 */
export interface ClusterRoleProps extends base.ResourceProps {
    /**
      * A list of rules the role should allow.
      *
      * @default []
      */
    readonly rules?: ClusterRolePolicyRule[];
    /**
      * Specify labels that should be used to locate ClusterRoles, whose rules
      * will be automatically filled into this ClusterRole's rules.
      */
    readonly aggregationLabels?: {
        [key: string]: string;
    };
}
/**
 * Policy rule of a `ClusterRole.
 */
export interface ClusterRolePolicyRule {
    /**
     * Verbs to allow. (e.g ['get', 'watch'])
     */
    readonly verbs: string[];
    /**
     * Endpoints this rule applies to. Can be either api resources
     * or non api resources.
     */
    readonly endpoints: IApiEndpoint[];
}
/**
 * ClusterRole is a cluster level, logical grouping of PolicyRules that can be
 * referenced as a unit by a RoleBinding or ClusterRoleBinding.
 */
export declare class ClusterRole extends base.Resource implements IClusterRole, IRole {
    /**
     * Imports a role from the cluster as a reference.
     */
    static fromClusterRoleName(scope: Construct, id: string, name: string): IClusterRole;
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "clusterroles";
    private readonly _labelSelector;
    private readonly _rules;
    constructor(scope: Construct, id: string, props?: ClusterRoleProps);
    /**
     * Rules associaated with this Role.
     * Returns a copy, use `allow` to add rules.
     */
    get rules(): ClusterRolePolicyRule[];
    /**
     * Add permission to perform a list of HTTP verbs on a collection of
     * resources.
     *
     * @param endpoints The endpoints(s) to apply to
     * @see https://kubernetes.io/docs/reference/access-authn-authz/authorization/#determine-the-request-verb
     */
    allow(verbs: string[], ...endpoints: IApiEndpoint[]): void;
    /**
     * Add "create" permission for the resources.
     * @param endpoints The resource(s) to apply to
     */
    allowCreate(...endpoints: IApiEndpoint[]): void;
    /**
     * Add "get" permission for the resources.
     * @param endpoints The resource(s) to apply to
     */
    allowGet(...endpoints: IApiEndpoint[]): void;
    /**
     * Add "list" permission for the resources.
     * @param endpoints The resource(s) to apply to
     */
    allowList(...endpoints: IApiEndpoint[]): void;
    /**
     * Add "watch" permission for the resources.
     * @param endpoints The resource(s) to apply to
     */
    allowWatch(...endpoints: IApiEndpoint[]): void;
    /**
     * Add "update" permission for the resources.
     * @param endpoints The resource(s) to apply to
     */
    allowUpdate(...endpoints: IApiEndpoint[]): void;
    /**
     * Add "patch" permission for the resources.
     * @param endpoints The resource(s) to apply to
     */
    allowPatch(...endpoints: IApiEndpoint[]): void;
    /**
     * Add "delete" permission for the resources.
     * @param endpoints The resource(s) to apply to
     */
    allowDelete(...endpoints: IApiEndpoint[]): void;
    /**
     * Add "deletecollection" permission for the resources.
     * @param endpoints The resource(s) to apply to
     */
    allowDeleteCollection(...endpoints: IApiEndpoint[]): void;
    /**
     * Add "get", "list", and "watch" permissions for the resources.
     * @param endpoints The resource(s) to apply to
     */
    allowRead(...endpoints: IApiEndpoint[]): void;
    /**
     * Add "get", "list", "watch", "create", "update", "patch", "delete", and
     * "deletecollection" permissions for the resources.
     *
     * @param endpoints The resource(s) to apply to
     */
    allowReadWrite(...endpoints: IApiEndpoint[]): void;
    /**
     * Aggregate rules from roles matching this label selector.
     */
    aggregate(key: string, value: string): void;
    /**
     * Combines the rules of the argument ClusterRole into this ClusterRole
     * using aggregation labels.
     * @param rol
     */
    combine(rol: ClusterRole): void;
    /**
     * Create a RoleBinding that binds the permissions in this ClusterRole
     * to a list of subjects, that will only apply to the given namespace.
     * @param namespace the namespace to limit permissions to.
     * @param subjects a list of subjects to bind to
     */
    bindInNamespace(namespace: string, ...subjects: rb.ISubject[]): rb.RoleBinding;
    /**
     * Create a ClusterRoleBinding that binds the permissions in this
     * ClusterRole to a list of subjects, without namespace restrictions.
     * @param subjects a list of subjects to bind to
     */
    bind(...subjects: rb.ISubject[]): rb.ClusterRoleBinding;
    private synthesizeRules;
    private synthesizeAggregationRules;
}
