# Weekly Dependency Update Summary

  Generated on Saturday, December 6, 2025

## Updated Dependencies (11)

| Dependency | Old Version | New Version | Source |
|---|---|---|---|
| coder | 2.28.3 | 2.29.0 | helm |
| velero | 11.1.1 | 11.2.0 | helm |
| recyclarr | 7.4.1 | 7.5.2 | docker |
| kube-prometheus-stack | 79.5.0 | 79.12.0 | helm |
| linuxserver/bazarr | 1.5.3 | 1.5.3 | docker |
| home-assistant/home-assistant | 2025.11.2 | 2025.12.1 | docker |
| openebs | 4.3.3 | 4.4.0 | helm |
| linuxserver/syncthing | 2.0.11 | 2.0.12 | docker |
| tailscale-operator | 1.90.6 | 1.90.9 | helm |
| argo-cd | 9.1.3 | 9.1.6 | helm |
| dagger-helm | 0.19.6 | 0.19.8 | docker |

## AI Summary

- **coder (2.28.3 → 2.29.0)**

- **Breaking Changes**

- Coder MCP tools are no longer injected by default; must be explicitly enabled with CODER_AIBRIDGE_INJECT_CODER_MCP_TOOLS=true.
          
- CLI now uses the OS keyring by default for session token storage on Windows/macOS; file-based storage requires --use-keyring=false.
          
- task_app_id field removed from codersdk.WorkspaceBuild and API responses; integrations must use Task.WorkspaceAppID instead.

- **Security Updates**

- CLI moves away from storing session token in a plain text file to using OS keyring by default.
          
- Removed a sensitive field from an agent log line.
          
- Purge expired API keys in dbpurge.

- **Notable New Features**

- AI Bridge: interception logs page, request duration in logs, configurable retention, metrics for aibridged.
          
- Tasks promoted to GA (general availability) and to stable from experimental, with dashboard improvements and alerts.
          
- Prebuild invalidation via last_invalidated_at timestamp.
          
- Terraform installer caching and experimental persistent/cached Terraform directories per template (can speed up workspace provisioning).

- **Recommended Actions**

- If you rely on automatic MCP tool injection, set CODER_AIBRIDGE_INJECT_CODER_MCP_TOOLS=true in your deployment environment.
          
- If you have tooling or scripts that read CLI session tokens from disk, update them to use the keyring or launch the CLI with --use-keyring=false.
          
- Update any custom integrations that reference WorkspaceBuild.task_app_id to use Task.WorkspaceAppID.
          
- Review and, if useful, configure AI Bridge retention and monitoring (metrics scraping, dashboards) for your observability stack.

- **velero (11.1.1 → 11.2.0)**

- **Breaking Changes**

- None explicitly mentioned.

- **Security Updates**

- None explicitly mentioned.

- **Notable New Features**

- Chart now uses Velero v1.17.1 (details not included here).

- **Recommended Actions**

- Verify Velero pods are running with image version v1.17.1 after upgrade.
          
- Run a test backup and restore to confirm nothing in your backup/restore workflows broke with the new Velero app version.

- **recyclarr (7.4.1 → 7.5.2)**

- **Breaking Changes**

- None explicitly mentioned.

- **Security Updates**

- None explicitly mentioned.

- **Notable New Features**

- Homebrew installation support on macOS and Linux (for manual/CLI usage).

- **Recommended Actions**

- If you use --preview in scripts or manual runs, the crash after rendering the quality sizes table is fixed; no config changes required.
          
- Custom formats now avoid unnecessary updates; just monitor one or two runs to confirm expected behavior.

- **kube-prometheus-stack (79.5.0 → 79.12.0)**

- **Breaking Changes**

- None explicitly mentioned.

- **Security Updates**

- None explicitly mentioned.

- **Notable New Features**

- Updated etcd image digest (no functional details provided beyond the digest bump).

- **Recommended Actions**

