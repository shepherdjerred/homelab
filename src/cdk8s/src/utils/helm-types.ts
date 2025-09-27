import { join } from "node:path";
import { load as yamlLoad } from "js-yaml";
import { z } from "zod";

export type ChartInfo = {
  name: string;
  repoUrl: string;
  version: string;
  chartName: string; // The actual chart name (may differ from versions.ts key)
};

// Individual Zod schemas for type detection
const StringSchema = z.string();
const NumberSchema = z.number();
const BooleanSchema = z.boolean();
const NullSchema = z.null();
const UndefinedSchema = z.undefined();
const ArraySchema = z.array(z.unknown());
const RecordSchema = z.record(z.string(), z.unknown());
const ErrorSchema = z.instanceof(Error);

// Zod schema for validating YAML values - recursive definition with more flexibility
const HelmValueSchema: z.ZodType<Record<string, unknown>> = z.lazy(() =>
  z.record(
    z.string(),
    z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.null(),
      z.undefined(),
      z.array(z.unknown()), // Allow arrays of any type
      HelmValueSchema,
      z.unknown(), // Allow any other values as fallback
    ]),
  ),
);

export type HelmValue = z.infer<typeof HelmValueSchema>;

/**
 * Type guard to check if a value is a valid record object using Zod
 */
function isValidRecord(value: unknown): value is Record<string, unknown> {
  return RecordSchema.safeParse(value).success;
}

export type TypeScriptInterface = {
  name: string;
  properties: Record<string, TypeProperty>;
};

export type TypeProperty = {
  type: string;
  optional: boolean;
  description?: string;
  nested?: TypeScriptInterface;
};

/**
 * Parse chart information from versions.ts comments and values
 */
export async function parseChartInfoFromVersions(
  versionsPath = "src/versions.ts",
): Promise<ChartInfo[]> {
  const content = await Bun.file(versionsPath).text();
  const lines = content.split("\n");
  const charts: ChartInfo[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];

    // Look for renovate comments that indicate Helm charts
    if (line?.includes("renovate: datasource=helm") && nextLine) {
      const repoUrlMatch = /registryUrl=([^\s]+)/.exec(line);
      const versionKeyMatch = /^\s*"?([^":]+)"?:/.exec(nextLine);

      if (repoUrlMatch && versionKeyMatch) {
        const repoUrl = repoUrlMatch[1];
        const versionKey = versionKeyMatch[1];

        if (!repoUrl || !versionKey) continue;

        // Extract version value
        const versionMatch = /:\s*"([^"]+)"/.exec(nextLine);
        if (versionMatch) {
          const version = versionMatch[1];
          if (!version) continue;

          // Try to determine chart name from the version key or URL
          let chartName = versionKey;

          // Handle special cases like "argo-cd" vs "argocd"
          if (versionKey === "argo-cd") {
            chartName = "argo-cd";
          }

          charts.push({
            name: versionKey,
            repoUrl: repoUrl.replace(/\/$/, ""), // Remove trailing slash
            version,
            chartName,
          });
        }
      }
    }
  }

  return charts;
}

/**
 * Fetch a Helm chart and extract its values.yaml
 */
export async function fetchHelmChart(chart: ChartInfo): Promise<HelmValue> {
  const tempDir = join(process.cwd(), "temp", `helm-${chart.name}`);
  const repoName = `temp-repo-${chart.name}-${Date.now().toString()}`;

  try {
    // Ensure temp directory exists
    await Bun.$`mkdir -p ${tempDir}`.quiet();

    console.log(`  📦 Adding Helm repo: ${chart.repoUrl}`);
    // Add the helm repo
    await runCommand("/home/linuxbrew/.linuxbrew/bin/helm", [
      "repo",
      "add",
      repoName,
      chart.repoUrl,
    ]);

    console.log(`  🔄 Updating Helm repos...`);
    // Update repo
    await runCommand("/home/linuxbrew/.linuxbrew/bin/helm", ["repo", "update"]);

    console.log(`  ⬇️  Pulling chart ${chart.chartName}:${chart.version}...`);
    // Pull the chart
    await runCommand("/home/linuxbrew/.linuxbrew/bin/helm", [
      "pull",
      `${repoName}/${chart.chartName}`,
      "--version",
      chart.version,
      "--destination",
      tempDir,
      "--untar",
    ]);

    // Read values.yaml
    const valuesPath = join(tempDir, chart.chartName, "values.yaml");
    console.log(`  📖 Reading values.yaml from ${valuesPath}`);

    try {
      const valuesContent = await Bun.file(valuesPath).text();

      // Parse YAML using js-yaml
      const parsedValues = yamlLoad(valuesContent);
      console.log(`  ✅ Successfully parsed values.yaml`);
      if (isValidRecord(parsedValues)) {
        console.log(
          `  🔍 Parsed values keys: ${Object.keys(parsedValues)
            .slice(0, 10)
            .join(", ")}${Object.keys(parsedValues).length > 10 ? "..." : ""}`,
        );
      }

      // Check if parsedValues is a valid object using Zod before validation
      if (!isValidRecord(parsedValues)) {
        console.warn(
          `  ⚠️  Parsed values is not a valid record object: ${String(parsedValues)}`,
        );
        return {};
      }

      // Validate and parse with Zod for runtime type safety
      const parseResult = HelmValueSchema.safeParse(parsedValues);
      if (parseResult.success) {
        console.log(`  ✅ Zod validation successful`);
        return parseResult.data;
      } else {
        console.warn(`  ⚠️  Zod validation failed for ${chart.name}:`);
        console.warn(
          `    First few errors:`,
          parseResult.error.issues.slice(0, 3),
        );
        console.warn(
          `  ⚠️  Falling back to unvalidated object for type generation`,
        );
        // Return the unvalidated parsed values (already type-narrowed by isValidRecord)
        return parsedValues;
      }
    } catch (error) {
      console.warn(`  ⚠️  Failed to read/parse values.yaml: ${String(error)}`);
      return {};
    }
  } finally {
    // Cleanup
    try {
      console.log(`  🧹 Cleaning up...`);
      await runCommand("/home/linuxbrew/.linuxbrew/bin/helm", [
        "repo",
        "remove",
        repoName,
      ]);
      await Bun.$`rm -rf ${tempDir}`.quiet();
    } catch (cleanupError) {
      console.warn(`Cleanup failed for ${chart.name}:`, String(cleanupError));
    }
  }
}

