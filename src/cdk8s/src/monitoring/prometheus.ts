import { PrometheusRule } from "../../imports/monitoring.coreos.com";
import { Chart } from "cdk8s";
import { getHomeAssistantRuleGroups } from "./rules/homeassistant";
import { getVeleroRuleGroups } from "./rules/velero";
import { getArgoCDRuleGroups } from "./rules/argocd";

export function createPrometheusMonitoring(chart: Chart) {
  // Create Home Assistant rules
  new PrometheusRule(chart, "prometheus-homeassistant-rules", {
    metadata: {
      name: "prometheus-homeassistant-rules",
      namespace: "torvalds",
      labels: { release: "prometheus" },
    },
    spec: {
      groups: getHomeAssistantRuleGroups(),
    },
  });

  // Create Velero rules
  new PrometheusRule(chart, "prometheus-velero-rules", {
    metadata: {
      name: "prometheus-velero-rules",
      namespace: "velero",
      labels: { release: "prometheus" },
    },
    spec: {
      groups: getVeleroRuleGroups(),
    },
  });

  // Create Argo CD rules
  new PrometheusRule(chart, "prometheus-argocd-rules", {
    metadata: {
      name: "prometheus-argocd-rules",
      namespace: "argocd",
      labels: { release: "prometheus" },
    },
    spec: {
      groups: getArgoCDRuleGroups(),
    },
  });
}
