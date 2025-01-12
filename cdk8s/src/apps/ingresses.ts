import { Chart } from "cdk8s";
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
    "prometheus-ingress",
    "prometheus",
    "prometheus-kube-prometheus-prometheus",
    9090,
    ["prometheus"],
    false,
  );

  createIngress(
    chart,
    "loki-ingress",
    "loki",
    "loki",
    3100,
    ["loki"],
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
    "alertmanager-ingress",
    "prometheus",
    "prometheus-kube-prometheus-alertmanager",
    9093,
    ["alertmanager"],
    false,
  );

  createIngress(
    chart,
    "chartmusuem-ingress",
    "chartmuseum",
    "chartmuseum",
    8080,
    ["chartmuseum"],
    true,
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
