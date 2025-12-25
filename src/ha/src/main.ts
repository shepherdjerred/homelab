import * as Sentry from "@sentry/bun";
import { goodMorning } from "./workflows/good-morning.ts";
import { goodNight } from "./workflows/good-night.ts";
import { welcomeHome } from "./workflows/welcome-home.ts";
import { runVacuumIfNotHome } from "./workflows/run-vacuum-if-not-home.ts";
import { leavingHome } from "./workflows/leaving-home.ts";
import { climateControl } from "./workflows/climate-control.ts";
import { startMetricsServer } from "./metrics-server.ts";

import { LIB_HASS } from "@digital-alchemy/hass";
import { LIB_SYNAPSE } from "@digital-alchemy/synapse";
import { LIB_AUTOMATION } from "@digital-alchemy/automation";
import { CreateApplication } from "@digital-alchemy/core";

// Initialize Sentry for error tracking
const sentryDsn = Bun.env["SENTRY_DSN"];
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    environment: Bun.env["ENVIRONMENT"] ?? "production",
  });
} else {
  console.warn("SENTRY_DSN not set, error tracking disabled");
}

// Handle unhandled errors
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  Sentry.captureException(reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  Sentry.captureException(error);
});

const app = CreateApplication({
  libraries: [LIB_HASS, LIB_SYNAPSE, LIB_AUTOMATION],
  name: "automation",
  services: {
    metricsServer: startMetricsServer,
    goodMorning,
    goodNight,
    welcomeHome,
    runVacuumIfNotHome,
    leavingHome,
    climateControl,
  },
});

await app.bootstrap();
