// @ts-nocheck
// Manually created for external-dns DNSEndpoint CRD
// Based on: https://github.com/kubernetes-sigs/external-dns/blob/master/config/crd/standard/dnsendpoints.externaldns.k8s.io.yaml
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from "cdk8s";
import { Construct } from "constructs";

/**
 * DNSEndpoint is a contract for external-dns to manage DNS records
 *
 * @schema DNSEndpoint
 */
export class DnsEndpoint extends ApiObject {
  /**
   * Returns the apiVersion and kind for "DNSEndpoint"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: "externaldns.k8s.io/v1alpha1",
    kind: "DNSEndpoint",
  };

  /**
   * Renders a Kubernetes manifest for "DNSEndpoint".
   *
   * @param props initialization props
   */
  public static manifest(props: DnsEndpointProps = {}): any {
    return {
      ...DnsEndpoint.GVK,
      ...toJson_DnsEndpointProps(props),
    };
  }

  /**
   * Defines a "DNSEndpoint" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: DnsEndpointProps = {}) {
    super(scope, id, {
      ...DnsEndpoint.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public override toJson(): any {
    const resolved = super.toJson();

    return {
      ...DnsEndpoint.GVK,
      ...toJson_DnsEndpointProps(resolved),
    };
  }
}

/**
 * DNSEndpoint props
 *
 * @schema DNSEndpoint
 */
export interface DnsEndpointProps {
  /**
   * @schema DNSEndpoint#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * DNSEndpointSpec defines the desired state of DNSEndpoint
   *
   * @schema DNSEndpoint#spec
   */
  readonly spec?: DnsEndpointSpec;
}

/**
 * Converts an object of type 'DnsEndpointProps' to JSON representation.
 */
/* eslint-disable max-len, @stylistic/max-len, quote-props, @stylistic/quote-props */
export function toJson_DnsEndpointProps(obj: DnsEndpointProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_DnsEndpointSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, @stylistic/max-len, quote-props, @stylistic/quote-props */

/**
 * DNSEndpointSpec defines the desired state of DNSEndpoint
 *
 * @schema DnsEndpointSpec
 */
export interface DnsEndpointSpec {
  /**
   * The endpoints to manage
   *
   * @schema DnsEndpointSpec#endpoints
   */
  readonly endpoints?: Endpoint[];
}

/**
 * Converts an object of type 'DnsEndpointSpec' to JSON representation.
 */
/* eslint-disable max-len, @stylistic/max-len, quote-props, @stylistic/quote-props */
export function toJson_DnsEndpointSpec(obj: DnsEndpointSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    endpoints: obj.endpoints?.map((y) => toJson_Endpoint(y)),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, @stylistic/max-len, quote-props, @stylistic/quote-props */

/**
 * Endpoint is a high-level representation of a DNS record
 *
 * @schema Endpoint
 */
export interface Endpoint {
  /**
   * The hostname of the DNS record
   *
   * @schema Endpoint#dnsName
   */
  readonly dnsName?: string;

  /**
   * Labels stores labels defined for the Endpoint
   *
   * @schema Endpoint#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * ProviderSpecific stores provider specific config
   *
   * @schema Endpoint#providerSpecific
   */
  readonly providerSpecific?: ProviderSpecificProperty[];

  /**
   * TTL for the record
   *
   * @schema Endpoint#recordTTL
   */
  readonly recordTTL?: number;

  /**
   * RecordType type of record, e.g. CNAME, A, AAAA, SRV, TXT etc
   *
   * @schema Endpoint#recordType
   */
  readonly recordType?: string;

  /**
   * Identifier to distinguish multiple records with the same name and type
   *
   * @schema Endpoint#setIdentifier
   */
  readonly setIdentifier?: string;

  /**
   * The targets the DNS record points to
   *
   * @schema Endpoint#targets
   */
  readonly targets?: string[];
}

/**
 * Converts an object of type 'Endpoint' to JSON representation.
 */
/* eslint-disable max-len, @stylistic/max-len, quote-props, @stylistic/quote-props */
export function toJson_Endpoint(obj: Endpoint | undefined): Record<string, any> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    dnsName: obj.dnsName,
    labels: obj.labels,
    providerSpecific: obj.providerSpecific?.map((y) => toJson_ProviderSpecificProperty(y)),
    recordTTL: obj.recordTTL,
    recordType: obj.recordType,
    setIdentifier: obj.setIdentifier,
    targets: obj.targets,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, @stylistic/max-len, quote-props, @stylistic/quote-props */

/**
 * ProviderSpecificProperty holds the name and value of a configuration which is specific to individual DNS providers
 *
 * @schema ProviderSpecificProperty
 */
export interface ProviderSpecificProperty {
  /**
   * @schema ProviderSpecificProperty#name
   */
  readonly name?: string;

  /**
   * @schema ProviderSpecificProperty#value
   */
  readonly value?: string;
}

/**
 * Converts an object of type 'ProviderSpecificProperty' to JSON representation.
 */
/* eslint-disable max-len, @stylistic/max-len, quote-props, @stylistic/quote-props */
export function toJson_ProviderSpecificProperty(
  obj: ProviderSpecificProperty | undefined,
): Record<string, any> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    name: obj.name,
    value: obj.value,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, @stylistic/max-len, quote-props, @stylistic/quote-props */
