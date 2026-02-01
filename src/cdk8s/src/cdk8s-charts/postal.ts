import { App, Chart } from "cdk8s";
import { PostalMariaDB } from "../resources/postgres/postal-mariadb.ts";
import { createPostalDeployment } from "../resources/mail/postal.ts";
import { DnsEndpoint } from "../../generated/imports/externaldns.k8s.io.ts";
import { DDNS_HOSTNAME } from "../resources/argo-applications/external-dns.ts";

export function createPostalChart(app: App) {
  const chart = new Chart(app, "postal", {
    namespace: "postal",
    disableResourceNameHashes: true,
  });

  const postalMariadb = new PostalMariaDB(chart, "postal-mariadb", {
    namespace: "postal",
    storageClass: "zfs-ssd",
    storageSize: "32Gi",
  });

  createPostalDeployment(chart, {
    mariadb: postalMariadb,
  });

  // DNS record for email return path domain
  // This allows bounce handling and proper SPF alignment
  // Note: SPF TXT record must be added manually in Cloudflare:
  //   rp.sjer.red TXT "v=spf1 include:spf.messagingengine.com ~all"
  new DnsEndpoint(chart, "postal-return-path-dns", {
    metadata: {
      name: "postal-return-path-dns",
      namespace: "postal",
    },
    spec: {
      endpoints: [
        {
          dnsName: "rp.sjer.red",
          recordType: "CNAME",
          targets: [DDNS_HOSTNAME],
          providerSpecific: [
            {
              // Must not be proxied - email needs direct connection
              name: "external-dns.alpha.kubernetes.io/cloudflare-proxied",
              value: "false",
            },
          ],
        },
      ],
    },
  });
}
