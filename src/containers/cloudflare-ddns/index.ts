import { Chart } from "https://esm.sh/cdk8s@2.64.25";
import {
  Deployment,
  Secret,
  Volume,
} from "https://esm.sh/cdk8s-plus-27@2.7.25";
import { secrets } from "../../secrets.ts";
import { EnvValue } from "https://esm.sh/cdk8s-plus-27@2.7.25";

export function createCloudflareDdns(chart: Chart) {
  const config = {
    cloudflare: [
      {
        authentication: {
          api_token: secrets.CLOUDFLARE_TOKEN,
        },
        zone_id: "879487f81194d63121d0b8dddd16f08f",
        subdomains: [
          {
            name: "ddns",
            proxied: false,
          },
        ],
      },
      {
        authentication: {
          api_token: secrets.CLOUDFLARE_TOKEN,
        },
        zone_id: "50f1698cfdf308ce2b272c88a1dffbe0",
        subdomains: [
          {
            name: "ddns",
            proxied: false,
          },
        ],
      },
    ],
    a: true,
    aaaa: true,
    purgeUnknownRecords: false,
    ttl: 60,
  };

  const secretName = "cloudflare-ddns-secret-name";
  const secret = new Secret(chart, "cloudflare-ddns-secret");
  secret.addStringData(secretName, JSON.stringify(config));

  const volume = Volume.fromSecret(chart, secretName, secret);
  const configMountPath = "/config.json";

  // lets create a deployment to run a few instances of a pod
  const deployment = new Deployment(chart, "Deployment", {
    replicas: 1,
  });

  const container = deployment.addContainer({
    image: "timothyjmiller/cloudflare-ddns",
    envVariables: {
      CONFIG_PATH: EnvValue.fromValue(configMountPath),
    },
  });

  container.mount(configMountPath, volume);
}
