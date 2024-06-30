const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  "connect": "1.15.0",
  // renovate: datasource=github-releases versioning=semver-coerced
  "argoproj/argo-cd": "v2.11.3",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.15.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "kubernetes-csi/external-snapshotter": "v8.0.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "immich-app/immich-charts/": "immich-0.6.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "immich-app/immich-server":
    "v1.106.4@sha256:d39cb7ecbcc9924f2c51a3e0deb8a469075996c6ba9e1384eb2ddb550984848e",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.30.0",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.3.3",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  "minio": "14.6.16",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.16.0",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "61.1.0",
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
    "v0.38.1@sha256:7253574f656ab70e2413fb92d8100fd10a5430803b895941ce0ef2614ffb1978",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "shepherdjerred/glitter-boys":
    "1.1.30@sha256:a47becb4545d1080c42b8f46105de89f111abf39423880309e88bc0adc05f2c9",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "lavalink-devs/lavalink":
    "4.0.6@sha256:a6398b7937063d83b9c35477623c0f461878be5ed053c92d5f9c06b702a30194",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.40.3.8555-fef15d30c@sha256:55a784815837ea534c8caf95d586e838e37a608fc2c1017e3295802e7f62c354",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.14.3@sha256:f25b902c4fa015657f08392c3169ab06d55bb0467789f427e599917264decebc",
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
    "1.19.0@sha256:3061e68afda543202ee7382cbfe3bfa94a1ab7d03ebaa242c732ffe2f73088f0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.38@sha256:5522794f5cce6d84bc7f06b1e3a3b836ede9100c64aec94543cb503bb2ecb72f",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.5@sha256:89b78fe6a5553d1bf4bdf2b158671b86142ec57ffecbdf0a4ab9da62a8dabd8a",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.7.0@sha256:3e64efcc14f9b21b30e78c39203e754d1d1a897d0f76ffb92450cd5c8ae16c9a",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.5@sha256:782a911f0f3e9ad3a9cf39292e1d43b8a184cb989d7edc4abc8d8480b221b5aa",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:479bbc53f9f8d547413305e003fe7480cc45c12008cbca2cec5a0c5d30c72ad9",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "esphome/esphome":
    "2024.6.4@sha256:3f563c6faa36baa52b5125d29535278f0c11c04d806be640ad060c46026c3b8c",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:f3a81bf7dcc56b8837db2de745d105888a144be457fe20108c253bc1f702bdd4",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2024.6.4@sha256:17d159928122e6f374bd39b0e75904522bc7d7c2a64e88b248948734e4c4d444",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.27.8@sha256:77e01f31c68b6a0877222b538c976e0df1e2ba1137bbf7a496f6a70148239929",
  // renovate: datasource=github-releases versioning=semver-coerced
  "windmill-labs/windmill-helm-charts": "windmill-2.0.181",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "lloesche/valheim-server":
    "latest@sha256:b97da1038714e5156cf28d042422a1c5af41e03189572025e615bde61395c678",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.2.0",
};

export default versions;
