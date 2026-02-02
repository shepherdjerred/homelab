import { App, Chart } from "cdk8s";
import { DnsEndpoint } from "../../generated/imports/externaldns.k8s.io.ts";
import { DDNS_HOSTNAME } from "../resources/argo-applications/external-dns.ts";

// Helper to create unproxied providerSpecific config
const UNPROXIED = [
  {
    name: "external-dns.alpha.kubernetes.io/cloudflare-proxied",
    value: "false",
  },
];

// Standard email rejection TXT records for domains that don't send email
// Includes apex SPF record
const EMAIL_REJECTION_RECORDS = (domain: string) => [
  {
    dnsName: domain,
    recordType: "TXT",
    targets: ["v=spf1 -all"],
  },
  {
    dnsName: `_dmarc.${domain}`,
    recordType: "TXT",
    targets: ["v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;"],
  },
  {
    dnsName: `*._domainkey.${domain}`,
    recordType: "TXT",
    targets: ["v=DKIM1; p="],
  },
];

// Email rejection records for domains that also need apex CNAME (managed manually).
// Excludes apex SPF to avoid external-dns conflict with CNAME.
// Apex records (CNAME + SPF) must be created manually in Cloudflare.
const EMAIL_REJECTION_RECORDS_NO_APEX = (domain: string) => [
  {
    dnsName: `_dmarc.${domain}`,
    recordType: "TXT",
    targets: ["v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;"],
  },
  {
    dnsName: `*._domainkey.${domain}`,
    recordType: "TXT",
    targets: ["v=DKIM1; p="],
  },
];

/**
 * Creates DNSEndpoint resources for external domains managed by external-dns.
 * This chart consolidates DNS records that were previously managed manually in Cloudflare.
 *
 * ## Records managed here:
 * - CNAME records for domain redirects and services
 * - MX records for email routing
 * - TXT records for SPF, DMARC, DKIM
 *
 * ## Records managed elsewhere:
 * - sjer.red subdomains: Managed via Cloudflare Tunnel operator (TunnelBinding CRDs)
 * - S3 static sites (scout-for-lol.com, etc.): Managed via service annotations in s3-static-site.ts
 * - Service-specific CNAMEs: Managed via service annotations or TunnelBinding
 *
 * ## Records that MUST remain manual in Cloudflare (external-dns bug #5551):
 * SRV records are not properly supported. See: https://github.com/kubernetes-sigs/external-dns/issues/5551
 *
 * ### shepherdjerred.com FastMail autodiscovery SRV records:
 *   _caldav._tcp.shepherdjerred.com     SRV 0 1 443 caldav.fastmail.com
 *   _caldavs._tcp.shepherdjerred.com    SRV 0 1 443 caldav.fastmail.com
 *   _carddav._tcp.shepherdjerred.com    SRV 0 1 443 carddav.fastmail.com
 *   _carddavs._tcp.shepherdjerred.com   SRV 0 1 443 carddav.fastmail.com
 *   _imap._tcp.shepherdjerred.com       SRV 0 1 143 imap.fastmail.com
 *   _imaps._tcp.shepherdjerred.com      SRV 0 1 993 imap.fastmail.com
 *   _pop3._tcp.shepherdjerred.com       SRV 0 1 110 pop.fastmail.com
 *   _pop3s._tcp.shepherdjerred.com      SRV 0 1 995 pop.fastmail.com
 *   _submission._tcp.shepherdjerred.com SRV 0 1 587 smtp.fastmail.com
 *
 * ### Minecraft SRV records (also in mc-router.ts comments):
 *   _minecraft._tcp.sjer.red            SRV 0 5 30000 ddns.sjer.red
 *   _minecraft._tcp.shuxin.sjer.red     SRV 0 5 30000 shuxin.sjer.red
 *   _minecraft._tcp.ts-mc.net           SRV 0 5 30000 ddns.sjer.red
 */
