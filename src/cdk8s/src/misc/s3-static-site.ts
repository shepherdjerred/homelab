import { Chart, JsonPatch } from "cdk8s";
import { Construct } from "constructs";
import { Deployment, DeploymentStrategy, Service, Volume, ConfigMap } from "cdk8s-plus-31";
import { TunnelBinding, TunnelBindingTunnelRefKind } from "../../generated/imports/networking.cfargotunnel.com.ts";
import { TUNNEL_CNAME_TARGET } from "../resources/argo-applications/external-dns.ts";
import { withCommonProps } from "./common.ts";
import versions from "../versions.ts";
import { ApiObject } from "cdk8s";

export type StaticSiteConfig = {
  hostname: string;
  bucket: string;
  indexFile?: string;
  notFoundPage?: string;
  externalDns?: boolean;
};

export type S3StaticSitesProps = {
  sites: StaticSiteConfig[];
  s3Endpoint: string;
  s3Region?: string;
  credentialsSecretName: string;
};

export type CaddyfileGeneratorProps = {
  sites: StaticSiteConfig[];
  s3Endpoint: string;
  s3Region?: string;
};

/**
 * Generates a Caddyfile for S3 static sites.
 * Exported for testing/validation purposes.
 */
export function generateCaddyfile(props: CaddyfileGeneratorProps): string {
  const blocks: string[] = [];

  blocks.push(`{
	order s3proxy last
	auto_https off
}
`);

  for (const site of props.sites) {
    const indexFile = site.indexFile ?? "index.html";
    const notFoundPage = site.notFoundPage ?? "404.html";

    blocks.push(`${site.hostname} {
	s3proxy {
		bucket ${site.bucket}
		region {$S3_REGION:${props.s3Region ?? "us-east-1"}}
		index ${indexFile}
		errors 404 ${notFoundPage}
		endpoint {$S3_ENDPOINT:${props.s3Endpoint}}
		force_path_style
	}
}
`);
  }

  return blocks.join("\n");
}

export class S3StaticSites extends Construct {
  public readonly service: Service;
  public readonly deployment: Deployment;

  constructor(scope: Construct, id: string, props: S3StaticSitesProps) {
    super(scope, id);

    const chart = Chart.of(this);
    const namespace = chart.namespace;

    const caddyfile = generateCaddyfile(props);

    const configMap = new ConfigMap(this, "caddyfile", {
      metadata: {
        name: "s3-static-sites-caddyfile",
      },
      data: {
        Caddyfile: caddyfile,
      },
    });

    const caddyfileVolume = Volume.fromConfigMap(this, "caddyfile-volume", configMap, {
      name: "caddyfile",
      items: {
        Caddyfile: { path: "Caddyfile" },
      },
    });

    const deployment = new Deployment(this, "deployment", {
      metadata: {
        name: "s3-static-sites",
      },
      replicas: 1,
      strategy: DeploymentStrategy.rollingUpdate(),
    });

    const dataVolume = Volume.fromEmptyDir(this, "caddy-data", "caddy-data");
    const configVolume = Volume.fromEmptyDir(this, "caddy-config", "caddy-config");

    const container = deployment.addContainer(
      withCommonProps({
        name: "caddy",
        image: `ghcr.io/shepherdjerred/caddy-s3proxy:${versions["shepherdjerred/caddy-s3proxy"]}`,
        portNumber: 80,
        envVariables: {},
        securityContext: {
          readOnlyRootFilesystem: false,
          user: 1000,
          group: 1000,
        },
      }),
    );

    container.mount("/etc/caddy", caddyfileVolume);
    container.mount("/data", dataVolume);
    container.mount("/config", configVolume);

    const envFromPatch = JsonPatch.add("/spec/template/spec/containers/0/envFrom", [
      {
        secretRef: {
          name: props.credentialsSecretName,
        },
      },
    ]);
    ApiObject.of(deployment).addJsonPatch(envFromPatch);

    this.deployment = deployment;

    const serviceAnnotations: Record<string, string> = {};
    const externalHostnames = props.sites.filter((site) => site.externalDns).map((site) => site.hostname);

    if (externalHostnames.length > 0) {
      serviceAnnotations["external-dns.alpha.kubernetes.io/hostname"] = externalHostnames.join(",");
      serviceAnnotations["external-dns.alpha.kubernetes.io/target"] = TUNNEL_CNAME_TARGET;
    }

    this.service = new Service(this, "service", {
      metadata: {
        name: "s3-static-sites",
        annotations: Object.keys(serviceAnnotations).length > 0 ? serviceAnnotations : undefined,
      },
      selector: deployment,
      ports: [{ port: 80 }],
    });

    for (const site of props.sites) {
      new TunnelBinding(this, `tunnel-${site.hostname.replace(/\./g, "-")}`, {
        metadata: {
          namespace,
        },
        subjects: [
          {
            name: this.service.name,
            spec: {
              fqdn: site.hostname,
            },
          },
        ],
        tunnelRef: {
          kind: TunnelBindingTunnelRefKind.CLUSTER_TUNNEL,
          name: "homelab-tunnel",
          disableDnsUpdates: site.externalDns ?? false,
        },
      });
    }
  }
}