- After upgrade, ensure Prometheus, Alertmanager, and etcd-related components are healthy in your monitoring namespace.
          
- Watch cluster for a short period for any etcd-related alerts from this stack.

- **linuxserver/bazarr (1.5.3 → 1.5.3)**

- **Note**: Version number unchanged; release notes describe the 1.5.3 content.
      
- **Breaking Changes**

- Sonarr and Radarr webhook hooks were refactored and may be a breaking change; users should review webhook parameters in Bazarr settings.

- **Security Updates**

- Sanitization of Plex URLs and sensitive data in logs.
          
- Improved saving of settings to avoid empty settings files when disk space is low (protects configuration integrity).

- **Notable New Features**

- Plex OAuth authentication support plus multiple Plex integration improvements (better library selection, webhook creation, selective content refresh).
          
- New subtitle providers and translation options: Lingarr subtitles translation, Gemini AI translation, SubsRo provider, language mapping for WhisperAI.
          
- Support for .mk3d video extensions.

- **Recommended Actions**

- Review and, if needed, reconfigure Sonarr/Radarr webhooks in Bazarr according to the updated parameters described in Bazarr settings.
          
- If you rely on Plex integration, verify OAuth and library/webhook configuration, and check logs for any new warnings.
          
- Confirm subtitle search/upgrade settings (including new translation features) match your desired behavior.

- **home-assistant/home-assistant (2025.11.2 → 2025.12.1)**

- **Breaking Changes**

- None explicitly mentioned in this point release.

- **Security Updates**

- Several integrations move URLs to secure (https) forms or out of translatable strings, but no explicit security fixes are described beyond that.

- **Notable New Features / Fixes**

- Multiple integration fixes that may impact homelab devices: Rituals Perfume Genie, Starlink uptime, Roborock, VeSync binary sensor discovery, Reolink, ZHA (error handling), Tuya climate, Shelly (no restart button for sleeping gen2+ devices), Doorbird ID handling, ENTSoE prevented from loading, etc.
          
- Template integration: fixes for migration errors, deprecation messaging, missing template keys, and inverted Kelvin issue.
          
- Frontend updated to 20251203.1.

- **Recommended Actions**

- After upgrade, validate key integrations you use (e.g., ZHA, Tuya, Shelly, Reolink, Roborock, Starlink, templates) to ensure entities behave as expected.
          
- Review any deprecation repairs or warnings shown for templates and adjust YAML/templates accordingly.
          
- If you use Doorbird, ENTSoE, or Shelly gen2+ sleeping devices, confirm the new behaviors (e.g., absence of a restart button) fit your workflows.

- **openebs (4.3.3 → 4.4.0)**

- **Breaking / Compatibility Notes**

- Upgrades to 4.4.0 are supported only for:

- Local PV Hostpath
              
- Local PV LVM
              
- Local PV ZFS
              
- Mayastor (from 3.10.x or below)
              
- Local PV Rawfile

- On single-node setups, ZFS-localpv/LVM-localpv controller pods may not reach Running state after upgrade due to manifest/affinity changes; requires manual pod deletion as a workaround.

- **Security Updates**

- Fixed open permissions on call-home encryption directory.

- **Notable New Features**

- **Mayastor**

- DiskPool expansion (expand capacity by growing underlying device).
              
- Configurable cluster size for pools.
              
- Pool cordon support (prevent new replicas, assist in migrating replicas off a pool).
              
- Node spread topology support and affinity group scale-down improvements.
              
- Command to delete orphaned retain snapshots safely.

- **LocalPV LVM**

- Snapshot restore support.
              
- ThinPool space reclamation when last thin volume is deleted.
              
- Scheduler enhancements considering thinpool statistics and fail-fast for insufficient VG space.

- **LocalPV ZFS**

- Configurable CPU and memory requests/limits for ZFS node/controller containers via values.yaml.

- **LocalPV RawFile**

- VolumeSnapshots, restore from snapshot, and cloning support.

- **Recommended Actions**

