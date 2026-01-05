import { App } from "cdk8s";
import { createAppsChart } from "./cdk8s-charts/apps.ts";
import { createScoutChart } from "./cdk8s-charts/scout.ts";
import { createStarlightKarmaBotChart } from "./cdk8s-charts/starlight-karma-bot.ts";
import { createDdnsChart } from "./cdk8s-charts/ddns.ts";
import { createRedlibChart } from "./cdk8s-charts/redlib.ts";
import { createSjerRedChart } from "./cdk8s-charts/sjer-red.ts";
import { createWebringChart } from "./cdk8s-charts/webring.ts";
import { createDppDocsChart } from "./cdk8s-charts/dpp-docs.ts";
import { createBetterSkillCappedChart } from "./cdk8s-charts/better-skill-capped.ts";
import { createPlausibleChart } from "./cdk8s-charts/plausible.ts";
import { createBirmelChart } from "./cdk8s-charts/birmel.ts";
import { createScoutFrontendChart } from "./cdk8s-charts/scout-frontend.ts";
import { createCloudflareTunnelChart } from "./cdk8s-charts/cloudflare-tunnel.ts";
import { createMediaChart } from "./cdk8s-charts/media.ts";
import { createHomeChart } from "./cdk8s-charts/home.ts";
import { createPostalChart } from "./cdk8s-charts/postal.ts";
import { createSyncthingChart } from "./cdk8s-charts/syncthing.ts";
import { createGolinkChart } from "./cdk8s-charts/golink.ts";
import { createFreshRssChart } from "./cdk8s-charts/freshrss.ts";
import { createPokemonChart } from "./cdk8s-charts/pokemon.ts";
import { createGickupChart } from "./cdk8s-charts/gickup.ts";
import { createGrafanaDbChart } from "./cdk8s-charts/grafana-db.ts";

/**
 * Sets up all charts for the application
 */
export async function setupCharts(app: App): Promise<void> {
  await createAppsChart(app);
  createScoutChart(app, "beta");
  createScoutChart(app, "prod");
  createStarlightKarmaBotChart(app, "beta");
  createStarlightKarmaBotChart(app, "prod");

  // Per-service charts (migrated from torvalds)
  createDdnsChart(app);
  createRedlibChart(app);
  createSjerRedChart(app);
  createWebringChart(app);
  createDppDocsChart(app);
  createBetterSkillCappedChart(app);

  // New namespace charts
  createPlausibleChart(app);
  createBirmelChart(app);
  createScoutFrontendChart(app);
  createCloudflareTunnelChart(app);

  // Torvalds namespace charts (separate apps for easier future migration)
  createMediaChart(app);
  await createHomeChart(app);
  createPostalChart(app);
  createSyncthingChart(app);
  createGolinkChart(app);
  createFreshRssChart(app);
  createPokemonChart(app);
  await createGickupChart(app);
  createGrafanaDbChart(app);
}
