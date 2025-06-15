import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
import versions from "../versions.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";
import { Size } from "cdk8s";
import { ZfsSsdVolume } from "../utils/zfsSsdVolume.ts";

export function createActionsRunnerControllerApp(chart: Chart) {
  // Ensure the arc-system namespace exists before creating controller resources
  new Namespace(chart, "arc-system-namespace", {
    metadata: {
      name: "arc-system",
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
        "pod-security.kubernetes.io/audit": "privileged",
        "pod-security.kubernetes.io/warn": "privileged",
      },
    },
  });

  // Controller install (gha-runner-scale-set-controller)
  new Application(chart, "arc-controller-app", {
    metadata: {
      name: "actions-runner-controller",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "ghcr.io/actions/actions-runner-controller-charts",
        chart: "gha-runner-scale-set-controller",
        targetRevision: versions["gha-runner-scale-set-controller"],
        helm: {
          valuesObject: {
            // TODO: Add controller-specific values if needed
          },
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "arc-system",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });

  // Ensure the arc-runners namespace exists before creating secrets
  new Namespace(chart, "arc-runners-namespace", {
    metadata: {
      name: "arc-runners",
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
        "pod-security.kubernetes.io/audit": "privileged",
        "pod-security.kubernetes.io/warn": "privileged",
      },
    },
  });

  // 1Password secret for GitHub PAT (runner set)
  const githubPat = new OnePasswordItem(
    chart,
    "arc-github-pat-onepassword-homelab",
    {
      spec: {
        itemPath:
          "vaults/v64ocnykdqju4ui6j6pua56xw4/items/mivtx3znthlpdp35xvqhz44uta",
      },
      metadata: {
        name: "github-pat-homelab",
        namespace: "arc-runners",
      },
    }
  );

  // Shared RWX PVC for /cache in arc-runners namespace
  const sharedCacheVolume = new ZfsSsdVolume(chart, "gha-shared-cache", {
    storage: Size.gibibytes(100),
    metadata: {
      name: "gha-shared-cache",
      namespace: "arc-runners",
    },
  });
  const sharedCachePvc = sharedCacheVolume.claim;

  // Runner set install (gha-runner-scale-set)
  new Application(chart, "arc-runner-set-app", {
    metadata: {
      name: "homelab-runner-set",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "ghcr.io/actions/actions-runner-controller-charts",
        chart: "gha-runner-scale-set",
        targetRevision: versions["gha-runner-scale-set-runner"],
        helm: {
          valuesObject: {
            githubConfigUrl: "https://github.com/shepherdjerred/homelab",
            githubConfigSecret: githubPat.name,
            minRunners: 1,
            controllerServiceAccount: {
              namespace: "arc-system",
              name: "actions-runner-controller-gha-rs-controller",
            },
            containerMode: {
              type: "dind",
            },
            template: {
              spec: {
                containers: [
                  {
                    name: "runner",
                    image: "ghcr.io/actions/actions-runner:latest",
                    command: ["/home/runner/run.sh"],
                    env: [
                      {
                        name: "DOCKER_HOST",
                        value: "unix:///var/run/docker.sock",
                      },
                      {
                        name: "RUNNER_WAIT_FOR_DOCKER_IN_SECONDS",
                        value: "120",
                      },
                    ],
                    volumeMounts: [
                      {
                        name: "gha-shared-cache",
                        mountPath: "/cache",
                      },
                    ],
                  },
                ],
                volumes: [
                  {
                    name: "gha-shared-cache",
                    persistentVolumeClaim: {
                      claimName: sharedCachePvc.name,
                    },
                  },
                ],
              },
            },
          },
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "arc-runners",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
