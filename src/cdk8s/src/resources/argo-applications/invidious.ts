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
        password: "placeholder", // Will be replaced by init container at runtime
        dbname: "invidious",
      },
      // Additional Invidious configuration
      // check_tables: true,
      // external_port: 3000,
      domain: "invidious.tailnet-1a49.ts.net",
      https_only: false,
      // hmac_key: "CHANGE_ME_IN_PRODUCTION", // TODO: Replace with a secure value
    },
    postgresql: {
      enabled: false, // Using postgres-operator instead of bundled PostgreSQL
    },
    service: {
      type: "ClusterIP",
      port: 3000,
    },
    ingress: {
      enabled: false, // Using Tailscale ingress instead
    },
  };

  // Create a Job that will patch the Deployment after it's created by Helm
  // This job runs after the Helm release and injects the init container for database password
  const patchScript = `#!/bin/sh
set -e

echo "Waiting for Invidious deployment to be created..."
until kubectl get deployment invidious -n invidious 2>/dev/null; do
  echo "Waiting..."
  sleep 2
done

echo "Patching Invidious deployment with init container..."
kubectl patch deployment invidious -n invidious --type='strategic' -p '
spec:
  template:
    spec:
      initContainers:
      - name: inject-db-password
        image: busybox:latest
        command: ["/bin/sh", "-c"]
        args:
        - |
          PGPASS=$(cat /pg-secret/password)
          sed "s/password: placeholder/password: $PGPASS/" /base-config/config.yml > /runtime-config/config.yml
          echo "Database password injected successfully"
        volumeMounts:
        - name: pg-secret
          mountPath: /pg-secret
          readOnly: true
        - name: base-config
          mountPath: /base-config
          readOnly: true
        - name: runtime-config
          mountPath: /runtime-config
      volumes:
      - name: pg-secret
        secret:
          secretName: kemal.invidious-postgresql.credentials.postgresql.acid.zalan.do
      - name: base-config
        configMap:
          name: invidious
      - name: runtime-config
        emptyDir: {}
      containers:
      - name: invidious
        env:
        - name: INVIDIOUS_CONFIG_FILE
          value: /runtime-config/config.yml
        volumeMounts:
        - name: runtime-config
          mountPath: /runtime-config
          readOnly: true
'

echo "Deployment patched successfully"
`;

  // Create ConfigMap with the patch script
  new ApiObject(chart, "invidious-deployment-patcher-configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "invidious-deployment-patcher",
      namespace: "invidious",
    },
    data: {
      "patch.sh": patchScript,
    },
  });

  // Create a Job to apply the patch
  new ApiObject(chart, "invidious-deployment-patcher-job", {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: {
      name: "invidious-deployment-patcher",
      namespace: "invidious",
      annotations: {
        "argocd.argoproj.io/hook": "PostSync",
        "argocd.argoproj.io/hook-delete-policy": "BeforeHookCreation",
      },
    },
    spec: {
      template: {
        spec: {
          serviceAccountName: "invidious-patcher",
          restartPolicy: "OnFailure",
          containers: [
            {
              name: "patcher",
              image: "bitnami/kubectl:latest",
              command: ["/bin/sh", "/scripts/patch.sh"],
              volumeMounts: [
                {
                  name: "script",
                  mountPath: "/scripts",
                },
              ],
            },
          ],
          volumes: [
            {
              name: "script",
              configMap: {
                name: "invidious-deployment-patcher",
                defaultMode: 0o755,
              },
            },
          ],
        },
      },
    },
  });

  // Create ServiceAccount and RBAC for the patcher job
  new ApiObject(chart, "invidious-patcher-serviceaccount", {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "invidious-patcher",
      namespace: "invidious",
    },
  });

  new ApiObject(chart, "invidious-patcher-role", {
    apiVersion: "rbac.authorization.k8s.io/v1",
    kind: "Role",
    metadata: {
      name: "invidious-patcher",
      namespace: "invidious",
    },
    rules: [
      {
        apiGroups: ["apps"],
        resources: ["deployments"],
        verbs: ["get", "patch"],
      },
    ],
  });

  new ApiObject(chart, "invidious-patcher-rolebinding", {
    apiVersion: "rbac.authorization.k8s.io/v1",
    kind: "RoleBinding",
    metadata: {
      name: "invidious-patcher",
      namespace: "invidious",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "Role",
      name: "invidious-patcher",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "invidious-patcher",
        namespace: "invidious",
      },
    ],
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
