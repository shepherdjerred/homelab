import { App } from "npm:cdk8s";
import { Chart } from "npm:cdk8s";
import { createOnePasswordApp } from "../apps/1password.ts";
import { createArgoCdApp } from "../apps/argocd.ts";
import { createImmichApp } from "../apps/immich.ts";
import { createPrometheusApp } from "../apps/prometheus.ts";
import { createTailscaleApp } from "../apps/tailscale.ts";
import { createLamportApp } from "../apps/lamport.ts";

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
}
