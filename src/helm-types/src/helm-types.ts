/* eslint-disable max-lines */
import { join } from "node:path";
import { parse as yamlParse, parseDocument } from "yaml";
import { z } from "zod";

export type ChartInfo = {
  name: string;
  repoUrl: string;
  version: string;
  chartName: string; // The actual chart name (may differ from versions.ts key)
};

export type JSONSchemaProperty = {
  type?: string | string[];
  enum?: unknown[];
  oneOf?: JSONSchemaProperty[];
  anyOf?: JSONSchemaProperty[];
  items?: JSONSchemaProperty;
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
  description?: string;
  default?: unknown;
};

// Individual Zod schemas for type detection
const StringSchema = z.string();
const ActualNumberSchema = z.number(); // Runtime number
const ActualBooleanSchema = z.boolean(); // Runtime boolean
const NullSchema = z.null();
const UndefinedSchema = z.undefined();
const ArraySchema = z.array(z.unknown());
const RecordSchema = z.record(z.string(), z.unknown());
const ErrorSchema = z.instanceof(Error);

// Custom boolean string parser - only matches actual boolean-like strings
const StringBooleanSchema = z.string().refine((val) => {
  const lower = val.toLowerCase();
  return lower === "true" || lower === "false" || lower === "yes" || lower === "no";
}, "Not a boolean string");

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
 * Configuration for types that should allow arbitrary additional properties.
 * Maps chart names to array of key paths that should be extensible.
 *
 * These are typically config maps, RBAC policies, or other key-value stores
 * where the schema doesn't enumerate all possible keys.
 */
const EXTENSIBLE_TYPE_PATTERNS: Record<string, string[]> = {
  "argo-cd": [
    "configs.cm", // Allows accounts.*, and other custom config
    "configs.rbac", // Allows policy.*, custom RBAC rules
  ],
  "kube-prometheus-stack": [
    "grafana", // Allows "grafana.ini" and other quoted config keys
    "alertmanager.config.receivers", // Allows various *_configs (pagerduty_configs, etc.) on array elements
    "prometheus-node-exporter", // Allows extraHostVolumeMounts and other node exporter specific configs
    "prometheusNodeExporter", // Also support camelCase variant
  ],
  loki: [
    "loki.limits_config", // Allows retention_period and other limit configs (note: underscore, not camelCase)
    "loki.limitsConfig", // Also support camelCase variant
    "compactor", // Allows various compactor settings
    "minio.persistence", // Storage configs
  ],
  minecraft: [
    "persistence", // Storage class and other persistence options
  ],
  openebs: [
    "zfs-localpv", // ZFS-specific configs
  ],
  "postgres-operator": [
    "configGeneral", // General config allows various settings
  ],
  chartmuseum: [
    "persistence", // Storage options
  ],
  "intel-device-plugins-operator": [
    // Root level for device-specific settings
    "",
  ],
};

/**
 * Pattern-based detection for extensible types.
 * Returns true if the property should allow arbitrary keys.
 */
function shouldAllowArbitraryProps(
  keyPath: string,
  chartName: string,
  propertyName: string,
  yamlComment?: string,
): boolean {
  // Check configured patterns for this chart
  const patterns = EXTENSIBLE_TYPE_PATTERNS[chartName];
  if (patterns) {
    for (const pattern of patterns) {
      if (pattern === keyPath || (pattern === "" && keyPath.split(".").length === 1)) {
        return true;
      }
      // Also match if keyPath starts with pattern
      if (pattern && keyPath.startsWith(`${pattern}.`)) {
        return true;
      }
    }
  }

  // Pattern-based detection from property names
  const lowerProp = propertyName.toLowerCase();
  const lowerPath = keyPath.toLowerCase();

  // Common names that suggest extensibility
  const extensibleNames = [
    "cm", // ConfigMap data
    "data",
    "config",
    "configs",
    "settings",
    "parameters",
    "options",
    "extraenv",
    "annotations",
    "labels",
    "nodeaffinity",
    "toleration",
  ];

  if (extensibleNames.includes(lowerProp)) {
    return true;
  }

  // Check for persistence/storage which often has provider-specific fields
  if (lowerPath.includes("persistence") || lowerPath.includes("storage")) {
    return true;
  }

  // Check YAML comments for hints
  if (yamlComment) {
    const commentLower = yamlComment.toLowerCase();
    if (
      /\b(arbitrary|custom|additional|extra|any)\s+(keys?|properties?|fields?|values?)\b/i.exec(commentLower) ||
      /\bkey[\s-]?value\s+pairs?\b/i.exec(commentLower)
    ) {
      return true;
    }
  }

  return false;
}

