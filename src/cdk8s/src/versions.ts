const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  connect: "1.17.0",
  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm versioning=semver
  "argo-cd": "8.0.17",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.18.0",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.32.1",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  jenkins: "5.8.32",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.17.3",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "72.9.1",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.84.2",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:fc406aff11b00ada4365adfb9f373212a5433499c951878b78862bd9456bfd84",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver-coerced
  "earthly/satellite":
    "v0.8.15@sha256:2142b7770427ca6ca5d60de79a0d91284eed02a148e931219c8c0155c88b6645",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit":
    "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server":
    "2025.6.0-java21@sha256:107a643a0939eef1a790a9260694d13c04866a3c3bda954fa279806c4fd2601a",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.41.8.9834-071366d65@sha256:3ec0e4ea00cb2d964da92a5b3dd06e882e0a91d38f9a326fb54b8f229a3a6e89",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.15.2@sha256:899245206017f6874e32a499a7cd305526ffa3440252cbfee6a175198c3453df",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.5.2@sha256:a92ba81b9405942d0b5c01e2707ba8fb99ab059dd800d1dc0e8f52f62ddf74dd",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.34.0@sha256:1205b8873f3ea0a98890191d9e01da911d9509272462a46414ba0378a6d76288",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.36.3@sha256:1a6cdd0cc2350f8527dab39bc8467c9a2553bbbcf75a2c66f882fc53d73d5deb",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.40@sha256:2b42bfa046757145a5155acece417b65b4443c8033fb88661a8e9dcf7fda5a00",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.25.0@sha256:36e43720c130ec2d3ed80726d2134af3c6644729f4750abc830fdda7fa71d1e1",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.14@sha256:de67e5b682fedcc4ac34f28a5697931c680c959ea65f8111b0cce17bc698c0b2",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:b3f8bceb1d46cf98da46347f271d7b153877310e5c1918c181c081c19e3827c0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2025.6.1@sha256:857745bd01589750174e60f2c477a65da1169c4f1c098a58db792baae7f7ada6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.29.7@sha256:2600853512ea2744d88b05fba7524d4bc6d99e14975d408a7f53beee0a2b83e1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.7.4",
  // renovate: datasource=helm registry=https://chartmuseum.github.io/charts versioning=semver
  chartmuseum: "3.10.3",
  // renovate: datasource=helm registry=https://itzg.github.io/minecraft-server-charts versioning=semver
  minecraft: "4.20.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "jorenn92/maintainerr":
    "2.17.0@sha256:d0700764e30cfb6c10b3e13c555427f931f2193c57effa3938458f146da504df",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  loki: "6.30.1",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  promtail: "6.17.0",
  // renovate: datasource=helm registryUrl=https://openebs.github.io/openebs versioning=semver
  openebs: "4.2.0",
  "shepherdjerred/scout-for-lol/beta": "1.0.167",
  "shepherdjerred/scout-for-lol/prod": "1.0.2",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "stashapp/stash":
    "v0.28.1@sha256:645f6c15b079410d50d488dbeb247c92f25534094dad4e15d886e47648b897f7",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "freshrss/freshrss":
    "1.26.3@sha256:f9733e2cdf754d82e25826324fb4cbf3d736d82e2d36bf8e379dd4f0eeee0932",
  // renovate: datasource=github-releases versioning=semver
  "actions/actions-runner-controller": "0.27.6",
};

export default versions;
