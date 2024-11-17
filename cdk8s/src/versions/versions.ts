const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  "connect": "1.16.0",
  // renovate: datasource=github-releases versioning=semver-coerced
  "argoproj/argo-cd": "v2.12.6",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.16.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "kubernetes-csi/external-snapshotter": "v8.1.0",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.31.1",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.7.7",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  "minio": "14.7.15",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.16.5",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "65.1.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "rancher/system-upgrade-controller": "v0.14.1",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.76.1",
  // renovate: datasource=helm registryUrl=https://backube.github.io/helm-charts/ versioning=semver
  "volsync": "0.10.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/postgres":
    "16.2@sha256:4aea012537edfad80f98d870a36e6b90b4c09b27be7f4b4759d72db863baeebb",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:4305c23e67690efec3151f667c77fa943c0ab537c0026e66931f0f048ac05879",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver-coerced
  "earthly/satellite":
    "v0.8.15@sha256:98225f076886533268d492ad14d0b2517f8b3ee18b1469cee50c5a4b76949bca",
  // renovate: datasource=docker registryUrl=https://quay.io versioning=docker
  "invidious/invidious":
    "2024.04.26-eda7444@sha256:a91a307a3ece8468aa88d6b91a601a0453cf76589f434ffdce643f968d3825cc",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit":
    "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server":
    "2024.10.2-java21@sha256:8bd119f65ef6e65bdb12f756bfb44a305b36b1adf868ade8027014fabc29c755",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "lavalink-devs/lavalink":
    "4.0.8@sha256:cd119c5c902804a8934cc1f13377dd6c5c5de76afadfd8bdd02f4011ce85339a",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.41.1.9057-af5eaea7a@sha256:1846de6eb835a046d1c5bbffddc0c3ed44e5fa1c56f2ad8deb1dafd00fc61bc2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.14.6@sha256:2d23cb2eef35f3c53007fd598d73c7c55e12ff7a9e60e3169f9e24b071d86c4b",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.4.5@sha256:7391c8c31a190aa676ca3596b54c243e731411cb8bdfef50f94f3e5c559520b8",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "bitmagnet-io/bitmagnet":
    "v0.9.5@sha256:7bf46883d18c520616cd8d11a08a29be2f49e7295843742c9cb363b499239b25",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.33.2@sha256:54cd6f5510c781a385c4d471364402d9cc5ecefad2728f32dd150d9333f67a65",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.25.4@sha256:7cd854daf61f7f2f68b8680850d86519409a61247e556ff41a3aae0e0cc3fb10",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.39.1@sha256:6a8058e626763cbf735ac2f78c774dbb24fec2490bd9d9f7d67e22592cb4a991",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.14.0@sha256:3329fbf778701cf53703b342b3a84da31caafec970ef9310be5723dd057666dc",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.10@sha256:a30d870ae503e617e84909367c8f19096567ef60834fa8d81d86d17a13e50d1a",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "esphome/esphome":
    "2024.10.2@sha256:e01bc223b5a669e559318792a9cfde6c5f69781a53a6e4c819b6499313ee5028",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:73891aa9cc23596177314364886c5becc4a5be3a2161080eb526fd249ade6e57",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2024.11.1@sha256:c01d6c54679a1934a2bd62a8e3289cd1439b45b82dc5b2dba01793368c500908",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.28.0@sha256:34edd556aaada725855f256b30fd94751ef4bdb45ddd6434c5f1dcaca8531747",
  // renovate: datasource=github-releases versioning=semver-coerced
  "windmill-labs/windmill-helm-charts": "windmill-2.0.181",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.3.2",
  // renovate: datasource=helm registry=https://chartmuseum.github.io/charts versioning=semver
  "chartmuseum": "3.10.3",
  // renovate: datasource=helm registry=https://itzg.github.io/minecraft-server-charts versioning=semver
  "minecraft": "4.20.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "koush/scrypted": "latest",
};

export default versions;
