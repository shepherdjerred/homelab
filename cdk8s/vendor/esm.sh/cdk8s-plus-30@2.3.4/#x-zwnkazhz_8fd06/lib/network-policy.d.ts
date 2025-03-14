import { ApiObject } from 'cdk8s';
import { Construct, IConstruct } from 'https://esm.sh/constructs@10.4.2/lib/index.d.ts';
import * as base from './base.d.ts';
import * as k8s from './imports/k8s.d.ts';
import * as pod from './pod.d.ts';
/**
 * Properties for `NetworkPolicyPort`.
 */
export interface NetworkPolicyPortProps {
    /**
     * Specific port number.
     *
     * @default - all ports are allowed.
     */
    readonly port?: number;
    /**
     * End port (relative to `port`). Only applies if `port` is defined.
     * Use this to specify a port range, rather that a specific one.
     *
     * @default - not a port range.
     */
    readonly endPort?: number;
    /**
     * Protocol.
     *
     * @default NetworkProtocol.TCP
     */
    readonly protocol?: NetworkProtocol;
}
/**
 * Describes a port to allow traffic on.
 */
export declare class NetworkPolicyPort {
    private readonly port?;
    private readonly endPort?;
    private readonly protocol?;
    /**
     * Distinct TCP ports
     */
    static tcp(port: number): NetworkPolicyPort;
    /**
     * A TCP port range
     */
    static tcpRange(startPort: number, endPort: number): NetworkPolicyPort;
    /**
     * Any TCP traffic
     */
    static allTcp(): NetworkPolicyPort;
    /**
     * Distinct UDP ports
     */
    static udp(port: number): NetworkPolicyPort;
    /**
     * A UDP port range
     */
    static udpRange(startPort: number, endPort: number): NetworkPolicyPort;
    /**
     * Any UDP traffic
     */
    static allUdp(): NetworkPolicyPort;
    /**
     * Custom port configuration.
     */
    static of(props: NetworkPolicyPortProps): NetworkPolicyPort;
    private constructor();
    /**
     * @internal
     */
    _toKube(): k8s.NetworkPolicyPort;
}
/**
 * Configuration for network peers.
 * A peer can either by an ip block, or a selection of pods, not both.
 */
export interface NetworkPolicyPeerConfig {
    /**
     * The ip block this peer represents.
     */
    readonly ipBlock?: NetworkPolicyIpBlock;
    /**
     * The pod selector this peer represents.
     */
    readonly podSelector?: pod.PodSelectorConfig;
}
/**
 * Describes a peer to allow traffic to/from.
 */
export interface INetworkPolicyPeer extends IConstruct {
    /**
     * Return the configuration of this peer.
     */
    toNetworkPolicyPeerConfig(): NetworkPolicyPeerConfig;
    /**
     * Convert the peer into a pod selector, if possible.
     */
    toPodSelector(): pod.IPodSelector | undefined;
}
/**
 * Describes a rule allowing traffic from / to pods matched by a network policy selector.
 */
export interface NetworkPolicyRule {
    /**
     * The ports of the rule.
     *
     * @default - traffic is allowed on all ports.
     */
    readonly ports?: NetworkPolicyPort[];
    /**
     * Peer this rule interacts with.
     */
    readonly peer: INetworkPolicyPeer;
}
/**
 * Describes a particular CIDR (Ex. "192.168.1.1/24","2001:db9::/64") that is
 * allowed to the pods matched by a network policy selector.
 * The except entry describes CIDRs that should not be included within this rule.
 */
export declare class NetworkPolicyIpBlock extends Construct implements INetworkPolicyPeer {
    /**
     * A string representing the IP Block Valid examples are "192.168.1.1/24" or "2001:db9::/64".
     */
    readonly cidr: string;
    /**
     * A slice of CIDRs that should not be included within an IP Block Valid examples are "192.168.1.1/24" or "2001:db9::/64".
     * Except values will be rejected if they are outside the CIDR range.
     */
    readonly except?: string[] | undefined;
    /**
     * Create an IPv4 peer from a CIDR
     */
    static ipv4(scope: Construct, id: string, cidrIp: string, except?: string[]): NetworkPolicyIpBlock;
    /**
     * Any IPv4 address
     */
    static anyIpv4(scope: Construct, id: string): NetworkPolicyIpBlock;
    /**
     * Create an IPv6 peer from a CIDR
     */
    static ipv6(scope: Construct, id: string, cidrIp: string, except?: string[]): NetworkPolicyIpBlock;
    /**
     * Any IPv6 address
     */
    static anyIpv6(scope: Construct, id: string): NetworkPolicyIpBlock;
    private constructor();
    /**
     * @see INetworkPolicyPeer.toNetworkPolicyPeerConfig()
     */
    toNetworkPolicyPeerConfig(): NetworkPolicyPeerConfig;
    /**
     * @see INetworkPolicyPeer.toPodSelector()
     */
    toPodSelector(): pod.IPodSelector | undefined;
    /**
     * @internal
     */
    _toKube(): k8s.IpBlock;
}
/**
 * Network protocols.
 */
