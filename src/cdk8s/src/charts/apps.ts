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
import { createGrafanaApp } from "../apps/grafana.ts";
import { createChartMuseumApp } from "../apps/chartmuseum.ts";
import { createMinecraftApp } from "../apps/minecraft.ts";
import { createLokiApp } from "../apps/loki.ts";
import { createPromtailApp } from "../apps/promtail.ts";
import { Namespace } from "cdk8s-plus-31";
import { createStorageClasses } from "../storageclasses.ts";
import { createOpenEBSApp } from "../apps/openebs.ts";
import { createActionsRunnerControllerApp } from "../apps/actions-runner-controller.ts";
import { createDaggerApp } from "../apps/dagger.ts";
import { createVeleroApp } from "../apps/velero.ts";
import { createPostgresOperatorApp } from "../apps/postgres-operator.ts";

export async function createAppsChart(app: App) {
  const chart = new Chart(app, "apps", {
    namespace: "argocd",
    disableResourceNameHashes: true,
  });

  createStorageClasses(chart);

  new Namespace(chart, `maintenance-namespace`, {
    metadata: {
      name: `maintenance`,
      labels: {
        "pod-security.kubernetes.io/audit": "restricted",
      },
    },
  });

  new Namespace(chart, `devpod-namespace`, {
    metadata: {
      name: `devpod`,
      labels: {
        "pod-security.kubernetes.io/audit": "privileged",
        "pod-security.kubernetes.io/enforce": "privileged",
        "pod-security.kubernetes.io/warn": "privileged",
      },
    },
  });

  createOpenEBSApp(chart);
  createOnePasswordApp(chart);
  createArgoCdApp(chart);
  createTailscaleApp(chart);
  createTorvaldsApp(chart);
  await createPrometheusApp(chart);
  createIntelDevicePluginOperatorApp(chart);
  createIntelGpuDevicePluginApp(chart);
  createCertManagerApp(chart);
  createNfdApp(chart);
  createGrafanaApp(chart);
  createChartMuseumApp(chart);
  createMinecraftApp(chart);
  createLokiApp(chart);
  createPromtailApp(chart);
  createActionsRunnerControllerApp(chart);
  createDaggerApp(chart);
  createVeleroApp(chart);
  createPostgresOperatorApp(chart);
}
