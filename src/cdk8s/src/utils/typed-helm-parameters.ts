/**
 * Utility functions for converting between typed Helm values and ArgoCD parameters
 */

export type HelmParameter = { name: string; value: string };

/**
 * Convert a typed Helm values object to ArgoCD parameters array (dot notation)
 */
export function valuesToParameters<T extends Record<string, any>>(
  values: T,
  prefix = "",
): HelmParameter[] {
  const parameters: HelmParameter[] = [];

  for (const [key, value] of Object.entries(values)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      continue;
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      // Recursively handle nested objects
      parameters.push(...valuesToParameters(value, fullKey));
    } else {
      // Convert primitive values to strings
      parameters.push({
        name: fullKey,
        value: String(value),
      });
    }
  }

  return parameters;
}

/**
 * Create typed parameters with validation
 */
export function createTypedParameters<T extends Record<string, any>>(
  values: T,
): HelmParameter[] {
  return valuesToParameters(values);
}
