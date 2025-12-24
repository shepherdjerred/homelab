import { Deployment, DeploymentStrategy, Service, Volume } from "cdk8s-plus-31";
import { Chart } from "cdk8s";
import { withCommonProps } from "../../misc/common.ts";
import versions from "../../versions.ts";

export function createScoutForLolFrontendDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "scout-for-lol-frontend", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  // Create emptyDir volumes for nginx writable directories
  const cacheVolume = Volume.fromEmptyDir(chart, "nginx-cache", "nginx-cache");
  const runVolume = Volume.fromEmptyDir(chart, "nginx-run", "nginx-run");

  const container = deployment.addContainer(
    withCommonProps({
      image: `ghcr.io/shepherdjerred/scout-for-lol-frontend:${versions["shepherdjerred/scout-for-lol-frontend"]}`,
      securityContext: {
        readOnlyRootFilesystem: false,
        user: 101, // nginx user
        group: 101,
      },
      portNumber: 80,
    }),
  );

  // Mount writable directories for nginx running as non-root
  container.mount("/var/cache/nginx", cacheVolume);
  container.mount("/var/run", runVolume);

  new Service(chart, "scout-for-lol-frontend-service", {
    selector: deployment,
    ports: [{ port: 80 }],
    metadata: {
      annotations: {
        "cloudflare-operator.io/content": "scout-for-lol-frontend-service",
        "cloudflare-operator.io/tunnel": "homelab-tunnel",
        "cloudflare-operator.io/hostname": "scout-for-lol.com",
      },
    },
  });
}
