import { PrometheusRule } from "../../../../generated/imports/monitoring.coreos.com";
import { Chart } from "cdk8s";
import { getHomeAssistantRuleGroups } from "./rules/homeassistant";
import { getVeleroRuleGroups } from "./rules/velero";
import { getArgoCDRuleGroups } from "./rules/argocd";
import { getResourceMonitoringRuleGroups } from "./rules/resource-monitoring";
import { getZfsMonitoringRuleGroups } from "./rules/zfs";
import { getSmartctlRuleGroups } from "./rules/smartctl";

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

  // Create Resource Monitoring rules
  new PrometheusRule(chart, "prometheus-resource-monitoring-rules", {
    metadata: {
      name: "prometheus-resource-monitoring-rules",
      namespace: "torvalds",
      labels: { release: "prometheus" },
    },
    spec: {
      groups: getResourceMonitoringRuleGroups(),
    },
  });

  // Create ZFS Monitoring rules
  new PrometheusRule(chart, "prometheus-zfs-monitoring-rules", {
    metadata: {
      name: "prometheus-zfs-monitoring-rules",
      namespace: "torvalds",
      labels: { release: "prometheus" },
    },
    spec: {
      groups: getZfsMonitoringRuleGroups(),
    },
  });

  new PrometheusRule(chart, "prometheus-smartctl-rules", {
    metadata: {
      name: "prometheus-smartctl-rules",
      namespace: "prometheus",
      labels: { release: "prometheus" },
    },
    spec: {
      groups: getSmartctlRuleGroups(),
    },
  });
}
