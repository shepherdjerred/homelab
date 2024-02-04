// app = "glitter-boys-beta"
// primary_region = "sea"

import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Protocol,
  Secret,
  Service,
  Volume,
} from "npm:cdk8s-plus-27";
import { Chart } from "npm:cdk8s";
import { LonghornVolume } from "../../utils/longhorn.ts";
import { Stage } from "../../charts/glitter-boys.ts";
import { createLavalinkDeployment } from "./lavalink.ts";
import { withCommonProps } from "../../utils/common.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";

const settings = {
  "LEAGUE_CHANNEL_ID": {
    prod: "1194779777589059656",
    beta: "1176684904923279390",
  },
  "LEADERBOARD_ROLE_ID": {
    prod: "1179152455657865318",
    beta: "1181388987164799036",
  },
  "APPLICATION_ID": {
    prod: "716834761418735638",
    beta: "1092616671388254248",
  },
  "S3_BUCKET_NAME": {
    prod: "glitter-boys-prod",
    beta: "glitter-boys-beta",
  },
  "GUILD_ID": {
    prod: "208425771172102144",
    beta: "1092210479755178054",
  },
};

export function createBackendDeployment(chart: Chart, stage: Stage) {
  const lavalinkItem = new OnePasswordItem(chart, "lavalink-password", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/lvcjg2hn2bafskjrlsxgi4oq44",
    },
  });

  const lavalinkService = createLavalinkDeployment(chart, lavalinkItem);

  const deployment = new Deployment(chart, "glitter-backend", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const longhornVolume = new LonghornVolume(chart, `glitter-data-${stage}`, {});

  const dataDir = "/data";

  let awsKeyPath: string;
  let discordTokenPath: string;

  // TODO: mount players JSON

  if (stage === "beta") {
    awsKeyPath =
      "vaults/v64ocnykdqju4ui6j6pua56xw4/items/5myu3mawbmyhgog5jebzxrk5ay";
    discordTokenPath =
      "vaults/v64ocnykdqju4ui6j6pua56xw4/items/engsfwzpbbt3gsfcsjib7en4iu";
  } else {
    awsKeyPath =
      "vaults/v64ocnykdqju4ui6j6pua56xw4/items/udz24xozhp25yt6cm355brgo5u";
    discordTokenPath =
      "vaults/v64ocnykdqju4ui6j6pua56xw4/items/plb6l2bksn56zfmmwtogu3yvp4";
  }

  const discordTokenItem = new OnePasswordItem(chart, "discord-token", {
    spec: {
      itemPath: discordTokenPath,
    },
  });

  const awsAccessKeyItem = new OnePasswordItem(chart, "aws-access-key", {
    spec: {
      itemPath: awsKeyPath,
    },
  });

  const riotApiKeyItem = new OnePasswordItem(chart, "riot-api-key", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/oyn2omqw5z5vmg4vcvihleq4fm",
    },
  });

  deployment.addContainer(withCommonProps({
    image: "glitter/backend:latest",
    ports: [
      {
        name: "port-8000",
        number: 8000,
        protocol: Protocol.TCP,
      },
    ],
    envVariables: {
      APPLICATION_ID: EnvValue.fromValue(settings.APPLICATION_ID[stage]),
      AWS_ACCESS_KEY_ID: EnvValue.fromSecretValue({
        secret: Secret.fromSecretName(
          chart,
          "aws-access-key-id",
          awsAccessKeyItem.name,
        ),
        key: "access-key-id",
      }),
      AWS_SECRET_ACCESS_KEY: EnvValue.fromSecretValue({
        secret: Secret.fromSecretName(
          chart,
          "aws-access-key-secret",
          awsAccessKeyItem.name,
        ),
        key: "secret-access-key",
      }),
      AWS_ENDPOINT_URL: EnvValue.fromValue(
        "https://48948ed6cd40d73e34d27f0cc10e595f.r2.cloudflarestorage.com",
      ),
      AWS_REGION: EnvValue.fromValue("auto"),
      DISCORD_TOKEN: EnvValue.fromSecretValue({
        secret: Secret.fromSecretName(
          chart,
          "discord-token-secret",
          discordTokenItem.name,
        ),
        key: "credential",
      }),
      GUILD_ID: EnvValue.fromValue(settings.GUILD_ID[stage]),
      LAVALINK_PASSWORD: EnvValue.fromSecretValue({
        secret: Secret.fromSecretName(
          chart,
          "lavalink-server-password-glitter",
          lavalinkItem.name,
        ),
        key: "password",
      }),
      LAVALINK_URL: EnvValue.fromValue(lavalinkService.name),
      LEADERBOARD_ROLE_ID: EnvValue.fromValue(
        settings.LEADERBOARD_ROLE_ID[stage],
      ),
      LEAGUE_CHANNEL_ID: EnvValue.fromValue(settings.LEAGUE_CHANNEL_ID[stage]),
      RIOT_API_TOKEN: EnvValue.fromSecretValue({
        secret: Secret.fromSecretName(
          chart,
          "riot-api-key-secret",
          riotApiKeyItem.name,
        ),
        key: "credential",
      }),
      S3_BUCKET_NAME: EnvValue.fromValue(settings.S3_BUCKET_NAME[stage]),
      DATA_DIR: EnvValue.fromValue(dataDir),
    },
    volumeMounts: [
      {
        path: dataDir,
        volume: Volume.fromPersistentVolumeClaim(
          chart,
          "glitter-boys-data-volume",
          longhornVolume.claim,
        ),
      },
    ],
  }));

  const service = new Service(chart, "glitter-boys-service", {
    selector: deployment,
    ports: [{ port: 8000 }],
  });

  new TailscaleIngress(chart, "glitter-boys-ingress", {
    service,
    host: `glitter-boys-${stage}`,
    funnel: true,
  });
}
