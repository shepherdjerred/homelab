import { Chart } from "https://esm.sh/cdk8s@2.68.58";
import { Application } from "../../imports/argoproj.io.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import versions from "../versions/versions.ts";

export function createJenkinsApp(chart: Chart) {
  const tailscale = new OnePasswordItem(
    chart,
    "tailscale-auth-key-jenkins-onepassword",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/pl26aljvglq2twmx64kohlqdja",
      },
      metadata: {
        name: "tailscale-auth-key",
      },
    },
  );

  const jenkins = new OnePasswordItem(
    chart,
    "jenkins-admin-password",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/axi3lsa6uqjy2ns6pvyl4liiq4",
      },
      metadata: {
        name: "jenkins-admin-password",
      },
    },
  );

  const chartMuseum = new OnePasswordItem(
    chart,
    "chartmuseum-admin-password-jenkins",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/wwoism5fsvmbisv4ef47yxqy2i",
      },
      metadata: {
        name: "chartmuseum-basic-auth",
      },
    },
  );

  const earthly = new OnePasswordItem(chart, "earthly-onepassword-jenkins", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/sbjrtou6h3f5w2uhj4uluywsre",
    },
    metadata: {
      name: "earthly-onepassword",
    },
  });

  const github = new OnePasswordItem(chart, "github-token-jenkins", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/dj5wwzm5zcjzhvvpyzsvpazhxy",
    },
    metadata: {
      name: "github-token",
    },
  });

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
                  name: jenkins.name,
                  keyName: "password",
                },
                {
                  name: jenkins.name,
                  keyName: "username",
                },
                {
                  name: chartMuseum.name,
                  keyName: "password",
                },
                {
                  name: chartMuseum.name,
                  keyName: "username",
                },
              ],
              jenkinsUrl: "https://jenkins.tailnet-1a49.ts.net",
              JCasC: {
                configScripts: {
                  "jenkins-casc-configs": JSON.stringify({
                    credentials: {
                      system: {
                        domainCredentials: [
                          {
                            credentials: [
                              {
                                usernamePassword: {
                                  description: "chartmuseum",
                                  id: "chartmuseum",
                                  scope: "GLOBAL",
                                  username: "admin",
                                  password: `${chartMuseum.name}-password`,
                                },
                              },
                              {
                                string: {
                                  description: "earthly",
                                  id: "EARTHLY_TOKEN",
                                  scope: "GLOBAL",
                                  secret: `${earthly.name}-credential`,
                                },
                              },
                              {
                                string: {
                                  description: "tailscale",
                                  id: "TAILSCALE_AUTH_KEY",
                                  scope: "GLOBAL",
                                  secret: `${tailscale.name}-TS_AUTHKEY`,
                                },
                              },
                              {
                                string: {
                                  description: "github",
                                  id: "GITHUB_TOKEN",
                                  scope: "GLOBAL",
                                  secret: `${github.name}-credential`,
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  }),
                },
                securityRealm: JSON.stringify({
                  local: {
                    allowsSignup: false,
                    enableCaptcha: false,
                    users: [
                      {
                        id: `${jenkins.name}-username`,
                        name: "Jenkins Admin",
                        password: `${jenkins.name}-username`,
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
