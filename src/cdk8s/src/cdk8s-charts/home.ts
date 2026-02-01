import { App, Chart } from "cdk8s";
import { createHomeAssistantDeployment } from "../resources/home/homeassistant.ts";
import { createHaDeployment } from "../resources/home/ha.ts";
import { KubeNetworkPolicy, IntOrString } from "../../generated/imports/k8s.ts";

export async function createHomeChart(app: App) {
  const chart = new Chart(app, "home", {
    namespace: "home",
    disableResourceNameHashes: true,
  });

  await createHomeAssistantDeployment(chart);
  createHaDeployment(chart);

  // NetworkPolicy: Allow ingress to home namespace from Tailscale and Cloudflare tunnel
  // Note: homeassistant uses hostNetwork, so NetworkPolicies don't directly apply to it
  // This policy covers the ha automation container and any future non-hostNetwork pods
  new KubeNetworkPolicy(chart, "home-ingress-policy", {
    metadata: { name: "home-ingress-policy" },
    spec: {
      podSelector: {},
      policyTypes: ["Ingress"],
      ingress: [
        // Allow from Tailscale (private access)
        {
          from: [{ namespaceSelector: { matchLabels: { "kubernetes.io/metadata.name": "tailscale" } } }],
        },
        // Allow from Cloudflare tunnel (public access)
        {
          from: [{ namespaceSelector: { matchLabels: { "kubernetes.io/metadata.name": "cloudflare-tunnel" } } }],
        },
        // Allow all intra-namespace communication (ha -> homeassistant)
        {
          from: [{ podSelector: {} }],
        },
        // Allow Prometheus scraping from monitoring namespace
        {
          from: [{ namespaceSelector: { matchLabels: { "kubernetes.io/metadata.name": "prometheus" } } }],
        },
      ],
    },
  });

  // NetworkPolicy: Allow ha pod egress to DNS, homeassistant, and external (Sentry)
  new KubeNetworkPolicy(chart, "ha-egress-policy", {
    metadata: { name: "ha-egress-policy" },
    spec: {
      podSelector: { matchLabels: { app: "ha" } },
      policyTypes: ["Egress"],
      egress: [
        // Allow DNS
        {
          to: [
            {
              namespaceSelector: {},
              podSelector: { matchLabels: { "k8s-app": "kube-dns" } },
            },
          ],
          ports: [
            { port: IntOrString.fromNumber(53), protocol: "UDP" },
            { port: IntOrString.fromNumber(53), protocol: "TCP" },
          ],
        },
        // Allow to homeassistant within namespace
        {
          to: [{ podSelector: {} }],
          ports: [{ port: IntOrString.fromNumber(8123), protocol: "TCP" }],
        },
        // Allow external HTTPS (for Sentry reporting)
        {
          to: [{ ipBlock: { cidr: "0.0.0.0/0" } }],
          ports: [{ port: IntOrString.fromNumber(443), protocol: "TCP" }],
        },
      ],
    },
  });
}
