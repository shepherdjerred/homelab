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
  "jenkins": "5.7.8",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  "minio": "14.8.1",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.16.6",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "65.5.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "rancher/system-upgrade-controller": "v0.14.2",
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
    "v0.8.15@sha256:7040b02e00ff05232dc49f0b632bbfd4dfe0c380687d486849f1d024d8599233",
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
    "1.41.2.9200-c6bbc1b53@sha256:97449a56880ce05fac6171094beab990e9f543d134b8b9787badac069998b961",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.15.0@sha256:b2a2a615485103eb1e2b10bd0e29088be36b827495a643e433249c5dc945f1e6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.4.5@sha256:5805d6a44689a41cf78a8317208276a52f0647fb3cd0b2c4a3c8df6e02f93d3b",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.33.2@sha256:54cd6f5510c781a385c4d471364402d9cc5ecefad2728f32dd150d9333f67a65",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.26.1@sha256:c492863c8e1da876a6be3d0d5836f25b3547c0a3293f0e9f09cd198ebf47ea37",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.39.1@sha256:6a8058e626763cbf735ac2f78c774dbb24fec2490bd9d9f7d67e22592cb4a991",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.15.1@sha256:2e37ae0af799e01f413a97ee82c7e581a5b635816df0380889bc65d554dbeb17",
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
    "main@sha256:1257ec61843f0850610beca16626599daae30619132d8a3e97679ad36de478c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2024.11.3@sha256:988ae0f8bab0620d7e9abdcf07f8a8f6d88f5ae301749e61e6cf00aaed13a19b",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.28.0@sha256:34edd556aaada725855f256b30fd94751ef4bdb45ddd6434c5f1dcaca8531747",
  // renovate: datasource=github-releases versioning=semver-coerced
  "windmill-labs/windmill-helm-charts": "windmill-2.0.181",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.4.0",
  // renovate: datasource=helm registry=https://chartmuseum.github.io/charts versioning=semver
  "chartmuseum": "3.10.3",
  // renovate: datasource=helm registry=https://itzg.github.io/minecraft-server-charts versioning=semver
  "minecraft": "4.20.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "koush/scrypted":
    "latest@sha256:906f05fd398edca621cc466f0de322c1e827eb7dd2b78f82c7ea46bd0cd69c18",
  "shepherdjerred/scout-for-lol/beta": "1.0.4",
  "shepherdjerred/scout-for-lol/prod": "1.0.4",
};

export default versions;
