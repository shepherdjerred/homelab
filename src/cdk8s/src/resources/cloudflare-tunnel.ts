import { Chart } from "cdk8s";
import { ClusterTunnel } from "../../generated/imports/networking.cfargotunnel.com.ts";
import { createCloudflareTunnelSecret, CLOUDFLARE_TUNNEL_SECRET_NAME } from "../misc/cloudflare-tunnel.ts";

export function createCloudflareTunnelCRD(chart: Chart) {
  // Create the 1Password-synced secret in the chart's namespace (torvalds)
  // This is also used by TunnelBindings in this namespace
  const namespace = chart.namespace ?? "torvalds";
  createCloudflareTunnelSecret(chart, namespace);

  // Create ClusterTunnel CRD (cluster-scoped, accessible from all namespaces)
  // This will automatically:
  // 1. Create a Cloudflare Tunnel named "homelab-k8s"
  // 2. Deploy cloudflared pods
  // 3. Manage DNS records for annotated services
  //
  // Note: The cloudflare-operator looks for the secret in the namespace of
  // each TunnelBinding, not in a central location. The createCloudflareTunnelBinding
  // helper automatically creates a OnePasswordItem in each target namespace.
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
