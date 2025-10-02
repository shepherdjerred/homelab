#!/usr/bin/env bun

import { join } from "node:path";
import {
  parseChartInfoFromVersions,
  fetchHelmChart,
  convertToTypeScriptInterface,
  generateTypeScriptCode,
  type ChartInfo,
} from "./helm-types.ts";

export interface HelmTypesOptions {
  versionsFile?: string;
  outputDir?: string;
  runPrettier?: boolean;
  runTypeCheck?: boolean;
  runLinter?: boolean;
}

const DEFAULT_OUTPUT_DIR = "src/types/helm";

async function main() {
  const options: HelmTypesOptions = parseCliArgs();

  console.log("🚀 Starting Helm chart TypeScript type generation...");

  try {
    await generateHelmTypes(options);
  } catch (error) {
    console.error("💥 Type generation failed:", error);
    process.exit(1);
  }
}

export async function generateHelmTypes(options: HelmTypesOptions = {}) {
  const {
    versionsFile = "src/versions.ts",
    outputDir = DEFAULT_OUTPUT_DIR,
    runPrettier = true,
    runTypeCheck = true,
    runLinter = true,
  } = options;

  // Clean up existing types directory
  await Bun.$`rm -rf ${outputDir}`.quiet();
  await Bun.$`mkdir -p ${outputDir}`.quiet();

  // Parse chart information from versions.ts
  console.log(`📋 Parsing chart information from ${versionsFile}...`);
  const charts = await parseChartInfoFromVersions(versionsFile);

  if (charts.length === 0) {
    console.log("⚠️  No Helm charts found in versions file");
    return;
  }

  console.log(`✅ Found ${charts.length.toString()} Helm charts:`);
  charts.forEach((chart) => {
    console.log(`   - ${chart.name} (${chart.version}) from ${chart.repoUrl}`);
  });

  // Generate types for each chart
  const generatedFiles: string[] = [];

  for (const chart of charts) {
    try {
      console.log(`\n🔍 Processing ${chart.name}...`);

      await generateChartTypes(chart, outputDir);
      generatedFiles.push(`${chart.name}.types.ts`);
      console.log(`✅ Generated types for ${chart.name}`);
    } catch (error) {
      console.error(`❌ Failed to process ${chart.name}:`, error);
      console.error(`   Skipping ${chart.name} and continuing...`);
    }
  }

  // Generate index file
  if (generatedFiles.length > 0) {
    await generateIndexFile(generatedFiles, outputDir);
    console.log(
      `\n✅ Generated index.ts with ${generatedFiles.length.toString()} exports`,
    );
  }

  if (generatedFiles.length > 0) {
    // Run prettier on generated files
    if (runPrettier) {
      console.log("\n🎨 Running prettier on generated files...");
      try {
        const prettierProc = Bun.spawn(
          ["bun", "x", "prettier", "--write", outputDir],
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
    }

    // Run TypeScript compilation check
    if (runTypeCheck) {
      console.log("\n🔧 Running TypeScript compilation check...");
      try {
        const tscProc = Bun.spawn(
          [
            "bun",
            "x",
            "tsc",
            "--noEmit",
            "--skipLibCheck",
            `${outputDir}/*.ts`,
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
    }

    // Run ESLint check
    if (runLinter) {
      console.log("\n🔍 Running ESLint on generated files...");
      try {
        const eslintProc = Bun.spawn(["bun", "run", "lint:eslint", outputDir], {
          stdio: ["inherit", "pipe", "pipe"],
          cwd: process.cwd(),
        });

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
  }

  console.log("\n🎉 Helm chart type generation completed!");
  if (generatedFiles.length > 0) {
    console.log(
      `📁 Generated ${generatedFiles.length.toString()} type files in ${outputDir}`,
    );
    const checks = [
      runPrettier && "prettier",
      runTypeCheck && "tsc",
      runLinter && "eslint",
    ]
      .filter(Boolean)
      .join(", ");
    if (checks) {
      console.log(`🔍 Files validated with ${checks}`);
    }
  }
}

/**
 * Generate types for any Helm chart
 */
async function generateChartTypes(chart: ChartInfo, outputDir: string) {
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

    const filePath = join(outputDir, `${chart.name}.types.ts`);
    await Bun.write(filePath, code);
    return;
  }

  console.log(`  🏗️  Converting to TypeScript interfaces...`);
  const interfaceName = `${capitalizeFirst(chart.name).replace(/-/g, "")}HelmValues`;
  const tsInterface = convertToTypeScriptInterface(helmValues, interfaceName);
  const code = generateTypeScriptCode(tsInterface, chart.name);

  const filePath = join(outputDir, `${chart.name}.types.ts`);
  await Bun.write(filePath, code);
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate index.ts file that re-exports all chart types
 */
async function generateIndexFile(generatedFiles: string[], outputDir: string) {
  let content = "// Auto-generated index file for Helm chart types\n\n";

  for (const file of generatedFiles) {
    const moduleName = file.replace(".types.ts", "");
    content += `export * from "./${moduleName}.types.ts";\n`;
  }

  const indexPath = join(outputDir, "index.ts");
  await Bun.write(indexPath, content);
}

function parseCliArgs(): HelmTypesOptions {
  const args = process.argv.slice(2);
  const options: HelmTypesOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case "--versions-file":
      case "-v":
        if (nextArg && !nextArg.startsWith("-")) {
          options.versionsFile = nextArg;
          i++;
        }
        break;
      case "--output-dir":
      case "-o":
        if (nextArg && !nextArg.startsWith("-")) {
          options.outputDir = nextArg;
          i++;
        }
        break;
      case "--no-prettier":
        options.runPrettier = false;
        break;
      case "--no-typecheck":
        options.runTypeCheck = false;
        break;
      case "--no-lint":
        options.runLinter = false;
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Helm Types Generator - Generate TypeScript types from Helm chart values

Usage: helm-types [options]

Options:
  -v, --versions-file <path>  Path to versions.ts file (default: src/versions.ts)
  -o, --output-dir <path>     Output directory for generated types (default: src/types/helm)
  --no-prettier              Skip prettier formatting
  --no-typecheck              Skip TypeScript compilation check
  --no-lint                   Skip ESLint check
  -h, --help                  Show this help message

Examples:
  helm-types                                    # Use defaults
  helm-types -v ./versions.ts -o ./types        # Custom paths
  helm-types --no-prettier --no-lint           # Skip formatting and linting
`);
}

// Run if this script is executed directly
if (import.meta.main) {
  void main();
}
