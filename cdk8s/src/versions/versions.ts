const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  "connect": "1.16.0",
  // renovate: datasource=github-releases versioning=semver-coerced
  "argoproj/argo-cd": "v2.13.0",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.16.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "kubernetes-csi/external-snapshotter": "v8.1.0",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.31.1",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.7.17",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  "minio": "14.8.5",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.16.6",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "65.5.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "rancher/system-upgrade-controller": "v0.14.2",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.76.6",
  // renovate: datasource=helm registryUrl=https://backube.github.io/helm-charts/ versioning=semver
  "volsync": "0.10.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/postgres":
    "16.2@sha256:4aea012537edfad80f98d870a36e6b90b4c09b27be7f4b4759d72db863baeebb",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:3037900c479ab646a9f8981162bac77966f6fdfea0233f740ee823200ae4d342",
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
    "2.15.0@sha256:5fea7989ef4612da15bd89719b9d0f9342e6f2a2a05ffe7f09f58ae271e313d7",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.4.5@sha256:be98501c48d98eec67a3269cacf884eb122b884d0775cdb8ee9a03947ef2b493",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.33.2@sha256:6eb9f12c666688d69a4cc8031242202b883d58ba9a781ac22047b3cdcb8037a9",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.27.0@sha256:6b4ce037964e4bf50d341bc9b3aa800238d46ff7de4d7ecc029280c4bb5b2e68",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.39.1@sha256:6a8058e626763cbf735ac2f78c774dbb24fec2490bd9d9f7d67e22592cb4a991",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.15.1@sha256:18d7873c8b773c10944c475fe96ca8ae79186512d3c6f403bcbd4409c9c4acfc",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.11@sha256:4ba3bfa985b911129b449734bbf63749a03f6ef69b8ca37f2ecd74d46fabef1f",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "esphome/esphome":
    "2024.10.3@sha256:4e3611857c4f71b1a48a09bb8a34687da54ff4793535879efec8ea4b1302615d",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:1257ec61843f0850610beca16626599daae30619132d8a3e97679ad36de478c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2024.11.3@sha256:988ae0f8bab0620d7e9abdcf07f8a8f6d88f5ae301749e61e6cf00aaed13a19b",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.28.1@sha256:83bcc3c4138401e10c138c33a49f4e1bd216bab48e4a801d4fd088ad5ac5f3a7",
  // renovate: datasource=github-releases versioning=semver-coerced
  "windmill-labs/windmill-helm-charts": "windmill-2.0.181",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.5.0",
  // renovate: datasource=helm registry=https://chartmuseum.github.io/charts versioning=semver
  "chartmuseum": "3.10.3",
  // renovate: datasource=helm registry=https://itzg.github.io/minecraft-server-charts versioning=semver
  "minecraft": "4.20.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "koush/scrypted":
    "latest@sha256:906f05fd398edca621cc466f0de322c1e827eb7dd2b78f82c7ea46bd0cd69c18",
  "shepherdjerred/scout-for-lol/beta": "1.0.2",
  "shepherdjerred/scout-for-lol/prod": "1.0.2",
};

export default versions;
