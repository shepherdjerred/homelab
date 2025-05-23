import { ApiObject } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as base from './base.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as secret from './secret.d.ts';
import * as service from './service.d.ts';
/**
 * Properties for `Ingress`.
 */
export interface IngressProps extends base.ResourceProps {
    /**
     * The default backend services requests that do not match any rule.
     *
     * Using this option or the `addDefaultBackend()` method is equivalent to
     * adding a rule with both `path` and `host` undefined.
     */
    readonly defaultBackend?: IngressBackend;
    /**
     * Routing rules for this ingress.
     *
     * Each rule must define an `IngressBackend` that will receive the requests
     * that match this rule. If both `host` and `path` are not specifiec, this
     * backend will be used as the default backend of the ingress.
     *
     * You can also add rules later using `addRule()`, `addHostRule()`,
     * `addDefaultBackend()` and `addHostDefaultBackend()`.
     */
    readonly rules?: IngressRule[];
    /**
     * TLS settings for this ingress.
     *
     * Using this option tells the ingress controller to expose a TLS endpoint.
     * Currently the Ingress only supports a single TLS port, 443. If multiple
     * members of this list specify different hosts, they will be multiplexed on
     * the same port according to the hostname specified through the SNI TLS
     * extension, if the ingress controller fulfilling the ingress supports SNI.
     */
    readonly tls?: IngressTls[];
    /**
     * Class Name for this ingress.
     *
     * This field is a reference to an IngressClass resource that contains
     * additional Ingress configuration, including the name of the Ingress controller.
     */
    readonly className?: string;
}
/**
 * Specify how the path is matched against request paths.
 *
 * @see https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types
 */
export declare enum HttpIngressPathType {
    /**
     * Matches the URL path exactly.
     */
    PREFIX = "Prefix",
    /**
     * Matches based on a URL path prefix split by '/'.
     */
    EXACT = "Exact",
    /**
     * Matching is specified by the underlying IngressClass.
     */
    IMPLEMENTATION_SPECIFIC = "ImplementationSpecific"
}
/**
 * Ingress is a collection of rules that allow inbound connections to reach the
 * endpoints defined by a backend. An Ingress can be configured to give services
 * externally-reachable urls, load balance traffic, terminate SSL, offer name
 * based virtual hosting etc.
 */
export declare class Ingress extends base.Resource {
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "ingresses";
    private readonly _rulesPerHost;
    private _defaultBackend?;
    private readonly _tlsConfig;
    constructor(scope: Construct, id: string, props?: IngressProps);
    private _validate;
    /**
     * Defines the default backend for this ingress. A default backend capable of
     * servicing requests that don't match any rule.
     *
     * @param backend The backend to use for requests that do not match any rule.
     */
    addDefaultBackend(backend: IngressBackend): void;
    /**
     * Specify a default backend for a specific host name. This backend will be used as a catch-all for requests
     * targeted to this host name (the `Host` header matches this value).
     *
     * @param host The host name to match
     * @param backend The backend to route to
     */
    addHostDefaultBackend(host: string, backend: IngressBackend): void;
    /**
     * Adds an ingress rule applied to requests to a specific host and a specific
     * HTTP path (the `Host` header matches this value).
     *
     * @param host The host name
     * @param path The HTTP path
     * @param backend The backend to route requests to
     * @param pathType How the path is matched against request paths
     */
    addHostRule(host: string, path: string, backend: IngressBackend, pathType?: HttpIngressPathType): void;
    /**
     * Adds an ingress rule applied to requests sent to a specific HTTP path.
     *
     * @param path The HTTP path
     * @param backend The backend to route requests to
     * @param pathType How the path is matched against request paths
     */
    addRule(path: string, backend: IngressBackend, pathType?: HttpIngressPathType): void;
    /**
     * Adds rules to this ingress.
     * @param rules The rules to add
     */
    addRules(...rules: IngressRule[]): void;
    private synthRules;
    addTls(tls: IngressTls[]): void;
    private tlsConfig;
}
/**
 * Options for setting up backends for ingress rules.
 */
export interface ServiceIngressBackendOptions {
    /**
     * The port to use to access the service.
     *
     * - This option will fail if the service does not expose any ports.
     * - If the service exposes multiple ports, this option must be specified.
     * - If the service exposes a single port, this option is optional and if
     *   specified, it must be the same port exposed by the service.
     *
     * @default - if the service exposes a single port, this port will be used.
     */
    readonly port?: number;
}
/**
 * The backend for an ingress path.
 */
export declare class IngressBackend {
    private readonly backend;
    /**
     * A Kubernetes `Service` to use as the backend for this path.
     * @param serv The service object.
     */
    static fromService(serv: service.Service, options?: ServiceIngressBackendOptions): IngressBackend;
    /**
     * A Resource backend is an ObjectRef to another Kubernetes resource
     * within the same namespace as the Ingress object.
     * A common usage for a Resource backend is to ingress data to an object
     * storage backend with static assets.
     */
    static fromResource(resource: base.IResource): IngressBackend;
    private constructor();
    /**
     * @internal
     */
    _toKube(): k8s.IngressBackend;
}
/**
 * Represents the rules mapping the paths under a specified host to the related
 * backend services. Incoming requests are first evaluated for a host match,
 * then routed to the backend associated with the matching path.
 */
export interface IngressRule {
    /**
     * Backend defines the referenced service endpoint to which the traffic will
     * be forwarded to.
     */
    readonly backend: IngressBackend;
    /**
     * Host is the fully qualified domain name of a network host, as defined by
     * RFC 3986. Note the following deviations from the "host" part of the URI as
     * defined in the RFC: 1. IPs are not allowed. Currently an IngressRuleValue
     * can only apply to the IP in the Spec of the parent Ingress. 2. The `:`
     * delimiter is not respected because ports are not allowed. Currently the
     * port of an Ingress is implicitly :80 for http and :443 for https. Both
     * these may change in the future. Incoming requests are matched against the
     * host before the IngressRuleValue.
     *
     * @default - If the host is unspecified, the Ingress routes all traffic based
     * on the specified IngressRuleValue.
     */
    readonly host?: string;
    /**
     * Path is an extended POSIX regex as defined by IEEE Std 1003.1, (i.e this
     * follows the egrep/unix syntax, not the perl syntax) matched against the
     * path of an incoming request. Currently it can contain characters disallowed
     * from the conventional "path" part of a URL as defined by RFC 3986. Paths
     * must begin with a '/'.
     *
     * @default - If unspecified, the path defaults to a catch all sending traffic
     * to the backend.
     */
    readonly path?: string;
    /**
     * Specify how the path is matched against request paths. By default, path
     * types will be matched by prefix.
     *
     * @see https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types
     */
    readonly pathType?: HttpIngressPathType;
}
/**
 * Represents the TLS configuration mapping that is passed to the ingress
 * controller for SSL termination.
 */
export interface IngressTls {
    /**
     * Hosts are a list of hosts included in the TLS certificate. The values in
     * this list must match the name/s used in the TLS Secret.
     *
     * @default - If unspecified, it defaults to the wildcard host setting for
     * the loadbalancer controller fulfilling this Ingress.
     */
    readonly hosts?: string[];
    /**
     * Secret is the secret that contains the certificate and key used to
     * terminate SSL traffic on 443. If the SNI host in a listener conflicts with
     * the "Host" header field used by an IngressRule, the SNI host is used for
     * termination and value of the Host header is used for routing.
     *
     * @default - If unspecified, it allows SSL routing based on SNI hostname.
     */
    readonly secret?: secret.ISecret;
}
