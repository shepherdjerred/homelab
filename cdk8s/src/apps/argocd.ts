import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions/versions.ts";
import { ConfigMap } from "cdk8s-plus";

export function createArgoCdApp(chart: Chart) {
  new ConfigMap(chart, "argocd-cm", {
    metadata: {
      name: "argocd-cm",
      namespace: "argocd",
      labels: {
        "app.kubernetes.io/instance": "argocd",
        "app.kubernetes.io/name": "argocd-cm",
        "app.kubernetes.io/part-of": "argocd",
      },
    },
    data: {
      url: "https://argocd.tailnet-1a49.ts.net/",
      "accounts.jenkins": "apiKey",
      "accounts.jenkins.enabled": "true",
      "exec.enabled": "true",
      "timeout.reconciliation": "60s",
    },
  });

  new Application(chart, "argocd-app", {
    metadata: {
      name: "argocd",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://github.com/argoproj/argo-cd",
        targetRevision: versions["argoproj/argo-cd"],
        path: "manifests/",
        kustomize: {},
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "argocd",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
