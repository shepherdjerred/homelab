import { Deployment, DeploymentStrategy, EnvValue, Protocol, Secret, Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { withCommonProps } from "../../utils/common.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";
import versions from "../../versions.ts";
import type { Stage } from "../../charts/scout.ts";
import { match } from "ts-pattern";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";

export function createScoutDeployment(chart: Chart, stage: Stage) {
  const deployment = new Deployment(chart, "scout-backend", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const { path, image, applicationId, s3BucketName } = match(stage)
    .with("beta", () => {
      return {
        image: `ghcr.io/shepherdjerred/scout-for-lol:${versions["shepherdjerred/scout-for-lol/beta"]}`,
        path: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/rtu44pohnp5ixdp2njuv5f6t2e",
        applicationId: "1311755320745394317",
        s3BucketName: "scout-beta",
      };
    })
    .with("prod", () => {
      return {
        image: `ghcr.io/shepherdjerred/scout-for-lol:${versions["shepherdjerred/scout-for-lol/prod"]}`,
        path: "",
        applicationId: "1182800769188110366",
        s3BucketName: "scout-prod",
      };
    })
    .exhaustive();

  const onePasswordItem = new OnePasswordItem(chart, "scout-for-lol-1p", {
    spec: {
      itemPath: path,
    },
  });

  const localPathVolume = new ZfsSsdVolume(chart, "scout-storage-claim", {
    storage: Size.gibibytes(8),
  });

  deployment.addContainer(
    withCommonProps({
      image: image,
      ports: [
        {
          name: "port-8000",
          number: 8000,
          protocol: Protocol.TCP,
        },
      ],
      securityContext: {
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
        {
          path: "/data",
          volume: Volume.fromPersistentVolumeClaim(chart, "scout-volume", localPathVolume.claim),
        },
      ],
      envVariables: {
        APPLICATION_ID: EnvValue.fromValue(applicationId),
        AWS_ACCESS_KEY_ID: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "aws-access-key-id", onePasswordItem.name),
          key: "r2-access-key-id",
        }),
        AWS_SECRET_ACCESS_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "aws-access-key-secret", onePasswordItem.name),
          key: "r2-secret-access-key",
        }),
        AWS_ENDPOINT_URL: EnvValue.fromValue("https://48948ed6cd40d73e34d27f0cc10e595f.r2.cloudflarestorage.com"),
        AWS_REGION: EnvValue.fromValue("auto"),
        DISCORD_TOKEN: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "discord-token-secret", onePasswordItem.name),
          key: "discord-api-token",
        }),
        RIOT_API_TOKEN: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "riot-api-key-secret", onePasswordItem.name),
          key: "riot-api-key",
        }),
        S3_BUCKET_NAME: EnvValue.fromValue(s3BucketName),
        SENTRY_DSN: EnvValue.fromValue(
          "https://01aed04320da7d9b8ff25226bc5f3097@o92742.ingest.us.sentry.io/4508388740825088",
        ),
        ENVIRONMENT: EnvValue.fromValue(stage),
        DATABASE_URL: EnvValue.fromValue("file:/data/db.sqlite"),
      },
    }),
  );
}
