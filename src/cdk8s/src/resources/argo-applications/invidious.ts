import { ApiObject, Chart } from "cdk8s";
import { Application } from "../../../generated/imports/argoproj.io.ts";
import { Namespace } from "cdk8s-plus-31";
import versions from "../../versions.ts";
import { createIngress } from "../../misc/tailscale.ts";
import { createInvidiousPostgreSQLDatabase } from "../postgres/invidious-db.ts";
import type { HelmValuesForChart } from "../../misc/typed-helm-parameters.ts";

export function createInvidiousApp(chart: Chart) {
  // Create namespace for Invidious
  new Namespace(chart, "invidious-namespace", {
    metadata: {
      name: "invidious",
      labels: {
        "pod-security.kubernetes.io/audit": "restricted",
      },
    },
  });

  // Create PostgreSQL database using the operator
  createInvidiousPostgreSQLDatabase(chart);

  // Create Tailscale ingress for Invidious
  createIngress(chart, "invidious-ingress", "invidious", "invidious", 3000, ["invidious"], true);

  // The postgres-operator will automatically create a secret with connection credentials
  // Secret name pattern: {username}.{clustername}.credentials.postgresql.acid.zalan.do
  // For our setup: kemal.invidious-postgresql.credentials.postgresql.acid.zalan.do
  // The secret contains keys: username, password, dbname

  const invidiousValues: HelmValuesForChart<"invidious"> = {
    config: {
      // Database configuration for postgres-operator
      db: {
        host: "invidious-postgresql", // Service name created by postgres-operator
        port: 5432,
        user: "kemal",
        password: "PLACEHOLDER_PASSWORD", // Will be replaced by PostSync hook
        dbname: "invidious",
      },
      // Additional Invidious configuration
      check_tables: true, // Ensure tables are created/updated on startup
      domain: "invidious.tailnet-1a49.ts.net",
      https_only: false,
      hmac_key: "SOMETHING RANDOM", // TODO: Replace with a secure value
    },
    postgresql: {
      enabled: false, // Using postgres-operator instead of bundled PostgreSQL
    },
    sighelper: {
      enabled: false, // Disabled: inv-sig-helper is deprecated. TODO: Add Invidious companion when available
    },
    service: {
      type: "ClusterIP",
      port: 3000,
    },
    ingress: {
      enabled: false, // Using Tailscale ingress instead
    },
  };

  // Create a Job that updates the Invidious ConfigMap with the real password
  // This runs as a PostSync hook after Helm creates the ConfigMap
  const passwordInjectorScript = `#!/bin/sh
set -e

echo "Waiting for Invidious ConfigMap to be created..."
until kubectl get configmap invidious -n invidious 2>/dev/null; do
  echo "Waiting for ConfigMap..."
  sleep 2
done

echo "Reading password from PostgreSQL secret..."
PGPASS=$(kubectl get secret kemal.invidious-postgresql.credentials.postgresql.acid.zalan.do -n invidious -o jsonpath='{.data.password}' | base64 -d)

echo "Updating Invidious ConfigMap with real password..."
kubectl get configmap invidious -n invidious -o yaml | \\
  sed "s/password: PLACEHOLDER_PASSWORD/password: $PGPASS/" | \\
  kubectl apply -f -

echo "Restarting Invidious deployment to pick up new password..."
kubectl rollout restart deployment/invidious -n invidious 2>/dev/null || echo "Deployment not ready yet, password will be used on first start"

echo "Password injection complete!"
`;

  // Create ConfigMap with the password injector script
  new ApiObject(chart, "invidious-password-injector-configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "invidious-password-injector",
      namespace: "invidious",
    },
    data: {
      "inject-password.sh": passwordInjectorScript,
    },
  });

  // Create ServiceAccount for the password injector Job
  new ApiObject(chart, "invidious-password-injector-sa", {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "invidious-password-injector",
      namespace: "invidious",
    },
  });

  // Create Role with permissions to read secrets, get/update configmaps, and restart deployments
  new ApiObject(chart, "invidious-password-injector-role", {
    apiVersion: "rbac.authorization.k8s.io/v1",
    kind: "Role",
    metadata: {
      name: "invidious-password-injector",
      namespace: "invidious",
    },
    rules: [
      {
        apiGroups: [""],
        resources: ["secrets"],
        verbs: ["get"],
        resourceNames: ["kemal.invidious-postgresql.credentials.postgresql.acid.zalan.do"],
      },
      {
        apiGroups: [""],
        resources: ["configmaps"],
        verbs: ["get", "update", "patch"],
        resourceNames: ["invidious"],
      },
      {
        apiGroups: ["apps"],
        resources: ["deployments"],
        verbs: ["get", "patch"],
        resourceNames: ["invidious"],
      },
    ],
  });

  // Create RoleBinding
  new ApiObject(chart, "invidious-password-injector-rolebinding", {
    apiVersion: "rbac.authorization.k8s.io/v1",
    kind: "RoleBinding",
    metadata: {
      name: "invidious-password-injector",
      namespace: "invidious",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "Role",
      name: "invidious-password-injector",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "invidious-password-injector",
        namespace: "invidious",
      },
    ],
  });

  // Create Job that runs as an ArgoCD PostSync hook
  new ApiObject(chart, "invidious-password-injector-job", {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: {
      name: "invidious-password-injector",
      namespace: "invidious",
      annotations: {
        "argocd.argoproj.io/hook": "PostSync",
        "argocd.argoproj.io/hook-delete-policy": "BeforeHookCreation",
      },
    },
    spec: {
      backoffLimit: 3,
      template: {
        spec: {
          serviceAccountName: "invidious-password-injector",
          restartPolicy: "OnFailure",
          containers: [
            {
              name: "password-injector",
              image: "bitnami/kubectl:latest",
              command: ["/bin/sh", "/scripts/inject-password.sh"],
              volumeMounts: [
                {
                  name: "script",
                  mountPath: "/scripts",
                  readOnly: true,
                },
              ],
            },
          ],
          volumes: [
            {
              name: "script",
              configMap: {
                name: "invidious-password-injector",
                defaultMode: 0o755,
              },
            },
          ],
        },
      },
    },
  });

  return new Application(chart, "invidious-app", {
    metadata: {
      name: "invidious",
    },
    spec: {
      project: "default",
      source: {
        repoUrl: "https://iv-org.github.io/invidious-helm-chart",
        targetRevision: versions.invidious,
        chart: "invidious",
        helm: {
          valuesObject: invidiousValues,
        },
      },
      destination: {
        server: "https://kubernetes.default.svc",
        namespace: "invidious",
      },
      syncPolicy: {
        automated: {},
        syncOptions: ["CreateNamespace=true"],
      },
    },
  });
}
