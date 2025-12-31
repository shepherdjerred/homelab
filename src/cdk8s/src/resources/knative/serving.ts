import { Chart, ApiObject } from "cdk8s";
import { Namespace } from "cdk8s-plus-31";
import { createCloudflareTunnelBinding } from "../../misc/cloudflare-tunnel.ts";

export function createKnativeServing(chart: Chart) {
  // Create namespace for Knative Serving
  new Namespace(chart, `knative-serving-namespace`, {
    metadata: {
      name: `knative-serving`,
    },
  });

  // KnativeServing CR - configures Knative Serving with Kourier networking
  new ApiObject(chart, "knative-serving", {
    apiVersion: "operator.knative.dev/v1beta1",
    kind: "KnativeServing",
    metadata: {
      name: "knative-serving",
      namespace: "knative-serving",
    },
    spec: {
      ingress: {
        kourier: {
          enabled: true,
        },
      },
      config: {
        network: {
          "ingress-class": "kourier.ingress.networking.knative.dev",
        },
        defaults: {
          "revision-timeout-seconds": "300",
          "container-concurrency": "0",
        },
        autoscaler: {
          "min-scale": "1",
        },
        domain: {
          "knative.sjer.red": "",
        },
      },
    },
  });

  // Expose Kourier gateway via Cloudflare Tunnel
  createCloudflareTunnelBinding(chart, "kourier-cf-tunnel", {
    serviceName: "kourier",
    namespace: "kourier-system",
    subdomain: "knative",
  });
}