- Confirm your current OpenEBS engines are in the supported upgrade matrix before proceeding.
          
- For single-node clusters using ZFS-localpv or LVM-localpv, after upgrade, delete the old controller pod if the new one does not become Running.
          
- If you use Mayastor:

- Plan DiskPool creation with enough metadata for future expansion as required by DiskPool expansion feature.
              
- Consider using pool cordon and node spread for better replica placement and maintenance workflows.

- For LocalPV LVM, review snapshot-restore and thinpool behavior and ensure storage monitoring accounts for the known issue of missing unmap/reclaim tracking in lvmnode.
          
- Update ZFS values.yaml to set appropriate resource requests/limits for homelab hardware.

- **linuxserver/syncthing (2.0.11 → 2.0.12)**

- **Breaking Changes**

- Database backend changed from LevelDB to SQLite; first launch triggers a potentially lengthy migration.
          
- Command-line interface:

- Old single-dash long options like -home are no longer supported; must use --home.
              
- --verbose and --logflags options removed and ignored if given.
              
- Some options renamed or turned into subcommands.

- Logging format changed to structured logs; new WARNING log level; logging controls changed (new --log-level flag, STTRACE behavior updated).
          
- Rolling hash detection of shifted data removed (affects how data changes are detected, but explicitly stated as no longer supported).
          
- “Default folder” is no longer created on first startup.

- **Security Updates**

- None explicitly mentioned.

- **Notable New Features / Behavior**

- Deleted items are automatically forgotten from the database after 15 months by default; configurable via --db-delete-retention-interval or corresponding env var.
          
- Multiple connections now used by default between v2 devices (3 connections: 1 for metadata, 2 for data).

- **Recommended Actions**

- Plan for first-run migration time; avoid restarting/power-loss during the database migration.
          
- Update any wrapper scripts or systemd units using old single-dash options or removed flags (-home, --verbose, --logflags).
          
- If your use case requires very long delete retention, adjust --db-delete-retention-interval or env var accordingly.
          
- Review and, if needed, adjust logging configuration (new --log-level and per-package levels via STTRACE or GUI).

- **tailscale-operator (1.90.6 → 1.90.9)**

- No specific release notes beyond link to external changelog; no explicit breaking, security, or feature details provided here.
      
- **Recommended Actions**

- Consult the Tailscale changelog at [https://tailscale.com/changelog](https://tailscale.com/changelog) for details relevant to your use.

- **argo-cd (9.1.3 → 9.1.6)**

- **Breaking Changes**

- None explicitly mentioned.

- **Security Updates**

- None explicitly mentioned.

- **Notable New Features**

- Helm chart now uses quay.io/argoprojlabs/argocd-extension-installer image tag v0.0.9 (no further details provided).

- **Recommended Actions**

- If you use Argo CD extensions, verify that the extension installer pod runs correctly with the new image version.

- **dagger-helm (0.19.6 → 0.19.8)**

- **Breaking Changes**

- None explicitly mentioned.

- **Security Updates**

- None explicitly mentioned.

- **Notable New Features**

- Performance: WithDirectory and WithFile optimized to avoid disk copies when possible.
          
- Environment: host env var expansion in .env files.
          
- VCS: support for on-premises Azure DevOps.
          
- Vault secret provider: configurable app role mount path.
          
- Toolchain customization and ability to ignore checks in a toolchain.
          
- TypeScript SDK: live telemetry support and test tracing with @otr/mocha-test.
          
- New File.AsJSON() helper.

- **Recommended Actions**

- If you use Dagger-based CI for homelab builds, consider:

- Leveraging the new WithDirectory/WithFile behavior for faster pipelines.
              
- Using host env expansion in .env files where appropriate.
              
- Updating any Vault integrations to use/apply the app role mount path setting if needed.

    This summary was automatically generated by your homelab dependency monitoring system.

    Repository: [shepherdjerred/homelab](https://github.com/shepherdjerred/homelab)