import { Deployment, DeploymentStrategy, EnvValue, Secret } from "cdk8s-plus";
import { Chart } from "cdk8s";
import { withCommonProps } from "../../utils/common.ts";
import { OnePasswordItem } from "../../../imports/onepassword.com.ts";

export function createHaDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "ha", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const item = new OnePasswordItem(chart, "ha-token", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/a5fjhnycunqy2iag34ls2owzzy",
    },
  });

  const secret = Secret.fromSecretName(
    chart,
    "ha-token-secret",
    item.name,
  );

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/shepherdjerred/homelab:latest`,
      envVariables: {
        HASS_TOKEN: EnvValue.fromSecretValue({
          secret,
          key: "password",
        }),
        HASS_BASE_URL: EnvValue.fromValue(
          "https://homeassistant.tailnet-1a49.ts.net",
        ),
      },
      securityContext: {
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
        // TODO: unsure if this is necessary
        privileged: true,
        allowPrivilegeEscalation: true,
      },
      ports: [],
      volumeMounts: [],
    }),
  );
}
