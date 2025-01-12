import { App } from "cdk8s";
import { Chart } from "cdk8s";
import { createOnePasswordApp } from "../apps/1password.ts";
import { createArgoCdApp } from "../apps/argocd.ts";
import { createPrometheusApp } from "../apps/prometheus.ts";
import { createTailscaleApp } from "../apps/tailscale.ts";
import { createLamportApp } from "../apps/lamport.ts";
import { createIntelDevicePluginOperatorApp } from "../apps/intel-device-plugin-operator.ts";
import { createIntelGpuDevicePluginApp } from "../apps/intel-gpu-device-plugin.ts";
import { createCertManagerApp } from "../apps/cert-manager.ts";
import { createNfdApp } from "../apps/nfd.ts";
import { createSystemUpgradeControllerApp } from "../apps/system-upgrade-controller.ts";
import { createJenkinsApp } from "../apps/jenkins.ts";
import { createVolsyncApp } from "../apps/volsync.ts";
import { createExternalSnapshotterCrdsApp } from "../apps/external-snapshotter-crds.ts";
import { createAppIngresses } from "../apps/ingresses.ts";
import { createGrafanaApp } from "../apps/grafana.ts";
import { createChartMuseumApp } from "../apps/chartmuseum.ts";
import { createMinecraftApp } from "../apps/minecraft.ts";
import { createLokiApp } from "../apps/loki.ts";
import { createPromtailApp } from "../apps/promtail.ts";

export function createAppsChart(app: App) {
  const chart = new Chart(app, "apps", {
    namespace: "argocd",
    disableResourceNameHashes: true,
  });

  createOnePasswordApp(chart);
  createArgoCdApp(chart);
  createTailscaleApp(chart);
  createLamportApp(chart);
  createPrometheusApp(chart);
  createIntelDevicePluginOperatorApp(chart);
  createIntelGpuDevicePluginApp(chart);
  createCertManagerApp(chart);
  createNfdApp(chart);
  createSystemUpgradeControllerApp(chart);
  createJenkinsApp(chart);
  createVolsyncApp(chart);
  createExternalSnapshotterCrdsApp(chart);
  createAppIngresses(chart);
  createGrafanaApp(chart);
  createChartMuseumApp(chart);
  createMinecraftApp(chart);
  createLokiApp(chart);
  createPromtailApp(chart);
}
