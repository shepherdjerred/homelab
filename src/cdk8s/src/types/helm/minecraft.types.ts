// Generated TypeScript types for minecraft Helm chart

export type MinecraftHelmValuesImage = {
  repository?: string;
  tag?: string;
  pullPolicy?: string;
  pullSecret?: string;
};

export type MinecraftHelmValuesResources = {
  requests?: MinecraftHelmValuesResourcesRequests;
};

export type MinecraftHelmValuesResourcesRequests = {
  memory?: string;
  cpu?: string;
};

export type MinecraftHelmValuesLifecycle = {
  postStart?: unknown[];
  preStop?: unknown[];
};

export type MinecraftHelmValuesNodeSelector = object;

export type MinecraftHelmValuesAffinity = object;

export type MinecraftHelmValuesPodSecurityContext = {
  runAsUser?: number;
  runAsGroup?: number;
  runAsNonRoot?: boolean;
  fsGroup?: number;
  seccompProfile?: MinecraftHelmValuesPodSecurityContextSeccompProfile;
};

export type MinecraftHelmValuesPodSecurityContextSeccompProfile = {
  type?: string;
};

export type MinecraftHelmValuesSecurityContext = {
  capabilities?: MinecraftHelmValuesSecurityContextCapabilities;
  readOnlyRootFilesystem?: boolean;
  allowPrivilegeEscalation?: boolean;
};

export type MinecraftHelmValuesSecurityContextCapabilities = {
  drop?: string[];
};

