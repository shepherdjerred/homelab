const versions = {
  // Dagger CI/CD Docker Images
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  alpine: "3.23.0@sha256:51183f2cfa6320055da30872f211093f9ff1d3cf06f39a0bdb212314c5dc7375",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/helm": "4.0.4@sha256:adb87b125214fd356ecc1a24a1e86e4afed0ee03de5d4391de4925777de7fd42",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "oven/bun": "1.3.4@sha256:7608db4aeb44f1fe8169cc8ec7055376b3013557b106407ccf092b00e426407d",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  ubuntu: "noble@sha256:c35e29c9450151419d9448b0fd75374fec4fff364a27f176fb458d472dfc9e54",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "curlimages/curl": "8.17.0@sha256:935d9100e9ba842cdb060de42472c7ca90cfe9a7c96e4dacb55e79e560b3ff40",
  // renovate: datasource=docker registryUrl=https://docker.io versioning=docker
  "alpine/kubectl": "1.34.2@sha256:96a7d245a74d461925a56e3024d2f027c2a7a822b3e9e0117ec558db42de9c35",
  // renovate: datasource=github-releases versioning=semver
  "stackrox/kube-linter": "v0.7.6",
  // renovate: datasource=python-version versioning=semver
  python: "3.14.1",
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
