import { Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import versions from "../../versions.ts";

// 1Password item path for Cloudflare API token (same as cloudflare-operator)
const CLOUDFLARE_API_TOKEN_1PASSWORD_PATH = "vaults/v64ocnykdqju4ui6j6pua56xw4/items/sc5kj6xthlxmdn7k4mesdr2mju";

// Tunnel ID for CNAME target
const TUNNEL_ID = "3cbdc9a6-9e79-412d-8fe1-60117fecd4d3";

// DDNS hostname for NodePort services
export const DDNS_HOSTNAME = "ddns.sjer.red";

// External domains that external-dns should manage
export const EXTERNAL_DNS_DOMAINS = [
  "sjer.red",
  "scout-for-lol.com",
  "better-skill-capped.com",
  "discord-plays-pokemon.com",
  "ts-mc.net",
  "clauderon.com",
];

// Helper to get the tunnel CNAME target
export const TUNNEL_CNAME_TARGET = `${TUNNEL_ID}.cfargotunnel.com`;

export function createExternalDnsApp(chart: Chart) {
  // Create namespace
  new Namespace(chart, "external-dns-namespace", {
    metadata: {
      name: "external-dns",
    },
  });

  // Create 1PasswordItem for Cloudflare API token
  new OnePasswordItem(chart, "external-dns-cloudflare-token", {
    metadata: {
      name: "cloudflare-api-token",
      namespace: "external-dns",
    },
    spec: {
      itemPath: CLOUDFLARE_API_TOKEN_1PASSWORD_PATH,
    },
  });

  const externalDnsValues = {
    crd: {
      create: true, // Let helm chart manage CRD
    },
    provider: {
      name: "cloudflare",
    },
    sources: ["service", "crd"],
    domainFilters: EXTERNAL_DNS_DOMAINS,
    txtOwnerId: "homelab-external-dns",
    txtPrefix: "_externaldns.",
    policy: "sync",
    env: [
      {
        name: "CF_API_TOKEN",
        valueFrom: {
          secretKeyRef: {
            name: "cloudflare-api-token",
            key: "cloudflare-api-token",
          },
        },
      },
    ],
    extraArgs: [
      "--cloudflare-proxied",
      "--managed-record-types=A",
      "--managed-record-types=AAAA",
      "--managed-record-types=CNAME",
      "--managed-record-types=SRV",
    ],
  };

  return new Application(chart, "external-dns-app", {
    metadata: {
      name: "external-dns",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://kubernetes-sigs.github.io/external-dns",
        chart: "external-dns",
        targetRevision: versions["external-dns"],
        helm: {
          valuesObject: externalDnsValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "external-dns",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
