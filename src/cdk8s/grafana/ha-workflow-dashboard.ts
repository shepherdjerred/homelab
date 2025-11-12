import * as dashboard from "@grafana/grafana-foundation-sdk/dashboard";
import * as common from "@grafana/grafana-foundation-sdk/common";
import * as timeseries from "@grafana/grafana-foundation-sdk/timeseries";
import * as stat from "@grafana/grafana-foundation-sdk/stat";
import * as prometheus from "@grafana/grafana-foundation-sdk/prometheus";

/**
 * Creates a Grafana dashboard for HA workflow monitoring
 * Tracks workflow executions, errors, performance, and scheduled workflow health
 */
export function createHaWorkflowDashboard() {
  // Create Prometheus datasource reference
  const prometheusDatasource = {
    type: "prometheus",
    uid: "Prometheus",
  };

  // Create workflow variable for filtering
  const workflowVariable = new dashboard.QueryVariableBuilder("workflow")
    .label("Workflow")
    .query("label_values(ha_workflow_executions_total, workflow)")
    .datasource(prometheusDatasource)
    .multi(true)
    .includeAll(true)
    .allValue(".*");

  // Helper function to build filter expression
  const buildFilter = () => {
    return 'workflow=~"$workflow"';
  };

  // Build the main dashboard
  const builder = new dashboard.DashboardBuilder("HA Workflows - Monitoring")
    .uid("ha-workflow-dashboard")
    .tags(["ha", "home-assistant", "workflow", "automation"])
    .time({ from: "now-24h", to: "now" })
    .refresh("30s")
    .timezone("browser")
    .editable()
    .withVariable(workflowVariable);

  // Row 1: Overview Stats
  builder.withRow(new dashboard.RowBuilder("Overview"));

  // Total Executions (24h)
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Total Executions (24h)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum without(pod, instance, container, endpoint) (increase(ha_workflow_executions_total{${buildFilter()}}[24h]))`,
          )
          .legendFormat("Total"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 0, y: 1, w: 6, h: 4 }),
  );

  // Success Rate
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Success Rate (24h)")
      .description("Percentage of successful executions")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `(sum without(pod, instance, container, endpoint) (increase(ha_workflow_executions_total{status="success",${buildFilter()}}[24h])) / sum without(pod, instance, container, endpoint) (increase(ha_workflow_executions_total{${buildFilter()}}[24h]))) * 100`,
          )
          .legendFormat("Success Rate"),
      )
      .unit("percent")
      .decimals(1)
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "red" },
          { value: 95, color: "yellow" },
          { value: 99, color: "green" },
        ]),
      )
      .gridPos({ x: 6, y: 1, w: 6, h: 4 }),
  );

  // Workflows In Progress
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Workflows In Progress")
      .description("Currently running workflows")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum without(pod, instance, container, endpoint) (ha_workflows_in_progress{${buildFilter()}})`)
          .legendFormat("In Progress"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.None)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 1, color: "yellow" },
          { value: 5, color: "red" },
        ]),
      )
      .gridPos({ x: 12, y: 1, w: 6, h: 4 }),
  );

  // Application Uptime
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Application Uptime")
      .description("Time since last restart")
      .datasource(prometheusDatasource)
      .withTarget(new prometheus.DataqueryBuilder().expr(`max(ha_uptime_seconds)`).legendFormat("Uptime"))
      .unit("s")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 18, y: 1, w: 3, h: 4 }),
  );

  // Application Health
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Application Health")
      .description("1 = Up, 0 = Down")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`max without(pod, instance, container, endpoint) (up{job=~".*ha.*"})`)
          .legendFormat("HA Service"),
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
      .gridPos({ x: 21, y: 1, w: 3, h: 4 }),
  );

  // Row 2: Execution Metrics
  builder.withRow(new dashboard.RowBuilder("Execution Metrics"));

  // Execution Rate by Status
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Execution Rate by Status")
      .description("Workflow executions per minute")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum without(pod, instance, container, endpoint) (rate(ha_workflow_executions_total{status="success",${buildFilter()}}[5m])) * 60`,
          )
          .legendFormat("Success"),
      )
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum without(pod, instance, container, endpoint) (rate(ha_workflow_executions_total{status="failure",${buildFilter()}}[5m])) * 60`,
          )
          .legendFormat("Failure"),
      )
      .unit("ops/min")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 5, w: 12, h: 8 }),
  );

  // Failure Rate
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Failure Rate")
      .description("Percentage of failed executions")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `(sum without(pod, instance, container, endpoint) (rate(ha_workflow_executions_total{status="failure",${buildFilter()}}[15m])) / sum without(pod, instance, container, endpoint) (rate(ha_workflow_executions_total{${buildFilter()}}[15m]))) * 100`,
          )
          .legendFormat("Failure Rate"),
      )
      .unit("percent")
      .decimals(1)
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 10, color: "yellow" },
          { value: 50, color: "red" },
        ]),
      )
      .gridPos({ x: 12, y: 5, w: 12, h: 8 }),
  );

  // Execution Rate by Workflow
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Execution Rate by Workflow")
      .description("Executions per minute per workflow")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum without(pod, instance, container, endpoint) (rate(ha_workflow_executions_total{status="success",${buildFilter()}}[5m])) * 60`,
          )
          .legendFormat("__GRAFANA_TPL_START__workflow__GRAFANA_TPL_END__"),
      )
      .unit("ops/min")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 13, w: 24, h: 8 }),
  );

  // Row 3: Performance Metrics
  builder.withRow(new dashboard.RowBuilder("Performance Metrics"));

  // Execution Duration (Percentiles)
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Execution Duration (Percentiles)")
      .description("P50, P95, P99 execution duration")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `histogram_quantile(0.50, sum without(pod, instance, container, endpoint) (rate(ha_workflow_duration_seconds_bucket{${buildFilter()}}[5m])))`,
          )
          .legendFormat("P50"),
      )
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `histogram_quantile(0.95, sum without(pod, instance, container, endpoint) (rate(ha_workflow_duration_seconds_bucket{${buildFilter()}}[5m])))`,
          )
          .legendFormat("P95"),
      )
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `histogram_quantile(0.99, sum without(pod, instance, container, endpoint) (rate(ha_workflow_duration_seconds_bucket{${buildFilter()}}[5m])))`,
          )
          .legendFormat("P99"),
      )
      .unit("s")
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 60, color: "yellow" },
          { value: 300, color: "red" },
        ]),
      )
      .gridPos({ x: 0, y: 21, w: 12, h: 8 }),
  );

  // Average Execution Duration by Workflow
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Average Execution Duration by Workflow")
      .description("Mean execution time per workflow")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum without(pod, instance, container, endpoint) (rate(ha_workflow_duration_seconds_sum{${buildFilter()}}[5m])) / sum without(pod, instance, container, endpoint) (rate(ha_workflow_duration_seconds_count{${buildFilter()}}[5m]))`,
          )
          .legendFormat("__GRAFANA_TPL_START__workflow__GRAFANA_TPL_END__"),
      )
      .unit("s")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 12, y: 21, w: 12, h: 8 }),
  );

  // Row 4: Error Tracking
  builder.withRow(new dashboard.RowBuilder("Error Tracking"));

  // Error Rate by Type
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Error Rate by Type")
      .description("Errors per minute by error type")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum without(pod, instance, container, endpoint) (rate(ha_workflow_errors_total{${buildFilter()}}[5m])) * 60`,
          )
          .legendFormat("__GRAFANA_TPL_START__error_type__GRAFANA_TPL_END__"),
      )
      .unit("ops/min")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 29, w: 12, h: 8 }),
  );

  // Timeout Errors
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Timeout Errors")
      .description("Timeout errors per minute")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum without(pod, instance, container, endpoint) (rate(ha_workflow_errors_total{error_type="TimeoutError",${buildFilter()}}[5m])) * 60`,
          )
          .legendFormat("Timeout Errors"),
      )
      .unit("ops/min")
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 0.1, color: "yellow" },
          { value: 1, color: "red" },
        ]),
      )
      .gridPos({ x: 12, y: 29, w: 12, h: 8 }),
  );

  // Row 5: Scheduled Workflows
  builder.withRow(new dashboard.RowBuilder("Scheduled Workflows"));

  // Last Execution Timestamp
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Last Successful Execution")
      .description("Time since last successful execution (seconds ago)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `time() - max without(pod, instance, container, endpoint) (ha_workflow_last_success_timestamp_max{${buildFilter()}})`,
          )
          .legendFormat("__GRAFANA_TPL_START__workflow__GRAFANA_TPL_END__"),
      )
      .unit("s")
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 86400, color: "yellow" }, // 24 hours
          { value: 172800, color: "red" }, // 48 hours
        ]),
      )
      .gridPos({ x: 0, y: 37, w: 12, h: 8 }),
  );

  // Good Morning Workflows Status
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Good Morning Workflows Status")
      .description("Time since last execution (hours)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `(time() - max without(pod, instance, container, endpoint) (ha_workflow_last_success_timestamp_max{workflow=~"good_morning_.*"})) / 3600`,
          )
          .legendFormat("__GRAFANA_TPL_START__workflow__GRAFANA_TPL_END__"),
      )
      .unit("h")
      .decimals(1)
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 24, color: "yellow" },
          { value: 48, color: "red" },
        ]),
      )
      .gridPos({ x: 12, y: 37, w: 6, h: 4 }),
  );

  // Vacuum Workflow Status
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Vacuum Workflow Status")
      .description("Time since last execution (hours)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `(time() - max without(pod, instance, container, endpoint) (ha_workflow_last_success_timestamp_max{workflow="run_vacuum_if_not_home"})) / 3600`,
          )
          .legendFormat("Hours Since Last Run"),
      )
      .unit("h")
      .decimals(1)
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 24, color: "yellow" },
          { value: 48, color: "red" },
        ]),
      )
      .gridPos({ x: 18, y: 37, w: 6, h: 4 }),
  );

  // Row 6: Workflow Health Details
  builder.withRow(new dashboard.RowBuilder("Workflow Health Details"));

  // Total Executions by Workflow (24h)
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Total Executions by Workflow (24h)")
      .description("Cumulative executions over 24 hours")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum without(pod, instance, container, endpoint) (increase(ha_workflow_executions_total{status="success",${buildFilter()}}[24h]))`,
          )
          .legendFormat("__GRAFANA_TPL_START__workflow__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 45, w: 12, h: 8 }),
  );

  // Stuck Workflows Detection
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Stuck Workflows Detection")
      .description("Workflows running longer than 30 minutes")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum without(pod, instance, container, endpoint) (ha_workflows_in_progress{${buildFilter()}})`)
          .legendFormat("__GRAFANA_TPL_START__workflow__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 1, color: "yellow" },
          { value: 5, color: "red" },
        ]),
      )
      .gridPos({ x: 12, y: 45, w: 12, h: 8 }),
  );

  return builder.build();
}

/**
 * Exports the dashboard as JSON string for use in ConfigMaps or API calls
 */
export function exportHaWorkflowDashboardJson(): string {
  const dashboard = createHaWorkflowDashboard();
  return JSON.stringify(dashboard, null, 2);
}
