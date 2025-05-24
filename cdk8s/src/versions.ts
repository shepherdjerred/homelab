const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  "connect": "1.17.0",
  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm versioning=semver
  "argo-cd": "7.8.23",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.17.1",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.32.0",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.8.32",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.17.2",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "70.4.1",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.82.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:d90ca1ebf9c8259ca0259eb465ebfe993395e8efc6f1e68253b68676c8d36b76",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver-coerced
  "earthly/satellite":
    "v0.8.15@sha256:2142b7770427ca6ca5d60de79a0d91284eed02a148e931219c8c0155c88b6645",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit":
    "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server":
    "2025.4.2-java21@sha256:b4b149e64bfec97dd61fcbf2269643344691898e16a328b71492e79a571392a9",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.41.6.9685-d301f511a@sha256:a13f35ef4719603e65ce867df9056bf7f99993510b64aa7f91e94e4741482870",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.15.2@sha256:1bb2b36757c4ee8057e585a2adbb730f0bc6cc04b05ce6cc035ca39135efb88a",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.5.1@sha256:f17f0335c1b61aae73dd2b08477ead4ebc6df03f57badddb42a173e4637ee1ed",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.34.0@sha256:1c141ae4fd6e07bf4afa157360c64d8f1a4aed56cf964f79f9db86ca588cd2ab",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.35.1@sha256:c63b71155541de52a9e60ba13fd10824a59f649812ca18701509b7b804a5253a",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.40@sha256:2b42bfa046757145a5155acece417b65b4443c8033fb88661a8e9dcf7fda5a00",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.22.4@sha256:3a220dd02a24cb3610441ec6811bf70846e851e05f3219ec4801a06bd0646912",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.14@sha256:cdf5eb3cfa207d46b066bfbb41b03576c67a1f6ecc8aba19146d0f7349ec79dc",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:5d1453d32b33aa588b687c199ad67c3532298f30b9a720ea5b8171b740268329",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2025.4.4@sha256:c9a4eefee167f674db4a51b1b7466339a5637978cee4df0269e5f41ff1614aaf",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.29.5@sha256:01066805eeeb18cb215c62e0f1882345eb30a9791389fb2d6ee98d9cc95b327e",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.7.4",
  // renovate: datasource=helm registry=https://chartmuseum.github.io/charts versioning=semver
  "chartmuseum": "3.10.3",
  // renovate: datasource=helm registry=https://itzg.github.io/minecraft-server-charts versioning=semver
  "minecraft": "4.20.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "jorenn92/maintainerr":
    "2.14.0@sha256:61ed94bec0ea71b6b289b45ee82acc2c5d94b954026e6cbb1d5262aad6811b59",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  "loki": "6.29.0",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  "promtail": "6.16.6",
  // renovate: datasource=helm registryUrl=https://openebs.github.io/openebs versioning=semver
  "openebs": "4.2.0",
  "shepherdjerred/scout-for-lol/beta": "1.0.165",
  "shepherdjerred/scout-for-lol/prod": "1.0.2",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "stashapp/stash":
    "v0.28.1@sha256:645f6c15b079410d50d488dbeb247c92f25534094dad4e15d886e47648b897f7",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "freshrss/freshrss":
    "1.26.1@sha256:bca4407f1f3ecb2e02bd57f704593c64f89bbf3fad53f03ebcf4baecb0122de6",
};

export default versions;
