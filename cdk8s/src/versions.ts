const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  "connect": "1.17.0",
  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm versioning=semver
  "argo-cd": "8.0.14",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.17.2",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.32.1",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.8.32",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.17.3",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "72.9.0",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.84.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:16fabf9208c297905f5da14cc0a3dfda114949aee45b2ef72d21163fa988fe45",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver-coerced
  "earthly/satellite":
    "v0.8.15@sha256:2142b7770427ca6ca5d60de79a0d91284eed02a148e931219c8c0155c88b6645",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit":
    "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server":
    "2025.5.1-java21@sha256:85e861124ca87aeef059e2c8828e16fa106c1af263a82bb03a09b8895af81034",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.41.7.9823-59f304c16@sha256:623d566f871c4b82d0b4392de2ab57886af09ef305ffb93d8de781c323ede6b9",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.15.2@sha256:b7c5608cb7622e969be36038e4a0a11efc58626f611452e7cef07ec82b26e602",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.5.2@sha256:81d76b6c13a7a9481440402f0fa0ff1dc6027d003447da28eb1ed150e1846af7",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.34.0@sha256:01d48e366fe6ae89a2d09e89b7bf171bb391b8bf279c15cd0fb2efd1523692b7",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.37.0@sha256:68d16fa1a692ec26c4340a23f50b5980899c5630ce881fd0015dac849cbb9b53",
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
    "4.0.14@sha256:cdf5eb3cfa207d46b066bfbb41b03576c67a1f6ecc8aba19146d0f7349ec79dc",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:b3f8bceb1d46cf98da46347f271d7b153877310e5c1918c181c081c19e3827c0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2025.5.3@sha256:8a99004ff832dbd535e6ac4d141042bc31141ff6a86b4d5bb288b3680fbceac1",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.29.6@sha256:644887112036dc36905ad651a5c7fddee209456261c11558792057035058b0ad",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.7.4",
  // renovate: datasource=helm registry=https://chartmuseum.github.io/charts versioning=semver
  "chartmuseum": "3.10.3",
  // renovate: datasource=helm registry=https://itzg.github.io/minecraft-server-charts versioning=semver
  "minecraft": "4.20.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "jorenn92/maintainerr":
    "2.17.0@sha256:d0700764e30cfb6c10b3e13c555427f931f2193c57effa3938458f146da504df",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  "loki": "6.30.1",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  "promtail": "6.17.0",
  // renovate: datasource=helm registryUrl=https://openebs.github.io/openebs versioning=semver
  "openebs": "4.2.0",
  "shepherdjerred/scout-for-lol/beta": "1.0.167",
  "shepherdjerred/scout-for-lol/prod": "1.0.2",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "stashapp/stash":
    "v0.28.1@sha256:645f6c15b079410d50d488dbeb247c92f25534094dad4e15d886e47648b897f7",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "freshrss/freshrss":
    "1.26.2@sha256:ac8ba074707a020b1a865ae6671f17b6110068142484cee9f36df02ed6c41130",
};

export default versions;