export type TypeScriptInterface = {
  name: string;
  properties: Record<string, TypeProperty>;
  /**
   * If true, add an index signature to allow arbitrary additional properties
   * Useful for config maps, arbitrary key-value stores, etc.
   */
  allowArbitraryProps?: boolean;
};

export type TypeProperty = {
  type: string;
  optional: boolean;
  description?: string;
  default?: unknown;
  nested?: TypeScriptInterface;
};

/**
 * Parse chart information from versions.ts comments and values
 */
export async function parseChartInfoFromVersions(versionsPath = "src/versions.ts"): Promise<ChartInfo[]> {
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
 * Load JSON schema if it exists in the chart
 */
async function loadJSONSchema(chartPath: string): Promise<JSONSchemaProperty | null> {
  try {
    const schemaPath = join(chartPath, "values.schema.json");
    const schemaContent = await Bun.file(schemaPath).text();
    const parsed: unknown = JSON.parse(schemaContent);
    // Validate that parsed is an object
    const recordCheck = RecordSchema.safeParse(parsed);
    if (!recordCheck.success) {
      return null;
    }
    // Note: JSONSchemaProperty is a structural type
    const schema: JSONSchemaProperty = recordCheck.data;
    console.log(`  📋 Loaded values.schema.json`);
    return schema;
  } catch {
    // Schema doesn't exist or couldn't be parsed - that's okay
    return null;
  }
}

/**
 * Clean up YAML comment text for use in JSDoc
 * Removes Helm-specific markers and filters out code examples and section headers
 */
function cleanYAMLComment(comment: string): string {
  if (!comment) return "";

  const lines = comment.split("\n").map((line) => {
    // The yaml parser already strips the leading #, but sometimes comments can have # internally
    // or multiple ## that leave residue. Clean them up.
    line = line.trim(); // First trim whitespace
    line = line.replace(/^#+\s*/, ""); // Remove any leading # symbols
    line = line.replace(/^--\s*/, ""); // Remove Helm's -- marker
    return line.trim();
  });

  // First pass: identify section headers and detect where commented-out YAML blocks start
  // When we hit a commented YAML block, we should discard everything before it
  const lineTypes: { line: string; isSectionHeader: boolean; startsCommentedBlock: boolean }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    if (!line) {
      lineTypes.push({ line, isSectionHeader: false, startsCommentedBlock: false });
      continue;
    }

    // Check if this line IS a commented-out YAML key (starts a block we should ignore everything before)
    const isCommentedYAML = Boolean(
      /^[\w.-]+:\s*\|/.exec(line) ?? // e.g., "dex.config: |"
        /^[\w.-]+:\s*$/.exec(line) ?? // e.g., "config:"
        (/^[\w.-]+:/.exec(line) && line.split(/\s+/).length <= 3), // e.g., "setting: value" (short lines)
    );

    // Check if the next line is a commented-out YAML key
    const nextLine = lines[i + 1];
    const isFollowedByCommentedYAML =
      nextLine && (/^[\w.-]+:\s*\|/.exec(nextLine) ?? /^[\w.-]+:\s*$/.exec(nextLine) ?? /^[\w.-]+:/.exec(nextLine));

    // If this line is followed by commented YAML and contains certain keywords,
    // it's likely a section header (even with punctuation like "optional.")
    const wordCount = line.split(/\s+/).length;
    const hasConfigKeywords = /\b(configuration|config|example|setup|settings?|options?|alternative)\b/i.exec(line);
    const isSectionHeader = Boolean(
      isFollowedByCommentedYAML &&
        wordCount >= 2 &&
        wordCount <= 15 &&
        (hasConfigKeywords ?? !/[.!?]$/.exec(line)) &&
        !line.includes("http") &&
        !/^Ref:/.exec(line) &&
        !/^(This|The|A|An)\s/i.exec(line),
    );

    lineTypes.push({ line, isSectionHeader, startsCommentedBlock: isCommentedYAML });
  }

  // Second pass: filter out code examples and section headers, keep documentation
  const cleaned: string[] = [];
  let inCodeBlock = false;

  for (const { line, isSectionHeader, startsCommentedBlock } of lineTypes) {
    if (line.length === 0) {
      if (inCodeBlock) inCodeBlock = false;
      continue;
    }

    // If we hit a commented-out YAML block, discard everything we've collected so far
    // because it was all part of a different section
    if (startsCommentedBlock) {
      cleaned.length = 0;
      inCodeBlock = true; // Treat the commented YAML as a code block
      continue;
    }

    // Skip @default lines (we'll generate our own)
    if (line.startsWith("@default")) continue;

    // Skip section headers
    if (isSectionHeader) {
      continue;
    }

    // Detect code examples/YAML blocks
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    const isExample = Boolean(
      /^-{3,}/.exec(line) ||
        /^BEGIN .*(KEY|CERTIFICATE)/.exec(line) ||
        /^END .*(KEY|CERTIFICATE)/.exec(line) ||
        (line.startsWith("-") && (line.includes(":") || /^-\s+\|/.exec(line))) ||
        /^\w+:$/.exec(line) ||
        /^[\w-]+:\s*$/.exec(line) ||
        /^[\w.-]+:\s*\|/.exec(line) ||
        line.startsWith("|") ||
        line.includes("$ARGOCD_") ||
        line.includes("$KUBE_") ||
        /^\s{2,}/.exec(line) ||
        /^echo\s+/.exec(line) ||
        /^[pg],\s*/.exec(line),
    );
    /* eslint-enable @typescript-eslint/prefer-nullish-coalescing */

    if (isExample) {
      inCodeBlock = true;
      continue;
    }

    // Resume when we hit prose again
    if (inCodeBlock) {
      const startsWithCapital = /^[A-Z]/.exec(line);
      const hasEndPunctuation = /[.!?]$/.exec(line);
      const isSentenceFragment = /^[A-Z][^:]*:?\s*$/.exec(line);
      const notYamlKey = !(/^\s*[A-Z]\w*:/.exec(line) && !line.includes(" "));
      const reasonableLength = line.length > 10;

      /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
      const looksLikeProse =
        startsWithCapital && (hasEndPunctuation || isSentenceFragment) && notYamlKey && reasonableLength;
      /* eslint-enable @typescript-eslint/prefer-nullish-coalescing */

      if (looksLikeProse) {
        inCodeBlock = false;
      } else {
        continue;
      }
    }

    cleaned.push(line);
  }

  return cleaned.join("\n").trim();
}

/**
 * Parse YAML comments and associate them with keys using proper YAML AST parsing
 * This is much more robust than regex-based parsing
 * Exported for testing purposes
 */
export function parseYAMLComments(yamlContent: string): Map<string, string> {
  const comments = new Map<string, string>();

  try {
    const doc = parseDocument(yamlContent);

    // Recursively walk the YAML AST and extract comments
    function visitNode(node: unknown, keyPath: string[] = [], parentComment = ""): void {
      // Handle document root - check if node is a Document
      const documentCheck = z.object({ contents: z.unknown() }).safeParse(node);
      if (documentCheck.success) {
        if (documentCheck.data.contents) {
          visitNode(documentCheck.data.contents, keyPath, "");
        }
        return;
      }

      // Handle map/object nodes - check if node has items array
      const mapNodeCheck = z
        .object({ items: z.array(z.unknown()), commentBefore: z.unknown().optional() })
        .safeParse(node);
      if (mapNodeCheck.success) {
        // If this map node itself has a comment, it applies to its first child
        const commentBeforeCheck = z.string().safeParse(mapNodeCheck.data.commentBefore);
        const mapComment = commentBeforeCheck.success ? commentBeforeCheck.data : parentComment;

        for (const item of mapNodeCheck.data.items) {
          const itemCheck = z.object({ key: z.unknown(), value: z.unknown() }).safeParse(item);
          if (!itemCheck.success) continue;

          // Get the key - validate it has a value property that's a string
          const keyNodeCheck = z.object({ value: z.string() }).safeParse(itemCheck.data.key);
          if (!keyNodeCheck.success) continue;

          const key = keyNodeCheck.data.value;
          const newPath = [...keyPath, key];
          const fullKey = newPath.join(".");

          // Extract comment from the key's commentBefore
          let comment = "";
          const keyCommentCheck = z.object({ commentBefore: z.unknown() }).safeParse(itemCheck.data.key);
          if (keyCommentCheck.success) {
            const commentCheck = z.string().safeParse(keyCommentCheck.data.commentBefore);
            comment = commentCheck.success ? commentCheck.data : "";
          }

          // Also check the pair itself for comments
          const pairCommentCheck = z.object({ commentBefore: z.unknown() }).safeParse(item);
          if (pairCommentCheck.success) {
            const pairCommentValue = z.string().safeParse(pairCommentCheck.data.commentBefore);
            const pairComment = pairCommentValue.success ? pairCommentValue.data : "";
            comment = comment ? `${pairComment}\n${comment}` : pairComment;
          }

          // Use map comment only if this is the first item and it has no own comment
          if (!comment && mapComment) {
            comment = mapComment;
          }

          // Clean and store the comment
          if (comment) {
            const cleaned = cleanYAMLComment(comment);
            if (cleaned) {
              comments.set(fullKey, cleaned);
            }
          }

          // Recurse into nested structures, passing the value's comment
          const valueCheck = z.object({ commentBefore: z.unknown() }).safeParse(itemCheck.data.value);
          if (valueCheck.success) {
            const valueCommentCheck = z.string().safeParse(valueCheck.data.commentBefore);
            const valueComment = valueCommentCheck.success ? valueCommentCheck.data : "";
            visitNode(itemCheck.data.value, newPath, valueComment);
          } else if (itemCheck.data.value) {
            visitNode(itemCheck.data.value, newPath, "");
          }
        }
      }
    }

    visitNode(doc, []);
  } catch (error) {
    // If YAML parsing fails, fall back to empty map
    console.warn("Failed to parse YAML comments:", error);
  }

  return comments;
}

/**
 * Fetch a Helm chart and extract its values.yaml and optional schema
 */
export async function fetchHelmChart(
  chart: ChartInfo,
): Promise<{ values: HelmValue; schema: JSONSchemaProperty | null; yamlComments: Map<string, string> }> {
  const tempDir = join(process.cwd(), "temp", `helm-${chart.name}`);
  const repoName = `temp-repo-${chart.name}-${String(Date.now())}`;

  try {
    // Ensure temp directory exists
    await Bun.$`mkdir -p ${tempDir}`.quiet();

    console.log(`  📦 Adding Helm repo: ${chart.repoUrl}`);
    // Add the helm repo
    await runCommand("helm", ["repo", "add", repoName, chart.repoUrl]);

    console.log(`  🔄 Updating Helm repos...`);
    // Update repo
    await runCommand("helm", ["repo", "update"]);

    console.log(`  ⬇️  Pulling chart ${chart.chartName}:${chart.version}...`);
    // Pull the chart
    await runCommand("helm", [
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

      // Parse YAML comments
      const yamlComments = parseYAMLComments(valuesContent);
      console.log(`  💬 Extracted ${String(yamlComments.size)} comments from values.yaml`);

      // Parse YAML using yaml package
      const parsedValues = yamlParse(valuesContent) as unknown;
      console.log(`  ✅ Successfully parsed values.yaml`);
      const recordParseResult = RecordSchema.safeParse(parsedValues);
      if (recordParseResult.success) {
        console.log(
          `  🔍 Parsed values keys: ${Object.keys(recordParseResult.data)
            .slice(0, 10)
            .join(", ")}${Object.keys(recordParseResult.data).length > 10 ? "..." : ""}`,
        );
      }

      // Check if parsedValues is a valid object using Zod before validation
      if (!recordParseResult.success) {
        console.warn(`  ⚠️  Parsed values is not a valid record object: ${String(parsedValues)}`);
        return { values: {}, schema: null, yamlComments: new Map() };
      }

      // Validate and parse with Zod for runtime type safety
      const parseResult = HelmValueSchema.safeParse(recordParseResult.data);

      // Try to load JSON schema
      const chartPath = join(tempDir, chart.chartName);
      const schema = await loadJSONSchema(chartPath);

      if (parseResult.success) {
        console.log(`  ✅ Zod validation successful`);
        return { values: parseResult.data, schema, yamlComments };
      } else {
        console.warn(`  ⚠️  Zod validation failed for ${chart.name}:`);
        console.warn(`    First few errors:`, parseResult.error.issues.slice(0, 3));
        console.warn(`  ⚠️  Falling back to unvalidated object for type generation`);
        // Return the validated record data from the successful parse result
        return { values: recordParseResult.data, schema, yamlComments };
      }
    } catch (error) {
      console.warn(`  ⚠️  Failed to read/parse values.yaml: ${String(error)}`);
      return { values: {}, schema: null, yamlComments: new Map() };
    }
  } finally {
    // Cleanup
    try {
      console.log(`  🧹 Cleaning up...`);
      await runCommand("helm", ["repo", "remove", repoName]);
      await Bun.$`rm -rf ${tempDir}`.quiet();
    } catch (cleanupError) {
      console.warn(`Cleanup failed for ${chart.name}:`, String(cleanupError));
    }
  }
}

/**
 * Convert JSON schema type to TypeScript type string
 */
function jsonSchemaToTypeScript(schema: JSONSchemaProperty): string {
  // Handle oneOf - union of types
  if (schema.oneOf) {
    const types = schema.oneOf.map((s) => jsonSchemaToTypeScript(s));
    return types.join(" | ");
  }

  // Handle anyOf - union of types
  if (schema.anyOf) {
    const types = schema.anyOf.map((s) => jsonSchemaToTypeScript(s));
    return types.join(" | ");
  }

  // Handle enum
  if (schema.enum) {
    return schema.enum.map((v) => (StringSchema.safeParse(v).success ? `"${String(v)}"` : String(v))).join(" | ");
  }

  // Handle array type
  if (schema.type === "array" && schema.items) {
    const itemType = jsonSchemaToTypeScript(schema.items);
    return `${itemType}[]`;
  }

  // Handle basic types
  if (StringSchema.safeParse(schema.type).success) {
    switch (schema.type) {
      case "string":
        return "string";
      case "number":
      case "integer":
        return "number";
      case "boolean":
        return "boolean";
      case "object":
        return "object";
      case "array":
        return "unknown[]";
      case "null":
        return "null";
      default:
        return "unknown";
    }
  }

  // Handle multiple types
  const arrayTypeCheck = ArraySchema.safeParse(schema.type);
  if (arrayTypeCheck.success) {
    return arrayTypeCheck.data
      .map((t: unknown) => {
        if (!StringSchema.safeParse(t).success) return "unknown";
        const typeStr = String(t);
        switch (typeStr) {
          case "string":
            return "string";
          case "number":
          case "integer":
            return "number";
          case "boolean":
            return "boolean";
          case "object":
            return "object";
          case "array":
            return "unknown[]";
          case "null":
            return "null";
          default:
            return "unknown";
        }
      })
      .join(" | ");
  }

  return "unknown";
}

/**
 * Infer TypeScript type from actual runtime value
 */
function inferTypeFromValue(value: unknown): string | null {
  // Check null/undefined
  if (NullSchema.safeParse(value).success || UndefinedSchema.safeParse(value).success) {
    return null;
  }

  // Check for actual boolean
  if (ActualBooleanSchema.safeParse(value).success) {
    return "boolean";
  }

  // Check for actual number
  if (ActualNumberSchema.safeParse(value).success) {
    return "number";
  }

  // Check if it's a string that looks like a boolean
  if (StringBooleanSchema.safeParse(value).success) {
    return "boolean";
  }

  // Check if it's a string that looks like a number
  const stringCheck = StringSchema.safeParse(value);
  if (stringCheck.success) {
    const trimmed = stringCheck.data.trim();
    if (trimmed !== "" && !isNaN(Number(trimmed)) && isFinite(Number(trimmed))) {
      return "number";
    }
  }

  // Check for array
  if (ArraySchema.safeParse(value).success) {
    return "array";
  }

  // Check for object
  if (HelmValueSchema.safeParse(value).success) {
    return "object";
  }

  // Plain string
  if (StringSchema.safeParse(value).success) {
    return "string";
  }

  return "unknown";
}

/**
 * Check if inferred type is compatible with schema type
 */
function typesAreCompatible(inferredType: string, schemaType: string): boolean {
  // Exact match
  if (inferredType === schemaType) {
    return true;
  }

  // Check if the inferred type is part of a union in the schema
  // For example: schemaType might be "number | \"default\"" and inferredType is "string"
  const schemaTypes = schemaType.split("|").map((t) => t.trim().replace(/^["']|["']$/g, ""));

  // If schema is a union, check if inferred type is compatible with any part
  if (schemaTypes.length > 1) {
    for (const st of schemaTypes) {
      // Handle quoted strings in unions (like "default")
      if (st.startsWith('"') && st.endsWith('"') && inferredType === "string") {
        return true;
      }
      if (st === inferredType) {
        return true;
      }
      // Arrays
      if (st.endsWith("[]") && inferredType === "array") {
        return true;
      }
    }
  }

  // Handle array types
  if (schemaType.endsWith("[]") && inferredType === "array") {
    return true;
  }

  // Handle specific string literals - if schema expects specific strings and value is a string
  if (schemaType.includes('"') && inferredType === "string") {
    return true;
  }

  // unknown is compatible with everything (schema might be less specific)
  if (schemaType === "unknown" || inferredType === "unknown") {
    return true;
  }

  return false;
}

/**
 * Convert Helm values to TypeScript interface
 */
export function convertToTypeScriptInterface(
  values: HelmValue,
  interfaceName: string,
  schema?: JSONSchemaProperty | null,
  yamlComments?: Map<string, string>,
  keyPrefix = "",
  chartName?: string,
): TypeScriptInterface {
  const properties: Record<string, TypeProperty> = {};
  const schemaProps = schema?.properties;

  for (const [key, value] of Object.entries(values)) {
    const sanitizedKey = sanitizePropertyName(key);
    const typeNameSuffix = sanitizeTypeName(key);
    const propertySchema = schemaProps?.[key];
    const fullKey = keyPrefix ? `${keyPrefix}.${key}` : key;
    const yamlComment = yamlComments?.get(fullKey);

    properties[sanitizedKey] = convertValueToProperty(
      value,
      `${interfaceName}${capitalizeFirst(typeNameSuffix)}`,
      propertySchema,
      key, // Pass the property name for better warnings
      yamlComment,
      yamlComments,
      fullKey,
      chartName,
    );
  }

  // Check if this interface should allow arbitrary properties
  const allowArbitraryProps = chartName
    ? shouldAllowArbitraryProps(keyPrefix, chartName, keyPrefix.split(".").pop() ?? "", yamlComments?.get(keyPrefix))
    : false;

  return {
    name: interfaceName,
    properties,
    allowArbitraryProps,
  };
}

function convertValueToProperty(
  value: unknown,
  nestedTypeName: string,
  schema?: JSONSchemaProperty,
  propertyName?: string,
  yamlComment?: string,
  yamlComments?: Map<string, string>,
  fullKey?: string,
  chartName?: string,
): TypeProperty {
  // If we have a JSON schema for this property, prefer it over inference
  if (schema) {
    // First, infer the type from the actual value for comparison
    const inferredType = inferTypeFromValue(value);
    const schemaType = jsonSchemaToTypeScript(schema);

    // Check if schema and inferred types are in agreement
    if (inferredType && !typesAreCompatible(inferredType, schemaType)) {
      const propName = propertyName ? `'${propertyName}': ` : "";
      console.warn(
        `  ⚠️  Type mismatch for ${propName}Schema says '${schemaType}' but value suggests '${inferredType}' (value: ${String(value).substring(0, 50)})`,
      );
    }

    // Merge description from schema and YAML comments
    let description = schema.description;
    if (yamlComment) {
      if (description) {
        // If both exist, combine them
        description = `${yamlComment}\n\n${description}`;
      } else {
        description = yamlComment;
      }
    }
    const defaultValue = schema.default !== undefined ? schema.default : value;

    // If schema defines it as an object with properties, recurse
    const helmValueCheckForProps = HelmValueSchema.safeParse(value);
    if (schema.properties && helmValueCheckForProps.success) {
      const nestedInterface = convertToTypeScriptInterface(
        helmValueCheckForProps.data,
        nestedTypeName,
        schema,
        yamlComments,
        fullKey,
        chartName,
      );
      return {
        type: nestedTypeName,
        optional: true,
        nested: nestedInterface,
        description,
        default: defaultValue,
      };
    }

    // Otherwise, use the schema type directly
    const tsType = schemaType;

    // Handle object types without explicit properties
    const helmValueCheckForObject = HelmValueSchema.safeParse(value);
    if (tsType === "object" && helmValueCheckForObject.success) {
      const nestedInterface = convertToTypeScriptInterface(
        helmValueCheckForObject.data,
        nestedTypeName,
        undefined,
        yamlComments,
        fullKey,
        chartName,
      );
      return {
        type: nestedTypeName,
        optional: true,
        nested: nestedInterface,
        description,
        default: defaultValue,
      };
    }

    return { type: tsType, optional: true, description, default: defaultValue };
  }

  // Fall back to runtime type inference when no schema is available
  // Use Zod schemas for robust type detection
  // IMPORTANT: Check for complex types (arrays, objects) BEFORE primitive types with coercion

  // Check for null/undefined first
  if (NullSchema.safeParse(value).success || UndefinedSchema.safeParse(value).success) {
    return { type: "unknown", optional: true };
  }

  // Check for array (before coercion checks, as coercion can convert arrays to true)
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

          // Check if array elements should allow arbitrary properties
          // Array elements inherit extensibility from their parent array
          const allowArbitraryProps =
            chartName && fullKey
              ? shouldAllowArbitraryProps(fullKey, chartName, propertyName ?? "", yamlComment)
              : false;

          const arrayElementInterface: TypeScriptInterface = {
            name: arrayElementTypeName,
            properties: elementProp.nested.properties,
            allowArbitraryProps,
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
    if (types.length <= 3 && types.every((t) => ["string", "number", "boolean"].includes(t))) {
      return {
        type: `(${types.join(" | ")})[]`,
        optional: true,
      };
    }

    // Otherwise fall back to unknown[]
    return { type: "unknown[]", optional: true };
  }

  // Check for object (before primitive coercion checks)
  const objectResult = HelmValueSchema.safeParse(value);
  if (objectResult.success) {
    const nestedInterface = convertToTypeScriptInterface(
      objectResult.data,
      nestedTypeName,
      undefined,
      yamlComments,
      fullKey,
      chartName,
    );
    return {
      type: nestedTypeName,
      optional: true,
      nested: nestedInterface,
      description: yamlComment,
      default: value,
    };
  }

  // Now check for primitives - first actual runtime types, then coerced string types
  // This prevents objects from being coerced to booleans

  // Check for actual runtime boolean (true/false)
  if (ActualBooleanSchema.safeParse(value).success) {
    return { type: "boolean", optional: true, description: yamlComment, default: value };
  }

  // Check for actual runtime number
  if (ActualNumberSchema.safeParse(value).success) {
    return { type: "number", optional: true, description: yamlComment, default: value };
  }

  // Check if it's a string that represents a boolean ("true", "FALSE", etc.)
  if (StringBooleanSchema.safeParse(value).success) {
    return { type: "boolean", optional: true, description: yamlComment, default: value };
  }

  // Check if it's a string that represents a number ("15", "0", etc.)
  // Only treat non-empty strings that parse as numbers as numbers
  const stringCheckForNumber = StringSchema.safeParse(value);
  if (stringCheckForNumber.success) {
    const trimmed = stringCheckForNumber.data.trim();
    // Don't treat empty strings or purely whitespace as numbers
    if (trimmed !== "" && !isNaN(Number(trimmed)) && isFinite(Number(trimmed))) {
      return { type: "number", optional: true, description: yamlComment, default: value };
    }
  }

  // Check for plain string (strings that don't look like numbers or booleans)
  const stringCheckForPlain = StringSchema.safeParse(value);
  if (stringCheckForPlain.success) {
    // Special case: "default" is often used as a sentinel value in Helm charts
    // that can be overridden with actual typed values (numbers, booleans, etc.)
    if (stringCheckForPlain.data === "default") {
      return { type: "string | number | boolean", optional: true, description: yamlComment, default: value };
    }
    return { type: "string", optional: true, description: yamlComment, default: value };
  }

  // Fallback for any unrecognized type
  console.warn(`Unrecognized value type for: ${String(value)}, using 'unknown'`);
  return { type: "unknown", optional: true, description: yamlComment };
}

/**
 * Generate TypeScript code from interface definition
 */
export function generateTypeScriptCode(mainInterface: TypeScriptInterface, chartName: string): string {
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

function collectNestedInterfaces(iface: TypeScriptInterface, collected: TypeScriptInterface[]): void {
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

  if (!hasProperties && !iface.allowArbitraryProps) {
    // Use 'object' for empty interfaces instead of '{}'
    return `export type ${iface.name} = object;\n`;
  }

  let code = `export type ${iface.name} = {\n`;

  // Add index signature if this type allows arbitrary properties
  if (iface.allowArbitraryProps) {
    code += `  /**\n`;
    code += `   * This type allows arbitrary additional properties beyond those defined below.\n`;
    code += `   * This is common for config maps, custom settings, and extensible configurations.\n`;
    code += `   */\n`;
    code += `  [key: string]: unknown;\n`;
  }

  for (const [key, prop] of Object.entries(iface.properties)) {
    const optional = prop.optional ? "?" : "";

    // Generate JSDoc comment if we have description or default
    if (prop.description || prop.default !== undefined) {
      code += `  /**\n`;

      if (prop.description) {
        // Format multi-line descriptions properly with " * " prefix
        // Escape */ sequences to prevent premature comment closure
        const escapedDescription = prop.description.replace(/\*\//g, "*\\/");
        const descLines = escapedDescription.split("\n");
        for (const line of descLines) {
          code += `   * ${line}\n`;
        }
      }

      if (prop.default !== undefined) {
        const defaultStr = formatDefaultValue(prop.default);
        if (defaultStr) {
          if (prop.description) code += `   *\n`;
          code += `   * @default ${defaultStr}\n`;
        }
      }

      code += `   */\n`;
    }

    code += `  ${key}${optional}: ${prop.type};\n`;
  }

  code += "};\n";
  return code;
}

/**
 * Format a default value for display in JSDoc
 */
function formatDefaultValue(value: unknown): string | null {
  if (value === null) return "null";
  if (value === undefined) return null;

  // Handle arrays
  const arrayCheck = ArraySchema.safeParse(value);
  if (arrayCheck.success) {
    if (arrayCheck.data.length === 0) return "[]";
    if (arrayCheck.data.length <= 3) {
      try {
        return JSON.stringify(arrayCheck.data);
      } catch {
        return "[...]";
      }
    }
    return `[...] (${String(arrayCheck.data.length)} items)`;
  }

  // Handle objects
  const recordCheck = RecordSchema.safeParse(value);
  if (recordCheck.success) {
    const keys = Object.keys(recordCheck.data);
    if (keys.length === 0) return "{}";
    if (keys.length <= 3) {
      try {
        return JSON.stringify(recordCheck.data);
      } catch {
        return "{...}";
      }
    }
    return `{...} (${String(keys.length)} keys)`;
  }

  // Primitives
  const stringCheck = StringSchema.safeParse(value);
  if (stringCheck.success) {
    // Truncate long strings
    if (stringCheck.data.length > 50) {
      return `"${stringCheck.data.substring(0, 47)}..."`;
    }
    return `"${stringCheck.data}"`;
  }

  // Handle other primitives (numbers, booleans, etc.)
  const numberCheck = ActualNumberSchema.safeParse(value);
  if (numberCheck.success) {
    return String(numberCheck.data);
  }

  const booleanCheck = ActualBooleanSchema.safeParse(value);
  if (booleanCheck.success) {
    return String(booleanCheck.data);
  }

  // Fallback for unknown types - try JSON.stringify
  try {
    return JSON.stringify(value);
  } catch {
    return "unknown";
  }
}

function generateParameterType(iface: TypeScriptInterface, chartName: string): string {
  const parameterKeys = flattenInterfaceKeys(iface);

  const normalizedChartName = capitalizeFirst(chartName).replace(/-/g, "");
  let code = `export type ${normalizedChartName}HelmParameters = {\n`;

  for (const key of parameterKeys) {
    code += `  "${key}"?: string;\n`;
  }

  code += "};\n";

  return code;
}

function flattenInterfaceKeys(iface: TypeScriptInterface, prefix = ""): string[] {
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
    // Use full path for helm command
    const commandPath = command === "helm" ? "/home/linuxbrew/.linuxbrew/bin/helm" : command;

    const proc = Bun.spawn([commandPath, ...args], {
      stdout: "pipe",
      stderr: "inherit",
    });

    const output = await new Response(proc.stdout).text();
    const exitCode = await proc.exited;

    if (exitCode === 0) {
      return output;
    } else {
      throw new Error(`Command "${command} ${args.join(" ")}" failed with code ${exitCode.toString()}`);
    }
  } catch (error) {
    const parseResult = ErrorSchema.safeParse(error);
    const errorMessage = parseResult.success ? parseResult.data.message : String(error);
    throw new Error(`Failed to spawn command "${command} ${args.join(" ")}": ${errorMessage}`);
  }
}
