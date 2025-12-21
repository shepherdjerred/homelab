import { Deployment, DeploymentStrategy, EnvValue, Secret, Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import versions from "../../versions.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";

export function createBirmelDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "birmel", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: 1000,
      ensureNonRoot: false,
    },
  });

  const onePasswordItem = new OnePasswordItem(chart, "birmel-1p", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/w5c27dzybxor3j6dzl7lub2soe",
    },
  });

  const localPathVolume = new ZfsSsdVolume(chart, "birmel-pvc", {
    storage: Size.gibibytes(2),
  });

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/shepherdjerred/birmel:${versions["shepherdjerred/birmel"]}`,
      securityContext: {
        readOnlyRootFilesystem: false,
        ensureNonRoot: false,
      },
      volumeMounts: [
        {
          path: "/app/data",
          volume: Volume.fromPersistentVolumeClaim(chart, "birmel-volume", localPathVolume.claim),
        },
      ],
      envVariables: {
        DISCORD_TOKEN: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "birmel-discord-token-secret", onePasswordItem.name),
          key: "discord-api-token",
        }),
        DISCORD_CLIENT_ID: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "birmel-discord-client-id-secret", onePasswordItem.name),
          key: "discord-client-id",
        }),
        ANTHROPIC_API_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "birmel-anthropic-api-key-secret", onePasswordItem.name),
          key: "anthropic-api-key",
        }),
        OPENAI_API_KEY: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "birmel-openai-api-key-secret", onePasswordItem.name),
          key: "openai-api-key",
        }),
        DATABASE_PATH: EnvValue.fromValue("/app/data/birmel.db"),
        LOG_LEVEL: EnvValue.fromValue("info"),
        VOICE_ENABLED: EnvValue.fromValue("true"),
        DAILY_POSTS_ENABLED: EnvValue.fromValue("true"),
      },
    }),
  );
}