export type MinecraftHelmValuesLivenessProbe = {
  command?: string[];
  initialDelaySeconds?: number;
  periodSeconds?: number;
  failureThreshold?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type MinecraftHelmValuesReadinessProbe = {
  command?: string[];
  initialDelaySeconds?: number;
  periodSeconds?: number;
  failureThreshold?: number;
  successThreshold?: number;
  timeoutSeconds?: number;
};

export type MinecraftHelmValuesStartupProbe = {
  command?: string[];
  enabled?: boolean;
  failureThreshold?: number;
  periodSeconds?: number;
};

export type MinecraftHelmValuesExtraPodSpec = object;

export type MinecraftHelmValuesMinecraftServer = {
  eula?: string;
  version?: string;
  type?: string;
  forgeVersion?: unknown;
  forgeInstallerUrl?: unknown;
  spongeVersion?: unknown;
  bukkitDownloadUrl?: unknown;
  spigotDownloadUrl?: unknown;
  paperDownloadUrl?: unknown;
  ftbModpackId?: unknown;
  ftbModpackVersionId?: unknown;
  cfServerMod?: unknown;
  fabricLauncherVersion?: unknown;
  fabricLoaderVersion?: unknown;
  ftbLegacyJavaFixer?: string;
  difficulty?: string;
  whitelist?: unknown;
  ops?: unknown;
  icon?: unknown;
  maxPlayers?: string;
  maxWorldSize?: string;
  allowNether?: string;
  announcePlayerAchievements?: string;
  enableCommandBlock?: string;
  forcegameMode?: string;
  generateStructures?: string;
  hardcore?: string;
  maxBuildHeight?: string;
  maxTickTime?: string;
  spawnAnimals?: string;
  spawnMonsters?: string;
  spawnNPCs?: string;
  spawnProtection?: string;
  viewDistance?: string;
  levelSeed?: unknown;
  gameMode?: string;
  motd?: string;
  pvp?: string;
  levelType?: string;
  generatorSettings?: unknown;
  worldSaveName?: string;
  downloadWorldUrl?: unknown;
  forceReDownload?: boolean;
  downloadModpackUrl?: unknown;
  removeOldMods?: boolean;
  vanillaTweaksShareCodes?: unknown[];
  resourcePackUrl?: unknown;
  resourcePackSha?: unknown;
  resourcePackEnforce?: boolean;
  onlineMode?: string;
  enforceSecureProfile?: string;
  memory?: string;
  jvmOpts?: string;
  jvmXXOpts?: string;
  overrideServerProperties?: string;
  serviceAnnotations?: MinecraftHelmValuesMinecraftServerServiceAnnotations;
  serviceType?: string;
  nodePort?: unknown;
  servicePort?: number;
  clusterIP?: unknown;
  loadBalancerClass?: unknown;
  loadBalancerIP?: unknown;
  externalIPs?: unknown;
  modUrls?: unknown[];
  pluginUrls?: unknown[];
  spigetResources?: unknown[];
  extraServiceSpec?: MinecraftHelmValuesMinecraftServerExtraServiceSpec;
  modrinth?: MinecraftHelmValuesMinecraftServerModrinth;
  autoCurseForge?: MinecraftHelmValuesMinecraftServerAutoCurseForge;
  rcon?: MinecraftHelmValuesMinecraftServerRcon;
  tty?: boolean;
  extraPorts?: unknown[];
  query?: MinecraftHelmValuesMinecraftServerQuery;
};

export type MinecraftHelmValuesMinecraftServerServiceAnnotations = object;

export type MinecraftHelmValuesMinecraftServerExtraServiceSpec = object;

export type MinecraftHelmValuesMinecraftServerModrinth = {
  projects?: unknown[];
  downloadDependencies?: string;
  allowedVersionType?: string;
};

export type MinecraftHelmValuesMinecraftServerAutoCurseForge = {
  apiKey?: MinecraftHelmValuesMinecraftServerAutoCurseForgeApiKey;
  pageUrl?: string;
  slug?: string;
  fileId?: string;
  filenameMatcher?: string;
  excludeMods?: unknown[];
  includeMods?: unknown[];
  excludeIncludeFile?: unknown;
  forceSynchronize?: boolean;
  setLevelFrom?: string;
  parallelDownloads?: number;
  overridesSkipExisting?: boolean;
};

export type MinecraftHelmValuesMinecraftServerAutoCurseForgeApiKey = {
  key?: string;
  existingSecret?: string;
  secretKey?: string;
};

export type MinecraftHelmValuesMinecraftServerRcon = {
  enabled?: boolean;
  withGeneratedPassword?: boolean;
  port?: number;
  password?: string;
  existingSecret?: unknown;
  secretKey?: string;
  serviceType?: string;
  nodePort?: unknown;
  clusterIP?: unknown;
  loadBalancerClass?: unknown;
  loadBalancerIP?: unknown;
};

export type MinecraftHelmValuesMinecraftServerQuery = {
  enabled?: boolean;
  port?: number;
};

export type MinecraftHelmValuesExtraEnv = object;

export type MinecraftHelmValuesPersistence = {
  labels?: MinecraftHelmValuesPersistenceLabels;
  annotations?: MinecraftHelmValuesPersistenceAnnotations;
  dataDir?: MinecraftHelmValuesPersistenceDataDir;
};

export type MinecraftHelmValuesPersistenceLabels = object;

export type MinecraftHelmValuesPersistenceAnnotations = object;

export type MinecraftHelmValuesPersistenceDataDir = {
  enabled?: boolean;
  Size?: string;
  accessModes?: string[];
};

export type MinecraftHelmValuesPodAnnotations = object;

export type MinecraftHelmValuesPodLabels = object;

export type MinecraftHelmValuesDeploymentAnnotations = object;

export type MinecraftHelmValuesDeploymentLabels = object;

export type MinecraftHelmValuesServiceAnnotations = object;

export type MinecraftHelmValuesServiceLabels = object;

export type MinecraftHelmValuesRconServiceAnnotations = object;

export type MinecraftHelmValuesRconServiceLabels = object;

export type MinecraftHelmValuesMcbackup = {
  enabled?: boolean;
  image?: MinecraftHelmValuesMcbackupImage;
  initialDelay?: string;
  backupInterval?: string;
  pauseIfNoPlayers?: string;
  pruneBackupsDays?: number;
  rconRetries?: number;
  rconRetryInterval?: string;
  excludes?: string;
  backupMethod?: string;
  destDir?: string;
  linkLatest?: string;
  compressMethod?: string;
  zstdParameters?: string;
  rcloneRemote?: unknown;
  rcloneDestDir?: unknown;
  rcloneCompressMethod?: string;
  rcloneConfig?: unknown;
  resticRepository?: string;
  resticAdditionalTags?: string;
  pruneResticRetention?: string;
  resticEnvs?: MinecraftHelmValuesMcbackupResticEnvs;
  extraEnv?: MinecraftHelmValuesMcbackupExtraEnv;
  envFrom?: unknown[];
  resources?: MinecraftHelmValuesMcbackupResources;
  persistence?: MinecraftHelmValuesMcbackupPersistence;
};

export type MinecraftHelmValuesMcbackupImage = {
  repository?: string;
  tag?: string;
  pullPolicy?: string;
};

export type MinecraftHelmValuesMcbackupResticEnvs = object;

export type MinecraftHelmValuesMcbackupExtraEnv = object;

export type MinecraftHelmValuesMcbackupResources = {
  requests?: MinecraftHelmValuesMcbackupResourcesRequests;
};

export type MinecraftHelmValuesMcbackupResourcesRequests = {
  memory?: string;
  cpu?: string;
};

export type MinecraftHelmValuesMcbackupPersistence = {
  annotations?: MinecraftHelmValuesMcbackupPersistenceAnnotations;
  backupDir?: MinecraftHelmValuesMcbackupPersistenceBackupDir;
};

export type MinecraftHelmValuesMcbackupPersistenceAnnotations = object;

export type MinecraftHelmValuesMcbackupPersistenceBackupDir = {
  enabled?: boolean;
  Size?: string;
  accessModes?: string[];
};

export type MinecraftHelmValues = {
  image?: MinecraftHelmValuesImage;
  replicaCount?: number;
  nameOverride?: string;
  fullnameOverride?: string;
  resources?: MinecraftHelmValuesResources;
  lifecycle?: MinecraftHelmValuesLifecycle;
  workloadAsStatefulSet?: boolean;
  strategyType?: string;
  nodeSelector?: MinecraftHelmValuesNodeSelector;
  tolerations?: unknown[];
  affinity?: MinecraftHelmValuesAffinity;
  revisionHistoryLimit?: number;
  podSecurityContext?: MinecraftHelmValuesPodSecurityContext;
  securityContext?: MinecraftHelmValuesSecurityContext;
  livenessProbe?: MinecraftHelmValuesLivenessProbe;
  readinessProbe?: MinecraftHelmValuesReadinessProbe;
  startupProbe?: MinecraftHelmValuesStartupProbe;
  initContainers?: unknown[];
  sidecarContainers?: unknown[];
  extraVolumes?: unknown[];
  extraDeploy?: unknown[];
  extraPodSpec?: MinecraftHelmValuesExtraPodSpec;
  minecraftServer?: MinecraftHelmValuesMinecraftServer;
  extraEnv?: MinecraftHelmValuesExtraEnv;
  envFrom?: unknown[];
  persistence?: MinecraftHelmValuesPersistence;
  podAnnotations?: MinecraftHelmValuesPodAnnotations;
  podLabels?: MinecraftHelmValuesPodLabels;
  deploymentAnnotations?: MinecraftHelmValuesDeploymentAnnotations;
  deploymentLabels?: MinecraftHelmValuesDeploymentLabels;
  serviceAnnotations?: MinecraftHelmValuesServiceAnnotations;
  serviceLabels?: MinecraftHelmValuesServiceLabels;
  rconServiceAnnotations?: MinecraftHelmValuesRconServiceAnnotations;
  rconServiceLabels?: MinecraftHelmValuesRconServiceLabels;
  mcbackup?: MinecraftHelmValuesMcbackup;
};

export type MinecraftHelmParameters = {
  "image.repository"?: string;
  "image.tag"?: string;
  "image.pullPolicy"?: string;
  "image.pullSecret"?: string;
  replicaCount?: string;
  nameOverride?: string;
  fullnameOverride?: string;
  "resources.requests.memory"?: string;
  "resources.requests.cpu"?: string;
  "lifecycle.postStart"?: string;
  "lifecycle.preStop"?: string;
  workloadAsStatefulSet?: string;
  strategyType?: string;
  tolerations?: string;
  revisionHistoryLimit?: string;
  "podSecurityContext.runAsUser"?: string;
  "podSecurityContext.runAsGroup"?: string;
  "podSecurityContext.runAsNonRoot"?: string;
  "podSecurityContext.fsGroup"?: string;
  "podSecurityContext.seccompProfile.type"?: string;
  "securityContext.capabilities.drop"?: string;
  "securityContext.readOnlyRootFilesystem"?: string;
  "securityContext.allowPrivilegeEscalation"?: string;
  "livenessProbe.command"?: string;
  "livenessProbe.initialDelaySeconds"?: string;
  "livenessProbe.periodSeconds"?: string;
  "livenessProbe.failureThreshold"?: string;
  "livenessProbe.successThreshold"?: string;
  "livenessProbe.timeoutSeconds"?: string;
  "readinessProbe.command"?: string;
  "readinessProbe.initialDelaySeconds"?: string;
  "readinessProbe.periodSeconds"?: string;
  "readinessProbe.failureThreshold"?: string;
  "readinessProbe.successThreshold"?: string;
  "readinessProbe.timeoutSeconds"?: string;
  "startupProbe.command"?: string;
  "startupProbe.enabled"?: string;
  "startupProbe.failureThreshold"?: string;
  "startupProbe.periodSeconds"?: string;
  initContainers?: string;
  sidecarContainers?: string;
  extraVolumes?: string;
  extraDeploy?: string;
  "minecraftServer.eula"?: string;
  "minecraftServer.version"?: string;
  "minecraftServer.type"?: string;
  "minecraftServer.forgeVersion"?: string;
  "minecraftServer.forgeInstallerUrl"?: string;
  "minecraftServer.spongeVersion"?: string;
  "minecraftServer.bukkitDownloadUrl"?: string;
  "minecraftServer.spigotDownloadUrl"?: string;
  "minecraftServer.paperDownloadUrl"?: string;
  "minecraftServer.ftbModpackId"?: string;
  "minecraftServer.ftbModpackVersionId"?: string;
  "minecraftServer.cfServerMod"?: string;
  "minecraftServer.fabricLauncherVersion"?: string;
  "minecraftServer.fabricLoaderVersion"?: string;
  "minecraftServer.ftbLegacyJavaFixer"?: string;
  "minecraftServer.difficulty"?: string;
  "minecraftServer.whitelist"?: string;
  "minecraftServer.ops"?: string;
  "minecraftServer.icon"?: string;
  "minecraftServer.maxPlayers"?: string;
  "minecraftServer.maxWorldSize"?: string;
  "minecraftServer.allowNether"?: string;
  "minecraftServer.announcePlayerAchievements"?: string;
  "minecraftServer.enableCommandBlock"?: string;
  "minecraftServer.forcegameMode"?: string;
  "minecraftServer.generateStructures"?: string;
  "minecraftServer.hardcore"?: string;
  "minecraftServer.maxBuildHeight"?: string;
  "minecraftServer.maxTickTime"?: string;
  "minecraftServer.spawnAnimals"?: string;
  "minecraftServer.spawnMonsters"?: string;
  "minecraftServer.spawnNPCs"?: string;
  "minecraftServer.spawnProtection"?: string;
  "minecraftServer.viewDistance"?: string;
  "minecraftServer.levelSeed"?: string;
  "minecraftServer.gameMode"?: string;
  "minecraftServer.motd"?: string;
  "minecraftServer.pvp"?: string;
  "minecraftServer.levelType"?: string;
  "minecraftServer.generatorSettings"?: string;
  "minecraftServer.worldSaveName"?: string;
  "minecraftServer.downloadWorldUrl"?: string;
  "minecraftServer.forceReDownload"?: string;
  "minecraftServer.downloadModpackUrl"?: string;
  "minecraftServer.removeOldMods"?: string;
  "minecraftServer.vanillaTweaksShareCodes"?: string;
  "minecraftServer.resourcePackUrl"?: string;
  "minecraftServer.resourcePackSha"?: string;
  "minecraftServer.resourcePackEnforce"?: string;
  "minecraftServer.onlineMode"?: string;
  "minecraftServer.enforceSecureProfile"?: string;
  "minecraftServer.memory"?: string;
  "minecraftServer.jvmOpts"?: string;
  "minecraftServer.jvmXXOpts"?: string;
  "minecraftServer.overrideServerProperties"?: string;
  "minecraftServer.serviceType"?: string;
  "minecraftServer.nodePort"?: string;
  "minecraftServer.servicePort"?: string;
  "minecraftServer.clusterIP"?: string;
  "minecraftServer.loadBalancerClass"?: string;
  "minecraftServer.loadBalancerIP"?: string;
  "minecraftServer.externalIPs"?: string;
  "minecraftServer.modUrls"?: string;
  "minecraftServer.pluginUrls"?: string;
  "minecraftServer.spigetResources"?: string;
  "minecraftServer.modrinth.projects"?: string;
  "minecraftServer.modrinth.downloadDependencies"?: string;
  "minecraftServer.modrinth.allowedVersionType"?: string;
  "minecraftServer.autoCurseForge.apiKey.key"?: string;
  "minecraftServer.autoCurseForge.apiKey.existingSecret"?: string;
  "minecraftServer.autoCurseForge.apiKey.secretKey"?: string;
  "minecraftServer.autoCurseForge.pageUrl"?: string;
  "minecraftServer.autoCurseForge.slug"?: string;
  "minecraftServer.autoCurseForge.fileId"?: string;
  "minecraftServer.autoCurseForge.filenameMatcher"?: string;
  "minecraftServer.autoCurseForge.excludeMods"?: string;
  "minecraftServer.autoCurseForge.includeMods"?: string;
  "minecraftServer.autoCurseForge.excludeIncludeFile"?: string;
  "minecraftServer.autoCurseForge.forceSynchronize"?: string;
  "minecraftServer.autoCurseForge.setLevelFrom"?: string;
  "minecraftServer.autoCurseForge.parallelDownloads"?: string;
  "minecraftServer.autoCurseForge.overridesSkipExisting"?: string;
  "minecraftServer.rcon.enabled"?: string;
  "minecraftServer.rcon.withGeneratedPassword"?: string;
  "minecraftServer.rcon.port"?: string;
  "minecraftServer.rcon.password"?: string;
  "minecraftServer.rcon.existingSecret"?: string;
  "minecraftServer.rcon.secretKey"?: string;
  "minecraftServer.rcon.serviceType"?: string;
  "minecraftServer.rcon.nodePort"?: string;
  "minecraftServer.rcon.clusterIP"?: string;
  "minecraftServer.rcon.loadBalancerClass"?: string;
  "minecraftServer.rcon.loadBalancerIP"?: string;
  "minecraftServer.tty"?: string;
  "minecraftServer.extraPorts"?: string;
  "minecraftServer.query.enabled"?: string;
  "minecraftServer.query.port"?: string;
  envFrom?: string;
  "persistence.dataDir.enabled"?: string;
  "persistence.dataDir.Size"?: string;
  "persistence.dataDir.accessModes"?: string;
  "mcbackup.enabled"?: string;
  "mcbackup.image.repository"?: string;
  "mcbackup.image.tag"?: string;
  "mcbackup.image.pullPolicy"?: string;
  "mcbackup.initialDelay"?: string;
  "mcbackup.backupInterval"?: string;
  "mcbackup.pauseIfNoPlayers"?: string;
  "mcbackup.pruneBackupsDays"?: string;
  "mcbackup.rconRetries"?: string;
  "mcbackup.rconRetryInterval"?: string;
  "mcbackup.excludes"?: string;
  "mcbackup.backupMethod"?: string;
  "mcbackup.destDir"?: string;
  "mcbackup.linkLatest"?: string;
  "mcbackup.compressMethod"?: string;
  "mcbackup.zstdParameters"?: string;
  "mcbackup.rcloneRemote"?: string;
  "mcbackup.rcloneDestDir"?: string;
  "mcbackup.rcloneCompressMethod"?: string;
  "mcbackup.rcloneConfig"?: string;
  "mcbackup.resticRepository"?: string;
  "mcbackup.resticAdditionalTags"?: string;
  "mcbackup.pruneResticRetention"?: string;
  "mcbackup.envFrom"?: string;
  "mcbackup.resources.requests.memory"?: string;
  "mcbackup.resources.requests.cpu"?: string;
  "mcbackup.persistence.backupDir.enabled"?: string;
  "mcbackup.persistence.backupDir.Size"?: string;
  "mcbackup.persistence.backupDir.accessModes"?: string;
};
