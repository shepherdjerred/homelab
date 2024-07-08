import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import versions from "../versions/versions.ts";
import { Secret } from "https://esm.sh/cdk8s-plus-27@2.9.3";

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

  const jenkinsOnepasswordItem = new OnePasswordItem(
    chart,
    "jenkins-admin-password",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/axi3lsa6uqjy2ns6pvyl4liiq4",
      },
      metadata: {
        name: "jenkins-admin-password",
        namespace: "jenkins",
      },
    },
  );

  const jenkinsPasswordSecret = Secret.fromSecretName(
    chart,
    "jenkins-admin-secret",
    jenkinsOnepasswordItem.name,
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
          valuesObject: {
            controller: {
              additionalExistingSecrets: [
                // TODO: programatically create Earthly token & GitHub token
                {
                  name: jenkinsPasswordSecret.name,
                  keyName: "password",
                },
                {
                  name: jenkinsPasswordSecret.name,
                  keyName: "username",
                },
              ],
              jenkinsUrl: "https://jenkins.tailnet-1a49.ts.net",
              JCasC: {
                configScripts: JSON.stringify({
                  "welcome-message": {
                    jenkins: {
                      systemMessage: "My Jenkins Instance",
                    },
                  },
                }),
                securityRealm: JSON.stringify({
                  local: {
                    allowsSignup: false,
                    enableCaptcha: false,
                    users: [
                      {
                        id: `${jenkinsPasswordSecret.name}-username`,
                        name: "Jenkins Admin",
                        password: `${jenkinsPasswordSecret.name}-username`,
                      },
                    ],
                  },
                }),
              },
            },
          },
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
