const versions = {
  // https://github.com/renovatebot/renovate/discussions/13845
  // renovate: datasource=custom.k3s
  "k3s": "v1.31.6+k3s1",
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  "connect": "1.17.0",
  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm versioning=semver
  "argo-cd": "7.8.9",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.17.1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "kubernetes-csi/external-snapshotter": "v8.2.1",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.32.0",
  // renovate: datasource=helm registryUrl=https://charts.jenkins.io versioning=semver
  "jenkins": "5.8.17",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.17.2",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "69.8.2",
  // renovate: datasource=github-releases versioning=semver-coerced
  "rancher/system-upgrade-controller": "v0.15.2",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.80.3",
  // renovate: datasource=helm registryUrl=https://backube.github.io/helm-charts/ versioning=semver
  "volsync": "0.12.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/postgres":
    "16.2@sha256:4aea012537edfad80f98d870a36e6b90b4c09b27be7f4b4759d72db863baeebb",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:fc485c15a15be0096fd6cecfafe2a9a70e6300f0db14cad08fa315a8d00cdb02",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver-coerced
  "earthly/satellite":
    "v0.8.15@sha256:eec750b0800104e14f49f97cf92dcb9c2449ee4d9c630d7d88a1eeff920429e3",
  // renovate: datasource=docker registryUrl=https://quay.io versioning=docker
  "invidious/invidious":
    "2024.04.26-eda7444@sha256:a91a307a3ece8468aa88d6b91a601a0453cf76589f434ffdce643f968d3825cc",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit":
    "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server":
    "2025.2.1-java21@sha256:56f535c53c66921f8d7d6efb272d2829da942a7cf5c4b3fa07ee3ada5d2d1822",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "lavalink-devs/lavalink":
    "4.0.8@sha256:cd119c5c902804a8934cc1f13377dd6c5c5de76afadfd8bdd02f4011ce85339a",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.41.4.9463-630c9f557@sha256:b3a376a04fa1912af17a61755089ad2324502fe1b2f8bbf042eab31afe36fc25",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.15.1@sha256:0fca01ac82c0a05f23da1077312edbddabbbab79419c508e4edfaaed73e02461",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.5.1@sha256:36f4ba69ab5bfb32c384ea84cf0036b8b6e07fb9a7ab65885f3619de2a8318f8",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.33.2@sha256:4aa0e08b6b4f857194038c93b3cd7c243501006076d2bfbd2c750f15e7539821",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.31.2@sha256:761f73534a01aec4bf72a1396e9b9fda3f01632948b3fa31985982d26120a330",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.40@sha256:2b42bfa046757145a5155acece417b65b4443c8033fb88661a8e9dcf7fda5a00",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.19.3@sha256:620189d67078ddcfeb7a4efa424eb62f827ef734ef1e56980768bf8efd73782a",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.13@sha256:49a8e636fd4514b23d37c84660101fecbb632174ba0569e0f09bbd2659a2a925",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:131f2c4f625c83b923963acd7ff65de329a5806d0749b9ab2a790ca950804efb",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2025.3.1@sha256:304e6999282c5512939db671e5fcbaa923a1f7c9a6e3990cb5baff7abcb9ac4b",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.29.2@sha256:297efc3dc44b2cd55b9dc9702112cfe9cc7e2efecac2f1e7a18c1cbb6aaddbfe",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.6.1",
  // renovate: datasource=helm registry=https://chartmuseum.github.io/charts versioning=semver
  "chartmuseum": "3.10.3",
  // renovate: datasource=helm registry=https://itzg.github.io/minecraft-server-charts versioning=semver
  "minecraft": "4.20.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "openthread/otbr":
    "latest@sha256:a93395c2554c6925943cfa6effc98b556bb70f5d2398bc9e038ac6bfc2880bc6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "jorenn92/maintainerr":
    "2.10.0@sha256:e4d6c5c1017a2e6969d87c10d3c80f5d221096dc06863c5004774ea5c7621606",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  "loki": "6.27.0",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  "promtail": "6.16.6",
  "shepherdjerred/scout-for-lol/beta": "1.0.112",
  "shepherdjerred/scout-for-lol/prod": "1.0.2",
};

export default versions;
