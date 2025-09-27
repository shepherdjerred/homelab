import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { join } from "node:path";
import { load as yamlLoad } from "js-yaml";

export interface ChartInfo {
  name: string;
  repoUrl: string;
  version: string;
  chartName: string; // The actual chart name (may differ from versions.ts key)
}

export interface HelmValue {
  [key: string]: any;
}

export interface TypeScriptInterface {
  name: string;
  properties: Record<string, TypeProperty>;
}

export interface TypeProperty {
  type: string;
  optional: boolean;
  description?: string;
  nested?: TypeScriptInterface;
}

/**
 * Parse chart information from versions.ts comments and values
 */
export async function parseChartInfoFromVersions(
  versionsPath: string = "src/versions.ts",
): Promise<ChartInfo[]> {
  const content = await readFile(versionsPath, "utf-8");
  const lines = content.split("\n");
  const charts: ChartInfo[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];

    // Look for renovate comments that indicate Helm charts
    if (line?.includes("renovate: datasource=helm") && nextLine) {
      const repoUrlMatch = line.match(/registryUrl=([^\s]+)/);
      const versionKeyMatch = nextLine.match(/^\s*"?([^":]+)"?:/);

      if (repoUrlMatch && versionKeyMatch) {
        const repoUrl = repoUrlMatch[1];
        const versionKey = versionKeyMatch[1];

        if (!repoUrl || !versionKey) continue;

        // Extract version value
        const versionMatch = nextLine.match(/:\s*"([^"]+)"/);
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
    await mkdir(tempDir, { recursive: true });

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
      const valuesContent = await readFile(valuesPath, "utf-8");

      // Parse YAML using js-yaml
      const values = yamlLoad(valuesContent) as HelmValue;
      console.log(`  ✅ Successfully parsed values.yaml`);

      return values || {};
    } catch (error) {
      console.warn(`  ⚠️  Failed to read/parse values.yaml: ${String(error)}`);
      return {};
    }
  } finally {
    // Cleanup
    try {
      console.log(`  🧹 Cleaning up...`);
      await runCommand("helm", ["repo", "remove", repoName]);
      await rm(tempDir, { recursive: true, force: true });
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
    properties[key] = convertValueToProperty(
      value,
      `${interfaceName}${capitalizeFirst(key)}`,
    );
  }

  return {
    name: interfaceName,
    properties,
  };
}

function convertValueToProperty(
  value: any,
  nestedTypeName: string,
): TypeProperty {
  if (value === null || value === undefined) {
    return { type: "any", optional: true };
  }

  if (typeof value === "boolean") {
    return { type: "boolean", optional: true };
  }

  if (typeof value === "number") {
    return { type: "number", optional: true };
  }

  if (typeof value === "string") {
    return { type: "string", optional: true };
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return { type: "any[]", optional: true };
    }

    const firstElementType = convertValueToProperty(value[0], nestedTypeName);
    return {
      type: `${firstElementType.type}[]`,
      optional: true,
    };
  }

  if (typeof value === "object") {
    const nestedInterface = convertToTypeScriptInterface(value, nestedTypeName);
    return {
      type: nestedTypeName,
      optional: true,
      nested: nestedInterface,
    };
  }

  return { type: "any", optional: true };
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
  let code = `export interface ${iface.name} {\n`;

  for (const [key, prop] of Object.entries(iface.properties)) {
    const optional = prop.optional ? "?" : "";
    const description = prop.description
      ? `  /** ${prop.description} */\n`
      : "";
    code += `${description}  ${key}${optional}: ${prop.type};\n`;
  }

  code += "}\n";
  return code;
}

function generateParameterType(
  iface: TypeScriptInterface,
  chartName: string,
): string {
  const parameterKeys = flattenInterfaceKeys(iface);

  const normalizedChartName = capitalizeFirst(chartName).replace(/-/g, "");
  let code = `export interface ${normalizedChartName}HelmParameters {\n`;

  for (const key of parameterKeys) {
    code += `  "${key}"?: string;\n`;
  }

  code += "}\n";

  return code;
}

function flattenInterfaceKeys(
  iface: TypeScriptInterface,
  prefix = "",
): string[] {
  const keys: string[] = [];

  for (const [key, prop] of Object.entries(iface.properties)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

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
 * Run a command and return its output
 */
async function runCommand(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: ["inherit", "pipe", "inherit"],
    });

    let output = "";
    proc.stdout?.on("data", (data: Buffer) => (output += data.toString()));

    proc.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(
          new Error(
            `Command "${command} ${args.join(" ")}" failed with code ${code?.toString() ?? "unknown"}`,
          ),
        );
      }
    });

    proc.on("error", (error) => {
      reject(
        new Error(
          `Failed to spawn command "${command} ${args.join(" ")}": ${error.message}`,
        ),
      );
    });
  });
}