export declare enum NetworkProtocol {
    /**
     * TCP.
     */
    TCP = "TCP",
    /**
     * UDP.
     */
    UDP = "UDP",
    /**
     * SCTP.
     */
    SCTP = "SCTP"
}
/**
 * Default behaviors of network traffic in policies.
 */
export declare enum NetworkPolicyTrafficDefault {
    /**
     * The policy denies all traffic.
     * Since rules are additive, additional rules or policies can allow
     * specific traffic.
     */
    DENY = "DENY",
    /**
     * The policy allows all traffic (either ingress or egress).
     * Since rules are additive, no additional rule or policies can
     * subsequently deny the traffic.
     */
    ALLOW = "ALLOW"
}
/**
 * Describes how the network policy should configure egress / ingress traffic.
 */
export interface NetworkPolicyTraffic {
    /**
     * Specifies the default behavior of the policy when
     * no rules are defined.
     *
     * @default - unset, the policy does not change the behavior.
     */
    readonly default?: NetworkPolicyTrafficDefault;
    /**
     * List of rules to be applied to the selected pods.
     * If empty, the behavior of the policy is dictated by the `default` property.
     *
     * @default - no rules
     */
    readonly rules?: NetworkPolicyRule[];
}
/**
 * Options for `NetworkPolicy.addEgressRule`.
 */
export interface NetworkPolicyAddEgressRuleOptions {
    /**
     * Ports the rule should allow outgoing traffic to.
     *
     * @default - If the peer is a managed pod, take its ports. Otherwise, all ports are allowed.
     */
    readonly ports?: NetworkPolicyPort[];
}
/**
 * Properties for `NetworkPolicy`.
 */
export interface NetworkPolicyProps extends base.ResourceProps {
    /**
     * Which pods does this policy object applies to.
     *
     * This can either be a single pod / workload, or a grouping of pods selected
     * via the `Pods.select` function. Rules is applied to any pods selected by this property.
     * Multiple network policies can select the same set of pods.
     * In this case, the rules for each are combined additively.
     *
     * Note that
     *
     * @default - will select all pods in the namespace of the policy.
     */
    readonly selector?: pod.IPodSelector;
    /**
     * Egress traffic configuration.
     *
     * @default - the policy doesn't change egress behavior of the pods it selects.
     */
    readonly egress?: NetworkPolicyTraffic;
    /**
     * Ingress traffic configuration.
     *
     * @default - the policy doesn't change ingress behavior of the pods it selects.
     */
    readonly ingress?: NetworkPolicyTraffic;
}
/**
 * Control traffic flow at the IP address or port level (OSI layer 3 or 4),
 * network policies are an application-centric construct which allow you
 * to specify how a pod is allowed to communicate with various network peers.
 *
 * - Outgoing traffic is allowed if there are no network policies selecting
 *   the pod (and cluster policy otherwise allows the traffic),
 *   OR if the traffic matches at least one egress rule across all of the
 *   network policies that select the pod.
 *
 * - Incoming traffic is allowed to a pod if there are no network policies
 *   selecting the pod (and cluster policy otherwise allows the traffic),
 *   OR if the traffic source is the pod's local node,
 *   OR if the traffic matches at least one ingress rule across all of
 *   the network policies that select the pod.
 *
 * Network policies do not conflict; they are additive.
 * If any policy or policies apply to a given pod for a given
 * direction, the connections allowed in that direction from
 * that pod is the union of what the applicable policies allow.
 * Thus, order of evaluation does not affect the policy result.
 *
 * For a connection from a source pod to a destination pod to be allowed,
 * both the egress policy on the source pod and the ingress policy on the
 * destination pod need to allow the connection.
 * If either side does not allow the connection, it will not happen.
 *
 * @see https://kubernetes.io/docs/concepts/services-networking/network-policies/#networkpolicy-resource
 */
export declare class NetworkPolicy extends base.Resource {
    /**
     * @see base.Resource.apiObject
     */
    protected readonly apiObject: ApiObject;
    readonly resourceType: string;
    private readonly _podSelectorConfig;
    private readonly _egressRules;
    private readonly _ingressRules;
    private readonly _policyTypes;
    constructor(scope: Construct, id: string, props?: NetworkPolicyProps);
    /**
     * Allow outgoing traffic to the peer.
     *
     * If ports are not passed, traffic will be allowed on all ports.
     */
    addEgressRule(peer: INetworkPolicyPeer, ports?: NetworkPolicyPort[]): void;
    /**
     * Allow incoming traffic from the peer.
     *
     * If ports are not passed, traffic will be allowed on all ports.
     */
    addIngressRule(peer: INetworkPolicyPeer, ports?: NetworkPolicyPort[]): void;
    private createNetworkPolicyPeers;
    private configureDefaultBehavior;
    /**
     * @internal
     */
    _toKube(): k8s.NetworkPolicySpec;
}
export declare function validatePeerConfig(peerConfig: NetworkPolicyPeerConfig): void;
