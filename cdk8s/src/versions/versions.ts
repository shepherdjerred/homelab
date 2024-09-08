const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  "connect": "1.15.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "argoproj/argo-cd": "v2.12.2",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.15.3",
  // renovate: datasource=github-releases versioning=semver-coerced
  "kubernetes-csi/external-snapshotter": "v8.0.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "immich-app/immich-charts": "immich-0.7.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "immich-app/immich-server":
    "v1.113.0@sha256:9d1c9ab40f3171f1dc06d5c6bc32541ff4b0835c1d217ff5cc61c85e26d2452f",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.30.0",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.5.9",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  "minio": "14.6.31",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.16.4",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "61.9.0",
  // renovate: datasource=github-releases versioning=semver-coerced
  "rancher/system-upgrade-controller": "v0.13.4",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.70.0",
  // renovate: datasource=helm registryUrl=https://backube.github.io/helm-charts/ versioning=semver
  "volsync": "0.10.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/postgres":
    "16.2@sha256:4aea012537edfad80f98d870a36e6b90b4c09b27be7f4b4759d72db863baeebb",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:0db9d2b9d9b63354d93a7210894f7f9ff65d63df4e887900cf23aaebe48bb1bc",
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
    "1.40.5.8897-e5987a19d@sha256:2faf8cb9c5f9e824de41cea420e18ad6fe8ae17905bc16bd23661bb90d96e2e4",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.14.4@sha256:19d9f3ec9419c0eff541edc6a06eea0cdf7591786f01be29f702d9194d3d12cb",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.4.3@sha256:0364bb3d8d03cf0995036140322f6d0de78dd1924ba990499f67598f7c61ff62",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "bitmagnet-io/bitmagnet":
    "v0.9.5@sha256:7bf46883d18c520616cd8d11a08a29be2f49e7295843742c9cb363b499239b25",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.33.2@sha256:d07a41c68b1bac3b58069ee17f454fa09c2667b1621bdcc4b121adcf91e55f15",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.21.2@sha256:c93f075dc5afb74dc7a0a55e90974f81425a5d3c5d293022c5416431f4963ce9",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.39@sha256:2f011a9aca767af62008d879eefcbc80a8645bd4fd4466ab312cc941cb658ad1",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.6@sha256:e53ee17a097892d1aef299dc66dcd3f76edf3466f787cf24d082882fa165a793",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.9.1@sha256:47acec85a0d92d107096088aebe83d1d0a434def34e5bac317fff18ca28741ae",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.9@sha256:879f5f35b05566f71296bad0f3704709103568a6b4f42f5959543f5322728723",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "esphome/esphome":
    "2024.7.3@sha256:4e7488fa18b6896dd5075bca3547b2137fa8aed3bc60f9467bddf09cd67a0741",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:29599f9707216318ab71ac1f41dca920f5a7033e361582190e4cd9bec1453980",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2024.8.3@sha256:49501c175b6108e94d20a723e6a991a14389454374eba06b2c6833b1315e34b5",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.27.10@sha256:d5481de808a1de5a13b814a922b1f6de5fcde64c1ca95b0a065218b56570fae3",
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
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "koush/scrypted": "latest",
};

export default versions;
