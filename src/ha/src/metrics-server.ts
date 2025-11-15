import type { TServiceParams } from "@digital-alchemy/core";
import { registry } from "./metrics.ts";

/**
 * Starts an HTTP server to expose Prometheus metrics
 */
export function startMetricsServer({ logger }: TServiceParams) {
  const port = Number.parseInt(Bun.env["METRICS_PORT"] ?? "9090", 10);

  const server = Bun.serve({
    port,
    async fetch(request) {
      const url = new URL(request.url);

      if (url.pathname === "/metrics") {
        const metrics = await registry.metrics();
        return new Response(metrics, {
          headers: {
            "Content-Type": registry.contentType,
          },
        });
      }

      if (url.pathname === "/health") {
        return new Response(JSON.stringify({ status: "healthy" }), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  logger.info(`Metrics server started on port ${String(port)}`);
  logger.info(`Metrics endpoint: http://localhost:${String(port)}/metrics`);
  logger.info(`Health endpoint: http://localhost:${String(port)}/health`);

  return server;
}
