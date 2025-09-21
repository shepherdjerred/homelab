const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  connect: "2.0.2",
  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm versioning=semver
  "argo-cd": "8.3.0",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.18.2",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.32.1",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.17.3",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "76.4.0",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.86.5",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:80f52338282f0b18caafcab372e816b3e11bca49d503c00db96799d6a12131b7",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit":
    "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server":
    "2025.8.1-java21@sha256:92681e6745391ed80c7e59ebe9ba9956e787178b9e52c34e734e998bc80a8649",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.42.1.10060-4e8b05daf@sha256:4e704a2172129d8a6bc5b05ea201945b329bb6512f48a4e92ed4a4a787c35462",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.16.0@sha256:e59ad4e5ad8ba315696b47944869b84989984e6c335e8df38e5f8bccce31fd18",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.5.2@sha256:fed1656839bf8d916d6e7d0586c465ee7594cd503e6165c202ec782f25ea3029",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.34.0@sha256:bad11167104f7b0ff0beb924c9568bb7ea991c225949a209d0b8b00a5434479d",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "2.0.5@sha256:4f2a6d597845b2f3e19284b1d982b3e0b4bd7c22472c2979c956aa198b83f472",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.40@sha256:2b42bfa046757145a5155acece417b65b4443c8033fb88661a8e9dcf7fda5a00",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.27.5@sha256:19474a623b278f558c9696a19b84640ad4aff3b2959f08904a77ffbad73ed7bd",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.15@sha256:e00e87e0e7c24fdc992093756f120a6ab292790b6a637ff3641bf813091cd726",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:22c63ff0fe9e1540ecfb96d40efbae4955fd86496042b90f8a6cca4a92c6ff19",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2025.9.3@sha256:2da8dea31821db443a69d822bd0c47972572fc8379a920a8fac730d2072c8ed2",
  // Custom homelab HA image - updated by CI pipeline
  // not managed by renovate
  "shepherdjerred/homelab": "latest",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "2.0.9@sha256:cec9b511a473cf622ce30c50646365df3277798b12f59829e1713ba6c263074d",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.8.2",
  // renovate: datasource=helm registryUrl=https://chartmuseum.github.io/charts versioning=semver
  chartmuseum: "3.10.4",
  // renovate: datasource=helm registryUrl=https://itzg.github.io/minecraft-server-charts versioning=semver
  minecraft: "4.26.4",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "jorenn92/maintainerr":
    "2.19.0@sha256:bee84707edaf589cda3d18b6813cbfe3a137b52786210c3a28190e10910c1240",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  loki: "6.36.1",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  promtail: "6.17.0",
  // renovate: datasource=helm registryUrl=https://openebs.github.io/openebs versioning=semver
  openebs: "4.3.2",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/beta": "1.0.119",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/prod": "1.0.167",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "freshrss/freshrss":
    "1.26.3@sha256:f9733e2cdf754d82e25826324fb4cbf3d736d82e2d36bf8e379dd4f0eeee0932",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set-controller": "0.12.1",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set": "0.12.1",
  // renovate: datasource=docker registryUrl=https://registry.dagger.io versioning=loose
  "dagger-helm": "0.18.17",
  // renovate: datasource=helm registryUrl=https://vmware-tanzu.github.io/helm-charts versioning=semver
  velero: "10.1.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "velero/velero-plugin-for-aws":
    "v1.12.2@sha256:bef271808e0547bb70f69f0430cc73f7a2fa938949c50f7b31171018be967335",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "openebs/velero-plugin":
    "3.6.0@sha256:9ea3331d891e436a7239e37e68ca4c8888500cb122be7cdc9d8400f345555c76",
  // renovate: datasource=github-releases versioning=semver
  "kubernetes/kubernetes": "v1.33.2",
  // renovate: datasource=custom.papermc versioning=semver
  paper: "1.21.8",
  // this is empty because we have to perform some string manipulation below
  // not managed by renovate
  dagger: "",
  // renovate: datasource=docker registryUrl=https://ghcr.io/recyclarr/recyclarr versioning=docker
  recyclarr:
    "7.4.1@sha256:759540877f95453eca8a26c1a93593e783a7a824c324fbd57523deffb67f48e1",
  // renovate: datasource=github-releases versioning=semver
  "siderolabs/talos": "1.10.5",
  // renovate: datasource=helm registryUrl=https://opensource.zalando.com/postgres-operator/charts/postgres-operator versioning=semver
  "postgres-operator": "1.14.0",
};

const daggerVersion = versions["dagger-helm"].split("@")[0];
if (!daggerVersion) {
  throw new Error("Failed to parse dagger version");
}

versions.dagger = daggerVersion;

export default versions;
