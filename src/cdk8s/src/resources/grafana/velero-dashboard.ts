import { Chart } from "cdk8s";
import { ConfigMap } from "cdk8s-plus-31";
import { exportVeleroDashboardJson } from "../../../grafana/velero-dashboard.ts";

/**
 * Creates a Kubernetes ConfigMap containing the Velero Grafana dashboard
 * The ConfigMap will be automatically discovered by Grafana's sidecar container
 * and provisioned into Grafana
 */
export function createVeleroDashboardConfigMap(chart: Chart) {
  const dashboardJson = exportVeleroDashboardJson();

  // Create ConfigMap with the dashboard JSON
  new ConfigMap(chart, "velero-dashboard-configmap", {
    metadata: {
      name: "velero-dashboard",
      namespace: "prometheus",
      labels: {
        // Required labels for Grafana sidecar discovery
        grafana_dashboard: "1",
        app: "grafana",
      },
    },
    data: {
      "velero.json": dashboardJson,
    },
  });
}
