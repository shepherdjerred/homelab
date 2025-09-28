// Generated TypeScript types for postgres-operator Helm chart

export type PostgresoperatorHelmValuesImage = {
  registry?: string;
  repository?: string;
  tag?: string;
  pullPolicy?: string;
};

export type PostgresoperatorHelmValuesPodAnnotations = object;

export type PostgresoperatorHelmValuesPodLabels = object;

export type PostgresoperatorHelmValuesConfigGeneral = {
  enable_crd_registration?: boolean;
  crd_categories?: string[];
  enable_lazy_spilo_upgrade?: boolean;
  enable_pgversion_env_var?: boolean;
  enable_shm_volume?: boolean;
  enable_spilo_wal_path_compat?: boolean;
  enable_team_id_clustername_prefix?: boolean;
  etcd_host?: string;
  docker_image?: string;
  min_instances?: number;
  max_instances?: number;
  repair_period?: string;
  resync_period?: string;
  workers?: number;
  // manually added
  // this might not actually exist
  enable_cross_namespace_secret?: boolean;
};

export type PostgresoperatorHelmValuesConfigUsers = {
  enable_password_rotation?: boolean;
  password_rotation_interval?: number;
  password_rotation_user_retention?: number;
  replication_username?: string;
  super_username?: string;
};

export type PostgresoperatorHelmValuesConfigMajorVersionUpgrade = {
  major_version_upgrade_mode?: string;
  minimal_major_version?: string;
  target_major_version?: string;
};

export type PostgresoperatorHelmValuesConfigKubernetes = {
  cluster_domain?: string;
  cluster_labels?: PostgresoperatorHelmValuesConfigKubernetesClusterlabels;
  cluster_name_label?: string;
  enable_cross_namespace_secret?: boolean;
  enable_finalizers?: boolean;
  enable_init_containers?: boolean;
  enable_owner_references?: boolean;
  enable_persistent_volume_claim_deletion?: boolean;
  enable_pod_antiaffinity?: boolean;
  enable_pod_disruption_budget?: boolean;
  enable_readiness_probe?: boolean;
  enable_secrets_deletion?: boolean;
  enable_sidecars?: boolean;
  pdb_master_label_selector?: boolean;
  pdb_name_format?: string;
  persistent_volume_claim_retention_policy?: PostgresoperatorHelmValuesConfigKubernetesPersistentvolumeclaimretentionpolicy;
  pod_antiaffinity_preferred_during_scheduling?: boolean;
  pod_antiaffinity_topology_key?: string;
  pod_management_policy?: string;
  pod_role_label?: string;
  pod_terminate_grace_period?: string;
  secret_name_template?: string;
  share_pgsocket_with_sidecars?: boolean;
  spilo_privileged?: boolean;
  spilo_allow_privilege_escalation?: boolean;
  storage_resize_mode?: string;
  watched_namespace?: string;
};

export type PostgresoperatorHelmValuesConfigKubernetesClusterlabels = {
  application?: string;
};

export type PostgresoperatorHelmValuesConfigKubernetesPersistentvolumeclaimretentionpolicy =
  {
    when_deleted?: string;
    when_scaled?: string;
  };

export type PostgresoperatorHelmValuesConfigPostgresPodResources = {
  default_cpu_limit?: string;
  default_cpu_request?: string;
  default_memory_limit?: string;
  default_memory_request?: string;
  min_cpu_limit?: string;
  min_memory_limit?: string;
};

export type PostgresoperatorHelmValuesConfigTimeouts = {
  patroni_api_check_interval?: string;
  patroni_api_check_timeout?: string;
  pod_deletion_wait_timeout?: string;
  pod_label_wait_timeout?: string;
  ready_wait_interval?: string;
  ready_wait_timeout?: string;
  resource_check_interval?: string;
  resource_check_timeout?: string;
};

