const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine: "3.22.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm": "3.18.2",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun": "1.2.16",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu: "noble",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl": "8.13.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "bitnami/kubectl": "1.33.1",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.6.8",
};

export default versions;
