import type { StaticSiteConfig } from "../../misc/s3-static-site.ts";

export const staticSites: StaticSiteConfig[] = [
  // Note: sjer.red apex uses externalDns: false because:
  // - CNAMEs can't coexist with MX/TXT records at apex
  // - Uses manual Cloudflare A records (proxy) pointing to tunnel
  // - TXT/MX managed via DNSEndpoint in external-domains chart
  { hostname: "sjer.red", bucket: "sjer-red", externalDns: false },
  { hostname: "webring.sjer.red", bucket: "webring", externalDns: true },
  { hostname: "resume.sjer.red", bucket: "resume", externalDns: true },
  { hostname: "discord-plays-pokemon.com", bucket: "dpp-docs", externalDns: true },
  { hostname: "scout-for-lol.com", bucket: "scout-frontend", externalDns: true },
  { hostname: "better-skill-capped.com", bucket: "better-skill-capped", externalDns: true },
  { hostname: "clauderon.com", bucket: "clauderon", externalDns: true },
  { hostname: "ts-mc.net", bucket: "ts-mc", externalDns: true },
];

export const S3_ENDPOINT = "https://seaweedfs.sjer.red";
export const S3_CREDENTIALS_SECRET_NAME = "seaweedfs-s3-credentials";
