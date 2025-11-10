const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine: "3.22.2@sha256:4b7ce07002c69e8f3d704a9c5d6fd3053be500b7f1c69fc0d80990c2ad8dd412",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm": "3.19.0@sha256:aef9b56f64e866207d9591d0abd8f6d767b36aadd12edf68f8a719716d9d29c9",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun": "1.3.0@sha256:00cccad6e9c66bbacc250851f689168606aaea551ac473e908bbcf00a5645025",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu: "noble@sha256:66460d557b25769b102175144d538d88219c077c678a49af4afca6fbfc1b5252",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl": "8.17.0@sha256:935d9100e9ba842cdb060de42472c7ca90cfe9a7c96e4dacb55e79e560b3ff40",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/kubectl": "1.34.1@sha256:6c17c1c9ad3d5be45ce805a829d83fb6f63c1a161d498d13b989755586a66459",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.7.6",
  // renovate: datasource=python-version versioning=semver
  python: "3.14.0",
  // renovate: datasource=node-version versioning=semver
  node: "24.11.0",
  // this is empty because we have to perform some string manipulation below
  // not managed by renovate
  bun: "",
  // this is empty because we have to perform some string manipulation below
  // not managed by renovate
  helm: "",
};

const bunVersion = versions["oven/bun"].split("@")[0];
if (bunVersion === undefined) throw new Error("Failed to parse bun version");
versions.bun = bunVersion;

const helmVersion = versions["alpine/helm"].split("@")[0];
if (helmVersion === undefined) throw new Error("Failed to parse helm version");
versions.helm = helmVersion;

export default versions;
