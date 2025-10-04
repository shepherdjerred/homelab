import { Deployment, DeploymentStrategy, EnvValue, Secret, Service } from "cdk8s-plus-31";
import { Chart } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import { OnePasswordItem } from "../../../generated/imports/onepassword.com.ts";
import { ServiceMonitor } from "../../../generated/imports/monitoring.coreos.com.ts";
import versions from "../../versions.ts";

export function createHaDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "ha", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  const item = new OnePasswordItem(chart, "ha-token", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/a5fjhnycunqy2iag34ls2owzzy",
    },
  });

  const secret = Secret.fromSecretName(chart, "ha-token-secret", item.name);

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/shepherdjerred/homelab:${versions["shepherdjerred/homelab"]}`,
      envVariables: {
        HASS_TOKEN: EnvValue.fromSecretValue({
          secret,
          key: "password",
        }),
        HASS_BASE_URL: EnvValue.fromValue("https://homeassistant.tailnet-1a49.ts.net"),
        METRICS_PORT: EnvValue.fromValue("9090"),
      },
      securityContext: {
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
        // TODO: unsure if this is necessary
        privileged: true,
        allowPrivilegeEscalation: true,
      },
      ports: [{ name: "metrics", number: 9090 }],
      volumeMounts: [],
    }),
  );

  // Create Service to expose metrics port
  new Service(chart, "ha-service", {
    metadata: {
      name: "ha-service",
      labels: {
        app: "ha",
      },
    },
    selector: deployment,
    ports: [{ name: "metrics", port: 9090 }],
  });

  // Create ServiceMonitor for Prometheus to scrape HA metrics
  new ServiceMonitor(chart, "ha-service-monitor", {
    metadata: {
      name: "ha-service-monitor",
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
          app: "ha",
        },
      },
    },
  });
}
