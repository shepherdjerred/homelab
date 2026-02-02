import type { StaticSiteConfig } from "../../misc/s3-static-site.ts";

export const staticSites: StaticSiteConfig[] = [
  // sjer.red: Uses manual Cloudflare A records because it has MX records for email.
  // MX records prevent using useTunnelDns (cloudflare-operator doesn't handle MX conflicts).
  { hostname: "sjer.red", bucket: "sjer-red", externalDns: false },

  // Subdomains: Can use externalDns (CNAME) since they don't have TXT/MX records
  { hostname: "webring.sjer.red", bucket: "webring", externalDns: true },
  { hostname: "resume.sjer.red", bucket: "resume", externalDns: true },

  // Apex domains - routing via TunnelBinding, DNS partially manual:
  // - externalDns: false → no service annotation CNAME
  // - useTunnelDns: false → TunnelBinding routes traffic, but no DNS (wrong zone issue)
  //
  // DNS setup:
  // - Subdomain TXT (_dmarc, *._domainkey): Managed by external-dns via DNSEndpoint
  // - Apex CNAME + SPF: Manual in Cloudflare (external-dns conflict when both exist)
  //
  // Manual Cloudflare records needed:
  //   CNAME: <domain> → 3cbdc9a6-9e79-412d-8fe1-60117fecd4d3.cfargotunnel.com (proxied)
  //   TXT: <domain> → v=spf1 -all
  { hostname: "discord-plays-pokemon.com", bucket: "dpp-docs", externalDns: false, useTunnelDns: false },
  { hostname: "scout-for-lol.com", bucket: "scout-frontend", externalDns: false, useTunnelDns: false },
  { hostname: "better-skill-capped.com", bucket: "better-skill-capped", externalDns: false, useTunnelDns: false },
  { hostname: "clauderon.com", bucket: "clauderon", externalDns: false, useTunnelDns: false },
  { hostname: "ts-mc.net", bucket: "ts-mc", externalDns: false, useTunnelDns: false },
];

export const S3_ENDPOINT = "https://seaweedfs.sjer.red";
export const S3_CREDENTIALS_SECRET_NAME = "seaweedfs-s3-credentials";
