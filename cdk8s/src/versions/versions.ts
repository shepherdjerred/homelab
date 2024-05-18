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
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "immich-app/immich-server":
    "v1.105.1@sha256:658b40420d7a39d6eb34c797cec8d36ff315f5adb168301aaf27dc4eafc8e228",
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
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/postgres":
    "16.2@sha256:4aea012537edfad80f98d870a36e6b90b4c09b27be7f4b4759d72db863baeebb",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:5a93f6b2e391b78e8bd3f9e7e1e1e06aeb5295043b4703fb88392835cec924a0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver-coerced
  "earthly/satellite":
    "v0.8.11@sha256:6fd2b6b388405474bd85d9a0203ae8e5ff4ae7859d099b8a84978007dc0d2ebf",
  // renovate: datasource=docker registryUrl=https://quay.io versioning=docker
  "invidious/invidious":
    "2024.04.26-eda7444@sha256:a91a307a3ece8468aa88d6b91a601a0453cf76589f434ffdce643f968d3825cc",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit":
    "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server":
    "2024.5.0-java21@sha256:1ff47453ce66194927313d628c32a485c34d0acc9c01c9dbd643584c50cf89e6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "thijsvanloef/palworld-server-docker":
    "v0.37.0@sha256:40930091c4a264a6b6f36bce432805383cc3dfd577c72471d76e55dece8a1ad5",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "shepherdjerred/glitter-boys":
    "1.1.30@sha256:a47becb4545d1080c42b8f46105de89f111abf39423880309e88bc0adc05f2c9",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "lavalink-devs/lavalink":
    "4.0.5@sha256:715fedceb9be556c7dec07774a6c41fa1cf4ac2fc582992783a0c78a2ec31312",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "plexinc/pms-docker":
    "1.40.2.8395-c67dce28e@sha256:88c77d86087699f79da9907107243d2b31ed1e0f37e6cfde4cb3082180702ba1",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/tautulli":
    "2.14.2@sha256:f9582696fb6af30e78988a655e4f105dc73c1878e02f12afd3e4de037a1b3ca0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.4.2@sha256:b10948cb32e293afd0278074b8bde922dbffb5ebe9da72434c7525d4abb5f145",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "bitmagnet-io/bitmagnet":
    "v0.8.0@sha256:c638773151d97e6bd2e19f181f0845be4c82893974975037aa06665c711e4466",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/overseerr":
    "1.33.2@sha256:176a757cfee7307d40bf99ab2bcbe1642d943892f75639ad02b6d24485c2b021",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.17.2@sha256:b0dabccc49b6e994665ae8751224aa3ca4c31b29b18815394a330d591e5f8ed8",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.38@sha256:5522794f5cce6d84bc7f06b1e3a3b836ede9100c64aec94543cb503bb2ecb72f",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/qbittorrent":
    "4.6.4@sha256:bc39549ede4f4d092e1030b89a0e9ea294c26a7aa5ed7e7e5be6d615f5ea293b",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.6.0@sha256:9ea26fed9da394d719ae6790418337510a9c824d0253cbd07d3db70b3aa503be",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.4@sha256:25e0f3b3741cf8df6c322d6c9016b5be91ca6e154653b4d01c8c125bf1ce75c0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:479bbc53f9f8d547413305e003fe7480cc45c12008cbca2cec5a0c5d30c72ad9",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "esphome/esphome":
    "2024.5.0@sha256:917bf34d17c54f64914b5a3a9a320c59272ee4690411299ff447dc6bafdff527",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:ef29beb71f86ea265e3038e69521a6f21d1281b30cd1f2d32ea1b4ed79d3f1f5",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2024.5.4@sha256:6f5eeb8360d9d58ff096c7259366993b4b01ebe11251c2b83c9329daad441b00",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.27.7@sha256:5606a1fe483c7f98c9a5e110fc52000d22337218cd458ff07791f80febe687dc",
  // renovate: datasource=github-releases versioning=semver-coerced
  "windmill-labs/windmill-helm-charts": "windmill-2.0.181",
};

export default versions;
