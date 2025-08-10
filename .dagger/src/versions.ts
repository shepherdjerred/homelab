const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine:
    "3.22.0@sha256:8a1f59ffb675680d47db6337b49d22281a139e9d709335b492be023728e11715",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm":
    "3.18.3@sha256:e1d0398b27ef1bfab2709f2df998824a6592705655eabaca96125c287942f6ad",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun":
    "1.2.18@sha256:2cdd9c93006af1b433c214016d72a3c60d7aa2c75691cb44dfd5250aa379986b",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu:
    "noble@sha256:a08e551cb33850e4740772b38217fc1796a66da2506d312abe51acda354ff061",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl":
    "8.14.1@sha256:9a1ed35addb45476afa911696297f8e115993df459278ed036182dd2cd22b67b",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "bitnami/kubectl":
    "1.33.2@sha256:e706851b19c0c4e668614b7c5a6b0c5bbcfbe7fb73f5d999250e0da8bfff42c6",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.7.4",
  // renovate: datasource=python-version versioning=semver
  python: "3.13.5",
  // renovate: datasource=node-version versioning=semver
  node: "22.17.0",
  // this is empty because we have to perform some string manipulation below
  // not managed by renovate
  bun: "",
};

versions["bun"] = versions["oven/bun"].split("@")[0];

export default versions;
