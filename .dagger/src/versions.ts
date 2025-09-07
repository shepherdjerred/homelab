const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine:
    "3.22.1@sha256:4bcff63911fcb4448bd4fdacec207030997caf25e9bea4045fa6c8c44de311d1",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm":
    "3.18.3@sha256:e1d0398b27ef1bfab2709f2df998824a6592705655eabaca96125c287942f6ad",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun":
    "1.2.19@sha256:31f25ad4c661322a3dc9d9d98fbf34989502b1ea588a2ca629da98c8e5a2d116",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu:
    "noble@sha256:7c06e91f61fa88c08cc74f7e1b7c69ae24910d745357e0dfe1d2c0322aaf20f9",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl":
    "8.15.0@sha256:4026b29997dc7c823b51c164b71e2b51e0fd95cce4601f78202c513d97da2922",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "bitnami/kubectl":
    "1.33.2@sha256:e706851b19c0c4e668614b7c5a6b0c5bbcfbe7fb73f5d999250e0da8bfff42c6",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.7.4",
  // renovate: datasource=python-version versioning=semver
  python: "3.13.6",
  // renovate: datasource=node-version versioning=semver
  node: "22.18.0",
  // this is empty because we have to perform some string manipulation below
  // not managed by renovate
  bun: "",
};

versions["bun"] = versions["oven/bun"].split("@")[0];

export default versions;
