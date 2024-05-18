// https://docs.renovatebot.com/modules/manager/regex/
const versions = {
  "https://1password.github.io/connect-helm-charts/": "1.15.0",
  "https://github.com/argoproj/argo-cd": "stable",
  "https://charts.jetstack.io": "v1.14.4",
  "https://github.com/kubernetes-csi/external-snapshotter": "release-7.0",
  "https://github.com/immich-app/immich-charts/": "immich-0.6.0",
  // renovate: datasource=docker packageName=immich-server versioning=docker
  "immich": "v1.105.1",
  "https://intel.github.io/helm-charts/": "0.29.0",
  "https://charts.jenkins.io": "5.1.6",
  "https://charts.bitnami.com/bitnami": "14.1.7",
  "https://kubernetes-sigs.github.io/node-feature-discovery/charts": "0.15.4",
  "https://prometheus-community.github.io/helm-charts": "58.0.0",
  "https://github.com/rancher/system-upgrade-controller/": "v0.13.4",
  "https://pkgs.tailscale.com/helmcharts": "1.66.3",
  "https://backube.github.io/helm-charts/": "0.9.1",
  // renovate: datasource=docker packageName=postgres versioning=docker
  "postgres": "16.2",
  // renovate: datasource=docker packageName=redis versioning=docker
  "redis": "7.2",
  // renovate: datasource=docker packageName=earthly/satellite versioning=docker
  "earthly": "v0.8.8",
  // renovate: datasource=docker packageName=quay.io/invidious/invidious versioning=docker
  "invidious": "latest",
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
