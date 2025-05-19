import { App } from "cdk8s";
import { Chart } from "cdk8s";
import { createOnePasswordApp } from "../apps/1password.ts";
import { createArgoCdApp } from "../apps/argocd.ts";
import { createPrometheusApp } from "../apps/prometheus.ts";
import { createTailscaleApp } from "../apps/tailscale.ts";
import { createTorvaldsApp } from "../apps/torvalds.ts";
import { createIntelDevicePluginOperatorApp } from "../apps/intel-device-plugin-operator.ts";
import { createIntelGpuDevicePluginApp } from "../apps/intel-gpu-device-plugin.ts";
import { createCertManagerApp } from "../apps/cert-manager.ts";
import { createNfdApp } from "../apps/nfd.ts";
import { createJenkinsApp } from "../apps/jenkins.ts";
import { createGrafanaApp } from "../apps/grafana.ts";
import { createChartMuseumApp } from "../apps/chartmuseum.ts";
import { createMinecraftApp } from "../apps/minecraft.ts";
import { createLokiApp } from "../apps/loki.ts";
import { createPromtailApp } from "../apps/promtail.ts";
import { Namespace } from "cdk8s-plus";

export function createAppsChart(app: App) {
  const chart = new Chart(app, "apps", {
    namespace: "argocd",
    disableResourceNameHashes: true,
  });

  

  new Namespace(chart, `scout-beta-namespace`, {
    metadata: {
      name: `scout-beta`,
    },
  });

  new Namespace(chart, `scout-prod-namespace`, {
    metadata: {
      name: `scout-prod`,
    },
  });

  createOnePasswordApp(chart);
  createArgoCdApp(chart);
  createTailscaleApp(chart);
  createTorvaldsApp(chart);
  createPrometheusApp(chart);
  createIntelDevicePluginOperatorApp(chart);
  createIntelGpuDevicePluginApp(chart);
  createCertManagerApp(chart);
  createNfdApp(chart);
  createJenkinsApp(chart);
  createGrafanaApp(chart);
  createChartMuseumApp(chart);
  createMinecraftApp(chart);
  createLokiApp(chart);
  createPromtailApp(chart);
}
