import { Deployment, DeploymentStrategy, EnvValue, Protocol, Secret, Service, Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import { ServiceMonitor } from "../../../generated/imports/monitoring.coreos.com.ts";
import versions from "../../versions.ts";
import type { Stage } from "../../cdk8s-charts/scout.ts";
import { match } from "ts-pattern";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";

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
        path: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/pacrc4wfbtct4y3qazkvazop5a",
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

  const baseEnvVariables = {
    APPLICATION_ID: EnvValue.fromValue(applicationId),
    AWS_ACCESS_KEY_ID: EnvValue.fromSecretValue({
      secret: Secret.fromSecretName(chart, "aws-access-key-id", onePasswordItem.name),
      key: "s3-access-key-id",
    }),
    AWS_SECRET_ACCESS_KEY: EnvValue.fromSecretValue({
      secret: Secret.fromSecretName(chart, "aws-access-key-secret", onePasswordItem.name),
      key: "s3-secret-access-key",
    }),
    // Use SeaweedFS S3 endpoint via Tailscale funnel
    AWS_ENDPOINT_URL: EnvValue.fromValue("https://seaweedfs-s3.tail1c46f.ts.net"),
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
  };

  // Add AI secrets only for beta stage
  const envVariables =
    stage === "beta"
      ? {
          ...baseEnvVariables,
          OPENAI_API_KEY: EnvValue.fromSecretValue({
            secret: Secret.fromSecretName(chart, "openai-api-key-secret", onePasswordItem.name),
            key: "open-api-key",
          }),
          GEMINI_API_KEY: EnvValue.fromSecretValue({
            secret: Secret.fromSecretName(chart, "gemini-api-key-secret", onePasswordItem.name),
            key: "gemini-api-key",
          }),
          ELEVENLABS_API_KEY: EnvValue.fromSecretValue({
            secret: Secret.fromSecretName(chart, "elevenlabs-api-key-secret", onePasswordItem.name),
            key: "elevenlabs-api-key",
          }),
          ELEVENLABS_VOICE_ID: EnvValue.fromSecretValue({
            secret: Secret.fromSecretName(chart, "elevenlabs-voice-id-secret", onePasswordItem.name),
            key: "elevenlabs-voice-id",
          }),
        }
      : baseEnvVariables;

  deployment.addContainer(
    withCommonProps({
      image: image,
      ports: [
        {
          name: "port-3000",
          number: 3000,
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
      envVariables,
    }),
  );

  // Create Service to expose metrics port
  new Service(chart, `scout-service-${stage}`, {
    metadata: {
      name: `scout-service-${stage}`,
      labels: {
        app: "scout",
        stage: stage,
      },
    },
    selector: deployment,
    ports: [{ name: "metrics", port: 3000 }],
  });

  // Create ServiceMonitor for Prometheus to scrape Scout metrics
  new ServiceMonitor(chart, `scout-service-monitor-${stage}`, {
    metadata: {
      name: `scout-service-monitor-${stage}`,
      labels: {
        release: "prometheus", // Required for Prometheus operator discovery
      },
    },
    spec: {
      endpoints: [
        {
          port: "metrics",
          interval: "30s",
          path: "/metrics",
        },
      ],
      selector: {
        matchLabels: {
          app: "scout",
          stage: stage,
        },
      },
    },
  });
}
