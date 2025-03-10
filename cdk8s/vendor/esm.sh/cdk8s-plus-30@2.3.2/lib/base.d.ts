import { ApiObjectMetadata, ApiObject, ApiObjectMetadataDefinition } from 'https://esm.sh/cdk8s@2.69.48/lib/index.d.ts';
import { Construct, IConstruct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import { IApiResource, IApiEndpoint } from './api-resource.d.ts';
/**
 * Initialization properties for resources.
 */
export interface ResourceProps {
    /**
     * Metadata that all persisted resources must have, which includes all objects
     * users must create.
     */
    readonly metadata?: ApiObjectMetadata;
}
/**
 * Represents a resource.
 */
export interface IResource extends IConstruct, IApiResource {
    /**
     * The Kubernetes name of this resource.
     */
    readonly name: string;
    /**
     * The object's API version (e.g. "authorization.k8s.io/v1")
     */
    readonly apiVersion: string;
    /**
     * The object kind (e.g. "Deployment").
     */
    readonly kind: string;
}
/**
 * Base class for all Kubernetes objects in stdk8s. Represents a single
 * resource.
 */
export declare abstract class Resource extends Construct implements IResource, IApiResource, IApiEndpoint {
    /**
     * The underlying cdk8s API object.
     */
    protected abstract readonly apiObject: ApiObject;
    abstract readonly resourceType: string;
    readonly permissions: ResourcePermissions;
    constructor(scope: Construct, id: string);
    get metadata(): ApiObjectMetadataDefinition;
    /**
     * The name of this API object.
     */
    get name(): string;
    /**
     * The object's API version (e.g. "authorization.k8s.io/v1")
     */
    get apiVersion(): string;
    /**
     * The group portion of the API version (e.g. "authorization.k8s.io").
     */
    get apiGroup(): string;
    /**
     * The object kind (e.g. "Deployment").
     */
    get kind(): string;
    get resourceName(): string | undefined;
    asApiResource(): IApiResource | undefined;
    asNonApiResource(): string | undefined;
}
/**
 * Controls permissions for operations on resources.
 */
export declare class ResourcePermissions {
    protected readonly instance: Resource;
    constructor(instance: Resource);
    /**
     * Grants the list of subjects permissions to read this resource.
     */
    grantRead(...subjects: rb.ISubject[]): rb.RoleBinding;
    /**
     * Grants the list of subjects permissions to read and write this resource.
     */
    grantReadWrite(...subjects: rb.ISubject[]): rb.RoleBinding;
}
import * as rb from './role-binding.d.ts';
