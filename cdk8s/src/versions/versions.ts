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
    "v1.114.0@sha256:df4ae6d2bf8aa3ebd6370b42a667a007c5e7452a1cd2ab4c22fbaff9a69ffcbc",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.30.0",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.5.9",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  "minio": "14.6.32",
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
    "2.14.4@sha256:d2a93f8039f09d45999154d4bfea57ada0917b9dbba72e8f4848cbdf9b2bb8ff",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.4.3@sha256:16a30c1ef7412f3781dc9635bd42798399601a9750f871cb68e5efb5545ce0f5",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "bitmagnet-io/bitmagnet":
    "v0.9.5@sha256:7bf46883d18c520616cd8d11a08a29be2f49e7295843742c9cb363b499239b25",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.33.2@sha256:d07a41c68b1bac3b58069ee17f454fa09c2667b1621bdcc4b121adcf91e55f15",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.23.1@sha256:c1318191d5211ac7462c754422eafe350ed0de61c4160065a420896068ec1ccc",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.39@sha256:2f011a9aca767af62008d879eefcbc80a8645bd4fd4466ab312cc941cb658ad1",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.6@sha256:5c89a1cd3132981c51fc5ba0f47ecae9b10253029cf8decaa8ae14236fb11e32",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.9.1@sha256:5ab12592e768d04d94bc04877bee194f372ea3946abc6de689311f4d8559ee2f",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.9@sha256:138998077a802c18b76c26636301fcd5517b7bfaf75db025d457199176078a12",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "esphome/esphome":
    "2024.7.3@sha256:4e7488fa18b6896dd5075bca3547b2137fa8aed3bc60f9467bddf09cd67a0741",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:7d669daa8c2fd540d3c1d3308ff88c7b74422429d110967062c8dfac2039608b",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2024.9.1@sha256:f1a96b632ea6f2b96f882ea17e2ed3660a741d5e45a5278ef0f38abe8e1df6c8",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.27.12@sha256:2339cd2967d886ef16d9ba3c332060330915b53111aa022eba7313a1136f0a4a",
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
