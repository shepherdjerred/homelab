const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  connect: "2.0.5",
  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm versioning=semver
  "argo-cd": "9.1.6",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.19.1",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.34.1",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.18.3",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "80.2.0",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "prometheus-adapter": "5.2.0",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.90.9",
  // renovate: datasource=docker registryUrl=https://quay.io versioning=docker
  "redlib/redlib": "latest@sha256:dffb6c5a22f889d47d8e28e33411db0fb6c5694599f72cf740c912c12f5fc1c6",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server": "2025.10.5-java21@sha256:0062e45ec8aa8bdbeeb6b4ad0e15df804c4525f0e208b66d899ab677230ee0e9",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.42.2.10156-f737b826c@sha256:9c03c26b9479ba9a09935f3367459bfdc8d21545f42ed2a13258983c5be1b252",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli": "2.16.0@sha256:4d764be0f66532f6820a82aa365e530414f50f462410ce0949edd3fc22ccb9d5",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr": "1.5.3@sha256:648f694532a3a53d8cf78bc888919ef538659bad41af4c680b0427ad1047d171",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr": "1.34.0@sha256:f6a782e44742a02bdb6032d32ebb4e9615e261140f879be897b28cdb40ff800e",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr": "2.3.0@sha256:475853535de3de8441b87c1457c30f2e695f4831228b12b6b7274e9da409d874",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun": "v3.40.3@sha256:ef4a44819a60469682c7b5e69183e6401171891feaa60186652d292c59e41b30",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent": "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr": "6.0.4@sha256:6c0948b42c149e36bb3dbc0b64d36c77b2d3c9dccf1b424c4f72af1e57ba0c21",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr": "4.0.16@sha256:60e5edcac39172294ad22d55d1b08c2c0a9fe658cad2f2c4d742ae017d7874de",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns": "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink": "main@sha256:0cec4dc64169686c9ee86d3b0ded97b5c3dfd618a65dda3a0deb769c0d18f5fb",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant": "2025.12.1@sha256:4e5e81917192e3fa730948964b19d6e03ff3b9c2694894bc6d6b76769e642055",
  // Custom homelab HA image - updated by CI pipeline
  // not managed by renovate
  "shepherdjerred/homelab": "latest",
  // Custom dependency-summary image - updated by CI pipeline
  // not managed by renovate
  "shepherdjerred/dependency-summary": "latest",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing": "2.0.12@sha256:33edb52c86194a4660a998cd9ad533677cbf635171a424a668a270c0cecd9a05",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v3.0.1",
  // renovate: datasource=helm registryUrl=https://chartmuseum.github.io/charts versioning=semver
  chartmuseum: "3.10.4",
  // renovate: datasource=helm registryUrl=https://itzg.github.io/minecraft-server-charts versioning=semver
  minecraft: "5.0.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "jorenn92/maintainerr": "2.19.0@sha256:bee84707edaf589cda3d18b6813cbfe3a137b52786210c3a28190e10910c1240",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  loki: "6.46.0",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  promtail: "6.17.1",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  tempo: "1.24.1",
  // renovate: datasource=helm registryUrl=https://openebs.github.io/openebs versioning=semver
  openebs: "4.4.0",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/beta": "1.0.960",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/prod": "1.0.802",
  // not managed by renovate
  "shepherdjerred/starlight-karma-bot/beta": "1.0.14",
  // not managed by renovate
  "shepherdjerred/starlight-karma-bot/prod": "1.0.13",
  // not managed by renovate
  "shepherdjerred/birmel": "0.0.1",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "freshrss/freshrss": "1.27.1@sha256:9a56be99f3927cc8fab4c6bbd5723ae098824792d4d98a84007a95eb64e8f905",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "chocobozzz/peertube": "v7.2.3-bookworm@sha256:562547f62d138fccbfc8c81b47e2f5556df6c8bdb58730f3df8b5cab84613db1",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set-controller": "0.13.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set": "0.13.0",
  // renovate: datasource=docker registryUrl=https://registry.dagger.io versioning=loose
  "dagger-helm": "0.19.8",
  // renovate: datasource=helm registryUrl=https://vmware-tanzu.github.io/helm-charts versioning=semver
  velero: "11.2.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "velero/velero-plugin-for-aws": "v1.13.1@sha256:472d0e486d5d5c23c782b1b123530c7df8645784523ec36ca661a326d47885ff",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "openebs/velero-plugin": "3.6.0@sha256:9ea3331d891e436a7239e37e68ca4c8888500cb122be7cdc9d8400f345555c76",
  // renovate: datasource=github-releases versioning=semver
  "kubernetes/kubernetes": "v1.34.2",
  // renovate: datasource=custom.papermc versioning=semver
  paper: "1.21.10",
  // this is empty because we have to perform some string manipulation below
  // not managed by renovate
  dagger: "",
  // renovate: datasource=docker registryUrl=https://ghcr.io/recyclarr versioning=docker
  recyclarr: "7.5.2@sha256:2550848d43a453f2c6adf3582f2198ac719f76670691d76de0819053103ef2fb",
  // renovate: datasource=github-releases versioning=semver
  "siderolabs/talos": "1.11.5",
  // renovate: datasource=helm registryUrl=https://opensource.zalando.com/postgres-operator/charts/postgres-operator versioning=semver
  "postgres-operator": "1.14.0",
  // renovate: datasource=helm registryUrl=https://helm.coder.com/v2 versioning=semver
  coder: "2.29.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "cooperspencer/gickup": "0.10.39@sha256:3d0dabf3180ac8d3cc1939161e8b55947d697e453abeda29bdc42bb0319a9ed1",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "esanchezm/prometheus-qbittorrent-exporter":
    "v1.6.0@sha256:b987d19693a5b2fe7314b22009c6302e084ec801fcf96afaf14065b4cdafc842",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "jsclayton/prometheus-plex-exporter": "main@sha256:18ef1b2197efbcb75bd7276380955760995f10a9fbe55106809a6fcff91c2940",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  redis: "24.0.4",
  // renovate: datasource=helm registryUrl=https://windmill-labs.github.io/windmill-helm-charts/ versioning=semver
  windmill: "3.0.65",
  // renovate: datasource=helm registryUrl=https://charts.gitlab.io/ versioning=semver
  gitlab: "9.6.2",
  // renovate: datasource=helm registryUrl=https://charts.bitnami.com/bitnami versioning=semver
  mariadb: "24.0.1",
  // renovate: datasource=helm registryUrl=https://groundhog2k.github.io/helm-charts/ versioning=semver
  "groundhog2k/rabbitmq": "2.2.2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "postalserver/postal": "3.1.1@sha256:3ed74702cb18b0c2d4467eeb870f12ee133d4fea32abd53e1c912c8e871cee0e",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/mariadb": "11.8@sha256:1cac8492bd78b1ec693238dc600be173397efd7b55eabc725abc281dc855b482",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/rabbitmq": "3.13-management@sha256:e582c0bc7766f3342496d8485efb5a1df782b5ce3886ad017e2eaae442311f69",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "boky/postfix": "latest@sha256:f3f247fd42528b969e2603ac120d5a5b5db7dfe61f4505c49d438b9ba1822999",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "library/busybox": "latest@sha256:870e815c3a50dd0f6b40efddb319c72c32c3ee340b5a3e8945904232ccd12f44",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "library/alpine": "latest@sha256:1882fa4569e0c591ea092d3766c4893e19b8901a8e649de7067188aba3cc0679",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "mccloud/bazarr-openai-whisperbridge":
    "latest@sha256:e6d60d008e70c3f6daaa39225db480d698c9be2c57c5857c53caae9798b1f232",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "library/debian": "bookworm-slim@sha256:e899040a73d36e2b36fa33216943539d9957cba8172b858097c2cabcdb20a3e2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "all-hands-ai/openhands": "main@sha256:0dcd216f296cace3321e911dfb143d3b13d680aead5b542881dc4c419cc1a676",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "library/docker": "27-dind@sha256:aa3df78ecf320f5fafdce71c659f1629e96e9de0968305fe1de670e0ca9176ce",
};

const daggerVersion = versions["dagger-helm"].split("@")[0];
if (!daggerVersion) {
  throw new Error("Failed to parse dagger version");
}

versions.dagger = daggerVersion;

export default versions;
