import { App } from "cdk8s";
import { Chart } from "cdk8s";
import { createOnePasswordApp } from "../resources/argo-applications/1password.ts";
import { createArgoCdApp } from "../resources/argo-applications/argocd.ts";
import { createPrometheusApp } from "../resources/argo-applications/prometheus.ts";
import { createPrometheusAdapterApp } from "../resources/argo-applications/prometheus-adapter.ts";
import { createTailscaleApp } from "../resources/argo-applications/tailscale.ts";
import { createTorvaldsApp } from "../resources/argo-applications/torvalds.ts";
import { createIntelDevicePluginOperatorApp } from "../resources/argo-applications/intel-device-plugin-operator.ts";
import { createIntelGpuDevicePluginApp } from "../resources/argo-applications/intel-gpu-device-plugin.ts";
import { createCertManagerApp } from "../resources/argo-applications/cert-manager.ts";
import { createCloudflareOperatorApp } from "../resources/argo-applications/cloudflare-operator.ts";
import { createNfdApp } from "../resources/argo-applications/nfd.ts";
import { createGrafanaApp } from "../resources/argo-applications/grafana.ts";
import { createChartMuseumApp } from "../resources/argo-applications/chartmuseum.ts";
import { createMinecraftSjerredApp } from "../resources/argo-applications/minecraft-sjerred.ts";
import { createMinecraftShuxinApp } from "../resources/argo-applications/minecraft-shuxin.ts";
import { createMinecraftTsmcApp } from "../resources/argo-applications/minecraft-tsmc.ts";
import { createLokiApp } from "../resources/argo-applications/loki.ts";
import { createPromtailApp } from "../resources/argo-applications/promtail.ts";
import { createTempoApp } from "../resources/argo-applications/tempo.ts";
import { Namespace } from "cdk8s-plus-31";
import { createStorageClasses } from "../misc/storage-classes.ts";
import { createOpenEBSApp } from "../resources/argo-applications/openebs.ts";
import { createActionsRunnerControllerApp } from "../resources/argo-applications/actions-runner-controller.ts";
import { createDaggerApp } from "../resources/argo-applications/dagger.ts";
import { createVeleroApp } from "../resources/argo-applications/velero.ts";
import { createPostgresOperatorApp } from "../resources/argo-applications/postgres-operator.ts";
import { createCoderApp } from "../resources/argo-applications/coder.ts";
import { createSeaweedfsApp } from "../resources/argo-applications/seaweedfs.ts";
import { createKnativeOperatorApp } from "../resources/argo-applications/knative-operator.ts";
import { createKnativeServing } from "../resources/knative/serving.ts";
import { createAllGrafanaDashboards } from "../resources/grafana/index.ts";
import { createDependencySummaryCronJob } from "../resources/home/dependency-summary.ts";

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
  createPrometheusAdapterApp(chart);
  createIntelDevicePluginOperatorApp(chart);
  createIntelGpuDevicePluginApp(chart);
  createCertManagerApp(chart);
  createCloudflareOperatorApp(chart);
  createNfdApp(chart);
  createGrafanaApp(chart);
  createChartMuseumApp(chart);
  createMinecraftSjerredApp(chart);
  createMinecraftShuxinApp(chart);
  createMinecraftTsmcApp(chart);
  createLokiApp(chart);
  createPromtailApp(chart);
  createTempoApp(chart);
  createActionsRunnerControllerApp(chart);
  createDaggerApp(chart);
  createVeleroApp(chart);
  createPostgresOperatorApp(chart);
  createCoderApp(chart);
  createSeaweedfsApp(chart);
  createKnativeOperatorApp(chart);
  createKnativeServing(chart);
  // Create all Grafana dashboards (gitckup, ha-workflow, scout, smartctl, velero, zfs)
  createAllGrafanaDashboards(chart);

  // Weekly dependency summary email
  createDependencySummaryCronJob(chart);
}
