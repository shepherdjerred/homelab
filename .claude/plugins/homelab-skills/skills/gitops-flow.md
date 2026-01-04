---
description: >-
  Use when asking about deployment pipeline, CI/CD flow, Dagger pipeline,
  ArgoCD sync, or how changes get deployed.
---

# GitOps Deployment Flow

## Overview

Changes flow through: **GitHub → Dagger → Helm → ChartMuseum → ArgoCD → Cluster**

```text
Code Change
    ↓
GitHub Actions (trigger)
    ↓
Dagger Pipeline (build/test)
    ↓
CDK8s Build (generate manifests)
    ↓
Helm Package (create chart)
    ↓
ChartMuseum (store chart)
    ↓
ArgoCD Sync (deploy)
    ↓
Kubernetes Cluster
```

## Pipeline Triggers

| Event | Pipeline Mode | Actions |
|-------|--------------|---------|
| Push to `main` | Production | Build, test, publish, deploy |
| Pull Request | Development | Build, test only |

## Dagger Pipeline

The pipeline is defined in `.dagger/src/index.ts`:

### Main CI Function

```typescript
@func()
async ci(
  source: Directory,
  argocdToken: Secret,
  ghcrUsername: string,
  ghcrPassword: Secret,
  chartVersion: string,
  chartRepo: string,
  chartMuseumUsername: string,
  chartMuseumPassword: Secret,
  env: Stage = Stage.Dev,
): Promise<string>
```

### Pipeline Steps

#### 1. Version Updates (Prod Only)

```typescript
if (env === Stage.Prod) {
  updatedSource = this.updateHaVersion(source, chartVersion);
  updatedSource = this.updateDependencySummaryVersion(updatedSource, chartVersion);
  updatedSource = this.updateClaudeCodeUIVersion(updatedSource, chartVersion);
}
```

#### 2. Parallel Container Preparation

```typescript
const haContainerPromise = prepareHaContainer(updatedSource);
const cdk8sContainer = prepareCdk8sContainer(updatedSource);
```

#### 3. Parallel Tests/Lints/Builds

```typescript
const [
  renovateTestResult,
  helmTestResult,
  cdk8sTestResult,
  cdk8sLintResult,
  haLintResult,
  cdk8sTypeCheckResult,
  haTypeCheckResult,
  cdk8sBuildResult,
  haBuildResult,
  helmBuildResult,
] = await Promise.all([
  this.testRenovateRegex(updatedSource),
  this.testHelm(updatedSource),
  testCdk8sWithContainer(cdk8sContainer),
  lintCdk8sWithContainer(cdk8sContainer),
  haContainerPromise.then(c => lintHaWithContainer(c)),
  typeCheckCdk8sWithContainer(cdk8sContainer),
  haContainerPromise.then(c => typeCheckHaWithContainer(c)),
  buildK8sManifestsWithContainer(cdk8sContainer),
  buildHa(updatedSource),
  this.helmBuild(...),
]);
```

#### 4. Image Publishing (Prod Only)

```typescript
if (env === Stage.Prod) {
  await Promise.all([
    this.internalPublishHaImage(updatedSource,
      `ghcr.io/shepherdjerred/homelab:${chartVersion}`, ...),
    this.internalPublishHaImage(updatedSource,
      `ghcr.io/shepherdjerred/homelab:latest`, ...),
  ]);
}
```

#### 5. Helm Chart Publishing (Prod Only)

```typescript
if (env === Stage.Prod && helmBuildResult.dist) {
  await this.helmPublishBuilt(
    helmBuildResult.dist,
    `1.0.0-${chartVersion}`,
    chartRepo,
    chartMuseumUsername,
    chartMuseumPassword,
    env,
  );
}
```

#### 6. ArgoCD Sync (Prod Only)

```typescript
if (env === Stage.Prod && helmPublishResult.status === "passed") {
  await argocdSync(argocdToken);
}
```

## CDK8s Build Process

### Build Command

```bash
bun run build  # In src/cdk8s
```

### Output

CDK8s synthesizes Kubernetes YAML manifests to `src/cdk8s/dist/`:

