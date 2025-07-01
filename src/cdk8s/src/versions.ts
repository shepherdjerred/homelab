const versions = {
  // renovate: datasource=helm registryUrl=https://1password.github.io/connect-helm-charts/ versioning=semver
  "connect": "1.17.0",
  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm versioning=semver
  "argo-cd": "8.1.2",
  // renovate: datasource=helm registryUrl=https://charts.jetstack.io versioning=semver-coerced
  "cert-manager": "v1.18.1",
  // renovate: datasource=helm registryUrl=https://intel.github.io/helm-charts/ versioning=semver
  "intel-device-plugins-operator": "0.32.1",
  // renovate: datasource=helm registryUrl=https://kubernetes-sigs.github.io/node-feature-discovery/charts versioning=semver
  "node-feature-discovery": "0.17.3",
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts versioning=semver
  "kube-prometheus-stack": "75.6.1",
  // renovate: datasource=helm registryUrl=https://pkgs.tailscale.com/helmcharts versioning=semver
  "tailscale-operator": "1.84.3",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "library/redis":
    "7.2@sha256:6559e04fe4d5f60232de25098cd49631a515e372a843252d3de735f35d6fc43b",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "teddit/teddit":
    "latest@sha256:00a5c4f558592d5ef7be7c918cc8965296745a24a54c9bb215884baa31df0fea",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "itzg/minecraft-server":
    "2025.6.2-java21@sha256:262e2309f7cc6b2ff0ac1458ac52c91e9bc778989543feec6588501f6dad31ef",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=loose
  "plexinc/pms-docker":
    "1.41.8.9834-071366d65@sha256:3ec0e4ea00cb2d964da92a5b3dd06e882e0a91d38f9a326fb54b8f229a3a6e89",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/tautulli":
    "2.15.2@sha256:899245206017f6874e32a499a7cd305526ffa3440252cbfee6a175198c3453df",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/bazarr":
    "1.5.2@sha256:b515d79a4f7aa4bbbdfe45376d996a9bae2794faa16aca5a2beab0dba0c0b074",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/overseerr":
    "1.34.0@sha256:1205b8873f3ea0a98890191d9e01da911d9509272462a46414ba0378a6d76288",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/prowlarr":
    "1.37.0@sha256:b058be8a4e083e0cba238f03759994617a559abe0c89e5ed66454b44395da6a9",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver-coerced
  "qdm12/gluetun":
    "v3.40@sha256:2b42bfa046757145a5155acece417b65b4443c8033fb88661a8e9dcf7fda5a00",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/qbittorrent":
    "4.6.7@sha256:55f15d44396315551f87294a176efae733b16e283f38980308e46073950257c6",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/radarr":
    "5.26.2@sha256:07a474b61394553e047ad43a1a78c1047fc99be0144c509dd91e3877f402ebcb",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/sonarr":
    "4.0.15@sha256:1156329d544b38bd1483add75c9b72c559f20e1ca043fd2d6376c2589d38951f",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "timothyjmiller/cloudflare-ddns":
    "latest@sha256:2187e122660d6a2d451ef7c53fd4805c133133f4f47552256352c1e2a7f49ee2",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "tailscale/golink":
    "main@sha256:b3f8bceb1d46cf98da46347f271d7b153877310e5c1918c181c081c19e3827c0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "home-assistant/home-assistant":
    "2025.6.3@sha256:e207929bdf5dc95db43c618b877364e99f7ad506ec5440aeef80d5c9c1cae668",
  // Custom homelab HA image - updated by CI pipeline
  // not managed by renovate
  "shepherdjerred/homelab": "latest",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=semver
  "linuxserver/syncthing":
    "1.29.7@sha256:2600853512ea2744d88b05fba7524d4bc6d99e14975d408a7f53beee0a2b83e1",
  // renovate: datasource=github-releases versioning=semver-coerced
  "dotdc/grafana-dashboards-kubernetes": "v2.7.4",
  // renovate: datasource=helm registryUrl=https://chartmuseum.github.io/charts versioning=semver
  "chartmuseum": "3.10.4",
  // renovate: datasource=helm registryUrl=https://itzg.github.io/minecraft-server-charts versioning=semver
  "minecraft": "4.20.0",
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "jorenn92/maintainerr":
    "2.18.1@sha256:da4b3b5b5e0a4aae6b4e294abdad2510a3be9bd138af8f4ca5a6e7cd6d94b1a2",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  "loki": "6.30.1",
  // renovate: datasource=helm registryUrl=https://grafana.github.io/helm-charts versioning=semver
  "promtail": "6.17.0",
  // renovate: datasource=helm registryUrl=https://openebs.github.io/openebs versioning=semver
  "openebs": "4.2.0",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/beta": "1.0.167",
  // not managed by renovate
  "shepherdjerred/scout-for-lol/prod": "1.0.167",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "stashapp/stash":
    "v0.28.1@sha256:645f6c15b079410d50d488dbeb247c92f25534094dad4e15d886e47648b897f7",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "freshrss/freshrss":
    "1.26.3@sha256:f9733e2cdf754d82e25826324fb4cbf3d736d82e2d36bf8e379dd4f0eeee0932",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set-controller":
    "0.12.1@sha256:621fb48c3fbf79cb817f03da35d19a26c35ad34de13e8cfa9816f9e462d2ce80",
  // renovate: datasource=docker registryUrl=https://ghcr.io/actions/actions-runner-controller-charts versioning=semver
  "gha-runner-scale-set":
    "0.12.1@sha256:97125addd369e3fd2838ff279fc685a83d7cfe7e29d56af435c7733633026d53",
  // renovate: datasource=docker registryUrl=https://registry.dagger.io versioning=loose
  "dagger-helm":
    "0.18.12@sha256:a0a1149be6b793856e5d3cf5dca5153b124350262af6f17fa64bd36fad5620e7",
  // renovate: datasource=helm registryUrl=https://vmware-tanzu.github.io/helm-charts versioning=semver
  "velero": "10.0.5",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "velero/velero-plugin-for-aws":
    "v1.12.1@sha256:fa588ffa960d7e42361884d9c0377f20703b224e07d02b5514b33bf4cec04381",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  "openebs/velero-plugin":
    "3.6.0@sha256:9ea3331d891e436a7239e37e68ca4c8888500cb122be7cdc9d8400f345555c76",
  // renovate: datasource=github-releases versioning=semver
  "kubernetes/kubernetes": "v1.33.2",
  // renovate: datasource=custom.papermc versioning=semver
  "paper": "1.21.4",
  // this is empty because we have to perform some string manipulation below
  // not managed by renovate
  "dagger": "",
};

versions["dagger"] = versions["dagger-helm"].split("@")[0] as string;

export default versions;