/**
 * Convert Helm values to TypeScript interface
 */
export function convertToTypeScriptInterface(
  values: HelmValue,
  interfaceName: string,
): TypeScriptInterface {
  const properties: Record<string, TypeProperty> = {};

  for (const [key, value] of Object.entries(values)) {
    const sanitizedKey = sanitizePropertyName(key);
    const typeNameSuffix = sanitizeTypeName(key);
    properties[sanitizedKey] = convertValueToProperty(
      value,
      `${interfaceName}${capitalizeFirst(typeNameSuffix)}`,
    );
  }

  return {
    name: interfaceName,
    properties,
  };
}

function convertValueToProperty(
  value: unknown,
  nestedTypeName: string,
): TypeProperty {
  // Use Zod schemas for robust type detection

  // Check for null/undefined first
  if (
    NullSchema.safeParse(value).success ||
    UndefinedSchema.safeParse(value).success
  ) {
    return { type: "unknown", optional: true };
  }

  // Check for boolean
  if (BooleanSchema.safeParse(value).success) {
    return { type: "boolean", optional: true };
  }

  // Check for number
  if (NumberSchema.safeParse(value).success) {
    return { type: "number", optional: true };
  }

  // Check for string
  if (StringSchema.safeParse(value).success) {
    return { type: "string", optional: true };
  }

  // Check for array
  const arrayResult = ArraySchema.safeParse(value);
  if (arrayResult.success) {
    const arrayValue = arrayResult.data;
    if (arrayValue.length === 0) {
      return { type: "unknown[]", optional: true };
    }

    // Sample multiple elements for better type inference
    const elementTypes = new Set<string>();
    const elementTypeProps: TypeProperty[] = [];
    const sampleSize = Math.min(arrayValue.length, 3); // Check up to 3 elements

    for (let i = 0; i < sampleSize; i++) {
      const elementType = convertValueToProperty(arrayValue[i], nestedTypeName);
      elementTypes.add(elementType.type);
      elementTypeProps.push(elementType);
    }

    // If all elements have the same type, use that
    if (elementTypes.size === 1) {
      const elementType = Array.from(elementTypes)[0];
      const elementProp = elementTypeProps[0];
      if (elementType && elementProp) {
        // For object array elements, we need to create a proper interface for the array element
        if (elementProp.nested) {
          // Create a new interface name for array elements
          const arrayElementTypeName = `${nestedTypeName}Element`;
          const arrayElementInterface: TypeScriptInterface = {
            name: arrayElementTypeName,
            properties: elementProp.nested.properties,
          };

          return {
            type: `${arrayElementTypeName}[]`,
            optional: true,
            nested: arrayElementInterface,
          };
        } else {
          return {
            type: `${elementType}[]`,
            optional: true,
          };
        }
      }
    }

    // If mixed types, use union type for common cases
    const types = Array.from(elementTypes).sort();
    if (
      types.length <= 3 &&
      types.every((t) => ["string", "number", "boolean"].includes(t))
    ) {
      return {
        type: `(${types.join(" | ")})[]`,
        optional: true,
      };
    }

    // Otherwise fall back to unknown[]
    return { type: "unknown[]", optional: true };
  }

  // Check for object (must be last since arrays are also objects)
  const objectResult = HelmValueSchema.safeParse(value);
  if (objectResult.success) {
    const nestedInterface = convertToTypeScriptInterface(
      objectResult.data,
      nestedTypeName,
    );
    return {
      type: nestedTypeName,
      optional: true,
      nested: nestedInterface,
    };
  }

  // Fallback for any unrecognized type
  console.warn(
    `Unrecognized value type for: ${String(value)}, using 'unknown'`,
  );
  return { type: "unknown", optional: true };
}

