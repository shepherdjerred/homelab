import { Chart } from "cdk8s";
import { ConfigMap } from "cdk8s-plus-31";
import { exportGitckupDashboardJson } from "../../../grafana/gitckup-dashboard.ts";

/**
 * Creates a Kubernetes ConfigMap containing the Gitckup Grafana dashboard
 * The ConfigMap will be automatically discovered by Grafana's sidecar container
 * and provisioned into Grafana
 */
export function createGitckupDashboardConfigMap(chart: Chart) {
  const dashboardJson = exportGitckupDashboardJson();

  // Create ConfigMap with the dashboard JSON
  new ConfigMap(chart, "gitckup-dashboard-configmap", {
    metadata: {
      name: "gitckup-dashboard",
      namespace: "prometheus",
      labels: {
        // Required labels for Grafana sidecar discovery
        grafana_dashboard: "1",
        app: "grafana",
      },
    },
    data: {
      "gitckup.json": dashboardJson,
    },
  });
}
