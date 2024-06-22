const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  "connect": "1.15.0",
  // renovate: datasource=github-releases versioning=semver-coerced
  "argoproj/argo-cd": "v2.11.3",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.15.0",
  // renovate: datasource=github-releases versioning=semver-coerced
  "kubernetes-csi/external-snapshotter": "v8.0.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "immich-app/immich-charts/": "immich-0.6.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "immich-app/immich-server":
    "v1.105.1@sha256:658b40420d7a39d6eb34c797cec8d36ff315f5adb168301aaf27dc4eafc8e228",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.30.0",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.3.1",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  "minio": "14.6.11",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.16.0",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "60.3.0",
  // renovate: datasource=github-releases versioning=semver-coerced
  "rancher/system-upgrade-controller": "v0.13.4",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.68.1",
  // renovate: datasource=helm registryUrl=https://backube.github.io/helm-charts/ versioning=semver
  "volsync": "0.9.1",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/postgres":
    "16.2@sha256:4aea012537edfad80f98d870a36e6b90b4c09b27be7f4b4759d72db863baeebb",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:e422889e156ebea83856b6ff973bfe0c86bce867d80def228044eeecf925592b",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver-coerced
  "earthly/satellite":
    "v0.8.14@sha256:520c8aca1b714aa3b8d80a9b011277e6139a714b8183b81e9962ba9d3dacfd8e",
  // renovate: datasource=docker registryUrl=https://quay.io versioning=docker
  "invidious/invidious":
    "2024.04.26-eda7444@sha256:a91a307a3ece8468aa88d6b91a601a0453cf76589f434ffdce643f968d3825cc",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit":
    "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server":
    "2024.6.1-java21@sha256:69f655b868cee46474ce56c78c6488fa230518448c2ff12fd6ebd231db27805c",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "thijsvanloef/palworld-server-docker":
    "v0.37.2@sha256:bb9c4e4bde4508deedec08f309b121527e7431fe05b9a2a84f5953a80eb9ee1f",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "shepherdjerred/glitter-boys":
    "1.1.30@sha256:a47becb4545d1080c42b8f46105de89f111abf39423880309e88bc0adc05f2c9",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "lavalink-devs/lavalink":
    "4.0.6@sha256:a6398b7937063d83b9c35477623c0f461878be5ed053c92d5f9c06b702a30194",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "plexinc/pms-docker":
    "1.40.2.8395-c67dce28e@sha256:88c77d86087699f79da9907107243d2b31ed1e0f37e6cfde4cb3082180702ba1",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.14.3@sha256:4bc52f93a1c0e2bb7204b685f47a7b0324ab39a46182c39c3caaf0db889e69b6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.4.3@sha256:6fb83511c0dca70a400fde79cb45ed59c4f66ea30dcba8c6f9274f01d77e5aef",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "bitmagnet-io/bitmagnet":
    "v0.9.3@sha256:09b05574a45a4f1c090edac29f3c30ecb9851af43df6997beb3e2bc369637093",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.33.2@sha256:a21b9f6cce4fa7040a32a9feb77a1902e792cd3716acf695ee416862dc22c6a4",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.18.0@sha256:6d682b91bd6f818e0489485651989b1e0c8444b1b55f4e9726b38ab1023cb294",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.38@sha256:5522794f5cce6d84bc7f06b1e3a3b836ede9100c64aec94543cb503bb2ecb72f",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.5@sha256:e46f9b5daf0435c24b238211c06b3fb669830a464ef2b8538328332ff48206a3",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.7.0@sha256:40f10a3d826f6c231d338738c3c86bf0d23a9546f20f8b1b504c6c579b79992c",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.5@sha256:275467ba17d990bbc6301dec3cc76b042969836749de39067818759d0f3b407f",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:479bbc53f9f8d547413305e003fe7480cc45c12008cbca2cec5a0c5d30c72ad9",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "esphome/esphome":
    "2024.6.1@sha256:0c1e1adc51df8752d1ef88bba7e5b76b518884867342397336f5430a21083c45",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:f3a81bf7dcc56b8837db2de745d105888a144be457fe20108c253bc1f702bdd4",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2024.6.4@sha256:17d159928122e6f374bd39b0e75904522bc7d7c2a64e88b248948734e4c4d444",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.27.8@sha256:6e70dd0cc0ddb038a8f58cf0945d6659b13c984f11d708407469bf16d520574c",
  // renovate: datasource=github-releases versioning=semver-coerced
  "windmill-labs/windmill-helm-charts": "windmill-2.0.181",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "lloesche/valheim-server":
    "latest@sha256:b97da1038714e5156cf28d042422a1c5af41e03189572025e615bde61395c678",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.2.0",
};

export default versions;
