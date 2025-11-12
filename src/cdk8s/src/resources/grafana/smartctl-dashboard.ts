import { Chart } from "cdk8s";
import { ConfigMap } from "cdk8s-plus-31";
import { exportSmartctlDashboardJson } from "../../../grafana/smartctl-dashboard.ts";

/**
 * Creates a Kubernetes ConfigMap containing the SMART Monitoring Grafana dashboard
 * The ConfigMap will be automatically discovered by Grafana's sidecar container
 * and provisioned into Grafana
 */
export function createSmartctlDashboardConfigMap(chart: Chart) {
  const dashboardJson = exportSmartctlDashboardJson();

  // Create ConfigMap with the dashboard JSON
  new ConfigMap(chart, "smartctl-dashboard-configmap", {
    metadata: {
      name: "smartctl-dashboard",
      namespace: "prometheus",
      labels: {
        // Required labels for Grafana sidecar discovery
        grafana_dashboard: "1",
        app: "grafana",
      },
    },
    data: {
      "smartctl.json": dashboardJson,
    },
  });
}
