import * as Sentry from "@sentry/bun";

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

export { Sentry };