export function createExternalDomainsChart(app: App) {
  const chart = new Chart(app, "external-domains", {
    namespace: "external-dns",
    disableResourceNameHashes: true,
  });

  // ===========================================
  // CNAME Records
  // ===========================================

  // Note: External S3 static site domains (scout-for-lol.com, discord-plays-pokemon.com,
  // better-skill-capped.com, clauderon.com, ts-mc.net) have apex CNAME + SPF managed
  // manually in Cloudflare. external-dns can't create both for same apex (conflict).
  // Subdomain TXT records (_dmarc, *._domainkey) are managed below via DNSEndpoint.

  // jerred.is -> sjer.red
  new DnsEndpoint(chart, "jerred-is-dns", {
    metadata: {
      name: "jerred-is-dns",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        {
          dnsName: "jerred.is",
          recordType: "CNAME",
          targets: ["sjer.red"],
        },
        {
          dnsName: "www.jerred.is",
          recordType: "CNAME",
          targets: ["sjer.red"],
        },
      ],
    },
  });

  // jerredshepherd.com -> sjer.red
  new DnsEndpoint(chart, "jerredshepherd-com-dns", {
    metadata: {
      name: "jerredshepherd-com-dns",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        {
          dnsName: "jerredshepherd.com",
          recordType: "CNAME",
          targets: ["sjer.red"],
        },
        {
          dnsName: "www.jerredshepherd.com",
          recordType: "CNAME",
          targets: ["sjer.red"],
        },
      ],
    },
  });

  // shepherdjerred.com -> sjer.red + DKIM CNAME records
  new DnsEndpoint(chart, "shepherdjerred-com-dns", {
    metadata: {
      name: "shepherdjerred-com-dns",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        {
          dnsName: "shepherdjerred.com",
          recordType: "CNAME",
          targets: ["sjer.red"],
        },
        {
          dnsName: "www.shepherdjerred.com",
          recordType: "CNAME",
          targets: ["sjer.red"],
        },
        // FastMail DKIM CNAME records (must be unproxied)
        {
          dnsName: "fm1._domainkey.shepherdjerred.com",
          recordType: "CNAME",
          targets: ["fm1.shepherdjerred.com.dkim.fmhosted.com"],
          providerSpecific: UNPROXIED,
        },
        {
          dnsName: "fm2._domainkey.shepherdjerred.com",
          recordType: "CNAME",
          targets: ["fm2.shepherdjerred.com.dkim.fmhosted.com"],
          providerSpecific: UNPROXIED,
        },
        {
          dnsName: "fm3._domainkey.shepherdjerred.com",
          recordType: "CNAME",
          targets: ["fm3.shepherdjerred.com.dkim.fmhosted.com"],
          providerSpecific: UNPROXIED,
        },
      ],
    },
  });

  // glitter-boys.com subdomains
  new DnsEndpoint(chart, "glitter-boys-com-dns", {
    metadata: {
      name: "glitter-boys-com-dns",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        {
          dnsName: "beta.glitter-boys.com",
          recordType: "CNAME",
          targets: ["glitter-boys-beta.fly.dev"],
        },
        {
          dnsName: "prod.glitter-boys.com",
          recordType: "CNAME",
          targets: ["glitter-boys-prod.fly.dev"],
        },
        // Game server (must be unproxied)
        {
          dnsName: "blohsh.glitter-boys.com",
          recordType: "CNAME",
          targets: [DDNS_HOSTNAME],
          providerSpecific: UNPROXIED,
        },
      ],
    },
  });

  // ===========================================
  // MX Records (FastMail for shepherdjerred.com)
  // ===========================================

  new DnsEndpoint(chart, "shepherdjerred-com-mx", {
    metadata: {
      name: "shepherdjerred-com-mx",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        // Main domain MX records
        {
          dnsName: "shepherdjerred.com",
          recordType: "MX",
          targets: ["10 in1-smtp.messagingengine.com", "20 in2-smtp.messagingengine.com"],
        },
        // Wildcard MX for catch-all subdomains
        {
          dnsName: "*.shepherdjerred.com",
          recordType: "MX",
          targets: ["10 in1-smtp.messagingengine.com", "20 in2-smtp.messagingengine.com"],
        },
      ],
    },
  });

  // ===========================================
  // TXT Records (SPF, DMARC, DKIM)
  // ===========================================

  // shepherdjerred.com - FastMail email (accepts email)
  new DnsEndpoint(chart, "shepherdjerred-com-txt", {
    metadata: {
      name: "shepherdjerred-com-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        // SPF record for FastMail (~all = softfail for unauthorized senders)
        {
          dnsName: "shepherdjerred.com",
          recordType: "TXT",
          targets: ["v=spf1 include:spf.messagingengine.com ~all"],
        },
        // DMARC policy (quarantine unauthorized mail)
        {
          dnsName: "_dmarc.shepherdjerred.com",
          recordType: "TXT",
          targets: ["v=DMARC1; p=quarantine; rua=mailto:jerred@shepherdjerred.com"],
        },
      ],
    },
  });

  // jerred.is - email rejection (doesn't send email)
  // Uses NO_APEX because apex has CNAME to sjer.red (CNAME + TXT conflict)
  new DnsEndpoint(chart, "jerred-is-txt", {
    metadata: {
      name: "jerred-is-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: EMAIL_REJECTION_RECORDS_NO_APEX("jerred.is"),
    },
  });

  // jerredshepherd.com - email rejection (doesn't send email)
  new DnsEndpoint(chart, "jerredshepherd-com-txt", {
    metadata: {
      name: "jerredshepherd-com-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: EMAIL_REJECTION_RECORDS("jerredshepherd.com"),
    },
  });

  // glitter-boys.com - email rejection (doesn't send email)
  new DnsEndpoint(chart, "glitter-boys-com-txt", {
    metadata: {
      name: "glitter-boys-com-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: EMAIL_REJECTION_RECORDS("glitter-boys.com"),
    },
  });

  // External S3 static site domains - subdomain TXT only (apex managed manually in Cloudflare)
  new DnsEndpoint(chart, "better-skill-capped-com-txt", {
    metadata: { name: "better-skill-capped-com-txt", namespace: "external-dns" },
    spec: { endpoints: EMAIL_REJECTION_RECORDS_NO_APEX("better-skill-capped.com") },
  });

  new DnsEndpoint(chart, "scout-for-lol-com-txt", {
    metadata: { name: "scout-for-lol-com-txt", namespace: "external-dns" },
    spec: { endpoints: EMAIL_REJECTION_RECORDS_NO_APEX("scout-for-lol.com") },
  });

  new DnsEndpoint(chart, "discord-plays-pokemon-com-txt", {
    metadata: { name: "discord-plays-pokemon-com-txt", namespace: "external-dns" },
    spec: { endpoints: EMAIL_REJECTION_RECORDS_NO_APEX("discord-plays-pokemon.com") },
  });

  new DnsEndpoint(chart, "ts-mc-net-txt", {
    metadata: { name: "ts-mc-net-txt", namespace: "external-dns" },
    spec: { endpoints: EMAIL_REJECTION_RECORDS_NO_APEX("ts-mc.net") },
  });

  new DnsEndpoint(chart, "clauderon-com-txt", {
    metadata: { name: "clauderon-com-txt", namespace: "external-dns" },
    spec: { endpoints: EMAIL_REJECTION_RECORDS_NO_APEX("clauderon.com") },
  });

  // sjer.red - email setup:
  // - Send: FastMail (directly) and Postal (relays through FastMail)
  // - Receive: FastMail
  // - Return-path: rp.sjer.red (Postal envelope sender, needs its own SPF)
  // Note: SPF is checked against envelope sender domain, not From header.
  // When Postal sends with MAIL FROM @rp.sjer.red, receivers check rp.sjer.red's SPF.
  new DnsEndpoint(chart, "sjer-red-txt", {
    metadata: {
      name: "sjer-red-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        // SPF for direct FastMail sending (envelope sender @sjer.red)
        {
          dnsName: "sjer.red",
          recordType: "TXT",
          targets: ["v=spf1 include:spf.messagingengine.com ~all"],
        },
        // SPF for Postal return-path (envelope sender @rp.sjer.red)
        // Postal relays through FastMail, so same SPF include
        {
          dnsName: "rp.sjer.red",
          recordType: "TXT",
          targets: ["v=spf1 include:spf.messagingengine.com ~all"],
        },
        // DMARC policy (quarantine unauthorized mail)
        // Uses relaxed alignment (default) - rp.sjer.red aligns with sjer.red
        {
          dnsName: "_dmarc.sjer.red",
          recordType: "TXT",
          targets: ["v=DMARC1; p=quarantine; rua=mailto:dmarc@sjer.red"],
        },
        // Postal DKIM public key for signing outbound mail
        {
          dnsName: "postal-aooLXx._domainkey.sjer.red",
          recordType: "TXT",
          targets: [
            "v=DKIM1; t=s; h=sha256; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFfuKrHpylh2b4GmkgNWYNOkD5LypiaG8T4rDFR/3erk8ZE2fT7Z5ycQcyt+WdVlaN4VhT4phGNLr1rdXNRpUMFZV6uvOFqy2vzvHLaYSiNaYGONdhBe8L1af67XXMsxUbNO8kbyVkSkvpPS9hnz7/qZBfd0glRoGdNI64NQyHlwIDAQAB;",
          ],
        },
      ],
    },
  });

  // sjer.red MX records for receiving email (FastMail)
  new DnsEndpoint(chart, "sjer-red-mx", {
    metadata: {
      name: "sjer-red-mx",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        {
          dnsName: "sjer.red",
          recordType: "MX",
          targets: ["10 in1-smtp.messagingengine.com", "20 in2-smtp.messagingengine.com"],
        },
        // MX for rp subdomain to receive bounces at FastMail
        {
          dnsName: "rp.sjer.red",
          recordType: "MX",
          targets: ["10 in1-smtp.messagingengine.com", "20 in2-smtp.messagingengine.com"],
        },
      ],
    },
  });
}
