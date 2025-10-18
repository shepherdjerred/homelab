import { Deployment, DeploymentStrategy, EnvValue, Secret, Volume } from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import versions from "../../versions.ts";
import { match } from "ts-pattern";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";

export type Stage = "prod" | "beta";

export function createStarlightKarmaBotDeployment(chart: Chart, stage: Stage) {
  const deployment = new Deployment(chart, "starlight-karma-bot-backend", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const { path, image } = match(stage)
    .with("beta", () => {
      return {
        image: `ghcr.io/shepherdjerred/starlight-karma-bot:${versions["shepherdjerred/starlight-karma-bot/beta"]}`,
        path: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/tdxe6cq7ozhv7cesfvnlkl5gh4",
      };
    })
    .with("prod", () => {
      return {
        image: `ghcr.io/shepherdjerred/starlight-karma-bot:${versions["shepherdjerred/starlight-karma-bot/prod"]}`,
        path: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/cmp6si6n5syhr4smxew3qfcmfi",
      };
    })
    .exhaustive();

  const onePasswordItem = new OnePasswordItem(chart, "starlight-karma-bot-1p", {
    spec: {
      itemPath: path,
    },
  });

  const localPathVolume = new ZfsSsdVolume(chart, "starlight-karma-bot-storage-claim", {
    storage: Size.gibibytes(2),
  });

  deployment.addContainer(
    withCommonProps({
      image: image,
      securityContext: {
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
      },
      volumeMounts: [
        {
          path: "/data",
          volume: Volume.fromPersistentVolumeClaim(chart, "starlight-karma-bot-volume", localPathVolume.claim),
        },
      ],
      envVariables: {
        DISCORD_TOKEN: EnvValue.fromSecretValue({
          secret: Secret.fromSecretName(chart, "discord-token-secret", onePasswordItem.name),
          key: "discord-api-token",
        }),
        ENVIRONMENT: EnvValue.fromValue(stage),
        DATABASE_URL: EnvValue.fromValue("file:/data/db.sqlite"),
      },
    }),
  );
}
