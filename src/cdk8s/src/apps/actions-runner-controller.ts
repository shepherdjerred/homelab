import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
import versions from "../versions.ts";
import { OnePasswordItem } from "../../imports/onepassword.com.ts";

export type RepositoryConfig = {
  name: string;
  githubUrl: string;
  minRunners?: number;
};

export const repositories: RepositoryConfig[] = [
  {
    name: "homelab",
    githubUrl: "https://github.com/shepherdjerred/homelab",
    minRunners: 1,
  },
  {
    name: "scout-for-lol",
    githubUrl: "https://github.com/shepherdjerred/scout-for-lol",
    minRunners: 1,
  },
  {
    name: "webring",
    githubUrl: "https://github.com/shepherdjerred/webring",
    minRunners: 0,
  },
  {
    name: "astro-opengraph-images",
    githubUrl: "https://github.com/shepherdjerred/astro-opengraph-images",
    minRunners: 0,
  },
  {
    name: "castle-casters",
    githubUrl: "https://github.com/shepherdjerred/castle-casters",
    minRunners: 0,
  },
  {
    name: "sjer.red",
    githubUrl: "https://github.com/shepherdjerred/sjer.red",
    minRunners: 0,
  },
  {
    name: "monorepo",
    githubUrl: "https://github.com/shepherdjerred/monorepo",
    minRunners: 0,
  },
  {
    name: "discord-plays-pokemon",
    githubUrl: "https://github.com/shepherdjerred/discord-plays-pokemon",
    minRunners: 0,
  },
  {
    name: "better-skill-capped",
    githubUrl: "https://github.com/shepherdjerred/better-skill-capped",
    minRunners: 0,
  },
  {
    name: "macos-cross-compiler",
    githubUrl: "https://github.com/shepherdjerred/macos-cross-compiler",
    minRunners: 0,
  },
  {
    name: "resume",
    githubUrl: "https://github.com/shepherdjerred/resume",
    minRunners: 0,
  },
];

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
          valuesObject: {},
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "arc-system",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true", "ServerSideApply=true"],
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

  // 1Password secret for GitHub PAT (shared across all runner sets)
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
    },
  );

  // Create runner sets for each repository (recommended approach for personal accounts)
  repositories.forEach((repo) => {
    new Application(chart, `arc-runner-set-${repo.name}`, {
      metadata: {
        name: `${repo.name}-runner-set`,
      },
      spec: {
        project: "default",
        source: {
          repoUrl: "ghcr.io/actions/actions-runner-controller-charts",
          chart: "gha-runner-scale-set",
          targetRevision: versions["gha-runner-scale-set"],
          helm: {
            valuesObject: {
              githubConfigUrl: repo.githubUrl,
              githubConfigSecret: githubPat.name,
              minRunners: repo.minRunners ?? 1,
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
          syncOptions: ["CreateNamespace=true", "ServerSideApply=true"],
        },
      },
    });
  });
}
