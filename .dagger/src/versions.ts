const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine: "3.22.2@sha256:4b7ce07002c69e8f3d704a9c5d6fd3053be500b7f1c69fc0d80990c2ad8dd412",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm": "3.19.0@sha256:a6c449188cf0b3f628cc6da192229a14d165bc8a702137ef750d7f789803721b",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun": "1.2.23@sha256:6ebf306367da43ad75c4d5119563e24de9b66372929ad4fa31546be053a16f74",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu: "noble@sha256:59a458b76b4e8896031cd559576eac7d6cb53a69b38ba819fb26518536368d86",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl": "8.16.0@sha256:463eaf6072688fe96ac64fa623fe73e1dbe25d8ad6c34404a669ad3ce1f104b6",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/kubectl": "1.34.1@sha256:08cd1a88988420c4081c545ed5a95d6b1ca633f39e8a153c5316ddf9ea3bc28f",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.7.6",
  // renovate: datasource=python-version versioning=semver
  python: "3.14.0",
  // renovate: datasource=node-version versioning=semver
  node: "22.20.0",
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
