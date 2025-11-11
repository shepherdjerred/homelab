#!/usr/bin/env bash
set -e

# Get the repository root directory
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CDK8S_DIR="$REPO_ROOT/src/cdk8s"

echo "🏗️  Building CDK8s manifests for Helm chart..."
cd "$CDK8S_DIR"
bun run build

echo ""
echo "🔍 Linting Helm chart..."

# Check if helm is available
if ! command -v helm &> /dev/null; then
    echo "⚠️  Helm not installed, skipping Helm lint"
    echo "   Install Helm: https://helm.sh/docs/intro/install/"
    exit 0
fi

# Create a temporary directory for Helm chart packaging
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

# Copy Helm chart files
cp -r "$CDK8S_DIR/helm" "$TEMP_DIR/"
cd "$TEMP_DIR/helm"

# Set version using the same script that Dagger uses
# This ensures pre-commit and CI use identical logic
"$REPO_ROOT/scripts/helm-set-version.sh" Chart.yaml "0.0.0-lint"

# Copy CDK8s manifests into templates
mkdir -p templates
cp "$CDK8S_DIR/dist"/*.yaml templates/

# Run helm lint
helm lint .

echo "✅ Helm chart lint passed!"