export type PostgresoperatorHelmValuesConfigLoadBalancer = {
  db_hosted_zone?: string;
  enable_master_load_balancer?: boolean;
  enable_master_pooler_load_balancer?: boolean;
  enable_replica_load_balancer?: boolean;
  enable_replica_pooler_load_balancer?: boolean;
  external_traffic_policy?: string;
  master_dns_name_format?: string;
  master_legacy_dns_name_format?: string;
  replica_dns_name_format?: string;
  replica_legacy_dns_name_format?: string;
};

export type PostgresoperatorHelmValuesConfigDebug = {
  debug_logging?: boolean;
  enable_database_access?: boolean;
};

export type PostgresoperatorHelmValuesConfigLoggingRestApi = {
  api_port?: number;
  cluster_history_entries?: number;
  ring_log_lines?: number;
};

export type PostgresoperatorHelmValuesConfigAwsOrGcp = {
  aws_region?: string;
  enable_ebs_gp3_migration?: boolean;
};

export type PostgresoperatorHelmValuesConfigLogicalBackup = {
  logical_backup_docker_image?: string;
  logical_backup_job_prefix?: string;
  logical_backup_provider?: string;
  logical_backup_s3_access_key_id?: string;
  logical_backup_s3_bucket?: string;
  logical_backup_s3_bucket_prefix?: string;
  logical_backup_s3_region?: string;
  logical_backup_s3_endpoint?: string;
  logical_backup_s3_secret_access_key?: string;
  logical_backup_s3_sse?: string;
  logical_backup_s3_retention_time?: string;
  logical_backup_schedule?: string;
  logical_backup_cronjob_environment_secret?: string;
};

export type PostgresoperatorHelmValuesConfigTeamsApi = {
  enable_admin_role_for_users?: boolean;
  enable_postgres_team_crd?: boolean;
  enable_postgres_team_crd_superusers?: boolean;
  enable_team_member_deprecation?: boolean;
  enable_team_superuser?: boolean;
  enable_teams_api?: boolean;
  pam_role_name?: string;
  postgres_superuser_teams?: string[];
  protected_role_names?: string[];
  role_deletion_suffix?: string;
  team_admin_role?: string;
  team_api_role_configuration?: PostgresoperatorHelmValuesConfigTeamsApiTeamapiroleconfiguration;
};

export type PostgresoperatorHelmValuesConfigTeamsApiTeamapiroleconfiguration = {
  log_statement?: string;
};

export type PostgresoperatorHelmValuesConfigConnectionPooler = {
  connection_pooler_schema?: string;
  connection_pooler_user?: string;
  connection_pooler_image?: string;
  connection_pooler_max_db_connections?: number;
  connection_pooler_mode?: string;
  connection_pooler_number_of_instances?: number;
  connection_pooler_default_cpu_request?: string;
  connection_pooler_default_memory_request?: string;
  connection_pooler_default_cpu_limit?: string;
  connection_pooler_default_memory_limit?: string;
};

export type PostgresoperatorHelmValuesConfigPatroni = {
  enable_patroni_failsafe_mode?: boolean;
};

export type PostgresoperatorHelmValuesRbac = {
  create?: boolean;
  createAggregateClusterRoles?: boolean;
};

export type PostgresoperatorHelmValuesServiceAccount = {
  create?: boolean;
  name?: unknown;
};

export type PostgresoperatorHelmValuesPodServiceAccount = {
  name?: string;
};

export type PostgresoperatorHelmValuesPodPriorityClassName = {
  create?: boolean;
  name?: string;
  priority?: number;
};

export type PostgresoperatorHelmValuesResources = {
  limits?: PostgresoperatorHelmValuesResourcesLimits;
  requests?: PostgresoperatorHelmValuesResourcesRequests;
};

export type PostgresoperatorHelmValuesResourcesLimits = {
  cpu?: string;
  memory?: string;
};

export type PostgresoperatorHelmValuesResourcesRequests = {
  cpu?: string;
  memory?: string;
};

