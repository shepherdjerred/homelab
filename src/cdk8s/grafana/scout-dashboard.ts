import * as dashboard from "@grafana/grafana-foundation-sdk/dashboard";
import * as common from "@grafana/grafana-foundation-sdk/common";
import * as timeseries from "@grafana/grafana-foundation-sdk/timeseries";
import * as stat from "@grafana/grafana-foundation-sdk/stat";
import * as prometheus from "@grafana/grafana-foundation-sdk/prometheus";

/**
 * Creates a Grafana dashboard for Scout for LoL usage and performance metrics
 * Uses Grafana Foundation SDK to define the dashboard programmatically
 */
export function createScoutDashboard() {
  // Create Prometheus datasource reference
  const prometheusDatasource = {
    type: "prometheus",
    uid: "Prometheus",
  };

  // Create environment variable for filtering
  const environmentVariable = new dashboard.QueryVariableBuilder("environment")
    .label("Environment")
    .query("label_values(discord_guilds, environment)")
    .datasource(prometheusDatasource)
    .multi(true)
    .includeAll(true)
    .allValue(".*");

  // Create server variable for optional filtering
  const serverVariable = new dashboard.QueryVariableBuilder("server")
    .label("Server")
    .query('label_values(discord_guilds{environment=~"$environment"}, instance)')
    .datasource(prometheusDatasource)
    .multi(true)
    .includeAll(true)
    .allValue(".*");

  // Helper function to build filter expression
  const buildFilter = () => {
    return 'environment=~"$environment",instance=~"$server"';
  };

  // Build the main dashboard
  const builder = new dashboard.DashboardBuilder("Scout for LoL - Usage & Performance")
    .uid("scout-for-lol-dashboard")
    .tags(["scout", "discord", "gaming"])
    .time({ from: "now-24h", to: "now" })
    .refresh("30s")
    .timezone("browser")
    .editable()
    .withVariable(environmentVariable)
    .withVariable(serverVariable);

  // Row 1: Overview Stats
  builder.withRow(new dashboard.RowBuilder("Overview"));

  // Guild Count
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Discord Guilds")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (discord_guilds{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 0, y: 1, w: 4, h: 4 }),
  );

  // User Count
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Discord Users")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (discord_users{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 4, y: 1, w: 4, h: 4 }),
  );

  // Players Tracked
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Players Tracked")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (players_tracked_total{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 8, y: 1, w: 4, h: 4 }),
  );

  // Accounts Tracked
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Accounts Tracked")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (accounts_tracked_total{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 12, y: 1, w: 4, h: 4 }),
  );

  // Servers with Data
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Servers with Data")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (servers_with_data_total{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 16, y: 1, w: 4, h: 4 }),
  );

  // Connection Status
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Connection Status")
      .description("1 = Connected, 0 = Disconnected (min across servers)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`min by (environment) (discord_connection_status{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.None)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "red" },
          { value: 1, color: "green" },
        ]),
      )
      .gridPos({ x: 20, y: 1, w: 4, h: 4 }),
  );

  // Row 2: Discord Metrics
  builder.withRow(new dashboard.RowBuilder("Discord Metrics"));

  // WebSocket Latency
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("WebSocket Latency")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`avg by (environment) (discord_latency_ms{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("ms")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 5, w: 12, h: 8 }),
  );

  // Command Rate
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Command Rate")
      .description("Discord commands per second")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (rate(discord_commands_total{${buildFilter()}}[5m]))`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("reqps")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 12, y: 5, w: 12, h: 8 }),
  );

  // Row 3: Application Performance
  builder.withRow(new dashboard.RowBuilder("Application Performance"));

  // Uptime
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Uptime")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`max by (environment) (application_uptime_seconds{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("s")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 0, y: 13, w: 6, h: 4 }),
  );

  // Active Competitions
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Active Competitions")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (competitions_active_total{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 6, y: 13, w: 6, h: 4 }),
  );

  // Total Subscriptions
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Active Subscriptions")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (subscriptions_total{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 12, y: 13, w: 6, h: 4 }),
  );

  // Average Accounts per Player
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Avg Accounts/Player")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`avg by (environment) (avg_accounts_per_player{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .decimals(2)
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.None)
      .gridPos({ x: 18, y: 13, w: 6, h: 4 }),
  );

  // Cron Job Performance
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Cron Job Duration (95th percentile)")
      .description("Duration of cron job execution")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `histogram_quantile(0.95, sum(rate(cron_job_duration_seconds_bucket{${buildFilter()}}[5m])) by (environment, job_name, le))`,
          )
          .legendFormat(
            "__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__ - __GRAFANA_TPL_START__job_name__GRAFANA_TPL_END__",
          ),
      )
      .unit("s")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 17, w: 12, h: 8 }),
  );

  // Cron Job Execution Rate
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Cron Job Success Rate")
      .description("Successful cron job executions per minute")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum by (environment, job_name) (rate(cron_job_executions_total{status="success",${buildFilter()}}[5m]))`,
          )
          .legendFormat(
            "__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__ - __GRAFANA_TPL_START__job_name__GRAFANA_TPL_END__",
          ),
      )
      .unit("reqps")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 12, y: 17, w: 12, h: 8 }),
  );

  // Row 4: API Activity
  builder.withRow(new dashboard.RowBuilder("API Activity"));

  // Riot API Request Rate
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Riot API Request Rate")
      .description("Requests per second to Riot API")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (rate(riot_api_requests_total{${buildFilter()}}[5m]))`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("reqps")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 25, w: 12, h: 8 }),
  );

  // Database Query Rate
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Database Query Rate")
      .description("Database queries per second")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (rate(database_queries_total{${buildFilter()}}[5m]))`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("reqps")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 12, y: 25, w: 12, h: 8 }),
  );

  // Reports Generated
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Reports Generated")
      .description("Match reports generated per minute")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (rate(reports_generated_total{${buildFilter()}}[5m])) * 60`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 33, w: 12, h: 8 }),
  );

  // Riot API Rate Limit Errors
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Riot API Rate Limit Errors")
      .description("Rate limit errors from Riot API")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (environment) (rate(riot_api_rate_limit_errors_total{${buildFilter()}}[5m]))`)
          .legendFormat("__GRAFANA_TPL_START__environment__GRAFANA_TPL_END__"),
      )
      .unit("reqps")
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 0.01, color: "yellow" },
          { value: 0.1, color: "red" },
        ]),
      )
      .gridPos({ x: 12, y: 33, w: 12, h: 8 }),
  );

  return builder.build();
}

/**
 * Exports the dashboard as JSON string for use in ConfigMaps or API calls
 */
export function exportScoutDashboardJson(): string {
  const dashboard = createScoutDashboard();
  return JSON.stringify(dashboard, null, 2);
}