/**
 * Generate TypeScript code from interface definition
 */
export function generateTypeScriptCode(
  mainInterface: TypeScriptInterface,
  chartName: string,
): string {
  const interfaces: TypeScriptInterface[] = [];

  // Collect all nested interfaces
  collectNestedInterfaces(mainInterface, interfaces);

  let code = `// Generated TypeScript types for ${chartName} Helm chart\n\n`;

  // Generate all interfaces
  for (const iface of interfaces) {
    code += generateInterfaceCode(iface);
    code += "\n";
  }

  // Generate parameter type (flattened dot notation)
  code += generateParameterType(mainInterface, chartName);

  // Check if any 'any' types were generated and add ESLint disable if needed
  if (code.includes(": any")) {
    code = `// Generated TypeScript types for ${chartName} Helm chart
/* eslint-disable @typescript-eslint/no-explicit-any */

${code.substring(code.indexOf("\n\n") + 2)}`;
  }

  return code;
}

function collectNestedInterfaces(
  iface: TypeScriptInterface,
  collected: TypeScriptInterface[],
): void {
  for (const prop of Object.values(iface.properties)) {
    if (prop.nested) {
      collected.push(prop.nested);
      collectNestedInterfaces(prop.nested, collected);
    }
  }

  // Add main interface last so dependencies come first
  if (!collected.some((i) => i.name === iface.name)) {
    collected.push(iface);
  }
}

function generateInterfaceCode(iface: TypeScriptInterface): string {
  const hasProperties = Object.keys(iface.properties).length > 0;

  if (!hasProperties) {
    // Use 'object' for empty interfaces instead of '{}'
    return `export type ${iface.name} = object;\n`;
  }

  let code = `export type ${iface.name} = {\n`;

  for (const [key, prop] of Object.entries(iface.properties)) {
    const optional = prop.optional ? "?" : "";
    const description = prop.description
      ? `  /** ${prop.description} */\n`
      : "";
    code += `${description}  ${key}${optional}: ${prop.type};\n`;
  }

  code += "};\n";
  return code;
}

function generateParameterType(
  iface: TypeScriptInterface,
  chartName: string,
): string {
  const parameterKeys = flattenInterfaceKeys(iface);

  const normalizedChartName = capitalizeFirst(chartName).replace(/-/g, "");
  let code = `export type ${normalizedChartName}HelmParameters = {\n`;

  for (const key of parameterKeys) {
    code += `  "${key}"?: string;\n`;
  }

  code += "};\n";

  return code;
}

function flattenInterfaceKeys(
  iface: TypeScriptInterface,
  prefix = "",
): string[] {
  const keys: string[] = [];

  for (const [key, prop] of Object.entries(iface.properties)) {
    // Remove quotes from key for parameter names
    const cleanKey = key.replace(/"/g, "");
    const fullKey = prefix ? `${prefix}.${cleanKey}` : cleanKey;

    if (prop.nested) {
      keys.push(...flattenInterfaceKeys(prop.nested, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Sanitize property names for TypeScript interfaces
 * Handles special characters, reserved keywords, and invalid syntax
 */
function sanitizePropertyName(key: string): string {
  // TypeScript reserved keywords that need quoting
  const reservedKeywords = new Set([
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "null",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
  ]);

  // Check if key needs quoting
  const needsQuoting =
    reservedKeywords.has(key) ||
    /[^a-zA-Z0-9_$]/.test(key) || // Contains special characters
    /^\d/.test(key); // Starts with digit

  return needsQuoting ? `"${key}"` : key;
}

/**
 * Sanitize type names by removing invalid characters and normalizing
 */
function sanitizeTypeName(key: string): string {
  return (
    key
      .replace(/[^a-zA-Z0-9]/g, "") // Remove all special characters
      .replace(/^\d+/, "") || // Remove leading digits
    "Property"
  ); // Fallback if empty
}

/**
 * Run a command and return its output using Bun
 */
async function runCommand(command: string, args: string[]): Promise<string> {
  try {
    const proc = Bun.spawn([command, ...args], {
      stdout: "pipe",
      stderr: "inherit",
    });

    const output = await new Response(proc.stdout).text();
    const exitCode = await proc.exited;

    if (exitCode === 0) {
      return output;
    } else {
      throw new Error(
        `Command "${command} ${args.join(" ")}" failed with code ${exitCode.toString()}`,
      );
    }
  } catch (error) {
    const parseResult = ErrorSchema.safeParse(error);
    const errorMessage = parseResult.success
      ? parseResult.data.message
      : String(error);
    throw new Error(
      `Failed to spawn command "${command} ${args.join(" ")}": ${errorMessage}`,
    );
  }
}
