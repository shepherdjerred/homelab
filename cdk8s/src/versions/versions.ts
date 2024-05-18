const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
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
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.30.0",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.1.18",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  "minio": "14.4.3",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.15.4",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "58.5.3",
  // renovate: datasource=github-releases versioning=semver-coerced
  "rancher/system-upgrade-controller": "v0.13.4",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.66.3",
  // renovate: datasource=helm registryUrl=https://backube.github.io/helm-charts/ versioning=semver
  "volsync": "0.9.1",
  // renovate: datasource=docker versioning=semver
  "postgres": "16.2",
  // renovate: datasource=docker versioning=semver
  "redis": "7.2",
  // renovate: datasource=docker versioning=semver-coerced
  "earthly/satellite":
    "v0.8.11@sha256:6fd2b6b388405474bd85d9a0203ae8e5ff4ae7859d099b8a84978007dc0d2ebf",
  // renovate: datasource=docker versioning=docker
  "invidious/invidious": "latest",
  // renovate: datasource=docker versioning=docker
  "teddit/teddit": "latest",
  // renovate: datasource=docker versioning=docker
  "itzg/minecraft-server": "latest",
  // renovate: datasource=docker registryUrl=https://ghcr.io/ versioning=docker
  "thijsvanloef/palworld-server-docker": "latest",
  // renovate: datasource=docker registryUrl=https://ghcr.io/ versioning=semver
  "shepherdjerred/glitter-boys": "1.1.30",
  // renovate: datasource=docker registryUrl=https://ghcr.io/ versioning=semver
  "lavalink-devs/lavalink": "4",
  // renovate: datasource=docker versioning=docker
  "plexinc/pms-docker": "latest",
  // renovate: datasource=docker registryUrl=https://lscr.io/ versioning=docker
  "linuxserver/tautulli": "latest",
  // renovate: datasource=docker registryUrl=https://lscr.io/ versioning=docker
  "linuxserver/bazarr": "latest",
  // renovate: datasource=docker registryUrl=https://ghcr.io/ versioning=docker
  "bitmagnet-io/bitmagnet":
    "latest@sha256:c638773151d97e6bd2e19f181f0845be4c82893974975037aa06665c711e4466",
  // renovate: datasource=docker registryUrl=https://lscr.io/ versioning=docker
  "linuxserver/overseerr": "latest",
  // renovate: datasource=docker registryUrl=https://lscr.io/ versioning=docker
  "linuxserver/prowlarr": "latest",
  // renovate: datasource=docker registryUrl=https://ghcr.io/ versioning=semver-coerced
  "qdm12/gluetun": "v3.38",
  // renovate: datasource=docker registryUrl=https://lscr.io/ versioning=docker
  "linuxserver/qbittorrent": "latest",
  // renovate: datasource=docker registryUrl=https://lscr.io/ versioning=docker
  "linuxserver/radarr": "latest",
  // renovate: datasource=docker registryUrl=https://lscr.io/ versioning=docker
  "linuxserver/sonarr": "latest",
  // renovate: datasource=docker versioning=docker
  "timothyjmiller/cloudflare-ddns": "latest",
  // renovate: datasource=docker versioning=docker
  "esphome/esphome": "2024.5.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io/ versioning=docker
  "tailscale/golink": "main",
  // renovate: datasource=docker registryUrl=https://ghcr.io/ versioning=docker
  "home-assistant/home-assistant": "stable",
  // renovate: datasource=docker registryUrl=https://lscr.io/ versioning=docker
  "linuxserver/syncthing": "latest",
  // renovate: datasource=github-releases versioning=semver-coerced
  "windmill-labs/windmill-helm-charts": "windmill-2.0.181",
};

export default versions;
