#!/usr/bin/env bun

import { rm, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  parseChartInfoFromVersions,
  fetchHelmChart,
  convertToTypeScriptInterface,
  generateTypeScriptCode,
  type ChartInfo,
} from "./src/utils/helm-types.ts";

const OUTPUT_DIR = "src/types/helm";

async function main() {
  console.log("🚀 Starting Helm chart TypeScript type generation...");

  try {
    // Clean up existing types directory
    await rm(OUTPUT_DIR, { recursive: true, force: true });
    await mkdir(OUTPUT_DIR, { recursive: true });

    // Parse chart information from versions.ts
    console.log("📋 Parsing chart information from versions.ts...");
    const charts = await parseChartInfoFromVersions("src/versions.ts");

    if (charts.length === 0) {
      console.log("⚠️  No Helm charts found in versions.ts");
      return;
    }

    console.log(`✅ Found ${charts.length.toString()} Helm charts:`);
    charts.forEach((chart) => {
      console.log(
        `   - ${chart.name} (${chart.version}) from ${chart.repoUrl}`,
      );
    });

    // Generate types for each chart
    const generatedFiles: string[] = [];

    for (const chart of charts) {
      try {
        console.log(`\n🔍 Processing ${chart.name}...`);

        await generateChartTypes(chart);
        generatedFiles.push(`${chart.name}.types.ts`);
        console.log(`✅ Generated types for ${chart.name}`);
      } catch (error) {
        console.error(`❌ Failed to process ${chart.name}:`, error);
        console.error(`   Skipping ${chart.name} and continuing...`);
      }
    }

    // Generate index file
    if (generatedFiles.length > 0) {
      await generateIndexFile(generatedFiles);
      console.log(
        `\n✅ Generated index.ts with ${generatedFiles.length.toString()} exports`,
      );
    }

    // Run prettier on generated files
    if (generatedFiles.length > 0) {
      console.log("\n🎨 Running prettier on generated files...");
      try {
        const { spawn } = await import("node:child_process");
        await new Promise<void>((resolve) => {
          const proc = spawn(
            "/root/.local/share/mise/shims/bun",
            ["x", "prettier", "--write", OUTPUT_DIR],
            {
              stdio: "inherit",
            },
          );
          proc.on("close", (code) => {
            if (code === 0) resolve();
            else {
              console.warn(
                `Prettier failed with code ${code?.toString() ?? "unknown"}, continuing...`,
              );
              resolve(); // Don't fail the whole process
            }
          });
          proc.on("error", (error) => {
            console.warn(`Prettier error: ${error.message}, continuing...`);
            resolve(); // Don't fail the whole process
          });
        });
      } catch (error) {
        console.warn(`Failed to run prettier: ${String(error)}, continuing...`);
      }
    }

    console.log("🎉 Helm chart type generation completed successfully!");
  } catch (error) {
    console.error("💥 Type generation failed:", error);
    process.exit(1);
  }
}

/**
 * Generate types for any Helm chart
 */
async function generateChartTypes(chart: ChartInfo) {
  console.log(`  📊 Fetching Helm values for ${chart.name}...`);

  // Fetch the actual Helm chart values
  const helmValues = await fetchHelmChart(chart);

  if (Object.keys(helmValues).length === 0) {
    console.warn(
      `  ⚠️  No values found for ${chart.name}, generating empty interface`,
    );

    // Generate minimal interface for charts with no values
    const code = `// Generated TypeScript types for ${chart.name} Helm chart\n\nexport interface ${capitalizeFirst(chart.name).replace(/-/g, "")}HelmValues {\n  [key: string]: any;\n}\n\nexport interface ${capitalizeFirst(chart.name).replace(/-/g, "")}HelmParameters {\n  [key: string]: string;\n}\n`;

    const filePath = join(OUTPUT_DIR, `${chart.name}.types.ts`);
    await writeFile(filePath, code);
    return;
  }

  console.log(`  🏗️  Converting to TypeScript interfaces...`);
  const interfaceName = `${capitalizeFirst(chart.name).replace(/-/g, "")}HelmValues`;
  const tsInterface = convertToTypeScriptInterface(helmValues, interfaceName);
  const code = generateTypeScriptCode(tsInterface, chart.name);

  const filePath = join(OUTPUT_DIR, `${chart.name}.types.ts`);
  await writeFile(filePath, code);
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate index.ts file that re-exports all chart types
 */
async function generateIndexFile(generatedFiles: string[]) {
  let content = "// Auto-generated index file for Helm chart types\n\n";

  for (const file of generatedFiles) {
    const moduleName = file.replace(".types.ts", "");
    content += `export * from "./${moduleName}.types.ts";\n`;
  }

  const indexPath = join(OUTPUT_DIR, "index.ts");
  await writeFile(indexPath, content);
}

// Run if this script is executed directly
if (import.meta.main) {
  void main();
}
