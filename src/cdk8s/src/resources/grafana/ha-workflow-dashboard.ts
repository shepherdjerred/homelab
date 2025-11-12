import { Chart } from "cdk8s";
import { ConfigMap } from "cdk8s-plus-31";
import { exportHaWorkflowDashboardJson } from "../../../grafana/ha-workflow-dashboard.ts";

/**
 * Creates a Kubernetes ConfigMap containing the HA Workflow Grafana dashboard
 * The ConfigMap will be automatically discovered by Grafana's sidecar container
 * and provisioned into Grafana
 */
export function createHaWorkflowDashboardConfigMap(chart: Chart) {
  const dashboardJson = exportHaWorkflowDashboardJson();

  // Create ConfigMap with the dashboard JSON
  new ConfigMap(chart, "ha-workflow-dashboard-configmap", {
    metadata: {
      name: "ha-workflow-dashboard",
      namespace: "prometheus",
      labels: {
        // Required labels for Grafana sidecar discovery
        grafana_dashboard: "1",
        app: "grafana",
      },
    },
    data: {
      "ha-workflow.json": dashboardJson,
    },
  });
}
