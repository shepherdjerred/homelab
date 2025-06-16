const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine:
    "3.22.0@sha256:8a1f59ffb675680d47db6337b49d22281a139e9d709335b492be023728e11715",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm":
    "3.18.2@sha256:e8f1b858cd8b8539465ff93990cdf5ee8a0df760104a860fd5f16a71d9677a07",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun":
    "1.2.16@sha256:ffd754d1d771513d7b21fb013b60bfc1e22e862d310e9727726d25d1827b6a06",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu:
    "noble@sha256:04f510bf1f2528604dc2ff46b517dbdbb85c262d62eacc4aa4d3629783036096",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl":
    "8.14.1@sha256:9a1ed35addb45476afa911696297f8e115993df459278ed036182dd2cd22b67b",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "bitnami/kubectl":
    "1.33.1@sha256:9081a6f83f4febf47369fc46b6f0f7683c7db243df5b43fc9defe51b0471a950",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.7.2",
  // renovate: datasource=python-version versioning=semver
  python: "3.13.5",
  // renovate: datasource=node-version versioning=semver
  node: "lts",
  bun: "",
};

versions["bun"] = versions["oven/bun"].split("@")[0];

export default versions;
