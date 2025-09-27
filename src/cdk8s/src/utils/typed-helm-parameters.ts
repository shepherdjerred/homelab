/**
 * Utility functions for converting between typed Helm values and ArgoCD parameters
 */

import { z } from "zod";

export type HelmParameter = { name: string; value: string };

/**
 * Convert a typed Helm values object to ArgoCD parameters array (dot notation)
 */
export function valuesToParameters(
  values: Record<string, unknown>,
  prefix = "",
): HelmParameter[] {
  const parameters: HelmParameter[] = [];

  for (const [key, value] of Object.entries(values)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      continue;
    }

    // Use Zod to validate if value is a plain object (not array)
    const objectSchema = z.record(z.string(), z.unknown());
    const arraySchema = z.array(z.unknown());

    const objectParseResult = objectSchema.safeParse(value);
    if (objectParseResult.success && !arraySchema.safeParse(value).success) {
      // Recursively handle nested objects
      parameters.push(...valuesToParameters(objectParseResult.data, fullKey));
    } else {
      // Convert values to strings with proper handling
      let stringValue: string;
      const arrayParseResult = arraySchema.safeParse(value);
      const objectParseResult = z
        .record(z.string(), z.unknown())
        .safeParse(value);

      if (arrayParseResult.success) {
        stringValue = JSON.stringify(arrayParseResult.data);
      } else if (objectParseResult.success) {
        stringValue = JSON.stringify(objectParseResult.data);
      } else {
        // Handle primitive values - at this point it should be string, number, boolean
        const primitiveSchema = z.union([z.string(), z.number(), z.boolean()]);
        const primitiveResult = primitiveSchema.safeParse(value);

        if (primitiveResult.success) {
          stringValue = String(primitiveResult.data);
        } else {
          // Fallback for any other types (should be rare)
          stringValue = JSON.stringify(value);
        }
      }
      parameters.push({
        name: fullKey,
        value: stringValue,
      });
    }
  }

  return parameters;
}

/**
 * Create typed parameters with validation
 */
export function createTypedParameters(
  values: Record<string, unknown>,
): HelmParameter[] {
  return valuesToParameters(values);
}
