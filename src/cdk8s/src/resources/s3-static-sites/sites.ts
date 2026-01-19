import type { StaticSiteConfig } from "../../misc/s3-static-site.ts";

export const staticSites: StaticSiteConfig[] = [
  { hostname: "sjer.red", bucket: "sjer-red", externalDns: true },
  { hostname: "webring.sjer.red", bucket: "webring", externalDns: true },
  { hostname: "resume.sjer.red", bucket: "resume", indexFile: "resume.pdf", externalDns: true },
  { hostname: "discord-plays-pokemon.com", bucket: "dpp-docs", externalDns: true },
  { hostname: "scout-for-lol.com", bucket: "scout-frontend", externalDns: true },
  { hostname: "better-skill-capped.com", bucket: "better-skill-capped", externalDns: true },
  { hostname: "clauderon.com", bucket: "clauderon", externalDns: true },
];

export const S3_ENDPOINT = "https://seaweedfs.sjer.red";
export const S3_CREDENTIALS_SECRET_NAME = "seaweedfs-s3-credentials";
