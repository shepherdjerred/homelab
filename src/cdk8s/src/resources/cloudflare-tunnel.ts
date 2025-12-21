import { Chart, Duration } from "cdk8s";
import { Deployment, DeploymentStrategy, EnvValue, Probe, Secret } from "cdk8s-plus-31";
import { withCommonProps } from "../misc/common.ts";
import { OnePasswordItem } from "../../generated/imports/onepassword.com.ts";
import versions from "../versions.ts";

export function createCloudflareTunnelDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "cloudflare-tunnel", {
    replicas: 2,
    strategy: DeploymentStrategy.recreate(),
  });

  // 1Password item containing the tunnel token
  // The item should have a field named "tunnel-token" with the token value
  const item = new OnePasswordItem(chart, "cloudflare-tunnel-config", {
    spec: {
      itemPath: "vaults/v64ocnykdqju4ui6j6pua56xw4/items/cloudflare-tunnel",
    },
  });

  const secret = Secret.fromSecretName(chart, "cloudflare-tunnel-secret", item.name);

  deployment.addContainer(
    withCommonProps({
      image: `cloudflare/cloudflared:${versions["cloudflare/cloudflared"]}`,
      args: ["tunnel", "--no-autoupdate", "--metrics", "0.0.0.0:2000", "run"],
      envVariables: {
        TUNNEL_TOKEN: EnvValue.fromSecretValue({
          secret,
          key: "tunnel-token",
        }),
      },
      securityContext: {
        ensureNonRoot: false,
        readOnlyRootFilesystem: true,
      },
      liveness: Probe.fromHttpGet("/ready", {
        port: 2000,
        initialDelaySeconds: Duration.seconds(5),
        periodSeconds: Duration.seconds(10),
      }),
    }),
  );
}
