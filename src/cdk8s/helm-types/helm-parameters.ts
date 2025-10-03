import type { ArgocdHelmValues } from "./helm/argo-cd.types";
import type { CertmanagerHelmValues } from "./helm/cert-manager.types";
import type { ChartmuseumHelmValues } from "./helm/chartmuseum.types";
import type { ConnectHelmValues } from "./helm/connect.types";
import type { InteldevicepluginsoperatorHelmValues } from "./helm/intel-device-plugins-operator.types";
import type { KubeprometheusstackHelmValues } from "./helm/kube-prometheus-stack.types";
import type { LokiHelmValues } from "./helm/loki.types";
import type { MinecraftHelmValues } from "./helm/minecraft.types";
import type { NodefeaturediscoveryHelmValues } from "./helm/node-feature-discovery.types";
import type { OpenebsHelmValues } from "./helm/openebs.types";
import type { PostgresoperatorHelmValues } from "./helm/postgres-operator.types";
import type { PromtailHelmValues } from "./helm/promtail.types";
import type { TailscaleoperatorHelmValues } from "./helm/tailscale-operator.types";
import type { VeleroHelmValues } from "./helm/velero.types";

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

export type HelmValuesForChart<TChart extends keyof HelmChartValuesMap> = HelmChartValuesMap[TChart];
