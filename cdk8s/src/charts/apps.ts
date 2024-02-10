import { App } from "npm:cdk8s";
import { Chart } from "npm:cdk8s";
import { createOnePasswordApp } from "../apps/1password.ts";
import { createArgoCdApp } from "../apps/argocd.ts";
import { createImmichApp } from "../apps/immich.ts";
import { createPrometheusApp } from "../apps/prometheus.ts";
import { createTailscaleApp } from "../apps/tailscale.ts";
import { createLamportApp } from "../apps/lamport.ts";
import { createIntelDevicePluginOperatorApp } from "../apps/intel-device-plugin-operator.ts";
import { createIntelGpuDevicePluginApp } from "../apps/intel-gpu-device-plugin.ts";
import { createCertManagerApp } from "../apps/cert-manager.ts";
import { createNfdApp } from "../apps/nfd.ts";
import { createMinioApp } from "../apps/minio.ts";
import { createSystemUpgradeControllerApp } from "../apps/system-upgrade-controller.ts";

export function createAppsChart(app: App) {
  const chart = new Chart(app, "apps", {
    namespace: "argocd",
    disableResourceNameHashes: true,
  });

  createOnePasswordApp(chart);
  createArgoCdApp(chart);
  createTailscaleApp(chart);
  createLamportApp(chart);
  createImmichApp(chart);
  createPrometheusApp(chart);
  createIntelDevicePluginOperatorApp(chart);
  createIntelGpuDevicePluginApp(chart);
  createCertManagerApp(chart);
  createNfdApp(chart);
  createMinioApp(chart);
  createSystemUpgradeControllerApp(chart);
}
