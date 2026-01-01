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
  // Sync wave ensures this runs after the operator, and SkipDryRunOnMissingResource
  // handles the case where the CRD isn't installed yet (Argo CD will retry)
  new ApiObject(chart, "knative-serving", {
    apiVersion: "operator.knative.dev/v1beta1",
    kind: "KnativeServing",
    metadata: {
      name: "knative-serving",
      namespace: "knative-serving",
      annotations: {
        "argocd.argoproj.io/sync-options": "SkipDryRunOnMissingResource=true",
        "argocd.argoproj.io/sync-wave": "1",
      },
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

  // Create kourier-system namespace for the tunnel binding
  // The operator would create this, but we need it to exist for the tunnel binding
  new Namespace(chart, "kourier-system-namespace", {
    metadata: {
      name: "kourier-system",
    },
  });

  // Expose Kourier gateway via Cloudflare Tunnel
  // Kourier is created by the operator after KnativeServing is processed, so sync after it
  createCloudflareTunnelBinding(chart, "kourier-cf-tunnel", {
    serviceName: "kourier",
    namespace: "kourier-system",
    subdomain: "knative",
    annotations: {
      "argocd.argoproj.io/sync-options": "SkipDryRunOnMissingResource=true",
      "argocd.argoproj.io/sync-wave": "2",
    },
  });
}
