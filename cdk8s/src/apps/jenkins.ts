import { Chart, Size } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import versions from "../versions.ts";
import { createIngress } from "../utils/tailscale.ts";
import { HDD_STORAGE_CLASS } from "../storageclasses.ts";

export function createJenkinsApp(chart: Chart) {
  createIngress(
    chart,
    "jenkins-ingress",
    "jenkins",
    "jenkins",
    8080,
    ["jenkins"],
    true,
  );

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
        namespace: "jenkins",
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
        namespace: "jenkins",
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
      namespace: "jenkins",
    },
  });

  const github = new OnePasswordItem(chart, "github-token-jenkins", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/dj5wwzm5zcjzhvvpyzsvpazhxy",
    },
    metadata: {
      name: "github-token",
      namespace: "jenkins",
    },
  });

  const githubApp = new OnePasswordItem(chart, "github-app-jenkins", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/hjc52saq6qfwuxvkenmb3d3u7m",
    },
    metadata: {
      name: "github-app",
      namespace: "jenkins",
    },
  });

  const argoCdToken = new OnePasswordItem(chart, "argocd-token", {
    spec: {
      itemPath:
        "vaults/v64ocnykdqju4ui6j6pua56xw4/items/xchlunxpr5tdpqxaxsxc7k2zh4",
    },
    metadata: {
      name: "argocd-token",
      namespace: "jenkins",
    },
  });

  const plugins = Deno.readTextFileSync("config/jenkins/plugins.txt").split(
    "\n",
  )
    .filter(Boolean);

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
            persistence: {
              storageClass: HDD_STORAGE_CLASS,
              size: Size.gibibytes(128).asString(),
            },
            controller: {
              additionalPlugins: plugins,
              sidecars: {
                configAutoReload: {
                  enabled: true,
                },
              },
              rbac: {
                create: true,
              },
              additionalExistingSecrets: [
                {
                  name: jenkins.name,
                  keyName: "password",
                },
                {
                  name: earthly.name,
                  keyName: "credential",
                },
                {
                  name: tailscale.name,
                  keyName: "TS_AUTHKEY",
                },
                {
                  name: github.name,
                  keyName: "credential",
                },
                {
                  name: githubApp.name,
                  keyName: "private-key",
                },
                {
                  name: argoCdToken.name,
                  keyName: "credential",
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
                                gitHubApp: {
                                  appID: "830890",
                                  description: "github app",
                                  id: "github-app",
                                  privateKey:
                                    `\${${githubApp.name}-private-key}`,
                                },
                              },
                              {
                                string: {
                                  description: "earthly",
                                  id: "EARTHLY_TOKEN",
                                  scope: "GLOBAL",
                                  secret: `\${${earthly.name}-credential}`,
                                },
                              },
                              {
                                string: {
                                  description: "tailscale",
                                  id: "TAILSCALE_AUTH_KEY",
                                  scope: "GLOBAL",
                                  secret: `\${${tailscale.name}-TS_AUTHKEY}`,
                                },
                              },
                              {
                                string: {
                                  description: "github",
                                  id: "GITHUB_TOKEN",
                                  scope: "GLOBAL",
                                  secret: `\${${github.name}-credential}`,
                                },
                              },
                              {
                                usernamePassword: {
                                  description: "github",
                                  id: "github",
                                  scope: "GLOBAL",
                                  username: "shepherdjerred",
                                  password: `\${${github.name}-credential}`,
                                },
                              },
                              {
                                string: {
                                  description: "argocd",
                                  id: "ARGOCD_TOKEN",
                                  scope: "GLOBAL",
                                  secret: `\${${argoCdToken.name}-credential}`,
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
                        id: "admin",
                        name: "Jenkins Admin",
                        password: `\${${jenkins.name}-password}`,
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