export type PostgresoperatorHelmValuesSecurityContext = {
  runAsUser?: number;
  runAsNonRoot?: boolean;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
};

export type PostgresoperatorHelmValuesReadinessProbe = {
  initialDelaySeconds?: number;
  periodSeconds?: number;
};

export type PostgresoperatorHelmValuesAffinity = object;

export type PostgresoperatorHelmValuesNodeSelector = object;

export type PostgresoperatorHelmValuesControllerID = {
  create?: boolean;
  name?: unknown;
};

export type PostgresoperatorHelmValues = {
  image?: PostgresoperatorHelmValuesImage;
  podAnnotations?: PostgresoperatorHelmValuesPodAnnotations;
  podLabels?: PostgresoperatorHelmValuesPodLabels;
  configTarget?: string;
  enableJsonLogging?: boolean;
  configGeneral?: PostgresoperatorHelmValuesConfigGeneral;
  configUsers?: PostgresoperatorHelmValuesConfigUsers;
  configMajorVersionUpgrade?: PostgresoperatorHelmValuesConfigMajorVersionUpgrade;
  configKubernetes?: PostgresoperatorHelmValuesConfigKubernetes;
  configPostgresPodResources?: PostgresoperatorHelmValuesConfigPostgresPodResources;
  configTimeouts?: PostgresoperatorHelmValuesConfigTimeouts;
  configLoadBalancer?: PostgresoperatorHelmValuesConfigLoadBalancer;
  configDebug?: PostgresoperatorHelmValuesConfigDebug;
  configLoggingRestApi?: PostgresoperatorHelmValuesConfigLoggingRestApi;
  configAwsOrGcp?: PostgresoperatorHelmValuesConfigAwsOrGcp;
  configLogicalBackup?: PostgresoperatorHelmValuesConfigLogicalBackup;
  configTeamsApi?: PostgresoperatorHelmValuesConfigTeamsApi;
  configConnectionPooler?: PostgresoperatorHelmValuesConfigConnectionPooler;
  configPatroni?: PostgresoperatorHelmValuesConfigPatroni;
  enableStreams?: boolean;
  rbac?: PostgresoperatorHelmValuesRbac;
  serviceAccount?: PostgresoperatorHelmValuesServiceAccount;
  podServiceAccount?: PostgresoperatorHelmValuesPodServiceAccount;
  priorityClassName?: string;
  podPriorityClassName?: PostgresoperatorHelmValuesPodPriorityClassName;
  resources?: PostgresoperatorHelmValuesResources;
  securityContext?: PostgresoperatorHelmValuesSecurityContext;
  readinessProbe?: PostgresoperatorHelmValuesReadinessProbe;
  extraEnvs?: unknown[];
  affinity?: PostgresoperatorHelmValuesAffinity;
  nodeSelector?: PostgresoperatorHelmValuesNodeSelector;
  tolerations?: unknown[];
  controllerID?: PostgresoperatorHelmValuesControllerID;
};

