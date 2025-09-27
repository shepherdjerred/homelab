import {
  Deployment,
  DeploymentStrategy,
  EnvValue,
  Secret,
  Volume,
} from "cdk8s-plus-31";
import { Chart, Size } from "cdk8s";
import { withCommonLinuxServerProps } from "../../utils/linuxserver.ts";
import { ZfsSsdVolume } from "../../utils/zfsSsdVolume.ts";
import versions from "../../versions.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";

export function createRecyclarrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "recyclarr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const localPathVolume = new ZfsSsdVolume(chart, "recyclarr-pvc", {
    storage: Size.gibibytes(8),
  });

  const configItem = new OnePasswordItem(
    chart,
    "recyclarr-config-onepassword-homelab",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/fu5ufvg6bx3kkcp7lqi5pmwj2a",
      },
      metadata: {
        name: "recyclarr-config-homelab",
      },
    },
  );

  const secret = Secret.fromSecretName(
    chart,
    "recyclarr-config-secret",
    configItem.name,
  );

  const secretVolume = Volume.fromSecret(
    chart,
    "recyclarr-config-volume",
    secret,
    {
      items: {
        "recyclarr.yaml": {
          path: "recyclarr.yaml",
        },
      },
    },
  );

  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/recyclarr/recyclarr:${versions.recyclarr}`,
      envVariables: {
        CRON_SCHEDULE: EnvValue.fromValue("@daily"),
      },
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "recyclarr-volume",
            localPathVolume.claim,
          ),
        },
        {
          path: "/config/recyclarr.yaml",
          volume: secretVolume,
          subPath: "recyclarr.yaml",
        },
      ],
    }),
  );
}
