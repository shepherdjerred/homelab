const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  connect: "2.0.5",
  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm versioning=semver
  "argo-cd": "9.0.1",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.19.1",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.34.0",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.18.1",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "78.3.2",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "prometheus-adapter": "5.1.0",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.88.4",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis": "7.2@sha256:76dc61f6ca42748060aa86080ef8393d0c118660db0a1dead26c2b8e94bf601b",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit": "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server": "2025.10.2-java21@sha256:cbfb468b13a957924d24a2f1dd9676fe262566ab97b0aee9070f27b41de69d05",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.42.2.10156-f737b826c@sha256:9c03c26b9479ba9a09935f3367459bfdc8d21545f42ed2a13258983c5be1b252",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli": "2.16.0@sha256:f8b84be159b6e413db2b60426154522ceaf33d7190489c160de415501d5e722e",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr": "1.5.3@sha256:a42fef2a5ffa1dca8714e12892ba0b8de5c6c513f1bcdb1ffe4143e715cffb45",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr": "1.34.0@sha256:c5f3c0c246f121b5e4bc8cda2b6e22806f1e1443fc4235c3c050e5b09ae8eda7",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr": "2.1.5@sha256:643220338204525524db787ff38a607261597f49d1f550694acdb3e908e2b43e",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun": "v3.40@sha256:2b42bfa046757145a5155acece417b65b4443c8033fb88661a8e9dcf7fda5a00",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent": "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr": "5.28.0@sha256:c984533510abe0219a70e80d15bd0d212b7df21baa0913759c4ce6cc9092240b",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr": "4.0.15@sha256:fbe67c25693dc5f3de220c5691f374576ae265df782c16918cc071b630490bd7",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns": "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink": "main@sha256:c0bf589fb1acefdcec2dd99530a0e216a06cdff5bba90181f9f0a076b8554735",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant": "2025.11.1@sha256:c11dd7c74039223c43079d700aa559d6dc61e8e0b38a08d651f91d1bc550cff5",
  // Custom homelab HA image - updated by CI pipeline
  // not managed by renovate
  "shepherdjerred/homelab": "latest",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing": "2.0.10@sha256:16f13abb71e0cca9cd57524754f53e57c5deaae5e94bbc7974c41732f72557df",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.8.3",
  // renovate: datasource=helm registryUrl=https://chartmuseum.github.io/charts versioning=semver
  chartmuseum: "3.10.4",
  // renovate: datasource=helm registryUrl=https://itzg.github.io/minecraft-server-charts versioning=semver
  minecraft: "5.0.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "jorenn92/maintainerr": "2.19.0@sha256:bee84707edaf589cda3d18b6813cbfe3a137b52786210c3a28190e10910c1240",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  loki: "6.43.0",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  promtail: "6.17.1",
  // renovate: datasource=helm registryUrl=https://openebs.github.io/openebs versioning=semver
  openebs: "4.3.3",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/beta": "1.0.245",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/prod": "1.0.240",
  // not managed by renovate
  "shepherdjerred/starlight-karma-bot/beta": "1.0.14",
  // not managed by renovate
  "shepherdjerred/starlight-karma-bot/prod": "1.0.13",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "freshrss/freshrss": "1.27.1@sha256:9a56be99f3927cc8fab4c6bbd5723ae098824792d4d98a84007a95eb64e8f905",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set-controller": "0.13.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set": "0.13.0",
  // renovate: datasource=docker registryUrl=https://registry.dagger.io versioning=loose
  "dagger-helm": "0.19.4",
  // renovate: datasource=helm registryUrl=https://vmware-tanzu.github.io/helm-charts versioning=semver
  velero: "11.1.1",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "velero/velero-plugin-for-aws": "v1.13.0@sha256:0b08ec0d150424fa914487e6665d7c84fff0c6a8eca76a23fa6d09e621d36d8a",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "openebs/velero-plugin": "3.6.0@sha256:9ea3331d891e436a7239e37e68ca4c8888500cb122be7cdc9d8400f345555c76",
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
  coder: "2.27.1",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "cooperspencer/gickup": "0.10.39@sha256:3d0dabf3180ac8d3cc1939161e8b55947d697e453abeda29bdc42bb0319a9ed1",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "esanchezm/prometheus-qbittorrent-exporter":
    "v1.6.0@sha256:b987d19693a5b2fe7314b22009c6302e084ec801fcf96afaf14065b4cdafc842",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "jsclayton/prometheus-plex-exporter": "main@sha256:18ef1b2197efbcb75bd7276380955760995f10a9fbe55106809a6fcff91c2940",
};

const daggerVersion = versions["dagger-helm"].split("@")[0];
if (!daggerVersion) {
  throw new Error("Failed to parse dagger version");
}

versions.dagger = daggerVersion;

export default versions;
