import { ApiObject } from 'cdk8s';
import { Construct, IConstruct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import { Resource, ResourceProps } from './base.d.ts';
import * as role from './role.d.ts';
/**
 * Subject contains a reference to the object or user identities a role binding
 * applies to. This can either hold a direct API object reference, or a value
 * for non-objects such as user and group names.
 */
export interface SubjectConfiguration {
    /**
     * APIGroup holds the API group of the referenced subject. Defaults to "" for
     * ServiceAccount subjects. Defaults to "rbac.authorization.k8s.io" for User
     * and Group subjects.
     */
    readonly apiGroup?: string;
    /**
     * Kind of object being referenced. Values defined by this API group are
     * "User", "Group", and "ServiceAccount". If the Authorizer does not
     * recognized the kind value, the Authorizer should report an error.
     */
    readonly kind: string;
    /**
     * Name of the object being referenced.
     */
    readonly name: string;
    /**
     * Namespace of the referenced object.  If the object kind is non-namespace,
     * such as "User" or "Group", and this value is not empty the Authorizer
     * should report an error.
     */
    readonly namespace?: string;
}
/**
 * Represents an object that can be used as a role binding subject.
 */
export interface ISubject extends IConstruct {
    /**
     * Return the subject configuration.
     */
    toSubjectConfiguration(): SubjectConfiguration;
}
/**
 * Properties for `RoleBinding`.
 */
export interface RoleBindingProps extends ResourceProps {
    /**
     * The role to bind to. A RoleBinding can reference a Role or a ClusterRole.
     */
    readonly role: role.IRole;
}
/**
 * A RoleBinding grants permissions within a specific namespace to a user or
 * set of users.
 */
export declare class RoleBinding extends Resource {
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "rolebindings";
    readonly role: role.IRole;
    private readonly _subjects;
    constructor(scope: Construct, id: string, props: RoleBindingProps);
    /**
     * Adds a subject to the role.
     * @param subjects The subjects to add
     */
    addSubjects(...subjects: ISubject[]): void;
    get subjects(): ISubject[];
    private synthesizeRoleRef;
    private synthesizeSubjects;
}
/**
 * Properties for `ClusterRoleBinding`.
 */
export interface ClusterRoleBindingProps extends ResourceProps {
    /**
     * The role to bind to.
     */
    readonly role: role.IClusterRole;
}
/**
 * A ClusterRoleBinding grants permissions cluster-wide to a user or
 * set of users.
 */
export declare class ClusterRoleBinding extends Resource {
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "clusterrolebindings";
    readonly role: role.IClusterRole;
    private readonly _subjects;
    constructor(scope: Construct, id: string, props: ClusterRoleBindingProps);
    /**
     * Adds a subject to the role.
     * @param subjects The subjects to add
     */
    addSubjects(...subjects: ISubject[]): void;
    get subjects(): ISubject[];
    private synthesizeRoleRef;
    private synthesizeSubjects;
}
/**
 * Represents a user.
 */
export declare class User extends Construct implements ISubject {
    /**
     * Reference a user in the cluster by name.
     */
    static fromName(scope: Construct, id: string, name: string): User;
    readonly apiGroup: string | undefined;
    readonly kind: string;
    readonly name: string;
    private constructor();
    /**
     * @see ISubect.toSubjectConfiguration()
     */
    toSubjectConfiguration(): SubjectConfiguration;
}
/**
 * Represents a group.
 */
export declare class Group extends Construct implements ISubject {
    /**
     * Reference a group by name.
     */
    static fromName(scope: Construct, id: string, name: string): Group;
    readonly apiGroup: string | undefined;
    readonly kind: string;
    readonly name: string;
    private constructor();
    /**
     * @see ISubect.toSubjectConfiguration()
     */
    toSubjectConfiguration(): SubjectConfiguration;
}
