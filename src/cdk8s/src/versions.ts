const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  connect: "2.0.3",
  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm versioning=semver
  "argo-cd": "8.3.1",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.18.2",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.32.1",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.17.3",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "76.5.1",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.88.3",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis": "7.2@sha256:80f52338282f0b18caafcab372e816b3e11bca49d503c00db96799d6a12131b7",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit": "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server": "2025.8.1-java21@sha256:92681e6745391ed80c7e59ebe9ba9956e787178b9e52c34e734e998bc80a8649",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.42.2.10156-f737b826c@sha256:9c03c26b9479ba9a09935f3367459bfdc8d21545f42ed2a13258983c5be1b252",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli": "2.16.0@sha256:ec6714a372e869967bab7411f4ef87683d782c527ded241e8c84779d6b7c4f9f",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr": "1.5.3@sha256:e424330f048ff1401f22413e34ee11c25ac2de79b6213c6ead3f593b44626c55",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr": "1.34.0@sha256:bad11167104f7b0ff0beb924c9568bb7ea991c225949a209d0b8b00a5434479d",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr": "2.0.5@sha256:856c93bab72a6a41a23ff60bab48554135c044a456f40909307011dea8ddeafb",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun": "v3.40@sha256:2b42bfa046757145a5155acece417b65b4443c8033fb88661a8e9dcf7fda5a00",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent": "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr": "5.27.5@sha256:19474a623b278f558c9696a19b84640ad4aff3b2959f08904a77ffbad73ed7bd",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr": "4.0.15@sha256:328d322af2bb8d7211a9c43a26ff5e658ba3e6f47a695e8fb9ff806bfeab0f04",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns": "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink": "main@sha256:22c63ff0fe9e1540ecfb96d40efbae4955fd86496042b90f8a6cca4a92c6ff19",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant": "2025.10.0@sha256:ae0e2a2f03822c49a0c506bc40e367b4abc8b3207d67a6e0312b42d60867c5e5",
  // Custom homelab HA image - updated by CI pipeline
  // not managed by renovate
  "shepherdjerred/homelab": "latest",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing": "2.0.10@sha256:126c0e89ec159b3a184f4ca00a3fb77eb39a2221db4285a8b4cd2f46db1aa72d",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.8.2",
  // renovate: datasource=helm registryUrl=https://chartmuseum.github.io/charts versioning=semver
  chartmuseum: "3.10.4",
  // renovate: datasource=helm registryUrl=https://itzg.github.io/minecraft-server-charts versioning=semver
  minecraft: "4.26.4",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "jorenn92/maintainerr": "2.19.0@sha256:bee84707edaf589cda3d18b6813cbfe3a137b52786210c3a28190e10910c1240",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  loki: "6.38.0",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  promtail: "6.17.0",
  // renovate: datasource=helm registryUrl=https://openebs.github.io/openebs versioning=semver
  openebs: "4.3.3",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/beta": "1.0.142",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/prod": "1.0.167",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "freshrss/freshrss": "1.27.0@sha256:2b53d2708fc755aab499a96e865be5ae6deeafb99e855e235e8870b4013c56cd",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set-controller": "0.12.1",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set": "0.12.1",
  // renovate: datasource=docker registryUrl=https://registry.dagger.io versioning=loose
  "dagger-helm": "0.19.0",
  // renovate: datasource=helm registryUrl=https://vmware-tanzu.github.io/helm-charts versioning=semver
  velero: "10.1.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "velero/velero-plugin-for-aws": "v1.12.2@sha256:bef271808e0547bb70f69f0430cc73f7a2fa938949c50f7b31171018be967335",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "openebs/velero-plugin": "3.6.0@sha256:9ea3331d891e436a7239e37e68ca4c8888500cb122be7cdc9d8400f345555c76",
  // renovate: datasource=helm registryUrl=https://iv-org.github.io/invidious-helm-chart versioning=semver
  invidious: "2.3.0",
  // renovate: datasource=github-releases versioning=semver
  "kubernetes/kubernetes": "v1.33.2",
  // renovate: datasource=custom.papermc versioning=semver
  paper: "1.21.8",
  // this is empty because we have to perform some string manipulation below
  // not managed by renovate
  dagger: "",
  // renovate: datasource=docker registryUrl=https://ghcr.io/recyclarr/recyclarr versioning=docker
  recyclarr: "7.4.1@sha256:759540877f95453eca8a26c1a93593e783a7a824c324fbd57523deffb67f48e1",
  // renovate: datasource=github-releases versioning=semver
  "siderolabs/talos": "1.10.5",
  // renovate: datasource=helm registryUrl=https://opensource.zalando.com/postgres-operator/charts/postgres-operator versioning=semver
  "postgres-operator": "1.14.0",
  // renovate: datasource=helm registryUrl=https://helm.coder.com/v2 versioning=semver
  coder: "2.26.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "cooperspencer/gickup": "0.10.39",
};

const daggerVersion = versions["dagger-helm"].split("@")[0];
if (!daggerVersion) {
  throw new Error("Failed to parse dagger version");
}

versions.dagger = daggerVersion;

export default versions;
