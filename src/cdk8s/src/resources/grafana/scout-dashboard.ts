import { Chart } from "cdk8s";
import { ConfigMap } from "cdk8s-plus-31";
import { exportScoutDashboardJson } from "../../../grafana/scout-dashboard.ts";

/**
 * Creates a Kubernetes ConfigMap containing the Scout for LoL Grafana dashboard
 * The ConfigMap will be automatically discovered by Grafana's sidecar container
 * and provisioned into Grafana
 */
export function createScoutDashboardConfigMap(chart: Chart) {
  const dashboardJson = exportScoutDashboardJson();

  // Create ConfigMap with the dashboard JSON
  new ConfigMap(chart, "scout-dashboard-configmap", {
    metadata: {
      name: "scout-for-lol-dashboard",
      namespace: "prometheus",
      labels: {
        // Required labels for Grafana sidecar discovery
        grafana_dashboard: "1",
        app: "grafana",
      },
    },
    data: {
      "scout-for-lol.json": dashboardJson,
    },
  });
}
