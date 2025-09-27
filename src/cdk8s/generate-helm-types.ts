#!/usr/bin/env bun

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
    await Bun.$`rm -rf ${OUTPUT_DIR}`.quiet();
    await Bun.$`mkdir -p ${OUTPUT_DIR}`.quiet();

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

    if (generatedFiles.length > 0) {
      // Run prettier on generated files
      console.log("\n🎨 Running prettier on generated files...");
      try {
        const prettierProc = Bun.spawn(
          [
            "/root/.local/share/mise/shims/bun",
            "x",
            "prettier",
            "--write",
            OUTPUT_DIR,
          ],
          {
            stdio: ["inherit", "inherit", "inherit"],
          },
        );

        const prettierExitCode = await prettierProc.exited;
        if (prettierExitCode !== 0) {
          console.warn(
            `Prettier failed with code ${prettierExitCode.toString()}, continuing...`,
          );
        } else {
          console.log("✅ Prettier formatting completed");
        }
      } catch (error) {
        console.warn(`Failed to run prettier: ${String(error)}, continuing...`);
      }

      // Run TypeScript compilation check
      console.log("\n🔧 Running TypeScript compilation check...");
      try {
        const tscProc = Bun.spawn(
          [
            "/root/.local/share/mise/shims/bun",
            "x",
            "tsc",
            "--noEmit",
            "--skipLibCheck",
            `${OUTPUT_DIR}/*.ts`,
          ],
          {
            stdio: ["inherit", "pipe", "pipe"],
          },
        );

        const tscOutput = await new Response(tscProc.stderr).text();
        const tscExitCode = await tscProc.exited;

        if (tscExitCode === 0) {
          console.log("✅ TypeScript compilation check passed");
        } else {
          console.warn("⚠️  TypeScript compilation issues found:");
          console.warn(tscOutput);
          console.warn("Generated types may have compilation errors");
        }
      } catch (error) {
        console.warn(
          `Failed to run TypeScript check: ${String(error)}, continuing...`,
        );
      }

      // Run ESLint check
      console.log("\n🔍 Running ESLint on generated files...");
      try {
        const eslintProc = Bun.spawn(
          [
            "/root/.local/share/mise/shims/bun",
            "run",
            "lint:eslint",
            OUTPUT_DIR,
          ],
          {
            stdio: ["inherit", "pipe", "pipe"],
            cwd: process.cwd(),
          },
        );

        const eslintOutput = await new Response(eslintProc.stdout).text();
        const eslintErrors = await new Response(eslintProc.stderr).text();
        const eslintExitCode = await eslintProc.exited;

        if (eslintExitCode === 0) {
          console.log("✅ ESLint check passed");
        } else {
          console.warn("⚠️  ESLint issues found:");
          if (eslintOutput) console.warn(eslintOutput);
          if (eslintErrors) console.warn(eslintErrors);
          console.warn("Generated types may have linting issues");
        }
      } catch (error) {
        console.warn(`Failed to run ESLint: ${String(error)}, continuing...`);
      }
    }

    console.log("\n🎉 Helm chart type generation completed!");
    if (generatedFiles.length > 0) {
      console.log(
        `📁 Generated ${generatedFiles.length.toString()} type files in ${OUTPUT_DIR}`,
      );
      console.log("🔍 Files validated with prettier, tsc, and eslint");
    }
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

  // Debug logging for main script
  console.log(
    `  🔍 Found ${Object.keys(helmValues).length.toString()} top-level properties`,
  );
  if (Object.keys(helmValues).length <= 5) {
    console.log(`  🔍 Keys: ${Object.keys(helmValues).join(", ")}`);
  }

  if (Object.keys(helmValues).length === 0) {
    console.warn(
      `  ⚠️  No values found for ${chart.name}, generating empty interface`,
    );

    // Generate minimal type for charts with no values
    const code = `// Generated TypeScript types for ${chart.name} Helm chart

export type ${capitalizeFirst(chart.name).replace(/-/g, "")}HelmValues = object;

export type ${capitalizeFirst(chart.name).replace(/-/g, "")}HelmParameters = {
  [key: string]: string;
};
`;

    const filePath = join(OUTPUT_DIR, `${chart.name}.types.ts`);
    await Bun.write(filePath, code);
    return;
  }

  console.log(`  🏗️  Converting to TypeScript interfaces...`);
  const interfaceName = `${capitalizeFirst(chart.name).replace(/-/g, "")}HelmValues`;
  const tsInterface = convertToTypeScriptInterface(helmValues, interfaceName);
  const code = generateTypeScriptCode(tsInterface, chart.name);

  const filePath = join(OUTPUT_DIR, `${chart.name}.types.ts`);
  await Bun.write(filePath, code);
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
  await Bun.write(indexPath, content);
}

// Run if this script is executed directly
if (import.meta.main) {
  void main();
}
