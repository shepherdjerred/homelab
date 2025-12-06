const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine: "3.22.2@sha256:4b7ce07002c69e8f3d704a9c5d6fd3053be500b7f1c69fc0d80990c2ad8dd412",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm": "3.19.0@sha256:aef9b56f64e866207d9591d0abd8f6d767b36aadd12edf68f8a719716d9d29c9",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun": "1.3.1@sha256:9c5d3c92b234b4708198577d2f39aab7397a242a40da7c2f059e51b9dc62b408",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu: "noble@sha256:c35e29c9450151419d9448b0fd75374fec4fff364a27f176fb458d472dfc9e54",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl": "8.17.0@sha256:935d9100e9ba842cdb060de42472c7ca90cfe9a7c96e4dacb55e79e560b3ff40",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/kubectl": "1.34.2@sha256:96a7d245a74d461925a56e3024d2f027c2a7a822b3e9e0117ec558db42de9c35",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.7.6",
  // renovate: datasource=python-version versioning=semver
  python: "3.14.0",
  // renovate: datasource=node-version versioning=semver
  node: "24.11.1",
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
