// Generated TypeScript types for invidious Helm chart

export type InvidiousHelmValuesImage = {
  /**
   * @default "quay.io/invidious/invidious"
   */
  repository?: string;
  /**
   * @default "latest"
   */
  tag?: string;
  /**
   * @default "Always"
   */
  pullPolicy?: string;
};

export type InvidiousHelmValuesAutoscaling = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default 1
   */
  minReplicas?: number;
  /**
   * @default 16
   */
  maxReplicas?: number;
  /**
   * @default 50
   */
  targetCPUUtilizationPercentage?: number;
};

export type InvidiousHelmValuesService = {
  /**
   * @default "ClusterIP"
   */
  type?: string;
  /**
   * @default 3000
   */
  port?: number;
};

export type InvidiousHelmValuesIngress = {
  /**
   * @default false
   */
  enabled?: boolean;
  /**
   * @default ""
   */
  className?: string;
  /**
   * kubernetes.io/ingress.class: nginx
   * kubernetes.io/tls-acme: "true"
   *
   * @default {}
   */
  annotations?: InvidiousHelmValuesIngressAnnotations;
  hosts?: InvidiousHelmValuesIngressHostsElement[];
  tls?: unknown[];
};

export type InvidiousHelmValuesIngressAnnotations = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
};

export type InvidiousHelmValuesIngressHostsElement = {
  /**
   * @default "chart-example.local"
   */
  host?: string;
  paths?: InvidiousHelmValuesIngressHostsPathsElement[];
};

export type InvidiousHelmValuesIngressHostsPathsElement = {
  /**
   * @default "/"
   */
  path?: string;
  /**
   * @default "ImplementationSpecific"
   */
  pathType?: string;
};

export type InvidiousHelmValuesResources = object;

export type InvidiousHelmValuesDeploymentLabels = object;

export type InvidiousHelmValuesPodSecurityContext = {
  /**
   * @default 1000
   */
  runAsUser?: number;
  /**
   * @default 1000
   */
  runAsGroup?: number;
  /**
   * @default 1000
   */
  fsGroup?: number;
};

export type InvidiousHelmValuesSecurityContext = {
  /**
   * @default false
   */
  allowPrivilegeEscalation?: boolean;
  /**
   * @default {"drop":["ALL"]}
   */
  capabilities?: InvidiousHelmValuesSecurityContextCapabilities;
};

export type InvidiousHelmValuesSecurityContextCapabilities = {
  drop?: string[];
};

export type InvidiousHelmValuesNodeSelector = object;

export type InvidiousHelmValuesAffinity = object;

export type InvidiousHelmValuesPostgresql = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {"tag":16}
   */
  image?: InvidiousHelmValuesPostgresqlImage;
  /**
   * @default {"username":"kemal","password":"kemal","database":"invidious"}
   */
  auth?: InvidiousHelmValuesPostgresqlAuth;
};

export type InvidiousHelmValuesPostgresqlImage = {
  /**
   * @default 16
   */
  tag?: number;
};

export type InvidiousHelmValuesPostgresqlAuth = {
  /**
   * @default "kemal"
   */
  username?: string;
  /**
   * @default "kemal"
   */
  password?: string;
  /**
   * @default "invidious"
   */
  database?: string;
};

export type InvidiousHelmValuesConfig = {
  /**
   * This type allows arbitrary additional properties beyond those defined below.
   * This is common for config maps, custom settings, and extensible configurations.
   */
  [key: string]: unknown;
  /**
   * @default {...} (5 keys)
   */
  db?: InvidiousHelmValuesConfigDb;
  /**
   * @default 3000
   */
  port?: number;
  /**
   * @default ""
   */
  domain?: string;
  /**
   * @default false
   */
  https_only?: boolean;
  /**
   * @default 1
   */
  channel_threads?: number;
  /**
   * @default false
   */
  full_refresh?: boolean;
  /**
   * @default 1
   */
  feed_threads?: number;
};

export type InvidiousHelmValuesConfigDb = {
  /**
   * @default "kemal"
   */
  user?: string;
  /**
   * @default "kemal"
   */
  password?: string;
  /**
   * @default ""
   */
  host?: string;
  /**
   * @default 5432
   */
  port?: number;
  /**
   * @default "invidious"
   */
  dbname?: string;
};

export type InvidiousHelmValuesSighelper = {
  /**
   * @default true
   */
  enabled?: boolean;
  /**
   * @default {}
   */
  resources?: InvidiousHelmValuesSighelperResources;
  /**
   * @default {"port":12999}
   */
  service?: InvidiousHelmValuesSighelperService;
  /**
   * @default {"repository":"quay.io/invidious/inv-sig-helper","tag":"latest","pullPolicy":"Always"}
   */
  image?: InvidiousHelmValuesSighelperImage;
  env?: unknown[];
};

export type InvidiousHelmValuesSighelperResources = object;

