import { App, Chart } from "cdk8s";
import { DnsEndpoint } from "../../generated/imports/externaldns.k8s.io.ts";
import { DDNS_HOSTNAME, TUNNEL_CNAME_TARGET } from "../resources/argo-applications/external-dns.ts";

// Helper to create unproxied providerSpecific config
const UNPROXIED = [
  {
    name: "external-dns.alpha.kubernetes.io/cloudflare-proxied",
    value: "false",
  },
];

// Standard email rejection TXT records for domains that don't send email
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

  // External domains pointing to Cloudflare Tunnel
  // These domains use DNSEndpoint for CNAME instead of cloudflare-operator's useTunnelDns
  // because cloudflare-operator creates records in wrong zone (e.g., scout-for-lol.com.sjer.red)
  new DnsEndpoint(chart, "scout-for-lol-com-dns", {
    metadata: {
      name: "scout-for-lol-com-dns",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        {
          dnsName: "scout-for-lol.com",
          recordType: "CNAME",
          targets: [TUNNEL_CNAME_TARGET],
        },
      ],
    },
  });

  new DnsEndpoint(chart, "discord-plays-pokemon-com-dns", {
    metadata: {
      name: "discord-plays-pokemon-com-dns",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        {
          dnsName: "discord-plays-pokemon.com",
          recordType: "CNAME",
          targets: [TUNNEL_CNAME_TARGET],
        },
      ],
    },
  });

  new DnsEndpoint(chart, "better-skill-capped-com-dns", {
    metadata: {
      name: "better-skill-capped-com-dns",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        {
          dnsName: "better-skill-capped.com",
          recordType: "CNAME",
          targets: [TUNNEL_CNAME_TARGET],
        },
      ],
    },
  });

  new DnsEndpoint(chart, "clauderon-com-dns", {
    metadata: {
      name: "clauderon-com-dns",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        {
          dnsName: "clauderon.com",
          recordType: "CNAME",
          targets: [TUNNEL_CNAME_TARGET],
        },
      ],
    },
  });

  new DnsEndpoint(chart, "ts-mc-net-dns", {
    metadata: {
      name: "ts-mc-net-dns",
      namespace: "external-dns",
    },
    spec: {
      endpoints: [
        {
          dnsName: "ts-mc.net",
          recordType: "CNAME",
          targets: [TUNNEL_CNAME_TARGET],
        },
      ],
    },
  });

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
  new DnsEndpoint(chart, "jerred-is-txt", {
    metadata: {
      name: "jerred-is-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: EMAIL_REJECTION_RECORDS("jerred.is"),
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

  // better-skill-capped.com - email rejection (doesn't send email)
  new DnsEndpoint(chart, "better-skill-capped-com-txt", {
    metadata: {
      name: "better-skill-capped-com-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: EMAIL_REJECTION_RECORDS("better-skill-capped.com"),
    },
  });

  // scout-for-lol.com - email rejection (doesn't send email)
  new DnsEndpoint(chart, "scout-for-lol-com-txt", {
    metadata: {
      name: "scout-for-lol-com-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: EMAIL_REJECTION_RECORDS("scout-for-lol.com"),
    },
  });

  // discord-plays-pokemon.com - email rejection (doesn't send email)
  new DnsEndpoint(chart, "discord-plays-pokemon-com-txt", {
    metadata: {
      name: "discord-plays-pokemon-com-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: EMAIL_REJECTION_RECORDS("discord-plays-pokemon.com"),
    },
  });

  // ts-mc.net - email rejection (doesn't send email)
  new DnsEndpoint(chart, "ts-mc-net-txt", {
    metadata: {
      name: "ts-mc-net-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: EMAIL_REJECTION_RECORDS("ts-mc.net"),
    },
  });

  // clauderon.com - email rejection (doesn't send email)
  new DnsEndpoint(chart, "clauderon-com-txt", {
    metadata: {
      name: "clauderon-com-txt",
      namespace: "external-dns",
    },
    spec: {
      endpoints: EMAIL_REJECTION_RECORDS("clauderon.com"),
    },
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
