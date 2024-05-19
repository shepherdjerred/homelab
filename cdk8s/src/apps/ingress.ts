import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Ingress } from "https://esm.sh/v135/cdk8s-plus-27@2.9.3";

// apiVersion: networking.k8s.io/v1
// kind: Ingress
// metadata:
//   name: argocd-ingress
//   namespace: argocd
//   # for GitHub webhooks
//   annotations:
//     tailscale.com/funnel: "true"
// spec:
//   defaultBackend:
//     service:
//       name: argocd-server
//       port:
//         number: 443
//   ingressClassName: tailscale
//   tls:
//     - hosts:
//         - argocd

export function createAppIngresses(chart: Chart) {
  const ingress = new Ingress(chart, "argocd-ingress", {
    metadata: {
      name: "argocd-ingress",
      namespace: "argocd",
      annotations: {
        "tailscale.com/funnel": "true",
      },
    },
    spec: {
      defaultBackend: {
        service: {
          name: "argocd-server",
          port: {
            number: 443,
          },
        },
      },
      ingressClassName: "tailscale",
      tls: [
        {
          hosts: ["argocd"],
        },
      ],
    },
  });
  return ingress;
}
