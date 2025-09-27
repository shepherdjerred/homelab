# Type-Safe Helm Parameters

This directory contains TypeScript type definitions that provide type safety for Helm chart configurations used with ArgoCD applications.

## Overview

The type system provides:
- **Conditional types** that map chart names to their specific Helm values
- **Literal types** for chart names to prevent typos
- **Helper functions** for type-safe Helm configuration
- **Full IntelliSense** support for all Helm chart options

## Key Files

- `helm-parameters.ts` - Core type definitions and utilities
- `helm-examples.ts` - Comprehensive usage examples
- `helm/` - Generated types for individual Helm charts
- `typed-loki.ts` - Example refactored app showing migration path

## Quick Start

### 1. Basic Usage with Conditional Types

```typescript
import { HelmValuesForChart, createTypedHelmConfig } from "./types/helm";

// TypeScript provides full autocomplete and validation
const lokiConfig: HelmValuesForChart<"loki"> = {
  deploymentMode: "SingleBinary",
  singleBinary: {
    persistence: {
      storageClass: "fast-ssd",
      size: "32Gi",
    },
  },
  loki: {
    auth_enabled: false,
    limits_config: {
      retention_period: "90d",
    },
  },
};

// Type-safe Helm configuration
const helmConfig = createTypedHelmConfig("loki", {
  valuesObject: lokiConfig,
});
```

### 2. Using Literal Types for Chart Selection

```typescript
import { HelmChartName } from "./types/helm";

// Literal type ensures only valid chart names
function createApp(chartName: HelmChartName) {
  // chartName is guaranteed to be one of:
  // "argo-cd" | "cert-manager" | "loki" | "kube-prometheus-stack" | ...
}

// This will cause a TypeScript error:
createApp("invalid-chart"); // ❌ Error: not assignable to HelmChartName
createApp("loki");          // ✅ Valid
```

### 3. Type-Safe Application Creation

```typescript
import { createTypedApplication } from "./types/helm";

export function createMyApp(chart: Chart) {
  const values: HelmValuesForChart<"argo-cd"> = {
    global: {
      domain: "argocd.example.com",
    },
    server: {
      metrics: {
        enabled: true,
      },
    },
  };

  return createTypedApplication(
    chart,
    "my-argocd-app",
    "argo-cd",    // Type-checked chart name
    "argocd",
    "https://argoproj.github.io/argo-helm/",
    values        // Type-checked against ArgocdHelmValues
  );
}
```

## Type System Architecture

### Conditional Types

The core of the type system uses conditional types to map chart names to their values:

```typescript
export type HelmValuesForChart<TChart extends HelmChartName> =
  TChart extends "argo-cd" ? ArgocdHelmValues :
  TChart extends "loki" ? LokiHelmValues :
  TChart extends "kube-prometheus-stack" ? KubeprometheusstackHelmValues :
  // ... other charts
  never;
```

### Literal Types

Chart names are defined as literal types to prevent typos:

```typescript
export type HelmChartName =
  | "argo-cd"
  | "cert-manager"
  | "loki"
  | "kube-prometheus-stack"
  // ... all supported charts
```

### Generic Functions

Helper functions use generics to maintain type safety:

```typescript
export function createTypedHelmConfig<TChart extends HelmChartName>(
  chart: TChart,
  config: TypedHelmConfig<TChart>
): TypedHelmConfig<TChart>
```

## Migration Guide

### Before (Untyped)

```typescript
// ❌ No type safety, easy to make mistakes
new Application(chart, "loki-app", {
  spec: {
    source: {
      chart: "loki",
      helm: {
        valuesObject: {
          deploymentMode: "SingleBinary", // Could typo this
          loki: {
            auth_enabled: fase,              // ❌ Typo not caught
            limits_config: {
              retention_period: "90days",    // ❌ Invalid format
            },
          },
        },
      },
    },
  },
});
```

### After (Type-Safe)

```typescript
// ✅ Full type safety with IntelliSense
const lokiValues: HelmValuesForChart<"loki"> = {
  deploymentMode: "SingleBinary",           // ✅ Autocomplete available
  loki: {
    auth_enabled: false,                    // ✅ TypeScript validates type
    limits_config: {
      retention_period: "90d",              // ✅ Type-checked format
    },
  },
};

const app = createTypedApplication(
  chart,
  "loki-app",
  "loki",           // ✅ Chart name validated
  "loki",
  repoUrl,
  lokiValues        // ✅ Values type-checked against chart
);
```

## Benefits

### 1. Compile-Time Validation
- Catch configuration errors before deployment
- Prevent typos in chart names and configuration keys
- Validate value types match chart expectations

### 2. Enhanced Developer Experience
- Full IntelliSense/autocomplete for all chart options
- Hover documentation for configuration properties
- Better refactoring support across the codebase

### 3. Maintainability
- Self-documenting code through TypeScript types
- Easier to understand what configurations are available
- Reduces need to reference Helm chart documentation

### 4. Runtime Safety
- Type guards for runtime validation
- Helper functions ensure consistent usage patterns
- Reduced debugging time for configuration issues

## Advanced Usage

### Custom Configuration Factory

```typescript
class HelmConfigFactory {
  static forLoki(overrides?: Partial<HelmValuesForChart<"loki">>) {
    const base: HelmValuesForChart<"loki"> = {
      deploymentMode: "SingleBinary",
      // ... default config
    };
    return { ...base, ...overrides };
  }
}
```

### Runtime Validation

```typescript
import { isValidChartName, validateChartName } from "./types/helm";

function createAppFromConfig(chartName: string, values: any) {
  if (!isValidChartName(chartName)) {
    throw new Error(`Invalid chart: ${chartName}`);
  }

  // TypeScript now knows chartName is valid
  return createTypedApplication(chart, "app", chartName, namespace, repo, values);
}
```

### Generic Chart Handlers

```typescript
function configureMonitoring<TChart extends HelmChartName>(
  chartName: TChart,
  baseValues: HelmValuesForChart<TChart>
): HelmValuesForChart<TChart> {
  // Add monitoring configuration based on chart type
  // TypeScript ensures type safety throughout
  return baseValues;
}
```

## Supported Charts

Currently supports type definitions for:
- argo-cd
- cert-manager
- chartmuseum
- connect
- intel-device-plugins-operator
- kube-prometheus-stack
- loki
- minecraft
- node-feature-discovery
- openebs
- postgres-operator
- promtail
- tailscale-operator
- velero

## Adding New Charts

1. Generate types for your Helm chart
2. Add the chart name to `HelmChartName` literal type
3. Add the conditional type mapping in `HelmValuesForChart`
4. Export the generated types from `helm/index.ts`
5. Update the validation arrays in helper functions
