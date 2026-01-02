import * as Sentry from "@sentry/bun";

const dsn = Bun.env["SENTRY_DSN"];
const enabled = Bun.env["SENTRY_ENABLED"] === "true";

if (enabled && dsn) {
  Sentry.init({
    dsn,
    environment: Bun.env["SENTRY_ENVIRONMENT"] ?? "development",
    release: Bun.env["SENTRY_RELEASE"],
    tracesSampleRate: 1.0,
  });
  console.log("Sentry initialized");
} else {
  console.log("Sentry disabled or DSN not configured");
}

export { Sentry };
