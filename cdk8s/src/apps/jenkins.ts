import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import versions from "../versions/versions.ts";

export function createJenkinsApp(chart: Chart) {
  new OnePasswordItem(
    chart,
    "tailscale-auth-key-jenkins-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/pl26aljvglq2twmx64kohlqdja",
      },
      metadata: {
        name: "tailscale-auth-key",
        namespace: "jenkins",
      },
    },
  );

  new Application(chart, "jenkins-app", {
    metadata: {
      name: "jenkins",
    },
    spec: {
      project: "default",
      source: {
        // https://github.com/jenkinsci/helm-charts
        repoUrl: "https://charts.jenkins.io",
        targetRevision: versions["jenkins"],
        chart: "jenkins",
        helm: {
          parameters: [
            {
              name: "controller.jenkinsUrl",
              value: "https://jenkins.tailnet-1a49.ts.net",
            },
            {
              name: "controller.JCasC.configScripts.welcome-message",
              value: `jenkins:
                  systemMessage: My Jenkins Instance`,
            },
          ],
        },
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
