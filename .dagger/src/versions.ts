const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine: "3.22.1@sha256:4bcff63911fcb4448bd4fdacec207030997caf25e9bea4045fa6c8c44de311d1",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm": "3.19.0@sha256:7893f5629909b3f92f739f16c985eb536bc43ac7a332bee6ba59cec56c660a6d",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun": "1.2.21@sha256:5a2011bf09364b9af658ac1e66f60d08092f4291aeefbff448d58b027734fdd0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu: "noble@sha256:728785b59223d755e3e5c5af178fab1be7031f3522c5ccd7a0b32b80d8248123",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl": "8.16.0@sha256:463eaf6072688fe96ac64fa623fe73e1dbe25d8ad6c34404a669ad3ce1f104b6",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "bitnami/kubectl": "1.33.4@sha256:ed0b31a0508da84ee655c5c6e01bd3897fc56ad6cf69debb27fa1893a06d2246",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.7.6",
  // renovate: datasource=python-version versioning=semver
  python: "3.13.7",
  // renovate: datasource=node-version versioning=semver
  node: "22.18.0",
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
