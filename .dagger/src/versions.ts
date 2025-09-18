const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine:
    "3.22.1@sha256:4bcff63911fcb4448bd4fdacec207030997caf25e9bea4045fa6c8c44de311d1",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm":
    "3.18.4@sha256:e7ecbf4a200dea73d64bfb8cb0936829164945f2b4d02a0274093073ee8d264f",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun":
    "1.2.20@sha256:78f46b81b82d767ee8d729411f6f95089a403c21f17c20a5789df00263d7c5b5",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu:
    "noble@sha256:9cbed754112939e914291337b5e554b07ad7c392491dba6daf25eef1332a22e8",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl":
    "8.15.0@sha256:4026b29997dc7c823b51c164b71e2b51e0fd95cce4601f78202c513d97da2922",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "bitnami/kubectl":
    "1.33.4@sha256:ed0b31a0508da84ee655c5c6e01bd3897fc56ad6cf69debb27fa1893a06d2246",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.7.5",
  // renovate: datasource=python-version versioning=semver
  python: "3.13.7",
  // renovate: datasource=node-version versioning=semver
  node: "22.18.0",
  // this is empty because we have to perform some string manipulation below
  // not managed by renovate
  bun: "",
};

versions["bun"] = versions["oven/bun"].split("@")[0];

export default versions;
