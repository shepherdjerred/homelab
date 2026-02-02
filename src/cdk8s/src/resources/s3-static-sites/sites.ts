import type { StaticSiteConfig } from "../../misc/s3-static-site.ts";

export const staticSites: StaticSiteConfig[] = [
  // sjer.red: Uses manual Cloudflare A records because it has MX records for email.
  // MX records prevent using useTunnelDns (cloudflare-operator doesn't handle MX conflicts).
  { hostname: "sjer.red", bucket: "sjer-red", externalDns: false },

  // Subdomains: Can use externalDns (CNAME) since they don't have TXT/MX records
  { hostname: "webring.sjer.red", bucket: "webring", externalDns: true },
  { hostname: "resume.sjer.red", bucket: "resume", externalDns: true },

  // Apex domains with email rejection TXT records (SPF/DMARC/DKIM in external-domains.ts):
  // - externalDns: false → don't use external-dns service annotations for CNAME
  // - useTunnelDns: true → let cloudflare-operator create DNS directly
  //
  // This avoids external-dns conflict: "Domain X contains conflicting record type
  // candidates; discarding CNAME record". External-dns can't create both CNAME and
  // TXT for the same domain. By splitting responsibility (cloudflare-operator for
  // CNAME, external-dns for TXT via DNSEndpoint), both record types get created.
  // Cloudflare's CNAME flattening converts the proxied CNAME to A records internally.
  { hostname: "discord-plays-pokemon.com", bucket: "dpp-docs", externalDns: false, useTunnelDns: true },
  { hostname: "scout-for-lol.com", bucket: "scout-frontend", externalDns: false, useTunnelDns: true },
  { hostname: "better-skill-capped.com", bucket: "better-skill-capped", externalDns: false, useTunnelDns: true },
  { hostname: "clauderon.com", bucket: "clauderon", externalDns: false, useTunnelDns: true },
  { hostname: "ts-mc.net", bucket: "ts-mc", externalDns: false, useTunnelDns: true },
];

export const S3_ENDPOINT = "https://seaweedfs.sjer.red";
export const S3_CREDENTIALS_SECRET_NAME = "seaweedfs-s3-credentials";