export type InvidiousHelmValuesSighelperService = {
  /**
   * @default 12999
   */
  port?: number;
};

export type InvidiousHelmValuesSighelperImage = {
  /**
   * @default "quay.io/invidious/inv-sig-helper"
   */
  repository?: string;
  /**
   * @default "latest"
   */
  tag?: string;
  /**
   * @default "Always"
   */
  pullPolicy?: string;
};

export type InvidiousHelmValues = {
  /**
   * @default "invidious"
   */
  name?: string;
  /**
   * @default {"repository":"quay.io/invidious/invidious","tag":"latest","pullPolicy":"Always"}
   */
  image?: InvidiousHelmValuesImage;
  imagePullSecrets?: unknown[];
  /**
   * @default ""
   */
  nameOverride?: string;
  /**
   * @default ""
   */
  fullnameOverride?: string;
  /**
   * Setting replicaCount higher than 1 may cause PostgreSQL database deadlocks.
   * This happens when multiple Invidious processes simultaneously attempt to refresh channel subscriptions for users.
   *
   * @default 1
   */
  replicaCount?: number;
  /**
   * @default {...} (4 keys)
   */
  autoscaling?: InvidiousHelmValuesAutoscaling;
  /**
   * @default {"type":"ClusterIP","port":3000}
   */
  service?: InvidiousHelmValuesService;
  /**
   * @default {...} (5 keys)
   */
  ingress?: InvidiousHelmValuesIngress;
  /**
   * - chart-example.local
   *
   * @default {}
   */
  resources?: InvidiousHelmValuesResources;
  /**
   * @default {}
   */
  deploymentLabels?: InvidiousHelmValuesDeploymentLabels;
  /**
   * @default {"runAsUser":1000,"runAsGroup":1000,"fsGroup":1000}
   */
  podSecurityContext?: InvidiousHelmValuesPodSecurityContext;
  /**
   * @default {"allowPrivilegeEscalation":false,"capabilities":{"drop":["ALL"]}}
   */
  securityContext?: InvidiousHelmValuesSecurityContext;
  /**
   * @default {}
   */
  nodeSelector?: InvidiousHelmValuesNodeSelector;
  tolerations?: unknown[];
  /**
   * @default {}
   */
  affinity?: InvidiousHelmValuesAffinity;
  /**
   * Reference: https://github.com/bitnami/charts/tree/main/bitnami/postgresql
   *
   * @default {"enabled":true,"image":{"tag":16},"auth":{"username":"kemal","password":"kemal","database":"invidious"}}
   */
  postgresql?: InvidiousHelmValuesPostgresql;
  /**
   * Reference: https://github.com/iv-org/invidious/blob/master/config/config.example.yml
   *
   * @default {...} (7 keys)
   */
  config?: InvidiousHelmValuesConfig;
  env?: unknown[];
  /**
   * @default {...} (5 keys)
   */
  sighelper?: InvidiousHelmValuesSighelper;
};

export type InvidiousHelmParameters = {
  name?: string;
  "image.repository"?: string;
  "image.tag"?: string;
  "image.pullPolicy"?: string;
  imagePullSecrets?: string;
  nameOverride?: string;
  fullnameOverride?: string;
  replicaCount?: string;
  "autoscaling.enabled"?: string;
  "autoscaling.minReplicas"?: string;
  "autoscaling.maxReplicas"?: string;
  "autoscaling.targetCPUUtilizationPercentage"?: string;
  "service.type"?: string;
  "service.port"?: string;
  "ingress.enabled"?: string;
  "ingress.className"?: string;
  "ingress.hosts.host"?: string;
  "ingress.hosts.paths.path"?: string;
  "ingress.hosts.paths.pathType"?: string;
  "ingress.tls"?: string;
  "podSecurityContext.runAsUser"?: string;
  "podSecurityContext.runAsGroup"?: string;
  "podSecurityContext.fsGroup"?: string;
  "securityContext.allowPrivilegeEscalation"?: string;
  "securityContext.capabilities.drop"?: string;
  tolerations?: string;
  "postgresql.enabled"?: string;
  "postgresql.image.tag"?: string;
  "postgresql.auth.username"?: string;
  "postgresql.auth.password"?: string;
  "postgresql.auth.database"?: string;
  "config.db.user"?: string;
  "config.db.password"?: string;
  "config.db.host"?: string;
  "config.db.port"?: string;
  "config.db.dbname"?: string;
  "config.port"?: string;
  "config.domain"?: string;
  "config.https_only"?: string;
  "config.channel_threads"?: string;
  "config.full_refresh"?: string;
  "config.feed_threads"?: string;
  env?: string;
  "sighelper.enabled"?: string;
  "sighelper.service.port"?: string;
  "sighelper.image.repository"?: string;
  "sighelper.image.tag"?: string;
  "sighelper.image.pullPolicy"?: string;
  "sighelper.env"?: string;
};
