import { App, Chart } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createMcpGatewayDeployment } from "../resources/mcp-gateway/index.ts";

export async function createMcpGatewayChart(app: App) {
  const chart = new Chart(app, "mcp-gateway", {
    namespace: "mcp-gateway",
    disableResourceNameHashes: true,
  });

  new Namespace(chart, "mcp-gateway-namespace", {
    metadata: {
      name: "mcp-gateway",
    },
  });

  await createMcpGatewayDeployment(chart);
}
