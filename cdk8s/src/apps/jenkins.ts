import { Chart } from "npm:cdk8s";
import { Application } from "../../imports/argoproj.io.ts";

export function createJenkinsApp(chart: Chart) {
  new Application(chart, "jenkins-app", {
    metadata: {
      name: "jenkins",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://charts.jenkins.io",
        targetRevision: "5.0.13",
        chart: "jenkins",
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "jenkins",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
