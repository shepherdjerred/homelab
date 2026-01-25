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

  // DNS records for mc-router
  // All Minecraft servers will be accessed through mc-router
  // We update the SRV records to point to mc-router's NodePort
  new DnsEndpoint(chart, "mc-router-dns", {
    metadata: {
      name: "mc-router-dns",
      namespace: "mc-router",
    },
    spec: {
      endpoints: [
        // minecraft.sjer.red -> ddns.sjer.red with SRV pointing to mc-router port
        {
          dnsName: "minecraft.sjer.red",
          recordType: "CNAME",
          targets: [DDNS_HOSTNAME],
          providerSpecific: [
            {
              name: "external-dns.alpha.kubernetes.io/cloudflare-proxied",
              value: "false",
            },
          ],
        },
        {
          dnsName: "_minecraft._tcp.minecraft.sjer.red",
          recordType: "SRV",
          targets: [`0 5 ${MC_ROUTER_NODE_PORT.toString()} minecraft.sjer.red`],
        },
        // shuxin.sjer.red -> ddns.sjer.red with SRV pointing to mc-router port
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
        {
          dnsName: "_minecraft._tcp.shuxin.sjer.red",
          recordType: "SRV",
          targets: [`0 5 ${MC_ROUTER_NODE_PORT.toString()} shuxin.sjer.red`],
        },
        // ts-mc.net -> ddns.sjer.red with SRV pointing to mc-router port
        {
          dnsName: "ts-mc.net",
          recordType: "CNAME",
          targets: [DDNS_HOSTNAME],
          providerSpecific: [
            {
              name: "external-dns.alpha.kubernetes.io/cloudflare-proxied",
              value: "false",
            },
          ],
        },
        {
          dnsName: "_minecraft._tcp.ts-mc.net",
          recordType: "SRV",
          targets: [`0 5 ${MC_ROUTER_NODE_PORT.toString()} ts-mc.net`],
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
