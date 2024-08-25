const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  "connect": "1.15.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "argoproj/argo-cd": "v2.12.0",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.15.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "kubernetes-csi/external-snapshotter": "v8.0.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "immich-app/immich-charts": "immich-0.7.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "immich-app/immich-server":
    "v1.112.1@sha256:c4e817f0eadbd9a6c2699cc884d5e7070428daec813c17db77d31fcca5b78ca6",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.30.0",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.5.4",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  "minio": "14.6.25",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.16.3",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "61.3.2",
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
    "7.2@sha256:f65071a370de1370af3fa8cf5f6eda01e42e734bb4e0f0a78e42e736b6a98480",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver-coerced
  "earthly/satellite":
    "v0.8.15@sha256:17f923251cf8ba2b2ab19e1fdecfab81aaa6499825cac56d38cb21aeea56f74d",
  // renovate: datasource=docker registryUrl=https://quay.io versioning=docker
  "invidious/invidious":
    "2024.04.26-eda7444@sha256:a91a307a3ece8468aa88d6b91a601a0453cf76589f434ffdce643f968d3825cc",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit":
    "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server":
    "2024.7.2-java21@sha256:8b85680daa51eacf70dfadb078fd9f56918ecac62a92ca57dda00ff33a79caae",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "thijsvanloef/palworld-server-docker":
    "v0.39@sha256:b16208ee52b06d4fefd2e20abb138fc2988862d2170bc247d493f7f529e4578b",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "shepherdjerred/glitter-boys":
    "1.1.30@sha256:a47becb4545d1080c42b8f46105de89f111abf39423880309e88bc0adc05f2c9",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "lavalink-devs/lavalink":
    "4.0.7@sha256:12952ceae707962005613574b6492a001a4e8157bbfab167c3ca494a4c25f441",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.40.4.8679-424562606@sha256:ee83eb44a8329ad70d9783582f0f3cda1f5d1671213f80ac996e7d4b549dcc52",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.14.4@sha256:6999244b795fdebd8707a386932b9d5773b4a3e16d4c042e9e92170d2934603c",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.4.3@sha256:0ac10a3e9ef16ee17bfd0719bcadc18b30572b54dbe76d6bd865a160eefb22b7",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "bitmagnet-io/bitmagnet":
    "v0.9.5@sha256:7bf46883d18c520616cd8d11a08a29be2f49e7295843742c9cb363b499239b25",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.33.2@sha256:3543bcc57aaa74842d8d88c6a0a6805b166d89e2dfc0db74b703ee59f8d7266e",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.21.2@sha256:c80a2dcfefd85c62da2373c5bf0138bb9d1c647c4b3d8f994ce263f5e8b1db81",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.39@sha256:2f011a9aca767af62008d879eefcbc80a8645bd4fd4466ab312cc941cb658ad1",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.5@sha256:6843a94d923e472f80a9505cfae77eb3689b2931f1fdf23358e459d3d0cdc9d0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.8.3@sha256:938281e82a91da0115d0f8b0a2260acf0f07052c8c78dfaf7e407c843ae242f5",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.8@sha256:bffa87787eacff9023df4400f521c159566d14b5a280caec8b54196071e6038e",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:479bbc53f9f8d547413305e003fe7480cc45c12008cbca2cec5a0c5d30c72ad9",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "esphome/esphome":
    "2024.7.0@sha256:0f57cee34c3aa146113f53c03e8c3b0797acf4191e7b7dbc5512f3113b5e9459",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:06a6e41309d276d4b97d27c0037e1a07251b3bc61e5de7feb25c875fd5b9076d",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2024.8.2@sha256:b5c4bef2494f84806423c0116bab2a8758c5be386e11af0d3bd7359a18ba77a7",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.27.10@sha256:d6502d919f49f16a80689ce92c211f945f1d64a34c0d3f23ecc27a2a4d1dd0ac",
  // renovate: datasource=github-releases versioning=semver-coerced
  "windmill-labs/windmill-helm-charts": "windmill-2.0.181",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "lloesche/valheim-server":
    "latest@sha256:b97da1038714e5156cf28d042422a1c5af41e03189572025e615bde61395c678",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.2.1",
  // renovate: datasource=helm registry=https://chartmuseum.github.io/charts versioning=semver
  "chartmuseum": "3.10.3",
  // renovate: datasource=helm registry=https://itzg.github.io/minecraft-server-charts versioning=semver
  "minecraft": "4.20.0",
};

export default versions;
