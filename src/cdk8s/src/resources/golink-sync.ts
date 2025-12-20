import { Chart } from "cdk8s";
import {
  KubeJob,
  KubeServiceAccount,
  KubeClusterRole,
  KubeClusterRoleBinding,
  Quantity,
} from "../../generated/imports/k8s.ts";
import versions from "../versions.ts";

/**
 * Creates a Job that syncs Tailscale ingresses to golink.
 *
 * This job:
 * 1. Lists all ingresses with ingressClassName: tailscale
 * 2. Extracts their hostnames from the status.loadBalancer.ingress[0].hostname
 * 3. Creates golink aliases for each (short name -> https://hostname/)
 * 4. Deletes stale golinks that point to *.tailnet-1a49.ts.net but no longer have an ingress
 *
 * The job runs as an ArgoCD PostSync hook, so it executes after each successful sync.
 */
export function createGolinkSyncJob(chart: Chart) {
  const namespace = "torvalds";
  const name = "golink-sync";
  const tailnetDomain = "tailnet-1a49.ts.net";
  const golinkUrl = `https://go.${tailnetDomain}`;

  // ServiceAccount for the sync job
  const serviceAccount = new KubeServiceAccount(chart, "golink-sync-sa", {
    metadata: {
      name: `${name}-sa`,
      namespace,
    },
  });

  // ClusterRole to list ingresses across all namespaces
  const clusterRole = new KubeClusterRole(chart, "golink-sync-role", {
    metadata: {
      name: `${name}-role`,
    },
    rules: [
      {
        apiGroups: ["networking.k8s.io"],
        resources: ["ingresses"],
        verbs: ["list"],
      },
    ],
  });

  // Bind the ClusterRole to the ServiceAccount
  new KubeClusterRoleBinding(chart, "golink-sync-binding", {
    metadata: {
      name: `${name}-binding`,
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "ClusterRole",
      name: clusterRole.name,
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: serviceAccount.name,
        namespace,
      },
    ],
  });

  // The sync script
  const syncScript = `
set -e

GOLINK_URL="${golinkUrl}"
TAILNET_DOMAIN="${tailnetDomain}"

echo "=== Golink Sync Job ==="
echo "Golink URL: $GOLINK_URL"
echo ""

# Get all tailscale ingresses and extract their hostnames
echo "Fetching Tailscale ingresses..."
INGRESSES=$(kubectl get ingress --all-namespaces -o json | jq -r '
  .items[]
  | select(.spec.ingressClassName == "tailscale")
  | .status.loadBalancer.ingress[0].hostname // empty
' | sort -u | grep -v '^$' || true)

if [ -z "$INGRESSES" ]; then
  echo "No Tailscale ingresses found"
  exit 0
fi

echo "Found ingresses:"
echo "$INGRESSES" | while read hostname; do
  echo "  - $hostname"
done
echo ""

# Build a list of expected golinks (short -> long URL)
declare -A EXPECTED_LINKS
while read hostname; do
  if [ -n "$hostname" ]; then
    # Extract short name: "plex.tailnet-1a49.ts.net" -> "plex"
    short=$(echo "$hostname" | sed "s/\\.$TAILNET_DOMAIN$//")
    long="https://$hostname/"
    EXPECTED_LINKS["$short"]="$long"
  fi
done <<< "$INGRESSES"

# Get existing golinks
echo "Fetching existing golinks..."
EXISTING=$(curl -sL -H "Sec-Golink: 1" "$GOLINK_URL/.export" 2>/dev/null || echo "")

if [ -z "$EXISTING" ]; then
  echo "Warning: Could not fetch existing golinks or none exist"
  EXISTING=""
fi

# Parse existing golinks into associative array
declare -A EXISTING_LINKS
while IFS= read -r line; do
  if [ -n "$line" ]; then
    short=$(echo "$line" | jq -r '.Short')
    long=$(echo "$line" | jq -r '.Long')
    EXISTING_LINKS["$short"]="$long"
  fi
done <<< "$EXISTING"

echo "Existing golinks: \${#EXISTING_LINKS[@]}"
echo ""

# Create missing golinks
echo "=== Creating missing golinks ==="
created=0
for short in "\${!EXPECTED_LINKS[@]}"; do
  long="\${EXPECTED_LINKS[$short]}"
  existing="\${EXISTING_LINKS[$short]:-}"

  if [ -z "$existing" ]; then
    echo "Creating: go/$short -> $long"
    response=$(curl -sL -X POST "$GOLINK_URL/" \\
      -H "Sec-Golink: 1" \\
      -H "Content-Type: application/x-www-form-urlencoded" \\
      -d "short=$short&long=$long" 2>/dev/null || echo "FAILED")

    if echo "$response" | grep -q "FAILED"; then
      echo "  Failed to create go/$short"
    else
      created=$((created + 1))
    fi
  elif [ "$existing" != "$long" ]; then
    echo "Updating: go/$short -> $long (was: $existing)"
    curl -sL -X POST "$GOLINK_URL/" \\
      -H "Sec-Golink: 1" \\
      -H "Content-Type: application/x-www-form-urlencoded" \\
      -d "short=$short&long=$long" 2>/dev/null || echo "  Failed to update"
    created=$((created + 1))
  fi
done
echo "Created/updated: $created"
echo ""

# Delete stale golinks (ones pointing to tailnet that no longer have an ingress)
echo "=== Cleaning up stale golinks ==="
deleted=0
while IFS= read -r line; do
  if [ -n "$line" ]; then
    short=$(echo "$line" | jq -r '.Short')
    long=$(echo "$line" | jq -r '.Long')

    # Only consider links pointing to our tailnet
    if echo "$long" | grep -q "$TAILNET_DOMAIN"; then
      expected="\${EXPECTED_LINKS[$short]:-}"

      if [ -z "$expected" ]; then
        echo "Deleting stale: go/$short -> $long"
        curl -sL -X POST "$GOLINK_URL/.delete/$short" \\
          -H "Sec-Golink: 1" 2>/dev/null || echo "  Failed to delete"
        deleted=$((deleted + 1))
      fi
    fi
  fi
done <<< "$EXISTING"
echo "Deleted: $deleted"
echo ""

echo "=== Sync complete ==="
`;

  // Create the Job with ArgoCD PostSync hook annotation
  new KubeJob(chart, "golink-sync-job", {
    metadata: {
      name,
      namespace,
      annotations: {
        // ArgoCD hook: run after successful sync
        "argocd.argoproj.io/hook": "PostSync",
        // Delete the job after it completes (success or failure)
        "argocd.argoproj.io/hook-delete-policy": "BeforeHookCreation",
      },
    },
    spec: {
      // Don't retry on failure
      backoffLimit: 1,
      // Clean up after 1 hour
      ttlSecondsAfterFinished: 3600,
      template: {
        spec: {
          serviceAccountName: serviceAccount.name,
          restartPolicy: "Never",
          containers: [
            {
              name: "golink-sync",
              image: `docker.io/bitnami/kubectl:${versions["bitnami/kubectl"]}`,
              command: ["/bin/bash", "-c", syncScript],
              resources: {
                requests: {
                  cpu: Quantity.fromString("50m"),
                  memory: Quantity.fromString("64Mi"),
                },
                limits: {
                  cpu: Quantity.fromString("200m"),
                  memory: Quantity.fromString("128Mi"),
                },
              },
            },
          ],
        },
      },
    },
  });

  return { serviceAccount, clusterRole };
}
