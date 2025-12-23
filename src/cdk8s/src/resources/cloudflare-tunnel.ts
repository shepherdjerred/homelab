import { Chart } from "cdk8s";
import { Secret } from "cdk8s-plus-31";
import { OnePasswordItem } from "../../generated/imports/onepassword.com.ts";
import { TunnelV1Alpha2 } from "../../generated/imports/networking.cfargotunnel.com.ts";

export function createCloudflareTunnelCRD(chart: Chart) {
  // 1Password item containing Cloudflare API token
  // The item should have field:
  // - cloudflare-api-token: Cloudflare API token with these permissions:
  //   - Zone / Zone / Read
  //   - Zone / DNS / Edit
  //   - Account / Account Settings / Read
  //   - Account / Cloudflare Tunnel / Edit
  const item = new OnePasswordItem(chart, "cloudflare-tunnel-config", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/sc5kj6xthlxmdn7k4mesdr2mju",
    },
  });

  const secret = Secret.fromSecretName(chart, "cloudflare-tunnel-secret", item.name);

  // Create Tunnel CRD
  // This will automatically:
  // 1. Create a Cloudflare Tunnel named "homelab-k8s"
  // 2. Deploy cloudflared pods
  // 3. Manage DNS records for annotated services
  new TunnelV1Alpha2(chart, "cloudflare-tunnel-crd", {
    metadata: {
      name: "homelab-tunnel",
    },
    spec: {
      cloudflare: {
        secret: secret.name,
        cloudflareApiToken: "cloudflare-api-token",
        accountId: "48948ed6cd40d73e34d27f0cc10e595f",
        domain: "sjer.red", // Required in v1alpha2
      },
      newTunnel: {
        name: "homelab-k8s",
      },
      // Automatically create and manage DNS records for annotated services
      // Services need annotation: cloudflare-operator.io/content: <service-name>
    },
  });
}
