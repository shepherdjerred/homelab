import { ApiObject } from 'cdk8s';
import { Construct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as base from './base.d.ts';
import * as container from './container.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as ingress from './ingress.d.ts';
import * as pod from './pod.d.ts';
/**
 * Properties for `Service`.
 */
export interface ServiceProps extends base.ResourceProps {
    /**
     * Which pods should the service select and route to.
     *
     * You can pass one of the following:
     *
     * - An instance of `Pod` or any workload resource (e.g `Deployment`, `StatefulSet`, ...)
     * - Pods selected by the `Pods.select` function. Note that in this case only labels can be specified.
     *
     * @default - unset, the service is assumed to have an external process managing
     * its endpoints, which Kubernetes will not modify.
     *
     * @example
     *
     * // select the pods of a specific deployment
     * const backend = new kplus.Deployment(this, 'Backend', ...);
     * new kplus.Service(this, 'Service', { selector: backend });
     *
     * // select all pods labeled with the `tier=backend` label
     * const backend = kplus.Pod.labeled({ tier: 'backend' });
     * new kplus.Service(this, 'Service', { selector: backend });
     */
    readonly selector?: pod.IPodSelector;
    /**
     * The IP address of the service and is usually assigned randomly by the
     * master. If an address is specified manually and is not in use by others, it
     * will be allocated to the service; otherwise, creation of the service will
     * fail. This field can not be changed through updates. Valid values are
     * "None", empty string (""), or a valid IP address. "None" can be specified
     * for headless services when proxying is not required. Only applies to types
     * ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName.
     *
     * @see https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
     * @default - Automatically assigned.
     *
     */
    readonly clusterIP?: string;
    /**
     * A list of IP addresses for which nodes in the cluster will also accept
     * traffic for this service. These IPs are not managed by Kubernetes. The user
     * is responsible for ensuring that traffic arrives at a node with this IP. A
     * common example is external load-balancers that are not part of the
     * Kubernetes system.
     *
     * @default - No external IPs.
     */
    readonly externalIPs?: string[];
    /**
     * Determines how the Service is exposed.
     *
     * More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
     *
     * @default ServiceType.ClusterIP
     */
    readonly type?: ServiceType;
    /**
     * The ports this service binds to.
     *
     * If the selector of the service is a managed pod / workload,
     * its ports will are automatically extracted and used as the default value.
     * Otherwise, no ports are bound.
     *
     * @default - either the selector ports, or none.
     */
    readonly ports?: ServicePort[];
    /**
     * The externalName to be used when ServiceType.EXTERNAL_NAME is set
     *
     * @default - No external name.
     */
    readonly externalName?: string;
    /**
     * A list of CIDR IP addresses, if specified and supported by the platform,
     * will restrict traffic through the cloud-provider load-balancer to the specified client IPs.
     *
     * More info: https://kubernetes.io/docs/tasks/access-application-cluster/configure-cloud-provider-firewall/
     */
    readonly loadBalancerSourceRanges?: string[];
    /**
     * The publishNotReadyAddresses indicates that any agent which deals with endpoints for this Service
     * should disregard any indications of ready/not-ready
     *
     * More info: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.30/#servicespec-v1-core
     *
     * @default - false
     */
    readonly publishNotReadyAddresses?: boolean;
}
/**
 * Options for exposing a service using an ingress.
 */
export interface ExposeServiceViaIngressOptions {
    /**
     * The type of the path
     *
     * @default HttpIngressPathType.PREFIX
     */
    readonly pathType?: ingress.HttpIngressPathType;
    /**
     * The ingress to add rules to.
     *
     * @default - An ingress will be automatically created.
     */
    readonly ingress?: ingress.Ingress;
}
/**
 * For some parts of your application (for example, frontends) you may want to expose a Service onto an
 * external IP address, that's outside of your cluster.
 * Kubernetes ServiceTypes allow you to specify what kind of Service you want.
 * The default is ClusterIP.
 */
export declare enum ServiceType {
    /**
     * Exposes the Service on a cluster-internal IP.
     * Choosing this value makes the Service only reachable from within the cluster.
     * This is the default ServiceType
     */
    CLUSTER_IP = "ClusterIP",
    /**
     * Exposes the Service on each Node's IP at a static port (the NodePort).
     * A ClusterIP Service, to which the NodePort Service routes, is automatically created.
     * You'll be able to contact the NodePort Service, from outside the cluster,
     * by requesting <NodeIP>:<NodePort>.
     */
    NODE_PORT = "NodePort",
    /**
     * Exposes the Service externally using a cloud provider's load balancer.
     * NodePort and ClusterIP Services, to which the external load balancer routes,
     * are automatically created.
     */
    LOAD_BALANCER = "LoadBalancer",
    /**
     * Maps the Service to the contents of the externalName field (e.g. foo.bar.example.com), by returning a CNAME record with its value.
     * No proxying of any kind is set up.
     *
     * > Note: You need either kube-dns version 1.7 or CoreDNS version 0.0.8 or higher to use the ExternalName type.
     */
    EXTERNAL_NAME = "ExternalName"
}
/**
 * Options to add a deployment to a service.
 */
export interface AddDeploymentOptions extends ServiceBindOptions {
    /**
     * The port number the service will bind to.
     *
     * @default - Copied from the first container of the deployment.
     */
    readonly port?: number;
}
/**
 * An abstract way to expose an application running on a set of Pods as a network service.
 * With Kubernetes you don't need to modify your application to use an unfamiliar service discovery mechanism.
 * Kubernetes gives Pods their own IP addresses and a single DNS name for a set of Pods, and can load-balance across them.
 *
 * For example, consider a stateless image-processing backend which is running with 3 replicas. Those replicas are fungible—frontends do not care which backend they use.
 * While the actual Pods that compose the backend set may change, the frontend clients should not need to be aware of that,
 * nor should they need to keep track of the set of backends themselves.
 * The Service abstraction enables this decoupling.
 *
 * If you're able to use Kubernetes APIs for service discovery in your application, you can query the API server for Endpoints,
 * that get updated whenever the set of Pods in a Service changes. For non-native applications, Kubernetes offers ways to place a network port
 * or load balancer in between your application and the backend Pods.
 */
export declare class Service extends base.Resource {
    /**
     * The IP address of the service and is usually assigned randomly by the
     * master.
     */
    readonly clusterIP?: string;
    /**
     * Determines how the Service is exposed.
     */
    readonly type: ServiceType;
    /**
     * The externalName to be used for EXTERNAL_NAME types
     */
    readonly externalName?: string;
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType = "services";
    private readonly _externalIPs;
    private readonly _selector;
    private readonly _ports;
    private readonly _loadBalancerSourceRanges?;
    private readonly _publishNotReadyAddresses?;
    constructor(scope: Construct, id: string, props?: ServiceProps);
    /**
     * Expose a service via an ingress using the specified path.
     *
     * @param path The path to expose the service under.
     * @param options Additional options.
     *
     * @returns The `Ingress` resource that was used.
     */
    exposeViaIngress(path: string, options?: ExposeServiceViaIngressOptions): ingress.Ingress;
    /**
     * Ports for this service.
     *
     * Use `bind()` to bind additional service ports.
     */
    get ports(): ServicePort[];
    /**
     * Return the first port of the service.
     */
    get port(): number;
    /**
     * Configure a port the service will bind to.
     * This method can be called multiple times.
     *
     * @param port The port definition.
     */
    bind(port: number, options?: ServiceBindOptions): void;
    /**
     * Require this service to select pods matching the selector.
     *
     * Note that invoking this method multiple times acts as an AND operator
     * on the resulting labels.
     */
    select(selector: pod.IPodSelector): void;
    /**
     * Require this service to select pods with this label.
     *
     * Note that invoking this method multiple times acts as an AND operator
     * on the resulting labels.
     */
    selectLabel(key: string, value: string): void;
    /**
     * @internal
     */
    _toKube(): k8s.ServiceSpec;
}
/**
 * Options for `Service.bind`.
 */
export interface ServiceBindOptions {
    /**
     * The name of this port within the service. This must be a DNS_LABEL. All
     * ports within a ServiceSpec must have unique names. This maps to the 'Name'
     * field in EndpointPort objects. Optional if only one ServicePort is defined
     * on this service.
     */
    readonly name?: string;
    /**
     * The port on each node on which this service is exposed when type=NodePort
     * or LoadBalancer. Usually assigned by the system. If specified, it will be
     * allocated to the service if unused or else creation of the service will
     * fail. Default is to auto-allocate a port if the ServiceType of this Service
     * requires one.
     *
     * @see https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
     *
     * @default - auto-allocate a port if the ServiceType of this Service requires one.
     */
    readonly nodePort?: number;
    /**
     * The IP protocol for this port. Supports "TCP", "UDP", and "SCTP". Default is TCP.
     *
     * @default Protocol.TCP
     */
    readonly protocol?: container.Protocol;
    /**
     * The port number the service will redirect to.
     *
     * @default - The value of `port` will be used.
     */
    readonly targetPort?: number;
}
/**
 * Definition of a service port.
 */
export interface ServicePort extends ServiceBindOptions {
    /**
     * The port number the service will bind to.
     */
    readonly port: number;
}
