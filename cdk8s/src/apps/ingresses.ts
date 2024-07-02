import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { KubeIngress } from "../../imports/k8s.ts";

export function createAppIngresses(chart: Chart) {
  createIngress(
    chart,
    "argocd-ingress",
    "argocd",
    "argocd-server",
    443,
    ["argocd"],
    // enable funneling for GitHub webhooks which allows ArgoCD to receive push events
    true,
  );

  createIngress(
    chart,
    "jenkins-ingress",
    "jenkins",
    "jenkins",
    8080,
    ["jenkins"],
    true,
  );

  createIngress(
    chart,
    "minio-api-ingress",
    "minio",
    "minio",
    9000,
    ["minio-api"],
    false,
  );

  createIngress(
    chart,
    "minio-console-ingress",
    "minio",
    "minio",
    9001,
    ["minio-console"],
    false,
  );

  createIngress(
    chart,
    "prometheus-ingress",
    "prometheus",
    "prometheus-kube-prometheus-prometheus",
    9090,
    ["prometheus"],
    false,
  );

  createIngress(
    chart,
    "grafana-ingress",
    "prometheus",
    "prometheus-grafana",
    80,
    ["grafana"],
    false,
  );

  createIngress(
    chart,
    "windmill-ingress",
    "windmill",
    "windmill-app",
    8000,
    ["windmill"],
    false,
  );

  createIngress(
    chart,
    "immich-ingress",
    "immich",
    "immich-server",
    3001,
    ["immich"],
    true,
  );

  createIngress(
    chart,
    "chartmusuem-ingress",
    "chartmuseum",
    "chartmuseum",
    8080,
    ["chartmuseum"],
    false,
  );
}

function createIngress(
  chart: Chart,
  name: string,
  namespace: string,
  service: string,
  port: number,
  hosts: string[],
  funnel: boolean,
) {
  const ingress = new KubeIngress(chart, name, {
    metadata: {
      namespace: namespace,
      annotations: funnel ? { "tailscale.com/funnel": "true" } : {},
    },
    spec: {
      defaultBackend: {
        service: {
          name: service,
          port: {
            number: port,
          },
        },
      },
      ingressClassName: "tailscale",
      tls: [
        {
          hosts: hosts,
        },
      ],
    },
  });
  return ingress;
}
