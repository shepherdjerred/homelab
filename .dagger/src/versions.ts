const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine: "3.23.2@sha256:865b95f46d98cf867a156fe4a135ad3fe50d2056aa3f25ed31662dff6da4eb62",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm": "4.0.4@sha256:adb87b125214fd356ecc1a24a1e86e4afed0ee03de5d4391de4925777de7fd42",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun": "1.3.5@sha256:e90cdbaf9ccdb3d4bd693aa335c3310a6004286a880f62f79b18f9b1312a8ec3",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu: "noble@sha256:cd1dba651b3080c3686ecf4e3c4220f026b521fb76978881737d24f200828b2b",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl": "8.17.0@sha256:935d9100e9ba842cdb060de42472c7ca90cfe9a7c96e4dacb55e79e560b3ff40",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=semver
  caddy: "2.10.0",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/kubectl": "1.35.0@sha256:8235eddc02d51e29a6990248e559494505dab83bd47de829351b22d5b702f38d",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.8.1",
  // renovate: datasource=python-version versioning=semver
  python: "3.14.2",
  // renovate: datasource=node-version versioning=semver
  node: "24.12.0",
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
