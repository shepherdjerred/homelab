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

type HelmChartValuesMap = {
  "argo-cd": ArgocdHelmValues;
  "cert-manager": CertmanagerHelmValues;
  chartmuseum: ChartmuseumHelmValues;
  connect: ConnectHelmValues;
  "intel-device-plugins-operator": InteldevicepluginsoperatorHelmValues;
  "kube-prometheus-stack": KubeprometheusstackHelmValues;
  loki: LokiHelmValues;
  minecraft: MinecraftHelmValues;
  "node-feature-discovery": NodefeaturediscoveryHelmValues;
  openebs: OpenebsHelmValues;
  "postgres-operator": PostgresoperatorHelmValues;
  promtail: PromtailHelmValues;
  "tailscale-operator": TailscaleoperatorHelmValues;
  velero: VeleroHelmValues;
};

export type HelmValuesForChart<TChart extends keyof HelmChartValuesMap> =
  HelmChartValuesMap[TChart];
