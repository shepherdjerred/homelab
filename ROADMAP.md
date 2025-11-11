# Roadmap

## WIP

- Parse gickup CRON expression
- <https://github.com/esanchezm/prometheus-qbittorrent-exporter>
- <https://github.com/jsclayton/prometheus-plex-exporter>
- Prometheus Minecraft exporter
- <https://developer.1password.com/docs/ci-cd/github-actions/?workflow-type=connect>

## Next

- Configure Recyclarr with env vars and config files committed to repo
- ZFS grafana dashboard
- <https://github.com/prometheus/blackbox_exporter>
- Verify Gomplate syntax
- Verify Prometheus syntax with promtool
- Helm is downloaded via Docker rather than mise
- Get Coder tf to apply automatically
- `homeassistant_sensor_timestamp_seconds{entity="sensor.granary_smart_camera_feeder_last_feed_time"}`
  - metric does not exist
- `rate(node_disk_written_bytes_total[5m]) > 1048576`
  - metric on the edge of alerting. should have another alarm for writes per day

## Done

- Collect Prometheus metrics from Scout for League of Legends
- Get Pokemon bot running
- Deploy Karma bot
- <https://github.com/openebs/monitoring>
- Metrics not working
  - Velero
  - ArgoCD
- Type validation for Helm
- Track Talos version in repository
- Music isn't working
- Automatically fix types for HA project, e.g. roomba
- eslint
- HA image should be pinned to GHA run number
- Backups of all ZFS volumes
- Add last HDD to zpool
- Verify backups
