import { Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { DnsEndpoint } from "../../../generated/imports/externaldns.k8s.io.ts";
import versions from "../../versions.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";
import { DDNS_HOSTNAME } from "./external-dns.ts";

// NodePort for mc-router to accept all Minecraft connections
const MC_ROUTER_NODE_PORT = 30000;

export function createMcRouterApp(chart: Chart) {
  // Create namespace
  new Namespace(chart, "mc-router-namespace", {
    metadata: {
      name: "mc-router",
    },
  });

  const mcRouterValues: HelmValuesForChart<"mc-router"> = {
    services: {
      minecraft: {
        type: "NodePort",
        port: 25565,
        nodePort: MC_ROUTER_NODE_PORT,
      },
    },
    minecraftRouter: {
      // Enable auto-scale up: wake servers when players connect
      autoScale: {
        up: {
          enabled: true,
        },
        // Enable auto-scale down: hibernate servers after idle period
        down: {
          enabled: true,
          after: "10m",
        },
      },
      // Enable prometheus metrics for monitoring
      metrics: {
        backend: "prometheus",
      },
      // Increase connection rate limit for multiple players joining simultaneously
      connectionRateLimit: 10,
    },
    resources: {
      requests: {
        memory: "64Mi",
        cpu: "50m",
      },
      limits: {
        memory: "128Mi",
      },
    },
  };

  // DNS CNAME records managed by external-dns
  // Note: SRV records are managed manually in Cloudflare due to external-dns bug:
  // https://github.com/kubernetes-sigs/external-dns/issues/5551
  //
  // Manual SRV records in Cloudflare (use unique hostnames per server):
  //   _minecraft._tcp.sjer.red        -> 0 5 30000 mc.sjer.red
  //   _minecraft._tcp.shuxin.sjer.red -> 0 5 30000 shuxin.sjer.red
  //   _minecraft._tcp.ts-mc.net       -> 0 5 30000 mc.ts-mc.net
  //
  // Apex domains (sjer.red, ts-mc.net) use existing CF tunnel CNAMEs
  new DnsEndpoint(chart, "mc-router-dns", {
    metadata: {
      name: "mc-router-dns",
      namespace: "mc-router",
    },
    spec: {
      endpoints: [
        // mc.sjer.red -> ddns.sjer.red (SRV target for sjer.red)
        {
          dnsName: "mc.sjer.red",
          recordType: "CNAME",
          targets: [DDNS_HOSTNAME],
          providerSpecific: [
            {
              name: "external-dns.alpha.kubernetes.io/cloudflare-proxied",
              value: "false",
            },
          ],
        },
        // shuxin.sjer.red -> ddns.sjer.red (SRV target for shuxin.sjer.red)
        {
          dnsName: "shuxin.sjer.red",
          recordType: "CNAME",
          targets: [DDNS_HOSTNAME],
          providerSpecific: [
            {
              name: "external-dns.alpha.kubernetes.io/cloudflare-proxied",
              value: "false",
            },
          ],
        },
        // mc.ts-mc.net -> ddns.sjer.red (SRV target for ts-mc.net)
        {
          dnsName: "mc.ts-mc.net",
          recordType: "CNAME",
          targets: [DDNS_HOSTNAME],
          providerSpecific: [
            {
              name: "external-dns.alpha.kubernetes.io/cloudflare-proxied",
              value: "false",
            },
          ],
        },
      ],
    },
  });

  return new Application(chart, "mc-router-app", {
    metadata: {
      name: "mc-router",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://itzg.github.io/minecraft-server-charts/",
        targetRevision: versions["mc-router"],
        chart: "mc-router",
        helm: {
          valuesObject: mcRouterValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "mc-router",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
