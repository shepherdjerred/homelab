import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
import versions from "../versions.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

export function createActionsRunnerControllerApp(chart: Chart) {
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
        targetRevision: versions["actions/actions-runner-controller"],
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
        // Add any labels if needed
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
        targetRevision: versions["actions/actions-runner-controller"],
        helm: {
          valuesObject: {
            githubConfigUrl: "https://github.com/shepherdjerred/homelab",
            githubConfigSecret: githubPat.name,
            controllerServiceAccount: {
              namespace: "arc-system",
              name: "actions-runner-controller-gha-rs-controller",
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
