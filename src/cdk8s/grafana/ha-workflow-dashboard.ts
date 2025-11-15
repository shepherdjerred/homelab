import * as dashboard from "@grafana/grafana-foundation-sdk/dashboard";
import * as common from "@grafana/grafana-foundation-sdk/common";
import * as timeseries from "@grafana/grafana-foundation-sdk/timeseries";
import * as stat from "@grafana/grafana-foundation-sdk/stat";
import * as prometheus from "@grafana/grafana-foundation-sdk/prometheus";
import { exportDashboardWithHelmEscaping } from "./dashboard-export.ts";

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

  const createStatPanel = (
    title: string,
    description: string,
    query: string,
    legend: string,
    gridPos: dashboard.GridPos,
    unit: string,
    decimals?: number,
    graphMode: common.BigValueGraphMode = common.BigValueGraphMode.Area,
  ) => {
    const panel = new stat.PanelBuilder()
      .title(title)
      .description(description)
      .datasource(prometheusDatasource)
      .withTarget(new prometheus.DataqueryBuilder().expr(query).legendFormat(legend))
      .unit(unit)
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(graphMode)
      .gridPos(gridPos);

    if (decimals !== undefined) {
      panel.decimals(decimals);
    }

    return panel;
  };

  // Row 1: Overview Stats
  builder.withRow(new dashboard.RowBuilder("Overview"));

  // Total Executions (24h)
  builder.withPanel(
    createStatPanel(
      "Total Executions (24h)",
      "Total workflow executions in the last 24 hours",
      `sum without(pod, instance, container, endpoint) (increase(ha_workflow_executions_total{${buildFilter()}}[24h]))`,
      "{{workflow}}",
      // TODO: make these taller bc we have lots of workflows
      { x: 0, y: 1, w: 6, h: 4 },
      "short",
    ),
  );

  // Success Rate
  builder.withPanel(
    createStatPanel(
      "Success Rate (24h)",
      "Percentage of successful executions",
      `(sum without(pod, instance, container, endpoint) (increase(ha_workflow_executions_total{status="success",${buildFilter()}}[24h])) / sum without(pod, instance, container, endpoint) (increase(ha_workflow_executions_total{${buildFilter()}}[24h]))) * 100`,
      "{{workflow}}",
      { x: 6, y: 1, w: 6, h: 4 },
      "percent",
      1,
    ).thresholds(
      new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
        { value: 0, color: "red" },
        { value: 95, color: "yellow" },
        { value: 99, color: "green" },
      ]),
    ),
  );

  // Workflows In Progress
  builder.withPanel(
    createStatPanel(
      "Workflows In Progress",
      "Currently running workflows",
      `sum without(pod, instance, container, endpoint) (ha_workflows_in_progress{${buildFilter()}})`,
      "{{workflow}}",
      { x: 12, y: 1, w: 6, h: 4 },
      "short",
      undefined,
      common.BigValueGraphMode.None,
    ).thresholds(
      new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
        { value: 0, color: "green" },
        { value: 1, color: "yellow" },
        { value: 5, color: "red" },
      ]),
    ),
  );

  // Application Uptime
  builder.withPanel(
    createStatPanel(
      "Application Uptime",
      "Time since last restart",
      `max(ha_uptime_seconds)`,
      "Uptime",
      { x: 18, y: 1, w: 3, h: 4 },
      "s",
    ),
  );

  // Row 2: Execution Metrics
  builder.withRow(new dashboard.RowBuilder("Execution Metrics"));

  // Total Failures per Workflow
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Total Failures per Workflow")
      .description("Number of failed executions per workflow (1 hour rolling window)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum without(pod, instance, container, endpoint) (increase(ha_workflow_executions_total{status="failure",${buildFilter()}}[1h]))`,
          )
          .legendFormat("{{workflow}}"),
      )
      .unit("short")
      .decimals(0)
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 1, color: "yellow" },
          { value: 5, color: "red" },
        ]),
      )
      .gridPos({ x: 12, y: 5, w: 12, h: 8 }),
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
          .legendFormat("{{workflow}}"),
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
          .legendFormat("{{error_type}}"),
      )
      .unit("ops/min")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 29, w: 12, h: 8 }),
  );

  // Row 5: Scheduled Workflows
  builder.withRow(new dashboard.RowBuilder("Scheduled Workflows"));

  // Last Execution Timestamp
  builder.withPanel(
    createStatPanel(
      "Last Successful Execution",
      "Time since last successful execution (seconds ago)",
      `time() - max without(pod, instance, container, endpoint) (ha_workflow_last_success_timestamp_max{${buildFilter()}})`,
      "{{workflow}}",
      { x: 0, y: 37, w: 12, h: 8 },
      "s",
      0,
    ).thresholds(
      new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
        { value: 0, color: "green" },
        { value: 86400, color: "yellow" }, // 24 hours
        { value: 172800, color: "red" }, // 48 hours
      ]),
    ),
  );

  // Row 6: Workflow Health Details
  builder.withRow(new dashboard.RowBuilder("Workflow Health Details"));

  // Total Executions by Workflow
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Total Executions by Workflow")
      .description("Cumulative successful executions since last application restart")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum without(pod, instance, container, endpoint) (ha_workflow_executions_total{status="success",${buildFilter()}})`,
          )
          .legendFormat("{{workflow}}"),
      )
      .unit("short")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 45, w: 12, h: 8 }),
  );

  // Workflows Currently In Progress
  builder.withPanel(
    createStatPanel(
      "Workflows In Progress",
      "Currently executing workflows (may indicate stuck workflows if persistently non-zero)",
      `sum without(pod, instance, container, endpoint) (ha_workflows_in_progress{${buildFilter()}})`,
      "{{workflow}}",
      { x: 12, y: 45, w: 12, h: 8 },
      "short",
      0,
    ).thresholds(
      new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
        { value: 0, color: "green" },
        { value: 1, color: "yellow" },
        { value: 5, color: "red" },
      ]),
    ),
  );

  return builder.build();
}

/**
 * Exports the dashboard as JSON string for use in ConfigMaps or API calls
 */
export function exportHaWorkflowDashboardJson(): string {
  const dashboard = createHaWorkflowDashboard();
  return exportDashboardWithHelmEscaping(dashboard);
}