export type PostgresoperatorHelmParameters = {
  "image.registry"?: string;
  "image.repository"?: string;
  "image.tag"?: string;
  "image.pullPolicy"?: string;
  configTarget?: string;
  enableJsonLogging?: string;
  "configGeneral.enable_crd_registration"?: string;
  "configGeneral.crd_categories"?: string;
  "configGeneral.enable_lazy_spilo_upgrade"?: string;
  "configGeneral.enable_pgversion_env_var"?: string;
  "configGeneral.enable_shm_volume"?: string;
  "configGeneral.enable_spilo_wal_path_compat"?: string;
  "configGeneral.enable_team_id_clustername_prefix"?: string;
  "configGeneral.etcd_host"?: string;
  "configGeneral.docker_image"?: string;
  "configGeneral.min_instances"?: string;
  "configGeneral.max_instances"?: string;
  "configGeneral.repair_period"?: string;
  "configGeneral.resync_period"?: string;
  "configGeneral.workers"?: string;
  "configUsers.enable_password_rotation"?: string;
  "configUsers.password_rotation_interval"?: string;
  "configUsers.password_rotation_user_retention"?: string;
  "configUsers.replication_username"?: string;
  "configUsers.super_username"?: string;
  "configMajorVersionUpgrade.major_version_upgrade_mode"?: string;
  "configMajorVersionUpgrade.minimal_major_version"?: string;
  "configMajorVersionUpgrade.target_major_version"?: string;
  "configKubernetes.cluster_domain"?: string;
  "configKubernetes.cluster_labels.application"?: string;
  "configKubernetes.cluster_name_label"?: string;
  "configKubernetes.enable_cross_namespace_secret"?: string;
  "configKubernetes.enable_finalizers"?: string;
  "configKubernetes.enable_init_containers"?: string;
  "configKubernetes.enable_owner_references"?: string;
  "configKubernetes.enable_persistent_volume_claim_deletion"?: string;
  "configKubernetes.enable_pod_antiaffinity"?: string;
  "configKubernetes.enable_pod_disruption_budget"?: string;
  "configKubernetes.enable_readiness_probe"?: string;
  "configKubernetes.enable_secrets_deletion"?: string;
  "configKubernetes.enable_sidecars"?: string;
  "configKubernetes.pdb_master_label_selector"?: string;
  "configKubernetes.pdb_name_format"?: string;
  "configKubernetes.persistent_volume_claim_retention_policy.when_deleted"?: string;
  "configKubernetes.persistent_volume_claim_retention_policy.when_scaled"?: string;
  "configKubernetes.pod_antiaffinity_preferred_during_scheduling"?: string;
  "configKubernetes.pod_antiaffinity_topology_key"?: string;
  "configKubernetes.pod_management_policy"?: string;
  "configKubernetes.pod_role_label"?: string;
  "configKubernetes.pod_terminate_grace_period"?: string;
  "configKubernetes.secret_name_template"?: string;
  "configKubernetes.share_pgsocket_with_sidecars"?: string;
  "configKubernetes.spilo_privileged"?: string;
  "configKubernetes.spilo_allow_privilege_escalation"?: string;
  "configKubernetes.storage_resize_mode"?: string;
  "configKubernetes.watched_namespace"?: string;
  "configPostgresPodResources.default_cpu_limit"?: string;
  "configPostgresPodResources.default_cpu_request"?: string;
  "configPostgresPodResources.default_memory_limit"?: string;
  "configPostgresPodResources.default_memory_request"?: string;
  "configPostgresPodResources.min_cpu_limit"?: string;
  "configPostgresPodResources.min_memory_limit"?: string;
  "configTimeouts.patroni_api_check_interval"?: string;
  "configTimeouts.patroni_api_check_timeout"?: string;
  "configTimeouts.pod_deletion_wait_timeout"?: string;
  "configTimeouts.pod_label_wait_timeout"?: string;
  "configTimeouts.ready_wait_interval"?: string;
  "configTimeouts.ready_wait_timeout"?: string;
  "configTimeouts.resource_check_interval"?: string;
  "configTimeouts.resource_check_timeout"?: string;
  "configLoadBalancer.db_hosted_zone"?: string;
  "configLoadBalancer.enable_master_load_balancer"?: string;
  "configLoadBalancer.enable_master_pooler_load_balancer"?: string;
  "configLoadBalancer.enable_replica_load_balancer"?: string;
  "configLoadBalancer.enable_replica_pooler_load_balancer"?: string;
  "configLoadBalancer.external_traffic_policy"?: string;
  "configLoadBalancer.master_dns_name_format"?: string;
  "configLoadBalancer.master_legacy_dns_name_format"?: string;
  "configLoadBalancer.replica_dns_name_format"?: string;
  "configLoadBalancer.replica_legacy_dns_name_format"?: string;
  "configDebug.debug_logging"?: string;
  "configDebug.enable_database_access"?: string;
  "configLoggingRestApi.api_port"?: string;
  "configLoggingRestApi.cluster_history_entries"?: string;
  "configLoggingRestApi.ring_log_lines"?: string;
  "configAwsOrGcp.aws_region"?: string;
  "configAwsOrGcp.enable_ebs_gp3_migration"?: string;
  "configLogicalBackup.logical_backup_docker_image"?: string;
  "configLogicalBackup.logical_backup_job_prefix"?: string;
  "configLogicalBackup.logical_backup_provider"?: string;
  "configLogicalBackup.logical_backup_s3_access_key_id"?: string;
  "configLogicalBackup.logical_backup_s3_bucket"?: string;
  "configLogicalBackup.logical_backup_s3_bucket_prefix"?: string;
  "configLogicalBackup.logical_backup_s3_region"?: string;
  "configLogicalBackup.logical_backup_s3_endpoint"?: string;
  "configLogicalBackup.logical_backup_s3_secret_access_key"?: string;
  "configLogicalBackup.logical_backup_s3_sse"?: string;
  "configLogicalBackup.logical_backup_s3_retention_time"?: string;
  "configLogicalBackup.logical_backup_schedule"?: string;
  "configLogicalBackup.logical_backup_cronjob_environment_secret"?: string;
  "configTeamsApi.enable_admin_role_for_users"?: string;
  "configTeamsApi.enable_postgres_team_crd"?: string;
  "configTeamsApi.enable_postgres_team_crd_superusers"?: string;
  "configTeamsApi.enable_team_member_deprecation"?: string;
  "configTeamsApi.enable_team_superuser"?: string;
  "configTeamsApi.enable_teams_api"?: string;
  "configTeamsApi.pam_role_name"?: string;
  "configTeamsApi.postgres_superuser_teams"?: string;
  "configTeamsApi.protected_role_names"?: string;
  "configTeamsApi.role_deletion_suffix"?: string;
  "configTeamsApi.team_admin_role"?: string;
  "configTeamsApi.team_api_role_configuration.log_statement"?: string;
  "configConnectionPooler.connection_pooler_schema"?: string;
  "configConnectionPooler.connection_pooler_user"?: string;
  "configConnectionPooler.connection_pooler_image"?: string;
  "configConnectionPooler.connection_pooler_max_db_connections"?: string;
  "configConnectionPooler.connection_pooler_mode"?: string;
  "configConnectionPooler.connection_pooler_number_of_instances"?: string;
  "configConnectionPooler.connection_pooler_default_cpu_request"?: string;
  "configConnectionPooler.connection_pooler_default_memory_request"?: string;
  "configConnectionPooler.connection_pooler_default_cpu_limit"?: string;
  "configConnectionPooler.connection_pooler_default_memory_limit"?: string;
  "configPatroni.enable_patroni_failsafe_mode"?: string;
  enableStreams?: string;
  "rbac.create"?: string;
  "rbac.createAggregateClusterRoles"?: string;
  "serviceAccount.create"?: string;
  "serviceAccount.name"?: string;
  "podServiceAccount.name"?: string;
  priorityClassName?: string;
  "podPriorityClassName.create"?: string;
  "podPriorityClassName.name"?: string;
  "podPriorityClassName.priority"?: string;
  "resources.limits.cpu"?: string;
  "resources.limits.memory"?: string;
  "resources.requests.cpu"?: string;
  "resources.requests.memory"?: string;
  "securityContext.runAsUser"?: string;
  "securityContext.runAsNonRoot"?: string;
  "securityContext.readOnlyRootFilesystem"?: string;
  "securityContext.allowPrivilegeEscalation"?: string;
  "readinessProbe.initialDelaySeconds"?: string;
  "readinessProbe.periodSeconds"?: string;
  extraEnvs?: string;
  tolerations?: string;
  "controllerID.create"?: string;
  "controllerID.name"?: string;
};
