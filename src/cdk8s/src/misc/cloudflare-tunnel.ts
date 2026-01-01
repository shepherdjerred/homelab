import { Chart } from "cdk8s";
import { TunnelBinding, TunnelBindingTunnelRefKind } from "../../generated/imports/networking.cfargotunnel.com.ts";
import { OnePasswordItem } from "../../generated/imports/onepassword.com.ts";

// 1Password item path for Cloudflare API token
const CLOUDFLARE_TUNNEL_1PASSWORD_ITEM_PATH = "vaults/v64ocnykdqju4ui6j6pua56xw4/items/sc5kj6xthlxmdn7k4mesdr2mju";

// Secret name that the cloudflare-operator expects
export const CLOUDFLARE_TUNNEL_SECRET_NAME = "cloudflare-tunnel-config";

// Track which namespaces already have the secret created to avoid duplicates
const namespacesWithSecret = new Set<string>();

/**
 * Creates a OnePasswordItem to sync the Cloudflare tunnel secret to a namespace.
 * This is needed because the cloudflare-operator looks for the secret in the
 * same namespace as the TunnelBinding, not where the ClusterTunnel is defined.
 */
export function createCloudflareTunnelSecret(chart: Chart, namespace: string) {
  // Skip if we've already created the secret in this namespace
  if (namespacesWithSecret.has(namespace)) {
    return;
  }
  namespacesWithSecret.add(namespace);

  new OnePasswordItem(chart, `cloudflare-tunnel-config-${namespace}`, {
    metadata: {
      name: CLOUDFLARE_TUNNEL_SECRET_NAME,
      namespace,
    },
    spec: {
      itemPath: CLOUDFLARE_TUNNEL_1PASSWORD_ITEM_PATH,
    },
  });
}

export function createCloudflareTunnelBinding(
  chart: Chart,
  id: string,
  props: {
    serviceName: string;
    namespace?: string;
    annotations?: Record<string, string>;
  } & ({ subdomain: string } | { fqdn: string }),
) {
  const fqdn = "fqdn" in props ? props.fqdn : `${props.subdomain}.sjer.red`;
  const namespace = props.namespace ?? chart.namespace;

  // Ensure the cloudflare tunnel secret exists in the target namespace
  if (namespace) {
    createCloudflareTunnelSecret(chart, namespace);
  }

  return new TunnelBinding(chart, id, {
    metadata: {
      ...(props.namespace ? { namespace: props.namespace } : {}),
      ...(props.annotations ? { annotations: props.annotations } : {}),
    },
    subjects: [
      {
        name: props.serviceName,
        spec: {
          fqdn,
        },
      },
    ],
    tunnelRef: {
      kind: TunnelBindingTunnelRefKind.CLUSTER_TUNNEL,
      name: "homelab-tunnel",
    },
  });
}
