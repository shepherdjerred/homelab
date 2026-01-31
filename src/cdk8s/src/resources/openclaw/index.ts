import { Chart, Size } from "cdk8s";
import { ConfigMap, Cpu, Deployment, DeploymentStrategy, EnvValue, Secret, Service, Volume } from "cdk8s-plus-31";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import { KubeNetworkPolicy } from "../../../generated/imports/k8s.ts";
import { ZfsNvmeVolume } from "../../misc/zfs-nvme-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import { withCommonProps } from "../../misc/common.ts";
import versions from "../../versions.ts";

const OPENCLAW_CONFIG = {
  // Use singular "agent" based on official examples
  agent: {
    model: {
      primary: "anthropic/claude-opus-4-5",
    },
    workspace: "/data/workspace",
  },
  // Sandbox OFF - k8s pod is isolation, but see security notes
  agents: {
    defaults: {
      sandbox: { mode: "off" },
    },
  },
  gateway: {
    port: 18789,
  },
  // Discord config - note nested dm object
  channels: {
    discord: {
      // token from DISCORD_BOT_TOKEN env var
      dm: {
        enabled: true,
        policy: "allowlist",
        // allowFrom populated from env
      },
    },
  },
  // Skills configuration
  skills: {
    entries: {
      github: { enabled: true },
    },
  },
  // CRITICAL: Strict tool deny list due to broken exec approvals
  tools: {
    deny: [
      "exec", // BROKEN approval flow - deny completely
      "process", // Similar risks
      "cron", // Persistent backdoors
      "nodes", // Infrastructure access
      "canvas", // Unknown attack surface
      "gateway", // Control plane access
    ],
  },
};

export function createOpenclawDeployment(chart: Chart) {
  const UID = 1000;
  const GID = 1000;

  // 1Password secrets
  const onePasswordItem = new OnePasswordItem(chart, "openclaw-1p", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/openclaw",
    },
    metadata: {
      name: "openclaw",
    },
  });

  // ConfigMap with openclaw.json
  const configMap = new ConfigMap(chart, "openclaw-config", {
    metadata: {
      name: "openclaw-config",
    },
    data: {
      "openclaw.json": JSON.stringify(OPENCLAW_CONFIG, null, 2),
    },
  });

  // Persistent storage for workspace
  const dataVolume = new ZfsNvmeVolume(chart, "openclaw-data", {
    storage: Size.gibibytes(10),
  });

  // Network Policy - block cloud metadata at minimum
  new KubeNetworkPolicy(chart, "openclaw-netpol", {
    metadata: { name: "openclaw-netpol" },
    spec: {
      podSelector: { matchLabels: { app: "openclaw" } },
      policyTypes: ["Egress"],
      egress: [
        {
          to: [{ ipBlock: { cidr: "0.0.0.0/0", except: ["169.254.169.254/32"] } }],
        },
      ],
    },
  });

  // Deployment
  const deployment = new Deployment(chart, "openclaw", {
    metadata: { labels: { app: "openclaw" } },
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  deployment.addContainer(
    withCommonProps({
      name: "openclaw",
      image: `ghcr.io/shepherdjerred/openclaw:${versions["shepherdjerred/openclaw"]}`,
      ports: [{ number: 18789, name: "http" }],
      securityContext: {
        user: UID,
        group: GID,
        ensureNonRoot: true,
        allowPrivilegeEscalation: false,
        readOnlyRootFilesystem: false, // OpenClaw needs writes
      },
      resources: {
        cpu: { request: Cpu.millis(500), limit: Cpu.millis(2000) },
        memory: { request: Size.gibibytes(1), limit: Size.gibibytes(4) },
      },
      envVariables: {
        ANTHROPIC_API_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "openclaw-anthropic-key-secret", onePasswordItem.name),
          key: "anthropic-api-key",
        }),
        DISCORD_BOT_TOKEN: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "openclaw-discord-token-secret", onePasswordItem.name),
          key: "discord-bot-token",
        }),
        GH_TOKEN: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "openclaw-gh-token-secret", onePasswordItem.name),
          key: "gh-token",
        }),
        OPENCLAW_GATEWAY_TOKEN: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "openclaw-gateway-token-secret", onePasswordItem.name),
          key: "gateway-token",
        }),
      },
      volumeMounts: [
        {
          path: "/data",
          volume: Volume.fromPersistentVolumeClaim(chart, "openclaw-data-vol", dataVolume.claim),
        },
        {
          path: "/home/node/.openclaw/openclaw.json",
          subPath: "openclaw.json",
          volume: Volume.fromConfigMap(chart, "openclaw-config-vol", configMap),
        },
      ],
    }),
  );

  // Service
  const service = new Service(chart, "openclaw-svc", {
    metadata: { name: "openclaw" },
    ports: [{ port: 18789, name: "http" }],
    selector: deployment,
  });

  // Tailscale Ingress
  new TailscaleIngress(chart, "openclaw-ingress", {
    service,
    host: "openclaw",
  });
}
