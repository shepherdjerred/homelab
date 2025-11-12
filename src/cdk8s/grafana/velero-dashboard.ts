import * as dashboard from "@grafana/grafana-foundation-sdk/dashboard";
import * as common from "@grafana/grafana-foundation-sdk/common";
import * as timeseries from "@grafana/grafana-foundation-sdk/timeseries";
import * as stat from "@grafana/grafana-foundation-sdk/stat";
import * as prometheus from "@grafana/grafana-foundation-sdk/prometheus";

/**
 * Creates a Grafana dashboard for Velero backup monitoring
 * Shows backup health, storage size, and what is/isn't backed up
 */
export function createVeleroDashboard() {
  // Create Prometheus datasource reference
  const prometheusDatasource = {
    type: "prometheus",
    uid: "Prometheus",
  };

  // Create schedule variable for filtering
  const scheduleVariable = new dashboard.QueryVariableBuilder("schedule")
    .label("Schedule")
    .query('label_values(velero_backup_attempt_total{schedule!=""}, schedule)')
    .datasource(prometheusDatasource)
    .multi(true)
    .includeAll(true)
    .allValue(".*");

  // Create namespace variable for storage monitoring
  const namespaceVariable = new dashboard.QueryVariableBuilder("namespace")
    .label("Namespace")
    .query("label_values(kube_persistentvolumeclaim_resource_requests_storage_bytes, namespace)")
    .datasource(prometheusDatasource)
    .multi(true)
    .includeAll(true)
    .allValue(".*");

  // Helper function to build filter expression
  const buildScheduleFilter = () => {
    return 'schedule=~"$schedule"';
  };

  const buildNamespaceFilter = () => {
    return 'namespace=~"$namespace"';
  };

  // Build the main dashboard
  const builder = new dashboard.DashboardBuilder("Velero - Backup Monitoring")
    .uid("velero-dashboard")
    .tags(["velero", "backup", "storage", "kubernetes"])
    .time({ from: "now-7d", to: "now" })
    .refresh("30s")
    .timezone("browser")
    .editable()
    .withVariable(scheduleVariable)
    .withVariable(namespaceVariable);

  // Row 1: Backup Health Overview
  builder.withRow(new dashboard.RowBuilder("Backup Health Overview"));

  // Backup Success Rate by Schedule
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Backup Success Rate")
      .description("Percentage of successful backups per schedule")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `(sum by (schedule) (increase(velero_backup_success_total{${buildScheduleFilter()}}[7d])) / sum by (schedule) (increase(velero_backup_attempt_total{${buildScheduleFilter()}}[7d]))) * 100`,
          )
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
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
      .gridPos({ x: 0, y: 1, w: 6, h: 4 }),
  );

  // Total Backup Attempts (7 days)
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Total Backup Attempts (7d)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (schedule) (increase(velero_backup_attempt_total{${buildScheduleFilter()}}[7d]))`)
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 6, y: 1, w: 6, h: 4 }),
  );

  // Total Successful Backups (7 days)
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Successful Backups (7d)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (schedule) (increase(velero_backup_success_total{${buildScheduleFilter()}}[7d]))`)
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 12, y: 1, w: 6, h: 4 }),
  );

  // Total Failed Backups (7 days)
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Failed Backups (7d)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (schedule) (increase(velero_backup_failure_total{${buildScheduleFilter()}}[7d]))`)
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 1, color: "yellow" },
          { value: 5, color: "red" },
        ]),
      )
      .gridPos({ x: 18, y: 1, w: 6, h: 4 }),
  );

  // Row 2: Schedule Status
  builder.withRow(new dashboard.RowBuilder("Schedule Status"));

  // Last Successful Backup Time
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Last Successful Backup")
      .description("Time since last successful backup per schedule")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`time() - velero_backup_last_successful_timestamp{${buildScheduleFilter()}}`)
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
      )
      .unit("s")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.None)
      .gridPos({ x: 0, y: 5, w: 6, h: 4 }),
  );

  // Total Backup Items
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Total Backup Items")
      .description("Total items backed up per schedule")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`velero_backup_items_total{${buildScheduleFilter()}}`)
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 6, y: 5, w: 6, h: 4 }),
  );

  // Backup Item Errors
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Backup Item Errors")
      .description("Number of items with errors per schedule")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`velero_backup_items_errors{${buildScheduleFilter()}}`)
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 1, color: "yellow" },
          { value: 5, color: "red" },
        ]),
      )
      .gridPos({ x: 12, y: 5, w: 6, h: 4 }),
  );

  // Backup Success Status (Current)
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Current Backup Status")
      .description("1 = Success in last hour, 0 = No success")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`(sum by (schedule) (increase(velero_backup_success_total{${buildScheduleFilter()}}[1h])) > 0)`)
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
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
      .gridPos({ x: 18, y: 5, w: 6, h: 4 }),
  );

  // Row 3: Backup Performance
  builder.withRow(new dashboard.RowBuilder("Backup Performance"));

  // Backup Duration (95th percentile)
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Backup Duration (95th percentile)")
      .description("Time taken for backups to complete")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `histogram_quantile(0.95, sum(rate(velero_backup_duration_seconds_bucket{${buildScheduleFilter()}}[5m])) by (schedule, le))`,
          )
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
      )
      .unit("s")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 13, w: 12, h: 8 }),
  );

  // Backup Success Rate Over Time
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Backup Success Rate Over Time")
      .description("Percentage of successful backups")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `(sum by (schedule) (rate(velero_backup_success_total{${buildScheduleFilter()}}[5m])) / sum by (schedule) (rate(velero_backup_attempt_total{${buildScheduleFilter()}}[5m]))) * 100`,
          )
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
      )
      .unit("percent")
      .decimals(1)
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "red" },
          { value: 95, color: "yellow" },
          { value: 99, color: "green" },
        ]),
      )
      .gridPos({ x: 12, y: 13, w: 12, h: 8 }),
  );

  // Backup Attempt Rate
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Backup Attempt Rate")
      .description("Number of backup attempts per hour")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum by (schedule) (rate(velero_backup_attempt_total{${buildScheduleFilter()}}[5m])) * 3600`)
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
      )
      .unit("ops/hr")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 21, w: 12, h: 8 }),
  );

  // Backup Item Error Rate
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Backup Item Error Rate")
      .description("Percentage of backup items with errors")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `(sum by (schedule) (velero_backup_items_errors{${buildScheduleFilter()}}) / sum by (schedule) (velero_backup_items_total{${buildScheduleFilter()}})) * 100`,
          )
          .legendFormat("__GRAFANA_TPL_START__schedule__GRAFANA_TPL_END__"),
      )
      .unit("percent")
      .decimals(2)
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 1, color: "yellow" },
          { value: 5, color: "red" },
        ]),
      )
      .gridPos({ x: 12, y: 21, w: 12, h: 8 }),
  );

  // Row 4: Storage Size Monitoring
  builder.withRow(new dashboard.RowBuilder("Storage Size Monitoring"));

  // Total Backup Eligible Storage
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Total Backup Eligible Storage")
      .description("Total size of PVCs marked for backup")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{label_velero_io_backup="enabled",${buildNamespaceFilter()}})`,
          )
          .legendFormat("Total"),
      )
      .unit("bytes")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 0, y: 29, w: 6, h: 4 }),
  );

  // Backup Eligible Storage by Namespace
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Backup Eligible Storage by Namespace")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum by (namespace) (kube_persistentvolumeclaim_resource_requests_storage_bytes{label_velero_io_backup="enabled",${buildNamespaceFilter()}})`,
          )
          .legendFormat("__GRAFANA_TPL_START__namespace__GRAFANA_TPL_END__"),
      )
      .unit("bytes")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 6, y: 29, w: 6, h: 4 }),
  );

  // Total Storage (All PVCs)
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Total Storage (All PVCs)")
      .description("Total size of all PVCs in cluster")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{${buildNamespaceFilter()}})`)
          .legendFormat("Total"),
      )
      .unit("bytes")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 12, y: 29, w: 6, h: 4 }),
  );

  // Backup Coverage Percentage
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Backup Coverage")
      .description("Percentage of storage covered by backups")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `(sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{label_velero_io_backup="enabled",${buildNamespaceFilter()}}) / sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{${buildNamespaceFilter()}})) * 100`,
          )
          .legendFormat("Coverage"),
      )
      .unit("percent")
      .decimals(1)
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.None)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "red" },
          { value: 50, color: "yellow" },
          { value: 80, color: "green" },
        ]),
      )
      .gridPos({ x: 18, y: 29, w: 6, h: 4 }),
  );

  // Storage Size Over Time
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Backup Eligible Storage Over Time")
      .description("Total size of volumes eligible for backup")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{label_velero_io_backup="enabled",${buildNamespaceFilter()}})`,
          )
          .legendFormat("Total Eligible"),
      )
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{${buildNamespaceFilter()}})`)
          .legendFormat("Total All PVCs"),
      )
      .unit("bytes")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 0, y: 33, w: 12, h: 8 }),
  );

  // Storage by Namespace Over Time
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Storage by Namespace Over Time")
      .description("Storage size by namespace (backup eligible vs all)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum by (namespace) (kube_persistentvolumeclaim_resource_requests_storage_bytes{label_velero_io_backup="enabled",${buildNamespaceFilter()}})`,
          )
          .legendFormat("__GRAFANA_TPL_START__namespace__GRAFANA_TPL_END__ (Backup Eligible)"),
      )
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum by (namespace) (kube_persistentvolumeclaim_resource_requests_storage_bytes{${buildNamespaceFilter()}})`,
          )
          .legendFormat("__GRAFANA_TPL_START__namespace__GRAFANA_TPL_END__ (All)"),
      )
      .unit("bytes")
      .lineWidth(2)
      .fillOpacity(10)
      .gridPos({ x: 12, y: 33, w: 12, h: 8 }),
  );

  // Row 5: What is/isn't Backed Up
  builder.withRow(new dashboard.RowBuilder("Backup Coverage Analysis"));

  // Storage Not Backed Up
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Storage Not Backed Up")
      .description("Total size of PVCs without velero.io/backup label")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{label_velero_io_backup!="enabled",${buildNamespaceFilter()}})`,
          )
          .legendFormat("Not Backed Up"),
      )
      .unit("bytes")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 0, y: 41, w: 6, h: 4 }),
  );

  // Storage Backed Up
  builder.withPanel(
    new stat.PanelBuilder()
      .title("Storage Backed Up")
      .description("Total size of PVCs with velero.io/backup=enabled label")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{label_velero_io_backup="enabled",${buildNamespaceFilter()}})`,
          )
          .legendFormat("Backed Up"),
      )
      .unit("bytes")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.Area)
      .gridPos({ x: 6, y: 41, w: 6, h: 4 }),
  );

  // Number of PVCs Not Backed Up
  builder.withPanel(
    new stat.PanelBuilder()
      .title("PVCs Not Backed Up")
      .description("Count of PVCs without backup label")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `count(kube_persistentvolumeclaim_resource_requests_storage_bytes{label_velero_io_backup!="enabled",${buildNamespaceFilter()}})`,
          )
          .legendFormat("Count"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.None)
      .gridPos({ x: 12, y: 41, w: 6, h: 4 }),
  );

  // Number of PVCs Backed Up
  builder.withPanel(
    new stat.PanelBuilder()
      .title("PVCs Backed Up")
      .description("Count of PVCs with backup label")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `count(kube_persistentvolumeclaim_resource_requests_storage_bytes{label_velero_io_backup="enabled",${buildNamespaceFilter()}})`,
          )
          .legendFormat("Count"),
      )
      .unit("short")
      .colorMode(common.BigValueColorMode.Value)
      .graphMode(common.BigValueGraphMode.None)
      .gridPos({ x: 18, y: 41, w: 6, h: 4 }),
  );

  // Row 6: Backup Operations
  builder.withRow(new dashboard.RowBuilder("Backup Operations"));

  // Backup Deletion Success Rate
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Backup Deletion Success Rate")
      .description("Rate of successful backup deletions (old backups cleanup)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(
            `(sum(rate(velero_backup_deletion_success_total[5m])) / sum(rate(velero_backup_deletion_attempt_total[5m]))) * 100`,
          )
          .legendFormat("Success Rate"),
      )
      .unit("percent")
      .decimals(1)
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "red" },
          { value: 95, color: "yellow" },
          { value: 99, color: "green" },
        ]),
      )
      .gridPos({ x: 0, y: 49, w: 12, h: 8 }),
  );

  // Backup Deletion Failures
  builder.withPanel(
    new timeseries.PanelBuilder()
      .title("Backup Deletion Failures")
      .description("Rate of backup deletion failures (may cause storage exhaustion)")
      .datasource(prometheusDatasource)
      .withTarget(
        new prometheus.DataqueryBuilder()
          .expr(`sum(rate(velero_backup_deletion_failure_total[5m]))`)
          .legendFormat("Deletion Failures"),
      )
      .unit("ops")
      .lineWidth(2)
      .fillOpacity(10)
      .thresholds(
        new dashboard.ThresholdsConfigBuilder().mode(dashboard.ThresholdsMode.Absolute).steps([
          { value: 0, color: "green" },
          { value: 0.01, color: "yellow" },
          { value: 0.1, color: "red" },
        ]),
      )
      .gridPos({ x: 12, y: 49, w: 12, h: 8 }),
  );

  return builder.build();
}

/**
 * Exports the dashboard as JSON string for use in ConfigMaps or API calls
 */
export function exportVeleroDashboardJson(): string {
  const dashboard = createVeleroDashboard();
  return JSON.stringify(dashboard, null, 2);
}
