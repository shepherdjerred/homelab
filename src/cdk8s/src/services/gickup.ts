import { Chart, Size } from "cdk8s";
import { ConfigMap, Deployment, DeploymentStrategy, Secret, Service, Volume } from "cdk8s-plus-31";
import { withCommonProps } from "../utils/common.ts";
import { ZfsHddVolume } from "../utils/zfsHddVolume.ts";
import { ServiceMonitor } from "../../imports/monitoring.coreos.com.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import versions from "../versions.ts";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createGickupDeployment(chart: Chart) {
  const UID = 65532;
  const GID = 65532;

  // Load the gickup configuration from file
  const configPath = join(__dirname, "configs", "gickup.yml");
  const configContent = await Bun.file(configPath).text();

  // Create ConfigMap for gickup configuration
  const gickupConfig = new ConfigMap(chart, "gickup-config", {
    metadata: {
      name: "gickup-config",
    },
    data: {
      "conf.yml": configContent,
    },
  });

  const deployment = new Deployment(chart, "gickup", {
    replicas: 1,
    securityContext: {
      fsGroup: GID,
    },
    strategy: DeploymentStrategy.recreate(),
  });

  const backupVolume = new ZfsHddVolume(chart, "gickup-backup-pvc", {
    storage: Size.gibibytes(128),
  });

  // Create 1Password item for GitHub token
  // Create a new item in 1Password with your GitHub personal access token
  // The token needs: repo, read:org, read:user permissions
  const githubToken = new OnePasswordItem(chart, "gickup-github-token", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/zshiow4egtiuec5n7stcskyxmm",
    },
    metadata: {
      name: "gickup-github-token",
      namespace: "torvalds",
    },
  });

  deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/cooperspencer/gickup:${versions["cooperspencer/gickup"]}`,
      ports: [{ number: 6178, name: "metrics" }],
      securityContext: {
        user: UID,
        group: GID,
      },
      volumeMounts: [
        {
          path: "/backup",
          volume: Volume.fromPersistentVolumeClaim(chart, "gickup-backup-volume", backupVolume.claim),
        },
        {
          path: "/etc/gickup",
          volume: Volume.fromConfigMap(chart, "gickup-config-volume", gickupConfig),
        },
        {
          path: "/secrets",
          volume: Volume.fromSecret(
            chart,
            "gickup-secrets-volume",
            Secret.fromSecretName(chart, "gickup-github-secret", githubToken.name),
          ),
        },
      ],
      args: ["/etc/gickup/conf.yml"],
    }),
  );

  // Create Service to expose metrics port
  new Service(chart, "gickup-service", {
    metadata: {
      name: "gickup-service",
      labels: {
        app: "gickup",
      },
    },
    selector: deployment,
    ports: [{ name: "metrics", port: 6178 }],
  });

  // Create ServiceMonitor for Prometheus to scrape gickup metrics
  new ServiceMonitor(chart, "gickup-service-monitor", {
    metadata: {
      name: "gickup-service-monitor",
      labels: {
        release: "prometheus", // Required for Prometheus operator discovery
      },
    },
    spec: {
      endpoints: [
        {
          port: "metrics",
          interval: "60s",
          path: "/metrics",
        },
      ],
      selector: {
        matchLabels: {
          app: "gickup",
        },
      },
    },
  });
}
