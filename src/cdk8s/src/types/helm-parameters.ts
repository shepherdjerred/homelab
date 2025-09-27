// Type-safe Helm parameters based on chart selection
// This file provides conditional types to ensure proper typing of helm values based on the chart name

import type {
  ArgocdHelmValues,
  CertmanagerHelmValues,
  ChartmuseumHelmValues,
  ConnectHelmValues,
  InteldevicepluginsoperatorHelmValues,
  KubeprometheusstackHelmValues,
  LokiHelmValues,
  MinecraftHelmValues,
  NodefeaturediscoveryHelmValues,
  OpenebsHelmValues,
  PostgresoperatorHelmValues,
  PromtailHelmValues,
  TailscaleoperatorHelmValues,
  VeleroHelmValues,
} from "./helm/index.js";

/**
 * Literal types for all available Helm charts
 */
export type HelmChartName =
  | "argo-cd"
  | "cert-manager"
  | "chartmuseum"
  | "connect"
  | "intel-device-plugins-operator"
  | "kube-prometheus-stack"
  | "loki"
  | "minecraft"
  | "node-feature-discovery"
  | "openebs"
  | "postgres-operator"
  | "promtail"
  | "tailscale-operator"
  | "velero";

/**
 * Conditional type that maps chart names to their corresponding Helm values types
 */
export type HelmValuesForChart<TChart extends HelmChartName> =
  TChart extends "argo-cd"
    ? ArgocdHelmValues
    : TChart extends "cert-manager"
      ? CertmanagerHelmValues
      : TChart extends "chartmuseum"
        ? ChartmuseumHelmValues
        : TChart extends "connect"
          ? ConnectHelmValues
          : TChart extends "intel-device-plugins-operator"
            ? InteldevicepluginsoperatorHelmValues
            : TChart extends "kube-prometheus-stack"
              ? KubeprometheusstackHelmValues
              : TChart extends "loki"
                ? LokiHelmValues
                : TChart extends "minecraft"
                  ? MinecraftHelmValues
                  : TChart extends "node-feature-discovery"
                    ? NodefeaturediscoveryHelmValues
                    : TChart extends "openebs"
                      ? OpenebsHelmValues
                      : TChart extends "postgres-operator"
                        ? PostgresoperatorHelmValues
                        : TChart extends "promtail"
                          ? PromtailHelmValues
                          : TChart extends "tailscale-operator"
                            ? TailscaleoperatorHelmValues
                            : TChart extends "velero"
                              ? VeleroHelmValues
                              : never;

/**
 * Type-safe Helm configuration object for ArgoCD Application specs
 */
export type TypedHelmConfig<TChart extends HelmChartName> = {
  valuesObject?: HelmValuesForChart<TChart>;
  values?: string;
  valueFiles?: string[];
  parameters?: { name: string; value: string; forceString?: boolean }[];
  releaseName?: string;
  version?: string;
  passCredentials?: boolean;
  ignoreMissingValueFiles?: boolean;
  skipCrds?: boolean;
};

/**
 * Type-safe ArgoCD Application source configuration with typed Helm values
 */
export type TypedApplicationSource<TChart extends HelmChartName> =
  | {
      repoUrl: string;
      chart: TChart;
      targetRevision: string;
      helm?: TypedHelmConfig<TChart>;
      path?: never; // Ensure chart and path are mutually exclusive
    }
  | {
      repoUrl: string;
      path: string;
      targetRevision: string;
      helm?: TypedHelmConfig<TChart>;
      chart?: never; // Ensure chart and path are mutually exclusive
    };

/**
 * Utility type to extract chart name from a chart URL or identifier
 */
export type ExtractChartName<T extends string> = T extends HelmChartName
  ? T
  : never;

/**
 * Helper function to create type-safe Helm configurations
 */
export function createTypedHelmConfig<TChart extends HelmChartName>(
  chart: TChart,
  config: TypedHelmConfig<TChart>,
): TypedHelmConfig<TChart> {
  return config;
}

/**
 * Helper function to create type-safe ArgoCD Application source with Helm
 */
export function createTypedApplicationSource<TChart extends HelmChartName>(
  chart: TChart,
  source: Omit<TypedApplicationSource<TChart>, "chart"> & { chart?: TChart },
): TypedApplicationSource<TChart> {
  return {
    ...source,
    chart,
  } as TypedApplicationSource<TChart>;
}

/**
 * Validation function to ensure chart name matches expected type
 */
export function validateChartName<TChart extends HelmChartName>(
  chartName: string,
  expectedChart: TChart,
): chartName is TChart {
  return chartName === expectedChart;
}

/**
 * Type guard to check if a chart name is valid
 */
export function isValidChartName(
  chartName: string,
): chartName is HelmChartName {
  const validCharts: HelmChartName[] = [
    "argo-cd",
    "cert-manager",
    "chartmuseum",
    "connect",
    "intel-device-plugins-operator",
    "kube-prometheus-stack",
    "loki",
    "minecraft",
    "node-feature-discovery",
    "openebs",
    "postgres-operator",
    "promtail",
    "tailscale-operator",
    "velero",
  ];

  return validCharts.includes(chartName as HelmChartName);
}

// Type examples and demonstrations:

/**
 * Example usage with literal chart names - provides full type safety
 */
export type ExamplePrometheusConfig =
  HelmValuesForChart<"kube-prometheus-stack">;
export type ExampleArgoConfig = HelmValuesForChart<"argo-cd">;
export type ExampleLokiConfig = HelmValuesForChart<"loki">;

/**
 * Example of creating a typed function that accepts any chart with its values
 */
export function createHelmApplication<TChart extends HelmChartName>(
  chartName: TChart,
  values: HelmValuesForChart<TChart>,
  repoUrl: string,
  targetRevision: string,
) {
  return {
    source: {
      repoUrl,
      chart: chartName,
      targetRevision,
      helm: {
        valuesObject: values,
      },
    },
  };
}
