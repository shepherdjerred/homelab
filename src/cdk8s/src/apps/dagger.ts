import { Chart } from "cdk8s";
import { Application } from "../../imports/argoproj.io.ts";
import versions from "../versions.ts";
import { Namespace } from "cdk8s-plus-31";
import { ZfsSsdVolume } from "../utils/zfsSsdVolume.ts";
import { Size } from "cdk8s";
import { KubeRole, KubeRoleBinding } from "../../imports/k8s.ts";
import { repositories } from "./actions-runner-controller.ts";

export function createDaggerApp(chart: Chart) {
  new Namespace(chart, "dagger-namespace", {
    metadata: {
      name: "dagger",
      labels: {
        "pod-security.kubernetes.io/enforce": "privileged",
      },
    },
  });

  // Grant arc-runners ServiceAccounts access to pods in dagger namespace
  new KubeRole(chart, "dagger-gha-access-role", {
    metadata: { name: "dagger-gha-access", namespace: "dagger" },
    rules: [
      {
        apiGroups: [""],
        resources: ["pods", "pods/exec", "pods/log"],
        verbs: ["get", "list", "watch", "create", "delete", "patch"],
      },
    ],
  });

  // Create role bindings for each repository's ServiceAccount
  repositories.forEach((repo) => {
    new KubeRoleBinding(chart, `dagger-gha-access-binding-${repo.name}`, {
      metadata: {
        name: `dagger-gha-access-binding-${repo.name}`,
        namespace: "dagger",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: "dagger-gha-access",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: `${repo.name}-runner-set-gha-rs-no-permission`,
          namespace: "arc-runners",
        },
      ],
    });
  });

  // Create a ZFS SSD PVC for Dagger data
  const dataPvc = new ZfsSsdVolume(chart, "dagger-data", {
    storage: Size.gibibytes(128),
  });

  new Application(chart, "dagger-app", {
    metadata: {
      name: "dagger",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "registry.dagger.io",
        chart: "dagger-helm",
        targetRevision: versions["dagger-helm"],
        helm: {
          valuesObject: {
            persistentVolumeClaim: {
              enabled: true,
              storageClassName: dataPvc.claim.storageClassName,
              accessModes: dataPvc.claim.accessModes,
            },
          },
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "dagger",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
