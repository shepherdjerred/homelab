const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  connect: "2.0.5",
  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm versioning=semver
  "argo-cd": "8.6.0",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.19.0",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.34.0",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.18.1",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "78.1.0",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "prometheus-adapter": "5.1.0",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.88.3",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis": "7.2@sha256:9c44a721d444690605ffa32d6b6e1ac565060676386f88bbbb376f56cef2f724",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit": "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server": "2025.10.1-java21@sha256:bf07438096d4cd1b7588cb0e8714d666d1fbb2034ce38acd0d7285ff0648510b",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.42.2.10156-f737b826c@sha256:9c03c26b9479ba9a09935f3367459bfdc8d21545f42ed2a13258983c5be1b252",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli": "2.16.0@sha256:fb4002b7e69c4a20d11e3504c4eebf3cf66956aa1cff740e07fede7a1ea52757",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr": "1.5.3@sha256:005f97fcab0fd7402cd7ff3c09f5ff4da4c63ca51be487e90d5c4dc8a8f85a45",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr": "1.34.0@sha256:f92d51f6e1be0ece091e6e83353f30615f9942ce750acc8e1dc44a44caf39076",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr": "2.0.5@sha256:964485823771c102427a0c1cd896cf6b576add6f21bd041498b92cb040ee7270",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun": "v3.40@sha256:2b42bfa046757145a5155acece417b65b4443c8033fb88661a8e9dcf7fda5a00",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent": "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr": "5.27.5@sha256:af03fa6a993ee7efb65f6121ebd8c89de4a47aa1181cec03832e292a1446111f",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr": "4.0.15@sha256:f3a7fda30a0133b24b04857a21e7a81b97ed2722e147503a47ad0b4fbc7c7694",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns": "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink": "main@sha256:22c63ff0fe9e1540ecfb96d40efbae4955fd86496042b90f8a6cca4a92c6ff19",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant": "2025.10.2@sha256:5ae78cf2e6d8b53439cac50ed184ff1336cfbbb878fce16f75589e048fcdcdd9",
  // Custom homelab HA image - updated by CI pipeline
  // not managed by renovate
  "shepherdjerred/homelab": "latest",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing": "2.0.10@sha256:e5a6e179dab7452cd93768965b5c71a840448e1291b1f781426429bbb0a128c2",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.8.3",
  // renovate: datasource=helm registryUrl=https://chartmuseum.github.io/charts versioning=semver
  chartmuseum: "3.10.4",
  // renovate: datasource=helm registryUrl=https://itzg.github.io/minecraft-server-charts versioning=semver
  minecraft: "5.0.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "jorenn92/maintainerr": "2.19.0@sha256:bee84707edaf589cda3d18b6813cbfe3a137b52786210c3a28190e10910c1240",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  loki: "6.42.0",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  promtail: "6.17.0",
  // renovate: datasource=helm registryUrl=https://openebs.github.io/openebs versioning=semver
  openebs: "4.3.3",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/beta": "1.0.183",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/prod": "1.0.144",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "freshrss/freshrss": "1.27.1@sha256:9a56be99f3927cc8fab4c6bbd5723ae098824792d4d98a84007a95eb64e8f905",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set-controller": "0.12.1",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set": "0.12.1",
  // renovate: datasource=docker registryUrl=https://registry.dagger.io versioning=loose
  "dagger-helm": "0.19.2",
  // renovate: datasource=helm registryUrl=https://vmware-tanzu.github.io/helm-charts versioning=semver
  velero: "11.0.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "velero/velero-plugin-for-aws": "v1.13.0@sha256:0b08ec0d150424fa914487e6665d7c84fff0c6a8eca76a23fa6d09e621d36d8a",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "openebs/velero-plugin": "3.6.0@sha256:9ea3331d891e436a7239e37e68ca4c8888500cb122be7cdc9d8400f345555c76",
  // renovate: datasource=helm registryUrl=https://iv-org.github.io/invidious-helm-chart versioning=semver
  invidious: "2.3.0",
  // renovate: datasource=github-releases versioning=semver
  "kubernetes/kubernetes": "v1.34.1",
  // renovate: datasource=custom.papermc versioning=semver
  paper: "1.21.10",
  // this is empty because we have to perform some string manipulation below
  // not managed by renovate
  dagger: "",
  // renovate: datasource=docker registryUrl=https://ghcr.io/recyclarr versioning=docker
  recyclarr: "7.4.1@sha256:759540877f95453eca8a26c1a93593e783a7a824c324fbd57523deffb67f48e1",
  // renovate: datasource=github-releases versioning=semver
  "siderolabs/talos": "1.11.2",
  // renovate: datasource=helm registryUrl=https://opensource.zalando.com/postgres-operator/charts/postgres-operator versioning=semver
  "postgres-operator": "1.14.0",
  // renovate: datasource=helm registryUrl=https://helm.coder.com/v2 versioning=semver
  coder: "2.27.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "cooperspencer/gickup": "0.10.39@sha256:3d0dabf3180ac8d3cc1939161e8b55947d697e453abeda29bdc42bb0319a9ed1",
};

const daggerVersion = versions["dagger-helm"].split("@")[0];
if (!daggerVersion) {
  throw new Error("Failed to parse dagger version");
}

versions.dagger = daggerVersion;

export default versions;
