import { ApiObject } from 'https://esm.sh/cdk8s@2.69.48/lib/index.d.ts';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as base from './base.d.ts';
import * as rb from './role-binding.d.ts';
import * as secret from './secret.d.ts';
export interface IServiceAccount extends base.IResource, rb.ISubject {
}
/**
 * Properties for initialization of `ServiceAccount`.
 */
export interface ServiceAccountProps extends base.ResourceProps {
    /**
     * List of secrets allowed to be used by pods running using this
     * ServiceAccount.
     *
     * @see https://kubernetes.io/docs/concepts/configuration/secret
     */
    readonly secrets?: secret.ISecret[];
    /**
     * Indicates whether pods running as this service account
     * should have an API token automatically mounted. Can be overridden at the pod level.
     *
     * @default false
     * @see https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#use-the-default-service-account-to-access-the-api-server
     */
    readonly automountToken?: boolean;
}
export interface FromServiceAccountNameOptions {
    /**
     * The name of the namespace the service account belongs to.
     *
     * @default "default"
     */
    readonly namespaceName?: string;
}
/**
 * A service account provides an identity for processes that run in a Pod.
 *
 * When you (a human) access the cluster (for example, using kubectl), you are
 * authenticated by the apiserver as a particular User Account (currently this
 * is usually admin, unless your cluster administrator has customized your
 * cluster). Processes in containers inside pods can also contact the apiserver.
 * When they do, they are authenticated as a particular Service Account (for
 * example, default).
 *
 * @see https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account
 */
export declare class ServiceAccount extends base.Resource implements IServiceAccount, rb.ISubject {
    /**
     * Imports a service account from the cluster as a reference.
     * @param name The name of the service account resource.
     * @param options additional options.
     */
    static fromServiceAccountName(scope: Construct, id: string, name: string, options?: FromServiceAccountNameOptions): IServiceAccount;
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "serviceaccounts";
    private readonly _secrets;
    /**
     * Whether or not a token is automatically mounted for this
     * service account.
     */
    readonly automountToken: boolean;
    constructor(scope: Construct, id: string, props?: ServiceAccountProps);
    /**
     * Allow a secret to be accessed by pods using this service account.
     * @param secr The secret
     */
    addSecret(secr: secret.ISecret): void;
    /**
     * List of secrets allowed to be used by pods running using this service
     * account.
     *
     * Returns a copy. To add a secret, use `addSecret()`.
     */
    get secrets(): secret.ISecret[];
    /**
     * @see ISubect.toSubjectConfiguration()
     */
    toSubjectConfiguration(): rb.SubjectConfiguration;
}
