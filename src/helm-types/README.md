# Helm Types Generator

**Note** this module/README was authored by AI

A generic TypeScript type generator for Helm charts. This tool fetches Helm chart values and generates corresponding TypeScript interfaces and parameter types.

## Features

- **Generic Chart Support**: Works with any Helm chart from any repository
- **TypeScript Interface Generation**: Creates strongly-typed interfaces from `values.yaml`
- **Parameter Type Generation**: Generates flattened dot-notation parameter types for Helm values
- **Automatic Validation**: Includes Prettier, TypeScript, and ESLint validation
- **CLI Interface**: Easy-to-use command-line interface
- **Programmatic API**: Can be used as a library in other projects

## Installation

This is a private package within the homelab monorepo. Install dependencies:

```bash
bun install
```

## Usage

### Command Line Interface

```bash
# Generate types from default locations
bun run generate

# Specify custom paths
bun run src/cli.ts --versions-file ./my-versions.ts --output-dir ./generated-types

# Skip validation steps
bun run src/cli.ts --no-prettier --no-lint --no-typecheck

# Show help
bun run src/cli.ts --help
```

### Programmatic API

```typescript
import {
  generateHelmTypes,
  parseChartInfoFromVersions,
  fetchHelmChart,
} from "@homelab/helm-types";

// Generate all types from a versions file
await generateHelmTypes({
  versionsFile: "src/versions.ts",
  outputDir: "src/types/helm",
  runPrettier: true,
  runTypeCheck: true,
  runLinter: true,
});

// Or work with individual charts
const charts = await parseChartInfoFromVersions("src/versions.ts");
for (const chart of charts) {
  const values = await fetchHelmChart(chart);
  // Process values...
}
```

## Input Format

The tool expects a `versions.ts` file with Renovate comments indicating Helm charts:

```typescript
export const versions = {
  // renovate: datasource=helm registryUrl=https://prometheus-community.github.io/helm-charts
  "kube-prometheus-stack": "65.1.1",

  // renovate: datasource=helm registryUrl=https://argoproj.github.io/argo-helm
  "argo-cd": "7.6.12",
};
```

## Output

The tool generates:

1. **Type Files**: `{chart-name}.types.ts` containing:
   - `{ChartName}HelmValues` - Strongly typed interface matching the chart's values.yaml
   - `{ChartName}HelmParameters` - Flattened parameter type for Helm value overrides

2. **Index File**: `index.ts` that re-exports all generated types

### Example Output

```typescript
// Generated TypeScript types for kube-prometheus-stack Helm chart

export type KubePrometheusStackHelmValues = {
  alertmanager?: KubePrometheusStackHelmValuesAlertmanager;
  prometheus?: KubePrometheusStackHelmValuesPrometheus;
  grafana?: KubePrometheusStackHelmValuesGrafana;
  // ... more properties
};

export type KubePrometheusStackHelmParameters = {
  "alertmanager.enabled"?: string;
  "alertmanager.config.global.smtp_smarthost"?: string;
  "prometheus.prometheusSpec.retention"?: string;
  // ... flattened parameter keys
};
```

## Configuration

### CLI Options

- `--versions-file, -v`: Path to versions.ts file (default: `src/versions.ts`)
- `--output-dir, -o`: Output directory (default: `src/types/helm`)
- `--no-prettier`: Skip Prettier formatting
- `--no-typecheck`: Skip TypeScript compilation check
- `--no-lint`: Skip ESLint validation

### Programmatic Options

```typescript
interface HelmTypesOptions {
  versionsFile?: string; // Path to versions file
  outputDir?: string; // Output directory
  runPrettier?: boolean; // Run prettier (default: true)
  runTypeCheck?: boolean; // Run tsc --noEmit (default: true)
  runLinter?: boolean; // Run eslint (default: true)
}
```

## Dependencies

- **Bun**: Runtime and package manager
- **js-yaml**: YAML parsing
- **zod**: Runtime type validation
- **Helm CLI**: Must be available at `/home/linuxbrew/.linuxbrew/bin/helm`

## Architecture

The tool follows a modular architecture:

1. **Parser**: Extracts chart information from versions.ts comments
2. **Fetcher**: Downloads and extracts Helm chart values using Helm CLI
3. **Converter**: Transforms YAML values into TypeScript interface definitions
4. **Generator**: Produces TypeScript code with proper formatting
5. **CLI**: Provides command-line interface with validation pipeline

## Error Handling

- Charts that fail to download are skipped with warnings
- Invalid YAML falls back to unvalidated objects
- Missing values.yaml results in minimal type definitions
- Validation failures don't stop the generation process

## Contributing

This tool is designed to be generic and reusable. When making changes:

1. Keep the core logic chart-agnostic
2. Maintain backward compatibility with existing APIs
3. Add tests for new functionality
4. Update documentation for new features
