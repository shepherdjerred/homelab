const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver-coerced
  "connect": "1.15.0",
  // renovate: datasource=github-releases versioning=semver-coerced
  "argoproj/argo-cd": "v2.11.0",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.14.5",
  // renovate: datasource=github-releases versioning=semver-coerced
  "kubernetes-csi/external-snapshotter": "v7.0.2",
  // renovate: datasource=github-releases versioning=semver-coerced
  "immich-app/immich-charts/": "immich-0.6.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io/ versioning=semver
  "immich-app/immich-server": "v1.105.1",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver-coerced
  "intel-device-plugins-operator": "0.29.0",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver-coerced
  "jenkins": "5.1.6",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver-coerced
  "minio": "14.4.3",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver-coerced
  "node-feature-discovery": "0.15.4",
  "https://prometheus-community.github.io/helm-charts": "58.0.0",
  "https://github.com/rancher/system-upgrade-controller/": "v0.13.4",
  "https://pkgs.tailscale.com/helmcharts": "1.66.3",
  "https://backube.github.io/helm-charts/": "0.9.1",
  "postgres": "postgres:16.2",
  "redis": "redis:7.2",
  "earthly": "earthly/satellite:v0.8.8",
  "invidious": "quay.io/invidious/invidious",
  "teddit": "teddit/teddit",
  "minecraft": "itzg/minecraft-server",
  "palworld": "thijsvanloef/palworld-server-docker",
  "glitter": "ghcr.io/shepherdjerred/glitter-boys:1.1.28",
  "lavalink": "ghcr.io/lavalink-devs/lavalink:4",
  "plex": "plexinc/pms-docker",
  "tautulli": "lscr.io/linuxserver/tautulli",
  "bazarr": "lscr.io/linuxserver/bazarr",
  "bitmagnet": "ghcr.io/bitmagnet-io/bitmagnet:latest",
  "overseerr": "lscr.io/linuxserver/overseerr",
  "prowlarr": "lscr.io/linuxserver/prowlarr",
  "gluetun": "ghcr.io/qdm12/gluetun:v3.37.0",
  "qbittorrent": "lscr.io/linuxserver/qbittorrent",
  "radarr": "lscr.io/linuxserver/radarr",
  "sonarr": "lscr.io/linuxserver/sonarr",
  "ddns": "timothyjmiller/cloudflare-ddns",
  "esphome": "esphome/esphome",
  "golink": "ghcr.io/tailscale/golink:main",
  "homeassistant": "ghcr.io/home-assistant/home-assistant:stable",
  "syncthing": "lscr.io/linuxserver/syncthing",
  "windmill": "windmill-2.0.181",
};

export default versions;
