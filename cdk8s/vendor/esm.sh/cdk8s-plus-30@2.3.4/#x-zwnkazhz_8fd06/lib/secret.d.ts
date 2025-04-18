import { ApiObject } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as base from './base.d.ts';
import { EnvValue, EnvValueFromSecretOptions } from './container.d.ts';
import * as serviceaccount from './service-account.d.ts';
/**
 * Common properties for `Secret`.
 */
export interface CommonSecretProps extends base.ResourceProps {
    /**
     * If set to true, ensures that data stored in the Secret cannot be updated (only object metadata can be modified).
     * If not set to true, the field can be modified at any time.
     *
     * @default false
     */
    readonly immutable?: boolean;
}
/**
 * Options for `Secret`.
 */
export interface SecretProps extends CommonSecretProps {
    /**
     * stringData allows specifying non-binary secret data in string form. It is
     * provided as a write-only convenience method. All keys and values are merged
     * into the data field on write, overwriting any existing values. It is never
     * output when reading from the API.
     */
    readonly stringData?: {
        [key: string]: string;
    };
    /**
     * Optional type associated with the secret.  Used to facilitate programmatic
     * handling of secret data by various controllers.
     *
     * @default undefined - Don't set a type.
     */
    readonly type?: string;
}
export interface ISecret extends base.IResource {
    /**
     * Returns EnvValue object from a secret's key.
     * @param key Secret's key
     * @param options Additional EnvValue options
     */
    envValue(key: string, options?: EnvValueFromSecretOptions): EnvValue;
}
/**
 * Represents a specific value in JSON secret.
 */
export interface SecretValue {
    /**
     * The secret
     */
    readonly secret: ISecret;
    /**
     * The JSON key
     */
    readonly key: string;
}
/**
 * Kubernetes Secrets let you store and manage sensitive information, such as
 * passwords, OAuth tokens, and ssh keys. Storing confidential information in a
 * Secret is safer and more flexible than putting it verbatim in a Pod
 * definition or in a container image.
 *
 * @see https://kubernetes.io/docs/concepts/configuration/secret
 */
export declare class Secret extends base.Resource implements ISecret {
    /**
     * Imports a secret from the cluster as a reference.
     */
    static fromSecretName(scope: Construct, id: string, name: string): ISecret;
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "secrets";
    /**
     * Whether or not the secret is immutable.
     */
    readonly immutable: boolean;
    private readonly stringData;
    constructor(scope: Construct, id: string, props?: SecretProps);
    /**
     * Adds a string data field to the secret.
     * @param key Key
     * @param value Value
     */
    addStringData(key: string, value: string): void;
    /**
     * Gets a string data by key or undefined
     * @param key Key
     */
    getStringData(key: string): string | undefined;
    envValue(key: string, options?: EnvValueFromSecretOptions): EnvValue;
}
/**
 * Options for `BasicAuthSecret`.
 */
export interface BasicAuthSecretProps extends CommonSecretProps {
    /**
     * The user name for authentication
     */
    readonly username: string;
    /**
     * The password or token for authentication
     */
    readonly password: string;
}
/**
 * Create a secret for basic authentication.
 *
 * @see https://kubernetes.io/docs/concepts/configuration/secret/#basic-authentication-secret
 */
export declare class BasicAuthSecret extends Secret {
    constructor(scope: Construct, id: string, props: BasicAuthSecretProps);
}
/**
 * Options for `SshAuthSecret`.
 */
export interface SshAuthSecretProps extends CommonSecretProps {
    /**
     * The SSH private key to use
     */
    readonly sshPrivateKey: string;
}
/**
 * Create a secret for ssh authentication.
 *
 * @see https://kubernetes.io/docs/concepts/configuration/secret/#ssh-authentication-secrets
 */
export declare class SshAuthSecret extends Secret {
    constructor(scope: Construct, id: string, props: SshAuthSecretProps);
}
/**
 * Options for `ServiceAccountTokenSecret`.
 */
export interface ServiceAccountTokenSecretProps extends CommonSecretProps {
    /**
     * The service account to store a secret for
     */
    readonly serviceAccount: serviceaccount.IServiceAccount;
}
/**
 * Create a secret for a service account token.
 *
 * @see https://kubernetes.io/docs/concepts/configuration/secret/#service-account-token-secrets
 */
export declare class ServiceAccountTokenSecret extends Secret {
    constructor(scope: Construct, id: string, props: ServiceAccountTokenSecretProps);
}
/**
 * Options for `TlsSecret`.
 */
export interface TlsSecretProps extends CommonSecretProps {
    /**
     * The TLS cert
     */
    readonly tlsCert: string;
    /**
     * The TLS key
     */
    readonly tlsKey: string;
}
/**
 * Create a secret for storing a TLS certificate and its associated key.
 *
 * @see https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets
 */
export declare class TlsSecret extends Secret {
    constructor(scope: Construct, id: string, props: TlsSecretProps);
}
/**
 * Options for `DockerConfigSecret`.
 */
export interface DockerConfigSecretProps extends CommonSecretProps {
    /**
     * JSON content to provide for the `~/.docker/config.json` file. This will
     * be stringified and inserted as stringData.
     *
     * @see https://docs.docker.com/engine/reference/commandline/cli/#sample-configuration-file
     */
    readonly data: {
        [key: string]: any;
    };
}
/**
 * Create a secret for storing credentials for accessing a container image
 * registry.
 *
 * @see https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets
 */
export declare class DockerConfigSecret extends Secret {
    constructor(scope: Construct, id: string, props: DockerConfigSecretProps);
}