```text
src/cdk8s/dist/
├── apps.yaml       # ArgoCD applications
├── torvalds.yaml   # Main homelab chart
└── ...
```

## Helm Chart Packaging

From `.dagger/src/helm.ts`:

```typescript
function getHelmContainer(source: Directory, repoRoot: Directory, version: string) {
  const cdk8sManifests = buildK8sManifests(repoRoot);

  return dag.container()
    .from(`alpine/helm:${versions["alpine/helm"]}`)
    .withMountedDirectory("/workspace", source)
    // Update Chart.yaml version
    .withExec(["helm-set-version.sh", "Chart.yaml", version])
    // Copy CDK8s manifests to templates/
    .withExec(["mkdir", "-p", "templates"])
    .withDirectory("templates", cdk8sManifests)
    // Package chart
    .withExec(["helm", "package", "."]);
}
```

### Chart Version Format

```text
torvalds-1.0.0-{github_run_number}.tgz
```

## ChartMuseum

### Chart Repository

```text
https://chartmuseum.tailnet-1a49.ts.net
```

### Publishing

```typescript
export async function publish(
  source: Directory,
  repoRoot: Directory,
  version: string,
  repo: string,
  chartMuseumUsername: string,
  chartMuseumPassword: Secret,
): Promise<string> {
  const chartFile = `torvalds-${version}.tgz`;

  // POST chart to ChartMuseum API
  await container.withExec([
    "sh", "-c",
    `curl -u $USER:$PASS --data-binary @${chartFile} ${repo}/api/charts`,
  ]);
}
```

## ArgoCD Sync

From `.dagger/src/argocd.ts`:

```typescript
export async function sync(
  argocdToken: Secret,
  argocdServer = "https://argocd.tailnet-1a49.ts.net",
  appName = "torvalds",
): Promise<StepResult> {
  // POST to ArgoCD sync API
  await container.withExec([
    "sh", "-c",
    `curl -X POST ${argocdServer}/api/v1/applications/${appName}/sync ` +
      '-H "Authorization: Bearer $ARGOCD_TOKEN"',
  ]);
}
```

## GitHub Actions Workflow

From `.github/workflows/ci.yml`:

```yaml
jobs:
  build:
    runs-on: homelab-runner-set
    steps:
      - uses: actions/checkout@v4

      - name: Run Dagger Pipeline
        run: |
          dagger call ci \
            --source . \
            --argocd-token env:ARGOCD_TOKEN \
            --ghcr-username ${{ github.actor }} \
            --ghcr-password env:GHCR_TOKEN \
            --chart-version ${{ github.run_number }} \
            --env ${{ github.ref == 'refs/heads/main' && 'prod' || 'dev' }}
```

## Manual Operations

### Run Local Build

```bash
cd src/cdk8s
bun run build
```

### Run Dagger Pipeline Locally

```bash
dagger call ci \
  --source . \
  --argocd-token env:ARGOCD_TOKEN \
  --ghcr-username myuser \
  --ghcr-password env:GHCR_TOKEN \
  --chart-version local-test \
  --env dev
```

### Force ArgoCD Sync

```bash
argocd app sync torvalds
# Or via API
curl -X POST https://argocd.tailnet-1a49.ts.net/api/v1/applications/torvalds/sync \
  -H "Authorization: Bearer $ARGOCD_TOKEN"
```

### Check ArgoCD Status

```bash
argocd app get torvalds
argocd app history torvalds
```

## Rollback

### Via ArgoCD UI

1. Go to https://argocd.tailnet-1a49.ts.net
2. Select `torvalds` application
3. Click "History and Rollback"
4. Select previous revision

### Via CLI

```bash
argocd app rollback torvalds <revision>
```

## Key Files

- `.github/workflows/ci.yml` - GitHub Actions workflow
- `.dagger/src/index.ts` - Main Dagger pipeline
- `.dagger/src/cdk8s.ts` - CDK8s build functions
- `.dagger/src/helm.ts` - Helm packaging and publishing
- `.dagger/src/argocd.ts` - ArgoCD sync function
- `src/cdk8s/helm/Chart.yaml` - Helm chart definition
- `src/cdk8s/src/main.ts` - CDK8s entry point
