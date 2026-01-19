import { Chart } from "cdk8s";
import { ClusterTunnel } from "../../generated/imports/networking.cfargotunnel.com.ts";
import { CLOUDFLARE_TUNNEL_SECRET_NAME } from "../misc/cloudflare-tunnel.ts";

export function createCloudflareTunnelCRD(chart: Chart) {
  // Create ClusterTunnel CRD (cluster-scoped, accessible from all namespaces)
  // This will automatically:
  // 1. Create a Cloudflare Tunnel named "homelab-k8s"
  // 2. Deploy cloudflared pods
  // 3. Manage DNS records for TunnelBindings
  //
  // DNS ownership note:
  // - TunnelBindings are the single source of truth for tunnel hostnames.
  // - We intentionally avoid external-dns for tunnel CNAMEs to prevent
  //   ownership drift and stale tunnel targets. If external-dns is re-added,
  //   keep tunnel hostnames out of it or explicitly disable DNS updates here.
  //
  // Note: For ClusterTunnel, the cloudflare-operator looks for the API token secret
  // in the cloudflare-operator-system namespace (where the operator runs).
  // The secret is created by cloudflare-operator.ts via 1Password.
  new ClusterTunnel(chart, "cloudflare-tunnel-crd", {
    metadata: {
      name: "homelab-tunnel",
    },
    spec: {
      cloudflare: {
        secret: CLOUDFLARE_TUNNEL_SECRET_NAME,
        cloudflareApiToken: "cloudflare-api-token",
        accountId: "48948ed6cd40d73e34d27f0cc10e595f",
        domain: "sjer.red",
      },
      newTunnel: {
        name: "homelab-k8s",
      },
      // Automatically create and manage DNS records for annotated services
      // Services need annotation: cloudflare-operator.io/content: <service-name>
    },
  });
}
