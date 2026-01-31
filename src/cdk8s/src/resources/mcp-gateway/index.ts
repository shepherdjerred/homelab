import { Chart, Duration, Size } from "cdk8s";
import {
  ConfigMap,
  Cpu,
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Probe,
  Secret,
  Service,
  Volume,
} from "cdk8s-plus-31";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import versions from "../../versions.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import { withCommonProps } from "../../misc/common.ts";

const CURRENT_FILENAME = fileURLToPath(import.meta.url);
const CURRENT_DIRNAME = dirname(CURRENT_FILENAME);

export async function createMcpGatewayDeployment(chart: Chart) {
  const UID = 65534;
  const GID = 65534;

  // Load the mcp-proxy configuration from file
  const configPath = join(CURRENT_DIRNAME, "config.json");
  const configContent = await Bun.file(configPath).text();

  // Create ConfigMap for mcp-proxy configuration
  const mcpProxyConfig = new ConfigMap(chart, "mcp-proxy-config", {
    metadata: {
      name: "mcp-proxy-config",
    },
    data: {
      "config.json": configContent,
    },
  });

  // Create 1Password item for API tokens
  const onePasswordItem = new OnePasswordItem(chart, "mcp-gateway-1p", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/mcp-gateway",
    },
    metadata: {
      name: "mcp-gateway",
    },
  });

  const deployment = new Deployment(chart, "mcp-gateway", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: GID,
    },
  });

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/tbxark/mcp-proxy:${versions["tbxark/mcp-proxy"]}`,
      args: ["--config", "/config/config.json"],
      ports: [{ number: 9090, name: "http" }],
      securityContext: {
        user: UID,
        group: GID,
        ensureNonRoot: true,
        allowPrivilegeEscalation: false,
        readOnlyRootFilesystem: false,
      },
      resources: {
        memory: {
          request: Size.mebibytes(512),
          limit: Size.gibibytes(1),
        },
        cpu: {
          request: Cpu.millis(200),
          limit: Cpu.millis(500),
        },
      },
      liveness: Probe.fromHttpGet("/api/status", {
        port: 9090,
        initialDelaySeconds: Duration.seconds(30),
        periodSeconds: Duration.seconds(30),
        failureThreshold: 3,
      }),
      readiness: Probe.fromHttpGet("/api/status", {
        port: 9090,
        initialDelaySeconds: Duration.seconds(10),
        periodSeconds: Duration.seconds(10),
      }),
      envVariables: {
        // Canvas configuration
        CANVAS_API_TOKEN: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "mcp-gateway-canvas-token-secret", onePasswordItem.name),
          key: "CANVAS_API_TOKEN",
        }),
        CANVAS_BASE_URL: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "mcp-gateway-canvas-url-secret", onePasswordItem.name),
          key: "CANVAS_BASE_URL",
        }),
        // Todoist configuration
        TODOIST_API_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "mcp-gateway-todoist-key-secret", onePasswordItem.name),
          key: "TODOIST_API_KEY",
        }),
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromConfigMap(chart, "mcp-proxy-config-volume", mcpProxyConfig),
        },
      ],
    }),
  );

  // Create Service for mcp-proxy
  const service = new Service(chart, "mcp-gateway-service", {
    metadata: {
      name: "mcp-gateway",
    },
    selector: deployment,
    ports: [{ port: 9090, name: "http" }],
  });

  // TailscaleIngress for internal access
  new TailscaleIngress(chart, "mcp-gateway-ingress", {
    service: service,
    host: "mcp-gateway",
  });
}
